import React from 'react';
import { Order } from '../../../types/order';

export const RecentOrdersWidget: React.FC<{ orders: Order[] }> = ({ orders }) => {
  return (
    <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
      <h4 className="font-bold mb-3">সাম্প্রতিক অর্ডার সমূহ</h4>
      <ul className="space-y-2">
        {orders.slice(0, 5).map((o) => (
          <li key={o.id} className="flex justify-between border-b pb-1">
            <span>{o.orderNumber} - {o.customerName}</span>
            <span className="font-bold font-mono">৳{o.totalAmount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
