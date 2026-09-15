-- Delivery Area Pricing Config
CREATE TABLE IF NOT EXISTS public.delivery_areas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  base_charge NUMERIC(10,2) NOT NULL, -- 90 Dhaka, 130 Outside
  per_kg_extra NUMERIC(10,2) NOT NULL DEFAULT 20.00,
  is_active BOOLEAN DEFAULT TRUE
);
