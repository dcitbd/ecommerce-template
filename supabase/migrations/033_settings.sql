-- Platform General Settings
CREATE TABLE IF NOT EXISTS public.settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_name VARCHAR(255) DEFAULT 'Techno World BD',
  phone VARCHAR(50) DEFAULT '01351003958',
  email VARCHAR(100) DEFAULT 'dubaiwholesalebd@gmail.com',
  address TEXT DEFAULT 'Maheshkhali, Coxs Bazar, Bangladesh',
  logo_url TEXT DEFAULT '/logo.svg',
  watermark_url TEXT DEFAULT '/watermark.svg',
  slogan TEXT DEFAULT 'সেরা দামে পাইকারি ও প্রি-অর্ডার গ্যাজেট শপ',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
