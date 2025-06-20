
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { OrderDetails, CartItemWithItems, SelectedServiceItem } from "@/types/types";
import { useOrderNotification } from "@/hooks/useOrderNotification";
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
  const { sendOrderNotification } = useOrderNotification();

  const finalTotal = total - discount;

  const hasSelectedItems = () => {
    return cartItems.every(item => 
      item.selectedItems && item.selectedItems.some(si => si.selected)
    );
  };

  const handleContinueToDetails = () => {
    if (!hasSelectedItems()) {
      toast({
        title: "Please select service items",
        description: "You need to select at least one item from each service category to proceed.",
        variant: "destructive"
      });
      return;
    }
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
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const orderId = `FG-${Date.now()}`;
    const orderDetails: OrderDetails = {
      ...formData,
      discount,
      finalTotal
    };
    
    try {
      // Send WhatsApp notification to admin
      await sendOrderNotification({
        customerName: formData.name,
        customerPhone: formData.phone,
        customerEmail: formData.email,
        customerAddress: formData.address,
        orderItems: [], // This will be populated from cart items in the parent component
        totalAmount: total,
        finalAmount: finalTotal,
        discount: discount,
        couponCode: formData.couponCode || undefined,
        customerNote: formData.note || undefined,
        orderId: orderId
      });

      onPlaceOrder(orderDetails);
      
      toast({
        title: "Order Placed Successfully!",
        description: "Our team will contact you soon to schedule the service. You'll only be charged for the actual services performed after inspection.",
      });
    } catch (error) {
      console.error("Error sending notification:", error);
      toast({
        title: "Order Placed",
        description: "Your order has been received, but there was an issue sending the notification. We'll still contact you soon.",
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-white z-10 border-b">
          <div className="flex items-center gap-4">
            <CardTitle className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              {currentStep === 'items' ? 'Select Service Items' : 'Order Details'}
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep === 'items' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'
              }`}>
                1
              </div>
              <div className="w-8 h-1 bg-gray-300"></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
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
        <CardContent className="p-6">
          {currentStep === 'items' ? (
            <div className="space-y-6">
              <ServiceItemsSelection
                cartItems={cartItems}
                onItemsUpdate={onUpdateSelectedItems}
              />
              <div className="flex justify-between items-center pt-4 border-t">
                <Button variant="outline" onClick={onClose}>
                  Back to Cart
                </Button>
                <Button 
                  onClick={handleContinueToDetails}
                  className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600"
                >
                  Continue to Order Details
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
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
