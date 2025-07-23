
import { CartItemWithItems } from "@/types/types";

interface OrderSummaryProps {
  total: number;
  discount: number;
  cartItems?: CartItemWithItems[];
}

const OrderSummary = ({ total, discount, cartItems }: OrderSummaryProps) => {
  const finalTotal = total - discount;

  return (
    <div className="border-t pt-4">
      <div className="space-y-4">
        {/* Services Summary */}
        {cartItems && cartItems.length > 0 && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">📋 Order Summary</h4>
            <div className="space-y-2">
              {cartItems.map((item, index) => (
                <div key={index} className="text-sm">
                  <div className="flex justify-between items-start">
                    <span className="font-medium">{item.service.name}</span>
                    <span>₹{item.service.price}</span>
                  </div>
                  {item.selectedItems && item.selectedItems.filter(si => si.selected).length > 0 && (
                    <div className="ml-2 mt-1">
                      <p className="text-xs text-green-600 font-medium">Selected items:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.selectedItems.filter(si => si.selected).map((selectedItem, idx) => (
                          <span key={idx} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            {selectedItem.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Payment Summary */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>₹{total}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount:</span>
              <span>-₹{discount}</span>
            </div>
          )}
          <div className="flex justify-between text-xl font-bold">
            <span>Total:</span>
            <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              ₹{finalTotal}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            💰 Payment: Cash on Delivery
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
