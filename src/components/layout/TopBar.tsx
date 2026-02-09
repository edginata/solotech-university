import { Phone, Mail, MessageCircle } from 'lucide-react';

const TopBar = () => {
  const quickLinks = [
    { label: 'PMB', href: 'https://ukts.ac.id/laman-pmb/' },
    { label: 'Beasiswa', href: 'https://ukts.ac.id/beasiswa/' },
  ];

  return (
    <div className="bg-primary-dark text-primary-foreground py-2">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-sm">
            <a href="tel:0271637145" className="flex items-center gap-1.5 top-bar-link">
              <Phone className="w-3.5 h-3.5" />
              <span>(0271) 637145</span>
            </a>
            <span className="hidden sm:inline text-primary-foreground/40">|</span>
            <a href="mailto:pmb@ukts.ac.id" className="flex items-center gap-1.5 top-bar-link">
              <Mail className="w-3.5 h-3.5" />
              <span>pmb@ukts.ac.id</span>
            </a>
            <span className="hidden sm:inline text-primary-foreground/40">|</span>
            <a 
              href="https://api.whatsapp.com/send?phone=6285117247527" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 top-bar-link"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden md:inline">WhatsApp</span>
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
