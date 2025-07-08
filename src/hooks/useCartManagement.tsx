
import { useCartState } from "@/hooks/cart/useCartState";
import { useCartOperations } from "@/hooks/cart/useCartOperations";
import { useCartCalculations } from "@/hooks/cart/useCartCalculations";
import { useOrderPlacement } from "@/hooks/cart/useOrderPlacement";

export const useCartManagement = () => {
  const {
    cartItems,
    setCartItems,
    showCart,
    setShowCart,
    showCheckout,
    setShowCheckout
  } = useCartState();

  const {
    addToCart,
    removeFromCart,
    updateQuantity,
    updateSelectedItems
  } = useCartOperations(cartItems, setCartItems);

  const {
    getTotalPrice,
    getTotalItems
  } = useCartCalculations(cartItems);

  const {
    handlePlaceOrder
  } = useOrderPlacement(
    cartItems,
    setCartItems,
    setShowCheckout,
    setShowCart,
    getTotalPrice
  );

  return {
    cartItems,
    showCart,
    setShowCart,
    showCheckout,
    setShowCheckout,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateSelectedItems,
    getTotalPrice,
    getTotalItems,
    handlePlaceOrder
  };
};
