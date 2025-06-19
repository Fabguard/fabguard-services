
import { supabase } from "@/integrations/supabase/client";

interface OrderItem {
  serviceName: string;
  quantity: number;
  price: number;
}

interface OrderNotificationData {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress: string;
  orderItems: OrderItem[];
  totalAmount: number;
  finalAmount: number;
  discount: number;
  couponCode?: string;
  customerNote?: string;
  orderId: string;
}

export const useOrderNotification = () => {
  const sendOrderNotification = async (orderData: OrderNotificationData) => {
    try {
      console.log("Sending order notification to admin...", orderData);
      
      const { data, error } = await supabase.functions.invoke('send-whatsapp-notification', {
        body: { orderData }
      });

      if (error) {
        console.error("Error sending notification:", error);
        throw error;
      }

      console.log("Order notification sent successfully:", data);
      
      // Automatically open WhatsApp with the pre-filled message
      if (data?.whatsappUrl) {
        window.open(data.whatsappUrl, '_blank');
      }
      
      return data;
    } catch (error) {
      console.error("Failed to send order notification:", error);
      throw error;
    }
  };

  return { sendOrderNotification };
};
```
