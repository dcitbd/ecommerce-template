-- Main Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  user_id UUID,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  customer_email VARCHAR(255),
  shipping_address TEXT NOT NULL,
  delivery_method VARCHAR(50) NOT NULL, -- 'Home Delivery', 'Office Pickup', 'Collection Point'
  delivery_area VARCHAR(50) NOT NULL, -- 'Inside Dhaka', 'Outside Dhaka'
  order_type VARCHAR(50) NOT NULL, -- 'Retail', 'Pre-Order', 'WholeSale'
  total_weight_kg NUMERIC(6,3) DEFAULT 0.500,
  subtotal NUMERIC(12,2) NOT NULL,
  delivery_charge NUMERIC(12,2) NOT NULL,
  discount NUMERIC(12,2) DEFAULT 0.00,
  total_amount NUMERIC(12,2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  payment_status VARCHAR(50) DEFAULT 'Pending',
  status VARCHAR(50) DEFAULT 'Pending', -- Pending, Accepted, Confirmed, Sent, IN-Courier, Delivered, Cancelled, Returned
  courier_id UUID,
  courier_consignment_id VARCHAR(100),
  courier_tracking_code VARCHAR(100),
  admin_notes TEXT,
  is_fraud_checked BOOLEAN DEFAULT FALSE,
  fraud_score INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_orders_phone ON public.orders(customer_phone);
CREATE INDEX idx_orders_status ON public.orders(status);
