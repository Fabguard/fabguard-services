
import { useServices } from "@/hooks/useServices";
import { useMembershipsData } from "@/hooks/useMembershipsData";
import { useCartManagement } from "@/hooks/useCartManagement";
import MainContent from "@/components/MainContent";
import CartCheckoutModals from "@/components/CartCheckoutModals";
import LoadingSpinner from "@/components/LoadingSpinner";

const Index = () => {
  const { data: services = [], isLoading } = useServices();
  const { data: memberships = [] } = useMembershipsData();
  
  const {
    cartItems,
    showCart,
    setShowCart,
    showCheckout,
    setShowCheckout,
    addToCart,
    updateQuantity,
    updateSelectedItems,
    getTotalPrice,
    getTotalItems,
    handlePlaceOrder
  } = useCartManagement();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <MainContent
        services={services}
        memberships={memberships}
        cartItemsCount={getTotalItems()}
        onCartClick={() => setShowCart(true)}
        onAddToCart={(service) => addToCart(service.id)}
      />

      <CartCheckoutModals
        showCart={showCart}
        showCheckout={showCheckout}
        cartItems={cartItems}
        total={getTotalPrice()}
        onCartClose={() => setShowCart(false)}
        onCheckoutClose={() => setShowCheckout(false)}
        onUpdateQuantity={updateQuantity}
        onUpdateSelectedItems={updateSelectedItems}
        onCheckout={() => {
          setShowCart(false);
          setShowCheckout(true);
        }}
        onPlaceOrder={handlePlaceOrder}
      />
    </>
  );
};

export default Index;
