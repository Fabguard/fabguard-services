
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { OrderDetails, CartItemWithItems, SelectedServiceItem } from "@/types/types";
import CheckoutForm from "./checkout/CheckoutForm";
import ServiceItemsSelection from "./checkout/ServiceItemsSelection";

interface CheckoutProps {
  total: number;
  cartItems: CartItemWithItems[];
  onUpdateSelectedItems: (serviceId: number, selectedItems: SelectedServiceItem[]) => void;
  onClose: () => void;
  onPlaceOrder: (orderDetails: OrderDetails) => void;
}

const Checkout = ({ total, cartItems, onUpdateSelectedItems, onClose, onPlaceOrder }: CheckoutProps) => {
  const [currentStep, setCurrentStep] = useState<'items' | 'details'>('items');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    couponCode: "",
    note: ""
  });
  const [discount, setDiscount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const { toast } = useToast();

  const finalTotal = total - discount;

  const handleContinueToDetails = () => {
    setCurrentStep('details');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (!agreeToTerms) {
      toast({
        title: "Terms and Conditions",
        description: "Please agree to the Terms and Conditions to proceed",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      console.log('Submitting order from checkout...');
      const orderDetails: OrderDetails = {
        ...formData,
        discount,
        finalTotal,
        customerNote: formData.note
      };
      
      // Call the parent's onPlaceOrder function which handles everything including cart closure
      await onPlaceOrder(orderDetails);
      
      console.log('Order submitted successfully');
      
    } catch (error) {
      console.error("Error placing order:", error);
      toast({
        title: "Order Failed",
        description: "There was an issue placing your order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <Card className="w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-white z-10 border-b p-4 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-4">
            <CardTitle className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent text-lg sm:text-xl">
              {currentStep === 'items' ? 'Select Service Items' : 'Order Details'}
            </CardTitle>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${
                currentStep === 'items' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'
              }`}>
                1
              </div>
              <div className="w-4 h-1 sm:w-8 bg-gray-300"></div>
              <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${
                currentStep === 'details' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                2
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          {currentStep === 'items' ? (
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-lg border">
                <h3 className="text-base sm:text-lg font-semibold text-blue-800 mb-2">
                  Service Item Selection (Optional)
                </h3>
                <p className="text-xs sm:text-sm text-blue-600">
                  You can optionally select specific items you need. Our service professional will finalize the list during inspection and provide accurate pricing.
                </p>
              </div>
              <ServiceItemsSelection
                cartItems={cartItems}
                onItemsUpdate={onUpdateSelectedItems}
              />
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t">
                <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
                  Back to Cart
                </Button>
                <Button 
                  onClick={handleContinueToDetails}
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600"
                >
                  Continue to Order Details
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex justify-start">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep('items')}
                  className="mb-4"
                >
                  ← Back to Service Selection
                </Button>
              </div>
              <CheckoutForm
                formData={formData}
                onFormDataChange={setFormData}
                discount={discount}
                onDiscountChange={setDiscount}
                agreeToTerms={agreeToTerms}
                onAgreeToTermsChange={setAgreeToTerms}
                isLoading={isLoading}
                total={total}
                onSubmit={handleSubmit}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Checkout;
