import React from 'react';
import { Order } from '../../types/order';

export const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
  return (
    <div className="p-4 border rounded-2xl">
      <h4 className="font-bold text-xs">{order.orderNumber}</h4>
      <p className="text-xs text-slate-500">৳{order.totalAmount} • {order.status}</p>
    </div>
  );
};
