import { useEffect, useState } from 'react';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import { Card } from '@/components/ui/card';
import { ScrollReveal } from '@/hooks/useScrollReveal';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, User, MapPin, ArrowRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const BeritaKegiatan = () => {
  const [berita, setBerita] = useState<any[]>([]);
  const [kegiatan, setKegiatan] = useState<any[]>([]);

  useEffect(() => {
    const loadBerita = supabase.from('berita').select('*').order('published_at', { ascending: false });
    const loadKegiatan = supabase.from('kegiatan').select('*').order('start_at', { ascending: false });
    
    Promise.all([loadBerita, loadKegiatan]).then(([b, k]) => {
      if (b.data) setBerita(b.data);
      if (k.data) setKegiatan(k.data);
    });
  }, []);

  const breadcrumbs = [{ label: 'Berita & Kegiatan', href: '/berita-kegiatan' }];

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-1">
        <HeroSection title="Berita & Kegiatan" breadcrumbs={breadcrumbs} />

        <section className="py-12 lg:py-16">
          <div className="section-container">
            <Tabs defaultValue="berita" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                <TabsTrigger value="berita">Berita</TabsTrigger>
                <TabsTrigger value="kegiatan">Kegiatan</TabsTrigger>
              </TabsList>

              <TabsContent value="berita">
                {berita.length === 0 ? (
                  <p className="text-center text-muted-foreground py-12">Belum ada berita.</p>
                ) : (
                  <div className="grid md:grid-cols-3 gap-6">
                    {berita.map((item, i) => (
                      <ScrollReveal key={item.id} delay={i * 80}>
                        <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                          {item.image_url ? (
                            <div className="h-48 overflow-hidden">
                              <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                            </div>
                          ) : (
                            <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                              <span className="text-4xl opacity-30">📰</span>
                            </div>
                          )}
                          <div className="p-6 flex flex-col flex-1">
                            <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full w-fit mb-3">
                              {item.category || 'Berita'}
                            </span>
                            <h3 className="font-heading font-bold text-lg mb-3 text-foreground line-clamp-2">{item.title}</h3>
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">{item.excerpt || item.description}</p>
                            <div className="flex gap-4 text-xs text-muted-foreground border-t border-border pt-4">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {item.published_at ? new Date(item.published_at).toLocaleDateString('id-ID') : '-'}
                              </div>
                              <div className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                {item.author || '-'}
                              </div>
                            </div>
                          </div>
                        </Card>
                      </ScrollReveal>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="kegiatan">
                {kegiatan.length === 0 ? (
                  <p className="text-center text-muted-foreground py-12">Belum ada kegiatan.</p>
                ) : (
                  <div className="grid md:grid-cols-3 gap-6">
                    {kegiatan.map((item, i) => (
                      <ScrollReveal key={item.id} delay={i * 80}>
                        <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                          {item.image_url && (
                            <div className="h-48 overflow-hidden">
                              <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                            </div>
                          )}
                          <div className="p-6 flex flex-col flex-1">
                            <h3 className="font-heading font-bold text-lg mb-2 text-foreground">{item.title}</h3>
                            {(item.description || item.excerpt) && (
                              <p className="text-sm text-muted-foreground mb-3 line-clamp-3 flex-1">{item.description || item.excerpt}</p>
                            )}
                            <div className="space-y-2 text-sm text-muted-foreground border-t border-border pt-4">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-primary" />
                                {item.start_at ? new Date(item.start_at).toLocaleString('id-ID') : '-'}
                              </div>
                              {item.location && (
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4 text-primary" />
                                  {item.location}
                                </div>
                              )}
                            </div>
                          </div>
                        </Card>
                      </ScrollReveal>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BeritaKegiatan;
