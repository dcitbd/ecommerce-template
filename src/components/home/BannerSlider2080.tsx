import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Layers, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Category } from '../../types/category';
import { BannerItem } from '../../services/bannerService';

interface BannerSliderProps {
  categories: Category[];
  banners: BannerItem[];
}

export const BannerSlider2080: React.FC<BannerSliderProps> = ({ categories, banners }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // 10 slides requirement: fallback if banners are fewer than 10
  const slides = banners.length >= 10 ? banners : [
    ...banners,
    { id: 'b_f1', title: 'হংকং ও রাশিয়া ডিরেক্ট ইম্পোর্ট', subtitle: 'সবচেয়ে কম মূল্যে প্যাকেটজাত ইলেকট্রনিক্স', imageUrl: '/logo.svg', linkUrl: '/products?orderType=Pre-Order', sortOrder: 4, isActive: true },
    { id: 'b_f2', title: 'সুপার ফাস্ট হোম ডেলিভারি', subtitle: 'ঢাকার ভেতর ২৪-৪৮ ঘণ্টা, বাইরে ২-৪ দিনে ক্যাশ অন ডেলিভারি', imageUrl: '/logo.svg', linkUrl: '/products', sortOrder: 5, isActive: true },
    { id: 'b_f3', title: 'পাইকারি স্পেশাল রেট', subtitle: 'দোকানদার ও রীসেলারদের জন্য নিশ্চিত প্রফিট মার্জিন', imageUrl: '/logo.svg', linkUrl: '/products?orderType=WholeSale', sortOrder: 6, isActive: true },
    { id: 'b_f4', title: '২ সপ্তাহ রিপ্লেসমেন্ট ওয়ারেন্টি', subtitle: 'পণ্য হাতে পেয়ে চেক করার পূর্ণ নিরাপত্তা', imageUrl: '/logo.svg', linkUrl: '/products', sortOrder: 7, isActive: true },
    { id: 'b_f5', title: 'স্মার্টওয়াচ মেগা কালেকশন', subtitle: 'হুয়াওয়ে, ওয়ানপ্লাস ও অ্যামাজফিট অরিজিনাল এডিশন', imageUrl: '/logo.svg', linkUrl: '/products?category=cat_smartwatch', sortOrder: 8, isActive: true },
    { id: 'b_f6', title: 'ট্যাকটিক্যাল সার্চলাইট ও গ্যাজেট', subtitle: 'নাইট ভিশন ও দীর্ঘস্থায়ী ব্যাটারি সমৃদ্ধ', imageUrl: '/logo.svg', linkUrl: '/products?category=cat_torch', sortOrder: 9, isActive: true },
    { id: 'b_f7', title: 'দৈনিক নতুন প্রাইস আপডেট', subtitle: 'সেরা ডিল মিস করবেন না, এখনই ভিজিট করুন', imageUrl: '/logo.svg', linkUrl: '/products', sortOrder: 10, isActive: true }
  ].slice(0, 10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="max-w-7xl mx-auto px-4 my-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* 20% Category Sidebar (approx 3 cols) */}
        <div className="hidden lg:block lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center space-x-2 pb-3 mb-3 border-b border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-sm">
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>ক্যাটাগরি সমূহ</span>
          </div>
          <div className="space-y-1">
            {categories.slice(0, 8).map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.id}`}
                className="flex items-center justify-between p-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-700 dark:hover:text-emerald-400 transition"
              >
                <span className="truncate">{cat.name}</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </Link>
            ))}
          </div>
        </div>

        {/* 80% Sliding Banner (9 cols) */}
        <div className="lg:col-span-9 relative bg-slate-900 rounded-2xl overflow-hidden shadow-md min-h-[260px] sm:min-h-[340px] flex items-center">
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out flex flex-col justify-center px-6 sm:px-12 ${
                idx === currentSlide ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
              style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.85) 100%)'
              }}
            >
              <div className="max-w-xl">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-3">
                  <Sparkles className="w-3 h-3 mr-1" /> {slide.badge || 'হট ডিল ২০২৬'}
                </span>
                <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  {slide.title}
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-slate-300 line-clamp-2">
                  {slide.subtitle}
                </p>
                <div className="mt-5 flex items-center space-x-3">
                  <Link
                    to={slide.linkUrl}
                    className="inline-flex items-center px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/25 transition"
                  >
                    অর্ডার করুন এখনই
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Link>
                  <Link
                    to="/products?orderType=Pre-Order"
                    className="inline-flex items-center px-4 py-2.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-200 text-xs sm:text-sm transition"
                  >
                    দুবাই প্রি-অর্ডার
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Slider Controls */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex space-x-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === currentSlide ? 'w-6 bg-emerald-500' : 'w-2 bg-slate-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
