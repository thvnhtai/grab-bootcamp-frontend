import { transformerObject } from '../redux/transformer';
import { ApiResponse, PaginatedResponse } from '../types/api';

import type { Restaurant, MenuItem, Review } from '../types/restaurant';
import { createGoogleMapsSearchUrl } from '../utils/common';

export const analyzeImage = async (file: File): Promise<Restaurant[]> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiService.post<ApiResponse<Restaurant[]>>(
    'image_search/search-image',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json'
      }
    }
  );

  return transformerObject(response.data) as Restaurant[];
};

export const fetchRestaurantDetails = async (
  restaurant: Restaurant
): Promise<Restaurant> => {
  const [detailResponse, dishesResponse, reviewsResponse] = await Promise.all([
    apiService.get<ApiResponse<Restaurant>>(
      `restaurant/${restaurant.restaurantId}`
    ),
    apiService.get<PaginatedResponse<MenuItem>>(
      `restaurant/${restaurant.restaurantId}/dishes?page=1&page_size=3`
    ),
    apiService.get<PaginatedResponse<Review>>(
      `restaurant/${restaurant.restaurantId}/reviews?page=1&page_size=2`
    )
  ]);

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

  return {
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
};

export const fetchPaginatedData = async <T>(
  endpoint: string,
  page: number,
  pageSize: number
): Promise<T[]> => {
  const response = await apiService.get<PaginatedResponse<T>>(
    `${endpoint}?page=${page}&page_size=${pageSize}`
  );
  return transformerObject(response.data) as T[];
};
