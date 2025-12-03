import { Pizza, Topping, SizeOption } from '@/src/types/pizza';

export const pizzas: Pizza[] = [
  {
    id: 'margherita',
    name: 'Classic Margherita',
    description: 'Fresh tomato sauce, creamy mozzarella, aromatic basil, and a drizzle of extra virgin olive oil. The timeless Italian classic.',
    basePrice: 12.99,
    image: '/pizza.png',
    category: 'classic',
    rating: 5,
  },
  {
    id: 'pepperoni',
    name: 'Spicy Pepperoni',
    description: 'Loaded with premium pepperoni, melted mozzarella, and our signature spicy tomato sauce. A meat lover\'s dream.',
    basePrice: 14.99,
    image: '/pizza.png',
    category: 'meat',
    rating: 5,
  },
  {
    id: 'mushroom',
    name: 'Mushroom Delight',
    description: 'A medley of wild mushrooms, truffle oil, garlic, and three Italian cheeses. Earthy and sophisticated.',
    basePrice: 15.99,
    image: '/pizza.png',
    category: 'vegetarian',
    rating: 4,
  },
  {
    id: 'supreme',
    name: 'Solana Supreme',
    description: 'Our signature pizza with pepperoni, mushrooms, olives, bell peppers, and onions. The ultimate combination.',
    basePrice: 16.99,
    image: '/pizza.png',
    category: 'specialty',
    rating: 5,
  },
];

export const toppings: Topping[] = [
  { id: 'pepperoni', name: 'Pepperoni', price: 0.99, emoji: '🥓' },
  { id: 'mushrooms', name: 'Mushrooms', price: 0.99, emoji: '🍄' },
  { id: 'olives', name: 'Olives', price: 0.99, emoji: '🫒' },
];

export const sizeOptions: SizeOption[] = [
  { id: 'small', name: 'Small (10")', price: 10 },
  { id: 'medium', name: 'Medium (12")', price: 12 },
  { id: 'large', name: 'Large (14")', price: 14 },
];

export const getPizzaById = (id: string): Pizza | undefined => {
  return pizzas.find(pizza => pizza.id === id);
};
