import React, { createContext, useContext } from 'react';
import { useCartStore } from '../store/cartStore';

const CartContext = createContext<ReturnType<typeof useCartStore> | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const cart = useCartStore();
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) return useCartStore();
  return context;
};
