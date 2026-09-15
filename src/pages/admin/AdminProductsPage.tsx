import React from 'react';
import { ProductTable } from '../../components/admin/products/ProductTable';
import { useProducts } from '../../hooks/useProducts';

export const AdminProductsPage: React.FC = () => {
  const { products, refetch } = useProducts();
  return <ProductTable products={products} onRefresh={refetch} onOpenAddModal={() => {}} onOpenBulkModal={() => {}} onEditProduct={() => {}} />;
};
