INSERT INTO public.categories (name, slug, level) VALUES
('Smartwatches & Wearables', 'smartwatches', 1),
('Flashlights & Torches', 'flashlights-torches', 1),
('Audio & Speakers', 'audio-speakers', 1),
('Mobile & Tablet Accessories', 'accessories', 1),
('Dubai Pre-Order Specials', 'dubai-preorders', 1),
('Computer & Office Peripherals', 'computer-office', 1)
ON CONFLICT DO NOTHING;
