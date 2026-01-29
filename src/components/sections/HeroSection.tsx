import { ChevronRight } from 'lucide-react';
import heroCampus from '@/assets/hero-campus.jpg';

interface HeroSectionProps {
  title: string;
  breadcrumbs?: { label: string; href: string }[];
}

const HeroSection = ({ title, breadcrumbs }: HeroSectionProps) => {
  return (
    <section className="hero-section relative h-[280px] md:h-[320px] lg:h-[360px]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroCampus})` }}
      />
      
      {/* Purple Overlay */}
      <div className="hero-overlay" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-primary-foreground">
        <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-center px-4 animate-fade-in">
          {title}
        </h1>
        
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mt-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <ol className="flex items-center gap-2 text-sm md:text-base">
              <li>
                <a href="/" className="hover:underline opacity-80 hover:opacity-100 transition-opacity">
                  Home
                </a>
              </li>
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 opacity-60" />
                  {index === breadcrumbs.length - 1 ? (
                    <span className="font-medium">{crumb.label}</span>
                  ) : (
                    <a href={crumb.href} className="hover:underline opacity-80 hover:opacity-100 transition-opacity">
                      {crumb.label}
                    </a>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
