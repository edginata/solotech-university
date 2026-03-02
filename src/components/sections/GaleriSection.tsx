import { Card } from '@/components/ui/card';
import { ScrollReveal } from '@/hooks/useScrollReveal';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const GaleriSection = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const { data, error } = await supabase.from('galeri').select('*').order('created_at', { ascending: false }).limit(9);
      if (error) console.error('Gagal memuat galeri', error); else if (mounted) setItems(data || []);
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
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-4">Galeri Foto</h2>
            <p className="text-muted-foreground">Kumpulan momen kegiatan dan acara UKTS.</p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-4">
          {items.map((g) => (
            <div key={g.id} className="overflow-hidden rounded">
              <img src={g.image_url} alt={g.title || ''} className="w-full h-56 object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GaleriSection;
