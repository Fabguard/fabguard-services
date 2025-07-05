
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('WhatsApp notification function called');
    
    const { orderData } = await req.json();
    console.log('Order data received:', orderData);

    if (!orderData) {
      throw new Error('Order data is required');
    }

    // Format the WhatsApp message
    const orderItemsList = orderData.orderItems
      .map((item: any) => `• ${item.serviceName} - ₹${item.price}`)
      .join('\n');

    const message = `🔔 *NEW ORDER RECEIVED* 🔔

📋 *Order Details:*
Order ID: ${orderData.orderId}
Customer: ${orderData.customerName}
Phone: ${orderData.customerPhone}
Email: ${orderData.customerEmail}
Address: ${orderData.customerAddress}

🛍️ *Services Ordered:*
${orderItemsList}

💰 *Payment Summary:*
Total Amount: ₹${orderData.totalAmount}
${orderData.discount > 0 ? `Discount: ₹${orderData.discount}` : ''}
${orderData.couponCode ? `Coupon Code: ${orderData.couponCode}` : ''}
Final Amount: ₹${orderData.finalAmount}

${orderData.customerNote ? `📝 *Customer Note:*\n${orderData.customerNote}` : ''}

Please contact the customer to confirm the order.`;

    console.log('Formatted message:', message);

    // Create WhatsApp URL
    const phoneNumber = '917262927177';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    console.log('WhatsApp URL created:', whatsappUrl);

    // Return success response with WhatsApp URL
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Notification prepared successfully',
        whatsappUrl: whatsappUrl
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error in WhatsApp notification function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to process notification',
        success: false 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});
