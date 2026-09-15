-- Social Media Links
CREATE TABLE IF NOT EXISTS public.social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform VARCHAR(100) NOT NULL,
  url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE
);
