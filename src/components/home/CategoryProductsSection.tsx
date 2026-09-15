import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../types/category';
import { Product } from '../../types/product';
import { ProductCard } from '../product/ProductCard';

interface Props {
  categories: Category[];
  products: Product[];
}

export const CategoryProductsSection: React.FC<Props> = ({ categories, products }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 space-y-12 my-10">
      {categories.map((cat) => {
        const catProducts = products
          .filter((p) => p.categoryId === cat.id || p.categoryName === cat.name)
          .slice(0, 12); // 2*6 = 12 cards per category requirement

        if (catProducts.length === 0) return null;

        return (
          <div key={cat.id} className="pt-4">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500">সেরা মানের প্রিমিয়াম কালেকশন</p>
              </div>
              <Link
                to={`/products?category=${cat.id}`}
                className="text-xs sm:text-sm font-semibold text-emerald-600 hover:underline px-3 py-1.5 rounded-lg border border-emerald-500/30 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition"
              >
                সি-অল বাটন (See All) →
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {catProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
