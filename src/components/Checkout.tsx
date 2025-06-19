import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { OrderDetails } from "@/types/types";
import { useOrderNotification } from "@/hooks/useOrderNotification";
import CheckoutForm from "./checkout/CheckoutForm";

interface CheckoutProps {
  total: number;
  onClose: () => void;
  onPlaceOrder: (orderDetails: OrderDetails) => void;
}

const Checkout = ({ total, onClose, onPlaceOrder }: CheckoutProps) => {
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
        description: "Our team will contact you soon to schedule the service. Admin has been notified via WhatsApp.",
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
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-white z-10">
          <CardTitle className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            Checkout
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Checkout;
