import { useCallback, useState } from 'react';

import { useAppSelector } from '../redux/hooks';
import { selectIsAuthenticated, selectUser } from '../redux/slices/authSlice';
import {
  analyzeImage,
  fetchRestaurantDetails,
  UserCoordinates
} from '../services/restaurant.service';
import {
  addRestaurantClick,
  getRecommendedRestaurants,
  getRecommendedRestaurantsForGuest
} from '../services/recommendation.service';
import { Restaurant } from '../types/restaurant';

const DEFAULT_TOP_N = 20;
const ERROR_MESSAGES = {
  ANALYZE_IMAGE: 'Failed to analyze image',
  FETCH_DETAILS: 'Failed to fetch restaurant details',
  FETCH_RECOMMENDATIONS: 'Failed to fetch recommended restaurants'
} as const;

interface RestaurantState {
  restaurants: Restaurant[];
  recommendedRestaurants: Restaurant[];
  restaurantCache: Record<string, Restaurant>;
  isLoading: boolean;
  isDetailLoading: boolean;
  error: string | null;
}

interface UseRestaurantResult {
  restaurants: Restaurant[];
  recommendedRestaurants: Restaurant[];
  isLoading: boolean;
  isDetailLoading: boolean;
  error: string | null;
  analyzeImageAndFetch: (
    file: File,
    topN?: number,
    userCoords?: UserCoordinates
  ) => Promise<Restaurant[]>;
  fetchDetails: (
    restaurant: Restaurant,
    userCoords?: UserCoordinates
  ) => Promise<Restaurant | null>;
  logRestaurantClick: (restaurantId: string) => Promise<void>;
  fetchRecommendations: (
    topN?: number,
    userCoords?: UserCoordinates | null
  ) => Promise<void>;
  getUserCoordinates: () => Promise<UserCoordinates | null>;
}

export const useRestaurant = (): UseRestaurantResult => {
  const [state, setState] = useState<RestaurantState>({
    restaurants: [],
    recommendedRestaurants: [],
    restaurantCache: {},
    isLoading: false,
    isDetailLoading: false,
    error: null
  });

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);

  const handleError = (message: string, error: unknown): void => {
    console.error(`${message}:`, error);
    setState((prev) => ({ ...prev, error: message }));
  };

  const getUserCoordinates =
    useCallback(async (): Promise<UserCoordinates | null> => {
      if (!navigator.geolocation) {
        console.warn('Geolocation is not supported by this browser.');
        return null;
      }

      try {
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          }
        );
        return {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
      } catch (error) {
        console.error('Failed to get user location:', error);
        return null;
      }
    }, []);

  const analyzeImageAndFetch = useCallback(
    async (
      file: File,
      topN: number = DEFAULT_TOP_N,
      userCoords?: UserCoordinates
    ): Promise<Restaurant[]> => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const analyzedRestaurants = await analyzeImage(file, topN, userCoords);
        setState((prev) => ({ ...prev, restaurants: analyzedRestaurants }));
        return analyzedRestaurants;
      } catch (error) {
        handleError(ERROR_MESSAGES.ANALYZE_IMAGE, error);
        throw error;
      } finally {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    },
    []
  );

  const fetchDetails = useCallback(
    async (
      restaurant: Restaurant,
      userCoords?: UserCoordinates
    ): Promise<Restaurant | null> => {
      if (!restaurant.restaurantId) {
        console.warn(
          'Attempted to fetch details for restaurant without ID:',
          restaurant
        );
        return null;
      }

      const cachedRestaurant = state.restaurantCache[restaurant.restaurantId];
      if (cachedRestaurant) {
        if (
          userCoords &&
          cachedRestaurant.latitude != null &&
          cachedRestaurant.longitude != null &&
          cachedRestaurant.distance == null
        ) {
          setState((prev) => ({ ...prev, isDetailLoading: true }));
          try {
            const updatedRestaurant = await fetchRestaurantDetails(
              restaurant,
              userCoords
            );
            setState((prev) => ({
              ...prev,
              restaurantCache: {
                ...prev.restaurantCache,
                [restaurant.restaurantId]: updatedRestaurant
              }
            }));
            return updatedRestaurant;
          } catch (error) {
            handleError(ERROR_MESSAGES.FETCH_DETAILS, error);
            return null;
          } finally {
            setState((prev) => ({ ...prev, isDetailLoading: false }));
          }
        }
        return cachedRestaurant;
      }

      setState((prev) => ({ ...prev, isDetailLoading: true, error: null }));
      try {
        const detailedRestaurant = await fetchRestaurantDetails(
          restaurant,
          userCoords
        );
        setState((prev) => ({
          ...prev,
          restaurantCache: {
            ...prev.restaurantCache,
            [restaurant.restaurantId]: detailedRestaurant
          }
        }));
        return detailedRestaurant;
      } catch (error) {
        handleError(ERROR_MESSAGES.FETCH_DETAILS, error);
        return null;
      } finally {
        setState((prev) => ({ ...prev, isDetailLoading: false }));
      }
    },
    [state.restaurantCache]
  );

  const logRestaurantClick = useCallback(
    async (restaurantId: string): Promise<void> => {
      if (!isAuthenticated || !user?.userId) {
        console.warn('Cannot log click: User not authenticated');
        return;
      }

      await addRestaurantClick(user.userId, restaurantId);
    },
    [isAuthenticated, user?.userId]
  );

  const fetchRecommendations = useCallback(
    async (
      topN: number = DEFAULT_TOP_N,
      userCoords: UserCoordinates | null = null
    ): Promise<void> => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const recommendations =
          isAuthenticated && user?.userId
            ? await getRecommendedRestaurants(user.userId, topN, userCoords)
            : await getRecommendedRestaurantsForGuest(topN, userCoords);
        setState((prev) => ({
          ...prev,
          recommendedRestaurants: recommendations
        }));
      } catch (error) {
        handleError(ERROR_MESSAGES.FETCH_RECOMMENDATIONS, error);
      } finally {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    },
    [isAuthenticated, user?.userId]
  );

  return {
    restaurants: state.restaurants,
    recommendedRestaurants: state.recommendedRestaurants,
    isLoading: state.isLoading,
    isDetailLoading: state.isDetailLoading,
    error: state.error,
    analyzeImageAndFetch,
    fetchDetails,
    logRestaurantClick,
    fetchRecommendations,
    getUserCoordinates
  };
};
