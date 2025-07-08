
import { useToast } from "@/hooks/use-toast";
import { useCreateOrder } from "@/hooks/useCreateOrder";
import { useOrderNotification } from "@/hooks/useOrderNotification";
import { CartItemWithItems, OrderDetails } from "@/types/types";
import { ToastAction } from "@/components/ui/toast";

export const useOrderPlacement = (
  cartItems: CartItemWithItems[],
  setCartItems: React.Dispatch<React.SetStateAction<CartItemWithItems[]>>,
  setShowCheckout: (show: boolean) => void,
  setShowCart: (show: boolean) => void,
  getTotalPrice: () => number
) => {
  const { toast } = useToast();
  const createOrderMutation = useCreateOrder();
  const { sendOrderNotification } = useOrderNotification();

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
    handlePlaceOrder
  };
};
