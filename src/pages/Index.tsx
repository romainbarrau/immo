import { useLanguage } from '@/contexts/LanguageContext';
import Bio from '@/components/Bio';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import PropertiesCarousel from '@/components/PropertiesCarousel';
import romainHero from '@/assets/romain-hero.png';
import creativeInterior from '@/assets/creative-interior.jpg';
const Index = () => {
  const { t, language } = useLanguage();

  return <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-hero-dark-blue pt-28 md:pt-8 pb-0">
        <div className="container mx-auto max-w-7xl px-4 md:px-8 lg:px-12 flex-1 flex items-stretch relative z-10">
          <div className="w-full relative flex flex-col">
            {/* Mobile: Center Content */}
            <div className="md:hidden flex-1 flex flex-col text-center text-foreground z-10 relative space-y-8">
              <div className="space-y-3">
                <h1 className="text-5xl font-display font-medium leading-tight">
                  Romain Barrau
                </h1>
                <p className="text-sm text-muted-foreground font-sans font-medium uppercase tracking-widest">
                  {language === 'en' ? 'Real Estate' : 'Immobilier à Bordeaux'}
                </p>
              </div>
              
              <p className="!mt-5 text-xl opacity-90 font-light leading-relaxed">
                {t('home.hero.title1')} <span className="italic font-serif">{t('home.hero.title2')}</span>{t('home.hero.title3')}
                <br />
                {t('home.hero.title4')} <span className="italic font-serif">{t('home.hero.title5')}</span>{t('home.hero.title6')}
              </p>

                <Button size="lg" className="mt-6 bg-shirt-blue hover:bg-shirt-blue/90 text-shirt-blue-foreground" onClick={() => window.location.href = `${import.meta.env.BASE_URL}contact`}>
                  {t('home.hero.cta')}
                </Button>
                <p className="!mt-6 font-sans text-sm text-muted-foreground">{t('home.stats.line')}</p>

              <div className="relative pt-8 !mt-auto">
                <div className="relative h-[400px] flex items-end justify-center">
                  <img 
                    src={romainHero} 
                    alt="Romain Barrau - Real Estate Agent" 
                    className="h-full w-auto object-contain object-bottom" 
                  />
                </div>
              </div>
            </div>

            {/* Desktop: Split Layout */}
            <div className="hidden md:grid md:flex-1 md:grid-cols-2 md:gap-12 lg:gap-16 items-stretch">
              {/* Left: Text Content */}
              <div className="self-center text-foreground space-y-8">
                <div className="space-y-3">
                  <h1 className="text-5xl lg:text-6xl xl:text-7xl font-display font-medium leading-tight">
                    Romain Barrau
                  </h1>
                  <p className="text-sm text-muted-foreground font-sans font-medium uppercase tracking-widest">
                    {language === 'en' ? 'Real Estate' : 'Immobilier à Bordeaux'}
                  </p>
                </div>
                
                <p className="!mt-5 text-2xl lg:text-3xl opacity-90 font-light leading-relaxed">
                  {t('home.hero.title1')} <span className="italic font-serif">{t('home.hero.title2')}</span>{t('home.hero.title3')}
                  <br />
                  {t('home.hero.title4')} <span className="italic font-serif">{t('home.hero.title5')}</span>{t('home.hero.title6')}
                </p>

              <Button size="lg" className="mt-6 bg-shirt-blue hover:bg-shirt-blue/90 text-shirt-blue-foreground" onClick={() => window.location.href = `${import.meta.env.BASE_URL}contact`}>
                {t('home.hero.cta')}
              </Button>
              <p className="!mt-6 font-sans text-sm text-muted-foreground">{t('home.stats.line')}</p>
              </div>

              {/* Right: Image */}
              <div className="relative self-end h-[650px] lg:h-[750px] xl:h-[800px] flex items-end justify-center">
                <img 
                  src={romainHero} 
                  alt="Romain Barrau - Real Estate Agent" 
                  className="h-full w-auto object-contain object-bottom relative z-10" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio */}
      <Bio />

      {/* Testimonials Section */}
      <TestimonialsCarousel />

      {/* Properties Carousel */}
      <PropertiesCarousel />

      {/* Inclusions Section */}
      <section className="py-8 md:py-12 px-4 md:px-8 lg:px-12 bg-background">
        <div className="container mx-auto max-w-7xl">
          <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden min-h-[500px] md:min-h-[600px] shadow-2xl">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img src={creativeInterior} alt="Creative interior space" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 md:p-12 lg:p-16 text-white h-full flex flex-col justify-center max-w-2xl">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display leading-tight mb-6">
                {t('home.inclusions.title')} <span className="italic font-serif">{t('home.inclusions.creative')}</span>{language === 'en' && ` ${t('home.inclusions.title2')}`}
              </h2>
              <p className="text-lg md:text-xl mb-4 leading-relaxed opacity-90">
                {t('home.inclusions.description1')}
              </p>
              <p className="text-lg md:text-xl mb-8 leading-relaxed opacity-90">
                {t('home.inclusions.description2')}
              </p>
              <Button size="lg" className="w-fit bg-background hover:bg-background/90 text-primary" onClick={() => window.location.href = `${import.meta.env.BASE_URL}videos`}>
                {t('home.inclusions.cta')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Index;