import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { CartItemRow } from '../../components/cart/CartItemRow';
import { CartSummary } from '../../components/cart/CartSummary';
import { SEO } from '../../seo/SEO';

export const CartPage: React.FC = () => {
  const { items, clearCart } = useCartStore();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <SEO title="শপিং কার্ট | Techno World BD" />

      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center">
          <ShoppingBag className="w-5 h-5 mr-2 text-emerald-600" />
          আপনার শপিং কার্ট ({items.length})
        </h1>
        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs text-rose-500 font-bold hover:underline"
          >
            সব খালি করুন
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center max-w-md mx-auto space-y-4">
          <p className="text-sm text-slate-500">আপনার কার্ট বর্তমানে খালি রয়েছে।</p>
          <Link
            to="/products"
            className="inline-flex items-center px-5 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow transition"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" /> পণ্য বাছাই করুন
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {items.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </div>
          </div>
          <div className="lg:col-span-4">
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  );
};
