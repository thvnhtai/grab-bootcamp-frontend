import { Restaurant } from '../types/restaurant';

export const sampleData: Restaurant[] = [
  {
    restaurantId: '1',
    restaurantName: 'Salad Sensation',
    averageRating: 4.91,
    restaurantDescription:
      'Fresh, creative salads with house-made dressings. Options for vegan, keto, and other dietary preferences.',
    priceLevel: 2,
    distance: 1.2,
    imageUrl: 'https://placehold.co/400x200',
    matchScore: 95,
    address: '123 Salad St, City',
    openingHours: 'Mon-Fri 9am-8pm',
    menuItems: [{ itemName: 'Caesar Salad', itemPrice: 80000 }],
    customerReviews: [
      {
        reviewerName: 'Jane D.',
        reviewRating: 5,
        reviewComment: 'Amazing!',
        reviewDate: '2024-07-26'
      }
    ],
    mapUrl: 'https://maps.google.com/?q=123+Salad+St'
  },
  {
    restaurantId: '2',
    restaurantName: 'Pho Paradise',
    averageRating: 4.75,
    restaurantDescription:
      'Traditional Vietnamese pho with rich broth, tender beef slices, and fresh herbs.',
    priceLevel: 1,
    distance: 0.8,
    imageUrl: 'https://placehold.co/400x200',
    matchScore: 88,
    address: '456 Pho Ave, City',
    openingHours: 'Daily 11am-10pm',
    menuItems: [{ itemName: 'Beef Pho', itemPrice: 60000 }],
    customerReviews: [
      {
        reviewerName: 'John S.',
        reviewRating: 4.5,
        reviewComment: 'Authentic!',
        reviewDate: '2024-07-25'
      }
    ],
    mapUrl: 'https://maps.google.com/?q=456+Pho+Ave'
  },
  {
    restaurantId: '3',
    restaurantName: 'Banh Mi Bros',
    averageRating: 4.82,
    restaurantDescription:
      'Crispy baguette with pork, pate, pickled veggies, and spicy mayo. Fast and flavorful.',
    priceLevel: 1,
    distance: 1.5,
    imageUrl: 'https://placehold.co/400x200',
    matchScore: 92,
    address: '789 Banh Mi Blvd, City',
    openingHours: 'Mon-Sat 10am-9pm',
    menuItems: [{ itemName: 'Classic Banh Mi', itemPrice: 30000 }],
    customerReviews: [
      {
        reviewerName: 'Alice B.',
        reviewRating: 4.8,
        reviewComment: 'Best Banh Mi!',
        reviewDate: '2024-07-24'
      }
    ],
    mapUrl: 'https://maps.google.com/?q=789+Banh+Mi+Blvd'
  },
  {
    restaurantId: '4',
    restaurantName: 'Sushi Street',
    averageRating: 4.88,
    restaurantDescription:
      'Fresh sushi and sashimi platters made to order. Great for quick bites or sushi fans.',
    priceLevel: 3,
    distance: 2.3,
    imageUrl: 'https://placehold.co/400x200',
    matchScore: 85,
    address: '101 Sushi Ln, City',
    openingHours: 'Tue-Sun 12pm-10pm',
    menuItems: [{ itemName: 'Sushi Platter', itemPrice: 150000 }],
    customerReviews: [
      {
        reviewerName: 'Bob C.',
        reviewRating: 4.9,
        reviewComment: 'So fresh!',
        reviewDate: '2024-07-23'
      }
    ],
    mapUrl: 'https://maps.google.com/?q=101+Sushi+Ln'
  }
];
