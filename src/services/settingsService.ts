import { SiteSettings } from '../types/settings';
import { siteConfig } from '../config/siteConfig';

export class SettingsService {
  static getSettings(): SiteSettings {
    const saved = localStorage.getItem('twbd_settings');
    if (saved) return JSON.parse(saved);
    return {
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
      clickbdShop: siteConfig.marketplaces.clickbd
    };
  }

  static saveSettings(settings: SiteSettings) {
    localStorage.setItem('twbd_settings', JSON.stringify(settings));
  }
}
