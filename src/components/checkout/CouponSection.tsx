
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface CouponSectionProps {
  couponCode: string;
  onCouponCodeChange: (code: string) => void;
  onApplyCoupon: (discount: number) => void;
}

const CouponSection = ({ couponCode, onCouponCodeChange, onApplyCoupon }: CouponSectionProps) => {
  const { toast } = useToast();

  const applyCoupon = () => {
    const validCoupons = {
      "SAVE10": 10,
      "WELCOME20": 20,
      "NEWUSER15": 15
    };
    
    const couponDiscount = validCoupons[couponCode as keyof typeof validCoupons];
    if (couponDiscount) {
      onApplyCoupon(couponDiscount);
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

  return (
    <div className="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-teal-50">
      <h3 className="font-medium mb-3 text-gray-800">Have a Coupon Code?</h3>
      <div className="flex space-x-2">
        <Input
          value={couponCode}
          onChange={(e) => onCouponCodeChange(e.target.value)}
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
  );
};

export default CouponSection;
