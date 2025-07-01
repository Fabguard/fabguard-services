
import { useState } from "react";
import { Plus, Minus, ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useServices } from "@/hooks/useServices";
import { useCreateOrder } from "@/hooks/useCreateOrder";
import { useOrderNotification } from "@/hooks/useOrderNotification";
import { useMemberships } from "@/hooks/useMemberships";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Membership from "@/components/Membership";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import PartnerSection from "@/components/PartnerSection";
import TeamSection from "@/components/TeamSection";
import Cart from "@/components/Cart";
import Checkout from "@/components/Checkout";
import WhatsappFab from "@/components/WhatsappFab";
import { CartItem, CartItemWithItems, OrderDetails, SelectedServiceItem } from "@/types/types";

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItemWithItems[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const { toast } = useToast();
  const { data: services = [], isLoading } = useServices();
  const { data: memberships = [] } = useMemberships();
  const createOrderMutation = useCreateOrder();
  const { sendOrderNotification } = useOrderNotification();

  const addToCart = (serviceId: number) => {
    const service = services.find(s => s.id === serviceId);
    if (!service) return;

    const existingItem = cartItems.find(item => item.service.id === serviceId);
    
    if (existingItem) {
      setCartItems(items => 
        items.map(item => 
          item.service.id === serviceId 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      const newItem: CartItemWithItems = {
        service: {
          id: service.id,
          name: service.name,
          price: service.price,
          image: service.image,
          description: service.description,
          category: service.category
        },
        quantity: 1,
        selectedItems: []
      };
      setCartItems(items => [...items, newItem]);
    }
    
    toast({
      title: "Added to Cart",
      description: `${service.name} has been added to your cart.`,
    });
  };

  const removeFromCart = (serviceId: number) => {
    setCartItems(items => items.filter(item => item.service.id !== serviceId));
    toast({
      title: "Removed from Cart",
      description: "Service has been removed from your cart.",
    });
  };

  const updateQuantity = (serviceId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(serviceId);
      return;
    }
    
    setCartItems(items => 
      items.map(item => 
        item.service.id === serviceId 
          ? { ...item, quantity }
          : item
      )
    );
  };

  const updateSelectedItems = (serviceId: number, selectedItems: SelectedServiceItem[]) => {
    setCartItems(items => 
      items.map(item => 
        item.service.id === serviceId 
          ? { ...item, selectedItems }
          : item
      )
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.service.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handlePlaceOrder = async (orderDetails: OrderDetails) => {
    try {
      const orderId = `ORDER-${Date.now()}`;
      
      await createOrderMutation.mutateAsync({
        orderDetails,
        cartItems,
        orderId
      });

      // Send WhatsApp notification
      try {
        await sendOrderNotification({
          customerName: orderDetails.name,
          customerPhone: orderDetails.phone,
          customerEmail: orderDetails.email,
          customerAddress: orderDetails.address,
          services: cartItems.map(item => ({
            name: item.service.name,
            quantity: item.quantity,
            price: item.service.price
          })),
          totalAmount: orderDetails.finalTotal,
          orderNote: orderDetails.customerNote || ''
        });
      } catch (notificationError) {
        console.error('Notification error (non-blocking):', notificationError);
      }

      // Clear cart and close modals
      setCartItems([]);
      setShowCheckout(false);
      setShowCart(false);
      
    } catch (error) {
      console.error('Error placing order:', error);
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItemsCount={getTotalItems()} onCartClick={() => setShowCart(true)} />
      <Hero />
      
      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional home services at your doorstep. Quality guaranteed, affordable pricing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const cartItem = cartItems.find(item => item.service.id === service.id);
              const quantity = cartItem?.quantity || 0;
              
              return (
                <Card key={service.id} className="group hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 relative">
                      <img
                        src={service.image || '/placeholder.svg'}
                        alt={service.name}
                        className="w-24 h-24 object-cover rounded-lg mx-auto"
                      />
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      {service.name}
                    </CardTitle>
                    <CardDescription className="text-gray-600 mt-2">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-2xl font-bold text-blue-600">₹{service.price}</span>
                      <Badge variant="secondary" className="text-xs">Visit Charges</Badge>
                    </div>
                    
                    {quantity > 0 ? (
                      <div className="flex items-center justify-center space-x-3">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(service.id, quantity - 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-semibold text-lg min-w-[2rem] text-center">{quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(service.id, quantity + 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => addToCart(service.id)}
                        className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600"
                      >
                        Add to Cart
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <Services services={services} onAddToCart={(service) => addToCart(service.id)} />
      <Membership memberships={memberships} />
      <Testimonials />
      <ContactForm />
      <PartnerSection />
      <TeamSection />

      {/* Cart Button */}
      {cartItems.length > 0 && (
        <Button
          onClick={() => setShowCart(true)}
          className="fixed bottom-6 left-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg z-40"
        >
          <ShoppingCart className="h-6 w-6 mr-2" />
          <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs ml-1">
            {getTotalItems()}
          </span>
        </Button>
      )}

      <WhatsappFab />

      {showCart && (
        <Cart
          items={cartItems}
          onClose={() => setShowCart(false)}
          onUpdateQuantity={updateQuantity}
          onCheckout={() => {
            setShowCart(false);
            setShowCheckout(true);
          }}
          total={getTotalPrice()}
        />
      )}

      {showCheckout && (
        <Checkout
          total={getTotalPrice()}
          cartItems={cartItems}
          onUpdateSelectedItems={updateSelectedItems}
          onClose={() => setShowCheckout(false)}
          onPlaceOrder={handlePlaceOrder}
        />
      )}
    </div>
  );
};

export default Index;
