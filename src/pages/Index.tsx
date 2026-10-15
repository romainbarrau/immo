import { useLanguage } from '@/contexts/LanguageContext';
import Bio from '@/components/Bio';
import ContactCta from '@/components/ContactCta';
import CreativeVideos from '@/components/CreativeVideos';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import PropertiesCarousel from '@/components/PropertiesCarousel';
import romainHero from '@/assets/romain-hero.png';
const Index = () => {
  const { t, language } = useLanguage();

  return <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-hero-dark-blue pt-28 md:pt-0 pb-0">
        <div className="container mx-auto max-w-7xl px-4 md:px-8 lg:px-12 flex-1 flex items-stretch relative z-10">
          <div className="w-full relative flex flex-col">
            {/* Mobile: Center Content */}
            <div className="md:hidden flex-1 flex flex-col text-center text-foreground z-10 relative space-y-8">
              <div className="space-y-3">
                <h1 className="text-5xl font-display font-medium leading-tight">
                  Romain Barrau
                </h1>
                <p className="text-lg text-muted-foreground font-sans font-normal">
                  {language === 'en' ? 'Real Estate' : 'Immobilier à Bordeaux'}
                </p>
              </div>
              
              <p className="!mt-5 text-xl opacity-90 font-normal leading-relaxed">
                {t('home.hero.title1')} {t('home.hero.title2')}{t('home.hero.title3')}
                <br />
                {t('home.hero.title4')} {t('home.hero.title5')}{t('home.hero.title6')}
              </p>

                <Button asChild size="lg" className="mt-6 bg-shirt-blue hover:bg-shirt-blue/90 text-shirt-blue-foreground">
                  <a href="https://wa.me/33669119336?text=Bonjour%20Romain" target="_blank" rel="noopener noreferrer">{t('home.hero.whatsapp')}</a>
                </Button>
                <p className="!mt-6 font-sans text-sm text-muted-foreground">{t('home.stats.line')}</p>

              <div className="relative pt-8 !mt-auto">
                <div className="relative flex items-end justify-center">
                  <img 
                    src={romainHero} 
                    alt="Romain Barrau - Real Estate Agent" 
                    className="w-full h-auto object-contain object-bottom" 
                  />
                </div>
              </div>
            </div>

            {/* Desktop: Split Layout */}
            <div className="hidden md:grid md:flex-1 md:grid-cols-[minmax(0,1fr)_auto] md:gap-12 lg:gap-16 items-stretch">
              {/* Left: Text Content */}
              <div className="self-center text-foreground space-y-8">
                <div className="space-y-3">
                  <h1 className="text-5xl lg:text-6xl xl:text-7xl font-display font-medium leading-tight">
                    Romain Barrau
                  </h1>
                  <p className="text-lg text-muted-foreground font-sans font-normal">
                    {language === 'en' ? 'Real Estate' : 'Immobilier à Bordeaux'}
                  </p>
                </div>
                
                <p className="!mt-5 text-2xl lg:text-3xl opacity-90 font-normal leading-relaxed">
                  {t('home.hero.title1')} {t('home.hero.title2')}{t('home.hero.title3')}
                  <br />
                  {t('home.hero.title4')} {t('home.hero.title5')}{t('home.hero.title6')}
                </p>

              <Button asChild size="lg" className="mt-6 bg-shirt-blue hover:bg-shirt-blue/90 text-shirt-blue-foreground">
                <a href="https://wa.me/33669119336?text=Bonjour%20Romain" target="_blank" rel="noopener noreferrer">{t('home.hero.whatsapp')}</a>
              </Button>
              <p className="!mt-6 font-sans text-sm text-muted-foreground">{t('home.stats.line')}</p>
              </div>

              {/* Right: Image */}
              <div className="relative self-end h-screen max-w-[55vw] flex items-end justify-center">
                <img 
                  src={romainHero} 
                  alt="Romain Barrau - Real Estate Agent" 
                  className="h-full w-auto max-w-full object-contain object-bottom relative z-10" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsCarousel />

      {/* Properties Carousel */}
      <PropertiesCarousel />

      {/* Bio */}
      <Bio />

      {/* Creative universe: video carousel */}
      <CreativeVideos />

      {/* Call to action */}
      <ContactCta />

      <Footer flush />
    </div>;
};
export default Index;