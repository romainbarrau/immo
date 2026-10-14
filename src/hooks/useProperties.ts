import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Property {
  id: string;
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
  land_area_m2?: number;
  property_type?: string;
  status: 'available' | 'sold' | 'reserved';
  characteristics?: any;
  main_image_url?: string;
  video_url?: string;
  created_at: string;
  updated_at: string;
}

export interface PropertyImage {
  id: string;
  property_id: string;
  image_url: string;
  display_order: number;
  created_at: string;
}

export const useProperties = (status?: 'available' | 'sold' | 'reserved') => {
  return useQuery({
    queryKey: ['properties', status],
    queryFn: async () => {
      let query = supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (status) {
        query = query.eq('status', status);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as Property[];
    },
  });
};

export const useProperty = (id: string) => {
  return useQuery({
    queryKey: ['property', id],
    queryFn: async () => {
      const { data: property, error: propertyError } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();
      
      if (propertyError) throw propertyError;
      
      const { data: images, error: imagesError } = await supabase
        .from('property_images')
        .select('*')
        .eq('property_id', id)
        .order('display_order', { ascending: true });
      
      if (imagesError) throw imagesError;
      
      return {
        property: property as Property,
        images: images as PropertyImage[],
      };
    },
    enabled: !!id,
  });
};
