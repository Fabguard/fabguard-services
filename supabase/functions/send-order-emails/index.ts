import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface OrderEmailData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  orderItems: Array<{
    serviceName: string;
    quantity: number;
    price: number;
    selectedItems?: string[];
  }>;
  totalAmount: number;
  finalAmount: number;
  discount: number;
  couponCode?: string;
  customerNote?: string;
  orderId: string;
}

const createCustomerEmailHTML = (orderData: OrderEmailData) => {
  const orderItemsList = orderData.orderItems
    .map((item) => {
      let itemText = `<li style="margin-bottom: 12px;">
        <strong>${item.serviceName}</strong> - ₹${item.price}`;
      if (item.selectedItems && item.selectedItems.length > 0) {
        itemText += `<br><span style="color: #666; font-size: 14px;">Items: ${item.selectedItems.join(', ')}</span>`;
      }
      itemText += `</li>`;
      return itemText;
    })
    .join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0; font-size: 28px;">Order Confirmed! 🎉</h1>
        <p style="margin: 10px 0 0 0; font-size: 18px;">Thank you for choosing Fabguard Services</p>
      </div>
      
      <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #333; margin-top: 0;">Hello ${orderData.customerName}!</h2>
        <p>Your order has been successfully placed and is being processed. Here are the details:</p>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
          <h3 style="margin-top: 0; color: #667eea;">Order Details</h3>
          <p><strong>Order ID:</strong> ${orderData.orderId}</p>
          <p><strong>Phone:</strong> ${orderData.customerPhone}</p>
          <p><strong>Address:</strong> ${orderData.customerAddress}</p>
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #667eea;">Services Ordered</h3>
          <ul style="list-style: none; padding: 0;">
            ${orderItemsList}
          </ul>
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #667eea;">Payment Summary</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Subtotal:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right;">₹${orderData.totalAmount}</td>
            </tr>
            ${orderData.discount > 0 ? `
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #28a745;"><strong>Discount:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right; color: #28a745;">-₹${orderData.discount}</td>
            </tr>
            ` : ''}
            ${orderData.couponCode ? `
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Coupon Code:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right;">${orderData.couponCode}</td>
            </tr>
            ` : ''}
            <tr style="font-size: 18px;">
              <td style="padding: 12px 0; border-top: 2px solid #667eea;"><strong>Total Amount:</strong></td>
              <td style="padding: 12px 0; border-top: 2px solid #667eea; text-align: right;"><strong>₹${orderData.finalAmount}</strong></td>
            </tr>
          </table>
        </div>
        
        ${orderData.customerNote ? `
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #667eea;">Your Note</h3>
          <p style="font-style: italic;">"${orderData.customerNote}"</p>
        </div>
        ` : ''}
        
        <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #1976d2;">What's Next?</h3>
          <p>Our team will contact you shortly to confirm the details and schedule the service. Payment will be collected on delivery (Cash on Delivery).</p>
        </div>
        
        <p>If you have any questions, feel free to contact us!</p>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
          <p style="margin: 0; color: #666; font-size: 14px;">Fabguard Services is a brand under BAT Software Services</p>
          <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">©BAT Software</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const createAdminEmailHTML = (orderData: OrderEmailData) => {
  const orderItemsList = orderData.orderItems
    .map((item) => {
      let itemText = `<li style="margin-bottom: 12px;">
        <strong>${item.serviceName}</strong> - ₹${item.price}`;
      if (item.selectedItems && item.selectedItems.length > 0) {
        itemText += `<br><span style="color: #666; font-size: 14px;">Selected items: ${item.selectedItems.join(', ')}</span>`;
      }
      itemText += `</li>`;
      return itemText;
    })
    .join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Order Received</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0; font-size: 28px;">🔔 New Order Received!</h1>
        <p style="margin: 10px 0 0 0; font-size: 18px;">Action Required</p>
      </div>
      
      <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #333; margin-top: 0;">Order Details</h2>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ff6b6b;">
          <h3 style="margin-top: 0; color: #ff6b6b;">Customer Information</h3>
          <p><strong>Name:</strong> ${orderData.customerName}</p>
          <p><strong>Email:</strong> ${orderData.customerEmail}</p>
          <p><strong>Phone:</strong> ${orderData.customerPhone}</p>
          <p><strong>Address:</strong> ${orderData.customerAddress}</p>
          <p><strong>Order ID:</strong> ${orderData.orderId}</p>
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #ff6b6b;">Services Ordered</h3>
          <ul style="list-style: none; padding: 0;">
            ${orderItemsList}
          </ul>
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #ff6b6b;">Payment Summary</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Total Amount:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right;">₹${orderData.totalAmount}</td>
            </tr>
            ${orderData.discount > 0 ? `
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #28a745;"><strong>Discount:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right; color: #28a745;">-₹${orderData.discount}</td>
            </tr>
            ` : ''}
            ${orderData.couponCode ? `
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Coupon Code:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right;">${orderData.couponCode}</td>
            </tr>
            ` : ''}
            <tr style="font-size: 18px;">
              <td style="padding: 12px 0; border-top: 2px solid #ff6b6b;"><strong>Final Amount:</strong></td>
              <td style="padding: 12px 0; border-top: 2px solid #ff6b6b; text-align: right;"><strong>₹${orderData.finalAmount}</strong></td>
            </tr>
          </table>
        </div>
        
        ${orderData.customerNote ? `
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #ff6b6b;">Customer Note</h3>
          <p style="font-style: italic; background: #fff3cd; padding: 15px; border-radius: 5px; border-left: 4px solid #ffc107;">"${orderData.customerNote}"</p>
        </div>
        ` : ''}
        
        <div style="background: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
          <h3 style="margin-top: 0; color: #155724;">Next Steps</h3>
          <p style="margin-bottom: 10px;"><strong>1.</strong> Contact the customer to confirm order details</p>
          <p style="margin-bottom: 10px;"><strong>2.</strong> Schedule the service appointment</p>
          <p style="margin-bottom: 0;"><strong>3.</strong> Assign team members for the service</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
          <p style="margin: 0; color: #666; font-size: 14px;">Fabguard Services Admin Panel</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Email sending function called');
    
    const { orderData }: { orderData: OrderEmailData } = await req.json();
    console.log('Order data received for emails:', orderData);

    if (!orderData) {
      throw new Error('Order data is required');
    }

    // Send customer email - Using Resend's verified sender for reliable delivery
    // Domain fabguard.co.in must be verified at https://resend.com/domains
    const customerEmailResult = await resend.emails.send({
      from: 'Fabguard Services <support@fabguard.co.in>',
      replyTo: 'support@fabguard.co.in',
      to: [orderData.customerEmail],
      subject: `Order Confirmation & Invoice - ${orderData.orderId}`,
      html: createCustomerEmailHTML(orderData),
    });

    console.log('Customer email sent:', customerEmailResult);

    // Send admin email
    const adminEmailResult = await resend.emails.send({
      from: 'Fabguard Services <support@fabguard.co.in>',
      replyTo: 'support@fabguard.co.in',
      to: ['info@fabguard.co.in', 'fabguard.in@gmail.com', 'support@fabguard.co.in'],
      subject: `🔔 New Order Received - ${orderData.orderId}`,
      html: createAdminEmailHTML(orderData),
    });

    console.log('Admin email sent:', adminEmailResult);

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Emails sent successfully',
        customerEmailId: customerEmailResult.data?.id,
        adminEmailId: adminEmailResult.data?.id
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error in email sending function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to send emails',
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