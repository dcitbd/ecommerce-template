import { ProductReview } from '../types/review';

const REVIEWS_KEY = 'twbd_product_reviews';

export class ReviewService {
  static async getReviews(productId?: string): Promise<ProductReview[]> {
    const raw = localStorage.getItem(REVIEWS_KEY);
    const allReviews: ProductReview[] = raw
      ? JSON.parse(raw)
      : [
          {
            id: 'rev_1',
            productId: 'p1',
            productName: 'Huawei Watch GT 4 Pro Smartwatch',
            customerName: 'সাজিদ রহমান',
            customerPhone: '01711***',
            rating: 5,
            comment: 'অসাধারণ জেনুইন প্রোডাক্ট! দুবাইয়ের ফ্রেশ ইনটেক প্যাক হাতে পেয়েছি। ১০ দিনেই ডেলিভারি সম্পন্ন হয়েছে।',
            isApproved: true,
            createdAt: '2026-08-25T00:00:00Z'
          },
          {
            id: 'rev_2',
            productId: 'p5',
            productName: 'Techno Ultra Long-Range Zoom Torch',
            customerName: 'আরিফুল ইসলাম',
            customerPhone: '01822***',
            rating: 5,
            comment: 'টর্চলাইটের আলো অনেক দূর যায়, ব্যাটারি ব্যাকআপ এক কথায় অবিশ্বাস্য। পাইকারিতে ২০ পিস নিয়েছি দোকানের জন্য।',
            isApproved: true,
            createdAt: '2026-09-01T00:00:00Z'
          }
        ];

    if (!raw) localStorage.setItem(REVIEWS_KEY, JSON.stringify(allReviews));

    if (productId) {
      return allReviews.filter(r => r.productId === productId && r.isApproved);
    }
    return allReviews;
  }

  static async submitReview(review: Omit<ProductReview, 'id' | 'isApproved' | 'createdAt'>): Promise<ProductReview> {
    const reviews = await this.getReviews();
    const newRev: ProductReview = {
      ...review,
      id: 'rev_' + Date.now(),
      isApproved: false, // Moderated
      createdAt: new Date().toISOString()
    };
    reviews.unshift(newRev);
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
    return newRev;
  }

  static async toggleReviewApproval(id: string): Promise<boolean> {
    const raw = localStorage.getItem(REVIEWS_KEY);
    if (!raw) return false;
    const list: ProductReview[] = JSON.parse(raw);
    const target = list.find(r => r.id === id);
    if (target) {
      target.isApproved = !target.isApproved;
      localStorage.setItem(REVIEWS_KEY, JSON.stringify(list));
      return true;
    }
    return false;
  }
}
