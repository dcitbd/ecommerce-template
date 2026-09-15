import React from 'react';
import { Order } from '../../../types/order';

export const OrderDetailsAccordion: React.FC<{ order: Order }> = ({ order }) => {
  return (
    <div className="p-3 bg-slate-50 text-xs">
      <p>অর্ডার নম্বর: {order.orderNumber}</p>
      <p>ঠিকানা: {order.shippingAddress}</p>
    </div>
  );
};
