import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { CartItem } from '../../types/cart';
import { useCartStore } from '../../store/cartStore';

export const CartItemRow: React.FC<{ item: CartItem }> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCartStore();

  return (
    <div className="flex items-center space-x-4 py-4 border-b border-slate-100 dark:border-slate-800">
      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-xl p-2 shrink-0 flex items-center justify-center">
        <img src={item.product.coverImage} alt={item.product.name} className="max-h-full object-contain" />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-slate-900 dark:text-white truncate">
          {item.product.name}
        </h4>
        <div className="flex items-center space-x-2 text-xs text-slate-400 mt-1">
          <span className="font-mono text-emerald-600 font-medium">SKU: {item.product.articleSku}</span>
          {item.selectedColor && <span>• কালার: {item.selectedColor}</span>}
          {item.selectedSize && <span>• সাইজ: {item.selectedSize}</span>}
          <span>• টাইপ: {item.orderType}</span>
        </div>
        <div className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
          ৳{item.unitPrice} × {item.quantity} = <span className="text-emerald-600">৳{item.totalPrice}</span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="px-3 text-xs font-bold text-slate-800 dark:text-slate-100">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          onClick={() => removeFromCart(item.id)}
          className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition"
          title="রিমুভ করুন"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
