-- Marketplace Links (Daraz, Bikroy, etc.)
CREATE TABLE IF NOT EXISTS public.marketplace_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  marketplace_name VARCHAR(100) NOT NULL,
  shop_url TEXT NOT NULL,
  username VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE
);
