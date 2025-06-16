import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { OrderDetails } from "@/types/types";
import { Link } from "react-router-dom";

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
    couponCode: ""
  });
  const [discount, setDiscount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const { toast } = useToast();

  const applyCoupon = () => {
    const validCoupons = {
      "SAVE10": 10,
      "WELCOME20": 20,
      "NEWUSER15": 15
    };
    
    const couponDiscount = validCoupons[formData.couponCode as keyof typeof validCoupons];
    if (couponDiscount) {
      setDiscount(couponDiscount);
      toast({
        title: "Coupon Applied!",
        description: `You saved ₹${couponDiscount}`,
      });
    } else {
      toast({
        title: "Invalid Coupon",
        description: "Please enter a valid coupon code",
        variant: "destructive"
      });
    }
  };

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
    
    const orderDetails: OrderDetails = {
      ...formData,
      discount,
      finalTotal
    };
    
    onPlaceOrder(orderDetails);
    
    toast({
      title: "Order Placed Successfully!",
      description: "Our team will contact you soon to schedule the service.",
    });
    
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                  required
                  className="focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email"
                  required
                  className="focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="Enter your phone number"
                required
                className="focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <Label htmlFor="address">Complete Address *</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                placeholder="Enter your complete address including city and pincode"
                rows={3}
                required
                className="focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-teal-50">
              <h3 className="font-medium mb-3 text-gray-800">Have a Coupon Code?</h3>
              <div className="flex space-x-2">
                <Input
                  value={formData.couponCode}
                  onChange={(e) => setFormData(prev => ({ ...prev, couponCode: e.target.value }))}
                  placeholder="Enter coupon code"
                  className="focus:ring-blue-500 focus:border-blue-500"
                />
                <Button 
                  type="button" 
                  onClick={applyCoupon} 
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Apply
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Try: SAVE10, WELCOME20, or NEWUSER15
              </p>
            </div>
            
            <div className="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-teal-50">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={agreeToTerms}
                  onCheckedChange={setAgreeToTerms}
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor="terms" className="text-sm font-medium cursor-pointer">
                    I agree to the{" "}
                    <Link 
                      to="/terms-and-conditions" 
                      target="_blank"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Terms and Conditions
                    </Link>
                    {" "}*
                  </Label>
                  <p className="text-xs text-gray-500 mt-1">
                    Please read and accept our terms before placing your order
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4">
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
            
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white text-lg py-3"
              disabled={isLoading || !agreeToTerms}
            >
              {isLoading ? "Placing Order..." : "Place Order (Cash on Delivery)"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Checkout;
