import { Phone, Mail } from 'lucide-react';

const TopBar = () => {
  const quickLinks = [
    { label: 'English', href: '#' },
    { label: 'FAQ', href: '#' },
    { label: 'Berita Utama', href: '#' },
    { label: 'Info Kampus', href: '#' },
    { label: 'Kontak', href: '#' },
  ];

  return (
    <div className="bg-primary-dark text-primary-foreground py-2">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-sm">
            <a href="tel:+62274884201" className="flex items-center gap-1.5 top-bar-link">
              <Phone className="w-3.5 h-3.5" />
              <span>(0274) 884201 - 207</span>
            </a>
            <span className="hidden sm:inline text-primary-foreground/40">|</span>
            <a href="mailto:amikom@amikom.ac.id" className="flex items-center gap-1.5 top-bar-link">
              <Mail className="w-3.5 h-3.5" />
              <span>amikom@amikom.ac.id</span>
            </a>
          </div>
          <nav className="flex items-center gap-4">
            {quickLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="top-bar-link text-xs sm:text-sm"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
