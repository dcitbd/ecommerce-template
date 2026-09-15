-- Returns Management
CREATE TABLE IF NOT EXISTS public.returns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id),
  order_number VARCHAR(50) NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  reason TEXT NOT NULL,
  return_status VARCHAR(50) DEFAULT 'Pending',
  refund_amount NUMERIC(12,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
