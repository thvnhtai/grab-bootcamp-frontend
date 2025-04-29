import { Food } from '../types/food';

export const sampleData: Food[] = [
  {
    id: '1',
    name: 'Salad Sensation',
    rating: 4.91,
    description:
      'Fresh, creative salads with house-made dressings. Options for vegan, keto, and other dietary preferences.',
    priceLevel: 2,
    distance: 1.2,
    imageUrl: 'https://placehold.co/400x200',
    compatibility: 95,
    address: '123 Salad St, City',
    hours: 'Mon-Fri 9am-8pm',
    menu: [{ name: 'Caesar Salad', price: 80000 }],
    reviews: [
      { author: 'Jane D.', rating: 5, comment: 'Amazing!', date: '2024-07-26' }
    ],
    mapUrl: 'https://maps.google.com/?q=123+Salad+St'
  },
  {
    id: '2',
    name: 'Pho Paradise',
    rating: 4.75,
    description:
      'Traditional Vietnamese pho with rich broth, tender beef slices, and fresh herbs.',
    priceLevel: 1,
    distance: 0.8,
    imageUrl: 'https://placehold.co/400x200',
    compatibility: 88,
    address: '456 Pho Ave, City',
    hours: 'Daily 11am-10pm',
    menu: [{ name: 'Beef Pho', price: 60000 }],
    reviews: [
      {
        author: 'John S.',
        rating: 4.5,
        comment: 'Authentic!',
        date: '2024-07-25'
      }
    ],
    mapUrl: 'https://maps.google.com/?q=456+Pho+Ave'
  },
  {
    id: '3',
    name: 'Banh Mi Bros',
    rating: 4.82,
    description:
      'Crispy baguette with pork, pate, pickled veggies, and spicy mayo. Fast and flavorful.',
    priceLevel: 1,
    distance: 1.5,
    imageUrl: 'https://placehold.co/400x200',
    compatibility: 92,
    address: '789 Banh Mi Blvd, City',
    hours: 'Mon-Sat 10am-9pm',
    menu: [{ name: 'Classic Banh Mi', price: 30000 }],
    reviews: [
      {
        author: 'Alice B.',
        rating: 4.8,
        comment: 'Best Banh Mi!',
        date: '2024-07-24'
      }
    ],
    mapUrl: 'https://maps.google.com/?q=789+Banh+Mi+Blvd'
  },
  {
    id: '4',
    name: 'Sushi Street',
    rating: 4.88,
    description:
      'Fresh sushi and sashimi platters made to order. Great for quick bites or sushi fans.',
    priceLevel: 3,
    distance: 2.3,
    imageUrl: 'https://placehold.co/400x200',
    compatibility: 85,
    address: '101 Sushi Ln, City',
    hours: 'Tue-Sun 12pm-10pm',
    menu: [{ name: 'Sushi Platter', price: 150000 }],
    reviews: [
      {
        author: 'Bob C.',
        rating: 4.9,
        comment: 'So fresh!',
        date: '2024-07-23'
      }
    ],
    mapUrl: 'https://maps.google.com/?q=101+Sushi+Ln'
  }
];
