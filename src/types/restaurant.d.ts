import { Pagination } from './api';
import { User } from './auth';

type MenuItem = {
  itemName: string;
  itemPrice: string | number;
  itemDescription?: string;
  itemAvatarUrl?: string;
};

type Review = {
  reviewUserName: User['username'];
  userRating: number;
  userReview: string;
  reviewDate: string;
};

type SortByOption = 'score' | 'rating' | 'distance';

type PriceLevel = 1 | 2 | 3;

type Filters = {
  sortBy: SortByOption;
  minRating: number;
  priceLevel?: PriceLevel[];
};

type UserCoordinates = {
  latitude: number;
  longitude: number;
};

type Restaurant = {
  restaurantId: string;
  restaurantName: string;
  avatarUrl?: string;
  restaurantRating?: number;
  score: number;
  distance: number | null;
  priceLevel: PriceLevel;
  address?: string;
  openingHours?: string;
  restaurantDescription?: string;
  restaurantRatingCount: number;
  menuItems: MenuItem[];
  customerReviews: Review[];
  mapUrl?: string;
  dishesPagination?: Pagination;
  reviewsPagination?: Pagination;
  latitude?: number;
  longitude?: number;
  imgId?: string;
  foodName?: string;
  foodPrice?: string;
  imgUrl?: string;
};

export {
  MenuItem,
  Review,
  Restaurant,
  SortByOption,
  PriceLevel,
  Filters,
  UserCoordinates
};
