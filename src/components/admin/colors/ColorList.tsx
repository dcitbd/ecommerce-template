import React from 'react';
import { Palette } from 'lucide-react';
import { ProductColor } from '../../../types/color';

export const ColorList: React.FC<{ colors: ProductColor[] }> = ({ colors }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
      <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center">
        <Palette className="w-4 h-4 mr-2 text-emerald-600" /> সক্রিয় কালার প্যালেট ({colors.length})
      </h3>
      <div className="flex flex-wrap gap-2">
        {colors.map((c) => (
          <div key={c.id} className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold">
            <span className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-sm" style={{ backgroundColor: c.hexCode }} />
            <span>{c.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
