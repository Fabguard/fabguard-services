
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
      // First, create or get the customer
      const { data: existingCustomer } = await supabase
        .from('customers')
        .select('id')
        .eq('email', orderDetails.email)
        .single();

      let customerId: string;

      if (existingCustomer) {
        customerId = existingCustomer.id;
        // Update customer info
        await supabase
          .from('customers')
          .update({
            name: orderDetails.name,
            phone: orderDetails.phone,
            address: orderDetails.address
          })
          .eq('id', customerId);
      } else {
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

        if (customerError) throw customerError;
        customerId = newCustomer.id;
      }

      // Create the order
      const totalAmount = cartItems.reduce((sum, item) => sum + (item.service.price * item.quantity), 0);
      
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_id: customerId,
          total_amount: totalAmount,
          discount_amount: orderDetails.discount,
          final_amount: orderDetails.finalTotal,
          coupon_code: orderDetails.couponCode,
          customer_note: orderDetails.customerNote,
          status: 'pending',
          payment_method: 'cash_on_delivery'
        })
        .select('id')
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        service_id: item.service.id,
        quantity: item.quantity,
        unit_price: item.service.price,
        total_price: item.service.price * item.quantity
      }));

      const { error: orderItemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (orderItemsError) throw orderItemsError;

      return { orderId: order.id, customerId };
    }
  });
}
