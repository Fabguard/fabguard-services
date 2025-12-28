import { Facebook, Instagram, Linkedin, Youtube, MapPin, Phone, Mail } from "lucide-react";

const socialLinks = [
  { name: "Facebook", href: "https://www.facebook.com/fabguard.in", icon: Facebook },
  { name: "Instagram", href: "https://instagram.com/fabguard_5?igshid=NGExMmI2YTkyZg==", icon: Instagram },
  { name: "LinkedIn", href: "https://linkedin.com/in/fabguard-services-638a81160", icon: Linkedin },
  { name: "YouTube", href: "https://www.youtube.com/channel/UCTp7Yv9bEGmag6URErZe5kA", icon: Youtube },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container-golden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/lovable-uploads/bb163471-e547-491d-b573-7d52ae442c7c.png" 
                alt="FabGuard Logo" 
                className="h-10 w-10"
                width={40}
                height={40}
              />
              <span className="text-2xl font-bold">FabGuard</span>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              Your trusted partner for reliable domestic services across India. 
              Quality service at your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <a href="#services" className="text-background/70 hover:text-background transition-colors text-sm">Services</a>
              <a href="#membership" className="text-background/70 hover:text-background transition-colors text-sm">Membership</a>
              <a href="#about" className="text-background/70 hover:text-background transition-colors text-sm">About Us</a>
              <a href="#contact" className="text-background/70 hover:text-background transition-colors text-sm">Contact</a>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Us</h3>
            <div className="space-y-3">
              <a href="mailto:info@fabguard.co.in" className="flex items-center gap-2 text-background/70 hover:text-background transition-colors text-sm">
                <Mail className="h-4 w-4" />
                info@fabguard.co.in
              </a>
              <a href="tel:+917262927177" className="flex items-center gap-2 text-background/70 hover:text-background transition-colors text-sm">
                <Phone className="h-4 w-4" />
                +91 7262927177
              </a>
              <div className="flex items-center gap-2 text-background/70 text-sm">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                Pan India Service
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 py-6 border-t border-background/10">
          {socialLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit our ${item.name} page`}
              className="p-2 rounded-full bg-background/10 hover:bg-background/20 transition-colors"
            >
              <item.icon className="h-5 w-5" />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center pt-6 border-t border-background/10 space-y-1">
          <p className="text-background/80 text-sm font-medium">
            Ahad Tech Labs Pvt Ltd
          </p>
          <p className="text-background/60 text-xs">
            ©{currentYear} BAT Software. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
