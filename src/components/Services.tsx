
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Service } from "@/types/types";

interface ServicesProps {
  services: Service[];
  onAddToCart: (service: Service) => void;
}

const Services = ({ services, onAddToCart }: ServicesProps) => {
  // Get unique categories and remove duplicates
  const categories = [...new Set(services.map(service => service.category))];

  const handleAddToCart = (service: Service) => {
    onAddToCart(service);
  };

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent mb-4">
            Our Professional Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Quality home services at your doorstep. Prices shown are visit charges - actual service charges determined after inspection.
          </p>
        </div>

        {/* Golden Ratio Grid Layout - 30-60-90 rule */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categories.map(category => (
            <div key={category} className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-800 text-center pb-4 border-b-2 border-blue-500">
                {category}
              </h3>
              <div className="grid grid-cols-1 gap-6">
                {services
                  .filter(service => service.category === category)
                  .map(service => (
                    <Card key={service.id} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg group">
                      <CardHeader className="p-0">
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                        />
                      </CardHeader>
                      <CardContent className="p-6">
                        <CardTitle className="text-xl mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">
                          {service.name}
                        </CardTitle>
                        <CardDescription className="text-gray-600 mb-4 line-clamp-3">
                          {service.description}
                        </CardDescription>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                            ₹{service.price}
                          </div>
                          <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                            Visit Charges
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500">
                          Minimum consultation fee. Final charges after inspection.
                        </p>
                      </CardContent>
                      <CardFooter className="p-6 pt-0">
                        <Button
                          onClick={() => handleAddToCart(service)}
                          className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-105"
                        >
                          Add to Cart
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
