
import { useToast } from "@/hooks/use-toast";
import { useServices } from "@/hooks/useServices";
import { CartItemWithItems, SelectedServiceItem } from "@/types/types";

export const useCartOperations = (
  cartItems: CartItemWithItems[],
  setCartItems: React.Dispatch<React.SetStateAction<CartItemWithItems[]>>
) => {
  const { toast } = useToast();
  const { data: services = [] } = useServices();

  const addToCart = (serviceId: number) => {
    try {
      console.log('Adding service to cart:', serviceId);
      const service = services.find(s => s.id === serviceId);
      if (!service) {
        console.error('Service not found:', serviceId);
        toast({
          title: "Error",
          description: "Service not found. Please try again.",
          variant: "destructive"
        });
        return;
      }

      const existingItem = cartItems.find(item => item.service.id === serviceId);
      
      if (existingItem) {
        toast({
          title: "Service Already Added",
          description: `${service.name} is already in your cart.`,
        });
        return;
      }

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
      
      setCartItems(prevItems => {
        const newItems = [...prevItems, newItem];
        console.log('Cart items after adding:', newItems.length);
        return newItems;
      });
      
      toast({
        title: "Added to Cart",
        description: `${service.name} has been added to your cart.`,
      });
    } catch (error) {
      console.error('Error adding service to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add service to cart. Please try again.",
        variant: "destructive"
      });
    }
  };

  const removeFromCart = (serviceId: number) => {
    console.log('Removing service from cart:', serviceId);
    console.log('Current cart items before removal:', cartItems.length);
    
    try {
      setCartItems(prevItems => {
        const filteredItems = prevItems.filter(item => {
          const shouldKeep = item.service.id !== serviceId;
          console.log(`Item ${item.service.id} (${item.service.name}): ${shouldKeep ? 'keeping' : 'removing'}`);
          return shouldKeep;
        });
        
        console.log('Cart items after removal:', filteredItems.length);
        console.log('Removed items:', prevItems.length - filteredItems.length);
        
        return filteredItems;
      });
      
      toast({
        title: "Removed from Cart",
        description: "Service has been removed from your cart.",
      });
    } catch (error) {
      console.error('Error removing service from cart:', error);
      toast({
        title: "Error",
        description: "Failed to remove service from cart. Please try again.",
        variant: "destructive"
      });
    }
  };

  const updateQuantity = (serviceId: number, quantity: number) => {
    console.log('Updating quantity for service:', serviceId, 'to quantity:', quantity);
    
    if (quantity <= 0) {
      removeFromCart(serviceId);
      return;
    }
    
    try {
      setCartItems(prevItems => 
        prevItems.map(item => 
          item.service.id === serviceId 
            ? { ...item, quantity: 1 } // Keep quantity at 1 for services
            : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast({
        title: "Error",
        description: "Failed to update quantity. Please try again.",
        variant: "destructive"
      });
    }
  };

  const updateSelectedItems = (serviceId: number, selectedItems: SelectedServiceItem[]) => {
    console.log('Updating selected items for service:', serviceId, 'items:', selectedItems);
    
    try {
      setCartItems(prevItems => 
        prevItems.map(item => 
          item.service.id === serviceId 
            ? { ...item, selectedItems }
            : item
        )
      );
    } catch (error) {
      console.error('Error updating selected items:', error);
      toast({
        title: "Error",
        description: "Failed to update selected items. Please try again.",
        variant: "destructive"
      });
    }
  };

  return {
    addToCart,
    removeFromCart,
    updateQuantity,
    updateSelectedItems
  };
};
