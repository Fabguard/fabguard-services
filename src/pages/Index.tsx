
import { useServices } from "@/hooks/useServices";
import { useMembershipsData } from "@/hooks/useMembershipsData";
import { useCartManagement } from "@/hooks/useCartManagement";
import MainContent from "@/components/MainContent";
import CartCheckoutModals from "@/components/CartCheckoutModals";
import LoadingSpinner from "@/components/LoadingSpinner";

const Index = () => {
  const { data: services = [], isLoading, error, refetch } = useServices();
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

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <p className="text-foreground font-medium">Unable to load services</p>
          <p className="text-muted-foreground text-sm">Please check your internet connection and try again.</p>
          <button 
            onClick={() => refetch()} 
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Retry
          </button>
        </div>
      </div>
    );
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
