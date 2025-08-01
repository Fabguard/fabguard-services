
import { CartItemWithItems } from "@/types/types";

export const useCartCalculations = (cartItems: CartItemWithItems[]) => {
  const getTotalPrice = (discountPercentage: number = 0) => {
    try {
      const total = cartItems.reduce((total, item) => total + item.service.price, 0);
      const discountAmount = (total * discountPercentage) / 100;
      const finalTotal = total - discountAmount;
      console.log('Total price calculated:', total, 'discount:', discountAmount, 'final:', finalTotal);
      return finalTotal;
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
