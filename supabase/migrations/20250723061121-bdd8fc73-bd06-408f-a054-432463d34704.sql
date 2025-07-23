-- Update RLS policies to allow anonymous users to place orders

-- Drop existing restrictive policies for customers table
DROP POLICY IF EXISTS "Users can insert their own customer data" ON public.customers;
DROP POLICY IF EXISTS "Users can update their own customer data" ON public.customers;
DROP POLICY IF EXISTS "Users can view their own customer data" ON public.customers;

-- Create new policies that allow anonymous order placement
CREATE POLICY "Anyone can insert customer data for orders" 
ON public.customers 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update customer data" 
ON public.customers 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can view customer data" 
ON public.customers 
FOR SELECT 
USING (true);

-- Update orders table policies to allow anonymous orders
DROP POLICY IF EXISTS "Users can insert their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can update their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;

CREATE POLICY "Anyone can insert orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update orders" 
ON public.orders 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can view orders" 
ON public.orders 
FOR SELECT 
USING (true);

-- Update order_items table policies to allow anonymous order items
DROP POLICY IF EXISTS "Users can insert their own order items" ON public.order_items;
DROP POLICY IF EXISTS "Users can view their own order items" ON public.order_items;

CREATE POLICY "Anyone can insert order items" 
ON public.order_items 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view order items" 
ON public.order_items 
FOR SELECT 
USING (true);