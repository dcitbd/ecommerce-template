import React from 'react';

export const OrderReport: React.FC = () => {
  return (
    <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
      <h3 className="text-base font-bold text-slate-900 dark:text-white">অর্ডার পরিসংখ্যান প্রতিবেদন (Order Report)</h3>
      <p className="text-xs text-slate-500 mt-1">স্ট্যাটাস ভিত্তিক অর্ডার বিশ্লেষণ ও বাতিল অনুপাত।</p>
    </div>
  );
};
