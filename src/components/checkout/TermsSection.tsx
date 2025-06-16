
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

interface TermsSectionProps {
  agreeToTerms: boolean;
  onAgreeToTermsChange: (agreed: boolean) => void;
}

const TermsSection = ({ agreeToTerms, onAgreeToTermsChange }: TermsSectionProps) => {
  return (
    <div className="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-teal-50">
      <div className="flex items-start space-x-3">
        <Checkbox
          id="terms"
          checked={agreeToTerms}
          onCheckedChange={(checked) => onAgreeToTermsChange(checked === true)}
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
  );
};

export default TermsSection;
