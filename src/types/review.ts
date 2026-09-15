export interface ProductReview {
  id: string;
  productId: string;
  productName?: string;
  customerName: string;
  customerPhone?: string;
  rating: number; // 1-5
  comment: string;
  isApproved: boolean;
  createdAt: string;
}
