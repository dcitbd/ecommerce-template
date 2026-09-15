INSERT INTO public.colors (name, hex_code) VALUES
('Space Black', '#0f172a'),
('Silver Metallic', '#e2e8f0'),
('Emerald Green', '#10b981'),
('Navy Blue', '#1e3a8a'),
('Gold Edition', '#d97706')
ON CONFLICT DO NOTHING;
