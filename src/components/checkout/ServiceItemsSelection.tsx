
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
    <div className="space-y-4">
      <div className="text-center p-4 bg-blue-50 rounded-lg border">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          Select Specific Services Required
        </h3>
        <p className="text-sm text-blue-600">
          Please select the specific items you need for each service category. 
          Visit charges are only for consultation - you'll only pay for the actual services performed.
        </p>
      </div>

      {cartItems.map(cartItem => {
        const isExpanded = expandedServices.includes(cartItem.service.id);
        const availableItems = SERVICE_ITEMS[cartItem.service.category] || [];
        const selectedItems = cartItem.selectedItems || [];
        const selectedCount = selectedItems.filter(item => item.selected).length;

        return (
          <Card key={cartItem.service.id} className="border-l-4 border-l-blue-500">
            <CardHeader 
              className="cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => {
                if (!cartItem.selectedItems) {
                  initializeItems(cartItem.service.id, cartItem.service.category);
                }
                toggleServiceExpansion(cartItem.service.id);
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={cartItem.service.image}
                    alt={cartItem.service.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <CardTitle className="text-lg">{cartItem.service.name}</CardTitle>
                    <p className="text-sm text-gray-600">
                      Quantity: {cartItem.quantity} | Visit Charges: ₹{cartItem.service.price * cartItem.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {selectedCount > 0 && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {selectedCount} selected
                    </Badge>
                  )}
                  {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </div>
              </div>
            </CardHeader>

            {isExpanded && (
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-60 overflow-y-auto">
                  {availableItems.map(itemName => {
                    const selectedItem = selectedItems.find(item => item.name === itemName);
                    const isSelected = selectedItem?.selected || false;

                    return (
                      <div key={itemName} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
                        <Checkbox
                          id={`${cartItem.service.id}-${itemName}`}
                          checked={isSelected}
                          onCheckedChange={(checked) => 
                            handleItemToggle(cartItem.service.id, itemName, checked as boolean)
                          }
                        />
                        <label
                          htmlFor={`${cartItem.service.id}-${itemName}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {itemName}
                        </label>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-sm text-amber-800">
                    <strong>Note:</strong> Actual charges will be determined by our service professional after inspection. 
                    Visit charges (₹{cartItem.service.price}) are consultation fees and will be adjusted against the final service cost.
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
