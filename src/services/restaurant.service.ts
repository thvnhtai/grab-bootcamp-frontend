import { transformerObject } from '../redux/transformer';
import {
  calculateDistanceHaversine,
  createGoogleMapsSearchUrl
} from '../utils/common';
import {
  ApiResponse,
  MenuItem,
  PaginatedResponse,
  Restaurant,
  Review,
  UserCoordinates
} from '../types';

const DEFAULT_TOP_N = 20;
const DEFAULT_PAGE_SIZE = 3;
const DEFAULT_REVIEW_SIZE = 2;

const enhanceRestaurantWithDistance = (
  restaurant: Restaurant,
  userCoords?: UserCoordinates
): Restaurant => {
  if (
    !userCoords ||
    restaurant.latitude == null ||
    restaurant.longitude == null
  ) {
    return restaurant;
  }
  const distance = calculateDistanceHaversine(
    userCoords.latitude,
    userCoords.longitude,
    restaurant.latitude,
    restaurant.longitude
  );
  return { ...restaurant, distance };
};

export const analyzeImage = async (
  file: File,
  topN: number = DEFAULT_TOP_N,
  userCoords?: UserCoordinates
): Promise<Restaurant[]> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiService.post<ApiResponse<Restaurant[]>>(
      `image-search?top_n=${topN}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json'
        }
      }
    );

    const restaurants = transformerObject(response.data) as Restaurant[];
    if (!userCoords) return restaurants;

    return restaurants.map((restaurant) =>
      enhanceRestaurantWithDistance(restaurant, userCoords)
    );
  } catch (error) {
    console.error('Failed to analyze image:', error);
    return [];
  }
};

export const fetchRestaurantDetails = async (
  restaurant: Restaurant,
  userCoords?: UserCoordinates
): Promise<Restaurant> => {
  try {
    const [detailResponse, dishesResponse, reviewsResponse] = await Promise.all(
      [
        apiService.get<ApiResponse<Restaurant>>(
          `restaurant/${restaurant.restaurantId}`
        ),
        apiService.get<PaginatedResponse<MenuItem>>(
          `restaurant/${restaurant.restaurantId}/dishes?page=1&page_size=${DEFAULT_PAGE_SIZE}`
        ),
        apiService.get<PaginatedResponse<Review>>(
          `restaurant/${restaurant.restaurantId}/reviews?page=1&page_size=${DEFAULT_REVIEW_SIZE}`
        )
      ]
    );

    const transformedDetail = transformerObject(
      detailResponse
    ) as ApiResponse<Restaurant>;
    const transformedDishes = transformerObject(
      dishesResponse
    ) as PaginatedResponse<MenuItem>;
    const transformedReviews = transformerObject(
      reviewsResponse
    ) as PaginatedResponse<Review>;

    const address = transformedDetail.data.address as string | undefined;
    const mapUrl = address ? createGoogleMapsSearchUrl(address) : '';

    let detailedRestaurantData: Restaurant = {
      ...restaurant,
      ...transformedDetail.data,
      mapUrl,
      menuItems: transformedDishes.data,
      customerReviews: transformedReviews.data,
      dishesPagination: {
        page: transformedDishes.metadata.page,
        size: transformedDishes.metadata.size,
        total: transformedDishes.metadata.total
      },
      reviewsPagination: {
        page: transformedReviews.metadata.page,
        size: transformedReviews.metadata.size,
        total: transformedReviews.metadata.total
      }
    };

    detailedRestaurantData = enhanceRestaurantWithDistance(
      detailedRestaurantData,
      userCoords
    );

    if (
      restaurant.distance != null &&
      detailedRestaurantData.distance == null
    ) {
      detailedRestaurantData = {
        ...detailedRestaurantData,
        distance: restaurant.distance
      };
    }

    return detailedRestaurantData;
  } catch (error) {
    console.error(
      `Failed to fetch details for restaurant ${restaurant.restaurantId}:`,
      error
    );
    throw error;
  }
};

export const fetchPaginatedData = async <T>(
  endpoint: string,
  page: number,
  pageSize: number
): Promise<T[]> => {
  try {
    const response = await apiService.get<PaginatedResponse<T>>(
      `${endpoint}?page=${page}&page_size=${pageSize}`
    );
    return transformerObject(response.data) as T[];
  } catch (error) {
    console.error(`Failed to fetch paginated data from ${endpoint}:`, error);
    return [];
  }
};
