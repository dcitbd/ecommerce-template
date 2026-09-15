import React from 'react';

export const Loader: React.FC<{ label?: string }> = ({ label = 'লোড হচ্ছে...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-3">
      <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      <span className="text-xs text-slate-500 font-medium">{label}</span>
    </div>
  );
};
