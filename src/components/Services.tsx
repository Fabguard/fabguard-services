
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Service } from "@/types/types";

interface ServicesProps {
  services: (Service & { items?: string[] })[];
  onAddToCart: (service: Service) => void;
}

const Services = ({ services, onAddToCart }: ServicesProps) => {
  // get unique categories
  const categories = [...new Set(services.map(service => service.category))];
  // for service subitem selection
  const [selectedItems, setSelectedItems] = useState<{ [key: number]: string[] }>({});

  const handleAddToCart = (service: Service) => {
    onAddToCart(service);
  };

  const handleSelectItem = (serviceId: number, item: string) => {
    setSelectedItems(prev => {
      const items = prev[serviceId] || [];
      if (items.includes(item)) {
        return { ...prev, [serviceId]: items.filter(i => i !== item) };
      }
      return { ...prev, [serviceId]: [...items, item] };
    });
  };

  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent mb-4">
            Hamare Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our professional services. Prices shown are estimated rates and also service visit charges. Service provider will collect visit charges on visit if you do not proceed with the service. Actual price after inspection.
          </p>
        </div>
        {/* Horizontal category row */}
        <div className="flex flex-row gap-8 overflow-x-auto pb-4 whitespace-nowrap">
          {categories.map(category => (
            <div
              key={category}
              className="bg-white rounded-lg shadow-sm flex-shrink-0 min-w-[350px] md:min-w-[420px] lg:min-w-[450px] px-2"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center pt-4">
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
                        {service.items && (
                          <div className="mb-2">
                            <span className="font-medium text-gray-800">Select Items (optional):</span>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {service.items.map((item, idx) => (
                                <label
                                  key={idx}
                                  className={`border rounded px-3 py-1 cursor-pointer text-sm ${selectedItems[service.id]?.includes(item) ? "bg-blue-100 border-blue-500" : "bg-white border-gray-300"}`}
                                >
                                  <input
                                    type="checkbox"
                                    className="mr-1"
                                    checked={selectedItems[service.id]?.includes(item) || false}
                                    onChange={() => handleSelectItem(service.id, item)}
                                  />
                                  {item}
                                </label>
                              ))}
                            </div>
                          </div>
                        )}
                        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                          ₹{service.price}
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                          (Estimated rate & service visit charge)
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

