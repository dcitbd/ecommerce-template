INSERT INTO public.roles (id, name, description) VALUES
('super_admin', 'Super Administrator', 'Complete system control and finance access'),
('admin', 'Administrator', 'Inventory, orders, settings, and partner management'),
('manager', 'Shop Manager', 'Order fulfillment, returns, and customer support'),
('staff', 'Order Operator', 'Packing, courier consignment update, and barcode scans')
ON CONFLICT DO NOTHING;
