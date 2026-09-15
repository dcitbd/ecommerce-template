import React from 'react';

export const PriceDisplay: React.FC<{ price: number; mrp?: number }> = ({ price, mrp }) => {
  return (
    <div className="flex items-baseline space-x-2">
      <span className="text-base font-extrabold text-slate-900 dark:text-white">৳{price}</span>
      {mrp && mrp > price && <span className="text-xs text-slate-400 line-through">৳{mrp}</span>}
    </div>
  );
};
