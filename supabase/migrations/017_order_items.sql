-- Order Items
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id),
  product_name VARCHAR(255) NOT NULL,
  article_sku VARCHAR(100) NOT NULL,
  unit_price NUMERIC(12,2) NOT NULL,
  quantity INT NOT NULL,
  total_price NUMERIC(12,2) NOT NULL,
  color_name VARCHAR(100),
  size_name VARCHAR(100)
);
