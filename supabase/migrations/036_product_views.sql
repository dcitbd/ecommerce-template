-- Product Analytics & View Counter
CREATE TABLE IF NOT EXISTS public.product_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  viewer_ip VARCHAR(50),
  viewed_at TIMESTAMPTZ DEFAULT NOW()
);
