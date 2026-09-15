import { create } from 'zustand';
import { Product } from '../types/product';
import { WishlistItem } from '../types/wishlist';

interface WishlistStore {
  items: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
  clearWishlist: () => void;
}

const savedWishlist = localStorage.getItem('twbd_wishlist');

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: savedWishlist ? JSON.parse(savedWishlist) : [],
  addToWishlist: (product) => {
    if (!get().isInWishlist(product.id)) {
      const items = [...get().items, { id: 'wl_' + Date.now(), product, addedAt: new Date().toISOString() }];
      localStorage.setItem('twbd_wishlist', JSON.stringify(items));
      set({ items });
    }
  },
  removeFromWishlist: (productId) => {
    const items = get().items.filter((i) => i.product.id !== productId);
    localStorage.setItem('twbd_wishlist', JSON.stringify(items));
    set({ items });
  },
  isInWishlist: (productId) => get().items.some((i) => i.product.id === productId),
  toggleWishlist: (product) => {
    if (get().isInWishlist(product.id)) {
      get().removeFromWishlist(product.id);
    } else {
      get().addToWishlist(product);
    }
  },
  clearWishlist: () => {
    localStorage.removeItem('twbd_wishlist');
    set({ items: [] });
  }
}));
