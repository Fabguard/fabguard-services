import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PartnerRegistrationData {
  name: string;
  phone: string;
  email: string;
  city: string;
  skills: string;
  experience: string;
  message: string;
}

export function usePartnerRegistration() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const registerPartner = async (data: PartnerRegistrationData) => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('partner_registrations')
        .insert({
          name: data.name,
          phone: data.phone,
          email: data.email || null,
          city: data.city,
          skills: data.skills,
          experience: data.experience || null,
          message: data.message || null,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Registration Submitted!",
        description: "Thank you for registering as a Fabguard partner. Our team will reach out to you soon.",
        duration: 5000,
      });

      return true;
    } catch (error) {
      console.error('Error registering partner:', error);
      toast({
        title: "Registration Failed",
        description: "There was an error processing your registration. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    registerPartner,
    isLoading
  };
}