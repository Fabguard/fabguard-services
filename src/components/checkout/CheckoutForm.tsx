
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import CouponSection from "./CouponSection";
import TermsSection from "./TermsSection";
import OrderSummary from "./OrderSummary";

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  couponCode: string;
  note: string;
}

interface CheckoutFormProps {
  formData: FormData;
  onFormDataChange: (data: FormData) => void;
  discount: number;
  onDiscountChange: (discount: number) => void;
  agreeToTerms: boolean;
  onAgreeToTermsChange: (agreed: boolean) => void;
  isLoading: boolean;
  total: number;
  onSubmit: (e: React.FormEvent) => void;
}

const CheckoutForm = ({
  formData,
  onFormDataChange,
  discount,
  onDiscountChange,
  agreeToTerms,
  onAgreeToTermsChange,
  isLoading,
  total,
  onSubmit
}: CheckoutFormProps) => {
  const finalTotal = total - discount;

  return (
    <form onSubmit={onSubmit} className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <Label htmlFor="name" className="text-sm sm:text-base">Full Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => onFormDataChange({ ...formData, name: e.target.value })}
            placeholder="Enter your full name"
            required
            className="focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
          />
        </div>
        <div>
          <Label htmlFor="email" className="text-sm sm:text-base">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => onFormDataChange({ ...formData, email: e.target.value })}
            placeholder="Enter your email"
            required
            className="focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="phone" className="text-sm sm:text-base">Phone Number *</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => onFormDataChange({ ...formData, phone: e.target.value })}
          placeholder="Enter your phone number"
          required
          className="focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
        />
      </div>
      
      <div>
        <Label htmlFor="address" className="text-sm sm:text-base">Complete Address *</Label>
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => onFormDataChange({ ...formData, address: e.target.value })}
          placeholder="Enter your complete address including city and pincode"
          rows={3}
          required
          className="focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base resize-none"
        />
      </div>
      
      <div>
        <Label htmlFor="note" className="text-sm sm:text-base">Note (Optional)</Label>
        <Textarea
          id="note"
          value={formData.note}
          onChange={(e) => onFormDataChange({ ...formData, note: e.target.value })}
          placeholder="Please describe any specific problems you're facing or special instructions for our team"
          rows={3}
          className="focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base resize-none"
        />
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Help us serve you better by sharing details about the issues you're experiencing
        </p>
      </div>
      
      <CouponSection
        couponCode={formData.couponCode}
        onCouponCodeChange={(code) => onFormDataChange({ ...formData, couponCode: code })}
        onApplyCoupon={onDiscountChange}
      />
      
      <TermsSection
        agreeToTerms={agreeToTerms}
        onAgreeToTermsChange={onAgreeToTermsChange}
      />
      
      <OrderSummary total={total} discount={discount} />
      
      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white text-base sm:text-lg py-2 sm:py-3"
        disabled={isLoading || !agreeToTerms}
      >
        {isLoading ? "Placing Order..." : "Place Order (Cash on Delivery)"}
      </Button>
    </form>
  );
};

export default CheckoutForm;
