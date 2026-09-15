import React from 'react';
import { Heart, ShoppingBag, PhoneCall, CheckCircle, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../../types/product';
import { calculateDiscountPercentage } from '../../utils/discountCalculator';
import { useWishlistStore } from '../../store/wishlistStore';
import { useCartStore } from '../../store/cartStore';
import { siteConfig } from '../../config/siteConfig';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const addToCart = useCartStore((s) => s.addToCart);
  const navigate = useNavigate();

  const isFavorited = isInWishlist(product.id);
  const discount = calculateDiscountPercentage(product.mrpPrice, product.retailPrice);
  const isPreOrder = product.stock <= 0 || product.orderTypes.includes('Pre-Order');

  const handleOrderNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, isPreOrder ? 'Pre-Order' : 'Retail');
    navigate('/checkout');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, isPreOrder ? 'Pre-Order' : 'Retail');
  };

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const msg = encodeURIComponent(
      `হ্যালো Techno World BD, আমি এই প্রোডাক্টটি অর্ডার করতে চাই:\n\nপ্রোডাক্ট: ${product.name}\nSKU: ${product.articleSku}\nমূল্য: ৳${product.retailPrice}`
    );
    window.open(`https://wa.me/8801351009358?text=${msg}`, '_blank');
  };

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Badges & Wishlist */}
      <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
        {discount > 0 && (
          <span className="bg-rose-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm">
            -{discount}% ছাড়
          </span>
        )}
        {product.orderTypes.includes('Pre-Order') && (
          <span className="bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm flex items-center">
            <Clock className="w-2.5 h-2.5 mr-0.5" /> দুবাই প্রি-অর্ডার
          </span>
        )}
        {product.wholesalePrice && (
          <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            পাইকারি: ৳{product.wholesalePrice}
          </span>
        )}
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWishlist(product);
        }}
        className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-800/90 shadow-md flex items-center justify-center text-slate-600 dark:text-slate-200 hover:text-rose-500 transition"
        title="Love"
      >
        <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
      </button>

      {/* Product Image */}
      <Link to={`/product/${product.slug}`} className="block relative aspect-square bg-slate-50 dark:bg-slate-800/50 p-4 overflow-hidden">
        <img
          src={product.coverImage}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Product Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span className="font-mono font-semibold text-emerald-600">SKU: {product.articleSku}</span>
            <span>{product.brandName}</span>
          </div>

          <Link to={`/product/${product.slug}`}>
            <h4 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 hover:text-emerald-600 transition line-clamp-2 leading-snug">
              {product.name}
            </h4>
          </Link>

          {/* Pricing Row */}
          <div className="mt-2.5 flex items-baseline space-x-2">
            <span className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
              ৳{product.retailPrice}
            </span>
            {product.mrpPrice > product.retailPrice && (
              <span className="text-xs text-slate-400 line-through">
                ৳{product.mrpPrice}
              </span>
            )}
          </div>

          {/* Wholesale Notice */}
          {product.wholesalePrice && (
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
              হোলসেল: ৳{product.wholesalePrice} (মিনিমাম {product.wholesaleMinQty || 10} পিস)
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-1.5">
            {/* Order Now or Pre-Order Button */}
            <button
              onClick={handleOrderNow}
              className={`py-2 px-2.5 rounded-lg text-xs font-bold transition flex items-center justify-center ${
                isPreOrder
                  ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              {isPreOrder ? 'প্রি-অর্ডার করুন' : 'অর্ডার নাও'}
            </button>

            {/* Cart Button */}
            <button
              onClick={handleAddToCart}
              className="py-2 px-2.5 rounded-lg text-xs font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition flex items-center justify-center"
            >
              <ShoppingBag className="w-3.5 h-3.5 mr-1 text-emerald-500" />
              কার্ট
            </button>
          </div>

          {/* WhatsApp Direct Order Button */}
          <button
            onClick={handleWhatsAppOrder}
            className="w-full py-1.5 px-3 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition flex items-center justify-center"
          >
            <PhoneCall className="w-3 h-3 mr-1.5 text-emerald-600" />
            হোয়াটসঅ্যাপে অর্ডার
          </button>
        </div>
      </div>
    </div>
  );
};
