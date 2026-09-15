import React from 'react';

export const CustomerRiskBadge: React.FC<{ risk: string }> = ({ risk }) => {
  return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">{risk}</span>;
};
