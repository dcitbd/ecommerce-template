import React from 'react';
import { Tag } from 'lucide-react';
import { Brand } from '../../../types/brand';

export const BrandList: React.FC<{ brands: Brand[] }> = ({ brands }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
      <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center">
        <Tag className="w-4 h-4 mr-2 text-emerald-600" /> ব্র্যান্ড সমূহ ({brands.length})
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {brands.map((b) => (
          <div key={b.id} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold">
            {b.name}
          </div>
        ))}
      </div>
    </div>
  );
};
