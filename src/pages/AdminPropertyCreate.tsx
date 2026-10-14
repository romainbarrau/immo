import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ImageUploadWithSort } from '@/components/admin/ImageUploadWithSort';

interface ImageItem {
  id: string;
  preview: string;
  file?: File;
  url?: string;
}

const AdminPropertyCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<ImageItem[]>([]);
  
  const [formData, setFormData] = useState({
    reference: '',
    title_fr: '',
    title_en: '',
    location_fr: '',
    location_en: '',
    price: '',
    description_fr: '',
    description_en: '',
    bedrooms: '',
    bathrooms: '',
    area_m2: '',
    land_area_m2: '',
    property_type: 'Apartment',
    status: 'available' as 'available' | 'sold' | 'reserved',
    video_url: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.reference || !formData.title_fr || !formData.price) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setLoading(true);

    try {
      // Insert property
      const { data: property, error: propertyError } = await supabase
        .from('properties')
        .insert({
          reference: formData.reference,
          title_fr: formData.title_fr,
          title_en: formData.title_en || formData.title_fr,
          location_fr: formData.location_fr,
          location_en: formData.location_en || formData.location_fr,
          price: parseFloat(formData.price),
          description_fr: formData.description_fr || null,
          description_en: formData.description_en || null,
          bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
          bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
          area_m2: formData.area_m2 ? parseFloat(formData.area_m2) : null,
          land_area_m2: formData.land_area_m2 ? parseFloat(formData.land_area_m2) : null,
          property_type: formData.property_type,
          status: formData.status,
          video_url: formData.video_url || null,
        })
        .select()
        .single();

      if (propertyError) throw propertyError;

      // Upload images
      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          const image = images[i];
          if (!image.file) continue;
          
          const fileExt = image.file.name.split('.').pop();
          const fileName = `${property.id}/${Date.now()}_${i}.${fileExt}`;

          const { error: uploadError } = await supabase.storage
            .from('property-images')
            .upload(fileName, image.file);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('property-images')
            .getPublicUrl(fileName);

          await supabase
            .from('property_images')
            .insert({
              property_id: property.id,
              image_url: publicUrl,
              display_order: i,
            });

          // Set main_image_url to first image
          if (i === 0) {
            await supabase
              .from('properties')
              .update({ main_image_url: publicUrl })
              .eq('id', property.id);
          }
        }
      }

      toast.success('Propriété créée avec succès');
      navigate('/listings');
    } catch (error) {
      console.error('Error creating property:', error);
      toast.error('Erreur lors de la création');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>

            <h1 className="text-3xl text-foreground mb-2 font-serif">Créer une propriété</h1>
            <p className="text-muted-foreground mb-8">
              Remplissez le formulaire pour ajouter une nouvelle propriété
            </p>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="bg-card p-6 rounded-lg border space-y-4">
                <h2 className="text-xl text-foreground font-sans font-medium">Informations de base</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="reference" className="text-foreground">Référence *</Label>
                    <Input
                      id="reference"
                      value={formData.reference}
                      onChange={(e) => handleInputChange('reference', e.target.value)}
                      placeholder="REF001"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="status" className="text-foreground">Statut *</Label>
                    <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Disponible</SelectItem>
                        <SelectItem value="sold">Vendu</SelectItem>
                        <SelectItem value="reserved">Réservé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="price" className="text-foreground">Prix (€) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      placeholder="450000"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="property_type" className="text-foreground">Type</Label>
                    <Select value={formData.property_type} onValueChange={(value) => handleInputChange('property_type', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Apartment">Appartement</SelectItem>
                        <SelectItem value="House">Maison</SelectItem>
                        <SelectItem value="Villa">Villa</SelectItem>
                        <SelectItem value="Land">Terrain</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Title and Location */}
              <div className="bg-card p-6 rounded-lg border space-y-4">
                <h2 className="text-xl text-foreground font-sans font-medium">Titre et Localisation</h2>
                
                <div>
                  <Label htmlFor="title_fr" className="text-foreground">Titre (FR) *</Label>
                  <Input
                    id="title_fr"
                    value={formData.title_fr}
                    onChange={(e) => handleInputChange('title_fr', e.target.value)}
                    placeholder="Appartement T2 moderne"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="title_en" className="text-foreground">Titre (EN)</Label>
                  <Input
                    id="title_en"
                    value={formData.title_en}
                    onChange={(e) => handleInputChange('title_en', e.target.value)}
                    placeholder="Modern T2 Apartment"
                  />
                </div>

                <div>
                  <Label htmlFor="location_fr" className="text-foreground">Localisation (FR)</Label>
                  <Input
                    id="location_fr"
                    value={formData.location_fr}
                    onChange={(e) => handleInputChange('location_fr', e.target.value)}
                    placeholder="Lisbonne, Portugal"
                  />
                </div>

                <div>
                  <Label htmlFor="location_en" className="text-foreground">Localisation (EN)</Label>
                  <Input
                    id="location_en"
                    value={formData.location_en}
                    onChange={(e) => handleInputChange('location_en', e.target.value)}
                    placeholder="Lisbon, Portugal"
                  />
                </div>
              </div>

              {/* Details */}
              <div className="bg-card p-6 rounded-lg border space-y-4">
                <h2 className="text-xl text-foreground font-sans font-medium">Détails</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="bedrooms" className="text-foreground">Chambres</Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      value={formData.bedrooms}
                      onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                      placeholder="2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="bathrooms" className="text-foreground">Salles de bain</Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      value={formData.bathrooms}
                      onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                      placeholder="1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="area_m2" className="text-foreground">Surface (m²)</Label>
                    <Input
                      id="area_m2"
                      type="number"
                      value={formData.area_m2}
                      onChange={(e) => handleInputChange('area_m2', e.target.value)}
                      placeholder="85"
                    />
                  </div>

                  <div>
                    <Label htmlFor="land_area_m2" className="text-foreground">Terrain (m²)</Label>
                    <Input
                      id="land_area_m2"
                      type="number"
                      value={formData.land_area_m2}
                      onChange={(e) => handleInputChange('land_area_m2', e.target.value)}
                      placeholder="120"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="video_url" className="text-foreground">URL Vidéo</Label>
                  <Input
                    id="video_url"
                    value={formData.video_url}
                    onChange={(e) => handleInputChange('video_url', e.target.value)}
                    placeholder="https://youtube.com/..."
                  />
                </div>
              </div>

              {/* Description */}
              <div className="bg-card p-6 rounded-lg border space-y-4">
                <h2 className="text-xl text-foreground font-sans font-medium">Description</h2>
                
                <div>
                  <Label htmlFor="description_fr" className="text-foreground">Description (FR)</Label>
                  <Textarea
                    id="description_fr"
                    value={formData.description_fr}
                    onChange={(e) => handleInputChange('description_fr', e.target.value)}
                    rows={4}
                    placeholder="Description en français..."
                  />
                </div>

                <div>
                  <Label htmlFor="description_en" className="text-foreground">Description (EN)</Label>
                  <Textarea
                    id="description_en"
                    value={formData.description_en}
                    onChange={(e) => handleInputChange('description_en', e.target.value)}
                    rows={4}
                    placeholder="Description in English..."
                  />
                </div>
              </div>

              {/* Images */}
              <div className="bg-card p-6 rounded-lg border space-y-4">
                <h2 className="text-xl text-foreground font-sans font-medium">Photos</h2>
                <ImageUploadWithSort images={images} onImagesChange={setImages} />
              </div>

              {/* Submit */}
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                  disabled={loading}
                  className="flex-1"
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Création...
                    </>
                  ) : (
                    'Créer la propriété'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminPropertyCreate;
