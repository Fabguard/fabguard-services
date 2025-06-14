import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import PartnerSection from "@/components/PartnerSection";
import Membership from "@/components/Membership";
import Cart from "@/components/Cart";
import Checkout from "@/components/Checkout";
import TeamSection from "@/components/TeamSection";
import ContactForm from "@/components/ContactForm";
import { Service, CartItem, OrderDetails, Membership as MembershipType } from "@/types/types";

// Service items for different categories as per user instructions
const SERVICE_ITEMS = {
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

const SERVICES_WITH_IMAGES = [
  {
    id: 1,
    name: "Plumbing Services",
    description: "All types of plumbing repair, fittings, leakages etc.",
    price: 300,
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=300&fit=crop",
    category: "Plumbing Services",
    items: SERVICE_ITEMS["Plumbing Services"]
  },
  {
    id: 2,
    name: "Electrical Services",
    description: "Professional & safe electrical work for your home.",
    price: 400,
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop",
    category: "Electrical Services",
    items: SERVICE_ITEMS["Electrical Services"]
  },
  {
    id: 3,
    name: "Carpentry Services",
    description: "All wooden repair, furniture making and fitting.",
    price: 350,
    image: "https://images.unsplash.com/photo-1621905252472-e8592afb8f6f?w=400&h=300&fit=crop",
    category: "Carpentry Services",
    items: SERVICE_ITEMS["Carpentry Services"]
  },
  {
    id: 4,
    name: "Clothes Ironing Services",
    description: "Neat, crisp ironing for all types of clothes.",
    price: 150,
    image: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=400&h=300&fit=crop",
    category: "Clothes Ironing Services",
    items: SERVICE_ITEMS["Clothes Ironing Services"]
  },
  {
    id: 5,
    name: "Dry Cleaning Services",
    description: "Professional dry cleaning for all items.",
    price: 100,
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=300&fit=crop",
    category: "Dry Cleaning Services",
    items: SERVICE_ITEMS["Dry Cleaning Services"]
  },
  {
    id: 6,
    name: "Washing & Ironing Services",
    description: "Complete wash + ironing service.",
    price: 120,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    category: "Washing & Ironing Services",
    items: SERVICE_ITEMS["Washing & Ironing Services"]
  }
];

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const memberships: MembershipType[] = [
    {
      id: 1,
      name: "Gold Membership",
      price: 2000,
      validity: "1-Year Validity",
      discount: "10% Discount",
      services: ["Clothes Ironing Services", "Dry Cleaning Services"],
      features: ["Quick Service", "Exclusive Coupon Code"],
      color: "gold",
      bgGradient: "bg-gradient-to-r from-yellow-400 to-yellow-600"
    },
    {
      id: 2,
      name: "Platinum Membership",
      price: 3000,
      validity: "1-Year Validity",
      discount: "10% Discount",
      services: ["Clothes Ironing Services", "Dry Cleaning Services", "Electrical Services", "Plumbing Services"],
      features: ["Exclusive Coupon Code"],
      color: "platinum",
      bgGradient: "bg-gradient-to-r from-gray-400 to-gray-600",
      popular: true
    },
    {
      id: 3,
      name: "Diamond Membership",
      price: 4000,
      validity: "1-Year Validity",
      discount: "10% Discount",
      services: ["Clothes Ironing Services", "Dry Cleaning Services", "Electrical Services", "Plumbing Services", "Carpentry Services"],
      features: ["Exclusive Coupon Code"],
      color: "diamond",
      bgGradient: "bg-gradient-to-r from-blue-400 to-blue-600"
    }
  ];

  const addToCart = (service: Service) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.service.id === service.id);
      if (existingItem) {
        return prev.map(item =>
          item.service.id === service.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { service, quantity: 1 }];
    });
  };

  const updateQuantity = (serviceId: number, quantity: number) => {
    if (quantity === 0) {
      setCartItems(prev => prev.filter(item => item.service.id !== serviceId));
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.service.id === serviceId ? { ...item, quantity } : item
        )
      );
    }
  };

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.service.price * item.quantity), 0);
  };

  const handleSelectMembership = (membership: MembershipType) => {
    console.log("Selected membership:", membership);
    // In a real app, you would navigate to payment or show membership signup form
  };

  const handleCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
  };

  const handlePlaceOrder = (orderDetails: OrderDetails) => {
    console.log("Order placed:", { orderDetails, cartItems, total: getTotalAmount() });
    setCartItems([]);
    setShowCheckout(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setShowCart(true)}
      />
      <Hero />
      <Services services={SERVICES_WITH_IMAGES} onAddToCart={addToCart} />
      <Membership memberships={memberships} onSelectMembership={handleSelectMembership} />
      <PartnerSection />
      <TeamSection />
      <ContactForm />
      {/* Place Contact section here later */}
      {showCart && (
        <Cart
          items={cartItems}
          onUpdateQuantity={updateQuantity}
          onClose={() => setShowCart(false)}
          onCheckout={handleCheckout}
          total={getTotalAmount()}
        />
      )}
      {showCheckout && (
        <Checkout
          total={getTotalAmount()}
          onClose={() => setShowCheckout(false)}
          onPlaceOrder={handlePlaceOrder}
        />
      )}
    </div>
  );
};

export default Index;
