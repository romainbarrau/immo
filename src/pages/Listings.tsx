import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { useProperties, Property } from '@/hooks/useProperties';
import { Loader2 } from 'lucide-react';

const WHATSAPP_URL = 'https://wa.me/33669119336';

const Listings = () => {
  const { t, language } = useLanguage();
  const { data: forSale, isLoading: loadingForSale } = useProperties('available');
  const { data: sold, isLoading: loadingSold } = useProperties('sold');

  const renderGrid = (properties: Property[], soldLabel: boolean) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
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
            soldLabel={soldLabel}
            to={`/listings/${property.id}`}
          />
        </div>
      ))}
    </div>
  );

  const loader = (
    <div className="flex justify-center items-center py-20">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
    </div>
  );

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="container mx-auto px-4 md:px-6 py-20 pt-32">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-4 text-foreground">
            {t('listings.title')}
          </h1>
          <p className="text-xl text-foreground/90">
            {t('listings.subtitle')}
          </p>
        </div>

        {/* For sale */}
        <section>
          <h2 className="text-3xl md:text-4xl font-display font-medium text-foreground mb-8">
            {t('listings.forSale')}
          </h2>
          {loadingForSale ? loader : forSale && forSale.length > 0 ? (
            renderGrid(forSale, false)
          ) : (
            <p className="text-base text-muted-foreground">
              {t('listings.empty')}{' '}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4 hover:text-accent-warm">
                {t('listings.emptyCta')}
              </a>{' '}
              {t('listings.emptyEnd')}
            </p>
          )}
        </section>

        {/* Sold */}
        <section className="mt-20 md:mt-28">
          <h2 className="text-3xl md:text-4xl font-display font-medium text-foreground mb-8">
            {t('listings.sold')}
          </h2>
          {loadingSold ? loader : sold && sold.length > 0 ? renderGrid(sold, true) : null}
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Listings;
