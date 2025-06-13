import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import PartnerSection from "@/components/PartnerSection";
import Cart from "@/components/Cart";
import Checkout from "@/components/Checkout";
import { Service, CartItem, OrderDetails } from "@/types/types";

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const services: Service[] = [
    {
      id: 1,
      name: "Plumbing Services",
      description: "Professional plumbing repairs, pipe fitting aur water leakage ka solution",
      price: 300,
      image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=300&fit=crop",
      category: "Ghar Ki Repair"
    },
    {
      id: 2,
      name: "Electrical Services",
      description: "Certified electricians dwara safe aur reliable electrical work",
      price: 400,
      image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop",
      category: "Ghar Ki Repair"
    },
    {
      id: 3,
      name: "Carpentry Services",
      description: "Custom furniture repair, door-window fitting aur woodwork",
      price: 350,
      image: "https://images.unsplash.com/photo-1621905252472-e8592afb8f6f?w=400&h=300&fit=crop",
      category: "Ghar Ki Repair"
    },
    {
      id: 4,
      name: "Laundry Services",
      description: "Ghar se pickup aur same day delivery ke saath complete laundry",
      price: 150,
      image: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=400&h=300&fit=crop",
      category: "Kapde Ki Safai"
    },
    {
      id: 5,
      name: "Dry Cleaning",
      description: "Delicate aur formal wear ke liye professional dry cleaning",
      price: 100,
      image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=300&fit=crop",
      category: "Kapde Ki Safai"
    },
    {
      id: 6,
      name: "Washing & Ironing",
      description: "Daily wear clothes ke liye complete washing aur neat ironing",
      price: 120,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      category: "Kapde Ki Safai"
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

  const handleCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
  };

  const handlePlaceOrder = (orderDetails: OrderDetails) => {
    console.log("Order placed:", { orderDetails, cartItems, total: getTotalAmount() });
    // Reset cart and close modals
    setCartItems([]);
    setShowCheckout(false);
    // In a real app, you would send this data to your backend
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setShowCart(true)}
      />
      <Hero />
      <Services services={services} onAddToCart={addToCart} />
      <PartnerSection />
      
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
