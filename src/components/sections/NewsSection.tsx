import { ArrowRight, Calendar, User } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/hooks/useScrollReveal';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface NewsItem {
  id: string;
  title: string;
  excerpt?: string | null;
  published_at?: string;
  author?: string | null;
  category?: string | null;
  image_url?: string | null;
  link?: string;
}

const NewsSection = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const { data, error } = await supabase.from('berita').select('*').order('published_at', { ascending: false }).limit(6);
      if (error) {
        console.error('Gagal memuat berita', error);
      } else if (mounted) {
        setNewsItems(data || []);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="section-container">
        {/* Header */}
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-4">
              Berita & Pengumuman
            </h2>
            <p className="text-lg text-muted-foreground">
              Tetap update dengan informasi terbaru seputar kehidupan kampus, akademik, dan kegiatan universitas
            </p>
          </div>
        </ScrollReveal>

        {/* News Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {newsItems.map((item, index) => (
            <ScrollReveal key={item.id} delay={index * 100}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group h-full flex flex-col">
                {/* Card Image */}
                {item.image_url ? (
                  <div className="h-48 overflow-hidden">
                    <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/10 overflow-hidden flex items-center justify-center">
                    <div className="text-4xl opacity-30 group-hover:scale-110 transition-transform duration-300">📰</div>
                  </div>
                )}

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="inline-flex w-fit mb-3">
                    <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                      {item.category || 'Berita'}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
                    {item.excerpt}
                  </p>

                  <div className="flex gap-4 text-xs text-muted-foreground border-t border-border pt-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {item.published_at ? new Date(item.published_at).toLocaleDateString('id-ID') : '-'}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {item.author || '-'}
                    </div>
                  </div>

                  <a href={item.link || '#'} className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all">
                    Baca Selengkapnya
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="text-center">
            <a href="/berita-kegiatan">
              <Button variant="outline" size="lg" className="hover:bg-primary hover:text-primary-foreground">Lihat Semua Berita</Button>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default NewsSection;
