import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const LINK = 'transition-colors hover:text-[#1C1A17]';

// flush: no top margin, for pages whose last section has its own background (home)
const Footer = ({ flush = false }: { flush?: boolean }) => {
  const { t } = useLanguage();

  return (
    <footer className={flush ? 'bg-background' : 'bg-background mt-20'}>
      {/* same container as the home page sections (PropertiesCarousel, CreativeVideos) */}
      <div className="px-4 md:px-8 lg:px-12">
        <div className="container mx-auto max-w-7xl py-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-sm font-sans text-[#6B665E]">
          <p>© {new Date().getFullYear()} Romain Barrau</p>

          <div className="flex flex-wrap gap-x-5 gap-y-2 md:flex-nowrap md:gap-6">
            <a href="mailto:romain.barrau@iadfrance.fr" className={LINK}>
              romain.barrau@iadfrance.fr
            </a>
            <a href="tel:+33669119336" className={LINK}>
              +33 6 69 11 93 36
            </a>
            <a href="https://wa.me/33669119336?text=Bonjour%20Romain" target="_blank" rel="noopener noreferrer" className={LINK}>
              WhatsApp
            </a>
            <a href="https://instagram.com/romainbarrau" target="_blank" rel="noopener noreferrer" className={LINK}>
              Instagram
            </a>
            <a href="https://www.linkedin.com/in/romain-barrau-213607110" target="_blank" rel="noopener noreferrer" className={LINK}>
              LinkedIn
            </a>
            <Link to="/mentions-legales" className={LINK}>
              {t('footer.legal')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
