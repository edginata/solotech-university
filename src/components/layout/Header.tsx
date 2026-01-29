import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'PROFIL', href: '#profil', hasDropdown: true, active: true },
    { label: 'AKADEMIK', href: '#akademik', hasDropdown: true },
    { label: 'PENELITIAN', href: '#penelitian' },
    { label: 'PENGABDIAN', href: '#pengabdian' },
    { label: 'BEM', href: '#bem' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 bg-background transition-all duration-300 ${
        isScrolled ? 'shadow-lg' : 'shadow-sm'
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between py-3 lg:py-4">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <div className="flex items-center">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-bold text-lg lg:text-xl">S</span>
              </div>
              <div className="ml-2">
                <div className="font-heading font-bold text-primary text-lg lg:text-xl tracking-tight">
                  SOLOTECH
                </div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  University
                </div>
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`nav-link flex items-center gap-1 py-2 ${item.active ? 'active text-primary' : ''}`}
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
              </a>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Button className="cta-button">
              PMB
            </Button>
            <button className="p-2 hover:bg-muted rounded-full transition-colors">
              <Search className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`py-3 px-4 font-semibold text-sm uppercase tracking-wide hover:bg-muted rounded-lg transition-colors ${
                    item.active ? 'text-primary bg-primary/5' : 'text-foreground'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="flex items-center justify-between">
                    {item.label}
                    {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                  </span>
                </a>
              ))}
              <div className="pt-4 px-4">
                <Button className="cta-button w-full">
                  PMB
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
