import React, { createContext, useContext, useState } from 'react';
import { SiteSettings } from '../types/settings';
import { siteConfig } from '../config/siteConfig';

interface SettingsContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
}

const defaultSettings: SiteSettings = {
  siteName: siteConfig.name,
  tagline: 'সেরা দামে পাইকারি ও প্রি-অর্ডার গ্যাজেট শপ',
  phone: siteConfig.phone,
  whatsapp: siteConfig.whatsappNumber,
  email: siteConfig.email,
  address: siteConfig.address,
  logoUrl: '/logo.svg',
  watermarkUrl: '/watermark.svg',
  telegramChannel: siteConfig.telegramChannel,
  whatsappChannel: siteConfig.whatsappChannel,
  facebookPage: siteConfig.facebookPage,
  instagramPage: siteConfig.instagram,
  youtubeChannel: siteConfig.youtube,
  tiktokProfile: siteConfig.tiktok,
  darazShop: siteConfig.marketplaces.daraz,
  bikroyShop: siteConfig.marketplaces.bikroy,
  othobaShop: siteConfig.marketplaces.othoba,
  cartupShop: siteConfig.marketplaces.cartup,
  clickbdShop: siteConfig.marketplaces.clickbd,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('twbd_settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem('twbd_settings', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
};
