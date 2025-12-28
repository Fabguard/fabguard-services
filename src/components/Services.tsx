import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { Service } from "@/types/types";

interface ServicesProps {
  services: Service[];
  onAddToCart: (service: Service) => void;
}

const Services = ({ services, onAddToCart }: ServicesProps) => {
  const categories = [...new Set(services.map(service => service.category))];

  const handleAddToCart = (service: Service) => {
    onAddToCart(service);
  };

  return (
    <section 
      id="services" 
      className="section-padding bg-gradient-section"
      aria-labelledby="services-heading"
    >
      <div className="container-golden">
        {/* Section Header - SEO Optimized */}
        <header className="text-center mb-16 max-w-3xl mx-auto">
          <Badge variant="secondary" className="mb-4 px-4 py-1 text-sm font-medium bg-primary/10 text-primary border-0">
            Professional Home Services
          </Badge>
          <h2 
            id="services-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            <span className="gradient-text">Quality Services</span>
            <br className="hidden sm:block" />
            <span className="text-foreground">At Your Doorstep</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Professional plumbing, electrical, carpentry, laundry and cleaning services. 
            Prices shown are visit charges - actual service charges determined after inspection.
          </p>
        </header>

        {/* Services Grid - Golden Ratio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {categories.map((category, categoryIndex) => (
            <article 
              key={category} 
              className="space-y-6"
              style={{ animationDelay: `${categoryIndex * 0.1}s` }}
            >
              {/* Category Header */}
              <div className="text-center pb-4 border-b-2 border-primary/30">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  {category}
                </h3>
              </div>
              
              {/* Service Cards */}
              <div className="space-y-6">
                {services
                  .filter(service => service.category === category)
                  .map((service, index) => (
                    <Card 
                      key={service.id} 
                      className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card"
                    >
                      <CardHeader className="p-0 relative overflow-hidden">
                        <img
                          src={service.image}
                          alt={`${service.name} - Professional ${service.category} service in India`}
                          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </CardHeader>
                      
                      <CardContent className="p-6 space-y-4">
                        <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {service.name}
                        </CardTitle>
                        
                        <CardDescription className="text-muted-foreground line-clamp-2">
                          {service.description}
                        </CardDescription>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-2xl font-bold text-primary">₹{service.price}</span>
                            <Badge variant="secondary" className="ml-2 text-xs bg-secondary text-secondary-foreground">
                              Visit Charges
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="text-xs text-muted-foreground">
                          Minimum consultation fee. Final charges after inspection.
                        </p>
                      </CardContent>
                      
                      <CardFooter className="p-6 pt-0">
                        <Button
                          onClick={() => handleAddToCart(service)}
                          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3 transition-all duration-300 group/btn"
                          aria-label={`Add ${service.name} to cart`}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                          <ArrowRight className="h-4 w-4 ml-2 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
