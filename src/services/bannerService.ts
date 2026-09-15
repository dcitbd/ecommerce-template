export interface BannerItem {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  imageUrl: string;
  linkUrl: string;
  sortOrder: number;
  isActive: boolean;
}

const BANNERS_KEY = 'twbd_banners';

export class BannerService {
  static async getBanners(): Promise<BannerItem[]> {
    const raw = localStorage.getItem(BANNERS_KEY);
    if (!raw) {
      const initial: BannerItem[] = [
        {
          id: 'b1',
          title: 'দুবাই প্রি-অর্ডার স্পেশাল অফার 🔥',
          subtitle: '১০০% অরিজিনাল ও ইনটেক গ্যাজেট সরাসরি দুবাই থেকে সেরা দামে',
          badge: 'Dubai Direct Import',
          imageUrl: '/logo.svg',
          linkUrl: '/products?orderType=Pre-Order',
          sortOrder: 1,
          isActive: true
        },
        {
          id: 'b2',
          title: 'পাইকারি রেটে স্মার্টওয়াচ ও গ্যাজেট',
          subtitle: 'নূন্যতম ১০ পিস অর্ডারে অবিশ্বাস্য হোলসেল রেট এবং সারা দেশে ডেলিভারি',
          badge: 'Wholesale B2B Hub',
          imageUrl: '/logo.svg',
          linkUrl: '/products?orderType=WholeSale',
          sortOrder: 2,
          isActive: true
        },
        {
          id: 'b3',
          title: 'দূরপাল্লার রিচার্জেবল জুম এলইডি টর্চ',
          subtitle: '১৫০০ মিটার সুপার লং রেঞ্জ ফোকাস ও হেভি মেটাল বডি',
          badge: '1500m Long Range',
          imageUrl: '/logo.svg',
          linkUrl: '/products?category=cat_torch',
          sortOrder: 3,
          isActive: true
        }
      ];
      localStorage.setItem(BANNERS_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  }
}
