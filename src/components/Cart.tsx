
import { X, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CartItemWithItems } from "@/types/types";

interface CartProps {
  items: CartItemWithItems[];
  onUpdateQuantity: (serviceId: number, quantity: number) => void;
  onClose: () => void;
  onCheckout: () => void;
  total: number;
}

const Cart = ({ items, onUpdateQuantity, onClose, onCheckout, total }: CartProps) => {
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
      <Card className="w-full max-w-2xl max-h-[90vh] sm:max-h-[80vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-white z-10 p-4 sm:p-6">
          <CardTitle className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent text-lg sm:text-xl">
            Shopping Cart ({items.length} items)
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
          {items.map(item => (
            <div key={item.service.id} className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 border rounded-lg">
              <img
                src={item.service.image}
                alt={item.service.name}
                className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm sm:text-base truncate">{item.service.name}</h4>
                <p className="text-gray-600 text-xs sm:text-sm">₹{item.service.price} visit charges</p>
                <p className="text-xs text-gray-500">You'll select specific items in checkout</p>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateQuantity(item.service.id, item.quantity - 1)}
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 h-8 w-8 p-0"
                >
                  <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
                <span className="w-6 sm:w-8 text-center text-sm sm:text-base">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateQuantity(item.service.id, item.quantity + 1)}
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 h-8 w-8 p-0"
                >
                  <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-medium bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent text-sm sm:text-base">
                  ₹{item.service.price * item.quantity}
                </p>
              </div>
            </div>
          ))}
          
          <div className="border-t pt-3 sm:pt-4">
            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg mb-3 sm:mb-4">
              <p className="text-xs sm:text-sm text-blue-800">
                <strong>💡 Next Step:</strong> You can optionally select specific service items. Our professional will finalize requirements during inspection.
              </p>
            </div>
            <div className="flex justify-between items-center text-lg sm:text-xl font-bold mb-3 sm:mb-4">
              <span>Visit Charges Total: </span>
              <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                ₹{total}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Continue Shopping
              </Button>
              <Button 
                onClick={onCheckout} 
                className="flex-1 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600"
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
