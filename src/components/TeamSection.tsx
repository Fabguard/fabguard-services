import { Home, Zap, MapPin, Shield, Clock, Award } from "lucide-react";

const features = [
  {
    icon: Home,
    title: "Comprehensive Services",
    description: "From plumbing and electrical work to laundry and dry cleaning - we cover all your domestic needs.",
    color: "primary"
  },
  {
    icon: Zap,
    title: "Quick & Reliable",
    description: "Fast response times and reliable service delivery to ensure your convenience and satisfaction.",
    color: "accent"
  },
  {
    icon: MapPin,
    title: "Pan India Coverage",
    description: "Available across India, bringing quality domestic services to your doorstep wherever you are.",
    color: "primary"
  }
];

const stats = [
  { icon: Shield, value: "100%", label: "Verified Professionals" },
  { icon: Clock, value: "2hr", label: "Average Response Time" },
  { icon: Award, value: "4.9★", label: "Customer Rating" }
];

const TeamSection = () => {
  return (
    <section 
      id="about" 
      className="section-padding bg-background"
      aria-labelledby="about-heading"
    >
      <div className="container-golden">
        {/* Section Header */}
        <header className="text-center mb-16 max-w-4xl mx-auto">
          <h2 
            id="about-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            <span className="gradient-text">About FabGuard</span>
          </h2>
          
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              FabGuard is an e-commerce platform dedicated to providing <strong className="text-foreground">reliable domestic services</strong> conveniently delivered to your doorstep. With just a single click, customers can access a wide range of services including plumbing, carpentry, electrical repairs, laundry, dry cleaning, and more.
            </p>
            <p>
              We take pride in offering <strong className="text-foreground">high-quality services at reasonable prices</strong>, with a focus on prompt delivery and customer satisfaction. Our commitment to excellence and convenience has earned the trust of our growing customer base.
            </p>
            <p className="text-primary font-semibold text-xl">
              Currently, we are pleased to offer our services across pan India.
            </p>
          </div>
        </header>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-6 mb-16 p-6 bg-primary/5 rounded-2xl border border-primary/10">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Grid - Golden Ratio: 3 columns */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <article 
              key={index} 
              className="group text-center p-8 rounded-2xl bg-card shadow-lg border border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110 ${
                feature.color === 'accent' ? 'bg-accent/10' : 'bg-primary/10'
              }`}>
                <feature.icon className={`h-8 w-8 ${
                  feature.color === 'accent' ? 'text-accent' : 'text-primary'
                }`} />
              </div>
              
              <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
