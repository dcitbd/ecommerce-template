import React, { useState, useEffect } from 'react';
import { Star, Check, X } from 'lucide-react';
import { ReviewService } from '../../../services/reviewService';
import { ProductReview } from '../../../types/review';

export const ReviewModerationTable: React.FC = () => {
  const [reviews, setReviews] = useState<ProductReview[]>([]);

  const load = async () => {
    const list = await ReviewService.getReviews();
    setReviews(list);
  };

  useEffect(() => {
    load();
  }, []);

  const handleToggle = async (id: string) => {
    await ReviewService.toggleReviewApproval(id);
    load();
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
      <h3 className="text-base font-bold text-slate-900 dark:text-white">
        কাস্টমার রিভিউ মডারেশন ({reviews.length})
      </h3>
      <div className="overflow-x-auto text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b bg-slate-50 dark:bg-slate-800/40">
              <th className="py-2 px-3">কাস্টমার</th>
              <th className="py-2 px-3">রেটিং</th>
              <th className="py-2 px-3">মন্তব্য</th>
              <th className="py-2 px-3">অনুমোদিত?</th>
              <th className="py-2 px-3 text-right">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((rev) => (
              <tr key={rev.id} className="border-b">
                <td className="py-2 px-3 font-bold">{rev.customerName}</td>
                <td className="py-2 px-3 text-amber-500 font-bold">{rev.rating} ★</td>
                <td className="py-2 px-3 text-slate-600 dark:text-slate-400">{rev.comment}</td>
                <td className="py-2 px-3 font-bold">
                  {rev.isApproved ? (
                    <span className="text-emerald-600">অনুমোদিত</span>
                  ) : (
                    <span className="text-amber-500">পেন্ডিং</span>
                  )}
                </td>
                <td className="py-2 px-3 text-right">
                  <button
                    onClick={() => handleToggle(rev.id)}
                    className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 font-bold text-[11px]"
                  >
                    {rev.isApproved ? 'বাতিল' : 'অনুমোদন দিন'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
