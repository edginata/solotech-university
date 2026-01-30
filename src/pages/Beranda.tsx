import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Users, BookOpen, Award, ChevronRight, Calendar, ArrowRight } from 'lucide-react';
import heroCampus from '@/assets/hero-campus.jpg';

const Beranda = () => {
  const stats = [
    { icon: GraduationCap, value: '3', label: 'Fakultas' },
    { icon: Users, value: '1000+', label: 'Mahasiswa' },
    { icon: BookOpen, value: '8', label: 'Program Studi' },
    { icon: Award, value: '30+', label: 'Tahun Pengalaman' },
  ];

  const news = [
    {
      title: 'Pendaftaran Mahasiswa Baru 2024/2025 Dibuka',
      date: '15 Januari 2024',
      excerpt: 'UKTS membuka pendaftaran mahasiswa baru dengan berbagai program beasiswa menarik.',
    },
    {
      title: 'Seminar Nasional Teknologi dan Entrepreneurship',
      date: '10 Januari 2024',
      excerpt: 'Fakultas Teknik menyelenggarakan seminar nasional dengan tema inovasi teknologi.',
    },
    {
      title: 'Kerjasama dengan Industri Teknologi',
      date: '5 Januari 2024',
      excerpt: 'UKTS menjalin kerjasama strategis dengan berbagai perusahaan teknologi terkemuka.',
    },
  ];

  const faculties = [
    { name: 'Fakultas Teologi', description: 'Mempersiapkan pemimpin rohani yang berkompeten', prodi: 3 },
    { name: 'Fakultas Teknik', description: 'Mencetak ahli teknologi yang inovatif', prodi: 3 },
    { name: 'Fakultas Ekonomi', description: 'Mengembangkan entrepreneur berjiwa kristiani', prodi: 2 },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[500px] md:h-[600px] lg:h-[700px]">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroCampus})` }}
          />
          <div className="hero-overlay" />
          
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-primary-foreground section-container">
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-center mb-4 animate-fade-in">
              Universitas Kristen Teknologi Solo
            </h1>
            <p className="text-lg md:text-xl text-center mb-8 opacity-90 max-w-2xl animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Technology for Transformation - Membangun generasi yang unggul dalam teknologi dan berkarakter kristiani
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Button className="cta-button text-lg px-8 py-6">
                Daftar Sekarang
              </Button>
              <Button variant="outline" className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-6">
                Pelajari Lebih Lanjut
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-primary">
          <div className="section-container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center text-primary-foreground">
                  <stat.icon className="w-10 h-10 mx-auto mb-3 opacity-80" />
                  <div className="font-heading font-bold text-3xl md:text-4xl mb-1">{stat.value}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 lg:py-20">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-6">
                  Tentang UKTS
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Universitas Kristen Teknologi Solo (UKTS) adalah perguruan tinggi yang berdiri sejak tahun 1993, 
                  berkomitmen untuk menghasilkan lulusan yang kompeten di bidang teknologi, ekonomi, dan teologi 
                  dengan landasan nilai-nilai kristiani.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Dengan motto "Technology for Transformation", UKTS mempersiapkan mahasiswa untuk menjadi 
                  agen perubahan yang mampu memberikan kontribusi positif bagi masyarakat dan bangsa.
                </p>
                <a href="/profil" className="inline-flex items-center text-primary font-semibold hover:underline">
                  Selengkapnya tentang UKTS <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </div>
              <div className="bg-muted rounded-2xl p-8">
                <h3 className="font-heading font-semibold text-xl mb-4">Visi Kami</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Menjadi universitas terkemuka dalam pengembangan teknologi digital dan entrepreneurship 
                  yang ditopang oleh nilai-nilai kristiani untuk transformasi masyarakat.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Faculties Section */}
        <section className="py-16 lg:py-20 bg-muted/50">
          <div className="section-container">
            <div className="text-center mb-12">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
                Fakultas & Program Studi
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                UKTS memiliki 3 fakultas dengan berbagai program studi yang dirancang untuk memenuhi kebutuhan industri modern.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {faculties.map((faculty) => (
                <Card key={faculty.name} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <GraduationCap className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2">{faculty.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{faculty.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-primary font-medium">{faculty.prodi} Program Studi</span>
                      <ArrowRight className="w-4 h-4 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* News Section */}
        <section className="py-16 lg:py-20">
          <div className="section-container">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-2">
                  Berita Terkini
                </h2>
                <p className="text-muted-foreground">Update terbaru dari kampus UKTS</p>
              </div>
              <a href="#" className="hidden md:inline-flex items-center text-primary font-semibold hover:underline">
                Lihat Semua <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {news.map((item, index) => (
                <Card key={index} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="w-4 h-4" />
                      {item.date}
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">{item.excerpt}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 text-center md:hidden">
              <a href="#" className="inline-flex items-center text-primary font-semibold hover:underline">
                Lihat Semua Berita <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-20 bg-primary">
          <div className="section-container text-center">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary-foreground mb-4">
              Siap Bergabung dengan UKTS?
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Daftarkan dirimu sekarang dan jadilah bagian dari komunitas yang berkomitmen untuk transformasi melalui teknologi.
            </p>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6">
              Daftar Mahasiswa Baru
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Beranda;
