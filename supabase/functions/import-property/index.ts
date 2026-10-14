import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.76.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PropertyData {
  reference: string;
  title_fr: string;
  title_en: string;
  location_fr: string;
  location_en: string;
  price: number;
  description_fr?: string;
  description_en?: string;
  bedrooms?: number;
  bathrooms?: number;
  area_m2?: number;
  property_type?: string;
  main_image_url?: string;
  images: string[];
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get JWT from Authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.log('No authorization header provided');
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create client with user's JWT for auth check
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser();
    if (authError || !user) {
      console.log('Authentication failed:', authError?.message);
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check admin role using has_role function
    const { data: isAdmin, error: roleError } = await supabaseAuth.rpc('has_role', {
      _user_id: user.id,
      _role: 'admin'
    });

    if (roleError || !isAdmin) {
      console.log('Admin check failed for user:', user.id, roleError?.message);
      return new Response(
        JSON.stringify({ error: 'Forbidden - Admin access required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Admin access verified for user:', user.id);

    const { url } = await req.json();
    
    if (!url || !url.includes('seedrealestate.pt')) {
      return new Response(
        JSON.stringify({ error: 'URL invalide' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Fetching property from:', url);
    
    // Fetch the property page
    const response = await fetch(url);
    const html = await response.text();
    
    // Parse property data
    const propertyData = parsePropertyData(html, url);
    
    if (!propertyData) {
      return new Response(
        JSON.stringify({ error: 'Impossible de parser les données' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client with service role for database operations
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if property already exists
    const { data: existing } = await supabase
      .from('properties')
      .select('id')
      .eq('reference', propertyData.reference)
      .single();

    if (existing) {
      return new Response(
        JSON.stringify({ error: 'Propriété déjà existante', reference: propertyData.reference }),
        { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Insert property
    const { data: property, error: propertyError } = await supabase
      .from('properties')
      .insert({
        reference: propertyData.reference,
        title_fr: propertyData.title_fr,
        title_en: propertyData.title_en,
        location_fr: propertyData.location_fr,
        location_en: propertyData.location_en,
        price: propertyData.price,
        description_fr: propertyData.description_fr,
        description_en: propertyData.description_en,
        bedrooms: propertyData.bedrooms,
        bathrooms: propertyData.bathrooms,
        area_m2: propertyData.area_m2,
        property_type: propertyData.property_type,
        main_image_url: propertyData.main_image_url,
        status: 'available',
      })
      .select()
      .single();

    if (propertyError) throw propertyError;

    console.log('Property created:', property.id);

    // Download and upload images in background
    const imageUploadPromises = propertyData.images.map(async (imageUrl, index) => {
      try {
        console.log(`Downloading image ${index + 1}/${propertyData.images.length}`);
        const imageResponse = await fetch(imageUrl);
        const imageBlob = await imageResponse.blob();
        
        const fileExt = imageUrl.split('.').pop()?.split('?')[0] || 'jpg';
        const fileName = `${property.id}/${Date.now()}_${index}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('property-images')
          .upload(fileName, imageBlob, {
            contentType: imageResponse.headers.get('content-type') || 'image/jpeg',
          });

        if (uploadError) {
          console.error('Upload error:', uploadError);
          return null;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('property-images')
          .getPublicUrl(fileName);

        await supabase
          .from('property_images')
          .insert({
            property_id: property.id,
            image_url: publicUrl,
            display_order: index,
          });

        console.log(`Image ${index + 1} uploaded successfully`);
        return publicUrl;
      } catch (error) {
        console.error(`Error uploading image ${index}:`, error);
        return null;
      }
    });

    const uploadedImages = await Promise.all(imageUploadPromises);
    const firstUploadedImage = uploadedImages.find(url => url !== null);

    // Update main_image_url with first uploaded image if available
    if (firstUploadedImage) {
      await supabase
        .from('properties')
        .update({ main_image_url: firstUploadedImage })
        .eq('id', property.id);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        property: {
          id: property.id,
          reference: property.reference,
          title: propertyData.title_fr,
        }
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function parsePropertyData(html: string, url: string): PropertyData | null {
  try {
    // Extract reference - handle spaces and dashes
    const refMatch = html.match(/Ref\.\s*Nº:\s*([A-Z0-9\s-]+?)(?:\s*<|$)/i);
    const reference = refMatch ? refMatch[1].trim().replace(/\s+/g, '') : '';

    // Extract title - handle various formats including <h2><em>title</em></h2>
    const titleMatch = html.match(/<h2[^>]*>\s*<em>\s*([^<]+?)\s*<\/em>\s*<\/h2>/i) ||
                      html.match(/<h2[^>]*>_([^<]+)_<\/h2>/i) ||
                      html.match(/##\s*_([^_]+)_/i);
    const title = titleMatch ? titleMatch[1].trim() : '';

    // Extract location
    const locationMatch = html.match(/<h5[^>]*>([^<]+)<\/h5>/i);
    const location = locationMatch ? locationMatch[1].trim() : '';

    // Extract price
    const priceMatch = html.match(/(\d+(?:\.\d+)*)€/);
    const price = priceMatch ? parseFloat(priceMatch[1].replace(/\./g, '')) : 0;

    // Extract bedrooms (English and Portuguese)
    const bedroomsMatch = html.match(/(?:Quarto\(s\)\s*:?\s*|(\d+)\s*beds?)\s*(\d+)/i);
    const bedrooms = bedroomsMatch ? parseInt(bedroomsMatch[2] || bedroomsMatch[1]) : undefined;

    // Extract bathrooms (English and Portuguese)
    const bathroomsMatch = html.match(/(?:Casa\(s\)\s*de\s*Banho\s*:?\s*|(\d+)\s*baths?)\s*(\d+)/i);
    const bathrooms = bathroomsMatch ? parseInt(bathroomsMatch[2] || bathroomsMatch[1]) : undefined;

    // Extract area (handles decimal numbers for Portuguese format)
    const areaMatch = html.match(/(?:Área\s+(?:Bruta|Útil)\s*:?\s*)?(\d+(?:\.\d+)?)\s*m[²2]/i);
    const area_m2 = areaMatch ? parseFloat(areaMatch[1]) : undefined;

    // Extract images
    const imageMatches = html.matchAll(/https:\/\/www\.seedrealestate\.pt\/storage\/media\/[^"'\s)]+\.(jpg|jpeg|png|webp)/gi);
    const images = Array.from(imageMatches).map(match => match[0]);
    const uniqueImages = [...new Set(images)];

    // Extract description (basic extraction)
    const descMatch = html.match(/<p[^>]*class="[^"]*description[^"]*"[^>]*>([^<]+)<\/p>/i);
    const description = descMatch ? descMatch[1].trim() : '';

    if (!reference || !title || !price) {
      console.error('Missing required fields:', { reference, title, price });
      return null;
    }

    return {
      reference,
      title_fr: title,
      title_en: title,
      location_fr: location,
      location_en: location,
      price,
      description_fr: description || undefined,
      description_en: description || undefined,
      bedrooms,
      bathrooms,
      area_m2,
      property_type: 'Apartment',
      main_image_url: uniqueImages[0],
      images: uniqueImages,
    };
  } catch (error) {
    console.error('Parse error:', error);
    return null;
  }
}
