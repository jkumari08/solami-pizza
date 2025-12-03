// Inventory management system
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: 'pizza' | 'addon';
  description: string;
  stock: number;
}

export interface Review {
  id: string;
  menuItemId: string;
  rating: number; // 1-5
  text: string;
  timestamp: number;
}

export interface CartItem {
  menuItemId: string;
  quantity: number;
  name: string;
  price: number;
}

export interface Order {
  id: string;
  timestamp: number;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'failed';
  reference: string; // Solana transaction reference
  signature?: string; // Transaction signature
  orderPublicKey?: string; // On-chain order account
  promoCode?: string;
  discountAmount?: number;
}

export interface PromoCode {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  maxUses?: number;
  usedCount: number;
  expiresAt?: number;
  active: boolean;
}

// Default promo codes
export const DEFAULT_PROMO_CODES: PromoCode[] = [
  {
    code: 'WELCOME10',
    discountType: 'percentage',
    discountValue: 10,
    maxUses: 100,
    usedCount: 0,
    active: true,
  },
  {
    code: 'SOLANA20',
    discountType: 'percentage',
    discountValue: 20,
    maxUses: 50,
    usedCount: 0,
    active: true,
  },
  {
    code: 'PIZZA5',
    discountType: 'fixed',
    discountValue: 5,
    maxUses: 200,
    usedCount: 0,
    active: true,
  },
];

// Default inventory
export const DEFAULT_MENU_ITEMS: MenuItem[] = [
  {
    id: 'pepperoni',
    name: 'Pepperoni',
    price: 0.5,
    category: 'addon',
    description: 'Classic pepperoni slices',
    stock: 100,
  },
  {
    id: 'mushrooms',
    name: 'Mushrooms',
    price: 0.5,
    category: 'addon',
    description: 'Fresh mushroom pieces',
    stock: 80,
  },
  {
    id: 'olives',
    name: 'Olives',
    price: 0.5,
    category: 'addon',
    description: 'Black olives',
    stock: 60,
  },
];

// LocalStorage keys
const INVENTORY_KEY = 'pizza_inventory';
const ORDERS_KEY = 'pizza_orders';
const PROMO_CODES_KEY = 'pizza_promo_codes';
const LOYALTY_POINTS_KEY = 'pizza_loyalty_points';
const REVIEWS_KEY = 'pizza_reviews';
const ACHIEVEMENTS_KEY = 'pizza_achievements';

// Inventory operations
export const getInventory = (): MenuItem[] => {
  if (typeof window === 'undefined') return DEFAULT_MENU_ITEMS;
  
  const stored = localStorage.getItem(INVENTORY_KEY);
  return stored ? JSON.parse(stored) : DEFAULT_MENU_ITEMS;
};

export const saveInventory = (items: MenuItem[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(INVENTORY_KEY, JSON.stringify(items));
};

export const updateStock = (itemId: string, quantity: number): void => {
  const inventory = getInventory();
  const item = inventory.find(i => i.id === itemId);
  if (item) {
    item.stock = Math.max(0, item.stock - quantity);
    saveInventory(inventory);
  }
};

export const restoreStock = (itemId: string, quantity: number): void => {
  const inventory = getInventory();
  const item = inventory.find(i => i.id === itemId);
  if (item) {
    item.stock += quantity;
    saveInventory(inventory);
  }
};

// Order operations
export const getOrders = (): Order[] => {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(ORDERS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveOrder = (order: Order): void => {
  if (typeof window === 'undefined') return;
  
  const orders = getOrders();
  orders.unshift(order); // Add to beginning (newest first)
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
};

export const updateOrder = (orderId: string, updates: Partial<Order>): void => {
  if (typeof window === 'undefined') return;
  
  const orders = getOrders();
  const order = orders.find(o => o.id === orderId);
  if (order) {
    Object.assign(order, updates);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }
};

// Promo code operations
export const getPromoCodes = (): PromoCode[] => {
  if (typeof window === 'undefined') return DEFAULT_PROMO_CODES;
  
  const stored = localStorage.getItem(PROMO_CODES_KEY);
  return stored ? JSON.parse(stored) : DEFAULT_PROMO_CODES;
};

export const savePromoCodes = (codes: PromoCode[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PROMO_CODES_KEY, JSON.stringify(codes));
};

export const validatePromoCode = (code: string): { valid: boolean; discount: number; message: string } => {
  const codes = getPromoCodes();
  const promoCode = codes.find(c => c.code.toUpperCase() === code.toUpperCase());

  if (!promoCode) {
    return { valid: false, discount: 0, message: 'Promo code not found' };
  }

  if (!promoCode.active) {
    return { valid: false, discount: 0, message: 'Promo code is inactive' };
  }

  if (promoCode.maxUses && promoCode.usedCount >= promoCode.maxUses) {
    return { valid: false, discount: 0, message: 'Promo code has reached max uses' };
  }

  if (promoCode.expiresAt && Date.now() > promoCode.expiresAt) {
    return { valid: false, discount: 0, message: 'Promo code has expired' };
  }

  return { valid: true, discount: promoCode.discountValue, message: `${promoCode.discountType === 'percentage' ? promoCode.discountValue + '%' : '€' + promoCode.discountValue} discount applied!` };
};

export const applyPromoCode = (code: string): { discountAmount: number; discountType: 'percentage' | 'fixed'; message: string } => {
  const codes = getPromoCodes();
  const promoCode = codes.find(c => c.code.toUpperCase() === code.toUpperCase());

  if (!promoCode) {
    return { discountAmount: 0, discountType: 'percentage', message: 'Invalid code' };
  }

  // Increment usage
  promoCode.usedCount += 1;
  savePromoCodes(codes);

  return { discountAmount: promoCode.discountValue, discountType: promoCode.discountType, message: 'Code applied!' };
};

export const calculateDiscount = (total: number, discountAmount: number, discountType: 'percentage' | 'fixed'): number => {
  if (discountType === 'percentage') {
    return (total * discountAmount) / 100;
  }
  return discountAmount;
};

// Loyalty points operations
export const getLoyaltyPoints = (): number => {
  if (typeof window === 'undefined') return 0;
  
  const stored = localStorage.getItem(LOYALTY_POINTS_KEY);
  return stored ? parseInt(stored) : 0;
};

export const addLoyaltyPoints = (amount: number): void => {
  if (typeof window === 'undefined') return;
  
  const currentPoints = getLoyaltyPoints();
  localStorage.setItem(LOYALTY_POINTS_KEY, (currentPoints + amount).toString());
};

export const redeemLoyaltyPoints = (points: number): boolean => {
  if (typeof window === 'undefined') return false;
  
  const currentPoints = getLoyaltyPoints();
  if (currentPoints >= points) {
    localStorage.setItem(LOYALTY_POINTS_KEY, (currentPoints - points).toString());
    return true;
  }
  return false;
};

export const pointsToEuros = (points: number): number => {
  // 100 points = €5
  return (points / 100) * 5;
};

// Review operations
export const getReviews = (menuItemId?: string): Review[] => {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(REVIEWS_KEY);
  const reviews: Review[] = stored ? JSON.parse(stored) : [];
  
  if (menuItemId) {
    return reviews.filter(r => r.menuItemId === menuItemId);
  }
  return reviews;
};

export const addReview = (menuItemId: string, rating: number, text: string): void => {
  if (typeof window === 'undefined') return;
  
  const reviews = getReviews();
  const newReview: Review = {
    id: Date.now().toString(),
    menuItemId,
    rating: Math.min(5, Math.max(1, rating)),
    text: text.substring(0, 500),
    timestamp: Date.now(),
  };
  reviews.push(newReview);
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
};

export const getAverageRating = (menuItemId: string): { average: number; count: number } => {
  const reviews = getReviews(menuItemId);
  if (reviews.length === 0) return { average: 0, count: 0 };
  
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return {
    average: sum / reviews.length,
    count: reviews.length,
  };
};

// Gamification/Achievements
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: number;
}

export const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_order',
    name: 'First Pizza 🍕',
    description: 'Complete your first order',
    icon: '🍕',
    unlocked: false,
  },
  {
    id: 'five_orders',
    name: 'Pizza Lover 🔥',
    description: 'Complete 5 orders',
    icon: '🔥',
    unlocked: false,
  },
  {
    id: 'ten_orders',
    name: 'Pizza Addict 😋',
    description: 'Complete 10 orders',
    icon: '😋',
    unlocked: false,
  },
  {
    id: 'spender_100',
    name: 'Big Spender 💰',
    description: 'Spend €100 total',
    icon: '💰',
    unlocked: false,
  },
  {
    id: 'review_master',
    name: 'Review Master ⭐',
    description: 'Write 5 reviews',
    icon: '⭐',
    unlocked: false,
  },
  {
    id: 'loyalty_100',
    name: 'Loyalty King 👑',
    description: 'Earn 100 loyalty points',
    icon: '👑',
    unlocked: false,
  },
];

export const getAchievements = (): Achievement[] => {
  if (typeof window === 'undefined') return DEFAULT_ACHIEVEMENTS;
  
  const stored = localStorage.getItem(ACHIEVEMENTS_KEY);
  return stored ? JSON.parse(stored) : DEFAULT_ACHIEVEMENTS;
};

export const unlockAchievement = (achievementId: string): void => {
  if (typeof window === 'undefined') return;
  
  const achievements = getAchievements();
  const achievement = achievements.find(a => a.id === achievementId);
  if (achievement && !achievement.unlocked) {
    achievement.unlocked = true;
    achievement.unlockedAt = Date.now();
    localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(achievements));
  }
};

export const checkAchievements = (orderCount: number, totalSpent: number, reviewCount: number, loyaltyPoints: number): string[] => {
  const unlockedIds: string[] = [];
  
  if (orderCount >= 1) unlockedIds.push('first_order');
  if (orderCount >= 5) unlockedIds.push('five_orders');
  if (orderCount >= 10) unlockedIds.push('ten_orders');
  if (totalSpent >= 100) unlockedIds.push('spender_100');
  if (reviewCount >= 5) unlockedIds.push('review_master');
  if (loyaltyPoints >= 100) unlockedIds.push('loyalty_100');
  
  unlockedIds.forEach(id => unlockAchievement(id));
  return unlockedIds;
};
