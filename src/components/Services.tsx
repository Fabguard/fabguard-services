
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Service } from "@/types/types";

interface ServicesProps {
  services: Service[];
  onAddToCart: (service: Service) => void;
}

const Services = ({ services, onAddToCart }: ServicesProps) => {
  // get unique categories
  const categories = [...new Set(services.map(service => service.category))];

  const handleAddToCart = (service: Service) => {
    onAddToCart(service);
  };

  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent mb-4">
            Hamare Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Choose from our professional services. Prices shown are <b>visit charges</b> (minimum cart value per visit). Service provider will collect visit charges on visit if you do not proceed with the service. Actual price after inspection.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-3xl mx-auto">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-amber-600 text-sm font-semibold">!</span>
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-amber-800 mb-2">Important Notice - Visit Charges Policy</h3>
                <p className="text-amber-700 text-sm leading-relaxed">
                  Please note that the visit charges displayed for each service will be collected by our service provider upon their visit to your location. 
                  In the event that you decide not to proceed with the service after our team's arrival or change your mind about the work, 
                  the visit charges will still be applicable and payable. We kindly request your understanding as this helps cover the time and 
                  transportation costs incurred by our professional team. We encourage you to finalize your service requirements before booking 
                  to ensure a smooth experience for both parties.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Responsive grid: vertical on mobile, horizontal on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {categories.map(category => (
            <div key={category} className="min-w-[280px] max-w-lg lg:max-w-xs mb-12 w-full">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                {category}
              </h3>
              <div className="grid grid-cols-1 gap-6">
                {services
                  .filter(service => service.category === category)
                  .map(service => (
                    <Card key={service.id} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                      <CardHeader className="p-0">
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                      </CardHeader>
                      <CardContent className="p-6">
                        <CardTitle className="text-xl mb-2 text-gray-800">{service.name}</CardTitle>
                        <CardDescription className="text-gray-600 mb-4">
                          {service.description}
                        </CardDescription>
                        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent flex items-center gap-2">
                          ₹{service.price}
                          <span className="text-base font-semibold text-gray-700 ml-1">Visit Charges</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                          (Visit charges per service. This is the minimum billing for a visit.)
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          onClick={() => handleAddToCart(service)}
                          className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white"
                        >
                          Cart Mein Add Kariye
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
