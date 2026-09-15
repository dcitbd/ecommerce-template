import React from 'react';
import { ORDER_STATUS_COLORS } from '../../constants/orderStatus';

export const OrderStatusBadge: React.FC<{ status: string }> = ({ status }) => {
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${ORDER_STATUS_COLORS[status] || 'bg-slate-100'}`}>
      {status}
    </span>
  );
};
