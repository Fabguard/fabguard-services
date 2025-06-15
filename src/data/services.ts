
import { Service } from "@/types/types";

// Service items for different categories as per user instructions
export const SERVICE_ITEMS: Record<string, string[]> = {
  "Clothes Ironing Services": [
    "Shirt","T-shirt","Kurta","Trousers","Pyjama","Salwar","3 pc suit","Sherwani","Tops","Cotton saree","Silk saree","Ghagra","Plated skirt","Sweater","Jacket","Blazer","Skirt","Kid's shirt","Kids trousers","Kid's blazer","Kid's t-shirt","Kid's kurta","Kid's salwar","Kid's sherwani","Kid's jacket","Carpet", "Bedsheet", "Pillow cover", "Blanket", "Galicha", "Other laundry services"
  ],
  "Washing & Ironing Services": [
    "Shirt","T-shirt","Kurta","Trousers","Pyjama","Salwar","3 pc suit","Sherwani","Tops","Cotton saree","Silk saree","Ghagra","Plated skirt","Sweater","Jacket","Blazer","Skirt","Kid's shirt","Kids trousers","Kid's blazer","Kid's t-shirt","Kid's kurta","Kid's salwar","Kid's sherwani","Kid's jacket","Carpet", "Bedsheet", "Pillow cover", "Blanket", "Galicha", "Other laundry services"
  ],
  "Dry Cleaning Services": [
    "Shirt","T-shirt","Kurta","Trousers","Pyjama","Salwar","3 pc suit","Sherwani","Tops","Cotton saree","Silk saree","Ghagra","Plated skirt","Sweater","Jacket","Blazer","Skirt","Kid's shirt","Kids trousers","Kid's blazer","Kid's t-shirt","Kid's kurta","Kid's salwar","Kid's sherwani","Kid's jacket","Carpet", "Bedsheet", "Pillow cover", "Blanket", "Galicha", "Other laundry services"
  ],
  "Carpentry Services": [
    "SINGLE BED","LAMINATE DOOR","DOOR LATCH","2 CHAIR & 1 SOFA (SET)","NEW SOFA","DOUBLE BED ( 5 X 7 IN PLYWOOD)","DOOR LOCK FITTING","TABLE","OFFICE COUNTER","NEW CHAIR","DOOR PEEPHOLE","HINGES FITTING/ REPAIR","DOOR CHAIN FITTING","DOOR HANDLE FITTING","DOOR STOPPER", "Other carpentry services"
  ],
  "Electrical Services": [
    "JHOOMER FITTING","GEYSER COIL FITTING","GEYSER OTHER MAINTAINANCE","SWITCH FITTING (PER SWITCH)","SWITCH REPAIR","FAN BEARING","FAN WINDING","FAN WINDING & BEARING","NEW AC SUPPLY POINT (IN CONCEAL PATTI PER POINT)","NEW POWER POINT FITTING (IN CASING PATTI PER POINT)","NEW AC SUPPLY POINT (IN CASING PAATTI PER POINT)","NEW POWER POINT FITTING (IN CONCEAL PATTI PER POINT)","INVERTER BATTERY INSTALLATION","INVERTER POINT FITTING (PER POINT)","WALL FAN FITTING","1/2 HP WATER MOTOR PUMP FITTING","COOLER, WATER PUMP FITTING","COOLER FAN MOTOR FITTING","FALSE","CEILING POINT (PER POINT)","CONCEAL ELECTRICAL WIRING (PER POINT)","CASING ELECTRICAL WIRING (PER POINT)","ELECTRIC IRON REPAIR", "Other electrical services"
  ],
  "Plumbing Services": [
    "TOILET JET","BATHROOM WATER PROOFING","BATHROOM WC (REMOVAL)","OLD PIPES WORK","KHODKAAM (DIGGING WORK)","EUROPEAN WATER CLOSET","WALL HUNG COMMODE FITTING","ORISSA PAN TOILET","GULLY TRAP","NAHANI TRAP","SIPHON FITTING","FLUSH TANK AND COCK","WATER TAP FITTING","VASE COUPLING FITTING","PILLAR COCK FITTING","ANGULAR COCK FITTING","BIB COCK FITTING", "Other plumbing services"
  ]
};

export const SERVICES_WITH_IMAGES: (Service & { items?: string[] })[] = [
  {
    id: 1,
    name: "Plumbing Services",
    description: "All types of plumbing repair, fittings, leakages etc.",
    price: 150,
    image: "/lovable-uploads/6c6d23b8-6bdd-456b-960f-2117eb59dcf3.png", // updated image as requested
    category: "Plumbing Services",
    items: SERVICE_ITEMS["Plumbing Services"]
  },
  {
    id: 2,
    name: "Electrical Services",
    description: "Professional & safe electrical work for your home.",
    price: 150,
    image: "/lovable-uploads/609fbb63-9da3-4a8b-91a8-4083a524957f.png", // updated with user-uploaded image
    category: "Electrical Services",
    items: SERVICE_ITEMS["Electrical Services"]
  },
  {
    id: 3,
    name: "Carpentry Services",
    description: "All wooden repair, furniture making and fitting.",
    price: 150,
    image: "/lovable-uploads/1e070006-17a4-4996-b55f-47060cfa9a5d.png", // updated with user-uploaded image
    category: "Carpentry Services",
    items: SERVICE_ITEMS["Carpentry Services"]
  },
  {
    id: 4,
    name: "Clothes Ironing Services",
    description: "Neat, crisp ironing for all types of clothes.",
    price: 100,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop", // white robot near wall (unique placeholder)
    category: "Clothes Ironing Services",
    items: SERVICE_ITEMS["Clothes Ironing Services"]
  },
  {
    id: 5,
    name: "Dry Cleaning Services",
    description: "Professional dry cleaning for all items.",
    price: 100,
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop", // gray and black laptop computer (unique placeholder)
    category: "Dry Cleaning Services",
    items: SERVICE_ITEMS["Dry Cleaning Services"]
  },
  {
    id: 6,
    name: "Washing & Ironing Services",
    description: "Complete wash + ironing service.",
    price: 100,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop", // woman in white long sleeve shirt using black laptop
    category: "Washing & Ironing Services",
    items: SERVICE_ITEMS["Washing & Ironing Services"]
  }
];
