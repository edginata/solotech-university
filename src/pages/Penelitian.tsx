import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FlaskConical, FileText, Award, Users, Target, Lightbulb } from 'lucide-react';
import { ScrollReveal } from '@/hooks/useScrollReveal';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Penelitian = () => {
  const breadcrumbs = [{ label: 'Penelitian', href: '/penelitian' }];
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    supabase.from('pengabdian').select('*').eq('category', 'penelitian').order('created_at', { ascending: false })
      .then(({ data }) => setItems(data || []));
  }, []);

  const researchAreas = [
    { icon: FlaskConical, title: 'Teknologi Informasi', description: 'Penelitian dalam bidang kecerdasan buatan, big data, IoT, dan pengembangan aplikasi.' },
    { icon: Lightbulb, title: 'Teologi Kontekstual', description: 'Kajian teologi yang relevan dengan konteks masyarakat Indonesia modern.' },
    { icon: Target, title: 'Ekonomi Kreatif', description: 'Penelitian tentang UMKM, entrepreneurship, dan pemberdayaan ekonomi masyarakat.' },
  ];

  const stats = [
    { value: '50+', label: 'Publikasi Nasional' },
    { value: '25+', label: 'Publikasi Internasional' },
    { value: '30+', label: 'Hibah Penelitian' },
    { value: '15+', label: 'Hak Kekayaan Intelektual' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar /><Header />
      <main className="flex-1">
        <HeroSection title="Penelitian" breadcrumbs={breadcrumbs} />

        <section className="py-12 lg:py-16">
          <div className="section-container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-6">Pusat Penelitian UKTS</h2>
              <p className="text-muted-foreground leading-relaxed">
                Lembaga Penelitian dan Pengabdian Masyarakat (LPPM) UKTS berkomitmen untuk mengembangkan 
                penelitian yang berkualitas dan berdampak bagi masyarakat.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-primary">
          <div className="section-container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center text-primary-foreground">
                  <div className="font-heading font-bold text-3xl md:text-4xl mb-1">{stat.value}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16 bg-muted/50">
          <div className="section-container">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-8 text-center">Bidang Penelitian Unggulan</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {researchAreas.map((area) => (
                <Card key={area.title} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <area.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2">{area.title}</h3>
                    <p className="text-muted-foreground text-sm">{area.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Dynamic research items from DB */}
        {items.length > 0 && (
          <section className="py-12 lg:py-16">
            <div className="section-container">
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-8 text-center">Penelitian Terbaru</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <TooltipProvider>
                  {items.map((item) => (
                    <ScrollReveal key={item.id}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                            {item.image_url && (
                              <div className="h-48 overflow-hidden">
                                <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                              </div>
                            )}
                            <CardContent className="p-5">
                              <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-3">{item.description}</p>
                            </CardContent>
                          </Card>
                        </TooltipTrigger>
                        {item.description && (
                          <TooltipContent side="bottom" className="max-w-sm text-sm">
                            {item.description}
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </ScrollReveal>
                  ))}
                </TooltipProvider>
              </div>
            </div>
          </section>
        )}

        {/* Research Support */}
        <section className="py-12 lg:py-16 bg-muted/50">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-6">Dukungan Penelitian</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">UKTS menyediakan berbagai fasilitas dan dukungan untuk kegiatan penelitian:</p>
                <ul className="space-y-3">
                  {[
                    { icon: Award, text: 'Hibah penelitian internal dan eksternal' },
                    { icon: Users, text: 'Bimbingan penulisan artikel ilmiah' },
                    { icon: FlaskConical, text: 'Akses laboratorium dan fasilitas riset' },
                    { icon: FileText, text: 'Pendampingan pendaftaran HKI' },
                  ].map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Card>
                <CardHeader><CardTitle>Kontak LPPM</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Untuk informasi lebih lanjut tentang penelitian, silakan hubungi LPPM UKTS.</p>
                  <div className="space-y-2 text-sm">
                    <p><strong>Email:</strong> lppm@ukts.ac.id</p>
                    <p><strong>Telepon:</strong> (0271) 637145</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Penelitian;
