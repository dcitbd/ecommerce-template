export type OrderType = 'Retail' | 'Pre-Order' | 'WholeSale';
export type ProductCondition = 'Brand New' | 'Old Model' | 'Like New' | 'New';

export interface ProductPriceTier {
  orderType: OrderType;
  price: number;
  minQty?: number;
}

export interface Product {
  id: string;
  articleSku: string;
  name: string;
  slug: string;
  categoryId: string;
  categoryName?: string;
  subCategoryId?: string;
  childCategoryId?: string;
  brandId: string;
  brandName?: string;
  condition: ProductCondition;
  orderTypes: OrderType[];
  mrpPrice: number;
  retailPrice: number;
  wholesalePrice?: number;
  wholesaleMinQty?: number;
  preOrderPrice?: number;
  stock: number;
  weightKg: number;
  images: string[];
  coverImage: string;
  colors: string[];
  sizes: string[];
  specifications: Record<string, string>;
  description: string;
  isActive: boolean;
  totalOrders: number;
  totalViews: number;
  totalFavorites: number;
  createdAt: string;
  updatedAt: string;
}
