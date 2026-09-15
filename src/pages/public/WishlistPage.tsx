import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft } from 'lucide-react';
import { useWishlistStore } from '../../store/wishlistStore';
import { ProductCard } from '../../components/product/ProductCard';
import { SEO } from '../../seo/SEO';

export const WishlistPage: React.FC = () => {
  const { items, clearWishlist } = useWishlistStore();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <SEO title="পছন্দের তালিকা (Love Page) | Techno World BD" />

      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center">
          <Heart className="w-5 h-5 mr-2 text-rose-500 fill-rose-500" />
          পছন্দের তালিকা (Love Page) ({items.length})
        </h1>
        {items.length > 0 && (
          <button
            onClick={clearWishlist}
            className="text-xs text-rose-500 font-bold hover:underline"
          >
            সব মুছুন
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center max-w-md mx-auto space-y-4">
          <p className="text-sm text-slate-500">আপনার পছন্দের তালিকায় কোন প্রোডাক্ট নেই।</p>
          <Link
            to="/products"
            className="inline-flex items-center px-5 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow transition"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" /> প্রোডাক্ট দেখুন
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <ProductCard key={item.product.id} product={item.product} />
          ))}
        </div>
      )}
    </div>
  );
};
