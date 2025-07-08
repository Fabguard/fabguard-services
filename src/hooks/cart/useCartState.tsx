
import { useState } from "react";
import { CartItemWithItems } from "@/types/types";

export const useCartState = () => {
  const [cartItems, setCartItems] = useState<CartItemWithItems[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  return {
    cartItems,
    setCartItems,
    showCart,
    setShowCart,
    showCheckout,
    setShowCheckout
  };
};
