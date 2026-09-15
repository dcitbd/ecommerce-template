import React from 'react';
import { OrderForm } from '../../components/checkout/OrderForm';
import { SEO } from '../../seo/SEO';

export const CheckoutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <SEO title="অর্ডার কনফার্মেশন ও চেকআউট | Techno World BD" />
      <div className="mb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          চেকআউট ও অর্ডার সম্পন্নকরণ
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          ডেলিভারি ঠিকানা ও পেমেন্ট মেথড নির্বাচন করে অর্ডার নিশ্চিত করুন।
        </p>
      </div>

      <OrderForm />
    </div>
  );
};
