import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Search, BookOpen, Users, Lightbulb, HandHelping, FilePlus, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchDialog from '@/components/SearchDialog';
import uktsLogo from '@/assets/gallery/logo-ukts.png';

interface SubMenuItem {
  label: string;
  href: string;
  icon?: any;
  description?: string;
}

interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  subItems?: SubMenuItem[];
  columns?: number;
}

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedMenu, setMobileExpandedMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  // Keyboard shortcut for search
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { label: 'BERANDA', href: '/' },
    { 
      label: 'PROFIL', 
      href: '/profil', 
      hasDropdown: true,
      columns: 2,
      subItems: [
        { label: 'Tentang UKTS', href: '/profil', icon: Users, description: 'Biodata dan sejarah universitas' },
        { label: 'Visi & Misi', href: '/profil#visi-misi', icon: Lightbulb, description: 'Tujuan dan rencana kami' },
        { label: 'Sejarah', href: '/profil#sejarah', icon: BookOpen, description: 'Perkembangan dari awal' },
        { label: 'Struktur Organisasi', href: '/profil#struktur', icon: Users, description: 'Bagan organisasi' },
        { label: 'Fasilitas', href: '/profil#fasilitas', icon: Zap, description: 'Infrastruktur kampus' },
        { label: 'Akreditasi', href: '/profil#akreditasi', icon: FilePlus, description: 'Sertifikasi & penghargaan' },
      ]
    },
    { 
      label: 'AKADEMIK', 
      href: '/akademik', 
      hasDropdown: true,
      columns: 2,
      subItems: [
        { label: 'Fakultas Teologi', href: '/fakultas/teologi', icon: BookOpen, description: 'Program studi teologi' },
        { label: 'Fakultas Teknik', href: '/fakultas/teknik', icon: Zap, description: 'Program teknik & informatika' },
        { label: 'Fakultas Ekonomi', href: '/fakultas/ekonomi', icon: Lightbulb, description: 'Program ekonomi bisnis' },
        { label: 'Kalender Akademik', href: '/akademik#kalender', icon: BookOpen, description: 'Jadwal tahun akademik' },
      ]
    },
    { label: 'PENELITIAN', href: '/penelitian' },
    { label: 'PENGABDIAN', href: '/pengabdian' },
    { label: 'BEM', href: '/bem' },
    { label: 'PMB', href: '/pmb' },
  ];

  const handleMouseEnter = (label: string) => {
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const toggleMobileSubmenu = (label: string) => {
    setMobileExpandedMenu(mobileExpandedMenu === label ? null : label);
  };

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
              <img 
                src={uktsLogo} 
                alt="UKTS Logo" 
                className="w-10 h-10 lg:w-12 lg:h-12 object-contain"
              />
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
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <div 
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <a
                    href={item.href}
                    className={`nav-link flex items-center gap-1 py-2 font-semibold text-sm tracking-wide transition-colors ${
                      isActive ? 'text-primary' : 'text-foreground hover:text-primary'
                    }`}
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === item.label ? 'rotate-180' : ''
                        }`} 
                      />
                    )}
                  </a>

                  {/* Mega Dropdown Menu */}
                  {item.hasDropdown && item.subItems && activeDropdown === item.label && (
                    <div 
                      className="absolute top-full left-0 mt-0 min-w-max bg-background border border-border rounded-lg shadow-2xl animate-fade-in z-50"
                      style={{
                        width: item.columns === 2 ? '600px' : item.columns === 1 ? '320px' : 'auto'
                      }}
                    >
                      <div className={`p-6 grid gap-4 ${item.columns === 2 ? 'grid-cols-2' : item.columns === 1 ? 'grid-cols-1' : 'grid-cols-1'}`}>
                        {item.subItems.map((subItem) => {
                          const Icon = subItem.icon;
                          return (
                            <a
                              key={subItem.label}
                              href={subItem.href}
                              className="group flex gap-3 p-3 rounded-lg hover:bg-primary/5 transition-all duration-200"
                              target={subItem.href.startsWith('http') ? '_blank' : undefined}
                              rel={subItem.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            >
                              {Icon && (
                                <Icon className="w-5 h-5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                              )}
                              <div className="flex-1">
                                <div className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                                  {subItem.label}
                                </div>
                                {subItem.description && (
                                  <div className="text-xs text-muted-foreground group-hover:text-foreground/70 transition-colors">
                                    {subItem.description}
                                  </div>
                                )}
                              </div>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="/pendaftaran">
              <Button className="cta-button">
                DAFTAR
              </Button>
            </a>
            <button 
              onClick={() => setSearchOpen(true)}
              className="p-2 hover:bg-muted rounded-full transition-colors flex items-center gap-2 text-muted-foreground text-sm"
            >
              <Search className="w-5 h-5" />
              <span className="hidden xl:inline">Cari...</span>
              <kbd className="hidden xl:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
                <span className="text-xs"></span>
              </kbd>
            </button>
          </div>

          {/* Search Dialog */}
          <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />

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
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <div key={item.label}>
                    {item.hasDropdown ? (
                      <>
                        <button
                          onClick={() => toggleMobileSubmenu(item.label)}
                          className={`w-full py-3 px-4 font-semibold text-sm uppercase tracking-wide hover:bg-muted rounded-lg transition-colors flex items-center justify-between ${
                            isActive ? 'text-primary bg-primary/5' : 'text-foreground'
                          }`}
                        >
                          {item.label}
                          <ChevronDown 
                            className={`w-4 h-4 transition-transform duration-200 ${
                              mobileExpandedMenu === item.label ? 'rotate-180' : ''
                            }`} 
                          />
                        </button>
                        {mobileExpandedMenu === item.label && item.subItems && (
                          <div className="ml-4 mt-1 mb-2 border-l-2 border-primary/20 animate-fade-in space-y-1">
                            {item.subItems.map((subItem) => {
                              const Icon = subItem.icon;
                              return (
                                <a
                                  key={subItem.label}
                                  href={subItem.href}
                                  className="block py-2 px-4 text-sm text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors rounded flex gap-2 items-start"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  target={subItem.href.startsWith('http') ? '_blank' : undefined}
                                  rel={subItem.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                >
                                  {Icon && <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                                  <div>
                                    <div className="font-medium">{subItem.label}</div>
                                    {subItem.description && (
                                      <div className="text-xs text-muted-foreground">{subItem.description}</div>
                                    )}
                                  </div>
                                </a>
                              );
                            })}
                          </div>
                        )}
                      </>
                    ) : (
                      <a
                        href={item.href}
                        className={`block py-3 px-4 font-semibold text-sm uppercase tracking-wide hover:bg-muted rounded-lg transition-colors ${
                          isActive ? 'text-primary bg-primary/5' : 'text-foreground'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    )}
                  </div>
                );
              })}
              <div className="pt-4 px-4">
                <a href="/pendaftaran">
                  <Button className="cta-button w-full">
                    DAFTAR
                  </Button>
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
