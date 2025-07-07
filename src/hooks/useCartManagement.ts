import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useServices } from "@/hooks/useServices";
import { useCreateOrder } from "@/hooks/useCreateOrder";
import { useOrderNotification } from "@/hooks/useOrderNotification";
import { CartItemWithItems, OrderDetails, SelectedServiceItem } from "@/types/types";
import { ToastAction } from "@/components/ui/toast";

export const useCartManagement = () => {
  const [cartItems, setCartItems] = useState<CartItemWithItems[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const { toast } = useToast();
  const { data: services = [] } = useServices();
  const createOrderMutation = useCreateOrder();
  const { sendOrderNotification } = useOrderNotification();

  const addToCart = (serviceId: number) => {
    try {
      const service = services.find(s => s.id === serviceId);
      if (!service) {
        console.error('Service not found:', serviceId);
        return;
      }

      const existingItem = cartItems.find(item => item.service.id === serviceId);
      
      if (existingItem) {
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
        quantity: 1,
        selectedItems: []
      };
      
      setCartItems(prevItems => [...prevItems, newItem]);
      
      toast({
        title: "Added to Cart",
        description: `${service.name} has been added to your cart.`,
      });
    } catch (error) {
      console.error('Error adding service to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add service to cart. Please try again.",
        variant: "destructive"
      });
    }
  };

  const removeFromCart = (serviceId: number) => {
    console.log('Removing service from cart:', serviceId);
    
    try {
      setCartItems(prevItems => {
        const newItems = prevItems.filter(item => item.service.id !== serviceId);
        console.log('Cart updated. Previous count:', prevItems.length, 'New count:', newItems.length);
        return newItems;
      });
      
      toast({
        title: "Removed from Cart",
        description: "Service has been removed from your cart.",
      });
    } catch (error) {
      console.error('Error removing service from cart:', error);
      toast({
        title: "Error",
        description: "Failed to remove service from cart. Please try again.",
        variant: "destructive"
      });
    }
  };

  const updateQuantity = (serviceId: number, quantity: number) => {
    console.log('Updating quantity for service:', serviceId, 'to quantity:', quantity);
    
    if (quantity <= 0) {
      removeFromCart(serviceId);
      return;
    }
    
    try {
      setCartItems(prevItems => 
        prevItems.map(item => 
          item.service.id === serviceId 
            ? { ...item, quantity: 1 } // Keep quantity at 1 for services
            : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast({
        title: "Error",
        description: "Failed to update quantity. Please try again.",
        variant: "destructive"
      });
    }
  };

  const updateSelectedItems = (serviceId: number, selectedItems: SelectedServiceItem[]) => {
    console.log('Updating selected items for service:', serviceId, 'items:', selectedItems);
    
    try {
      setCartItems(prevItems => 
        prevItems.map(item => 
          item.service.id === serviceId 
            ? { ...item, selectedItems }
            : item
        )
      );
    } catch (error) {
      console.error('Error updating selected items:', error);
      toast({
        title: "Error",
        description: "Failed to update selected items. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getTotalPrice = () => {
    try {
      return cartItems.reduce((total, item) => total + item.service.price, 0);
    } catch (error) {
      console.error('Error calculating total price:', error);
      return 0;
    }
  };

  const getTotalItems = () => {
    try {
      return cartItems.length;
    } catch (error) {
      console.error('Error getting total items:', error);
      return 0;
    }
  };

  const handlePlaceOrder = async (orderDetails: OrderDetails) => {
    console.log('Placing order with details:', orderDetails);
    console.log('Cart items:', cartItems);
    
    try {
      const orderId = `ORDER-${Date.now()}`;
      
      // Create the order
      console.log('Creating order...');
      await createOrderMutation.mutateAsync({
        orderDetails,
        cartItems,
        orderId
      });
      console.log('Order created successfully');

      // Send WhatsApp notification (non-blocking)
      try {
        console.log('Sending WhatsApp notification...');
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
        console.log('WhatsApp notification sent successfully');
      } catch (notificationError) {
        console.error('Notification error (non-blocking):', notificationError);
        // Don't throw error for notification failure
      }

      // Clear cart and close modals
      console.log('Clearing cart and closing modals...');
      setCartItems([]);
      setShowCheckout(false);
      setShowCart(false);
      
      toast({
        title: "Order Placed Successfully!",
        description: "Your order has been placed. Our team will contact you soon.",
        action: (
          <ToastAction 
            altText="Share Feedback"
            onClick={() => window.open('https://g.page/r/CZZUXPjcrajXEBM/review', '_blank')}
          >
            Share Feedback
          </ToastAction>
        ),
      });
      
    } catch (error) {
      console.error('Error placing order:', error);
      toast({
        title: "Order Failed",
        description: "There was an issue placing your order. Please try again.",
        variant: "destructive"
      });
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
