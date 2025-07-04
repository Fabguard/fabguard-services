
-- First, let's update some service items that might have different names
-- Update some existing items to match your specifications
UPDATE public.service_items 
SET item_name = 'ORISSA PAN TOILET' 
WHERE item_name = 'INDIAN TOILET' AND service_id IN (SELECT id FROM services WHERE name = 'Plumbing Services');

UPDATE public.service_items 
SET item_name = 'KHODKAAM (DIGGING WORK)' 
WHERE item_name = 'KHODKAAM' AND service_id IN (SELECT id FROM services WHERE name = 'Plumbing Services');

-- Add any missing items for Clothes Ironing Services (service_id = 4)
INSERT INTO public.service_items (service_id, item_name) 
SELECT 4, item_name FROM (VALUES 
  ('Shirt'), ('T-shirt'), ('Kurta'), ('Trousers'), ('Pyjama'), ('Salwar'), 
  ('3 pc suit'), ('Sherwani'), ('Tops'), ('Cotton saree'), ('Silk saree'), 
  ('Ghagra'), ('Plated skirt'), ('Sweater'), ('Jacket'), ('Blazer'), ('Skirt'),
  ('Kid''s shirt'), ('Kids trousers'), ('Kid''s blazer'), ('Kid''s t-shirt'), 
  ('Kid''s kurta'), ('Kid''s salwar'), ('Kid''s sherwani'), ('Kid''s jacket'),
  ('Carpet'), ('Bedsheet'), ('Pillow cover'), ('Blanket'), ('Galicha'),
  ('Other laundry services')
) AS new_items(item_name)
WHERE NOT EXISTS (
  SELECT 1 FROM public.service_items 
  WHERE service_id = 4 AND service_items.item_name = new_items.item_name
);

-- Add any missing items for Washing & Ironing Services (service_id = 6)
INSERT INTO public.service_items (service_id, item_name) 
SELECT 6, item_name FROM (VALUES 
  ('Shirt'), ('T-shirt'), ('Kurta'), ('Trousers'), ('Pyjama'), ('Salwar'), 
  ('3 pc suit'), ('Sherwani'), ('Tops'), ('Cotton saree'), ('Silk saree'), 
  ('Ghagra'), ('Plated skirt'), ('Sweater'), ('Jacket'), ('Blazer'), ('Skirt'),
  ('Kid''s shirt'), ('Kids trousers'), ('Kid''s blazer'), ('Kid''s t-shirt'), 
  ('Kid''s kurta'), ('Kid''s salwar'), ('Kid''s sherwani'), ('Kid''s jacket'),
  ('Carpet'), ('Bedsheet'), ('Pillow cover'), ('Blanket'), ('Galicha'),
  ('Other laundry services')
) AS new_items(item_name)
WHERE NOT EXISTS (
  SELECT 1 FROM public.service_items 
  WHERE service_id = 6 AND service_items.item_name = new_items.item_name
);

-- Add any missing items for Dry Cleaning Services (service_id = 5)
INSERT INTO public.service_items (service_id, item_name) 
SELECT 5, item_name FROM (VALUES 
  ('Shirt'), ('T-shirt'), ('Kurta'), ('Trousers'), ('Pyjama'), ('Salwar'), 
  ('3 pc suit'), ('Sherwani'), ('Tops'), ('Cotton saree'), ('Silk saree'), 
  ('Ghagra'), ('Plated skirt'), ('Sweater'), ('Jacket'), ('Blazer'), ('Skirt'),
  ('Kid''s shirt'), ('Kids trousers'), ('Kid''s blazer'), ('Kid''s t-shirt'), 
  ('Kid''s kurta'), ('Kid''s salwar'), ('Kid''s sherwani'), ('Kid''s jacket'),
  ('Carpet'), ('Bedsheet'), ('Pillow cover'), ('Blanket'), ('Galicha'),
  ('Other laundry services')
) AS new_items(item_name)
WHERE NOT EXISTS (
  SELECT 1 FROM public.service_items 
  WHERE service_id = 5 AND service_items.item_name = new_items.item_name
);

-- Add any missing items for Carpentry Services (service_id = 3)
INSERT INTO public.service_items (service_id, item_name) 
SELECT 3, item_name FROM (VALUES 
  ('SINGLE BED'), ('LAMINATE DOOR'), ('DOOR LATCH'), ('2 CHAIR & 1 SOFA (SET)'), 
  ('NEW SOFA'), ('DOUBLE BED ( 5 X 7 IN PLYWOOD)'), ('DOOR LOCK FITTING'), 
  ('TABLE'), ('OFFICE COUNTER'), ('NEW CHAIR'), ('DOOR PEEPHOLE'), 
  ('HINGES FITTING/ REPAIR'), ('DOOR CHAIN FITTING'), ('DOOR HANDLE FITTING'), 
  ('DOOR STOPPER'), ('Other carpentry services')
) AS new_items(item_name)
WHERE NOT EXISTS (
  SELECT 1 FROM public.service_items 
  WHERE service_id = 3 AND service_items.item_name = new_items.item_name
);

-- Add any missing items for Electrical Services (service_id = 2)
INSERT INTO public.service_items (service_id, item_name) 
SELECT 2, item_name FROM (VALUES 
  ('JHOOMER FITTING'), ('GEYSER COIL FITTING'), ('GEYSER OTHER MAINTAINANCE'), 
  ('SWITCH FITTING (PER SWITCH)'), ('SWITCH REPAIR'), ('FAN BEARING'), 
  ('FAN WINDING'), ('FAN WINDING & BEARING'), ('NEW AC SUPPLY POINT (IN CONCEAL PATTI PER POINT)'), 
  ('NEW POWER POINT FITTING (IN CASING PATTI PER POINT)'), ('NEW AC SUPPLY POINT (IN CASING PAATTI PER POINT)'), 
  ('NEW POWER POINT FITTING (IN CONCEAL PATTI PER POINT)'), ('INVERTER BATTERY INSTALLATION'), 
  ('INVERTER POINT FITTING (PER POINT)'), ('WALL FAN FITTING'), ('1/2 HP WATER MOTOR PUMP FITTING'), 
  ('COOLER, WATER PUMP FITTING'), ('COOLER FAN MOTOR FITTING'), ('FALSE'), 
  ('CEILING POINT (PER POINT)'), ('CONCEAL ELECTRICAL WIRING (PER POINT)'), 
  ('CASING ELECTRICAL WIRING (PER POINT)'), ('ELECTRIC IRON REPAIR'), ('Other electrical services')
) AS new_items(item_name)
WHERE NOT EXISTS (
  SELECT 1 FROM public.service_items 
  WHERE service_id = 2 AND service_items.item_name = new_items.item_name
);

-- Add any missing items for Plumbing Services (service_id = 1)
INSERT INTO public.service_items (service_id, item_name) 
SELECT 1, item_name FROM (VALUES 
  ('TOILET JET'), ('BATHROOM WATER PROOFING'), ('BATHROOM WC (REMOVAL)'), 
  ('OLD PIPES WORK'), ('KHODKAAM (DIGGING WORK)'), ('EUROPEAN WATER CLOSET'), 
  ('WALL HUNG COMMODE FITTING'), ('ORISSA PAN TOILET'), ('GULLY TRAP'), 
  ('NAHANI TRAP'), ('SIPHON FITTING'), ('FLUSH TANK AND COCK'), 
  ('WATER TAP FITTING'), ('VASE COUPLING FITTING'), ('PILLAR COCK FITTING'), 
  ('ANGULAR COCK FITTING'), ('BIB COCK FITTING'), ('Other plumbing services')
) AS new_items(item_name)
WHERE NOT EXISTS (
  SELECT 1 FROM public.service_items 
  WHERE service_id = 1 AND service_items.item_name = new_items.item_name
);

-- Enable RLS on service_items table to allow public read access
ALTER TABLE public.service_items ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to view service items
CREATE POLICY "Anyone can view service items" ON public.service_items
  FOR SELECT USING (true);
