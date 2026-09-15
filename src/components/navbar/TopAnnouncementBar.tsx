import React from 'react';
import { Send, PhoneCall, ShieldCheck, Clock, MapPin } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export const TopAnnouncementBar: React.FC = () => {
  return (
    <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center space-x-3 overflow-x-auto text-[11px] sm:text-xs">
          <span className="flex items-center text-emerald-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 mr-1" /> ১০০% অরিজিনাল ও ইনটেক
          </span>
          <span className="hidden md:inline text-slate-600">•</span>
          <span className="flex items-center text-amber-400">
            <Clock className="w-3.5 h-3.5 mr-1" /> দুবাই প্রি-অর্ডার (১০–১৫ দিনে ডেলিভারি)
          </span>
          <span className="hidden lg:inline text-slate-600">•</span>
          <span className="hidden lg:flex items-center text-slate-300">
            <MapPin className="w-3.5 h-3.5 mr-1" /> সোর্স: Dubai / Hong Kong / Russia
          </span>
        </div>

        <div className="flex items-center space-x-4 text-[11px] sm:text-xs">
          <a
            href={siteConfig.telegramChannel}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sky-400 hover:underline"
          >
            <Send className="w-3 h-3 mr-1" /> টেলিগ্রাম চ্যানেল
          </a>
          <a
            href={siteConfig.whatsappDirectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-emerald-400 hover:underline"
          >
            <PhoneCall className="w-3 h-3 mr-1" /> {siteConfig.phone}
          </a>
        </div>
      </div>
    </div>
  );
};
