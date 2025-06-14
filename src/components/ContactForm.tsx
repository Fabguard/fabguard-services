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
              <Mail className="w-5 h-5" /> fabguard.in@gmail.com
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5" /> +91 7262927177
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
