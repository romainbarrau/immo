import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import PropertiesCarousel from '@/components/PropertiesCarousel';
import VideoSection from '@/components/VideoSection';
import romainHero from '@/assets/romain-hero.png';
import modernHome1 from '@/assets/modern-home-1.jpg';
import modernHome2 from '@/assets/modern-home-2-portrait.jpg';
import creativeInterior from '@/assets/creative-interior.jpg';
import { Diamond } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useState } from 'react';
const Index = () => {
  const { t, language } = useLanguage();
  
  const testimonials = [
    { id: 1, name: 'Nikita Godart', rating: 5 },
    { id: 2, name: 'Jessica Mendes Pedro', rating: 5 },
    { id: 3, name: 'Jean Sulzer', rating: 5 },
    { id: 4, name: 'Chanseau Tara', rating: 5 },
    { id: 5, name: 'Charles Hector Whitmee', rating: 5 },
    { id: 6, name: 'Diogo Castillo Leitão', rating: 5 },
    { id: 7, name: 'Patricia Remacha', rating: 5 },
    { id: 8, name: 'Nguyen Christian', rating: 5 },
    { id: 9, name: 'Adriana Darling', rating: 5 },
    { id: 10, name: 'Jose Mexia de Almeida', rating: 5 },
  ];
  return <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-hero-dark-blue pt-28 md:pt-8 pb-16">
        {/* Animated Border Frame */}
        <div className="absolute inset-6 md:inset-10 lg:inset-12 pointer-events-none">
          <div className="absolute inset-0 rounded-[2rem] md:rounded-[3rem] overflow-hidden">
            <div className="absolute inset-[-100%] animate-rotate-border" style={{
              background: 'conic-gradient(from 0deg, transparent 0%, white 10%, transparent 20%, transparent 100%)',
            }}></div>
          </div>
          <div className="absolute inset-[2px] bg-hero-dark-blue rounded-[2rem] md:rounded-[3rem]"></div>
        </div>
        
        <div className="container mx-auto max-w-7xl px-4 md:px-8 lg:px-12 flex-1 flex items-center relative z-10">
          <div className="w-full relative">
            {/* Mobile: Center Content */}
            <div className="md:hidden text-center text-white z-10 relative space-y-8">
              <div className="space-y-3">
                <h1 className="text-5xl font-display font-bold leading-tight">
                  Romain Barrau
                </h1>
                <p className="text-lg text-white/80 font-light tracking-wider uppercase">
                  {language === 'en' ? 'Real Estate' : 'Immobilier'}
                </p>
              </div>
              
              <p className="text-xl opacity-90 font-light leading-relaxed">
                {t('home.hero.title1')} <span className="italic font-serif">{t('home.hero.title2')}</span>{t('home.hero.title3')}
                <br />
                {t('home.hero.title4')} <span className="italic font-serif">{t('home.hero.title5')}</span>{t('home.hero.title6')}
              </p>

                <Button size="lg" className="mt-6 bg-shirt-blue hover:bg-shirt-blue/90 text-shirt-blue-foreground" onClick={() => window.location.href = `${import.meta.env.BASE_URL}contact`}>
                  {t('home.hero.cta')}
                </Button>

              <div className="relative pt-8">
                <div className="relative h-[400px] flex items-end justify-center">
                  {/* Floating Bubble 1 - Mobile */}
                  <div className="absolute top-0 left-4 z-20 animate-float-1">
                    <div className="bg-background/95 backdrop-blur-sm rounded-full px-4 py-3 shadow-2xl border-2 border-foreground/20">
                      <p className="text-foreground font-bold text-lg whitespace-nowrap">€11M+</p>
                      <p className="text-foreground/80 text-xs whitespace-nowrap">{t('home.stats.transactions')}</p>
                    </div>
                  </div>
                  
                  {/* Floating Bubble 2 - Mobile */}
                  <div className="absolute bottom-4 right-4 z-20 animate-float-2">
                    <div className="bg-background/95 backdrop-blur-sm rounded-full px-4 py-3 shadow-2xl border-2 border-foreground/20">
                      <p className="text-foreground font-bold text-lg whitespace-nowrap">50+</p>
                      <p className="text-foreground/80 text-xs whitespace-nowrap">{t('home.stats.clients')}</p>
                    </div>
                  </div>

                  <img 
                    src={romainHero} 
                    alt="Romain Barrau - Real Estate Agent" 
                    className="h-full w-auto object-contain object-bottom" 
                  />
                </div>
              </div>
            </div>

            {/* Desktop: Split Layout */}
            <div className="hidden md:grid md:grid-cols-2 md:gap-12 lg:gap-16 items-center">
              {/* Left: Text Content */}
              <div className="text-white space-y-8">
                <div className="space-y-3">
                  <h1 className="text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-tight">
                    Romain Barrau
                  </h1>
                  <p className="text-xl text-white/80 font-light tracking-wider uppercase">
                    {language === 'en' ? 'Real Estate' : 'Immobilier'}
                  </p>
                </div>
                
                <p className="text-2xl lg:text-3xl opacity-90 font-light leading-relaxed">
                  {t('home.hero.title1')} <span className="italic font-serif">{t('home.hero.title2')}</span>{t('home.hero.title3')}
                  <br />
                  {t('home.hero.title4')} <span className="italic font-serif">{t('home.hero.title5')}</span>{t('home.hero.title6')}
                </p>

              <Button size="lg" className="mt-6 bg-shirt-blue hover:bg-shirt-blue/90 text-shirt-blue-foreground" onClick={() => window.location.href = `${import.meta.env.BASE_URL}contact`}>
                {t('home.hero.cta')}
              </Button>
              </div>

              {/* Right: Image with Floating Bubbles */}
              <div className="relative h-[650px] lg:h-[750px] xl:h-[800px] flex items-end justify-center">
                {/* Floating Bubble 1 - Top Left of Image */}
                <div className="absolute top-24 left-8 lg:left-16 z-20 animate-float-1">
                  <div className="bg-background/95 backdrop-blur-sm rounded-full px-6 py-4 lg:px-8 lg:py-6 shadow-2xl border-2 border-foreground/20">
                    <p className="text-foreground font-bold text-xl lg:text-2xl whitespace-nowrap">€11M+</p>
                    <p className="text-foreground/80 text-xs lg:text-sm whitespace-nowrap">{t('home.stats.transactions')}</p>
                  </div>
                </div>
                
                {/* Floating Bubble 2 - Bottom Right of Image */}
                <div className="absolute bottom-8 right-0 z-20 animate-float-2">
                  <div className="bg-background/95 backdrop-blur-sm rounded-full px-6 py-4 lg:px-8 lg:py-6 shadow-2xl border-2 border-foreground/20">
                    <p className="text-foreground font-bold text-xl lg:text-2xl whitespace-nowrap">50+</p>
                    <p className="text-foreground/80 text-xs lg:text-sm whitespace-nowrap">{t('home.stats.clients')}</p>
                  </div>
                </div>

                <img 
                  src={romainHero} 
                  alt="Romain Barrau - Real Estate Agent" 
                  className="h-full w-auto object-contain object-bottom relative z-10" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Carousel - Compact Version */}
        <div className="w-full py-8 md:py-12">
          <Carousel
            opts={{
              align: 'center',
              loop: true,
              duration: 30,
            }}
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnInteraction: true,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full max-w-7xl mx-auto px-4"
          >
            <CarouselContent className="-ml-3 md:-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-3 md:pl-4 basis-[85%] sm:basis-[70%] md:basis-1/2 lg:basis-1/3">
                  <Card className="p-4 md:p-6 bg-background/60 backdrop-blur-sm border-foreground/20 hover:border-foreground/40 transition-all duration-300">
                    <div className="flex gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 md:h-4 md:w-4 fill-foreground text-foreground" />
                      ))}
                    </div>
                    
                    <p className="text-xs md:text-sm text-foreground/90 leading-relaxed mb-3 line-clamp-3">
                      {t(`home.testimonials.review${testimonial.id}`)}
                    </p>

                    <p className="font-semibold text-foreground text-sm">
                      {testimonial.name}
                    </p>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* Video Section */}
      <VideoSection />

      {/* Properties Carousel */}
      <PropertiesCarousel />

      {/* CTA Buttons Section */}
      

      {/* Dream Section */}
      <section className="py-8 md:py-12 px-4 md:px-8 lg:px-12 bg-background">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Image */}
            <div className="lg:col-span-4 animate-fade-in">
              <div className="rounded-[2rem] overflow-hidden shadow-xl">
                <AspectRatio ratio={3 / 4}>
                  <img src={modernHome1} alt="Modern home exterior" className="w-full h-full object-cover object-center" />
                </AspectRatio>
              </div>
            </div>

            {/* Center Content */}
            <div className="lg:col-span-4 text-center space-y-6 py-8 lg:space-y-4 lg:py-4">
              <Diamond className="w-8 h-8 mx-auto text-foreground opacity-50 lg:w-6 lg:h-6" />
              <h2 className="text-3xl md:text-4xl lg:text-3xl font-display leading-tight mx-0">
                {t('home.dream.title')} <span className="italic font-serif">{t('home.dream.agent')}</span>.
                <br />
                {t('home.dream.title2')} <span className="italic font-serif">{t('home.dream.entrepreneur')}</span>.
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto leading-relaxed lg:text-sm lg:max-w-sm">
                {t('home.dream.description')}
              </p>
              <Button size="lg" className="mt-6 lg:mt-4 lg:h-10 lg:px-6" onClick={() => window.location.href = `${import.meta.env.BASE_URL}contact`}>
                {t('home.dream.cta')}
              </Button>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-4 animate-fade-in" style={{
            animationDelay: '0.2s'
          }}>
              <div className="rounded-[2rem] overflow-hidden shadow-xl">
                <AspectRatio ratio={3 / 4}>
                  <img src={modernHome2} alt="Modern terrace view" className="w-full h-full object-cover object-center scale-110" />
                </AspectRatio>
              </div>
            </div>
          </div>
        </div>
      </section>

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
              <Button variant="outline" size="lg" className="w-fit bg-background/60 text-foreground hover:bg-background/80 border-foreground/20" onClick={() => window.location.href = `${import.meta.env.BASE_URL}videos`}>
                {t('home.inclusions.cta')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsCarousel />

      <Footer />
    </div>;
};
export default Index;