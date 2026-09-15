-- Customer Cart
CREATE TABLE IF NOT EXISTS public.carts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  session_id VARCHAR(100),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  color_id UUID REFERENCES public.colors(id),
  size_id UUID REFERENCES public.sizes(id),
  quantity INT NOT NULL DEFAULT 1,
  order_type VARCHAR(50) DEFAULT 'Retail',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
