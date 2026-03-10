import { useState, useEffect } from 'react';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import { ScrollReveal } from '@/hooks/useScrollReveal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Clock, Users, Target, Award, FileText, GraduationCap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface DynamicFakultasPageProps {
  facultyKey: string; // keyword to match faculty name, e.g. 'teologi', 'ekonomi', 'teknik'
  title: string;
  breadcrumbLabel: string;
  breadcrumbHref: string;
}

const DynamicFakultasPage = ({ facultyKey, title, breadcrumbLabel, breadcrumbHref }: DynamicFakultasPageProps) => {
  const [faculty, setFaculty] = useState<any>(null);
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const breadcrumbs = [
    { label: 'Akademik', href: '/akademik' },
    { label: breadcrumbLabel, href: breadcrumbHref },
  ];

  useEffect(() => {
    const load = async () => {
      try {
        const { data: fac } = await supabase.from('faculty').select('*').ilike('name', `%${facultyKey}%`).single();
        setFaculty(fac);
        if (fac) {
          const { data: progs } = await supabase.from('program_studi').select('*').eq('faculty_id', fac.id);
          setPrograms(progs || []);
        }
      } catch (err) {
        console.error('Error loading faculty:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [facultyKey]);

  // Collect all dosen and fasilitas from programs
  const allDosen: { name: string; bidang: string }[] = programs.flatMap(
    (p: any) => (Array.isArray(p.dosen) ? p.dosen : [])
  );
  const allFasilitas: string[] = programs.flatMap(
    (p: any) => (Array.isArray(p.fasilitas) ? p.fasilitas : [])
  );

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />

      <main className="flex-1">
        <HeroSection title={title} breadcrumbs={breadcrumbs} />

        {/* Intro Section */}
        {faculty?.description && (
          <section className="py-12 lg:py-16">
            <div className="section-container">
              <ScrollReveal>
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-6">
                    {title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {faculty.description}
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </section>
        )}

        {/* Programs Section */}
        {programs.length > 0 && (
          <section className="py-12 lg:py-16 bg-muted/50">
            <div className="section-container">
              <ScrollReveal>
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-8 text-center">
                  Program Studi
                </h2>
              </ScrollReveal>
              <div className="space-y-8">
                {programs.map((program: any, index: number) => {
                  const kompetensi = Array.isArray(program.kompetensi_lulusan) ? program.kompetensi_lulusan : [];
                  const prospek = Array.isArray(program.prospek_karir) ? program.prospek_karir : [];
                  return (
                    <ScrollReveal key={program.id} delay={index * 100}>
                      <Card className="overflow-hidden">
                        <CardHeader className="bg-primary text-primary-foreground">
                          <CardTitle className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-3">
                              <GraduationCap className="w-6 h-6" />
                              {program.name}
                            </div>
                            {program.akreditasi && (
                              <span className="bg-primary-foreground/20 px-3 py-1 rounded-full text-sm">
                                Akreditasi {program.akreditasi}
                              </span>
                            )}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                          {program.description && (
                            <p className="text-muted-foreground mb-6">{program.description}</p>
                          )}

                          <div className="grid md:grid-cols-3 gap-4 mb-6">
                            {program.durasi && (
                              <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-primary" />
                                <span className="text-sm">{program.durasi}</span>
                              </div>
                            )}
                            {program.sks && (
                              <div className="flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-primary" />
                                <span className="text-sm">{program.sks} SKS</span>
                              </div>
                            )}
                            <div className="flex items-center gap-2">
                              <Award className="w-5 h-5 text-primary" />
                              <span className="text-sm">Gelar Sarjana</span>
                            </div>
                          </div>

                          {(kompetensi.length > 0 || prospek.length > 0) && (
                            <div className="grid md:grid-cols-2 gap-6">
                              {kompetensi.length > 0 && (
                                <div>
                                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                                    <Target className="w-4 h-4 text-primary" />
                                    Kompetensi Lulusan
                                  </h4>
                                  <ul className="space-y-2">
                                    {kompetensi.map((item: string, idx: number) => (
                                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {prospek.length > 0 && (
                                <div>
                                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-primary" />
                                    Prospek Karir
                                  </h4>
                                  <div className="flex flex-wrap gap-2">
                                    {prospek.map((item: string, idx: number) => (
                                      <span key={idx} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                                        {item}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Dosen Section */}
        {allDosen.length > 0 && (
          <section className="py-12 lg:py-16">
            <div className="section-container">
              <ScrollReveal>
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-8 text-center">
                  Tenaga Pengajar
                </h2>
              </ScrollReveal>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allDosen.map((d, index) => (
                  <ScrollReveal key={`${d.name}-${index}`} delay={index * 100}>
                    <Card className="text-center p-6">
                      <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Users className="w-10 h-10 text-primary" />
                      </div>
                      <h4 className="font-semibold text-foreground">{d.name}</h4>
                      <p className="text-sm text-primary">{d.bidang}</p>
                    </Card>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Fasilitas Section */}
        {allFasilitas.length > 0 && (
          <section className="py-12 lg:py-16 bg-muted/50">
            <div className="section-container">
              <ScrollReveal>
                <div className="max-w-4xl mx-auto">
                  <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-8 text-center">
                    Fasilitas Fakultas
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {allFasilitas.map((item, index) => (
                      <div key={index} className="flex items-center gap-3 bg-background p-4 rounded-lg">
                        <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></div>
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>
        )}

        {/* Loading / empty state */}
        {loading && (
          <section className="py-20">
            <div className="section-container text-center text-muted-foreground">Memuat data...</div>
          </section>
        )}
        {!loading && programs.length === 0 && (
          <section className="py-20">
            <div className="section-container text-center text-muted-foreground">
              Data fakultas belum tersedia. Silakan tambahkan melalui panel admin.
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default DynamicFakultasPage;
