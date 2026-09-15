import React from 'react';
import { Maximize } from 'lucide-react';
import { ProductSize } from '../../../types/size';

export const SizeList: React.FC<{ sizes: ProductSize[] }> = ({ sizes }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
      <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center">
        <Maximize className="w-4 h-4 mr-2 text-emerald-600" /> সাইজ ও কিট ভ্যারিয়েন্ট
      </h3>
      <div className="flex flex-wrap gap-2">
        {sizes.map((s) => (
          <span key={s.id} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-semibold">
            {s.name}
          </span>
        ))}
      </div>
    </div>
  );
};
