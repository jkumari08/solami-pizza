export interface Pizza {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  image: string;
  category: string;
  rating: number;
}

export interface Topping {
  id: string;
  name: string;
  price: number;
  emoji: string;
}

export type PizzaSize = 'small' | 'medium' | 'large';

export interface SizeOption {
  id: PizzaSize;
  name: string;
  price: number;
}

export interface CartItem {
  id: string;
  pizzaId: string;
  pizzaName: string;
  pizzaImage: string;
  size: PizzaSize;
  toppings: {
    pepperoni: number;
    mushrooms: number;
    olives: number;
  };
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  timestamp: number;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'completed';
  walletAddress: string;
}
