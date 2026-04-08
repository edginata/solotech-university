import { BookOpen, Users, Lightbulb, HandHelping, FileText, Zap, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollReveal } from '@/hooks/useScrollReveal';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  linkText: string;
  color: string;
}

const FeaturesSection = () => {
  const features: Feature[] = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Portal Akademik',
      description: 'Akses sistem pembelajaran, nilai, jadwal, dan pengumuman akademik dengan mudah',
      link: 'http://sinkrista.uks.ac.id/',
      linkText: 'Buka Portal',
      color: 'from-blue-500/10 to-blue-500/5',
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Penelitian & Inovasi',
      description: 'Jelajahi proyek penelitian terbaru dan peluang kolaborasi dengan dosen',
      link: '/penelitian',
      linkText: 'Lihat Penelitian',
      color: 'from-amber-500/10 to-amber-500/5',
    },
    {
      icon: <HandHelping className="w-8 h-8" />,
      title: 'Pengabdian Masyarakat',
      description: 'Ikuti program pengabdian dan kontribusi positif untuk komunitas lokal',
      link: '/pengabdian',
      linkText: 'Bergabung',
      color: 'from-green-500/10 to-green-500/5',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Alumni Network',
      description: 'Terhubung dengan alumni sukses dan akses peluang karir eksklusif',
      link: '#',
      linkText: 'Bergabung',
      color: 'from-purple-500/10 to-purple-500/5',
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Panduan Akademik',
      description: 'Dokumen lengkap peraturan akademik dan panduan mahasiswa',
      link: '#',
      linkText: 'Unduh',
      color: 'from-red-500/10 to-red-500/5',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Beasiswa & Bantuan',
      description: 'Temukan berbagai program beasiswa dan dukungan finansial untuk mahasiswa',
      link: '/pmb',
      linkText: 'Pelajari',
      color: 'from-cyan-500/10 to-cyan-500/5',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="section-container">
        {/* Header */}
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-4">
              Akses Cepat & Layanan
            </h2>
            <p className="text-lg text-muted-foreground">
              Portal dan layanan utama yang memudahkan mahasiswa dan calon mahasiswa
            </p>
          </div>
        </ScrollReveal>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 80}>
              <Card className={`group p-6 bg-gradient-to-br ${feature.color} hover:shadow-lg transition-all duration-300 border-0 h-full flex flex-col`}>
                {/* Icon */}
                <div className="mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-6 flex-1">
                  {feature.description}
                </p>

                {/* Link */}
                <a 
                  href={feature.link}
                  target={feature.link.startsWith('http') ? '_blank' : undefined}
                  rel={feature.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-primary font-semibold text-sm hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                >
                  {feature.linkText}
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <ScrollReveal>
          <div className="bg-primary/5 rounded-xl p-8 lg:p-12 border border-primary/10">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Left Side */}
              <div>
                <h3 className="font-heading font-bold text-2xl text-primary mb-6">
                  Mengapa Memilih UKTS?
                </h3>
                <ul className="space-y-4">
                  {[
                    'Kurikulum modern dengan fokus pada teknologi',
                    'Dosen profesional dengan sertifikasi internasional',
                    'Fasilitas kampus lengkap dan terintegrasi',
                    'Program magang dan networking industri',
                    'Beasiswa dan dukungan finansial tersedia',
                    'Lingkungan belajar berdasarkan nilai kristiani',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <span className="text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Side - CTA */}
              <div className="flex flex-col justify-center">
                <div className="bg-background rounded-xl p-8 shadow-md">
                  <h4 className="font-heading font-bold text-xl text-primary mb-4">
                    Siap untuk Bergabung?
                  </h4>
                  <p className="text-muted-foreground mb-6">
                    Daftar sekarang dan mulai perjalanan akademik Anda bersama ribuan mahasiswa lainnya.
                  </p>
                  <div className="space-y-3">
                    <a href="/pmb" className="block">
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        Buka PMB
                      </Button>
                    </a>
                    <a href="/profil" className="block">
                      <Button variant="outline" className="w-full">
                        Pelajari Lebih Lanjut
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FeaturesSection;
