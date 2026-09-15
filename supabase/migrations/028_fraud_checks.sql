-- Fraud Check Logs
CREATE TABLE IF NOT EXISTS public.fraud_checks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number VARCHAR(20) NOT NULL,
  total_orders INT DEFAULT 0,
  successful_deliveries INT DEFAULT 0,
  cancelled_or_returned INT DEFAULT 0,
  success_rate NUMERIC(5,2) DEFAULT 100.00,
  risk_level VARCHAR(50) DEFAULT 'No Risk',
  api_source VARCHAR(100),
  details JSONB,
  checked_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_fraud_phone ON public.fraud_checks(phone_number);
