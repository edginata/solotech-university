 import { MapPin, Phone, Mail, Globe, Facebook, Instagram, Youtube, MessageCircle, Twitter } from 'lucide-react';
 import uktsLogo from '@/assets/gallery/logo-ukts.png';

const Footer = () => {
   const menuLinks = [
     { label: 'PENDAFTARAN', href: '/pendaftaran' },
     { label: 'PROFIL UKTS', href: '/profil' },
     { label: 'LOGIN ADMIN', href: '/admin/login' },
     { label: 'PORTAL DOSEN', href: 'http://sinkrista.uks.ac.id/' },
     { label: 'E-LEARNING', href: '#' },
  ];

   const linksSection = [
     { label: 'AKADEMIK', href: '/akademik' },
     { label: 'KEMAHASISWAAN', href: '#' },
     { label: 'LPPM', href: '/penelitian' },
     { label: 'KEUANGAN', href: '#' },
     { label: 'INTERNATIONAL', href: '#' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
     { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: MessageCircle, href: 'https://api.whatsapp.com/send?phone=6285117247527', label: 'WhatsApp' },
  ];

    return (
      <footer className="bg-primary text-primary-foreground mt-auto relative z-0">
      <div className="section-container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About */}
          <div>
             <div className="flex items-center gap-3 mb-6">
               <img src={uktsLogo} alt="UKTS Logo" className="w-16 h-16 object-contain" />
               <div className="text-left">
                 <div className="font-heading font-bold text-lg leading-tight">UNIVERSITAS</div>
                 <div className="font-heading font-bold text-lg leading-tight">KRISTEN TEKNOLOGI</div>
                 <div className="font-heading font-bold text-lg leading-tight">SOLO</div>
               </div>
            </div>
             <p className="text-sm text-primary-foreground/80 leading-relaxed mb-2">
               Diselenggarakan oleh
            </p>
             <p className="text-sm font-semibold mb-2">Yayasan Kristen Surakarta</p>
             <p className="text-sm text-primary-foreground/80 leading-relaxed mb-4">
               Jl. R.W. Monginsidi No. 36-38,<br />
               Banjarsari, Surakarta,<br />
               Jawa Tengah 57134
            </p>
             <div className="space-y-1 text-sm text-primary-foreground/80">
               <p>Email : pmb@ukts.ac.id</p>
               <p>Email : info@ukts.ac.id</p>
               <p>Telp&nbsp;&nbsp;&nbsp;: (0271) 637145</p>
               <p>Fax&nbsp;&nbsp;&nbsp;&nbsp;: (0271) 637145</p>
             </div>
          </div>

           {/* Menu Links */}
          <div>
             <h4 className="font-heading font-bold text-lg mb-6">MENU</h4>
            <ul className="space-y-2">
               {menuLinks.map((link) => (
                <li key={link.label}>
                   <a href={link.href} className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

           {/* Links */}
          <div>
             <h4 className="font-heading font-bold text-lg mb-6">LINKS</h4>
            <ul className="space-y-2">
               {linksSection.map((link) => (
                <li key={link.label}>
                   <a href={link.href} className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

           {/* Copyright & Social */}
          <div>
             <p className="text-sm text-primary-foreground/80 mb-2">Copyright © 1993 - 2026</p>
             <p className="text-sm font-semibold mb-2">UNIVERSITAS KRISTEN TEKNOLOGI SOLO</p>
             <p className="text-sm text-primary-foreground/80 mb-6">All Rights Reserved</p>
             
             <div className="flex gap-2 mt-8">
               {socialLinks.map((social) => (
                 <a
                   key={social.label}
                   href={social.href}
                   className="w-10 h-10 bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground rounded-lg flex items-center justify-center transition-colors"
                   aria-label={social.label}
                   target="_blank"
                   rel="noopener noreferrer"
                 >
                   <social.icon className="w-5 h-5" />
                 </a>
               ))}
             </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
       <div className="bg-primary-foreground/10 border-t border-primary-foreground/5">
        <div className="section-container py-6">
           <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
             <p className="text-primary-foreground font-semibold">UNIVERSITAS KRISTEN TEKNOLOGI SOLO</p>
             <p className="text-primary-foreground/70 text-sm">Designed with care • UKTS</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
