import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, message } = await req.json();

    if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string' ||
        !name.trim() || !email.trim() || !message.trim()) {
      return new Response(
        JSON.stringify({ error: 'Missing name, email or message' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log("Received contact form submission:", { name, email });

    // Messages are emailed to Romain through Resend
    const apiKey = Deno.env.get('RESEND_API_KEY');
    const to = Deno.env.get('CONTACT_TO_EMAIL');

    if (!apiKey || !to) {
      console.error("RESEND_API_KEY or CONTACT_TO_EMAIL not configured");
      return new Response(
        JSON.stringify({ error: 'Email not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Site Romain Barrau <onboarding@resend.dev>',
        to: [to],
        reply_to: email,
        subject: `Nouveau message du site - ${name}`.slice(0, 200),
        html: `<p><strong>Nom :</strong> ${escapeHtml(name)}</p>
<p><strong>E-mail :</strong> ${escapeHtml(email)}</p>
<p><strong>Message :</strong></p>
<p style="white-space: pre-wrap">${escapeHtml(message)}</p>
<hr><p style="color:#888">Envoyé depuis le formulaire de contact - Romain Barrau Real Estate - ${new Date().toISOString()}</p>`,
      }),
    });

    console.log("Resend response status:", resendResponse.status);

    if (!resendResponse.ok) {
      throw new Error(`Resend responded with status: ${resendResponse.status} ${await resendResponse.text()}`);
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Form submitted successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in contact-form function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
