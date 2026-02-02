import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import { ScrollReveal } from '@/hooks/useScrollReveal';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight, Bell, Megaphone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Berita = () => {
  const breadcrumbs = [
    { label: 'Berita & Pengumuman', href: '/berita' },
  ];

  const featuredNews = {
    id: 1,
    title: 'UKTS Meraih Akreditasi Unggul dari BAN-PT',
    excerpt: 'Universitas Kristen Teknologi Solo berhasil meraih akreditasi "Unggul" dari Badan Akreditasi Nasional Perguruan Tinggi, menandai pencapaian kualitas pendidikan yang semakin baik.',
    category: 'Prestasi',
    date: '28 Januari 2026',
    readTime: '5 menit',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop',
  };

  const newsItems = [
    {
      id: 2,
      title: 'Pembukaan Pendaftaran Mahasiswa Baru 2026/2027',
      excerpt: 'UKTS membuka pendaftaran mahasiswa baru untuk tahun akademik 2026/2027 dengan berbagai program beasiswa menarik.',
      category: 'PMB',
      date: '25 Januari 2026',
      readTime: '3 menit',
    },
    {
      id: 3,
      title: 'Workshop Digital Theology untuk Mahasiswa Teologi',
      excerpt: 'Fakultas Teologi mengadakan workshop integrasi teknologi digital dalam pelayanan gereja modern.',
      category: 'Akademik',
      date: '22 Januari 2026',
      readTime: '4 menit',
    },
    {
      id: 4,
      title: 'Tim Teknik Informatika Juara Hackathon Nasional',
      excerpt: 'Mahasiswa prodi Teknik Informatika berhasil meraih juara 1 dalam kompetisi hackathon tingkat nasional.',
      category: 'Prestasi',
      date: '18 Januari 2026',
      readTime: '3 menit',
    },
    {
      id: 5,
      title: 'Kerjasama UKTS dengan Perusahaan Teknologi Multinasional',
      excerpt: 'UKTS menandatangani MoU kerjasama dengan perusahaan teknologi untuk program magang dan rekrutmen.',
      category: 'Kerjasama',
      date: '15 Januari 2026',
      readTime: '4 menit',
    },
    {
      id: 6,
      title: 'Seminar Kewirausahaan: Membangun Startup dari Kampus',
      excerpt: 'Fakultas Ekonomi mengundang entrepreneur sukses untuk berbagi pengalaman membangun bisnis.',
      category: 'Event',
      date: '10 Januari 2026',
      readTime: '3 menit',
    },
  ];

  const announcements = [
    {
      id: 1,
      title: 'Jadwal Ujian Akhir Semester Gasal 2025/2026',
      date: '30 Januari 2026',
      priority: 'high',
    },
    {
      id: 2,
      title: 'Pendaftaran Wisuda Periode Maret 2026',
      date: '28 Januari 2026',
      priority: 'high',
    },
    {
      id: 3,
      title: 'Libur Semester Gasal: 1-14 Februari 2026',
      date: '25 Januari 2026',
      priority: 'medium',
    },
    {
      id: 4,
      title: 'Pembayaran SPP Semester Genap 2025/2026',
      date: '20 Januari 2026',
      priority: 'high',
    },
    {
      id: 5,
      title: 'Rekrutmen Asisten Laboratorium Teknik',
      date: '18 Januari 2026',
      priority: 'low',
    },
  ];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Prestasi': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'PMB': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      'Akademik': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      'Kerjasama': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      'Event': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
    };
    return colors[category] || 'bg-muted text-muted-foreground';
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      'high': 'border-l-red-500',
      'medium': 'border-l-yellow-500',
      'low': 'border-l-green-500',
    };
    return colors[priority] || 'border-l-muted';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      
      <main className="flex-1">
        <HeroSection 
          title="Berita & Pengumuman" 
          breadcrumbs={breadcrumbs}
        />

        {/* Featured News */}
        <section className="py-12 lg:py-16">
          <div className="section-container">
            <ScrollReveal>
              <div className="flex items-center gap-2 mb-8">
                <Megaphone className="w-6 h-6 text-primary" />
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground">
                  Berita Utama
                </h2>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={100}>
              <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300">
                <div className="grid lg:grid-cols-2">
                  <div className="relative h-64 lg:h-auto overflow-hidden">
                    <img 
                      src={featuredNews.image} 
                      alt={featuredNews.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:hidden" />
                  </div>
                  <CardContent className="p-6 lg:p-8 flex flex-col justify-center">
                    <Badge className={`w-fit mb-4 ${getCategoryColor(featuredNews.category)}`}>
                      {featuredNews.category}
                    </Badge>
                    <h3 className="font-heading font-bold text-xl lg:text-2xl text-foreground mb-4 group-hover:text-primary transition-colors">
                      {featuredNews.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 line-clamp-3">
                      {featuredNews.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {featuredNews.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredNews.readTime}
                      </span>
                    </div>
                    <button className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                      Baca Selengkapnya
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </CardContent>
                </div>
              </Card>
            </ScrollReveal>
          </div>
        </section>

        {/* News Grid and Announcements */}
        <section className="py-12 lg:py-16 bg-muted/50">
          <div className="section-container">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* News Grid */}
              <div className="lg:col-span-2">
                <ScrollReveal>
                  <h2 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-6">
                    Berita Terbaru
                  </h2>
                </ScrollReveal>
                <div className="grid md:grid-cols-2 gap-6">
                  {newsItems.map((news, index) => (
                    <ScrollReveal key={news.id} delay={index * 100}>
                      <Card className="h-full group cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                        <CardContent className="p-5">
                          <Badge className={`mb-3 ${getCategoryColor(news.category)}`}>
                            {news.category}
                          </Badge>
                          <h3 className="font-heading font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {news.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {news.excerpt}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {news.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {news.readTime}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </ScrollReveal>
                  ))}
                </div>
              </div>

              {/* Announcements Sidebar */}
              <div>
                <ScrollReveal>
                  <div className="flex items-center gap-2 mb-6">
                    <Bell className="w-5 h-5 text-primary" />
                    <h2 className="font-heading font-bold text-xl md:text-2xl text-foreground">
                      Pengumuman
                    </h2>
                  </div>
                </ScrollReveal>
                <div className="space-y-4">
                  {announcements.map((item, index) => (
                    <ScrollReveal key={item.id} delay={index * 100}>
                      <Card className={`border-l-4 ${getPriorityColor(item.priority)} cursor-pointer hover:shadow-md transition-all`}>
                        <CardContent className="p-4">
                          <h4 className="font-medium text-foreground text-sm mb-2 line-clamp-2">
                            {item.title}
                          </h4>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {item.date}
                          </span>
                        </CardContent>
                      </Card>
                    </ScrollReveal>
                  ))}
                </div>
                
                <ScrollReveal delay={500}>
                  <Link 
                    to="/pengumuman" 
                    className="mt-6 flex items-center justify-center gap-2 text-primary font-medium hover:gap-3 transition-all bg-background rounded-lg p-4 border border-border hover:border-primary"
                  >
                    Lihat Semua Pengumuman
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 lg:py-16">
          <div className="section-container">
            <ScrollReveal>
              <h2 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-6 text-center">
                Kategori Berita
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="flex flex-wrap justify-center gap-3">
                {['Semua', 'Prestasi', 'PMB', 'Akademik', 'Kerjasama', 'Event', 'Kemahasiswaan'].map((cat) => (
                  <button
                    key={cat}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      cat === 'Semua' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Berita;
