import React from 'react';

export const CustomerStatsCard: React.FC<{ title: string; value: string | number }> = ({ title, value }) => {
  return (
    <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
      <span className="text-xs text-slate-500">{title}</span>
      <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">{value}</p>
    </div>
  );
};
