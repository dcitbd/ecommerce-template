import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, X, ChevronRight } from 'lucide-react';
import { Category } from '../../types/category';

export const CategoryDrawer: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
}> = ({ isOpen, onClose, categories }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex">
      <div className="w-80 bg-white dark:bg-slate-900 h-full p-5 flex flex-col justify-between shadow-2xl">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center">
              <Layers className="w-4 h-4 mr-2 text-emerald-600" /> সকল ক্যাটাগরি
            </h3>
            <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4 space-y-1 overflow-y-auto max-h-[70vh]">
            {categories.map((c) => (
              <Link
                key={c.id}
                to={`/products?category=${c.id}`}
                onClick={onClose}
                className="flex items-center justify-between p-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-600"
              >
                <span>{c.name}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
