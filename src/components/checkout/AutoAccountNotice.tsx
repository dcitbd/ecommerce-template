import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const AutoAccountNotice: React.FC = () => {
  return (
    <div className="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-800 flex items-center space-x-2">
      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
      <span>অর্ডার সম্পন্ন হওয়ার পর আপনার ফোন নম্বরে অটো একাউন্ট ও পাসওয়ার্ড এসএমএস যাবে।</span>
    </div>
  );
};
