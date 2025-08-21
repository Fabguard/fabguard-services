import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export function useContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const submitContactForm = async (data: ContactFormData) => {
    setIsLoading(true);
    
    try {
      const { data: result, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message
        }
      });

      if (error) throw error;

      if (result?.success) {
        toast({
          title: "Thank you!",
          description: "Your message has been sent. We'll get back to you soon.",
        });
        return true;
      } else {
        throw new Error(result?.error || "Failed to send message");
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submitContactForm,
    isLoading
  };
}