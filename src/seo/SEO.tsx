import React from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title = 'Techno World BD | সেরা দামে পাইকারি ও প্রি-অর্ডার গ্যাজেট শপ',
  description = 'দুবাই, হংকং ও রাশিয়া থেকে সেরা দামে প্রি-অর্ডার ও পাইকারি গ্যাজেট।',
  image = '/logo.svg'
}) => {
  React.useEffect(() => {
    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);
  }, [title, description, image]);

  return null;
};
