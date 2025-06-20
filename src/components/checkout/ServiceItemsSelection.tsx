
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItemWithItems, SelectedServiceItem } from "@/types/types";
import { SERVICE_ITEMS } from "@/data/services";

interface ServiceItemsSelectionProps {
  cartItems: CartItemWithItems[];
  onItemsUpdate: (serviceId: number, selectedItems: SelectedServiceItem[]) => void;
}

const ServiceItemsSelection = ({ cartItems, onItemsUpdate }: ServiceItemsSelectionProps) => {
  const [expandedServices, setExpandedServices] = useState<number[]>([]);

  const toggleServiceExpansion = (serviceId: number) => {
    setExpandedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleItemToggle = (serviceId: number, itemName: string, checked: boolean) => {
    const cartItem = cartItems.find(item => item.service.id === serviceId);
    if (!cartItem) return;

    const currentItems = cartItem.selectedItems || [];
    const updatedItems = currentItems.map(item => 
      item.name === itemName ? { ...item, selected: checked } : item
    );

    onItemsUpdate(serviceId, updatedItems);
  };

  const initializeItems = (serviceId: number, category: string) => {
    const cartItem = cartItems.find(item => item.service.id === serviceId);
    if (cartItem?.selectedItems) return;

    const availableItems = SERVICE_ITEMS[category] || [];
    const initialItems: SelectedServiceItem[] = availableItems.map(item => ({
      name: item,
      selected: false
    }));

    onItemsUpdate(serviceId, initialItems);
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {cartItems.map(cartItem => {
        const isExpanded = expandedServices.includes(cartItem.service.id);
        const availableItems = SERVICE_ITEMS[cartItem.service.category] || [];
        const selectedItems = cartItem.selectedItems || [];
        const selectedCount = selectedItems.filter(item => item.selected).length;

        return (
          <Card key={cartItem.service.id} className="border-l-4 border-l-blue-500">
            <CardHeader 
              className="cursor-pointer hover:bg-gray-50 transition-colors p-3 sm:p-6"
              onClick={() => {
                if (!cartItem.selectedItems) {
                  initializeItems(cartItem.service.id, cartItem.service.category);
                }
                toggleServiceExpansion(cartItem.service.id);
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                  <img
                    src={cartItem.service.image}
                    alt={cartItem.service.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-base sm:text-lg truncate">{cartItem.service.name}</CardTitle>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Qty: {cartItem.quantity} | Visit Charges: ₹{cartItem.service.price * cartItem.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                  {selectedCount > 0 && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                      {selectedCount}
                    </Badge>
                  )}
                  {isExpanded ? <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5" /> : <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />}
                </div>
              </div>
            </CardHeader>

            {isExpanded && (
              <CardContent className="pt-0 p-3 sm:p-6 sm:pt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 max-h-48 sm:max-h-60 overflow-y-auto">
                  {availableItems.map(itemName => {
                    const selectedItem = selectedItems.find(item => item.name === itemName);
                    const isSelected = selectedItem?.selected || false;

                    return (
                      <div key={itemName} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded text-sm">
                        <Checkbox
                          id={`${cartItem.service.id}-${itemName}`}
                          checked={isSelected}
                          onCheckedChange={(checked) => 
                            handleItemToggle(cartItem.service.id, itemName, checked as boolean)
                          }
                          className="flex-shrink-0"
                        />
                        <label
                          htmlFor={`${cartItem.service.id}-${itemName}`}
                          className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1 break-words"
                        >
                          {itemName}
                        </label>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-3 sm:mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-xs sm:text-sm text-amber-800">
                    <strong>Note:</strong> Final charges will be determined after inspection. 
                    Visit charges (₹{cartItem.service.price}) are consultation fees.
                  </p>
                </div>
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
};

export default ServiceItemsSelection;
