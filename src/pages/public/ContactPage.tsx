import React from 'react';
import { siteConfig } from '../../config/siteConfig';

export const ContactPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-4">
      <h1 className="text-2xl font-bold">যোগাযোগ</h1>
      <p className="text-sm">হেল্পলাইন: {siteConfig.phone}</p>
      <p className="text-sm">হোয়াটসঅ্যাপ: {siteConfig.whatsappNumber}</p>
      <p className="text-sm">ইমেইল: {siteConfig.email}</p>
      <p className="text-sm">ঠিকানা: {siteConfig.address}</p>
    </div>
  );
};
