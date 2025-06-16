
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TermsAndConditions = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6 hover:bg-white/50"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              Terms and Conditions
            </CardTitle>
            <p className="text-center text-gray-600 mt-2">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </CardHeader>
          <CardContent className="prose max-w-none space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Service Agreement</h2>
              <p className="text-gray-700 leading-relaxed">
                By booking our services, you agree to these terms and conditions. Fabguard provides professional cleaning, maintenance, and related services as described in your service agreement.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Payment Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                Payment is due upon completion of services via cash on delivery. All prices are inclusive of applicable taxes. Refunds are processed according to our refund policy within 7 business days of service completion if you are not satisfied.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Service Schedule</h2>
              <p className="text-gray-700 leading-relaxed">
                Service appointments are scheduled based on availability. We will contact you within 24 hours to confirm your appointment. Rescheduling requests must be made at least 4 hours before the scheduled service time.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Access and Safety</h2>
              <p className="text-gray-700 leading-relaxed">
                You must provide safe and reasonable access to the service area. Please ensure pets are secured and valuable items are stored safely. Our team will follow all safety protocols during service delivery.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Cloth Damage Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                In the event that any damage occurs to your clothing during our service, the service charges incurred on that particular cloth will be fully revoked. We take full responsibility for any damage caused during the cleaning process and will ensure appropriate compensation.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Cancellation Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                Services can be cancelled up to 4 hours before the scheduled appointment without any charges. Late cancellations may incur a service fee of ₹200.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Quality Guarantee</h2>
              <p className="text-gray-700 leading-relaxed">
                We guarantee the quality of our services. If you are not satisfied with the service provided, please contact us within 24 hours, and we will re-service the area at no additional cost.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We respect your privacy and protect your personal information. Customer data is used solely for service delivery and communication purposes and is not shared with third parties without consent.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">9. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed">
                For any questions or concerns regarding these terms, please contact us through our customer service channels. We are committed to resolving any issues promptly and professionally.
              </p>
            </div>

            <div className="border-t pt-6 mt-8">
              <p className="text-sm text-gray-600 text-center">
                By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsAndConditions;
