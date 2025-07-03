
import { X, Plus, Minus, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { CartItemWithItems } from "@/types/types";
import { useServiceItems } from "@/hooks/useServiceItems";
import { useState } from "react";

interface CartProps {
  items: CartItemWithItems[];
  onUpdateQuantity: (serviceId: number, quantity: number) => void;
  onUpdateSelectedItems: (serviceId: number, selectedItems: { name: string; selected: boolean }[]) => void;
  onClose: () => void;
  onCheckout: () => void;
  total: number;
}

const Cart = ({ items, onUpdateQuantity, onUpdateSelectedItems, onClose, onCheckout, total }: CartProps) => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleItemExpansion = (serviceId: number) => {
    setExpandedItems(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleItemToggle = (serviceId: number, itemName: string, checked: boolean) => {
    const cartItem = items.find(item => item.service.id === serviceId);
    if (!cartItem) return;

    const currentItems = cartItem.selectedItems || [];
    const existingItemIndex = currentItems.findIndex(item => item.name === itemName);
    
    let updatedItems;
    if (existingItemIndex >= 0) {
      updatedItems = currentItems.map((item, index) => 
        index === existingItemIndex ? { ...item, selected: checked } : item
      );
    } else {
      updatedItems = [...currentItems, { name: itemName, selected: checked }];
    }

    onUpdateSelectedItems(serviceId, updatedItems);
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
      <Card className="w-full max-w-4xl max-h-[90vh] sm:max-h-[80vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-white z-10 p-4 sm:p-6">
          <CardTitle className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent text-lg sm:text-xl">
            Shopping Cart ({items.length} items)
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
          {/* Service Item Selection Info */}
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-4 rounded-lg border border-blue-200 mb-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">✨ Select Your Service Items</h3>
            <p className="text-sm text-blue-700">
              Choose specific items you need for each service below. This is optional - our professionals will discuss all requirements during their visit and provide final pricing after inspection.
            </p>
          </div>

          {items.map(item => {
            const { data: serviceItems = [], isLoading } = useServiceItems(item.service.id);
            const isExpanded = expandedItems.includes(item.service.id);
            const selectedItems = item.selectedItems || [];
            const selectedCount = selectedItems.filter(si => si.selected).length;

            return (
              <div key={item.service.id} className="border-2 border-gray-200 rounded-xl overflow-hidden hover:border-blue-300 transition-colors">
                <div className="flex items-center space-x-3 sm:space-x-4 p-4 sm:p-5 bg-gray-50">
                  <img
                    src={item.service.image}
                    alt={item.service.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0 shadow-md"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-base sm:text-lg truncate text-gray-800">{item.service.name}</h4>
                    <p className="text-gray-600 text-sm sm:text-base">₹{item.service.price} visit charges</p>
                    {selectedCount > 0 && (
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                          {selectedCount} items selected
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onUpdateQuantity(item.service.id, item.quantity - 1)}
                      className="border-blue-600 text-blue-600 hover:bg-blue-50 h-9 w-9 p-0"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium text-base">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onUpdateQuantity(item.service.id, item.quantity + 1)}
                      className="border-blue-600 text-blue-600 hover:bg-blue-50 h-9 w-9 p-0"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-right flex-shrink-0 flex items-center gap-3">
                    <p className="font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent text-lg">
                      ₹{item.service.price * item.quantity}
                    </p>
                    {serviceItems.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleItemExpansion(item.service.id)}
                        className="h-10 w-10 p-0 bg-blue-100 hover:bg-blue-200"
                      >
                        {isExpanded ? <ChevronUp className="h-5 w-5 text-blue-600" /> : <ChevronDown className="h-5 w-5 text-blue-600" />}
                      </Button>
                    )}
                  </div>
                </div>

                {/* Service Items Expansion */}
                {isExpanded && (
                  <div className="border-t bg-white p-4 sm:p-6">
                    {isLoading ? (
                      <div className="text-center py-6">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="text-sm text-gray-500 mt-3">Loading available items...</p>
                      </div>
                    ) : serviceItems.length > 0 ? (
                      <div>
                        <h5 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                          <span className="bg-blue-100 p-2 rounded-full mr-3">🔧</span>
                          Available Service Items
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-64 overflow-y-auto">
                          {serviceItems.map(serviceItem => {
                            const isSelected = selectedItems.some(si => si.name === serviceItem.item_name && si.selected);
                            return (
                              <div
                                key={serviceItem.id}
                                className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-all cursor-pointer hover:shadow-md ${
                                  isSelected 
                                    ? 'bg-green-50 border-green-300 shadow-sm' 
                                    : 'bg-gray-50 border-gray-200 hover:bg-blue-50 hover:border-blue-300'
                                }`}
                                onClick={() => handleItemToggle(item.service.id, serviceItem.item_name, !isSelected)}
                              >
                                <Checkbox
                                  id={`${item.service.id}-${serviceItem.item_name}`}
                                  checked={isSelected}
                                  onCheckedChange={(checked) => 
                                    handleItemToggle(item.service.id, serviceItem.item_name, checked as boolean)
                                  }
                                  className="flex-shrink-0"
                                />
                                <label
                                  htmlFor={`${item.service.id}-${serviceItem.item_name}`}
                                  className="text-sm font-medium leading-none cursor-pointer flex-1"
                                >
                                  {serviceItem.item_name}
                                </label>
                                {isSelected && <span className="text-green-600 text-lg">✓</span>}
                              </div>
                            );
                          })}
                        </div>
                        <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                          <p className="text-sm text-amber-800 flex items-start">
                            <span className="text-lg mr-2">💡</span>
                            <span>
                              <strong>Note:</strong> Final charges will be determined after our professional inspects your requirements. 
                              Visit charges are consultation fees that may be waived based on the service agreement.
                            </span>
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <div className="bg-blue-50 p-6 rounded-lg">
                          <span className="text-4xl mb-4 block">🔧</span>
                          <p className="text-base text-gray-600 mb-2">No specific items available for this service.</p>
                          <p className="text-sm text-blue-700">
                            Our professional will discuss all requirements during the visit.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
          
          <div className="border-t-2 pt-6 mt-6">
            <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-4 rounded-lg mb-4 border border-blue-200">
              <p className="text-sm text-blue-800 flex items-start">
                <span className="text-lg mr-2">💡</span>
                <span>
                  <strong>Next Step:</strong> You can select specific service items above (optional). 
                  Our professional will finalize all requirements and provide accurate pricing during the inspection visit.
                </span>
              </p>
            </div>
            <div className="flex justify-between items-center text-xl font-bold mb-4 p-4 bg-gray-50 rounded-lg">
              <span>Visit Charges Total:</span>
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
