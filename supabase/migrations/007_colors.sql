-- Colors Table
CREATE TABLE IF NOT EXISTS public.colors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  hex_code VARCHAR(10) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
