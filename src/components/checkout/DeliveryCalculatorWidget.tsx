import React from 'react';

export const DeliveryCalculatorWidget: React.FC<{ area: string; weight: number }> = ({ area, weight }) => {
  return (
    <div className="p-3 bg-slate-50 rounded-xl text-xs">
      ডেলিভারি এরিয়া: {area} • পার্সেল ওজন: {weight} কেজি
    </div>
  );
};
