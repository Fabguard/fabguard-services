-- Drop existing restrictive policies on customer_memberships
DROP POLICY IF EXISTS "Users can insert their own memberships" ON public.customer_memberships;
DROP POLICY IF EXISTS "Users can view their own memberships" ON public.customer_memberships;
DROP POLICY IF EXISTS "Users can update their own memberships" ON public.customer_memberships;

-- Create new policies that allow public membership registration
CREATE POLICY "Anyone can insert membership registrations" 
ON public.customer_memberships 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view membership registrations" 
ON public.customer_memberships 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can update membership registrations" 
ON public.customer_memberships 
FOR UPDATE 
USING (true);