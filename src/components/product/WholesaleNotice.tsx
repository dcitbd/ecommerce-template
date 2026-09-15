import React from 'react';

export const WholesaleNotice: React.FC<{ minQty: number; price: number }> = ({ minQty, price }) => {
  return (
    <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold">
      হোলসেল রেট: ৳{price} (নূন্যতম {minQty} পিস)
    </div>
  );
};
