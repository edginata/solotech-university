import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import { ScrollReveal } from '@/hooks/useScrollReveal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Clock, Users, Target, Award, FileText, GraduationCap } from 'lucide-react';

const FakultasTeologi = () => {
  const breadcrumbs = [
    { label: 'Akademik', href: '/akademik' },
    { label: 'Fakultas Teologi', href: '/fakultas/teologi' },
  ];

  const programs = [
    {
      name: 'S1 Teologi',
      duration: '4 Tahun (8 Semester)',
      akreditasi: 'B',
      sks: 144,
      description: 'Program studi yang mempersiapkan lulusan menjadi teolog yang kompeten dalam pelayanan gereja dan masyarakat dengan pemahaman mendalam tentang Alkitab dan tradisi Kristen.',
      kompetensi: [
        'Mampu menganalisis dan menafsirkan teks-teks Alkitab',
        'Menguasai sejarah gereja dan perkembangan teologi',
        'Memiliki kemampuan berkhotbah dan mengajar',
        'Mampu memberikan konseling pastoral',
        'Memahami etika Kristen kontemporer',
      ],
      prospekKarir: ['Pendeta/Gembala Jemaat', 'Pengajar Teologi', 'Misionaris', 'Konselor Pastoral', 'Penulis Kristiani'],
    },
    {
      name: 'S1 Pendidikan Agama Kristen',
      duration: '4 Tahun (8 Semester)',
      akreditasi: 'B',
      sks: 148,
      description: 'Program studi yang menyiapkan pendidik agama Kristen profesional untuk sekolah dan gereja dengan kompetensi pedagogis dan teologis yang solid.',
      kompetensi: [
        'Menguasai metodologi pengajaran PAK',
        'Mampu mengembangkan kurikulum pendidikan Kristen',
        'Memiliki kemampuan evaluasi pembelajaran',
        'Menguasai teknologi pendidikan',
        'Mampu membimbing peserta didik secara holistik',
      ],
      prospekKarir: ['Guru PAK SD/SMP/SMA', 'Dosen', 'Pengembang Kurikulum', 'Sekolah Minggu Koordinator', 'Konsultan Pendidikan'],
    },
    {
      name: 'S1 Musik Gerejawi',
      duration: '4 Tahun (8 Semester)',
      akreditasi: 'B',
      sks: 146,
      description: 'Program studi unik yang menggabungkan keahlian musik dengan pemahaman teologis untuk melayani gereja melalui musik dan penyembahan.',
      kompetensi: [
        'Menguasai teori dan praktik musik',
        'Mampu memimpin paduan suara dan worship',
        'Menguasai berbagai instrumen musik',
        'Memahami teologi musik dan ibadah',
        'Mampu mengarang dan mengaransemen musik gerejawi',
      ],
      prospekKarir: ['Music Director Gereja', 'Worship Leader', 'Pengajar Musik', 'Composer Lagu Rohani', 'Konduktor Paduan Suara'],
    },
  ];

  const dosen = [
    { name: 'Dr. Yohanes Kristianto, M.Th.', bidang: 'Perjanjian Baru', jabatan: 'Dekan' },
    { name: 'Dr. Maria Susanti, M.Div.', bidang: 'Teologi Sistematika', jabatan: 'Wakil Dekan' },
    { name: 'Pdt. Dr. Petrus Handoko, M.Th.', bidang: 'Teologi Pastoral', jabatan: 'Kaprodi Teologi' },
    { name: 'Dr. Elisabeth Rahayu, M.Pd.', bidang: 'Pendidikan Agama Kristen', jabatan: 'Kaprodi PAK' },
    { name: 'Dr. Samuel Prasetyo, M.Mus.', bidang: 'Musik Gerejawi', jabatan: 'Kaprodi Musik' },
  ];

  const fasilitas = [
    'Perpustakaan Teologi dengan 10.000+ koleksi buku',
    'Kapel untuk praktik ibadah dan khotbah',
    'Studio Musik dengan peralatan lengkap',
    'Ruang Konseling Pastoral',
    'Lab Komputer untuk Digital Theology',
    'Ruang Diskusi dan Seminar',
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      
      <main className="flex-1">
        <HeroSection 
          title="Fakultas Teologi" 
          breadcrumbs={breadcrumbs}
        />

        {/* Intro Section */}
        <section className="py-12 lg:py-16">
          <div className="section-container">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-6">
                  Mempersiapkan Pemimpin Rohani untuk Masa Depan
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Fakultas Teologi UKTS berkomitmen untuk membentuk hamba Tuhan yang terampil, berintegritas, 
                  dan relevan dengan konteks masyarakat modern. Dengan kurikulum yang mengintegrasikan 
                  teologi klasik dan pendekatan kontemporer, kami membekali mahasiswa untuk melayani 
                  di berbagai bidang pelayanan kristiani.
                </p>
                <div className="flex justify-center gap-8 text-center">
                  <div>
                    <div className="font-heading font-bold text-3xl text-primary">500+</div>
                    <div className="text-sm text-muted-foreground">Mahasiswa Aktif</div>
                  </div>
                  <div>
                    <div className="font-heading font-bold text-3xl text-primary">2.000+</div>
                    <div className="text-sm text-muted-foreground">Alumni</div>
                  </div>
                  <div>
                    <div className="font-heading font-bold text-3xl text-primary">15+</div>
                    <div className="text-sm text-muted-foreground">Dosen Ahli</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Programs Section */}
        <section className="py-12 lg:py-16 bg-muted/50">
          <div className="section-container">
            <ScrollReveal>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-8 text-center">
                Program Studi
              </h2>
            </ScrollReveal>
            <div className="space-y-8">
              {programs.map((program, index) => (
                <ScrollReveal key={program.name} delay={index * 100}>
                  <Card className="overflow-hidden">
                    <CardHeader className="bg-primary text-primary-foreground">
                      <CardTitle className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-3">
                          <GraduationCap className="w-6 h-6" />
                          {program.name}
                        </div>
                        <span className="bg-primary-foreground/20 px-3 py-1 rounded-full text-sm">
                          Akreditasi {program.akreditasi}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground mb-6">{program.description}</p>
                      
                      <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-primary" />
                          <span className="text-sm">{program.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-primary" />
                          <span className="text-sm">{program.sks} SKS</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award className="w-5 h-5 text-primary" />
                          <span className="text-sm">Gelar Sarjana</span>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                            <Target className="w-4 h-4 text-primary" />
                            Kompetensi Lulusan
                          </h4>
                          <ul className="space-y-2">
                            {program.kompetensi.map((item, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-primary" />
                            Prospek Karir
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {program.prospekKarir.map((item, idx) => (
                              <span key={idx} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Dosen Section */}
        <section className="py-12 lg:py-16">
          <div className="section-container">
            <ScrollReveal>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-8 text-center">
                Tenaga Pengajar
              </h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dosen.map((d, index) => (
                <ScrollReveal key={d.name} delay={index * 100}>
                  <Card className="text-center p-6">
                    <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-10 h-10 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground">{d.name}</h4>
                    <p className="text-sm text-primary">{d.jabatan}</p>
                    <p className="text-sm text-muted-foreground mt-1">{d.bidang}</p>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Fasilitas Section */}
        <section className="py-12 lg:py-16 bg-muted/50">
          <div className="section-container">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto">
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-8 text-center">
                  Fasilitas Fakultas
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {fasilitas.map((item, index) => (
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

      </main>
      
      <Footer />
    </div>
  );
};

export default FakultasTeologi;
