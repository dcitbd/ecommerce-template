import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { ProductCard } from '../product/ProductCard';

interface PopularProps {
  products: Product[];
}

export const PopularProductsGrid: React.FC<PopularProps> = ({ products }) => {
  // 2*6 = 12 popular products requirement
  const popular = products.slice(0, 12);

  return (
    <div className="max-w-7xl mx-auto px-4 my-10">
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center">
            সবচেয়ে জনপ্রিয় প্রোডাক্ট সমূহ 🔥
          </h3>
          <p className="text-xs text-slate-500">টপ সেলিং গ্যাজেট ও বেস্ট ডিল কালেকশন</p>
        </div>
        <Link
          to="/products"
          className="text-xs sm:text-sm font-semibold text-emerald-600 hover:underline"
        >
          সব দেখুন (See All) →
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {popular.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
