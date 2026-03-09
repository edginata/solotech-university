import { useEffect, useState } from 'react';
import { Star, GraduationCap } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollReveal } from '@/hooks/useScrollReveal';
import { supabase } from '@/integrations/supabase/client';

interface Alumni {
  id: string;
  name: string;
  role: string | null;
  message: string | null;
  rating: number | null;
  avatar_url: string | null;
  order_num: number | null;
}

const AlumniPage = () => {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('alumni')
      .select('*')
      .order('order_num')
      .then(({ data }) => {
        if (data) setAlumni(data);
        setLoading(false);
      });
  }, []);

  const getInitials = (name: string) =>
    name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        <div className="section-container text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <GraduationCap className="w-4 h-4" />
              Alumni & Testimoni
            </div>
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-primary mb-4">
              Suara Alumni UKTS
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Dengarkan pengalaman langsung dari alumni dan mahasiswa yang telah merasakan pendidikan berkualitas di UKTS
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Alumni Grid */}
      <section className="py-16 lg:py-24">
        <div className="section-container">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-8 animate-pulse">
                  <div className="h-4 bg-muted rounded w-1/3 mb-4" />
                  <div className="h-20 bg-muted rounded mb-6" />
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted" />
                    <div className="flex-1">
                      <div className="h-4 bg-muted rounded w-2/3 mb-2" />
                      <div className="h-3 bg-muted rounded w-1/2" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : alumni.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Belum ada data alumni.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {alumni.map((item, index) => (
                <ScrollReveal key={item.id} delay={index * 80}>
                  <Card className="p-8 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
                    {item.rating && (
                      <div className="flex gap-1 mb-4">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    )}

                    {item.message && (
                      <p className="text-foreground/80 leading-relaxed mb-6 flex-1 italic">
                        "{item.message}"
                      </p>
                    )}

                    <div className="border-t border-border my-4" />

                    <div className="flex items-center gap-4">
                      <Avatar>
                        {item.avatar_url && (
                          <AvatarImage src={item.avatar_url} alt={item.name} />
                        )}
                        <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                          {getInitials(item.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-foreground">{item.name}</p>
                        {item.role && (
                          <p className="text-sm text-muted-foreground">{item.role}</p>
                        )}
                      </div>
                    </div>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary/5">
        <div className="section-container text-center">
          <ScrollReveal>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-primary mb-4">
              Jadilah Bagian dari Keluarga UKTS
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Bergabunglah dengan ribuan alumni yang telah sukses membangun karir mereka.
            </p>
            <a
              href="/pendaftaran"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Daftar Sekarang
            </a>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AlumniPage;
