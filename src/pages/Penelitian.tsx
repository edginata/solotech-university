import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FlaskConical, FileText, Award, Users, Target, Lightbulb } from 'lucide-react';

const Penelitian = () => {
  const breadcrumbs = [
    { label: 'Penelitian', href: '/penelitian' },
  ];

  const researchAreas = [
    {
      icon: FlaskConical,
      title: 'Teknologi Informasi',
      description: 'Penelitian dalam bidang kecerdasan buatan, big data, IoT, dan pengembangan aplikasi.',
    },
    {
      icon: Lightbulb,
      title: 'Teologi Kontekstual',
      description: 'Kajian teologi yang relevan dengan konteks masyarakat Indonesia modern.',
    },
    {
      icon: Target,
      title: 'Ekonomi Kreatif',
      description: 'Penelitian tentang UMKM, entrepreneurship, dan pemberdayaan ekonomi masyarakat.',
    },
  ];

  const publications = [
    {
      title: 'Implementasi Machine Learning untuk Prediksi Kelulusan Mahasiswa',
      author: 'Dr. Budi Santoso, M.Kom',
      journal: 'Jurnal Teknologi Informasi',
      year: '2023',
    },
    {
      title: 'Teologi Digital: Tantangan Pelayanan di Era Media Sosial',
      author: 'Pdt. Dr. Yohanes Prasetyo, M.Th',
      journal: 'Jurnal Teologi Kontekstual',
      year: '2023',
    },
    {
      title: 'Strategi UMKM dalam Menghadapi Transformasi Digital',
      author: 'Dr. Maria Kristiani, M.M',
      journal: 'Jurnal Ekonomi dan Bisnis',
      year: '2023',
    },
    {
      title: 'Pengembangan Sistem Informasi Akademik Berbasis Cloud',
      author: 'Ir. Hendro Wijaya, M.T',
      journal: 'Jurnal Sistem Informasi',
      year: '2022',
    },
  ];

  const stats = [
    { value: '50+', label: 'Publikasi Nasional' },
    { value: '25+', label: 'Publikasi Internasional' },
    { value: '30+', label: 'Hibah Penelitian' },
    { value: '15+', label: 'Hak Kekayaan Intelektual' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      
      <main className="flex-1">
        <HeroSection 
          title="Penelitian" 
          breadcrumbs={breadcrumbs}
        />

        {/* Intro Section */}
        <section className="py-12 lg:py-16">
          <div className="section-container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-6">
                Pusat Penelitian UKTS
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Lembaga Penelitian dan Pengabdian Masyarakat (LPPM) UKTS berkomitmen untuk mengembangkan 
                penelitian yang berkualitas dan berdampak bagi masyarakat. Kami mendorong dosen dan mahasiswa 
                untuk aktif melakukan riset yang relevan dengan kebutuhan industri dan masyarakat.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-primary">
          <div className="section-container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center text-primary-foreground">
                  <div className="font-heading font-bold text-3xl md:text-4xl mb-1">{stat.value}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Research Areas */}
        <section className="py-12 lg:py-16 bg-muted/50">
          <div className="section-container">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-8 text-center">
              Bidang Penelitian Unggulan
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {researchAreas.map((area) => (
                <Card key={area.title} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <area.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2">{area.title}</h3>
                    <p className="text-muted-foreground text-sm">{area.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Publications */}
        <section className="py-12 lg:py-16">
          <div className="section-container">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-8 text-center">
              Publikasi Terbaru
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {publications.map((pub, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2 leading-tight">{pub.title}</h3>
                        <p className="text-sm text-muted-foreground mb-1">{pub.author}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="bg-muted px-2 py-0.5 rounded">{pub.journal}</span>
                          <span>{pub.year}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Research Support */}
        <section className="py-12 lg:py-16 bg-muted/50">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-6">
                  Dukungan Penelitian
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  UKTS menyediakan berbagai fasilitas dan dukungan untuk kegiatan penelitian, termasuk:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">Hibah penelitian internal dan eksternal</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">Bimbingan penulisan artikel ilmiah</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FlaskConical className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">Akses laboratorium dan fasilitas riset</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">Pendampingan pendaftaran HKI</span>
                  </li>
                </ul>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Kontak LPPM</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Untuk informasi lebih lanjut tentang penelitian dan pengabdian masyarakat, 
                    silakan hubungi Lembaga Penelitian dan Pengabdian Masyarakat UKTS.
                  </p>
                  <div className="space-y-2 text-sm">
                    <p><strong>Email:</strong> lppm@ukts.ac.id</p>
                    <p><strong>Telepon:</strong> (0271) 637145</p>
                    <p><strong>Lokasi:</strong> Gedung Rektorat Lt. 2</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Penelitian;
