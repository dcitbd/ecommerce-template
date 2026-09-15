-- Dynamic Tier Pricing
CREATE TABLE IF NOT EXISTS public.product_prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  order_type VARCHAR(50) NOT NULL,
  price NUMERIC(12,2) NOT NULL,
  min_quantity INT DEFAULT 1
);
