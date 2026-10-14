import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Instagram, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { EMAIL, INSTAGRAM_URL, LINKEDIN_URL, WHATSAPP_URL } from '@/config/site';

const linkClass =
  'text-hero-foreground/75 hover:text-hero-foreground transition-colors duration-200 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-hero';

const Footer = () => {
  const { t } = useLanguage();

  const navLinks = [
    { to: '/listings', label: t('nav.listings') },
    { to: '/videos', label: t('nav.videos') },
    { to: '/#testimonials', label: t('nav.testimonials') },
    { to: '/about', label: t('nav.about') },
    { to: '/contact', label: t('nav.contact') },
  ];

  const socialLinks = [
    { href: WHATSAPP_URL, label: 'WhatsApp', icon: MessageCircle, external: true },
    { href: INSTAGRAM_URL, label: 'Instagram', icon: Instagram, external: true },
    { href: LINKEDIN_URL, label: 'LinkedIn', icon: Linkedin, external: true },
    { href: `mailto:${EMAIL}`, label: 'Email', icon: Mail, external: false },
  ];

  return (
    <footer className="bg-hero text-hero-foreground">
      <div className="container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Identity */}
          <div className="space-y-4">
            <p className="text-3xl font-serif leading-tight">Romain Barrau</p>
            <p className="text-hero-foreground/75">
              Real Estate Advisor<br />
              Lisbon
            </p>
            <div className="space-y-1 text-hero-foreground/75">
              <p>
                <a href={`mailto:${EMAIL}`} className={linkClass}>{EMAIL}</a>
              </p>
              <p>Seed Real Estate Lisbon</p>
            </div>
          </div>

          {/* Navigation */}
          <nav>
            <ul className="space-y-3">
              {navLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Links */}
          <div>
            <h4 className="font-sans font-medium mb-4 text-hero-foreground">Follow</h4>
            <ul className="flex gap-3">
              {socialLinks.map(({ href, label, icon: Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="flex items-center justify-center w-11 h-11 rounded-full border border-hero-foreground/20 text-hero-foreground/80 hover:text-hero-foreground hover:border-hero-foreground/50 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-hero"
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-hero-foreground/15 mt-12 pt-8 space-y-2 text-center text-sm text-hero-foreground/70">
          <p>
            © {new Date().getFullYear()} Romain Barrau — {t('footer.rights')} | Seed Real Estate Lisbon
          </p>
          {/* TODO-P2: mentions légales (RSAC, liens Mentions légales / Confidentialité) */}
          <p></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
