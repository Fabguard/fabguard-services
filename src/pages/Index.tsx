import React, { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import PartnerSection from "@/components/PartnerSection";
import Membership from "@/components/Membership";
import Cart from "@/components/Cart";
import Checkout from "@/components/Checkout";
import TeamSection from "@/components/TeamSection";
import ContactForm from "@/components/ContactForm";
import WhatsappFab from "@/components/WhatsappFab";
import { CartItem, OrderDetails, Membership as MembershipType } from "@/types/types";
import { useMemberships } from "@/hooks/useMemberships";
import { SERVICES_WITH_IMAGES } from "@/data/services";
import MembershipRegistrationModal from "@/components/MembershipRegistrationModal";

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  // Membership registration modal state
  const { memberships } = useMemberships();
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState<MembershipType | null>(null);

  const addToCart = (service: any) => {
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
    setCartItems([]);
    setShowCheckout(false);
  };

  // Registration handler
  const handleSelectMembership = (membership: MembershipType) => {
    setSelectedMembership(membership);
    setRegistrationModalOpen(true);
  };

  const handleRegisterMembership = (formValues: any) => {
    // Handle registration: currently just shows a success toast/alert and resets
    alert(`Thank you for registering for the ${selectedMembership?.name}!\nWe will contact you soon.`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setShowCart(true)}
      />
      <Hero />
      <Services services={SERVICES_WITH_IMAGES} onAddToCart={addToCart} />
      <Membership
        memberships={memberships}
        onSelectMembership={handleSelectMembership}
      />
      {/* Registration Modal */}
      <MembershipRegistrationModal
        open={registrationModalOpen}
        onClose={() => setRegistrationModalOpen(false)}
        membership={selectedMembership}
        onRegister={handleRegisterMembership}
      />
      <PartnerSection />
      <TeamSection />
      <ContactForm />
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
      {/* Place floating WhatsApp button */}
      <WhatsappFab />
    </div>
  );
};

export default Index;
