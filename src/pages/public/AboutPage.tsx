import React from 'react';
import { siteConfig } from '../../config/siteConfig';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-2xl font-bold">{siteConfig.name} সম্পর্কে</h1>
      <p className="text-sm text-slate-600 leading-relaxed">
        {siteConfig.description} আমরা সরাসরি দুবাই, হংকং ও রাশিয়া থেকে পাইকারি ও খুচরা ইলেকট্রনিক্স ও গ্যাজেট সরবরাহ করি।
      </p>
    </div>
  );
};
