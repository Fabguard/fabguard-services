
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
              <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Visit Charges Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                The prices displayed for each service represent visit charges, which are the minimum charges applicable for our service provider's visit to your location. These visit charges will be collected upon our team's arrival at your premises. Please be advised that if you decide not to proceed with the service after our service provider has arrived at your location, or if you change your mind about the work, the visit charges will still be applicable and must be paid. This policy helps us cover the time, effort, and transportation costs incurred by our professional team. We kindly encourage our valued customers to carefully consider and finalize their service requirements before booking to ensure a mutually beneficial experience.
              </p>
              <p className="text-gray-700 leading-relaxed font-medium mt-3 bg-blue-50 p-3 rounded-lg">
                <strong>Important Note:</strong> Once the customer agrees to proceed with the service after being informed of the total charges by the serviceman, only the service charges will be applicable, and the visit charges will be waived.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Minimum Order Value</h2>
              <p className="text-gray-700 leading-relaxed bg-yellow-50 p-3 rounded-lg">
                <strong>Please note that a minimum cart value of ₹100 is required to place an order and avail services through Fabguard.</strong>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Payment Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                Payment is due upon completion of services via cash on delivery. All prices are inclusive of applicable taxes. Refunds are processed according to our refund policy within 7 business days of service completion if you are not satisfied.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Service Schedule</h2>
              <p className="text-gray-700 leading-relaxed">
                Service appointments are scheduled based on availability. We will contact you within 24 hours to confirm your appointment. Rescheduling requests must be made at least 4 hours before the scheduled service time.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Access and Safety</h2>
              <p className="text-gray-700 leading-relaxed">
                You must provide safe and reasonable access to the service area. Please ensure pets are secured and valuable items are stored safely. Our team will follow all safety protocols during service delivery.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Customer Responsibility for Clothes Count</h2>
              <p className="text-gray-700 leading-relaxed">
                It is the duty of the customer to check for the number of clothes given at the time of pickup that are being given for the laundry services and check for the same at the time of delivery of clothes after the services. Fabguard will not be responsible for any of the clothes that are lost. We can co-operate with the customer only on goodwill to find the clothes which customer claims that are lost.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Cloth Damage Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                In the event that any damage occurs to your clothing during our service, the service charges incurred on that particular cloth will be fully revoked. We take full responsibility for any damage caused during the cleaning process and will ensure appropriate compensation.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">9. Cancellation Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                Services can be cancelled up to 4 hours before the scheduled appointment without any charges. Late cancellations may incur a service fee of ₹200.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">10. Quality Guarantee</h2>
              <p className="text-gray-700 leading-relaxed">
                We guarantee the quality of our services. If you are not satisfied with the service provided, please contact us within 24 hours, and we will re-service the area at no additional cost.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">11. Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We respect your privacy and protect your personal information. Customer data is used solely for service delivery and communication purposes and is not shared with third parties without consent.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">12. Contact Information</h2>
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
