import React from 'react';
import { Link } from 'react-router-dom';
import { Brand } from '../../types/brand';

interface BrandCardsProps {
  brands: Brand[];
}

export const BrandCards: React.FC<BrandCardsProps> = ({ brands }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 my-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            অফিশিয়াল ও ট্রাস্টেড ব্র্যান্ডস
          </h3>
          <p className="text-xs text-slate-500">১০০% জেনুইন অথেনটিক ব্র্যান্ড পার্টনার্স</p>
        </div>
        <Link to="/products" className="text-xs font-semibold text-emerald-600 hover:underline">
          সব ব্র্যান্ড দেখুন →
        </Link>
      </div>

      <div className="flex items-center space-x-4 overflow-x-auto pb-3 scrollbar-none">
        {brands.map((brand) => (
          <Link
            key={brand.id}
            to={`/products?brand=${brand.id}`}
            className="group flex flex-col items-center shrink-0 w-24 sm:w-28 text-center"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-slate-200 dark:border-slate-800 group-hover:border-emerald-500 bg-white dark:bg-slate-900 flex items-center justify-center p-3 shadow-sm transition transform group-hover:scale-105">
              <span className="font-extrabold text-xs sm:text-sm text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 truncate">
                {brand.name}
              </span>
            </div>
            <span className="mt-2 text-xs font-medium text-slate-700 dark:text-slate-300 truncate w-full">
              {brand.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
