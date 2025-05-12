import { transformerObject } from '../redux/transformer';
import { calculateDistanceHaversine } from '../utils/common';
import { ApiResponse, Restaurant, UserCoordinates } from '../types';

const DEFAULT_TOP_N = 20;

const logError = (message: string, error: unknown): void => {
  console.error(message, error);
};

export const addRestaurantClick = async (
  userId: string,
  restaurantId: string
): Promise<void> => {
  try {
    await apiService.post<ApiResponse<null>>('recommendation/add-click', {
      user_id: userId,
      restaurant_id: restaurantId
    });
    console.log(
      `Click logged for user ${userId} on restaurant ${restaurantId}`
    );
  } catch (error) {
    logError(
      `Failed to log click for user ${userId} on restaurant ${restaurantId}:`,
      error
    );
  }
};

const enhanceRestaurantsWithDistance = (
  restaurants: Restaurant[],
  userCoords: UserCoordinates | null
): Restaurant[] => {
  if (!userCoords) return restaurants;

  return restaurants.map((restaurant) => {
    if (restaurant.latitude == null || restaurant.longitude == null) {
      return restaurant;
    }
    const distance = calculateDistanceHaversine(
      userCoords.latitude,
      userCoords.longitude,
      restaurant.latitude,
      restaurant.longitude
    );
    return { ...restaurant, distance };
  });
};

export const getRecommendedRestaurants = async (
  userId: string,
  topN: number = DEFAULT_TOP_N,
  userCoords: UserCoordinates | null = null
): Promise<Restaurant[]> => {
  try {
    const response = await apiService.get<ApiResponse<Restaurant[]>>(
      `recommendation/user/${userId}`,
      { params: { top_n: topN } }
    );
    const restaurants = transformerObject(response.data) as Restaurant[];
    return enhanceRestaurantsWithDistance(restaurants, userCoords);
  } catch (error) {
    logError(`Failed to get recommendations for user ${userId}:`, error);
    return [];
  }
};

export const getRecommendedRestaurantsForGuest = async (
  topN: number = DEFAULT_TOP_N,
  userCoords: UserCoordinates | null = null
): Promise<Restaurant[]> => {
  try {
    const response = await apiService.get<ApiResponse<Restaurant[]>>(
      'recommendation/guest',
      {
        params: { top_n: topN }
      }
    );
    const restaurants = transformerObject(response.data) as Restaurant[];
    return enhanceRestaurantsWithDistance(restaurants, userCoords);
  } catch (error) {
    logError('Failed to get recommendations for guest:', error);
    return [];
  }
};
