import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, message } = await req.json();
    
    console.log("Received contact form submission:", { name, email });

    // Get webhook URL from environment
    const webhookUrl = Deno.env.get('N8N_WEBHOOK_URL');
    
    if (!webhookUrl) {
      console.error("N8N_WEBHOOK_URL not configured");
      return new Response(
        JSON.stringify({ error: 'Webhook not configured' }), 
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Send data to N8N webhook
    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        message,
        timestamp: new Date().toISOString(),
        source: 'Contact Form - Romain Barrau Real Estate',
      }),
    });

    console.log("N8N webhook response status:", webhookResponse.status);

    if (!webhookResponse.ok) {
      throw new Error(`Webhook responded with status: ${webhookResponse.status}`);
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Form submitted successfully' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in contact-form function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
