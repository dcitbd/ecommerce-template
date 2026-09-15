import React from 'react';

export const OrderTimeline: React.FC<{ status: string }> = ({ status }) => {
  const steps = ['Pending', 'Accepted', 'Confirmed', 'Sent', 'Delivered'];
  return (
    <div className="flex items-center space-x-2 text-xs py-2">
      {steps.map((s) => (
        <span key={s} className={`px-2 py-1 rounded font-bold ${s === status ? 'bg-emerald-600 text-white' : 'bg-slate-100'}`}>
          {s}
        </span>
      ))}
    </div>
  );
};
