-- Stock History & Audit
CREATE TABLE IF NOT EXISTS public.product_stock (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  change_type VARCHAR(50) NOT NULL, -- IN, OUT, ADJUSTMENT
  quantity INT NOT NULL,
  balance_after INT NOT NULL,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
