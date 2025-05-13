import { useCallback, useState } from 'react';

import { useAppSelector } from '../redux/hooks';
import { Restaurant, UserCoordinates } from '../types';
import { selectIsAuthenticated, selectUser } from '../redux/slices/authSlice';
import {
  addRestaurantClick,
  analyzeImage,
  fetchRestaurantDetails,
  getRecommendedRestaurants,
  getRecommendedRestaurantsForGuest
} from '../services';

const DEFAULT_TOP_N = 20;
const ERROR_MESSAGES = {
  ANALYZE_IMAGE: 'Failed to analyze image',
  FETCH_DETAILS: 'Failed to fetch restaurant details',
  FETCH_RECOMMENDATIONS: 'Failed to fetch recommended restaurants'
} as const;

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
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [recommendedRestaurants, setRecommendedRestaurants] = useState<
    Restaurant[]
  >([]);
  const [restaurantCache, setRestaurantCache] = useState<
    Record<string, Restaurant>
  >({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDetailLoading, setIsDetailLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);

  const handleError = (message: string, error: unknown): void => {
    console.error(`${message}:`, error);
    setError(message);
  };

  const getUserCoordinates =
    useCallback(async (): Promise<UserCoordinates | null> => {
      if (!navigator.geolocation) {
        console.warn('Geolocation is not supported by this browser.');
        handleError(
          'Geolocation not supported',
          new Error('Geolocation API is unavailable')
        );
        return null;
      }

      try {
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
              resolve,
              (error) => reject(error),
              { timeout: 10000, maximumAge: 60000, enableHighAccuracy: true }
            );
          }
        );
        return {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
      } catch (error: unknown) {
        let errorMessage = 'Failed to get user location';
        if (error instanceof GeolocationPositionError) {
          if (error.code === error.PERMISSION_DENIED) {
            errorMessage = 'Location access denied by user';
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            errorMessage = 'Location information is unavailable';
          } else if (error.code === error.TIMEOUT) {
            errorMessage = 'Location request timed out';
          }
        }
        handleError(errorMessage, error);
        return null;
      }
    }, []);

  const analyzeImageAndFetch = useCallback(
    async (
      file: File,
      topN: number = DEFAULT_TOP_N,
      userCoords?: UserCoordinates
    ): Promise<Restaurant[]> => {
      setIsLoading(true);
      setError(null);

      try {
        const analyzedRestaurants = await analyzeImage(file, topN, userCoords);
        setRestaurants(analyzedRestaurants);
        return analyzedRestaurants;
      } catch (error) {
        handleError(ERROR_MESSAGES.ANALYZE_IMAGE, error);
        throw error;
      } finally {
        setIsLoading(false);
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

      const cachedRestaurant = restaurantCache[restaurant.restaurantId];
      if (cachedRestaurant) {
        if (
          userCoords &&
          cachedRestaurant.latitude != null &&
          cachedRestaurant.longitude != null &&
          cachedRestaurant.distance == null
        ) {
          setIsDetailLoading(true);
          try {
            const updatedRestaurant = await fetchRestaurantDetails(
              restaurant,
              userCoords
            );
            setRestaurantCache({
              ...restaurantCache,
              [restaurant.restaurantId]: updatedRestaurant
            });
            return updatedRestaurant;
          } catch (error) {
            handleError(ERROR_MESSAGES.FETCH_DETAILS, error);
            return null;
          } finally {
            setIsDetailLoading(false);
          }
        }
        return cachedRestaurant;
      }

      setIsDetailLoading(true);
      setError(null);
      try {
        const detailedRestaurant = await fetchRestaurantDetails(
          restaurant,
          userCoords
        );
        setRestaurantCache({
          ...restaurantCache,
          [restaurant.restaurantId]: detailedRestaurant
        });
        return detailedRestaurant;
      } catch (error) {
        handleError(ERROR_MESSAGES.FETCH_DETAILS, error);
        return null;
      } finally {
        setIsDetailLoading(false);
      }
    },
    [restaurantCache]
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
      setIsLoading(true);
      setError(null);

      try {
        const recommendations =
          isAuthenticated && user?.userId
            ? await getRecommendedRestaurants(user.userId, topN, userCoords)
            : await getRecommendedRestaurantsForGuest(topN, userCoords);

        setRecommendedRestaurants(recommendations);
      } catch (error) {
        handleError(ERROR_MESSAGES.FETCH_RECOMMENDATIONS, error);
      } finally {
        setIsLoading(false);
      }
    },
    [isAuthenticated, user?.userId]
  );

  return {
    restaurants: restaurants,
    recommendedRestaurants: recommendedRestaurants,
    isLoading: isLoading,
    isDetailLoading: isDetailLoading,
    error: error,
    analyzeImageAndFetch,
    fetchDetails,
    logRestaurantClick,
    fetchRecommendations,
    getUserCoordinates
  };
};
