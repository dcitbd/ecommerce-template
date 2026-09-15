import { useEffect, useState } from 'react';
import { CategoryService } from '../services/categoryService';
import { Category } from '../types/category';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    CategoryService.getCategories().then(setCategories);
  }, []);

  return { categories, refetch: () => CategoryService.getCategories().then(setCategories) };
};
