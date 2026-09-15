-- Payment Transactions
CREATE TABLE IF NOT EXISTS public.payment_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id),
  payment_method VARCHAR(50) NOT NULL,
  transaction_id VARCHAR(100) UNIQUE,
  amount NUMERIC(12,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'Pending',
  gateway_response JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
