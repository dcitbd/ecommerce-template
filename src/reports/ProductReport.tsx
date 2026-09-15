import React from 'react';

export const ProductReport: React.FC = () => {
  return (
    <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
      <h3 className="text-base font-bold text-slate-900 dark:text-white">প্রোডাক্ট পারফরম্যান্স প্রতিবেদন (Product Report)</h3>
      <p className="text-xs text-slate-500 mt-1">সর্বাধিক বিক্রিত পণ্য ও ভিউ সংখ্যা।</p>
    </div>
  );
};
