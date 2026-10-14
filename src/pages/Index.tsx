import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import PropertiesCarousel from '@/components/PropertiesCarousel';
import VideoSection from '@/components/VideoSection';
import romainHero from '@/assets/romain-hero.png';

const Index = () => {
  const { t, language } = useLanguage();

  return <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-hero text-hero-foreground h-[100svh] min-h-[600px] flex flex-col pt-20">
        {/* Border Frame */}
        <div className="absolute inset-x-4 bottom-4 top-24 md:inset-x-8 md:bottom-8 md:top-28 lg:inset-x-10 lg:bottom-10 pointer-events-none rounded-lg border border-hero-foreground/15" aria-hidden="true"></div>

        <div className="container relative z-10 flex-1 min-h-0 px-8 md:px-16 lg:px-24 grid grid-rows-[auto_minmax(0,1fr)] md:grid-rows-1 md:grid-cols-2 md:gap-12 lg:gap-16">
          {/* Text Content */}
          <div className="text-center md:text-left space-y-5 md:space-y-8 pt-10 pb-4 md:py-0 md:self-center animate-fade-up">
            <div className="space-y-3">
              <p className="text-sm md:text-base font-medium text-hero-foreground/70 tracking-widest uppercase">
                {language === 'en' ? 'Real Estate' : 'Immobilier'}
              </p>
              <h1 className="text-4xl md:text-6xl font-serif leading-[1.05] tracking-tight">
                Romain Barrau
              </h1>
            </div>

            <p className="text-xl md:text-3xl font-light text-hero-foreground/90 leading-snug">
              {t('home.hero.title1')} <span className="font-serif italic">{t('home.hero.title2')}</span>{t('home.hero.title3')}
              <br />
              {t('home.hero.title4')} <span className="font-serif italic">{t('home.hero.title5')}</span>{t('home.hero.title6')}
            </p>

            <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start gap-4 sm:gap-6 pt-2">
              <Button asChild size="lg" className="bg-hero-foreground text-hero hover:bg-hero-foreground/90">
                <Link to="/contact">{t('home.hero.cta')}</Link>
              </Button>
              <Link
                to="/listings"
                className="text-base font-medium text-hero-foreground underline underline-offset-4 decoration-hero-foreground/40 hover:decoration-hero-foreground transition-colors duration-200 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-hero"
              >
                {t('nav.listings')}
              </Link>
            </div>
          </div>

          {/* Image with Bubbles */}
          <div className="relative h-full min-h-0 flex items-end justify-center">
            <div className="absolute top-4 left-0 md:top-[18%] md:left-4 lg:left-12 z-20">
              <div className="bg-background/95 backdrop-blur-sm rounded-full px-4 py-3 md:px-6 md:py-4 lg:px-8 lg:py-5 border border-border">
                <p className="text-foreground font-semibold text-lg md:text-xl lg:text-2xl whitespace-nowrap">€11M+</p>
                <p className="text-muted-foreground text-xs lg:text-sm whitespace-nowrap">in transactions</p>
              </div>
            </div>

            <div className="absolute bottom-[12%] right-0 z-20">
              <div className="bg-background/95 backdrop-blur-sm rounded-full px-4 py-3 md:px-6 md:py-4 lg:px-8 lg:py-5 border border-border">
                <p className="text-foreground font-semibold text-lg md:text-xl lg:text-2xl whitespace-nowrap">50+</p>
                <p className="text-muted-foreground text-xs lg:text-sm whitespace-nowrap">satisfied clients</p>
              </div>
            </div>

            <img
              src={romainHero}
              alt="Romain Barrau - Real Estate Agent"
              width={1252}
              height={1920}
              className="h-full w-auto max-w-full object-contain object-bottom relative z-10"
            />
          </div>
        </div>
      </section>

      {/* Properties */}
      <PropertiesCarousel />

      {/* Testimonials */}
      <TestimonialsCarousel />

      {/* Video */}
      <VideoSection />

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <h2 className="text-3xl md:text-5xl font-serif leading-tight">
              {t('home.hero.subtitle')}
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
              {t('home.dream.description')}
            </p>
            <div className="pt-2">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/contact">{t('home.cta.contact')}</Link>
              </Button>
            </div>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 pt-2 text-sm font-medium">
              <li>
                <Link to="/listings" className="text-foreground underline underline-offset-4 decoration-border hover:decoration-accent transition-colors duration-200 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  {t('home.cta.properties')}
                </Link>
              </li>
              <li>
                <Link to="/#testimonials" className="text-foreground underline underline-offset-4 decoration-border hover:decoration-accent transition-colors duration-200 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  {t('home.cta.reviews')}
                </Link>
              </li>
              <li>
                <Link to="/videos" className="text-foreground underline underline-offset-4 decoration-border hover:decoration-accent transition-colors duration-200 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  {t('home.cta.videos')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Index;
