import { transformerObject } from '../redux/transformer';
import { Restaurant } from '../types/restaurant';

export const analyzeImage = async (file: File): Promise<Restaurant[]> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiService.post(
    'image_search/search-image',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json'
      }
    }
  );

  return transformerObject(response.data);
};

export const fetchRestaurantDetails = async (
  restaurant: Restaurant
): Promise<Restaurant> => {
  const [detailResponse, dishesResponse, reviewsResponse] = await Promise.all([
    apiService.get(`restaurant/${restaurant.restaurantId}`),
    apiService.get(
      `restaurant/${restaurant.restaurantId}/dishes?page=1&page_size=2`
    ),
    apiService.get(
      `restaurant/${restaurant.restaurantId}/reviews?page=1&page_size=2`
    )
  ]);

  const transformedDetail = transformerObject(detailResponse);
  const transformedDishes = transformerObject(dishesResponse);
  const transformedReviews = transformerObject(reviewsResponse);

  return {
    ...restaurant,
    ...transformedDetail.data,
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

export const fetchPaginatedData = async (
  endpoint: string,
  page: number,
  pageSize: number
) => {
  const response = await apiService.get(
    `${endpoint}?page=${page}&page_size=${pageSize}`
  );
  return transformerObject(response.data);
};
