
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
import Testimonials from "@/components/Testimonials";
import { CartItemWithItems, OrderDetails, Membership as MembershipType, SelectedServiceItem } from "@/types/types";
import { useServices } from "@/hooks/useServices";
import { useMembershipsData } from "@/hooks/useMembershipsData";
import { useOrderNotification } from "@/hooks/useOrderNotification";
import MembershipRegistrationModal from "@/components/MembershipRegistrationModal";

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItemWithItems[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  // Fetch data from database
  const { data: services = [], isLoading: servicesLoading } = useServices();
  const { data: memberships = [], isLoading: membershipsLoading } = useMembershipsData();

  // Membership registration modal state
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

  const updateSelectedItems = (serviceId: number, selectedItems: SelectedServiceItem[]) => {
    setCartItems(prev =>
      prev.map(item =>
        item.service.id === serviceId ? { ...item, selectedItems } : item
      )
    );
  };

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.service.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
  };

  const handlePlaceOrder = async (orderDetails: OrderDetails) => {
    const orderId = `FG-${Date.now()}`;
    
    try {
      // Prepare order items for notification with selected service items
      const orderItems = cartItems.map(item => {
        const selectedItems = item.selectedItems?.filter(si => si.selected).map(si => si.name) || [];
        return {
          serviceName: item.service.name,
          quantity: item.quantity,
          price: item.service.price,
          selectedItems: selectedItems
        };
      });

      // Send WhatsApp notification to admin with complete order details
      await sendOrderNotification({
        customerName: orderDetails.name,
        customerPhone: orderDetails.phone,
        customerEmail: orderDetails.email,
        customerAddress: orderDetails.address,
        orderItems: orderItems,
        totalAmount: getTotalAmount(),
        finalAmount: orderDetails.finalTotal,
        discount: orderDetails.discount,
        couponCode: orderDetails.couponCode || undefined,
        customerNote: orderDetails.customerNote || undefined,
        orderId: orderId
      });

      console.log("Order placed and admin notified:", { orderDetails, cartItems, total: getTotalAmount() });
    } catch (error) {
      console.error("Error notifying admin:", error);
    }

    setCartItems([]);
    setShowCheckout(false);
  };

  const handleSelectMembership = (membership: MembershipType) => {
    setSelectedMembership(membership);
    setRegistrationModalOpen(true);
  };

  const handleRegisterMembership = (formValues: any) => {
    alert(`Thank you for registering for the ${selectedMembership?.name}!\nWe will contact you soon.`);
  };

  const { sendOrderNotification } = useOrderNotification();

  if (servicesLoading || membershipsLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setShowCart(true)}
      />
      <Hero />
      <Services services={services} onAddToCart={addToCart} />
      <Membership
        memberships={memberships}
        onSelectMembership={handleSelectMembership}
      />
      <MembershipRegistrationModal
        open={registrationModalOpen}
        onClose={() => setRegistrationModalOpen(false)}
        membership={selectedMembership}
        onRegister={handleRegisterMembership}
      />
      <PartnerSection />
      <TeamSection />
      <Testimonials />
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
          cartItems={cartItems}
          onUpdateSelectedItems={updateSelectedItems}
          onClose={() => setShowCheckout(false)}
          onPlaceOrder={handlePlaceOrder}
        />
      )}
      <WhatsappFab />
    </div>
  );
};

export default Index;
