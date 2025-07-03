
import { Info } from "lucide-react";

const ServiceInformation = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-blue-50 to-teal-50">
      <div className="container mx-auto px-4">
        <div className="bg-blue-100 border-l-4 border-blue-500 p-6 rounded-r-lg max-w-4xl mx-auto shadow-lg">
          <div className="flex items-start">
            <Info className="h-6 w-6 text-blue-500 mt-1 mr-4 flex-shrink-0" />
            <div className="text-blue-800">
              <h3 className="font-bold text-lg mb-3">Important Service Information</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Minimum cart value of ₹100 required to place an order and avail services through FabGuard</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Once the customer agrees to proceed with the service after being informed of the total charges by the serviceman, only the service charges will be applicable, and the visit charges will be waived</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Professional inspection and accurate pricing provided on-site before service commencement</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceInformation;
