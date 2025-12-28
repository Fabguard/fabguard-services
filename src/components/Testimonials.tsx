import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Aasem",
    rating: 5,
    feedback: "The transaction between service provider and customer is very transparent.",
    location: "Delhi"
  },
  {
    name: "Abuzar",
    rating: 5,
    feedback: "FabGuard has the most innovative, reliable & quick service at very low cost with full quality satisfaction.",
    location: "Mumbai"
  },
  {
    name: "Deepjyoti Das",
    rating: 5,
    feedback: "Fast, quick and reliable services. Highly recommended for all home service needs!",
    location: "Bangalore"
  },
];

const Testimonials = () => {
  return (
    <section 
      className="section-padding bg-background"
      aria-labelledby="testimonials-heading"
    >
      <div className="container-golden">
        {/* Section Header */}
        <header className="text-center mb-16 max-w-3xl mx-auto">
          <Badge variant="secondary" className="mb-4 px-4 py-1 text-sm font-medium bg-primary/10 text-primary border-0">
            Customer Reviews
          </Badge>
          <h2 
            id="testimonials-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            <span className="gradient-text">What Our Customers Say</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Don't just take our word for it - hear from our satisfied customers across India.
          </p>
        </header>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="h-12 w-12 text-primary" />
              </div>

              <CardContent className="p-8">
                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-foreground/80 text-lg leading-relaxed mb-6 italic">
                  "{testimonial.feedback}"
                </blockquote>

                {/* Customer Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                  </div>
                </div>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicator */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/5 rounded-full border border-primary/10">
            <Star className="h-5 w-5 fill-accent text-accent" />
            <span className="font-medium text-foreground">4.9 Average Rating</span>
            <span className="text-muted-foreground">from 1000+ Reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
