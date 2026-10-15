import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { splitTitle, placeOf } from '@/lib/propertyText';

interface PropertyCardProps {
  image: string;
  title: string;
  location: string;
  price: string;
  sold?: boolean;
  soldLabel?: boolean;
  to: string;
}

const PropertyCard = ({ image, title, location, price, sold, soldLabel, to }: PropertyCardProps) => {
  const { t } = useLanguage();
  const { type } = splitTitle(title);
  const place = placeOf(title, location);

  return (
    <Link to={to} className="group h-full flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:transform-none motion-reduce:group-hover:scale-100"
        />
        {soldLabel && (
          <span className="absolute top-3 left-3 z-10 rounded-sm bg-primary px-2 py-1 text-sm font-display font-normal leading-none text-primary-foreground">
            {t('sold.label')}
          </span>
        )}
        {sold && (
          <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
            <span className="text-background text-3xl font-display font-bold">{t('sold.badge')}</span>
          </div>
        )}
      </div>
      <div className="mt-4 flex-1 flex flex-col space-y-1">
        <h3 className="text-xl font-display font-normal text-foreground transition-colors group-hover:text-[#A4532E]">{type}</h3>
        <p className="text-sm text-[#6B665E]">{place}</p>
        <div className="flex items-center text-base font-normal text-[#1C1A17]">
          <span>{price}{'\u00A0'}€</span>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
