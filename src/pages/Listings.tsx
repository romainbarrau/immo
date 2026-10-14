import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { useProperties } from '@/hooks/useProperties';
import { Loader2 } from 'lucide-react';

const Listings = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { data: properties, isLoading } = useProperties('available');

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-4 md:px-6 py-20 pt-32">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-serif leading-[1.05] tracking-tight mb-4 text-foreground">
            {t('listings.title')}
          </h1>
          <p className="text-xl text-foreground/90">
            {t('listings.subtitle')}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : properties && properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property, index) => (
              <div 
                key={property.id}
                className="animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <PropertyCard
                  image={property.main_image_url || ''}
                  title={language === 'fr' ? property.title_fr : property.title_en}
                  location={language === 'fr' ? property.location_fr : property.location_en}
                  price={property.price.toLocaleString('fr-FR')}
                  onClick={() => navigate(`/listings/${property.id}`)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-foreground/90">
              {language === 'fr' ? 'Aucune propriété disponible pour le moment' : 'No properties available at the moment'}
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Listings;
