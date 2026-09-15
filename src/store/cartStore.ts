import { create } from 'zustand';
import { CartItem } from '../types/cart';
import { Product, OrderType } from '../types/product';
import { calculateEffectivePrice } from '../utils/priceCalculator';

interface CartStore {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, orderType?: OrderType, color?: string, size?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalAmount: () => number;
  totalWeight: () => number;
}

const savedCart = localStorage.getItem('twbd_cart_items');

export const useCartStore = create<CartStore>((set, get) => ({
  items: savedCart ? JSON.parse(savedCart) : [],
  addToCart: (product, quantity = 1, orderType = 'Retail', color, size) => {
    const items = [...get().items];
    const unitPrice = calculateEffectivePrice(product, orderType, quantity);
    const existingIndex = items.findIndex(
      (i) => i.product.id === product.id && i.orderType === orderType && i.selectedColor === color && i.selectedSize === size
    );

    if (existingIndex > -1) {
      items[existingIndex].quantity += quantity;
      items[existingIndex].totalPrice = items[existingIndex].quantity * items[existingIndex].unitPrice;
    } else {
      items.push({
        id: 'cart_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        product,
        quantity,
        orderType,
        selectedColor: color,
        selectedSize: size,
        unitPrice,
        totalPrice: unitPrice * quantity
      });
    }

    localStorage.setItem('twbd_cart_items', JSON.stringify(items));
    set({ items });
  },
  removeFromCart: (itemId) => {
    const items = get().items.filter((i) => i.id !== itemId);
    localStorage.setItem('twbd_cart_items', JSON.stringify(items));
    set({ items });
  },
  updateQuantity: (itemId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(itemId);
      return;
    }
    const items = get().items.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          quantity,
          totalPrice: item.unitPrice * quantity
        };
      }
      return item;
    });
    localStorage.setItem('twbd_cart_items', JSON.stringify(items));
    set({ items });
  },
  clearCart: () => {
    localStorage.removeItem('twbd_cart_items');
    set({ items: [] });
  },
  totalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
  totalAmount: () => get().items.reduce((acc, item) => acc + item.totalPrice, 0),
  totalWeight: () => get().items.reduce((acc, item) => acc + (item.product.weightKg || 0.5) * item.quantity, 0)
}));
