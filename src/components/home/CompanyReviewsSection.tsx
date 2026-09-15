import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { ProductReview } from '../../types/review';

interface ReviewsProps {
  reviews: ProductReview[];
}

export const CompanyReviewsSection: React.FC<ReviewsProps> = ({ reviews }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 my-12">
      <div className="text-center mb-8">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          কাস্টমারদের নির্ভরযোগ্য রিভিউ ও প্রতিক্রিয়া
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          সারাদেশের শত শত সন্তুষ্ট ক্রেতা ও পাইকারি ব্যবসায়ীদের বিশ্বস্ত পছন্দ
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.slice(0, 3).map((r) => (
          <div
            key={r.id}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center space-x-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < r.rating ? 'fill-current' : 'text-slate-300 dark:text-slate-700'}`}
                  />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic mb-4">
                "{r.comment}"
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <div>
                <h5 className="font-bold text-slate-900 dark:text-white flex items-center">
                  {r.customerName}
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 ml-1" />
                </h5>
                <p className="text-[11px] text-slate-400">{r.productName || 'ভেরিফাইড অর্ডার'}</p>
              </div>
              <span className="text-[10px] text-slate-400">২ সপ্তাহ ওয়ারেন্টি সহ</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
