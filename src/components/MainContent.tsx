
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ServiceInformation from "@/components/ServiceInformation";
import Membership from "@/components/Membership";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import PartnerSection from "@/components/PartnerSection";
import TeamSection from "@/components/TeamSection";
import WhatsappFab from "@/components/WhatsappFab";
import Footer from "@/components/Footer";

import { Service, Membership as MembershipType } from "@/types/types";

interface MainContentProps {
  services: Service[];
  memberships: MembershipType[];
  cartItemsCount: number;
  onCartClick: () => void;
  onAddToCart: (service: Service) => void;
}

const MainContent = ({ 
  services, 
  memberships, 
  cartItemsCount, 
  onCartClick, 
  onAddToCart 
}: MainContentProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItemsCount={cartItemsCount} onCartClick={onCartClick} />
      <Hero />
      
      {/* Move About section before Services */}
      <TeamSection />
      <Services services={services} onAddToCart={onAddToCart} />
      <ServiceInformation />
      <Membership memberships={memberships} />
      <Testimonials />
      <ContactForm />
      <PartnerSection />
      <Footer />
      <WhatsappFab />
    </div>
  );
};

export default MainContent;
