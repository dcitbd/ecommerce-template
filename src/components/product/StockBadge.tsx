import React from 'react';

export const StockBadge: React.FC<{ stock: number }> = ({ stock }) => {
  return stock > 0 ? (
    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">ইন স্টক ({stock})</span>
  ) : (
    <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">প্রি-অর্ডার</span>
  );
};
