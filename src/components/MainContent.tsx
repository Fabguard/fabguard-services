
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ServiceRecommender from "@/components/ServiceRecommender";
import ServiceInformation from "@/components/ServiceInformation";
import Membership from "@/components/Membership";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import PartnerSection from "@/components/PartnerSection";
import TeamSection from "@/components/TeamSection";
import WhatsappFab from "@/components/WhatsappFab";
import AIAssistant from "@/components/AIAssistant";
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
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={cartItemsCount} onCartClick={onCartClick} />
      <main>
        <Hero />
        <TeamSection />
        <section id="recommender" className="bg-background pt-12">
          <div className="container-golden">
            <ServiceRecommender services={services} onAddToCart={onAddToCart} />
          </div>
        </section>
        <Services services={services} onAddToCart={onAddToCart} />
        <ServiceInformation />
        <Membership memberships={memberships} />
        <Testimonials />
        <FAQ />
        <ContactForm />
        <PartnerSection />
      </main>
      <Footer />
      <WhatsappFab />
      <AIAssistant />
    </div>
  );
};

export default MainContent;
