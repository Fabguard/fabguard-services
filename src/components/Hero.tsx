import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, Star, CheckCircle2 } from "lucide-react";

const Hero = () => {
  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToMembership = () => {
    const membershipSection = document.getElementById('membership');
    if (membershipSection) {
      membershipSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'var(--gradient-hero)' }}
      aria-label="Hero section - Professional home services"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container-golden relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Content - Golden Ratio: 7 columns (larger portion) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 animate-fade-in">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Trusted by 1000+ Customers Across India</span>
            </div>

            {/* Main Heading - 5-Second Clarity */}
            <div className="space-y-4 animate-fade-in stagger-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="gradient-text">Ghar Ke Kaam</span>
                <br />
                <span className="text-foreground">FabGuard Ke Naam</span>
              </h1>
              
              <p className="text-xl sm:text-2xl font-semibold text-accent">
                "Ghar Ki Har Zarurat Ek Hi Jagah"
              </p>
            </div>

            {/* Value Proposition - Clear Benefits */}
            <div className="p-5 bg-card/80 backdrop-blur-sm rounded-xl border border-border/50 shadow-lg animate-fade-in stagger-2">
              <p className="text-lg text-foreground/80 leading-relaxed">
                Plumbing se lekar laundry tak, hum provide karte hain <strong className="text-foreground">bharosemand domestic services</strong> cash on delivery ke saath. Book kariye ab aur hamare experts ko ghar bulayiye.
              </p>
            </div>

            {/* Trust Indicators - Social Proof */}
            <div className="flex flex-wrap gap-6 animate-fade-in stagger-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <span className="font-medium text-foreground">Verified Experts</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <span className="font-medium text-foreground">Same Day Service</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-accent/10">
                  <Star className="h-5 w-5 text-accent" />
                </div>
                <span className="font-medium text-foreground">4.9★ Rating</span>
              </div>
            </div>

            {/* CTA Buttons - 10% Accent Color for Conversion */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in stagger-4">
              <Button
                onClick={scrollToServices}
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 group"
              >
                Book Service Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={scrollToMembership}
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg font-semibold transition-all duration-300"
              >
                View Memberships
              </Button>
            </div>

            {/* Stats - Social Proof */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50 animate-fade-in stagger-5">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary">1000+</div>
                <div className="text-sm text-muted-foreground mt-1">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground mt-1">Support Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-accent">100%</div>
                <div className="text-sm text-muted-foreground mt-1">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Hero Image - Golden Ratio: 5 columns (smaller portion) */}
          <div className="lg:col-span-5 relative animate-fade-in">
            <div className="relative">
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="/lovable-uploads/569b94da-01c6-4317-8af4-94de095f3d5c.png"
                  alt="Professional FabGuard home services - plumbing, electrical, laundry experts at your doorstep"
                  className="w-full h-[500px] lg:h-[600px] object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
              </div>
              
              {/* Floating Badge - Top Left */}
              <div className="absolute -top-4 -left-4 bg-card p-4 rounded-xl shadow-xl border border-border/50 animate-pulse-glow">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-foreground">Online Now</span>
                </div>
              </div>
              
              {/* Rating Badge - Bottom Right */}
              <div className="absolute -bottom-4 -right-4 bg-card p-4 rounded-xl shadow-xl border border-border/50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">4.9★</div>
                  <div className="text-xs text-muted-foreground">Customer Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator">
        <div className="w-6 h-10 border-2 border-muted-foreground/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
