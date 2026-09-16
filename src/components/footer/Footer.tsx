import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, PhoneCall, Mail, ShieldCheck, Heart } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        {/* Brand Col - logo.png */}
        <div className="space-y-4">
          <img src="./logo.png" alt="Techno World BD" className="h-12 w-auto object-contain rounded-lg" />
          <p className="text-xs text-slate-400 leading-relaxed">
            {siteConfig.description}
          </p>
          <div className="pt-2 text-xs space-y-1.5 text-slate-300">
            <p className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-2 text-emerald-400 shrink-0" /> {siteConfig.address}</p>
            <p className="flex items-center"><PhoneCall className="w-3.5 h-3.5 mr-2 text-emerald-400 shrink-0" /> {siteConfig.phone}</p>
            <p className="flex items-center"><Mail className="w-3.5 h-3.5 mr-2 text-emerald-400 shrink-0" /> {siteConfig.email}</p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
            প্রয়োজনীয় পেজসমূহ
          </h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/products" className="hover:text-emerald-400 transition">সকল প্রোডাক্টস ক্যাটালগ</Link></li>
            <li><Link to="/products?orderType=Pre-Order" className="hover:text-emerald-400 transition">দুবাই প্রি-অর্ডার স্পেশাল</Link></li>
            <li><Link to="/products?orderType=WholeSale" className="hover:text-emerald-400 transition">হোলসেল বিটুইবি অফার</Link></li>
            <li><Link to="/track-order" className="hover:text-emerald-400 transition">অর্ডার ট্র্যাকিং ও চালান প্রিন্ট</Link></li>
            <li><Link to="/cart" className="hover:text-emerald-400 transition">শপিং কার্ট ও চেকআউট</Link></li>
            <li><Link to="/wishlist" className="hover:text-emerald-400 transition">পছন্দের তালিকা (Love)</Link></li>
          </ul>
        </div>

        {/* Facilities & Advantages */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
            সুযোগ-সুবিধা ও টার্মস
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>✅ সোর্স: Dubai / Hong Kong / Russia</li>
            <li>✅ দ্রুত ডেলিভারি: ১০–১৫ দিনের মধ্যে</li>
            <li>✅ পেমেন্ট: BDT / Dollar (USD বা USDT)</li>
            <li>✅ ন্যূনতম অর্ডার: ১০ পিস (হোলসেল)</li>
            <li>✅ পণ্য প্রাপ্তির পর ২ সপ্তাহ ওয়ারেন্টি</li>
            <li>✅ সারা বাংলাদেশে ক্যাশ অন ডেলিভারি</li>
            <li>✅ চুক্তির মাধ্যমে ব্যবসায়িক লেনদেন</li>
          </ul>
        </div>

        {/* Payment Methods & Channels */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
            পেমেন্ট মেথড ও কানেক্ট
          </h4>
          <p className="text-xs text-slate-400 mb-3">
            ক্যাশ অন ডেলিভারি, বিকাশ, নগদ, রকেট ও ভিসা/মাস্টারকার্ড সাপোর্টেড।
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-semibold mb-4">
            <span className="px-2.5 py-1 bg-slate-800 rounded border border-slate-700 text-emerald-400">COD</span>
            <span className="px-2.5 py-1 bg-slate-800 rounded border border-slate-700 text-pink-400">bKash</span>
            <span className="px-2.5 py-1 bg-slate-800 rounded border border-slate-700 text-orange-400">Nagad</span>
            <span className="px-2.5 py-1 bg-slate-800 rounded border border-slate-700 text-purple-400">Rocket</span>
            <span className="px-2.5 py-1 bg-slate-800 rounded border border-slate-700 text-sky-400">USDT</span>
          </div>
          <div className="text-xs text-slate-400">
            <p>অর্ডারের জন্য যোগাযোগ:</p>
            <p className="font-bold text-emerald-400 text-sm mt-1">{siteConfig.whatsappNumber}</p>
          </div>
        </div>
      </div>

      {/* Developer Credits & Copyright as Requested */}
      <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-3">
        <div>
          সর্বস্বত্ব সংরক্ষিত © ২০২৬ <span className="font-bold text-white">টেকনো ওয়ার্ল্ড বিডি (Techno World BD)</span>
        </div>

        <div className="flex items-center space-x-1.5 text-center">
          <span>কারিগরি সহযোগিতা বা ডেভেলপার:</span>
          <a
            href={siteConfig.developer.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-emerald-400 hover:underline"
          >
            {siteConfig.developer.name}
          </a>
          <span>—</span>
          <a
            href={siteConfig.developer.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-white hover:underline"
          >
            {siteConfig.developer.role}
          </a>
        </div>
      </div>
    </footer>
  );
};
