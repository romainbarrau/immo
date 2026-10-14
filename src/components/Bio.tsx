import { useLanguage } from '@/contexts/LanguageContext';
import romainHero from '@/assets/romain-hero.png';
import aboutBackground from '@/assets/about-background.jpg';

// Home page bio: same layout as the About page (photo left, text right; stacked on mobile)
const Bio = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="relative rounded-lg overflow-hidden shadow-lg aspect-[4/5]">
            {/* Blurred background */}
            <img
              src={aboutBackground}
              alt=""
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover blur-[2px] scale-105"
            />
            {/* Romain PNG overlay */}
            <img
              src={romainHero}
              alt="Romain Barrau"
              loading="lazy"
              className="absolute z-10 object-contain w-[108%] -bottom-[46px] left-1/2 -translate-x-1/2"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="space-y-6 font-sans text-base leading-relaxed text-foreground">
              {t('bio.content').split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bio;
