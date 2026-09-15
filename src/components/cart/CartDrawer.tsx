import React from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';

export const CartDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { items, totalAmount } = useCartStore();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end">
      <div className="w-88 max-w-full bg-white dark:bg-slate-900 h-full p-5 flex flex-col justify-between shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b">
          <h3 className="font-bold text-sm flex items-center">
            <ShoppingBag className="w-4 h-4 mr-2 text-emerald-600" /> আপনার কার্ট
          </h3>
          <button onClick={onClose}><X className="w-5 h-5" /></button>
        </div>
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {items.map((i) => (
            <div key={i.id} className="text-xs flex justify-between">
              <span>{i.product.name} (x{i.quantity})</span>
              <span className="font-bold">৳{i.totalPrice}</span>
            </div>
          ))}
        </div>
        <div className="pt-3 border-t">
          <div className="flex justify-between font-bold text-sm mb-3">
            <span>মোট:</span>
            <span className="text-emerald-600">৳{totalAmount()}</span>
          </div>
          <Link to="/checkout" onClick={onClose} className="w-full py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs block text-center">
            চেকআউট
          </Link>
        </div>
      </div>
    </div>
  );
};
