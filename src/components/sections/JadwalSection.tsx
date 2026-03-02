import { Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ScrollReveal } from '@/hooks/useScrollReveal';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const JadwalSection = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const { data, error } = await supabase.from('jadwal').select('*').order('day', { ascending: true }).limit(8);
      if (error) console.error('Gagal memuat jadwal', error); else if (mounted) setItems(data || []);
    };
    load();
    return () => { mounted = false; };
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="py-12 lg:py-16 bg-muted/50">
      <div className="section-container">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-4">Jadwal Kegiatan</h2>
            <p className="text-muted-foreground">Jadwal rutin dan kegiatan akademik.</p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((j) => (
            <Card key={j.id} className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">{j.title}</div>
                  <div className="text-sm text-muted-foreground">{j.day} — {j.time_from ? j.time_from : '-'}{j.time_to ? ' - ' + j.time_to : ''}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JadwalSection;
