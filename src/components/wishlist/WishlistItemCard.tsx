import React from 'react';
import { Product } from '../../types/product';
import { ProductCard } from '../product/ProductCard';

export const WishlistItemCard: React.FC<{ product: Product }> = ({ product }) => {
  return <ProductCard product={product} />;
};
