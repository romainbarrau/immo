import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const { t, language, setLanguage } = useLanguage();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the mobile menu on route change, Escape, and lock body scroll while open
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isMenuOpen]);

  // Scroll to in-page anchors such as /#testimonials
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
    return () => window.clearTimeout(timer);
  }, [location.pathname, location.hash]);

  const links = [
    { to: '/listings', label: t('nav.listings') },
    { to: '/videos', label: t('nav.videos') },
    { to: '/#testimonials', label: t('nav.testimonials') },
    { to: '/about', label: t('nav.about') },
  ];

  const isActive = (to: string) => {
    if (to.startsWith('/#')) return location.pathname === '/' && location.hash === to.slice(1);
    return location.pathname === to || location.pathname.startsWith(`${to}/`);
  };

  // On the homepage, the bar blends into the night-blue hero until the user scrolls
  const overHero = location.pathname === '/' && !scrolled && !isMenuOpen;

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 border-b transition-[border-color,background-color,color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]',
        overHero
          ? 'bg-transparent border-transparent text-hero-foreground'
          : 'bg-background border-border text-foreground'
      )}
    >
      <div className="container mx-auto">
        <div
          className={cn(
            'flex items-center justify-between transition-[height] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]',
            scrolled ? 'h-16' : 'h-20'
          )}
        >
          {/* Logo */}
          <Link
            to="/"
            className={cn(
              'group flex flex-col leading-none rounded-sm transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              overHero && 'focus-visible:ring-offset-hero'
            )}
          >
            <span className="text-2xl md:text-3xl font-display tracking-tight">
              Romain Barrau
            </span>
            <span className={cn('text-xs font-medium tracking-widest uppercase mt-1', overHero ? 'text-hero-foreground/70' : 'text-muted-foreground')}>
              Real Estate
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            <ul className="flex items-center gap-1">
              {links.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    aria-current={isActive(item.to) ? 'page' : undefined}
                    className={cn(
                      'relative inline-flex h-10 items-center px-4 text-sm font-medium rounded-sm transition-colors duration-200',
                      'after:absolute after:left-4 after:right-4 after:bottom-1 after:h-0.5 after:rounded-full after:bg-accent after:transition-opacity after:duration-200',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                      overHero && 'focus-visible:ring-offset-hero',
                      isActive(item.to)
                        ? 'after:opacity-100'
                        : 'opacity-80 hover:opacity-100 after:opacity-0 hover:after:opacity-60'
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Button
              asChild
              size="sm"
              className={cn(
                'ml-2',
                overHero
                  ? 'bg-hero-foreground text-hero hover:bg-hero-foreground/90'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
              )}
            >
              <Link to="/contact">{t('nav.contact')}</Link>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="gap-2 ml-1"
            >
              <Globe className="h-4 w-4" aria-hidden="true" />
              <span className="uppercase font-medium">{language}</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="gap-1.5"
            >
              <Globe className="h-4 w-4" aria-hidden="true" />
              <span className="uppercase text-xs font-medium">{language}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? t('nav.menuClose') : t('nav.menuOpen')}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden pb-6 pt-2 animate-fade-up border-t border-border max-h-[calc(100dvh-5rem)] overflow-y-auto"
          >
            <ul className="flex flex-col gap-1">
              {links.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => setIsMenuOpen(false)}
                    aria-current={isActive(item.to) ? 'page' : undefined}
                    className={cn(
                      'block px-4 py-3 text-base font-medium rounded-sm transition-colors duration-200',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                      isActive(item.to)
                        ? 'text-foreground bg-secondary shadow-[inset_3px_0_0_hsl(var(--accent))]'
                        : 'text-foreground hover:bg-secondary/60'
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Button asChild className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                {t('nav.contact')}
              </Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
