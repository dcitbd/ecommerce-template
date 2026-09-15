INSERT INTO public.sizes (name) VALUES
('Standard / Universal'),
('42mm'),
('44mm'),
('46mm'),
('Mega Kit (Includes Accessories)')
ON CONFLICT DO NOTHING;
