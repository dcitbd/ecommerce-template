import React from 'react';
import { PAYMENT_TYPES } from '../../constants/paymentTypes';

export const PaymentMethodSelector: React.FC<{ selected: string; onSelect: (id: string) => void }> = ({ selected, onSelect }) => {
  return (
    <div className="space-y-2">
      {PAYMENT_TYPES.map((p) => (
        <div key={p.id} onClick={() => onSelect(p.id)} className="p-3 border rounded-xl cursor-pointer text-xs flex justify-between">
          <span>{p.name}</span>
          <input type="radio" checked={selected === p.id} readOnly />
        </div>
      ))}
    </div>
  );
};
