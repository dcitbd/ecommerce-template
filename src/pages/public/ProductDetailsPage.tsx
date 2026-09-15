import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, Truck, Clock, ShoppingBag, PhoneCall, Heart, Check, Star } from 'lucide-react';
import { ProductService } from '../../services/productService';
import { Product } from '../../types/product';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { calculateDiscountPercentage } from '../../utils/discountCalculator';
import { ProductSEO } from '../../seo/ProductSEO';

export const ProductDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [orderType, setOrderType] = useState<'Retail' | 'Pre-Order' | 'WholeSale'>('Retail');

  const addToCart = useCartStore((s) => s.addToCart);
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      ProductService.getProductBySlug(slug).then((p) => {
        if (p) {
          setProduct(p);
          setSelectedImage(p.coverImage);
          if (p.colors?.length) setSelectedColor(p.colors[0]);
          if (p.sizes?.length) setSelectedSize(p.sizes[0]);
          if (p.orderTypes.includes('Pre-Order')) setOrderType('Pre-Order');
        }
      });
    }
  }, [slug]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-slate-500">প্রোডাক্ট লোড হচ্ছে...</p>
      </div>
    );
  }

  const discount = calculateDiscountPercentage(product.mrpPrice, product.retailPrice);
  const effectivePrice =
    orderType === 'WholeSale' && product.wholesalePrice
      ? product.wholesalePrice
      : orderType === 'Pre-Order' && product.preOrderPrice
      ? product.preOrderPrice
      : product.retailPrice;

  const handleOrderNow = () => {
    addToCart(product, quantity, orderType, selectedColor, selectedSize);
    navigate('/checkout');
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, orderType, selectedColor, selectedSize);
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `হ্যালো Techno World BD, আমি এই প্রোডাক্টটি অর্ডার করতে চাই:\n\nপ্রোডাক্ট: ${product.name}\nSKU: ${product.articleSku}\nপরিমাণ: ${quantity}\nঅর্ডার টাইপ: ${orderType}\nএকক মূল্য: ৳${effectivePrice}`
    );
    window.open(`https://wa.me/8801351009358?text=${msg}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <ProductSEO product={product} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        {/* Left Column: Image Slider / Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="aspect-square bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-6 flex items-center justify-center overflow-hidden border border-slate-100 dark:border-slate-800">
            <img src={selectedImage} alt={product.name} className="max-h-full object-contain" />
          </div>

          {/* Thumbnail row */}
          {product.images?.length > 1 && (
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 rounded-xl border-2 p-1 bg-slate-50 dark:bg-slate-800 shrink-0 ${
                    selectedImage === img ? 'border-emerald-500' : 'border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Info & Pricing */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center space-x-2 text-xs text-slate-400 mb-2">
              <span className="font-mono font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                SKU: {product.articleSku}
              </span>
              <span>•</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">{product.brandName}</span>
              <span>•</span>
              <span className="text-amber-500 font-semibold">{product.condition}</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
              {product.name}
            </h1>
          </div>

          {/* Pricing Box */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-baseline justify-between">
            <div>
              <div className="flex items-baseline space-x-3">
                <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  ৳{effectivePrice}
                </span>
                {product.mrpPrice > effectivePrice && (
                  <span className="text-sm text-slate-400 line-through">
                    ৳{product.mrpPrice}
                  </span>
                )}
                {discount > 0 && (
                  <span className="text-xs font-bold text-rose-500">
                    -{discount}% অফার
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1">ক্যাশ অন ডেলিভারি ও দ্রুত ডেলিভারি প্রযোজ্য</p>
            </div>

            <button
              onClick={() => toggleWishlist(product)}
              className="p-2.5 rounded-full border border-slate-200 dark:border-slate-700 hover:text-rose-500 transition"
              title="Love"
            >
              <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>

          {/* Wholesale Notice & Tiers */}
          {product.wholesalePrice && (
            <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
              <div>
                <span className="font-bold">হোলসেল রেট: ৳{product.wholesalePrice}</span>
                <span className="ml-2 text-[11px] text-slate-600 dark:text-slate-400">(মিনিমাম {product.wholesaleMinQty || 10} পিস)</span>
              </div>
              <button
                onClick={() => {
                  setOrderType('WholeSale');
                  setQuantity(Math.max(quantity, product.wholesaleMinQty || 10));
                }}
                className="px-2.5 py-1 bg-emerald-600 text-white rounded font-bold hover:bg-emerald-700 transition"
              >
                হোলসেলে নিন
              </button>
            </div>
          )}

          {/* Colors Selection */}
          {product.colors?.length > 0 && (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                কালার: <span className="text-emerald-600">{selectedColor}</span>
              </label>
              <div className="flex space-x-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                      selectedColor === c
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleOrderNow}
                className="py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-md transition flex items-center justify-center"
              >
                {product.stock <= 0 ? 'প্রি-অর্ডার করুন' : 'অর্ডার নাও'}
              </button>
              <button
                onClick={handleAddToCart}
                className="py-3 px-4 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold rounded-xl text-sm transition flex items-center justify-center"
              >
                <ShoppingBag className="w-4 h-4 mr-2 text-emerald-600" />
                কার্টে যোগ করুন
              </button>
            </div>

            <button
              onClick={handleWhatsApp}
              className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold rounded-xl text-sm shadow-md transition flex items-center justify-center"
            >
              <PhoneCall className="w-4 h-4 mr-2" />
              হোয়াটসঅ্যাপে সরাসরি অর্ডার
            </button>
          </div>

          {/* Terms Badges */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-[11px] text-slate-500">
            <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
              <span>২ সপ্তাহ ওয়ারেন্টি</span>
            </div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <Clock className="w-4 h-4 text-amber-500 mx-auto mb-1" />
              <span>১০-১৫ দিনে ডেলিভারি</span>
            </div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <Truck className="w-4 h-4 text-sky-500 mx-auto mb-1" />
              <span>সারা দেশে ক্যাশ অন</span>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications & Description */}
      <div className="mt-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
          প্রোডাক্ট স্পেসিফিকেশন ও বিস্তারিত
        </h3>

        {product.specifications && Object.keys(product.specifications).length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {Object.entries(product.specifications).map(([key, val]) => (
              <div key={key} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl text-xs flex justify-between">
                <span className="font-semibold text-slate-500">{key}:</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">{val}</span>
              </div>
            ))}
          </div>
        )}

        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
          {product.description}
        </p>
      </div>
    </div>
  );
};
