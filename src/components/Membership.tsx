import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck, Star, Crown, Diamond, Check, ArrowRight } from "lucide-react";
import type { Membership } from "@/types/types";
import MembershipRegistrationModal, { RegistrationFormValues } from "./MembershipRegistrationModal";
import React, { useState } from "react";
import { useMembershipRegistration } from "@/hooks/useMembershipRegistration";

interface MembershipProps {
  memberships: Membership[];
  onSelectMembership?: (membership: Membership) => void;
}

const Membership = ({
  memberships,
  onSelectMembership,
}: MembershipProps) => {
  const [selectedMembership, setSelectedMembership] = useState<Membership | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { registerMembership, isLoading } = useMembershipRegistration();

  const getIcon = (membershipName: string) => {
    switch (membershipName) {
      case "Gold Membership":
        return <Star className="h-8 w-8" />;
      case "Platinum Membership":
        return <Crown className="h-8 w-8" />;
      case "Diamond Membership":
        return <Diamond className="h-8 w-8" />;
      default:
        return <BadgeCheck className="h-8 w-8" />;
    }
  };

  const getGradientClass = (membershipName: string) => {
    switch (membershipName) {
      case "Gold Membership":
        return "from-amber-500 to-yellow-600";
      case "Platinum Membership":
        return "from-slate-400 to-slate-600";
      case "Diamond Membership":
        return "from-blue-500 to-indigo-600";
      default:
        return "from-primary to-primary/80";
    }
  };

  const handleSelectMembership = (membership: Membership) => {
    setSelectedMembership(membership);
    setIsModalOpen(true);
  };

  const handleMembershipRegistration = async (values: RegistrationFormValues) => {
    if (!selectedMembership) return;
    
    const success = await registerMembership(
      values, 
      selectedMembership.id, 
      selectedMembership.name
    );
    
    if (success) {
      setIsModalOpen(false);
      setSelectedMembership(null);
    }
  };

  return (
    <section 
      id="membership" 
      className="section-padding bg-muted/30"
      aria-labelledby="membership-heading"
    >
      <div className="container-golden">
        {/* Section Header */}
        <header className="text-center mb-16 max-w-3xl mx-auto">
          <Badge variant="secondary" className="mb-4 px-4 py-1 text-sm font-medium bg-accent/10 text-accent border-0">
            Save Up To 30%
          </Badge>
          <h2 
            id="membership-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            <span className="gradient-text">Membership Plans</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Become a member and enjoy <strong className="text-foreground">exclusive discounts & benefits</strong>. 
            Choose the perfect plan for your needs and save on every service!
          </p>
        </header>

        {/* Membership Cards - Golden Ratio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {memberships.map((membership, index) => (
            <Card
              key={membership.id}
              className={`relative overflow-hidden border-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                membership.popular 
                  ? "border-accent shadow-xl scale-105 z-10" 
                  : "border-border/50 hover:border-primary/30"
              }`}
            >
              {/* Popular Badge */}
              {membership.popular && (
                <div className="absolute -top-px -right-px">
                  <div className="bg-accent text-accent-foreground px-4 py-1 text-sm font-bold rounded-bl-lg">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Card Header with Gradient */}
              <CardHeader className={`text-center py-8 bg-gradient-to-br ${getGradientClass(membership.name)} text-white`}>
                <div className="flex justify-center mb-4">
                  {getIcon(membership.name)}
                </div>
                <CardTitle className="text-2xl font-bold">{membership.name}</CardTitle>
                <CardDescription className="text-white/80">
                  1-Year Validity
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">₹{membership.price}</span>
                  <span className="text-white/80 ml-1">/year</span>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-6">
                {/* Discount Highlight */}
                <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
                  <BadgeCheck className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="font-semibold text-foreground">{membership.discount}</span>
                </div>

                {/* Services Included */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Applicable Services:</h4>
                  <ul className="space-y-2">
                    {membership.services.map((service, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground text-sm">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Extra Benefits */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Extra Benefits:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-accent flex-shrink-0" />
                      <span className="text-muted-foreground text-sm font-medium">No Visit Charges</span>
                    </li>
                    {membership.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-accent flex-shrink-0" />
                        <span className="text-muted-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Button
                  onClick={() => handleSelectMembership(membership)}
                  className={`w-full py-6 font-semibold transition-all duration-300 group ${
                    membership.popular 
                      ? "bg-accent hover:bg-accent/90 text-accent-foreground" 
                      : `bg-gradient-to-r ${getGradientClass(membership.name)} hover:opacity-90 text-white`
                  }`}
                  aria-label={`Select ${membership.name}`}
                >
                  Select {membership.name.split(' ')[0]}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <MembershipRegistrationModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        membership={selectedMembership}
        onRegister={handleMembershipRegistration}
      />
    </section>
  );
};

export default Membership;
