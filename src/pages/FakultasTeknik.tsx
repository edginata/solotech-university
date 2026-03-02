import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import { ScrollReveal } from '@/hooks/useScrollReveal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Clock, Users, Target, Award, FileText, GraduationCap, Monitor, Leaf } from 'lucide-react';

const FakultasTeknik = () => {
  const breadcrumbs = [
    { label: 'Akademik', href: '/akademik' },
    { label: 'Fakultas Teknik', href: '/fakultas/teknik' },
  ];

  const programs = [
    {
      name: 'S1 Teknik Informatika',
      duration: '4 Tahun (8 Semester)',
      akreditasi: 'B',
      sks: 144,
      icon: <Monitor className="w-6 h-6" />,
      description: 'Program studi yang menghasilkan lulusan dengan kemampuan merancang, membangun, dan mengembangkan sistem perangkat lunak dan solusi teknologi informasi yang inovatif.',
      kompetensi: [
        'Menguasai pemrograman dan algoritma',
        'Mampu mengembangkan aplikasi web dan mobile',
        'Memahami arsitektur dan desain sistem',
        'Menguasai machine learning dan AI dasar',
        'Mampu mengelola proyek software development',
      ],
      prospekKarir: ['Software Engineer', 'Full-Stack Developer', 'Mobile Developer', 'Data Scientist', 'IT Consultant'],
      konsentrasi: ['Software Engineering', 'Artificial Intelligence', 'Cyber Security'],
    },
    {
      name: 'S1 Teknik Lingkungan',
      duration: '4 Tahun (8 Semester)',
      akreditasi: 'B',
      sks: 144,
      icon: <Leaf className="w-6 h-6" />,
      description: 'Program studi yang mempersiapkan ahli lingkungan dengan kemampuan menganalisis, merancang, dan mengelola sistem pengelolaan lingkungan yang berkelanjutan.',
      kompetensi: [
        'Mampu menganalisis dampak lingkungan',
        'Menguasai teknologi pengolahan air dan limbah',
        'Memahami manajemen lingkungan dan K3',
        'Mampu merancang sistem pengendalian pencemaran',
        'Menguasai audit dan sertifikasi lingkungan',
      ],
      prospekKarir: ['Environmental Engineer', 'HSE Officer', 'Konsultan Lingkungan', 'Auditor Lingkungan', 'Peneliti Lingkungan'],
      konsentrasi: ['Pengelolaan Limbah', 'Kualitas Udara', 'Sustainable Development'],
    },
  ];

  const dosen = [
    { name: 'Bambang Kristiawan, S.Si.,M.Sc.', bidang: 'Teknik Informatika'},
    { name: 'Retno Palupi, S.Si.,M.Cs.', bidang: 'Teknik Informatika' },
    { name: 'Omega Rimba Gemilang, M.Kom.', bidang: 'Teknik Informatika' },
    { name: 'Agus Hariyanto, S.T.,MBA.', bidang: 'Teknik Informatika' },
    { name: 'Nurul Sutarti, SP.,M.Si.', bidang: 'Teknik Informatika'},
    { name: 'Cecelia Astrid M. Subroto, B.Sc.,M.M.', bidang: 'Teknik Informatika'},
    { name: 'Dr. Ir. Eko Widodo, M.T', bidang: 'Teknik Informatika'},
    { name: 'Dr. Iman Faskayana', bidang: 'Teknik Informatika'},
    { name: 'Dr. Roberto Akuyuwen, STP.,S.E.,M.Si.', bidang: 'Teknik Informatika'},
    { name: 'Richardus Indra Gunawan, S.TP.,M.Si.', bidang: 'Teknik Lingkungan'},
    { name: 'Agerippa Yanuranda Krismani, M.Sc.', bidang: 'Teknik Lingkungan'},
    { name: 'Elvis Umbu Lolo, S.T.,M.T.', bidang: 'Teknik Lingkungan'},
    { name: 'Yonathan Suryo Pambudi, S.T.,M.Si.', bidang: 'Teknik Lingkungan'},
    { name: 'Dra. Cicik Sudaryantiningsih, M.Si.', bidang: 'Teknik Lingkungan'},
    { name: 'Widianto, S.T.,M.T.', bidang: 'Teknik Lingkungan'},
  ];

  const fasilitas = [
    'Laboratorium Pemrograman (50 PC)',
    'Lab Jaringan Komputer Cisco Academy',
    'Lab Hardware & IoT',
    'Lab Multimedia & Game Development',
    'Data Center Mini',
    'Coworking Space untuk Startup',
  ];

  const partnerships = [
    'Microsoft Imagine Academy',
    'Cisco Networking Academy',
    'Oracle Academy',
    'AWS Academy',
    'Google Developer Student Club',
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      
      <main className="flex-1">
        <HeroSection 
          title="Fakultas Teknik" 
          breadcrumbs={breadcrumbs}
        />

        {/* Intro Section */}
        <section className="py-12 lg:py-16">
          <div className="section-container">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-6">
                  Mencetak Inovator Teknologi Masa Depan
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Fakultas Teknik UKTS adalah pusat pengembangan talenta digital dengan kurikulum yang 
                  mengikuti perkembangan industri 4.0. Kami mempersiapkan mahasiswa dengan keterampilan 
                  teknis dan soft skills yang dibutuhkan untuk sukses di era transformasi digital.
                </p>
                <div className="flex justify-center gap-8 text-center">
                  <div>
                    <div className="font-heading font-bold text-3xl text-primary">800+</div>
                    <div className="text-sm text-muted-foreground">Mahasiswa Aktif</div>
                  </div>
                  <div>
                    <div className="font-heading font-bold text-3xl text-primary">3.500+</div>
                    <div className="text-sm text-muted-foreground">Alumni</div>
                  </div>
                  <div>
                    <div className="font-heading font-bold text-3xl text-primary">95%</div>
                    <div className="text-sm text-muted-foreground">Tingkat Kelulusan</div>
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
                          {program.icon}
                          {program.name}
                        </div>
                        <span className="bg-primary-foreground/20 px-3 py-1 rounded-full text-sm">
                          Akreditasi {program.akreditasi}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground mb-6">{program.description}</p>
                      
                      <div className="grid md:grid-cols-4 gap-4 mb-6">
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
                          <span className="text-sm">{program.name.includes('D3') ? 'Ahli Madya' : 'Sarjana'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-5 h-5 text-primary" />
                          <span className="text-sm">{program.konsentrasi.length} Konsentrasi</span>
                        </div>
                      </div>

                      {/* Konsentrasi */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-foreground mb-3">Konsentrasi/Peminatan:</h4>
                        <div className="flex flex-wrap gap-2">
                          {program.konsentrasi.map((item, idx) => (
                            <span key={idx} className="bg-accent/20 text-accent-foreground border border-accent/30 px-3 py-1 rounded-full text-sm">
                              {item}
                            </span>
                          ))}
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
                    <p className="text-sm text-primary">{d.bidang}</p>
                    <p className="text-sm text-muted-foreground mt-1">{d.bidang}</p>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Fasilitas & Partnership */}
        <section className="py-12 lg:py-16 bg-muted/50">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-12">
              <ScrollReveal>
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-6">
                  Fasilitas Laboratorium
                </h2>
                <div className="space-y-3">
                  {fasilitas.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 bg-background p-4 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></div>
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-6">
                  Kemitraan Industri
                </h2>
                <div className="space-y-3">
                  {partnerships.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 bg-background p-4 rounded-lg">
                      <Award className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
};

export default FakultasTeknik;
