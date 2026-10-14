import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { useProperties } from '@/hooks/useProperties';
import { Loader2 } from 'lucide-react';

const SoldProperties = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { data: soldProperties, isLoading } = useProperties('sold');

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-4 md:px-6 py-20 pt-32">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-4 text-foreground">
            {t('sold.title')}
          </h1>
          <p className="text-xl text-foreground/90">
            {t('sold.subtitle')}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : soldProperties && soldProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {soldProperties.map((property, index) => (
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
                  sold={true}
                  onClick={() => navigate(`/listings/${property.id}`)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-foreground/90">
              {language === 'fr' ? 'Aucune propriété vendue à afficher' : 'No sold properties to display'}
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default SoldProperties;
