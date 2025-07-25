import { supabase } from "@/integrations/supabase/client";
import { OrderNotificationData } from "@/types/types";

export const useOrderEmails = () => {
  const sendOrderEmails = async (orderData: OrderNotificationData) => {
    try {
      console.log("Sending order emails...", orderData);
      
      const { data, error } = await supabase.functions.invoke('send-order-emails', {
        body: { orderData }
      });

      if (error) {
        console.error("Error sending emails:", error);
        throw error;
      }

      console.log("Order emails sent successfully:", data);
      return data;
    } catch (error) {
      console.error("Failed to send order emails:", error);
      throw error;
    }
  };

  return { sendOrderEmails };
};