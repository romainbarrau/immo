import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

// Closing call to action of the home page
const ContactCta = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-[#F3EFE8] py-20 md:py-24 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl font-display font-medium text-foreground">
          {t('cta.title')}
        </h2>
        <p className="mt-3 font-sans text-lg text-muted-foreground">
          {t('cta.subtitle')}
        </p>
        <Button asChild size="lg" className="mt-8 bg-shirt-blue hover:bg-shirt-blue/90 text-shirt-blue-foreground">
          <a href="https://wa.me/33669119336?text=Bonjour%20Romain" target="_blank" rel="noopener noreferrer">
            {t('home.hero.whatsapp')}
          </a>
        </Button>
      </div>
    </section>
  );
};

export default ContactCta;
