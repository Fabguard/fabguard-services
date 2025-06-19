
-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Update existing RLS policies to be more restrictive
DROP POLICY "Enable all operations for customers" ON customers;
DROP POLICY "Enable all operations for orders" ON orders;
DROP POLICY "Enable all operations for order_items" ON order_items;
DROP POLICY "Enable all operations for customer_memberships" ON customer_memberships;
DROP POLICY "Enable all operations for partner_registrations" ON partner_registrations;

-- Create proper RLS policies for customers
CREATE POLICY "Users can view their own customer data" ON customers
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can insert their own customer data" ON customers
  FOR INSERT WITH CHECK (auth.uid()::text = id::text);

CREATE POLICY "Users can update their own customer data" ON customers
  FOR UPDATE USING (auth.uid()::text = id::text);

-- Create proper RLS policies for orders
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (auth.uid()::text = customer_id::text);

CREATE POLICY "Users can insert their own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid()::text = customer_id::text);

CREATE POLICY "Users can update their own orders" ON orders
  FOR UPDATE USING (auth.uid()::text = customer_id::text);

-- Create proper RLS policies for order_items
CREATE POLICY "Users can view their own order items" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.customer_id::text = auth.uid()::text
    )
  );

CREATE POLICY "Users can insert their own order items" ON order_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.customer_id::text = auth.uid()::text
    )
  );

-- Create proper RLS policies for customer_memberships
CREATE POLICY "Users can view their own memberships" ON customer_memberships
  FOR SELECT USING (auth.uid()::text = customer_id::text);

CREATE POLICY "Users can insert their own memberships" ON customer_memberships
  FOR INSERT WITH CHECK (auth.uid()::text = customer_id::text);

CREATE POLICY "Users can update their own memberships" ON customer_memberships
  FOR UPDATE USING (auth.uid()::text = customer_id::text);

-- Create proper RLS policies for partner_registrations
CREATE POLICY "Anyone can insert partner registrations" ON partner_registrations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own partner registrations" ON partner_registrations
  FOR SELECT USING (true); -- Allow viewing for admin purposes

-- Allow public read access to services, memberships, and coupons
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active services" ON services
  FOR SELECT USING (is_active = true);

ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active memberships" ON memberships
  FOR SELECT USING (is_active = true);

ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active coupons" ON coupons
  FOR SELECT USING (is_active = true);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1))
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Add trigger for profiles updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
