import React from 'react';
import { Product } from '../types/product';
import { SEO } from './SEO';

export const ProductSEO: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <SEO
      title={`${product.name} | Techno World BD`}
      description={`${product.name} - সেরা পাইকারি ও প্রি-অর্ডার মূল্য ৳${product.retailPrice}. ${product.description.slice(0, 120)}`}
      image={product.coverImage}
    />
  );
};
