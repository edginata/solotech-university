import { Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollReveal } from '@/hooks/useScrollReveal';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Alumni {
  id: string;
  name: string;
  role: string;
  message: string;
  rating: number;
  avatar_url: string;
}

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Alumni[]>([]);

  useEffect(() => {
    supabase.from('alumni').select('*').order('order_num').then(({ data }) => {
      if (data && data.length > 0) {
        setTestimonials(data);
      } else {
        // fallback
        setTestimonials([
          { id: '1', name: 'Budi Santoso', role: 'Mahasiswa Teknik Informatika', message: 'Pengalaman belajar di UKTS sangat transformatif. Dosen-dosen yang berpengalaman dan fasilitas yang lengkap membuat saya bisa berkembang maksimal.', rating: 5, avatar_url: '' },
          { id: '2', name: 'Siti Nurhaliza', role: 'Alumni Fakultas Ekonomi', message: 'Pendidikan di UKTS membekali saya dengan hard skills dan soft skills yang relevan industri.', rating: 5, avatar_url: '' },
          { id: '3', name: 'Rido Gunardi', role: 'Mahasiswa Teknik Lingkungan', message: 'Yang saya suka adalah integrasi teknologi dalam setiap mata kuliah.', rating: 5, avatar_url: '' },
        ]);
      }
    });
  }, []);

  const getInitials = (name: string) => name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="section-container">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-4">
              Kata Mereka Tentang UKTS
            </h2>
            <p className="text-lg text-muted-foreground">
              Mendengar langsung dari mahasiswa dan alumni tentang pengalaman belajar mereka
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.id} delay={index * 100}>
              <Card className="p-8 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-foreground/80 leading-relaxed mb-6 flex-1 italic">
                  "{testimonial.message}"
                </p>

                <div className="border-t border-border my-4" />

                <div className="flex items-center gap-4">
                  <Avatar>
                    {testimonial.avatar_url && <AvatarImage src={testimonial.avatar_url} alt={testimonial.name} />}
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {getInitials(testimonial.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 text-center border border-primary/20">
            <h3 className="font-heading font-bold text-2xl text-primary mb-2">
              Jadilah Bagian dari Keluarga UKTS
            </h3>
            <p className="text-muted-foreground mb-6">
              Kesempatan terbatas untuk mendaftar di tahun akademik ini. Mulai perjalanan akademik Anda hari ini.
            </p>
            <a href="/pmb" className="inline-block px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors">
              Daftar Sekarang
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TestimonialsSection;
