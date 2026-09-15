import { create } from 'zustand';
import { Product } from '../types/product';

interface ProductStore {
  products: Product[];
  selectedCategory: string | null;
  searchQuery: string;
  setProducts: (products: Product[]) => void;
  setSelectedCategory: (categoryId: string | null) => void;
  setSearchQuery: (query: string) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  selectedCategory: null,
  searchQuery: '',
  setProducts: (products) => set({ products }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setSearchQuery: (searchQuery) => set({ searchQuery })
}));
