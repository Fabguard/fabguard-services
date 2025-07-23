
import { useState, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, Package } from "lucide-react";
import { CartItemWithItems, SelectedServiceItem } from "@/types/types";
import { useServiceItems } from "@/hooks/useServiceItems";

interface ServiceItemsSelectionProps {
  cartItems: CartItemWithItems[];
  onItemsUpdate: (serviceId: number, selectedItems: SelectedServiceItem[]) => void;
}

// Individual service item component to handle hooks properly
const ServiceItemCard = ({ 
  cartItem, 
  isExpanded, 
  onToggle, 
  onItemsUpdate 
}: {
  cartItem: CartItemWithItems;
  isExpanded: boolean;
  onToggle: () => void;
  onItemsUpdate: (serviceId: number, selectedItems: SelectedServiceItem[]) => void;
}) => {
  const { data: serviceItems = [], isLoading } = useServiceItems(cartItem.service.id);
  const availableItems = serviceItems.map(item => item.item_name);
  const selectedItems = cartItem.selectedItems || [];
  const selectedCount = selectedItems.filter(item => item.selected).length;

  const handleItemToggle = (itemName: string, checked: boolean) => {
    console.log('Toggle item:', { serviceId: cartItem.service.id, itemName, checked });

    const currentItems = selectedItems;
    
    // Check if item already exists in the list
    const existingItemIndex = currentItems.findIndex(item => item.name === itemName);
    
    let updatedItems: SelectedServiceItem[];
    if (existingItemIndex >= 0) {
      // Update existing item
      updatedItems = currentItems.map((item, index) => 
        index === existingItemIndex ? { ...item, selected: checked } : item
      );
    } else {
      // Add new item
      updatedItems = [...currentItems, { name: itemName, selected: checked }];
    }

    console.log('Updated items:', updatedItems);
    onItemsUpdate(cartItem.service.id, updatedItems);
  };

  const initializeItems = () => {
    if (selectedItems.length > 0) return;

    const initialItems: SelectedServiceItem[] = availableItems.map(item => ({
      name: item,
      selected: false
    }));

    onItemsUpdate(cartItem.service.id, initialItems);
  };

  return (
    <Card className="border-l-4 border-l-blue-500 transition-all duration-200 hover:shadow-md">
      <CardHeader 
        className="cursor-pointer hover:bg-gray-50 transition-colors p-3 sm:p-4 md:p-6"
        onClick={() => {
          if (!selectedItems.length && availableItems.length > 0) {
            initializeItems();
          }
          onToggle();
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <img
              src={cartItem.service.image}
              alt={cartItem.service.name}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-cover rounded flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <CardTitle className="text-sm sm:text-base md:text-lg truncate flex items-center gap-2">
                <Package className="h-4 w-4 text-blue-600 flex-shrink-0" />
                {cartItem.service.name}
              </CardTitle>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Visit Charges: ₹{cartItem.service.price}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            {selectedCount > 0 && (
              <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs px-2 py-1">
                {selectedCount} selected
              </Badge>
            )}
            <div className="p-1">
              {isExpanded ? 
                <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" /> : 
                <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
              }
            </div>
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-0 p-3 sm:p-4 md:p-6 md:pt-0 bg-gray-50/50">
          {isLoading ? (
            <div className="text-center py-6 sm:py-8">
              <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">Loading service items...</p>
            </div>
          ) : availableItems.length > 0 ? (
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-blue-50 p-2 sm:p-3 rounded-lg border border-blue-200">
                <p className="text-xs sm:text-sm text-blue-800 font-medium mb-2 flex items-center">
                  <span className="mr-1">✨</span>
                  Available Items for {cartItem.service.name}
                </p>
                <p className="text-xs text-blue-700">
                  Select the items you need. Our professional will bring the necessary equipment and materials.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 max-h-48 sm:max-h-64 lg:max-h-80 overflow-y-auto p-1">
                {availableItems.map(itemName => {
                  const selectedItem = selectedItems.find(item => item.name === itemName);
                  const isSelected = selectedItem?.selected || false;

                  return (
                    <div 
                      key={itemName} 
                      className={`flex items-start space-x-2 p-2 sm:p-3 rounded-lg border transition-all duration-200 ${
                        isSelected 
                          ? 'bg-green-50 border-green-200 shadow-sm' 
                          : 'bg-white border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <Checkbox
                        id={`${cartItem.service.id}-${itemName}`}
                        checked={isSelected}
                        onCheckedChange={(checked) => {
                          console.log('Checkbox change:', { itemName, checked });
                          handleItemToggle(itemName, checked as boolean);
                        }}
                        className="mt-0.5 flex-shrink-0"
                      />
                      <label
                        htmlFor={`${cartItem.service.id}-${itemName}`}
                        className="text-xs sm:text-sm font-medium leading-tight cursor-pointer flex-1 break-words"
                        onClick={(e) => {
                          e.preventDefault();
                          console.log('Label click:', { itemName, currentState: isSelected });
                          handleItemToggle(itemName, !isSelected);
                        }}
                      >
                        {itemName}
                      </label>
                    </div>
                  );
                })}
              </div>
              
              <div className="bg-amber-50 p-2 sm:p-3 rounded-lg border border-amber-200">
                <p className="text-xs sm:text-sm text-amber-800">
                  <strong>💡 Note:</strong> Final charges will be determined after inspection. 
                  Visit charges (₹{cartItem.service.price}) are consultation fees and may be waived upon service confirmation.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 sm:py-8">
              <div className="mb-3">
                <Package className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400 mx-auto" />
              </div>
              <p className="text-sm text-gray-500 mb-3">No specific items available for this service.</p>
              <div className="bg-blue-50 p-2 sm:p-3 rounded-lg border border-blue-200">
                <p className="text-xs sm:text-sm text-blue-800">
                  <strong>✅ No worries!</strong> Our professional will discuss specific requirements during the visit 
                  and bring all necessary tools and materials.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};

const ServiceItemsSelection = ({ cartItems, onItemsUpdate }: ServiceItemsSelectionProps) => {
  const [expandedServices, setExpandedServices] = useState<number[]>([]);

  const toggleServiceExpansion = (serviceId: number) => {
    setExpandedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  return (
    <div className="space-y-3">
      {cartItems.map(cartItem => (
        <ServiceItemCard
          key={cartItem.service.id}
          cartItem={cartItem}
          isExpanded={expandedServices.includes(cartItem.service.id)}
          onToggle={() => toggleServiceExpansion(cartItem.service.id)}
          onItemsUpdate={onItemsUpdate}
        />
      ))}
    </div>
  );
};

export default ServiceItemsSelection;
