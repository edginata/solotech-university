import { MapPin, Phone, Mail, Globe, Facebook, Instagram, Youtube, MessageCircle } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { label: 'Beranda', href: 'https://ukts.ac.id/' },
    { label: 'Profil', href: 'https://ukts.ac.id/profil/' },
    { label: 'PMB', href: 'https://ukts.ac.id/laman-pmb/' },
    { label: 'Beasiswa', href: 'https://ukts.ac.id/beasiswa/' },
    { label: 'Penelitian', href: 'https://ukts.ac.id/penelitian/' },
  ];

  const academicLinks = [
    { label: 'Fakultas Teologi', href: '#' },
    { label: 'Fakultas Teknik', href: '#' },
    { label: 'Fakultas Ekonomi', href: '#' },
    { label: 'Portal Dosen', href: 'http://sinkrista.uks.ac.id/' },
    { label: 'Portal Mahasiswa', href: 'http://sinkrista.uks.ac.id/' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: MessageCircle, href: 'https://api.whatsapp.com/send?phone=6285117247527', label: 'WhatsApp' },
  ];

  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="section-container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-bold text-lg">S</span>
              </div>
              <div>
                <div className="font-heading font-bold text-lg">SOLOTECH</div>
                <div className="text-xs text-footer-foreground/60">University</div>
              </div>
            </div>
            <p className="text-sm text-footer-foreground/80 leading-relaxed mb-2">
              <strong>Universitas Kristen Teknologi Solo</strong>
            </p>
            <p className="text-sm text-footer-foreground/80 leading-relaxed mb-4">
              Kampus teknologi dan entrepreneurship yang ditopang oleh nilai-nilai kristiani. Technology for Transformation.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 bg-footer-foreground/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Pintasan</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="footer-link text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Academic */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Akademik</h4>
            <ul className="space-y-2">
              {academicLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="footer-link text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-footer-foreground/80">
                  Jl. R.W. Monginsidi No. 36-38,<br />
                  Banjarsari, Surakarta,<br />
                  Jawa Tengah 57134
                </span>
              </li>
              <li>
                <a href="tel:0271637145" className="flex items-center gap-3 footer-link">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">(0271) 637145</span>
                </a>
              </li>
              <li>
                <a href="https://api.whatsapp.com/send?phone=6285117247527" className="flex items-center gap-3 footer-link">
                  <MessageCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">0851-1724-7527 (WhatsApp)</span>
                </a>
              </li>
              <li>
                <a href="mailto:pmb@ukts.ac.id" className="flex items-center gap-3 footer-link">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">pmb@ukts.ac.id</span>
                </a>
              </li>
              <li>
                <a href="https://ukts.ac.id" className="flex items-center gap-3 footer-link">
                  <Globe className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">www.ukts.ac.id</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-footer-foreground/10">
        <div className="section-container py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-footer-foreground/60">
            <p>© 2024 Universitas Kristen Teknologi Solo (UKTS). All Rights Reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-footer-foreground transition-colors">Kebijakan Privasi</a>
              <a href="#" className="hover:text-footer-foreground transition-colors">Syarat & Ketentuan</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
