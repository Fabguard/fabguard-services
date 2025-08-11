
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck, Star, Crown, Diamond } from "lucide-react";
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
        return <Star className="h-8 w-8 text-yellow-500" />;
      case "Platinum Membership":
        return <Crown className="h-8 w-8 text-gray-400" />;
      case "Diamond Membership":
        return <Diamond className="h-8 w-8 text-blue-400" />;
      default:
        return <BadgeCheck className="h-8 w-8" />;
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
    <section id="membership" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent mb-4">
            Membership Plans
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Become a member and enjoy exclusive discounts &amp; benefits. Choose the perfect plan for your needs!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {memberships.map((membership) => (
            <Card
              key={membership.id}
              className={`relative hover:shadow-xl transition-all duration-300 border-2 ${
                membership.popular ? "border-teal-500 scale-105" : "border-gray-200"
              }`}
            >
              {membership.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-teal-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <CardHeader className={`text-center ${membership.bgGradient} text-white rounded-t-lg`}>
                <div className="flex justify-center mb-4">
                  {getIcon(membership.name)}
                </div>
                <CardTitle className="text-2xl font-bold">{membership.name}</CardTitle>
                <CardDescription className="text-white/90">
                  1-Year Validity
                </CardDescription>
                <div className="text-4xl font-bold mt-4">
                  ₹{membership.price}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <BadgeCheck className="h-5 w-5 text-green-500" />
                    <span className="font-medium text-gray-800">{membership.discount}</span>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-800">Applicable Services:</h4>
                    <ul className="space-y-1">
                      {membership.services.map((service, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="h-2 w-2 bg-teal-500 rounded-full"></div>
                          <span className="text-gray-600">{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-800">Extra Benefits:</h4>
                    <ul className="space-y-1">
                      <li className="flex items-center space-x-2">
                        <BadgeCheck className="h-4 w-4 text-green-500" />
                        <span className="text-gray-600">No Visit Charges</span>
                      </li>
                      {membership.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <BadgeCheck className="h-4 w-4 text-green-500" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => handleSelectMembership(membership)}
                  className={`w-full ${membership.bgGradient} hover:opacity-90 text-white border-0`}
                >
                  Select {membership.name}
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
