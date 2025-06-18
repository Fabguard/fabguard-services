
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create customers table
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create services table
CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url VARCHAR(500),
  category VARCHAR(100) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create memberships table
CREATE TABLE memberships (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  validity_months INTEGER DEFAULT 12,
  discount_percentage INTEGER DEFAULT 10,
  features JSONB,
  services_included JSONB,
  color VARCHAR(50),
  bg_gradient VARCHAR(100),
  is_popular BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create customer_memberships table
CREATE TABLE customer_memberships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  membership_id INTEGER REFERENCES memberships(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  referral_code VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  total_amount DECIMAL(10,2) NOT NULL,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  final_amount DECIMAL(10,2) NOT NULL,
  coupon_code VARCHAR(50),
  customer_note TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  payment_method VARCHAR(50) DEFAULT 'cash_on_delivery',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  service_id INTEGER REFERENCES services(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create partner_registrations table
CREATE TABLE partner_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  city VARCHAR(100) NOT NULL,
  skills TEXT NOT NULL,
  experience VARCHAR(100),
  message TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create coupons table
CREATE TABLE coupons (
  id SERIAL PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  discount_amount DECIMAL(10,2) NOT NULL,
  discount_type VARCHAR(20) DEFAULT 'fixed', -- 'fixed' or 'percentage'
  min_order_amount DECIMAL(10,2) DEFAULT 0,
  usage_limit INTEGER,
  used_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  valid_from TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  valid_until TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial services data
INSERT INTO services (name, description, price, image_url, category) VALUES
('Plumbing Services', 'All types of plumbing repair, fittings, leakages etc.', 150.00, '/lovable-uploads/6c6d23b8-6bdd-456b-960f-2117eb59dcf3.png', 'Plumbing Services'),
('Electrical Services', 'Professional & safe electrical work for your home.', 150.00, '/lovable-uploads/609fbb63-9da3-4a8b-91a8-4083a524957f.png', 'Electrical Services'),
('Carpentry Services', 'All wooden repair, furniture making and fitting.', 150.00, '/lovable-uploads/1e070006-17a4-4996-b55f-47060cfa9a5d.png', 'Carpentry Services'),
('Clothes Ironing Services', 'Neat, crisp ironing for all types of clothes.', 100.00, '/lovable-uploads/ba618e96-4f23-4a13-8a27-2e53f48e545b.png', 'Clothes Ironing Services'),
('Dry Cleaning Services', 'Professional dry cleaning for all items.', 100.00, '/lovable-uploads/569b94da-01c6-4317-8af4-94de095f3d5c.png', 'Dry Cleaning Services'),
('Washing & Ironing Services', 'Complete wash + ironing service.', 100.00, '/lovable-uploads/d0c7eeee-ce6a-4af0-92b0-16edeed575d3.png', 'Washing & Ironing Services');

-- Insert initial membership data
INSERT INTO memberships (name, price, validity_months, discount_percentage, features, services_included, color, bg_gradient, is_popular) VALUES
('Gold Membership', 2000.00, 12, 10, 
 '["Quick Service", "Exclusive Coupon Code"]'::jsonb,
 '["Clothes Ironing Services", "Dry Cleaning Services"]'::jsonb,
 'gold', 'bg-gradient-to-r from-yellow-400 to-yellow-600', false),
('Platinum Membership', 2299.00, 12, 10,
 '["Quick Service", "Exclusive Coupon Code"]'::jsonb,
 '["Clothes Ironing Services", "Dry Cleaning Services", "Electrical Services", "Plumbing Services"]'::jsonb,
 'platinum', 'bg-gradient-to-r from-gray-400 to-gray-600', true),
('Diamond Membership', 2499.00, 12, 10,
 '["Quick Service", "Exclusive Coupon Code"]'::jsonb,
 '["Clothes Ironing Services", "Dry Cleaning Services", "Electrical Services", "Plumbing Services", "Carpentry Services"]'::jsonb,
 'diamond', 'bg-gradient-to-r from-blue-400 to-blue-600', false);

-- Insert initial coupon data
INSERT INTO coupons (code, discount_amount, discount_type, min_order_amount, usage_limit, is_active) VALUES
('SAVE10', 10.00, 'fixed', 100.00, 1000, true),
('WELCOME20', 20.00, 'fixed', 200.00, 500, true),
('NEWUSER15', 15.00, 'fixed', 150.00, 750, true);

-- Create indexes for better performance
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_phone ON customers(phone);
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_customer_memberships_customer_id ON customer_memberships(customer_id);
CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_coupons_code ON coupons(code);

-- Enable Row Level Security
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_registrations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (initially allowing all operations - you can restrict later)
CREATE POLICY "Enable all operations for customers" ON customers FOR ALL USING (true);
CREATE POLICY "Enable all operations for orders" ON orders FOR ALL USING (true);
CREATE POLICY "Enable all operations for order_items" ON order_items FOR ALL USING (true);
CREATE POLICY "Enable all operations for customer_memberships" ON customer_memberships FOR ALL USING (true);
CREATE POLICY "Enable all operations for partner_registrations" ON partner_registrations FOR ALL USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_memberships_updated_at BEFORE UPDATE ON memberships
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customer_memberships_updated_at BEFORE UPDATE ON customer_memberships
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_partner_registrations_updated_at BEFORE UPDATE ON partner_registrations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_coupons_updated_at BEFORE UPDATE ON coupons
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
