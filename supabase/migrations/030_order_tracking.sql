-- Order Tracking Updates
CREATE TABLE IF NOT EXISTS public.order_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id),
  tracking_step VARCHAR(100) NOT NULL,
  location VARCHAR(255),
  message TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);
