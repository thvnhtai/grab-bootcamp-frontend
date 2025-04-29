export interface Restaurant {
  restaurantId: string;
  restaurantName: string;
  imageUrl: string;
  averageRating: number;
  matchScore: number;
  distance: number;
  priceLevel: 1 | 2 | 3;
  address: string;
  openingHours: string;
  restaurantDescription: string;
  menuItems: Array<{
    itemName: string;
    itemPrice: number;
    itemDescription?: string;
    itemImageUrl?: string;
  }>;
  customerReviews: Array<{
    reviewerName: string;
    reviewRating: number;
    reviewComment: string;
    reviewDate: string;
  }>;
  mapUrl: string;
}
