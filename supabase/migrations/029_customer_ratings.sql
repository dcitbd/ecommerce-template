-- Customer Reliability Ratings
CREATE TABLE IF NOT EXISTS public.customer_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone VARCHAR(20) UNIQUE NOT NULL,
  customer_name VARCHAR(255),
  total_orders INT DEFAULT 0,
  success_orders INT DEFAULT 0,
  cancel_orders INT DEFAULT 0,
  rating_percentage NUMERIC(5,2) DEFAULT 100.00,
  badge_status VARCHAR(50) DEFAULT 'Gold Verified',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
