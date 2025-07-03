
import { X, Plus, Minus } from "lucide-react";
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
      <Card className="w-full max-w-6xl max-h-[90vh] sm:max-h-[85vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-white z-10 p-4 sm:p-6 border-b">
          <CardTitle className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent text-lg sm:text-xl">
            Shopping Cart ({items.length} items)
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6 p-4 sm:p-6">
          {/* Cart Items Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-4 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">📋 Your Services</h3>
            <div className="space-y-3">
              {items.map(item => (
                <div key={item.service.id} className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
                  <div className="flex items-center space-x-3 flex-1">
                    <img
                      src={item.service.image}
                      alt={item.service.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{item.service.name}</h4>
                      <p className="text-sm text-gray-600">₹{item.service.price} × {item.quantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onUpdateQuantity(item.service.id, item.quantity - 1)}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onUpdateQuantity(item.service.id, item.quantity + 1)}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="ml-4 font-bold text-blue-600">
                    ₹{item.service.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Service Items Selection */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-2 flex items-center">
              <span className="mr-2">🔧</span>
              Select Service Items (Optional)
            </h3>
            <p className="text-sm text-green-700 mb-4">
              Choose specific items you need for each service. This helps our professionals prepare better. 
              If you don't select any items, our experts will discuss all requirements during their visit.
            </p>
            <ServiceItemsSelection 
              cartItems={items} 
              onItemsUpdate={onUpdateSelectedItems} 
            />
          </div>

          {/* Checkout Section */}
          <div className="border-t pt-6">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg mb-4 border border-amber-200">
              <p className="text-sm text-amber-800 flex items-start">
                <span className="text-lg mr-2">💡</span>
                <span>
                  <strong>Important:</strong> These are visit charges for consultation. 
                  Final service charges will be determined after inspection. 
                  Once you agree to proceed with the service, visit charges may be waived.
                </span>
              </p>
            </div>
            
            <div className="flex justify-between items-center text-xl font-bold mb-6 p-4 bg-gray-50 rounded-lg">
              <span>Total Visit Charges:</span>
              <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent text-2xl">
                ₹{total}
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <Button variant="outline" onClick={onClose} className="flex-1 h-12 text-base">
                Continue Shopping
              </Button>
              <Button 
                onClick={onCheckout} 
                className="flex-1 h-12 text-base bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600"
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cart;
