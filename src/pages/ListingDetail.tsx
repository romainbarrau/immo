import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, Loader2 } from 'lucide-react';
import { useProperty } from '@/hooks/useProperties';
import ImageGallery from '@/components/ImageGallery';
import { ReactNode } from 'react';
import { splitTitle, placeOf } from '@/lib/propertyText';

// Lines starting with "- " become a real bulleted list; other lines stay as text
const descriptionBlocks = (text: string | null | undefined) => {
  if (!text) return null;
  const blocks: ReactNode[] = [];
  let items: string[] = [];
  let lines: string[] = [];
  const flushItems = () => {
    if (items.length) blocks.push(
      <ul key={blocks.length} className="list-disc pl-5 space-y-2">
        {items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    );
    items = [];
  };
  const flushLines = () => {
    if (lines.join('').trim()) blocks.push(<p key={blocks.length} className="whitespace-pre-line">{lines.join('\n').trim()}</p>);
    lines = [];
  };
  for (const line of text.split('\n')) {
    const bullet = line.match(/^\s*-\s+(.*)$/);
    if (bullet) { flushLines(); items.push(bullet[1]); }
    else { flushItems(); lines.push(line); }
  }
  flushItems(); flushLines();
  return blocks;
};

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
  const isSold = property?.status === 'sold';
  
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
  const fr = language === 'fr';
  const title = fr ? property.title_fr : property.title_en;
  const location = fr ? property.location_fr : property.location_en;
  const m2 = (n: number) => `${n.toLocaleString('fr-FR')}\u00A0m²`;
  const label = (n: number, one: string, many: string) => (n === 1 ? one : many);
  // Value and label of each known characteristic (bedrooms, bathrooms, area, land)
  const facts = [
    property.bedrooms ? { value: String(property.bedrooms), label: label(property.bedrooms, fr ? 'Chambre' : 'Bedroom', fr ? 'Chambres' : 'Bedrooms') } : null,
    property.bathrooms ? { value: String(property.bathrooms), label: label(property.bathrooms, fr ? 'Salle de bain' : 'Bathroom', fr ? 'Salles de bain' : 'Bathrooms') } : null,
    property.area_m2 ? { value: m2(property.area_m2), label: fr ? 'Surface' : 'Area' } : null,
    property.land_area_m2 ? { value: m2(property.land_area_m2), label: fr ? 'Terrain' : 'Land' } : null,
  ].filter(Boolean) as { value: string; label: string }[];

  return <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto max-w-6xl px-4 md:px-6 py-16 pt-24">
        <Button variant="ghost" className="mb-4" onClick={() => navigate('/listings')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {language === 'fr' ? 'Retour aux biens' : 'Back to properties'}
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-12 items-start mb-12">
          <div className="lg:sticky lg:top-24">
            {galleryImages.length > 0 ? (
              <ImageGallery 
                images={galleryImages}
                altText={language === 'fr' ? property.title_fr : property.title_en}
              />
            ) : (
              <div className="aspect-[4/3] bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">
                  {language === 'fr' ? 'Aucune image disponible' : 'No images available'}
                </p>
              </div>
            )}
            {/* Desktop: WhatsApp button under the photos, on the left (on mobile it stays after the description) */}
            {!isSold && (
              <Button asChild size="lg" className="mt-6 hidden lg:inline-flex bg-shirt-blue hover:bg-shirt-blue/90 text-shirt-blue-foreground">
                <a href="https://wa.me/33669119336?text=Bonjour%20Romain" target="_blank" rel="noopener noreferrer">
                  {language === 'fr' ? 'Écrire sur WhatsApp' : 'Message on WhatsApp'}
                </a>
              </Button>
            )}
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl font-display font-normal text-foreground">
              {splitTitle(title).type}
            </h1>
            <p className="mt-2 text-base text-[#6B665E]">{placeOf(title, location)}</p>

            <div className="mt-2 flex items-center gap-3 text-xl font-normal text-[#1C1A17]">
                <span>{property.price.toLocaleString('fr-FR')}{'\u00A0'}€</span>
                {isSold && (
                  <span className="rounded-sm bg-primary px-2 py-1 text-sm font-display font-normal leading-none text-primary-foreground">
                    {t('sold.label')}
                  </span>
                )}
            </div>

            {facts.length > 0 && (
              <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-6">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <p className="text-lg font-normal text-[#1C1A17]">{fact.value}</p>
                    <p className="text-xs text-[#6B665E]">{fact.label}</p>
                  </div>
                ))}
              </div>
            )}

            {(property.description_fr || property.description_en) && <div className="mt-6">
                <h3 className="mb-4 font-display font-normal text-xl text-[#1C1A17]">
                  {language === 'fr' ? 'Description' : 'Description'}
                </h3>
                <div className="space-y-3 text-base text-foreground/90 leading-relaxed">
                  {descriptionBlocks(language === 'fr' ? property.description_fr : property.description_en)}
                </div>
              </div>}

            {property.characteristics && Object.keys(property.characteristics).length > 0 && <div className="mt-6">
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

            {!isSold && (
              <Button asChild size="lg" className="mt-6 lg:hidden bg-shirt-blue hover:bg-shirt-blue/90 text-shirt-blue-foreground">
                <a href="https://wa.me/33669119336?text=Bonjour%20Romain" target="_blank" rel="noopener noreferrer">
                  {language === 'fr' ? 'Écrire sur WhatsApp' : 'Message on WhatsApp'}
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>;
};
export default ListingDetail;