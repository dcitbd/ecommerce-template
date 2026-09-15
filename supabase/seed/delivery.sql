INSERT INTO public.delivery_areas (name, base_charge, per_kg_extra) VALUES
('Inside Dhaka', 90.00, 20.00),
('Outside Dhaka', 130.00, 20.00)
ON CONFLICT DO NOTHING;

INSERT INTO public.delivery_methods (name, code, description) VALUES
('Home Delivery', 'home_delivery', 'Doorstep delivery via express courier service'),
('Collect from Office', 'office_pickup', 'Pick up directly from our official hub (0 Tk Charge)'),
('From Collection Point', 'collection_point', 'Regional courier hub collection')
ON CONFLICT DO NOTHING;
