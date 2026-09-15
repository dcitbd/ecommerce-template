import React from 'react';
import { WishlistItem } from '../../types/wishlist';
import { ProductCard } from '../product/ProductCard';

export const WishlistGrid: React.FC<{ items: WishlistItem[] }> = ({ items }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {items.map((i) => (
        <ProductCard key={i.product.id} product={i.product} />
      ))}
    </div>
  );
};
