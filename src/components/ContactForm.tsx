
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

type ContactFormFields = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/yourcompany",
    icon: Facebook,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/yourcompany",
    icon: Instagram,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/yourcompany",
    icon: Linkedin,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@yourcompany",
    icon: Youtube,
  },
];

const whatsappNumber = "+917262927177"; // Updated WhatsApp number
const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}`;

const ContactForm = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormFields>();

  const onSubmit = async (data: ContactFormFields) => {
    toast({
      title: "Thank you!",
      description: "Your message has been sent. We'll get back to you soon.",
    });
    reset();
  };

  return (
    <section id="contact" className="py-12 bg-white">
      <div className="container mx-auto max-w-2xl px-4">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
          Contact Us
        </h2>
        <p className="text-gray-500 mb-8">Have a question or service inquiry? Reach out below and our team will respond quickly.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label htmlFor="name" className="block font-medium mb-1">Name</label>
            <Input
              id="name"
              placeholder="Your Name"
              {...register("name", { required: "Name is required" })}
              aria-invalid={!!errors.name}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block font-medium mb-1">Email</label>
            <Input
              id="email"
              type="email"
              placeholder="you@email.com"
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
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="block font-medium mb-1">Phone <span className="text-gray-400 text-xs">(optional)</span></label>
            <Input
              id="phone"
              type="tel"
              placeholder="Phone number"
              {...register("phone")}
            />
          </div>
          <div>
            <label htmlFor="message" className="block font-medium mb-1">Message</label>
            <Textarea
              id="message"
              placeholder="How can we help you?"
              rows={4}
              {...register("message", { required: "Message is required" })}
              aria-invalid={!!errors.message}
            />
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>

        <div className="flex flex-col gap-4 mt-10 text-blue-600">
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5" /> hello@fabguard.com
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5" /> +91-9999999999
            </div>
          </div>
          <div className="mt-4">
            <div className="font-semibold mb-2 text-gray-700">Connect with us:</div>
            <div className="flex flex-wrap gap-4 items-center">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className="hover:scale-110 transition-transform"
                >
                  <item.icon className="w-7 h-7 text-blue-600 hover:text-teal-500" />
                </a>
              ))}
              <Button
                size="sm"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 ml-2"
                asChild
                aria-label="WhatsApp"
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <svg className="inline-block w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 .5C5.73.5.5 5.73.5 12c0 2.05.53 4.06 1.54 5.82L.07 23.39a1 1 0 0 0 .85 1.42c.14 0 .28-.03.4-.1l5.55-2.87A11.44 11.44 0 0 0 12 23.5c6.27 0 11.5-5.23 11.5-11.5S18.27.5 12 .5zm0 20.5c-1.71 0-3.4-.39-4.9-1.14a1 1 0 0 0-.93-.03l-3.4 1.75 1-3.37a1 1 0 0 0-.13-.82A9.48 9.48 0 1 1 21.5 12c0 5.23-4.27 9.5-9.5 9.5zm5.15-7.46c-.3-.15-1.78-.88-2.05-.98-.27-.1-.46-.15-.64.15-.19.3-.74.98-.9 1.18-.17.19-.33.21-.62.07a7.85 7.85 0 0 1-2.32-1.44A8.96 8.96 0 0 1 8 12.86c-.13-.22-.01-.33.11-.43.13-.11.29-.3.43-.45.15-.15.2-.26.3-.44.1-.19.05-.34-.02-.49-.07-.14-.65-1.56-.89-2.18-.23-.59-.46-.52-.64-.53-.17-.01-.37-.01-.56-.01-.19 0-.49.07-.75.35C4.25 9.98 4 10.72 4 12.05c0 3.15 2.56 6.5 7.56 6.5.8 0 1.58-.07 2.33-.22.21-.05.47-.18.54-.36.07-.18.07-.36.05-.5-.03-.13-.21-.21-.43-.26z"/>
                  </svg>
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;

