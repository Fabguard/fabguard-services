
-- First, let's clear existing services and insert the current ones with proper data
DELETE FROM public.services;

-- Insert the services with the correct data to match the frontend
INSERT INTO public.services (id, name, description, price, image_url, category, is_active) VALUES
(1, 'Plumbing Services', 'All types of plumbing repair, fittings, leakages etc.', 150, '/lovable-uploads/6c6d23b8-6bdd-456b-960f-2117eb59dcf3.png', 'Plumbing Services', true),
(2, 'Electrical Services', 'Professional & safe electrical work for your home.', 150, '/lovable-uploads/609fbb63-9da3-4a8b-91a8-4083a524957f.png', 'Electrical Services', true),
(3, 'Carpentry Services', 'All wooden repair, furniture making and fitting.', 150, '/lovable-uploads/1e070006-17a4-4996-b55f-47060cfa9a5d.png', 'Carpentry Services', true),
(4, 'Clothes Ironing Services', 'Neat, crisp ironing for all types of clothes.', 100, '/lovable-uploads/ba618e96-4f23-4a13-8a27-2e53f48e545b.png', 'Clothes Ironing Services', true),
(5, 'Dry Cleaning Services', 'Professional dry cleaning for all items.', 100, '/lovable-uploads/569b94da-01c6-4317-8af4-94de095f3d5c.png', 'Dry Cleaning Services', true),
(6, 'Washing & Ironing Services', 'Complete wash + ironing service.', 100, '/lovable-uploads/d0c7eeee-ce6a-4af0-92b0-16edeed575d3.png', 'Washing & Ironing Services', true);

-- Create a table to store service items for each category
CREATE TABLE IF NOT EXISTS public.service_items (
  id SERIAL PRIMARY KEY,
  service_id INTEGER REFERENCES public.services(id) ON DELETE CASCADE,
  item_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert service items for each category
-- Clothes Ironing Services items
INSERT INTO public.service_items (service_id, item_name) VALUES
(4, 'Shirt'), (4, 'T-shirt'), (4, 'Kurta'), (4, 'Trousers'), (4, 'Pyjama'), (4, 'Salwar'), (4, '3 pc suit'), (4, 'Sherwani'), (4, 'Tops'), (4, 'Cotton saree'), (4, 'Silk saree'), (4, 'Ghagra'), (4, 'Plated skirt'), (4, 'Sweater'), (4, 'Jacket'), (4, 'Blazer'), (4, 'Skirt'), (4, 'Kid''s shirt'), (4, 'Kids trousers'), (4, 'Kid''s blazer'), (4, 'Kid''s t-shirt'), (4, 'Kid''s kurta'), (4, 'Kid''s salwar'), (4, 'Kid''s sherwani'), (4, 'Kid''s jacket'), (4, 'Carpet'), (4, 'Bedsheet'), (4, 'Pillow cover'), (4, 'Blanket'), (4, 'Galicha'), (4, 'Other laundry services');

-- Washing & Ironing Services items (same as ironing)
INSERT INTO public.service_items (service_id, item_name) VALUES
(6, 'Shirt'), (6, 'T-shirt'), (6, 'Kurta'), (6, 'Trousers'), (6, 'Pyjama'), (6, 'Salwar'), (6, '3 pc suit'), (6, 'Sherwani'), (6, 'Tops'), (6, 'Cotton saree'), (6, 'Silk saree'), (6, 'Ghagra'), (6, 'Plated skirt'), (6, 'Sweater'), (6, 'Jacket'), (6, 'Blazer'), (6, 'Skirt'), (6, 'Kid''s shirt'), (6, 'Kids trousers'), (6, 'Kid''s blazer'), (6, 'Kid''s t-shirt'), (6, 'Kid''s kurta'), (6, 'Kid''s salwar'), (6, 'Kid''s sherwani'), (6, 'Kid''s jacket'), (6, 'Carpet'), (6, 'Bedsheet'), (6, 'Pillow cover'), (6, 'Blanket'), (6, 'Galicha'), (6, 'Other laundry services');

-- Dry Cleaning Services items (same as ironing)
INSERT INTO public.service_items (service_id, item_name) VALUES
(5, 'Shirt'), (5, 'T-shirt'), (5, 'Kurta'), (5, 'Trousers'), (5, 'Pyjama'), (5, 'Salwar'), (5, '3 pc suit'), (5, 'Sherwani'), (5, 'Tops'), (5, 'Cotton saree'), (5, 'Silk saree'), (5, 'Ghagra'), (5, 'Plated skirt'), (5, 'Sweater'), (5, 'Jacket'), (5, 'Blazer'), (5, 'Skirt'), (5, 'Kid''s shirt'), (5, 'Kids trousers'), (5, 'Kid''s blazer'), (5, 'Kid''s t-shirt'), (5, 'Kid''s kurta'), (5, 'Kid''s salwar'), (5, 'Kid''s sherwani'), (5, 'Kid''s jacket'), (5, 'Carpet'), (5, 'Bedsheet'), (5, 'Pillow cover'), (5, 'Blanket'), (5, 'Galicha'), (5, 'Other laundry services');

-- Carpentry Services items
INSERT INTO public.service_items (service_id, item_name) VALUES
(3, 'SINGLE BED'), (3, 'LAMINATE DOOR'), (3, 'DOOR LATCH'), (3, '2 CHAIR & 1 SOFA (SET)'), (3, 'NEW SOFA'), (3, 'DOUBLE BED ( 5 X 7 IN PLYWOOD)'), (3, 'DOOR LOCK FITTING'), (3, 'TABLE'), (3, 'OFFICE COUNTER'), (3, 'NEW CHAIR'), (3, 'DOOR PEEPHOLE'), (3, 'HINGES FITTING/ REPAIR'), (3, 'DOOR CHAIN FITTING'), (3, 'DOOR HANDLE FITTING'), (3, 'DOOR STOPPER'), (3, 'Other carpentry services');

-- Electrical Services items
INSERT INTO public.service_items (service_id, item_name) VALUES
(2, 'JHOOMER FITTING'), (2, 'GEYSER COIL FITTING'), (2, 'GEYSER OTHER MAINTAINANCE'), (2, 'SWITCH FITTING (PER SWITCH)'), (2, 'SWITCH REPAIR'), (2, 'FAN BEARING'), (2, 'FAN WINDING'), (2, 'FAN WINDING & BEARING'), (2, 'NEW AC SUPPLY POINT (IN CONCEAL PATTI PER POINT)'), (2, 'NEW POWER POINT FITTING (IN CASING PATTI PER POINT)'), (2, 'NEW AC SUPPLY POINT (IN CASING PAATTI PER POINT)'), (2, 'NEW POWER POINT FITTING (IN CONCEAL PATTI PER POINT)'), (2, 'INVERTER BATTERY INSTALLATION'), (2, 'INVERTER POINT FITTING (PER POINT)'), (2, 'WALL FAN FITTING'), (2, '1/2 HP WATER MOTOR PUMP FITTING'), (2, 'COOLER, WATER PUMP FITTING'), (2, 'COOLER FAN MOTOR FITTING'), (2, 'FALSE'), (2, 'CEILING POINT (PER POINT)'), (2, 'CONCEAL ELECTRICAL WIRING (PER POINT)'), (2, 'CASING ELECTRICAL WIRING (PER POINT)'), (2, 'ELECTRIC IRON REPAIR'), (2, 'Other electrical services');

-- Plumbing Services items
INSERT INTO public.service_items (service_id, item_name) VALUES
(1, 'TOILET JET'), (1, 'BATHROOM WATER PROOFING'), (1, 'BATHROOM WC (REMOVAL)'), (1, 'OLD PIPES WORK'), (1, 'KHODKAAM (DIGGING WORK)'), (1, 'EUROPEAN WATER CLOSET'), (1, 'WALL HUNG COMMODE FITTING'), (1, 'ORISSA PAN TOILET'), (1, 'GULLY TRAP'), (1, 'NAHANI TRAP'), (1, 'SIPHON FITTING'), (1, 'FLUSH TANK AND COCK'), (1, 'WATER TAP FITTING'), (1, 'VASE COUPLING FITTING'), (1, 'PILLAR COCK FITTING'), (1, 'ANGULAR COCK FITTING'), (1, 'BIB COCK FITTING'), (1, 'Other plumbing services');

-- Add trigger to update the updated_at column
CREATE TRIGGER update_service_items_updated_at
    BEFORE UPDATE ON public.service_items
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
