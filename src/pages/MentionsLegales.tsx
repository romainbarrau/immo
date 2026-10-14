import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

// Placeholder page: legal notice content still to be written
const MentionsLegales = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="container mx-auto px-4 md:px-6 py-20 pt-32">
        <h1 className="text-4xl md:text-5xl font-display font-medium text-foreground">
          {t('footer.legal')}
        </h1>
      </div>

      <Footer />
    </div>
  );
};

export default MentionsLegales;
