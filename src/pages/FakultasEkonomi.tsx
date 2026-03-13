import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import { ScrollReveal } from '@/hooks/useScrollReveal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Clock, Users, Target, Award, FileText, TrendingUp, Briefcase } from 'lucide-react';

const FakultasEkonomi = () => {
  const breadcrumbs = [
    { label: 'Akademik', href: '/akademik' },
    { label: 'Fakultas Ekonomi', href: '/fakultas/ekonomi' },
  ];

  const programs = [
    {
      name: 'S1 Manajemen',
      duration: '4 Tahun (8 Semester)',
      akreditasi: 'B',
      sks: 144,
      icon: <TrendingUp className="w-6 h-6" />,
      description: 'Program studi yang mempersiapkan calon pemimpin bisnis dan entrepreneur dengan pemahaman manajemen modern dan nilai-nilai etika kristiani dalam berbisnis.',
      kompetensi: [
        'Menguasai prinsip-prinsip manajemen modern',
        'Mampu menganalisis dan menyusun strategi bisnis',
        'Memiliki kemampuan kepemimpinan dan komunikasi',
        'Menguasai manajemen keuangan dan pemasaran',
        'Mampu mengembangkan business plan',
      ],
      prospekKarir: ['Manager Perusahaan', 'Entrepreneur', 'Marketing Manager', 'HR Manager', 'Business Consultant'],
      konsentrasi: ['Manajemen Keuangan', 'Manajemen Pemasaran', 'Manajemen SDM', 'Kewirausahaan'],
    },
    {
      name: 'S1 Akuntansi',
      duration: '4 Tahun (8 Semester)',
      akreditasi: 'B',
      sks: 146,
      icon: <Briefcase className="w-6 h-6" />,
      description: 'Program studi yang menghasilkan akuntan profesional dengan integritas tinggi, menguasai standar akuntansi nasional dan internasional.',
      kompetensi: [
        'Menguasai standar akuntansi PSAK dan IFRS',
        'Mampu menyusun laporan keuangan',
        'Memahami perpajakan dan audit',
        'Menguasai sistem informasi akuntansi',
        'Mampu menganalisis kinerja keuangan',
      ],
      prospekKarir: ['Akuntan Publik', 'Auditor', 'Tax Consultant', 'Financial Analyst', 'CFO'],
      konsentrasi: ['Akuntansi Keuangan', 'Akuntansi Perpajakan', 'Audit', 'Akuntansi Manajemen'],
    },
  ];

  const dosen = [
    { name: 'Mardanung Patmo Cahjono, SE.,M.Sc.Ak.', bidang: 'Ekonomi Akuntansi' },
    { name: 'Hernawati Pramesti, S.E.,M.Si.Ak.', bidang: 'Ekonomi Akuntansi' },
    { name: 'Magdalena Nany, S.E.,M.Si.Ak.', bidang: 'Ekonomi Akuntansi' },
    { name: 'Mujiyono, S.E.,M.Si.', bidang: 'Ekonomi Akuntansi' },
    { name: 'Endang Satyawati, S.E.,M.Si.Ak.', bidang: 'Ekonomi Akuntansi' },
    { name: 'Sandra Galuh Asmarawati, S.E.,Akt.,M.M.', bidang: 'Ekonomi Akuntansi' },
    { name: 'Basuki Nugroho, S.E.,M.Si.', bidang: 'Ekonomi Manajemen' },
    { name: 'Dyah Ayu Puri Palupi, S.E.,M.M.', bidang: 'Ekonomi Manajemen' },
    { name: 'Kristyana Dananti, S.E.,M.Si.', bidang: 'Ekonomi Manajemen' },
    { name: 'Indah Handaruwati, S.E.,M.M.', bidang: 'Ekonomi Manajemen' },
    { name: 'Adhita Maharani Dewi, S.E.,M.M.', bidang: 'Ekonomi Manajemen' },
    { name: 'Dr. Ir. Yahya Agung Kuntadi,M.M.', bidang: 'Ekonomi Manajemen' },
    { name: 'Dr. Ir. Asto Sunu Subroto, M.M', bidang: 'Ekonomi Manajemen' },
    { name: 'Dr. Drs. Suprayitno, M.Si.', bidang: 'Ekonomi Manajemen ' },
  ];

  const fasilitas = [
    'Laboratorium Akuntansi Komputer',
    'Mini Bank & Bursa Efek Simulasi',
    'Incubator Bisnis Mahasiswa',
    'Pusat Karir dan Kewirausahaan',
    'Perpustakaan Ekonomi & Bisnis',
    'Ruang Seminar & Workshop',
  ];

  const achievements = [
    { title: 'Business Plan Competition', year: '2024', result: 'Juara 1 Nasional' },
    { title: 'Tax Competition', year: '2024', result: 'Juara 2 Regional' },
    { title: 'Accounting Olympiad', year: '2023', result: 'Best Paper Award' },
    { title: 'Marketing Challenge', year: '2023', result: 'Top 10 Nasional' },
  ];

  const sertifikasi = [
    'Certified Public Accountant (CPA) Program',
    'Brevet Pajak A & B',
    'Certified Financial Planner (CFP)',
    'Digital Marketing Certification',
    'SAP Business User Certificate',
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      
      <main className="flex-1">
        <HeroSection 
          title="Fakultas Ekonomi" 
          breadcrumbs={breadcrumbs}
        />

        {/* Intro Section */}
        <section className="py-12 lg:py-16">
          <div className="section-container">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-6">
                  Mengembangkan Pemimpin Bisnis Berkarakter
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Fakultas Ekonomi UKTS berkomitmen mencetak profesional bisnis dan akuntan yang tidak hanya 
                  kompeten secara teknis, tetapi juga memiliki integritas dan nilai-nilai etika kristiani. 
                  Kami mempersiapkan mahasiswa untuk menjadi pemimpin yang membawa dampak positif bagi dunia usaha.
                </p>
                <div className="flex justify-center gap-8 text-center">
                  <div>
                    <div className="font-heading font-bold text-3xl text-primary">600+</div>
                    <div className="text-sm text-muted-foreground">Mahasiswa Aktif</div>
                  </div>
                  <div>
                    <div className="font-heading font-bold text-3xl text-primary">2.800+</div>
                    <div className="text-sm text-muted-foreground">Alumni</div>
                  </div>
                  <div>
                    <div className="font-heading font-bold text-3xl text-primary">90%</div>
                    <div className="text-sm text-muted-foreground">Tingkat Kerja 6 Bulan</div>
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

        {/* Sertifikasi Section */}
        <section className="py-12 lg:py-16">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-12">
              <ScrollReveal>
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-6">
                  Program Sertifikasi
                </h2>
                <p className="text-muted-foreground mb-6">
                  Mahasiswa berkesempatan mengikuti program sertifikasi profesional yang terintegrasi dengan kurikulum.
                </p>
                <div className="space-y-3">
                  {sertifikasi.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 bg-muted/50 p-4 rounded-lg">
                      <Award className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-6">
                  Prestasi Mahasiswa
                </h2>
                <div className="space-y-4">
                  {achievements.map((item, index) => (
                    <div key={index} className="border border-border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-foreground">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.year}</p>
                        </div>
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                          {item.result}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Dosen Section */}
        <section className="py-12 lg:py-16 bg-muted/50">
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

        {/* Fasilitas Section */}
        <section className="py-12 lg:py-16">
          <div className="section-container">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto">
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-8 text-center">
                  Fasilitas Fakultas
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {fasilitas.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 bg-muted/50 p-4 rounded-lg">
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

export default FakultasEkonomi;
