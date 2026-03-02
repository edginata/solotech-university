import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/hooks/useScrollReveal';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const KegiatanSection = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const { data, error } = await supabase.from('kegiatan').select('*').order('start_at', { ascending: false }).limit(6);
      if (error) {
        console.error('Gagal memuat kegiatan', error);
      } else if (mounted) setItems(data || []);
    };
    load();
    return () => { mounted = false; };
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="py-12 lg:py-16">
      <div className="section-container">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-4">Kegiatan Terbaru</h2>
            <p className="text-muted-foreground">Lihat kegiatan dan acara yang akan datang dari UKTS.</p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((it) => (
            <ScrollReveal key={it.id}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-4">
                  <h3 className="font-heading font-semibold text-lg mb-2">{it.title}</h3>
                  <div className="text-sm text-muted-foreground mb-3">{it.location || '-'}</div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                    <Calendar className="w-4 h-4" />
                    {it.start_at ? new Date(it.start_at).toLocaleString('id-ID') : '-'}
                  </div>
                  <a href="#" className="inline-flex items-center gap-2 text-primary font-semibold text-sm">
                    Lihat Detail
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KegiatanSection;
