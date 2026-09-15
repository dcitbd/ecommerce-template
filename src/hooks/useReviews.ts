import { useEffect, useState } from 'react';
import { ReviewService } from '../services/reviewService';
import { ProductReview } from '../types/review';

export const useReviews = (productId?: string) => {
  const [reviews, setReviews] = useState<ProductReview[]>([]);

  useEffect(() => {
    ReviewService.getReviews(productId).then(setReviews);
  }, [productId]);

  return { reviews, addReview: ReviewService.submitReview };
};
