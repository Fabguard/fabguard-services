import { useForm } from "react-hook-form";
import { useContactForm } from "@/hooks/useContactForm";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Facebook, Instagram, Linkedin, Youtube, Send, MessageCircle } from "lucide-react";

type ContactFormFields = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/fabguard.in",
    icon: Facebook,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/fabguard_5?igshid=NGExMmI2YTkyZg==",
    icon: Instagram,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/fabguard-services-638a81160",
    icon: Linkedin,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/channel/UCTp7Yv9bEGmag6URErZe5kA",
    icon: Youtube,
  },
];

const whatsappNumber = "+917262927177";
const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}`;

const ContactForm = () => {
  const { submitContactForm, isLoading } = useContactForm();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormFields>();

  const onSubmit = async (data: ContactFormFields) => {
    const success = await submitContactForm(data);
    if (success) {
      reset();
    }
  };

  return (
    <section 
      id="contact" 
      className="section-padding bg-muted/30"
      aria-labelledby="contact-heading"
    >
      <div className="container-golden">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
          {/* Contact Info Side */}
          <div className="space-y-8">
            <header>
              <Badge variant="secondary" className="mb-4 px-4 py-1 text-sm font-medium bg-primary/10 text-primary border-0">
                Get In Touch
              </Badge>
              <h2 
                id="contact-heading"
                className="text-3xl sm:text-4xl font-bold mb-4"
              >
                <span className="gradient-text">Contact Us</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Have a question or service inquiry? Reach out below and our team will respond quickly.
              </p>
            </header>

            {/* Contact Details */}
            <div className="space-y-4">
              <a 
                href="mailto:info@fabguard.co.in" 
                className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300 group"
              >
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Email</div>
                  <div className="font-medium text-foreground">info@fabguard.co.in</div>
                </div>
              </a>

              <a 
                href="tel:+917262927177" 
                className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300 group"
              >
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Phone</div>
                  <div className="font-medium text-foreground">+91 7262927177</div>
                </div>
              </a>

              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border/50 hover:border-accent/30 hover:shadow-md transition-all duration-300 group"
              >
                <div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                  <MessageCircle className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">WhatsApp</div>
                  <div className="font-medium text-foreground">Chat with us</div>
                </div>
              </a>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Connect with us:</h3>
              <div className="flex gap-3">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${item.name} page`}
                    className="p-3 bg-card rounded-xl border border-border/50 hover:border-primary/30 hover:bg-primary/5 hover:scale-110 transition-all duration-300"
                  >
                    <item.icon className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form Side */}
          <div className="bg-card p-8 rounded-2xl shadow-lg border border-border/50">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Name <span className="text-destructive">*</span>
                </label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  className="h-12"
                  {...register("name", { required: "Name is required" })}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email <span className="text-destructive">*</span>
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@email.com"
                  className="h-12"
                  autoComplete="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/,
                      message: "Enter a valid email",
                    },
                  })}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Phone <span className="text-muted-foreground text-xs">(optional)</span>
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 1234567890"
                  className="h-12"
                  {...register("phone")}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message <span className="text-destructive">*</span>
                </label>
                <Textarea
                  id="message"
                  placeholder="How can we help you?"
                  rows={4}
                  className="resize-none"
                  {...register("message", { required: "Message is required" })}
                  aria-invalid={!!errors.message}
                />
                {errors.message && (
                  <p className="text-destructive text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
              >
                {isLoading ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
