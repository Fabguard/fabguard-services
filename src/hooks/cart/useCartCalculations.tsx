
import { CartItemWithItems } from "@/types/types";

export const useCartCalculations = (cartItems: CartItemWithItems[]) => {
  const getTotalPrice = () => {
    try {
      const total = cartItems.reduce((total, item) => total + item.service.price, 0);
      console.log('Total price calculated:', total, 'for items:', cartItems.length);
      return total;
    } catch (error) {
      console.error('Error calculating total price:', error);
      return 0;
    }
  };

  const getTotalItems = () => {
    try {
      const count = cartItems.length;
      console.log('Total items count:', count);
      return count;
    } catch (error) {
      console.error('Error getting total items:', error);
      return 0;
    }
  };

  return {
    getTotalPrice,
    getTotalItems
  };
};
