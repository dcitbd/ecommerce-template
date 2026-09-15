import React from 'react';

export const SalesChart: React.FC = () => {
  return (
    <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
      <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-4">মাসিক বিক্রয় ও রেভিনিউ গ্রাফ</h4>
      <div className="h-40 flex items-end justify-between space-x-2 pt-8">
        {[40, 65, 55, 80, 70, 95, 85].map((h, i) => (
          <div key={i} className="flex-1 bg-emerald-500 rounded-t-lg transition-all hover:bg-emerald-600" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
};
