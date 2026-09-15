-- Products Core Table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_sku VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  category_id UUID REFERENCES public.categories(id),
  sub_category_id UUID REFERENCES public.categories(id),
  child_category_id UUID REFERENCES public.categories(id),
  brand_id UUID REFERENCES public.brands(id),
  condition VARCHAR(50) DEFAULT 'Brand New',
  order_types TEXT[] DEFAULT ARRAY['Retail'], -- 'Pre Order', 'Whole Sale Order', 'Retail'
  mrp_price NUMERIC(12,2) NOT NULL,
  retail_price NUMERIC(12,2) NOT NULL,
  wholesale_price NUMERIC(12,2),
  wholesale_min_qty INT DEFAULT 10,
  stock INT DEFAULT 0,
  weight_kg NUMERIC(6,3) DEFAULT 0.500,
  specification JSONB DEFAULT '{}'::JSONB,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  total_orders INT DEFAULT 0,
  total_views INT DEFAULT 0,
  total_favorites INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_products_sku ON public.products(article_sku);
CREATE INDEX idx_products_slug ON public.products(slug);
