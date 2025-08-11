import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { RegistrationFormValues } from '@/components/MembershipRegistrationModal';

export function useMembershipRegistration() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const registerMembership = async (
    values: RegistrationFormValues, 
    membershipId: number,
    membershipName: string
  ) => {
    setIsLoading(true);
    
    try {
      // Calculate start and end dates
      const startDate = new Date().toISOString().split('T')[0];
      const endDate = new Date();
      endDate.setFullYear(endDate.getFullYear() + 1);
      const endDateString = endDate.toISOString().split('T')[0];

      // First, check if customer already exists
      let customerId;
      const { data: existingCustomer } = await supabase
        .from('customers')
        .select('id')
        .eq('email', values.email)
        .maybeSingle();

      if (existingCustomer) {
        customerId = existingCustomer.id;
      } else {
        // Create new customer
        const { data: newCustomer, error: customerError } = await supabase
          .from('customers')
          .insert({
            name: values.name,
            email: values.email,
            phone: values.phone
          })
          .select('id')
          .single();

        if (customerError) throw customerError;
        customerId = newCustomer.id;
      }

      // Insert membership registration
      const { error: membershipError } = await supabase
        .from('customer_memberships')
        .insert({
          customer_id: customerId,
          membership_id: membershipId,
          start_date: startDate,
          end_date: endDateString,
          referral_code: values.code || null,
          is_active: false // Set to false initially, admin will activate after verification
        });

      if (membershipError) throw membershipError;

      toast({
        title: "Registration Successful!",
        description: `Thank you for registering for ${membershipName}. We'll contact you soon to complete the process.`,
      });

      return true;
    } catch (error) {
      console.error('Error registering membership:', error);
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
    registerMembership,
    isLoading
  };
}