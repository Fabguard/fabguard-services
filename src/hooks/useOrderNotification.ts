
import { supabase } from "@/integrations/supabase/client";
import { OrderNotificationData } from "@/types/types";

interface OrderNotificationInput {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress: string;
  services: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  orderNote?: string;
}

export const useOrderNotification = () => {
  const sendOrderNotification = async (input: OrderNotificationInput) => {
    try {
      console.log("Sending order notification to admin...", input);
      
      // Transform the input to match the expected format
      const orderData: OrderNotificationData = {
        customerName: input.customerName,
        customerPhone: input.customerPhone,
        customerEmail: input.customerEmail,
        customerAddress: input.customerAddress,
        orderItems: input.services.map(service => ({
          serviceName: service.name,
          quantity: service.quantity,
          price: service.price
        })),
        totalAmount: input.totalAmount,
        finalAmount: input.totalAmount,
        discount: 0,
        customerNote: input.orderNote,
        orderId: `ORDER-${Date.now()}`
      };
      
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
