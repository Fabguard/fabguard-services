
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useServices } from "@/hooks/useServices";
import { useCreateOrder } from "@/hooks/useCreateOrder";
import { useOrderNotification } from "@/hooks/useOrderNotification";
import { CartItemWithItems, OrderDetails, SelectedServiceItem } from "@/types/types";

export const useCartManagement = () => {
  const [cartItems, setCartItems] = useState<CartItemWithItems[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const { toast } = useToast();
  const { data: services = [] } = useServices();
  const createOrderMutation = useCreateOrder();
  const { sendOrderNotification } = useOrderNotification();

  const addToCart = (serviceId: number) => {
    const service = services.find(s => s.id === serviceId);
    if (!service) return;

    const existingItem = cartItems.find(item => item.service.id === serviceId);
    
    if (existingItem) {
      // Service already in cart, don't add duplicate
      toast({
        title: "Service Already Added",
        description: `${service.name} is already in your cart.`,
      });
      return;
    }

    const newItem: CartItemWithItems = {
      service: {
        id: service.id,
        name: service.name,
        price: service.price,
        image: service.image,
        description: service.description,
        category: service.category
      },
      quantity: 1, // Always 1 for services
      selectedItems: []
    };
    setCartItems(items => [...items, newItem]);
    
    toast({
      title: "Added to Cart",
      description: `${service.name} has been added to your cart.`,
    });
  };

  const removeFromCart = (serviceId: number) => {
    setCartItems(items => items.filter(item => item.service.id !== serviceId));
    toast({
      title: "Removed from Cart",
      description: "Service has been removed from your cart.",
    });
  };

  const updateQuantity = (serviceId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(serviceId);
      return;
    }
    
    // For services, quantity should always be 1
    setCartItems(items => 
      items.map(item => 
        item.service.id === serviceId 
          ? { ...item, quantity: 1 }
          : item
      )
    );
  };

  const updateSelectedItems = (serviceId: number, selectedItems: SelectedServiceItem[]) => {
    console.log('Updating selected items for service:', serviceId, 'items:', selectedItems);
    setCartItems(items => 
      items.map(item => 
        item.service.id === serviceId 
          ? { ...item, selectedItems }
          : item
      )
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.service.price, 0); // Remove quantity multiplication
  };

  const getTotalItems = () => {
    return cartItems.length; // Count services, not quantities
  };

  const handlePlaceOrder = async (orderDetails: OrderDetails) => {
    try {
      const orderId = `ORDER-${Date.now()}`;
      
      await createOrderMutation.mutateAsync({
        orderDetails,
        cartItems,
        orderId
      });

      // Send WhatsApp notification
      try {
        await sendOrderNotification({
          customerName: orderDetails.name,
          customerPhone: orderDetails.phone,
          customerEmail: orderDetails.email,
          customerAddress: orderDetails.address,
          orderItems: cartItems.map(item => ({
            serviceName: item.service.name,
            quantity: item.quantity,
            price: item.service.price
          })),
          totalAmount: getTotalPrice(),
          finalAmount: orderDetails.finalTotal,
          discount: orderDetails.discount,
          couponCode: orderDetails.couponCode,
          customerNote: orderDetails.customerNote,
          orderId
        });
      } catch (notificationError) {
        console.error('Notification error (non-blocking):', notificationError);
      }

      // Clear cart and close modals
      setCartItems([]);
      setShowCheckout(false);
      setShowCart(false);
      
    } catch (error) {
      console.error('Error placing order:', error);
      throw error;
    }
  };

  return {
    cartItems,
    showCart,
    setShowCart,
    showCheckout,
    setShowCheckout,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateSelectedItems,
    getTotalPrice,
    getTotalItems,
    handlePlaceOrder
  };
};
