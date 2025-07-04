
import Cart from "@/components/Cart";
import Checkout from "@/components/Checkout";
import { CartItemWithItems, OrderDetails, SelectedServiceItem } from "@/types/types";

interface CartCheckoutModalsProps {
  showCart: boolean;
  showCheckout: boolean;
  cartItems: CartItemWithItems[];
  total: number;
  onCartClose: () => void;
  onCheckoutClose: () => void;
  onUpdateQuantity: (serviceId: number, quantity: number) => void;
  onUpdateSelectedItems: (serviceId: number, selectedItems: SelectedServiceItem[]) => void;
  onCheckout: () => void;
  onPlaceOrder: (orderDetails: OrderDetails) => void;
}

const CartCheckoutModals = ({
  showCart,
  showCheckout,
  cartItems,
  total,
  onCartClose,
  onCheckoutClose,
  onUpdateQuantity,
  onUpdateSelectedItems,
  onCheckout,
  onPlaceOrder
}: CartCheckoutModalsProps) => {
  return (
    <>
      {showCart && (
        <Cart
          items={cartItems}
          onClose={onCartClose}
          onUpdateQuantity={onUpdateQuantity}
          onUpdateSelectedItems={onUpdateSelectedItems}
          onCheckout={onCheckout}
          total={total}
        />
      )}

      {showCheckout && (
        <Checkout
          total={total}
          cartItems={cartItems}
          onUpdateSelectedItems={onUpdateSelectedItems}
          onClose={onCheckoutClose}
          onPlaceOrder={onPlaceOrder}
        />
      )}
    </>
  );
};

export default CartCheckoutModals;
