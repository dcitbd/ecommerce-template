import React from 'react';
import { CategoryTreeView } from '../../components/admin/categories/CategoryTreeView';
import { useCategories } from '../../hooks/useCategories';

export const AdminCategoriesPage: React.FC = () => {
  const { categories } = useCategories();
  return <CategoryTreeView categories={categories} />;
};
