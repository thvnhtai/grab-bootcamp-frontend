import { Restaurant } from '../types';

export const sampleData: Restaurant[] = [
  {
    restaurantId: '1',
    restaurantRatingCount: 150,
    restaurantName: 'Salad Sensation',
    restaurantRating: 4.91,
    restaurantDescription:
      'Fresh, creative salads with house-made dressings. Options for vegan, keto, and other dietary preferences.',
    priceLevel: 2,
    distance: 1.2,
    avatarUrl: 'https://placehold.co/400x200',
    score: 95,
    address: '123 Salad St, City',
    openingHours: 'Mon-Fri 9am-8pm',
    menuItems: [{ itemName: 'Caesar Salad', itemPrice: 80000 }],
    customerReviews: [
      {
        reviewUserName: 'Jane D.',
        userRating: 5,
        userReview: 'Amazing!',
        reviewDate: '2024-07-26'
      }
    ],
    mapUrl: 'https://maps.google.com/?q=123+Salad+St'
  },
  {
    restaurantId: '2',
    restaurantRatingCount: 120,
    restaurantName: 'Pho Paradise',
    restaurantRating: 4.75,
    restaurantDescription:
      'Traditional Vietnamese pho with rich broth, tender beef slices, and fresh herbs.',
    priceLevel: 1,
    distance: 0.8,
    avatarUrl: 'https://placehold.co/400x200',
    score: 88,
    address: '456 Pho Ave, City',
    openingHours: 'Daily 11am-10pm',
    menuItems: [{ itemName: 'Beef Pho', itemPrice: 60000 }],
    customerReviews: [
      {
        reviewUserName: 'John S.',
        userRating: 4.5,
        userReview: 'Authentic!',
        reviewDate: '2024-07-25'
      }
    ],
    mapUrl: 'https://maps.google.com/?q=456+Pho+Ave'
  },
  {
    restaurantId: '3',
    restaurantRatingCount: 135,
    restaurantName: 'Banh Mi Bros',
    restaurantRating: 4.82,
    restaurantDescription:
      'Crispy baguette with pork, pate, pickled veggies, and spicy mayo. Fast and flavorful.',
    priceLevel: 1,
    distance: 1.5,
    avatarUrl: 'https://placehold.co/400x200',
    score: 92,
    address: '789 Banh Mi Blvd, City',
    openingHours: 'Mon-Sat 10am-9pm',
    menuItems: [{ itemName: 'Classic Banh Mi', itemPrice: 30000 }],
    customerReviews: [
      {
        reviewUserName: 'Alice B.',
        userRating: 4.8,
        userReview: 'Best Banh Mi!',
        reviewDate: '2024-07-24'
      }
    ],
    mapUrl: 'https://maps.google.com/?q=789+Banh+Mi+Blvd'
  },
  {
    restaurantId: '4',
    restaurantRatingCount: 180,
    restaurantName: 'Sushi Street',
    restaurantRating: 4.88,
    restaurantDescription:
      'Fresh sushi and sashimi platters made to order. Great for quick bites or sushi fans.',
    priceLevel: 3,
    distance: 2.3,
    avatarUrl: 'https://placehold.co/400x200',
    score: 85,
    address: '101 Sushi Ln, City',
    openingHours: 'Tue-Sun 12pm-10pm',
    menuItems: [{ itemName: 'Sushi Platter', itemPrice: 150000 }],
    customerReviews: [
      {
        reviewUserName: 'Bob C.',
        userRating: 4.9,
        userReview: 'So fresh!',
        reviewDate: '2024-07-23'
      }
    ],
    mapUrl: 'https://maps.google.com/?q=101+Sushi+Ln'
  }
];
