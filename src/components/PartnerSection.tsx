import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Star, Users, Wallet } from "lucide-react";
import React, { useState } from "react";
import PartnerRegistrationForm from "./PartnerRegistrationForm";

const PartnerSection = () => {
  const [showRegister, setShowRegister] = useState(false);

  const benefits = [
    {
      icon: Wallet,
      title: "Acchi Kamai",
      description: "Competitive rates aur flexible working hours ke saath regular income"
    },
    {
      icon: Users,
      title: "Ready Customers",
      description: "Hum customers laate hain, aap sirf quality service provide kariye"
    },
    {
      icon: Star,
      title: "Skill Development",
      description: "Training aur support ke saath apne skills ko improve kariye"
    },
    {
      icon: CheckCircle,
      title: "Easy Registration",
      description: "Simple process aur quick verification ke saath start kariye"
    }
  ];

  return (
    <section id="partner" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent mb-4">
            Fabguard Partner Baniye
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Agar aap ek skilled service provider hain aur apna business badhana chahte hain, 
            toh Fabguard ke saath join kariye aur hazaaron customers tak pahunchiye.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-100 to-teal-100 rounded-full flex items-center justify-center mb-4">
                  <benefit.icon className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-lg text-gray-800">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {benefit.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-lg p-8 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Start Earning?</h3>
          <p className="text-xl mb-6 text-blue-100">
            Registration bilkul free hai. Bas apne skills aur documents ready rakhiye.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
              onClick={() => setShowRegister(true)}
            >
              Partner Registration
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-blue-700 px-8 py-3 text-lg"
              asChild
            >
              <a href="tel:+917262927177">Call: +91-7262927177</a>
            </Button>
          </div>
          <p className="mt-4 text-blue-100 text-sm">
            * Terms & Conditions Apply
          </p>
        </div>
        <PartnerRegistrationForm open={showRegister} onClose={() => setShowRegister(false)} />
      </div>
    </section>
  );
};

export default PartnerSection;
