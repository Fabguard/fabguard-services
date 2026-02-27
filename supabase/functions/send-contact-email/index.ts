import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ContactFormRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, message }: ContactFormRequest = await req.json();

    console.log('Received contact form submission:', { name, email, phone: phone || 'Not provided' });

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Store the submission in database
    const { data: submission, error: dbError } = await supabase
      .from('contact_submissions')
      .insert({
        name,
        email,
        phone: phone || null,
        message,
        status: 'pending'
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Failed to save contact submission');
    }

    console.log('Contact submission saved to database:', submission.id);

    // Send confirmation email to customer
    const customerEmailResponse = await resend.emails.send({
      from: "Fabguard <info@fabguard.co.in>",
      to: [email],
      subject: "Thank you for contacting Fabguard!",
      html: `
        <h1>Thank you for reaching out to Fabguard!</h1>
        <p>Dear ${name},</p>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p><strong>Your message:</strong></p>
        <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">${message}</p>
        <p>Our team typically responds within 24 hours. If you have any urgent queries, please call us at +91 7262927177.</p>
        <p>Best regards,<br>The Fabguard Team</p>
        <hr>
        <p style="font-size: 12px; color: #666;">
          This is an automated response. Please do not reply to this email.
        </p>
      `,
    });

    // Send notification email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "Fabguard Website <info@fabguard.co.in>",
      to: ["info@fabguard.co.in", "fabguard.in@gmail.com"],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">${message}</p>
        <hr>
        <p style="font-size: 12px; color: #666;">
          Submission ID: ${submission.id}<br>
          Submitted at: ${new Date().toLocaleString()}
        </p>
      `,
    });

    console.log("Customer email sent successfully:", customerEmailResponse);
    console.log("Admin email sent successfully:", adminEmailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Contact form submitted successfully",
      submissionId: submission.id 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Internal server error" 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);