INSERT INTO public.brands (name, slug) VALUES
('Huawei', 'huawei'),
('OnePlus', 'oneplus'),
('Amazfit', 'amazfit'),
('Haylou', 'haylou'),
('Anker', 'anker'),
('Techno World Sourcing', 'techno-world')
ON CONFLICT DO NOTHING;
