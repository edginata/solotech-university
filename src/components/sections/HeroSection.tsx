import { ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroCampus from '@/assets/gallery/solotechdepan.jpeg';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  cta?: { label: string; href: string };
  breadcrumbs?: { label: string; href: string }[];
}

const HeroSection = ({ title, subtitle, cta, breadcrumbs }: HeroSectionProps) => {
  return (
    <section className="hero-section relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      {/* Background Image */}
      <div
  className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-[8s] ease-out"
  style={{ 
    backgroundImage: `url(${heroCampus})`,
    filter: 'brightness(0.85)'
  }}
/>

      
      {/* Multi-layer Gradient Overlay */}
<div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-black/70" />

      
      {/* Animated Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-primary-foreground px-4">
        {/* Title with Animation */}
        <div className="max-w-4xl text-center">
          <h1  className="font-heading font-extrabold text-5xl md:text-6xl lg:text-7xl tracking-tight text-center animate-fade-in mb-6 leading-[1.1] drop-shadow-lg">
            {title || 'Solotech University'}
          </h1>
          
          {subtitle && (
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto animate-fade-in mb-10 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        
        {/* CTA Buttons */}
        {cta && (
          <div className="flex gap-4 mt-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <a href={cta.href}>
              <Button className="bg-white text-primary hover:bg-white/90 shadow-2xl hover:shadow-white/30 transition-all duration-300 hover:scale-105 px-8 py-6 text-base font-semibold flex items-center gap-2">
                {cta.label}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </div>
        )}
        
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mt-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <ol className="flex items-center gap-2 text-sm md:text-base backdrop-blur-md bg-white/10 border border-white/20 px-5 py-2 rounded-full">
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
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
