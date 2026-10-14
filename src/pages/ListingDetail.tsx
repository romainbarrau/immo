import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, Euro, Home, Bed, Bath, Square, ArrowLeft, Loader2, Trees } from 'lucide-react';
import { useProperty } from '@/hooks/useProperties';
import ImageGallery from '@/components/ImageGallery';
const ListingDetail = () => {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const {
    t,
    language
  } = useLanguage();
  const {
    data,
    isLoading
  } = useProperty(id || '');
  if (isLoading) {
    return <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto px-4 py-20 pt-32 flex justify-center items-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
        <Footer />
      </div>;
  }
  const property = data?.property;
  const images = data?.images || [];
  
  // Si pas d'images dans la galerie mais une image principale, on l'utilise
  const galleryImages = images.length > 0 
    ? images 
    : property?.main_image_url 
      ? [{ id: 'main', image_url: property.main_image_url, display_order: 0, property_id: property.id, created_at: '' }]
      : [];
  if (!property) {
    return <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto px-4 py-20 pt-32 text-center">
          <h1 className="text-4xl font-display font-bold mb-4 text-foreground">Listing not found</h1>
          <Button onClick={() => navigate('/listings')}>Back to Listings</Button>
        </div>
        <Footer />
      </div>;
  }
  return <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-4 md:px-6 py-20 pt-32">
        <Button variant="ghost" className="mb-6" onClick={() => navigate('/listings')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {language === 'fr' ? 'Retour aux listings' : 'Back to listings'}
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            {galleryImages.length > 0 ? (
              <ImageGallery 
                images={galleryImages}
                altText={language === 'fr' ? property.title_fr : property.title_en}
              />
            ) : (
              <div className="aspect-[16/10] bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">
                  {language === 'fr' ? 'Aucune image disponible' : 'No images available'}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-foreground/80 mb-1">
                {language === 'fr' ? 'Réf.' : 'Ref.'} {property.reference}
              </p>
              <h1 className="text-4xl font-display font-bold mb-2 text-foreground">
                {language === 'fr' ? property.title_fr : property.title_en}
              </h1>
              <div className="flex items-center text-foreground/80 mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="text-lg">{language === 'fr' ? property.location_fr : property.location_en}</span>
              </div>
              <div className="flex items-center text-foreground font-bold text-3xl">
                <Euro className="h-8 w-8 mr-2" />
                <span>{property.price.toLocaleString('fr-FR')} €</span>
              </div>
            </div>

            <Card className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {property.bedrooms && <div className="flex flex-col items-center">
                    <Bed className="h-6 w-6 mb-2 text-foreground" />
                    <span className="font-semibold text-foreground">{property.bedrooms}</span>
                    <span className="text-sm text-foreground/80">
                      {language === 'fr' ? 'Chambres' : 'Bedrooms'}
                    </span>
                  </div>}
                {property.bathrooms && <div className="flex flex-col items-center">
                    <Bath className="h-6 w-6 mb-2 text-foreground" />
                    <span className="font-semibold text-foreground">{property.bathrooms}</span>
                    <span className="text-sm text-foreground/80">
                      {language === 'fr' ? 'Salles de bain' : 'Bathrooms'}
                    </span>
                  </div>}
                {property.area_m2 && <div className="flex flex-col items-center">
                    <Square className="h-6 w-6 mb-2 text-foreground" />
                    <span className="font-semibold text-foreground">{property.area_m2} m²</span>
                    <span className="text-sm text-foreground/80">
                      {language === 'fr' ? 'Surface' : 'Area'}
                    </span>
                  </div>}
                {property.land_area_m2 && <div className="flex flex-col items-center">
                    <Trees className="h-6 w-6 mb-2 text-foreground" />
                    <span className="font-semibold text-foreground">{property.land_area_m2.toLocaleString('fr-FR')} m²</span>
                    <span className="text-sm text-foreground/80">
                      {language === 'fr' ? 'Terrain' : 'Land'}
                    </span>
                  </div>}
              </div>
            </Card>

            {(property.description_fr || property.description_en) && <div>
                <h2 className="text-2xl font-display font-semibold mb-3 text-foreground">
                  {language === 'fr' ? 'Description' : 'Description'}
                </h2>
                <p className="text-foreground/90 leading-relaxed whitespace-pre-line">
                  {language === 'fr' ? property.description_fr : property.description_en}
                </p>
              </div>}

            {property.characteristics && Object.keys(property.characteristics).length > 0 && <div>
                <h2 className="text-2xl font-display font-semibold mb-3 text-foreground">
                  {language === 'fr' ? 'Caractéristiques' : 'Features'}
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(property.characteristics).map(([key, value]) => <div key={key} className="flex items-center">
                      <div className="w-2 h-2 bg-foreground rounded-full mr-3"></div>
                      <span className="text-foreground">{value as string}</span>
                    </div>)}
                </div>
              </div>}

            <Button className="w-full" size="lg" onClick={() => navigate('/contact')}>
              {language === 'fr' ? 'Contactez-nous' : 'Contact us'}
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>;
};
export default ListingDetail;