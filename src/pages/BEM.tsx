import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import React, { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { ScrollReveal } from '@/hooks/useScrollReveal';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import localVideo from '@/assets/videos/2022.mp4';

const BEM: React.FC = () => {
  const breadcrumbs = [{ label: 'BEM', href: '/bem' }];
  const [bemItems, setBemItems] = useState<any[]>([]);
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    let mounted = true;
    Promise.all([
      supabase.from('bem').select('*').order('created_at', { ascending: false }),
      supabase.from('site_settings').select('*').eq('key', 'bem_video_url').maybeSingle(),
    ]).then(([{ data }, { data: vid }]) => {
      if (mounted && data) setBemItems(data);
      if (mounted) setVideoUrl(vid?.value || '');
    });
    return () => { mounted = false; };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />

      <main className="flex-1 pb-24">
        <HeroSection title="Badan Eksekutif Mahasiswa" breadcrumbs={breadcrumbs} />

        <section className="py-12 lg:py-16">
          <div className="section-container">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto text-center mb-8">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="p-3 bg-primary/10 rounded-md">
                    <Users className="w-7 h-7 text-primary" />
                  </div>
                  <h1 className="font-heading font-bold text-3xl md:text-4xl text-primary">Badan Eksekutif Mahasiswa (BEM)</h1>
                </div>
                <p className="text-lg text-muted-foreground">Organisasi mahasiswa yang menyelenggarakan kegiatan kemahasiswaan, advokasi, dan program kerja kreatif untuk mendukung kehidupan kampus. Ikuti update kegiatan di Instagram <a href="https://instagram.com/bem_ukts" target="_blank" rel="noopener noreferrer" className="text-primary"></a>.</p>
              </div>
            </ScrollReveal>

            <div className="flex flex-col gap-8">
              {/* BEM items from database */}
              {bemItems.length > 0 && (
                <ScrollReveal>
                  <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Kegiatan BEM</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bemItems.map((item) => (
                      <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        {item.image_url && (
                          <div className="h-48 overflow-hidden">
                            <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="p-5">
                          <h3 className="font-heading font-semibold text-lg mb-2">{item.title}</h3>
                          {item.description && (
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollReveal>
              )}

              <ScrollReveal>
                <Card className="p-6 w-full">
                  <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Kegiatan & Program Kerja</h2>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Pelatihan kepemimpinan dan manajemen organisasi</li>
                    <li>Program pengabdian masyarakat dan sosial</li>
                    <li>Event kampus: seminar, lomba, dan bakti sosial</li>
                    <li>Kolaborasi dengan UKM, fakultas, dan komunitas lokal</li>
                  </ul>
                  <div className="mt-6">
                    <a href="https://instagram.com/bem_ukts" target="_blank" rel="noopener noreferrer">
                      <Button className="bg-primary">Kunjungi Instagram @bem_ukts</Button>
                    </a>
                  </div>
                </Card>
              </ScrollReveal>

              <ScrollReveal>
                <Card className="p-6 w-full">
                  <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Video Profil / Kegiatan</h2>
                  <video controls className="w-full rounded-md" src={videoUrl || localVideo}>
                    Your browser does not support the video tag.
                  </video>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BEM;
