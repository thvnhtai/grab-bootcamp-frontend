export interface Food {
  id: string;
  name: string;
  imageUrl: string;
  rating: number;
  compatibility: number;
  distance: number;
  priceLevel: 1 | 2 | 3;
  address: string;
  hours: string;
  description: string;
  menu: Array<{
    name: string;
    price: number;
    description?: string;
  }>;
  reviews: Array<{
    author: string;
    rating: number;
    comment: string;
    date: string;
  }>;
  mapUrl: string;
}
