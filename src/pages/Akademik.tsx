import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, BookOpen, Clock, Users, CheckCircle } from 'lucide-react';

const Akademik = () => {
  const breadcrumbs = [
    { label: 'Akademik', href: '/akademik' },
  ];

  const faculties = [
    {
      name: 'Fakultas Teologi',
      description: 'Mempersiapkan pemimpin rohani yang kompeten dan relevan dengan konteks masyarakat modern.',
      programs: [
        { name: 'S1 Teologi', duration: '4 Tahun', akreditasi: 'B' },
        { name: 'S1 Pendidikan Agama Kristen', duration: '4 Tahun', akreditasi: 'B' },
        { name: 'S1 Musik Gerejawi', duration: '4 Tahun', akreditasi: 'B' },
      ],
    },
    {
      name: 'Fakultas Teknik',
      description: 'Mencetak ahli teknologi yang inovatif dan mampu bersaing di era digital.',
      programs: [
        { name: 'S1 Teknik Informatika', duration: '4 Tahun', akreditasi: 'B' },
        { name: 'S1 Sistem Informasi', duration: '4 Tahun', akreditasi: 'B' },
        { name: 'D3 Teknik Komputer', duration: '3 Tahun', akreditasi: 'B' },
      ],
    },
    {
      name: 'Fakultas Ekonomi',
      description: 'Mengembangkan entrepreneur dan profesional bisnis berjiwa kristiani.',
      programs: [
        { name: 'S1 Manajemen', duration: '4 Tahun', akreditasi: 'B' },
        { name: 'S1 Akuntansi', duration: '4 Tahun', akreditasi: 'B' },
      ],
    },
  ];

  const facilities = [
    'Laboratorium Komputer Modern',
    'Perpustakaan Digital',
    'Studio Musik',
    'Ruang Kelas Multimedia',
    'Aula Serbaguna',
    'Hotspot WiFi Kampus',
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      
      <main className="flex-1">
        <HeroSection 
          title="Akademik" 
          breadcrumbs={breadcrumbs}
        />

        {/* Intro Section */}
        <section className="py-12 lg:py-16">
          <div className="section-container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-6">
                Program Akademik UKTS
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                UKTS menawarkan berbagai program studi yang dirancang untuk memenuhi kebutuhan industri modern 
                dengan tetap menjunjung tinggi nilai-nilai kristiani. Kurikulum kami mengintegrasikan teori 
                dengan praktik untuk mempersiapkan lulusan yang siap kerja dan berkarakter.
              </p>
            </div>
          </div>
        </section>

        {/* Faculties Section */}
        <section className="py-12 lg:py-16 bg-muted/50">
          <div className="section-container">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-8 text-center">
              Fakultas & Program Studi
            </h2>
            <div className="space-y-8">
              {faculties.map((faculty) => (
                <Card key={faculty.name} className="overflow-hidden">
                  <CardHeader className="bg-primary text-primary-foreground">
                    <CardTitle className="flex items-center gap-3">
                      <GraduationCap className="w-6 h-6" />
                      {faculty.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-6">{faculty.description}</p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {faculty.programs.map((program) => (
                        <div 
                          key={program.name}
                          className="border border-border rounded-lg p-4 hover:border-primary transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <BookOpen className="w-5 h-5 text-primary mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-foreground">{program.name}</h4>
                              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {program.duration}
                                </span>
                                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-medium">
                                  Akreditasi {program.akreditasi}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Academic Calendar */}
        <section className="py-12 lg:py-16">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-6">
                  Kalender Akademik
                </h2>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <div className="font-semibold text-foreground">Semester Gasal</div>
                    <div className="text-sm text-muted-foreground">September - Januari</div>
                  </div>
                  <div className="border-l-4 border-accent pl-4 py-2">
                    <div className="font-semibold text-foreground">Semester Genap</div>
                    <div className="text-sm text-muted-foreground">Februari - Juni</div>
                  </div>
                  <div className="border-l-4 border-muted pl-4 py-2">
                    <div className="font-semibold text-foreground">Semester Pendek</div>
                    <div className="text-sm text-muted-foreground">Juli - Agustus (Opsional)</div>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-6">
                  Fasilitas Akademik
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {facilities.map((facility) => (
                    <div key={facility} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground text-sm">{facility}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Academic Staff */}
        <section className="py-12 lg:py-16 bg-muted/50">
          <div className="section-container">
            <div className="text-center mb-8">
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-4">
                Tenaga Pengajar
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Dosen-dosen UKTS adalah para profesional dan akademisi berpengalaman yang berkomitmen 
                untuk memberikan pendidikan berkualitas.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="bg-background rounded-lg p-6 shadow-sm">
                <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="font-heading font-bold text-2xl text-foreground">50+</div>
                <div className="text-sm text-muted-foreground">Dosen Tetap</div>
              </div>
              <div className="bg-background rounded-lg p-6 shadow-sm">
                <GraduationCap className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="font-heading font-bold text-2xl text-foreground">15+</div>
                <div className="text-sm text-muted-foreground">Doktor (S3)</div>
              </div>
              <div className="bg-background rounded-lg p-6 shadow-sm">
                <BookOpen className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="font-heading font-bold text-2xl text-foreground">35+</div>
                <div className="text-sm text-muted-foreground">Magister (S2)</div>
              </div>
              <div className="bg-background rounded-lg p-6 shadow-sm">
                <CheckCircle className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="font-heading font-bold text-2xl text-foreground">100%</div>
                <div className="text-sm text-muted-foreground">Tersertifikasi</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Akademik;
