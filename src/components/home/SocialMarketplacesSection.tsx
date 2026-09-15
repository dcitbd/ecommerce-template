import React from 'react';
import { Send, PhoneCall, ExternalLink, ShoppingCart, Globe } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export const SocialMarketplacesSection: React.FC = () => {
  const channels = [
    { name: 'Telegram Channel', url: siteConfig.telegramChannel, icon: <Send className="w-4 h-4 text-sky-400" />, desc: 'দৈনিক লাইভ প্রাইস আপডেট ও স্টক অ্যালার্ট' },
    { name: 'WhatsApp Channel', url: siteConfig.whatsappChannel, icon: <PhoneCall className="w-4 h-4 text-emerald-400" />, desc: 'সরাসরি বুকিং ও ইন্সট্যান্ট কাস্টমার সাপোর্ট' },
    { name: 'Facebook Wholesale', url: siteConfig.facebookWholesale, icon: <Globe className="w-4 h-4 text-blue-500" />, desc: 'দুবাই হোলসেল বিডি অফিশিয়াল পেজ' },
    { name: 'Daraz Official Store', url: siteConfig.marketplaces.daraz, icon: <ShoppingCart className="w-4 h-4 text-orange-500" />, desc: 'দারাজে টেকনো ওয়ার্ল্ড শপ' },
    { name: 'Bikroy Official Shop', url: siteConfig.marketplaces.bikroy, icon: <ShoppingCart className="w-4 h-4 text-yellow-500" />, desc: 'বিক্রয়ে প্রিমিয়াম মেম্বার স্টোর' },
    { name: 'Cartup & Othoba', url: siteConfig.marketplaces.cartup, icon: <ShoppingCart className="w-4 h-4 text-emerald-500" />, desc: 'অনলাইন মার্কেটপ্লেস কানেক্ট' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 my-12">
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl">
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
            কানেক্টেড নেটওয়ার্ক
          </span>
          <h3 className="text-xl sm:text-3xl font-extrabold mt-1">
            আমাদের সোশ্যাল মিডিয়া ও অন্যান্য মার্কেটপ্লেস
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            সর্বদা আপডেট থাকতে এবং সহজ অর্ডারের জন্য আমাদের অফিশিয়াল প্ল্যাটফর্মগুলোতে যুক্ত থাকুন।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {channels.map((ch, idx) => (
            <a
              key={idx}
              href={ch.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 flex items-start space-x-3 transition group"
            >
              <div className="p-2.5 rounded-xl bg-slate-700/50 group-hover:scale-110 transition">
                {ch.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition truncate">
                    {ch.name}
                  </h4>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300" />
                </div>
                <p className="text-xs text-slate-400 mt-1 line-clamp-1">{ch.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
