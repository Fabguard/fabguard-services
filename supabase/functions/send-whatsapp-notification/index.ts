
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface OrderNotification {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress: string;
  orderItems: Array<{
    serviceName: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  finalAmount: number;
  discount: number;
  couponCode?: string;
  customerNote?: string;
  orderId: string;
}

const adminWhatsAppNumber = "+917262927177";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderData }: { orderData: OrderNotification } = await req.json();
    console.log("Received order notification request:", orderData);

    // Format the WhatsApp message
    const message = formatWhatsAppMessage(orderData);
    
    // Create WhatsApp URL with pre-filled message
    const whatsappUrl = `https://wa.me/${adminWhatsAppNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;
    
    console.log("WhatsApp notification prepared for admin");
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Order notification prepared",
        whatsappUrl: whatsappUrl 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error("Error in send-whatsapp-notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});

function formatWhatsAppMessage(orderData: OrderNotification): string {
  const itemsList = orderData.orderItems
    .map(item => `• ${item.serviceName} (Qty: ${item.quantity}) - ₹${item.price * item.quantity}`)
    .join('\n');

  return `🔧 *NEW ORDER RECEIVED - FABGUARD*

📋 *Order ID:* ${orderData.orderId}

👤 *Customer Details:*
Name: ${orderData.customerName}
Phone: ${orderData.customerPhone}
Email: ${orderData.customerEmail}
Address: ${orderData.customerAddress}

🛠️ *Services Ordered:*
${itemsList}

💰 *Payment Details:*
Subtotal: ₹${orderData.totalAmount}
${orderData.discount > 0 ? `Discount: -₹${orderData.discount}${orderData.couponCode ? ` (${orderData.couponCode})` : ''}` : ''}
*Final Amount: ₹${orderData.finalAmount}*
Payment: Cash on Delivery

${orderData.customerNote ? `📝 *Customer Note:*\n${orderData.customerNote}\n` : ''}
⏰ *Order Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

Please contact the customer to schedule the service.`;
}
