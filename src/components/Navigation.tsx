import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { path: '/', label: t('nav.home') },
    { path: '/listings', label: t('nav.properties') },
    { path: '/videos', label: t('nav.content') },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 translate-y-0 opacity-100 bg-background/95 backdrop-blur-lg shadow-[0_1px_0_0_hsl(var(--border))] transition-all duration-700"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link
            to="/"
            className="group flex flex-col leading-none transition-opacity hover:opacity-70"
          >
            <span className="text-xl font-display font-medium tracking-tight">
              Romain Barrau
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "font-sans text-sm transition-colors hover:text-accent-warm",
                  location.pathname === item.path ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
              className="hover:bg-transparent"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden pb-6 pt-2 animate-fade-in border-t border-border mt-2">
            <div className="flex flex-col space-y-1">
              {links.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 font-sans text-sm transition-colors hover:text-accent-warm",
                    location.pathname === item.path ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
