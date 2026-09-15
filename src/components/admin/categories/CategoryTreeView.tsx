import React from 'react';
import { Layers, ChevronRight, Plus } from 'lucide-react';
import { Category } from '../../../types/category';

export const CategoryTreeView: React.FC<{ categories: Category[] }> = ({ categories }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
      <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center">
        <Layers className="w-4 h-4 mr-2 text-emerald-600" /> ক্যাটাগরি হায়ারার্কি ট্রি
      </h3>
      <div className="space-y-3">
        {categories.map((cat) => (
          <div key={cat.id} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between font-bold text-xs text-slate-900 dark:text-white">
              <span>{cat.name}</span>
              <span className="text-[10px] text-slate-400 font-mono">/{cat.slug}</span>
            </div>
            {cat.children && cat.children.length > 0 && (
              <div className="pl-4 mt-2 space-y-1.5 border-l-2 border-emerald-500">
                {cat.children.map((sub) => (
                  <div key={sub.id} className="text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex items-center space-x-1.5">
                      <ChevronRight className="w-3 h-3 text-slate-400" />
                      <span>{sub.name}</span>
                    </div>
                    {sub.children && (
                      <div className="pl-4 mt-1 space-y-1 text-[11px] text-slate-400">
                        {sub.children.map((child) => (
                          <p key={child.id}>• {child.name}</p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
