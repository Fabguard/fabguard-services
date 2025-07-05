
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CartItemWithItems } from "@/types/types";
import ServiceItemsSelection from "@/components/checkout/ServiceItemsSelection";

interface CartProps {
  items: CartItemWithItems[];
  onUpdateQuantity: (serviceId: number, quantity: number) => void;
  onUpdateSelectedItems: (serviceId: number, selectedItems: { name: string; selected: boolean }[]) => void;
  onClose: () => void;
  onCheckout: () => void;
  total: number;
}

const Cart = ({ items, onUpdateQuantity, onUpdateSelectedItems, onClose, onCheckout, total }: CartProps) => {
  console.log('Cart rendered with items:', items);

  const handleRemoveService = (serviceId: number) => {
    console.log('Removing service from cart UI:', serviceId);
    try {
      onUpdateQuantity(serviceId, 0);
    } catch (error) {
      console.error('Error in handleRemoveService:', error);
    }
  };

  if (items.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              Shopping Cart
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="text-center py-8">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Button 
              onClick={onClose}
              className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600"
            >
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <Card className="w-full max-w-7xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-white z-10 p-3 sm:p-6 border-b flex-shrink-0">
          <CardTitle className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent text-base sm:text-lg md:text-xl">
            Shopping Cart ({items.length} services)
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-y-auto p-3 sm:p-6">
          <div className="space-y-4 sm:space-y-6">
            {/* Cart Items Summary */}
            <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-3 sm:p-4 rounded-lg border border-blue-200">
              <h3 className="text-base sm:text-lg font-semibold text-blue-800 mb-3">📋 Your Selected Services</h3>
              <div className="grid gap-2 sm:gap-3">
                {items.map(item => (
                  <div key={item.service.id} className="flex items-center justify-between bg-white p-2 sm:p-3 rounded-lg shadow-sm">
                    <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                      <img
                        src={item.service.image}
                        alt={item.service.name}
                        className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-800 text-sm sm:text-base truncate">{item.service.name}</h4>
                        <p className="text-xs sm:text-sm text-gray-600">Visit Charges: ₹{item.service.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveService(item.service.id)}
                        className="h-6 w-6 sm:h-8 sm:w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                        title="Remove service"
                      >
                        <X className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                      <div className="ml-2 font-bold text-blue-600 text-sm sm:text-base">
                        ₹{item.service.price}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Items Selection */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3 sm:p-4 rounded-lg border border-green-200">
              <h3 className="text-base sm:text-lg font-semibold text-green-800 mb-2 flex items-center flex-wrap">
                <span className="mr-2">🔧</span>
                <span className="break-words">Select Service Items (Optional)</span>
              </h3>
              <p className="text-xs sm:text-sm text-green-700 mb-4 leading-relaxed">
                Choose specific items you need for each service. This helps our professionals prepare better. 
                If you don't select any items, our experts will discuss all requirements during their visit.
              </p>
              <ServiceItemsSelection 
                cartItems={items} 
                onItemsUpdate={onUpdateSelectedItems} 
              />
            </div>

            {/* Checkout Section */}
            <div className="border-t pt-4 sm:pt-6 space-y-4">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-3 sm:p-4 rounded-lg border border-amber-200">
                <p className="text-xs sm:text-sm text-amber-800 flex items-start leading-relaxed">
                  <span className="text-base sm:text-lg mr-2 flex-shrink-0">💡</span>
                  <span>
                    <strong>Important:</strong> These are visit charges for consultation. 
                    Final service charges will be determined after inspection. 
                    Once you agree to proceed with the service, visit charges may be waived.
                  </span>
                </p>
              </div>
              
              <div className="flex justify-between items-center text-lg sm:text-xl font-bold p-3 sm:p-4 bg-gray-50 rounded-lg">
                <span className="text-sm sm:text-base md:text-lg">Total Visit Charges:</span>
                <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent text-xl sm:text-2xl">
                  ₹{total}
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <Button 
                  variant="outline" 
                  onClick={onClose} 
                  className="flex-1 h-10 sm:h-12 text-sm sm:text-base"
                >
                  Continue Shopping
                </Button>
                <Button 
                  onClick={onCheckout} 
                  className="flex-1 h-10 sm:h-12 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600"
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cart;
