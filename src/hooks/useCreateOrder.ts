
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { CartItemWithItems, OrderDetails } from '@/types/types';

interface CreateOrderData {
  orderDetails: OrderDetails;
  cartItems: CartItemWithItems[];
  orderId: string;
}

export function useCreateOrder() {
  return useMutation({
    mutationFn: async ({ orderDetails, cartItems, orderId }: CreateOrderData) => {
      console.log('Creating order with details:', orderDetails);
      console.log('Cart items:', cartItems);

      try {
        // First, create or get the customer
        const { data: existingCustomer, error: customerSelectError } = await supabase
          .from('customers')
          .select('id')
          .eq('email', orderDetails.email)
          .maybeSingle();

        if (customerSelectError) {
          console.error('Error checking existing customer:', customerSelectError);
          throw customerSelectError;
        }

        let customerId: string;

        if (existingCustomer) {
          customerId = existingCustomer.id;
          console.log('Found existing customer:', customerId);
          
          // Update customer info
          const { error: updateError } = await supabase
            .from('customers')
            .update({
              name: orderDetails.name,
              phone: orderDetails.phone,
              address: orderDetails.address
            })
            .eq('id', customerId);

          if (updateError) {
            console.error('Error updating customer:', updateError);
            throw updateError;
          }
        } else {
          console.log('Creating new customer');
          
          // Create new customer
          const { data: newCustomer, error: customerError } = await supabase
            .from('customers')
            .insert({
              name: orderDetails.name,
              email: orderDetails.email,
              phone: orderDetails.phone,
              address: orderDetails.address
            })
            .select('id')
            .single();

          if (customerError) {
            console.error('Error creating customer:', customerError);
            throw customerError;
          }
          
          if (!newCustomer) {
            throw new Error('Failed to create customer - no data returned');
          }
          
          customerId = newCustomer.id;
          console.log('Created new customer:', customerId);
        }

        // Create the order
        const totalAmount = cartItems.reduce((sum, item) => sum + (item.service.price * item.quantity), 0);
        
        console.log('Creating order with total amount:', totalAmount);
        
        const { data: order, error: orderError } = await supabase
          .from('orders')
          .insert({
            customer_id: customerId,
            total_amount: totalAmount,
            discount_amount: orderDetails.discount || 0,
            final_amount: orderDetails.finalTotal,
            coupon_code: orderDetails.couponCode || null,
            customer_note: orderDetails.customerNote || null,
            status: 'pending',
            payment_method: 'cash_on_delivery'
          })
          .select('id')
          .single();

        if (orderError) {
          console.error('Error creating order:', orderError);
          throw orderError;
        }

        if (!order) {
          throw new Error('Failed to create order - no data returned');
        }

        console.log('Created order:', order.id);

        // Create order items
        const orderItems = cartItems.map(item => ({
          order_id: order.id,
          service_id: item.service.id,
          quantity: item.quantity,
          unit_price: item.service.price,
          total_price: item.service.price * item.quantity
        }));

        console.log('Creating order items:', orderItems);

        const { error: orderItemsError } = await supabase
          .from('order_items')
          .insert(orderItems);

        if (orderItemsError) {
          console.error('Error creating order items:', orderItemsError);
          throw orderItemsError;
        }

        console.log('Order created successfully');
        return { orderId: order.id, customerId };

      } catch (error) {
        console.error('Detailed error in order creation:', error);
        throw error;
      }
    }
  });
}
