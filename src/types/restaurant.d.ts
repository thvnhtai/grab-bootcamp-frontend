export interface MenuItem {
  itemName: string;
  itemPrice: string | number;
  itemDescription?: string;
  itemAvatarUrl?: string;
}

export interface Review {
  reviewUserName: string;
  userRating: number;
  userReview: string;
  reviewDate: string;
}

export interface Pagination {
  page: number;
  size: number;
  total: number;
}

export interface Restaurant {
  restaurantId: string;
  restaurantName: string;
  avatarUrl?: string;
  restaurantRating?: number;
  score: number;
  distance: number;
  priceLevel: 1 | 2 | 3;
  address?: string;
  openingHours?: string;
  restaurantDescription?: string;
  restaurantRatingCount: number;
  menuItems: MenuItem[];
  customerReviews: Review[];
  mapUrl?: string;
  dishesPagination?: Pagination;
  reviewsPagination?: Pagination;
}
