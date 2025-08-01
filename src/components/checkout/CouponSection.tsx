
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
      "Apple10": 10, "BAT10": 10, "Cherish10": 10, "Delite10": 10, "Enjoy10": 10,
      "Fun10": 10, "Great10": 10, "Hello10": 10, "Icy10": 10, "Joy10": 10,
      "Kind10": 10, "Lite10": 10, "MOJO10": 10, "New10": 10, "Oggy10": 10,
      "Anchor10": 10, "BEN10": 10, "Candle10": 10, "Den10": 10, "Eager10": 10,
      "Fab10": 10, "GOAT10": 10, "Home10": 10, "Imli10": 10, "Jump10": 10,
      "King10": 10, "Lion10": 10, "MOTO10": 10, "Nora10": 10, "Oslo10": 10,
      "Aries10": 10, "Brave10": 10, "COAL10": 10, "Dia10": 10, "Emerald10": 10,
      "Flint10": 10, "Gill10": 10, "Hat10": 10, "IQ10": 10, "JOSH10": 10,
      "KATE10": 10, "Lan10": 10, "MEN10": 10, "NICE10": 10, "OLA10": 10
    };
    
    const couponDiscount = validCoupons[couponCode as keyof typeof validCoupons];
    if (couponDiscount) {
      onApplyCoupon(couponDiscount);
      toast({
        title: "Coupon Applied!",
        description: `You saved ${couponDiscount}% with ${couponCode}!`,
      });
    } else {
      toast({
        title: "Invalid Coupon",
        description: "Please enter a valid coupon code to get 10% discount",
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
          placeholder="Enter coupon code for 10% discount"
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
    </div>
  );
};

export default CouponSection;
