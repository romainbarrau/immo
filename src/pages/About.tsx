import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import romainHero from '@/assets/romain-hero.png';
import aboutBackground from '@/assets/about-background.jpg';

const About = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-4 md:px-6 py-20 pt-32">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-4 text-foreground">
              {t('about.title')}
            </h1>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16 animate-slide-up">
            <div className="relative rounded-lg overflow-hidden shadow-lg aspect-[4/5]">
              {/* Blurred background */}
              <img
                src={aboutBackground}
                alt=""
                className="absolute inset-0 w-full h-full object-cover blur-[2px] scale-105"
              />
              {/* Romain PNG overlay */}
              <img
                src={romainHero}
                alt="Romain Barrau"
                className="absolute z-10 object-contain w-[108%] -bottom-[46px] left-1/2 -translate-x-1/2"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="space-y-6 text-base leading-relaxed">
                {t('about.content').split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-foreground/90">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="animate-fade-in text-center mt-16" style={{animationDelay: '0.2s'}}>
            <Button 
              size="lg" 
              onClick={() => navigate('/contact')}
              className="text-lg px-8"
            >
              {t('home.cta.contact')}
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
