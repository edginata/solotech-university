import { useState, useEffect, useCallback } from 'react';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Users, BookOpen, Award, ChevronRight, ChevronLeft, ArrowRight, Phone } from 'lucide-react';
import { ScrollReveal } from '@/hooks/useScrollReveal';

const Beranda = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'Akreditasi Unggul',
      subtitle: 'UKTS Meraih Akreditasi Unggul dari BAN-PT',
      description: 'Berdasarkan Surat Keputusan BAN-PT, Universitas Kristen Teknologi Solo telah meraih predikat Akreditasi Unggul.',
      bgImage: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1920&h=800&fit=crop',
    },
    {
      id: 2,
      title: 'Technology for Transformation',
      subtitle: 'Selamat Datang di Universitas Kristen Teknologi Solo',
      description: 'Membangun generasi yang unggul dalam teknologi dengan landasan nilai-nilai kristiani.',
      bgImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=800&fit=crop',
    },
    {
      id: 3,
      title: 'Pendaftaran Mahasiswa Baru',
      subtitle: 'Tahun Akademik 2026/2027',
      description: 'Daftarkan dirimu sekarang dan raih masa depan cemerlang bersama UKTS.',
      bgImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&h=800&fit=crop',
    },
    {
      id: 4,
      title: 'Fasilitas Modern',
      subtitle: 'Laboratorium dan Perpustakaan Lengkap',
      description: 'Didukung dengan fasilitas modern untuk mendukung proses pembelajaran.',
      bgImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1920&h=800&fit=crop',
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-play
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const stats = [
    { icon: GraduationCap, value: '3', label: 'Fakultas' },
    { icon: Users, value: '1000+', label: 'Mahasiswa' },
    { icon: BookOpen, value: '5', label: 'Program Studi' },
    { icon: Award, value: '30+', label: 'Tahun Pengalaman' },
  ];

  const faculties = [
    { 
      name: 'Fakultas Teologi', 
      description: 'Mempersiapkan pemimpin rohani yang berkompeten', 
      prodi: 1,
      programs: ['S1 Pendidikan Agama Kristen'],
      href: '/fakultas/teologi'
    },
    { 
      name: 'Fakultas Teknik', 
      description: 'Mencetak ahli teknologi yang inovatif', 
      prodi: 2,
      programs: ['S1 Teknik Informatika', 'S1 Teknik Lingkungan'],
      href: '/fakultas/teknik'
    },
    { 
      name: 'Fakultas Ekonomi', 
      description: 'Mengembangkan entrepreneur berjiwa kristiani', 
      prodi: 2,
      programs: ['S1 Manajemen', 'S1 Akuntansi'],
      href: '/fakultas/ekonomi'
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      
      <main className="flex-1">
        {/* Hero Carousel Section */}
        <section className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
          {/* Slides */}
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.bgImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
              
              {/* Slide Content */}
              <div className="relative z-10 h-full flex items-center">
                <div className="section-container w-full">
                  <div className="grid lg:grid-cols-3 gap-8 items-center h-full">
                    {/* Left Content */}
                    <div className="lg:col-span-2 text-primary-foreground">
                      <div className="max-w-2xl">
                        <span className="inline-block px-4 py-1 bg-accent text-accent-foreground text-sm font-semibold rounded-full mb-4 animate-fade-in">
                          {slide.title}
                        </span>
                        <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                          {slide.subtitle}
                        </h1>
                        <p className="text-lg md:text-xl opacity-90 mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                          {slide.description}
                        </p>
                      </div>
                    </div>

                    {/* Right Registration Panel */}
                    <div className="hidden lg:block">
                      <Card className="bg-background/95 backdrop-blur-sm shadow-2xl border-0">
                        <CardContent className="p-6">
                          <h3 className="font-heading font-bold text-2xl text-accent mb-2">
                            Yuk Daftar Sekarang!
                          </h3>
                          <p className="text-muted-foreground text-sm mb-6">
                            Bantuan Seputar Pendaftaran & Beasiswa?
                          </p>
                          
                          <div className="mb-4">
                            <span className="text-sm text-muted-foreground">WhatsApp</span>
                            <a 
                              href="https://wa.me/6281234567890" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 mt-2 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                            >
                              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                <Phone className="w-5 h-5 text-white" />
                              </div>
                              <span className="font-semibold text-foreground">0812-3456-7890</span>
                            </a>
                          </div>

                          <a 
                            href="/pmb" 
                            className="flex items-center justify-between p-3 border-2 border-dashed border-accent text-accent rounded-lg hover:bg-accent/10 transition-colors mb-4"
                          >
                            <span className="font-medium">Info Beasiswa Mahasiswa Baru</span>
                            <ChevronRight className="w-5 h-5" />
                          </a>

                          <a href="/pendaftaran">
                            <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-6 text-lg font-semibold">
                              <span>Pendaftaran Mahasiswa Baru</span>
                              <ChevronRight className="w-5 h-5 ml-2" />
                            </Button>
                          </a>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 right-8 z-20 flex flex-col gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'bg-accent scale-125' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Mobile Registration CTA */}
          <div className="absolute bottom-4 left-4 right-4 z-20 lg:hidden">
            <a href="/pendaftaran">
              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-4 text-lg font-semibold shadow-lg">
                <span>Daftar Mahasiswa Baru</span>
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-primary">
          <div className="section-container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <ScrollReveal key={stat.label} delay={index * 100}>
                  <div className="text-center text-primary-foreground">
                    <stat.icon className="w-10 h-10 mx-auto mb-3 opacity-80" />
                    <div className="font-heading font-bold text-3xl md:text-4xl mb-1">{stat.value}</div>
                    <div className="text-sm opacity-80">{stat.label}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 lg:py-20">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <ScrollReveal>
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
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <div className="bg-muted rounded-2xl p-8">
                  <h3 className="font-heading font-semibold text-xl mb-4">Visi Kami</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Menjadi universitas terkemuka dalam pengembangan teknologi digital dan entrepreneurship 
                    yang ditopang oleh nilai-nilai kristiani untuk transformasi masyarakat.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Faculties Section */}
        <section className="py-16 lg:py-20 bg-muted/50">
          <div className="section-container">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
                  Fakultas & Program Studi
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  UKTS memiliki 3 fakultas dengan 5 program studi yang dirancang untuk memenuhi kebutuhan industri modern.
                </p>
              </div>
            </ScrollReveal>
            <div className="grid md:grid-cols-3 gap-6">
              {faculties.map((faculty, index) => (
                <ScrollReveal key={faculty.name} delay={index * 150}>
                  <a href={faculty.href}>
                    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                          <GraduationCap className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-heading font-semibold text-lg mb-2">{faculty.name}</h3>
                        <p className="text-muted-foreground text-sm mb-4">{faculty.description}</p>
                        <ul className="text-sm text-muted-foreground mb-4 space-y-1">
                          {faculty.programs.map((prog) => (
                            <li key={prog} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                              {prog}
                            </li>
                          ))}
                        </ul>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-primary font-medium">{faculty.prodi} Program Studi</span>
                          <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-20 bg-primary">
          <div className="section-container text-center">
            <ScrollReveal>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary-foreground mb-4">
                Siap Bergabung dengan UKTS?
              </h2>
              <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
                Daftarkan dirimu sekarang dan jadilah bagian dari komunitas yang berkomitmen untuk transformasi melalui teknologi.
              </p>
              <a href="/pendaftaran">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 hover-scale">
                  Daftar Mahasiswa Baru
                </Button>
              </a>
            </ScrollReveal>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Beranda;
