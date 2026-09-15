import React, { createContext, useContext } from 'react';
import { useWishlistStore } from '../store/wishlistStore';

const WishlistContext = createContext<ReturnType<typeof useWishlistStore> | null>(null);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const wishlist = useWishlistStore();
  return <WishlistContext.Provider value={wishlist}>{children}</WishlistContext.Provider>;
};

export const useWishlistContext = () => {
  const context = useContext(WishlistContext);
  if (!context) return useWishlistStore();
  return context;
};
