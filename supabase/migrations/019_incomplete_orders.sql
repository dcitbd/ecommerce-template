-- Incomplete Cart / Abandoned Checkout
CREATE TABLE IF NOT EXISTS public.incomplete_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name VARCHAR(255),
  customer_phone VARCHAR(20),
  customer_address TEXT,
  delivery_area VARCHAR(50),
  items_json JSONB NOT NULL,
  total_amount NUMERIC(12,2),
  recovered BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
