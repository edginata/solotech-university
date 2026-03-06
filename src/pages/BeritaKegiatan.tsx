import { useEffect, useState } from 'react';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollReveal } from '@/hooks/useScrollReveal';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, User, MapPin } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const BeritaKegiatan = () => {
  const [berita, setBerita] = useState<any[]>([]);
  const [kegiatan, setKegiatan] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [detailType, setDetailType] = useState<'berita' | 'kegiatan'>('berita');

  useEffect(() => {
    const loadBerita = supabase.from('berita').select('*').order('published_at', { ascending: false });
    const loadKegiatan = supabase.from('kegiatan').select('*').order('start_at', { ascending: false });
    
    Promise.all([loadBerita, loadKegiatan]).then(([b, k]) => {
      if (b.data) setBerita(b.data);
      if (k.data) setKegiatan(k.data);
    });
  }, []);

  const breadcrumbs = [{ label: 'Berita & Kegiatan', href: '/berita-kegiatan' }];

  const openDetail = (item: any, type: 'berita' | 'kegiatan') => {
    setSelectedItem(item);
    setDetailType(type);
  };

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
                        <Card
                          className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col cursor-pointer"
                          onClick={() => openDetail(item, 'berita')}
                        >
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
                        <Card
                          className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col cursor-pointer"
                          onClick={() => openDetail(item, 'kegiatan')}
                        >
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

      {/* Detail Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={(open) => { if (!open) setSelectedItem(null); }}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-heading">{selectedItem?.title}</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              {selectedItem.image_url && (
                <div className="rounded-lg overflow-hidden">
                  <img src={selectedItem.image_url} alt={selectedItem.title} className="w-full object-cover max-h-80" />
                </div>
              )}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {detailType === 'berita' && (
                  <>
                    {selectedItem.category && (
                      <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                        {selectedItem.category}
                      </span>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {selectedItem.published_at ? new Date(selectedItem.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'}
                    </div>
                    {selectedItem.author && (
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {selectedItem.author}
                      </div>
                    )}
                  </>
                )}
                {detailType === 'kegiatan' && (
                  <>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-primary" />
                      {selectedItem.start_at ? new Date(selectedItem.start_at).toLocaleString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '-'}
                    </div>
                    {selectedItem.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-primary" />
                        {selectedItem.location}
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="text-foreground/80 leading-relaxed whitespace-pre-line">
                {selectedItem.description || selectedItem.excerpt || 'Tidak ada deskripsi.'}
              </div>
              {selectedItem.link && (
                <a href={selectedItem.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                  Baca selengkapnya →
                </a>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default BeritaKegiatan;
