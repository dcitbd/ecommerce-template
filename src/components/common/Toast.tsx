import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3 px-4 py-3 rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-800 text-xs animate-in slide-in-from-bottom-4">
      {type === 'success' ? (
        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
      ) : (
        <AlertCircle className="w-4 h-4 text-rose-400" />
      )}
      <span className="font-semibold">{message}</span>
      <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
