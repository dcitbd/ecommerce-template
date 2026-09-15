import React from 'react';

export const SalesReport: React.FC = () => {
  return (
    <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
      <h3 className="text-base font-bold text-slate-900 dark:text-white">বিক্রয় ও রাজস্ব প্রতিবেদন (Sales Report)</h3>
      <p className="text-xs text-slate-500 mt-1">দৈনিক, সাপ্তাহিক ও মাসিক বিক্রয় বিবরণী।</p>
    </div>
  );
};
