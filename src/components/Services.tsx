
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Service } from "@/types/types";

interface ServicesProps {
  services: Service[];
  onAddToCart: (service: Service) => void;
}

const Services = ({ services, onAddToCart }: ServicesProps) => {
  const categories = [...new Set(services.map(service => service.category))];

  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Hamare Services</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Chuniye hamare professional ghar ki services mein se. 
            Sabhi services cash on delivery ke saath available hain.
          </p>
        </div>

        {categories.map(category => (
          <div key={category} className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              {category} Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services
                .filter(service => service.category === category)
                .map(service => (
                  <Card key={service.id} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="p-0">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                    </CardHeader>
                    <CardContent className="p-6">
                      <CardTitle className="text-xl mb-2">{service.name}</CardTitle>
                      <CardDescription className="text-gray-600 mb-4">
                        {service.description}
                      </CardDescription>
                      <div className="text-2xl font-bold text-blue-600">
                        ₹{service.price}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        onClick={() => onAddToCart(service)}
                        className="w-full bg-orange-500 hover:bg-orange-600"
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
    </section>
  );
};

export default Services;
