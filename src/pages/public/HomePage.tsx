import React from 'react';
import { BannerSlider2080 } from '../../components/home/BannerSlider2080';
import { BrandCards } from '../../components/home/BrandCards';
import { PopularProductsGrid } from '../../components/home/PopularProductsGrid';
import { CategoryProductsSection } from '../../components/home/CategoryProductsSection';
import { CompanyReviewsSection } from '../../components/home/CompanyReviewsSection';
import { SocialMarketplacesSection } from '../../components/home/SocialMarketplacesSection';
import { DeliveryTrustCards } from '../../components/home/DeliveryTrustCards';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import { useBrands } from '../../hooks/useBrands';
import { useReviews } from '../../hooks/useReviews';
import { BannerService, BannerItem } from '../../services/bannerService';
import { SEO } from '../../seo/SEO';

export const HomePage: React.FC = () => {
  const { products } = useProducts();
  const { categories } = useCategories();
  const { brands } = useBrands();
  const { reviews } = useReviews();
  const [banners, setBanners] = React.useState<BannerItem[]>([]);

  React.useEffect(() => {
    BannerService.getBanners().then(setBanners);
  }, []);

  return (
    <div className="space-y-4">
      <SEO />
      {/* 20% Categories / 80% Sliding Banner */}
      <BannerSlider2080 categories={categories} banners={banners} />

      {/* Brand Round Cards */}
      <BrandCards brands={brands} />

      {/* Popular Products (2x6=12) */}
      <PopularProductsGrid products={products} />

      {/* Stacked Category-wise Products (2x6=12 each with See-All) */}
      <CategoryProductsSection categories={categories} products={products} />

      {/* Company Customer Reviews */}
      <CompanyReviewsSection reviews={reviews} />

      {/* Social Media & Marketplaces (Daraz, Bikroy, etc.) */}
      <SocialMarketplacesSection />

      {/* Delivery System & Trust Cards */}
      <DeliveryTrustCards />
    </div>
  );
};
