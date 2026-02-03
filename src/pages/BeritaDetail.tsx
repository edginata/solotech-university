import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import { ScrollReveal } from '@/hooks/useScrollReveal';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin, User } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

// Mock data - in real app this would come from API/database
const allNews = [
  {
    id: 1,
    title: 'UKTS Meraih Akreditasi Unggul dari BAN-PT',
    excerpt: 'Universitas Kristen Teknologi Solo berhasil meraih akreditasi "Unggul" dari Badan Akreditasi Nasional Perguruan Tinggi, menandai pencapaian kualitas pendidikan yang semakin baik.',
    content: `
      <p>Universitas Kristen Teknologi Solo (UKTS) telah berhasil meraih predikat akreditasi "Unggul" dari Badan Akreditasi Nasional Perguruan Tinggi (BAN-PT). Pencapaian ini merupakan bukti nyata dari komitmen UKTS dalam meningkatkan kualitas pendidikan tinggi di Indonesia.</p>
      
      <p>Proses akreditasi yang ketat meliputi penilaian berbagai aspek, mulai dari kurikulum, tenaga pengajar, fasilitas, hingga output lulusan. Tim asesor BAN-PT melakukan visitasi selama tiga hari dan memberikan penilaian positif terhadap seluruh program studi di UKTS.</p>
      
      <h3>Faktor Keberhasilan</h3>
      <p>Beberapa faktor yang mendukung keberhasilan ini antara lain:</p>
      <ul>
        <li>Kurikulum yang relevan dengan kebutuhan industri</li>
        <li>Tenaga pengajar berkualitas dengan mayoritas bergelar S2 dan S3</li>
        <li>Fasilitas laboratorium dan perpustakaan yang lengkap</li>
        <li>Kerjasama dengan berbagai institusi dalam dan luar negeri</li>
        <li>Tingkat kelulusan dan penyerapan kerja yang tinggi</li>
      </ul>
      
      <h3>Dampak Positif</h3>
      <p>Dengan akreditasi "Unggul", UKTS kini memiliki posisi yang lebih kuat dalam dunia pendidikan tinggi. Mahasiswa akan mendapat pengakuan lebih baik di dunia kerja, sementara institusi dapat menjalin kerjasama yang lebih luas.</p>
      
      <p>Rektor UKTS menyampaikan apresiasi kepada seluruh civitas akademika yang telah bekerja keras dalam proses akreditasi ini. "Ini adalah pencapaian bersama yang harus kita jaga dan tingkatkan," ujarnya.</p>
    `,
    category: 'Prestasi',
    date: '28 Januari 2026',
    readTime: '5 menit',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop',
    author: 'Tim Humas UKTS',
  },
  {
    id: 2,
    title: 'Pembukaan Pendaftaran Mahasiswa Baru 2026/2027',
    excerpt: 'UKTS membuka pendaftaran mahasiswa baru untuk tahun akademik 2026/2027 dengan berbagai program beasiswa menarik.',
    content: `
      <p>Universitas Kristen Teknologi Solo (UKTS) dengan bangga mengumumkan pembukaan pendaftaran mahasiswa baru untuk tahun akademik 2026/2027. Pendaftaran dibuka mulai 1 Februari hingga 31 Juli 2026.</p>
      
      <h3>Program Studi yang Tersedia</h3>
      <p>UKTS menawarkan 5 program studi unggulan:</p>
      <ul>
        <li>S1 Pendidikan Agama Kristen (Fakultas Teologi)</li>
        <li>S1 Teknik Informatika (Fakultas Teknik)</li>
        <li>S1 Teknik Lingkungan (Fakultas Teknik)</li>
        <li>S1 Manajemen (Fakultas Ekonomi)</li>
        <li>S1 Akuntansi (Fakultas Ekonomi)</li>
      </ul>
      
      <h3>Program Beasiswa</h3>
      <p>Tersedia berbagai program beasiswa bagi calon mahasiswa berprestasi:</p>
      <ul>
        <li>Beasiswa Prestasi Akademik (potongan hingga 75%)</li>
        <li>Beasiswa Prestasi Non-Akademik</li>
        <li>Beasiswa Keluarga Tidak Mampu</li>
        <li>Beasiswa Putra/Putri Pendeta</li>
      </ul>
      
      <p>Pendaftaran dapat dilakukan secara online melalui website resmi UKTS atau datang langsung ke kampus. Untuk informasi lebih lanjut, hubungi bagian PMB di nomor (0271) 123456.</p>
    `,
    category: 'PMB',
    date: '25 Januari 2026',
    readTime: '3 menit',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=400&fit=crop',
    author: 'Panitia PMB UKTS',
  },
  {
    id: 3,
    title: 'Workshop Digital Theology untuk Mahasiswa Teologi',
    excerpt: 'Fakultas Teologi mengadakan workshop integrasi teknologi digital dalam pelayanan gereja modern.',
    content: `
      <p>Fakultas Teologi UKTS menyelenggarakan workshop bertema "Digital Theology: Pelayanan Gereja di Era Digital" yang diikuti oleh seluruh mahasiswa program studi Pendidikan Agama Kristen.</p>
      
      <h3>Materi Workshop</h3>
      <p>Workshop ini membahas berbagai topik penting:</p>
      <ul>
        <li>Pemanfaatan media sosial untuk pelayanan</li>
        <li>Produksi konten digital kristiani</li>
        <li>Ibadah online dan hybrid</li>
        <li>Pastoral care melalui platform digital</li>
      </ul>
      
      <p>Para peserta mendapat kesempatan praktik langsung dalam membuat konten digital dan merancang program pelayanan berbasis teknologi.</p>
    `,
    category: 'Akademik',
    date: '22 Januari 2026',
    readTime: '4 menit',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=400&fit=crop',
    author: 'Fakultas Teologi',
  },
  {
    id: 4,
    title: 'Tim Teknik Informatika Juara Hackathon Nasional',
    excerpt: 'Mahasiswa prodi Teknik Informatika berhasil meraih juara 1 dalam kompetisi hackathon tingkat nasional.',
    content: `
      <p>Tim mahasiswa Teknik Informatika UKTS berhasil meraih juara 1 dalam Hackathon Nasional 2026 yang diselenggarakan di Jakarta. Tim yang beranggotakan 3 mahasiswa ini berhasil mengalahkan 150 tim dari berbagai perguruan tinggi di Indonesia.</p>
      
      <h3>Proyek Pemenang</h3>
      <p>Tim UKTS mengembangkan aplikasi bernama "EcoTrack" - platform pemantauan lingkungan berbasis IoT yang membantu masyarakat memantau kualitas udara dan air di sekitar mereka.</p>
      
      <p>Aplikasi ini dinilai inovatif karena menggabungkan teknologi sensor IoT dengan machine learning untuk prediksi kualitas lingkungan.</p>
    `,
    category: 'Prestasi',
    date: '18 Januari 2026',
    readTime: '3 menit',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=400&fit=crop',
    author: 'Tim Humas UKTS',
  },
  {
    id: 5,
    title: 'Kerjasama UKTS dengan Perusahaan Teknologi Multinasional',
    excerpt: 'UKTS menandatangani MoU kerjasama dengan perusahaan teknologi untuk program magang dan rekrutmen.',
    content: `
      <p>UKTS resmi menjalin kerjasama strategis dengan beberapa perusahaan teknologi multinasional untuk program magang dan rekrutmen langsung bagi lulusan.</p>
      
      <h3>Bentuk Kerjasama</h3>
      <ul>
        <li>Program magang terstruktur selama 6 bulan</li>
        <li>Rekrutmen langsung untuk lulusan berprestasi</li>
        <li>Guest lecture dari praktisi industri</li>
        <li>Akses ke platform pembelajaran premium</li>
      </ul>
      
      <p>Kerjasama ini diharapkan dapat meningkatkan employability lulusan UKTS dan mempersiapkan mereka menghadapi tantangan dunia kerja.</p>
    `,
    category: 'Kerjasama',
    date: '15 Januari 2026',
    readTime: '4 menit',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop',
    author: 'Bagian Kerjasama UKTS',
  },
  {
    id: 6,
    title: 'Seminar Kewirausahaan: Membangun Startup dari Kampus',
    excerpt: 'Fakultas Ekonomi mengundang entrepreneur sukses untuk berbagi pengalaman membangun bisnis.',
    content: `
      <p>Fakultas Ekonomi UKTS menyelenggarakan seminar kewirausahaan dengan tema "Membangun Startup dari Kampus" yang menghadirkan beberapa entrepreneur sukses sebagai pembicara.</p>
      
      <h3>Pembicara</h3>
      <p>Seminar ini menghadirkan founder dari berbagai startup sukses yang berbagi pengalaman dan tips membangun bisnis sejak masih menjadi mahasiswa.</p>
      
      <p>Para peserta sangat antusias dan mendapat insight berharga tentang cara memvalidasi ide bisnis, mencari pendanaan, dan membangun tim.</p>
    `,
    category: 'Event',
    date: '10 Januari 2026',
    readTime: '3 menit',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=400&fit=crop',
    author: 'Fakultas Ekonomi',
  },
];

const BeritaDetail = () => {
  const { id } = useParams<{ id: string }>();
  const news = allNews.find(n => n.id === Number(id));

  if (!news) {
    return (
      <div className="min-h-screen flex flex-col">
        <TopBar />
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Berita tidak ditemukan</h1>
            <Link to="/berita">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Berita
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const breadcrumbs = [
    { label: 'Berita & Pengumuman', href: '/berita' },
    { label: news.title.slice(0, 30) + '...', href: `/berita/${news.id}` },
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

  // Related news (same category, excluding current)
  const relatedNews = allNews
    .filter(n => n.category === news.category && n.id !== news.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      
      <main className="flex-1">
        <HeroSection 
          title="Berita & Pengumuman" 
          breadcrumbs={breadcrumbs}
        />

        {/* Article Content */}
        <article className="py-12 lg:py-16">
          <div className="section-container">
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <ScrollReveal>
                <Link to="/berita" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
                  <ArrowLeft className="w-4 h-4" />
                  Kembali ke Berita
                </Link>
              </ScrollReveal>

              {/* Article Header */}
              <ScrollReveal delay={100}>
                <Badge className={`mb-4 ${getCategoryColor(news.category)}`}>
                  {news.category}
                </Badge>
                <h1 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl text-foreground mb-6">
                  {news.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {news.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {news.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {news.readTime} baca
                  </span>
                </div>
              </ScrollReveal>

              {/* Featured Image */}
              <ScrollReveal delay={200}>
                <div className="relative aspect-video rounded-xl overflow-hidden mb-8">
                  <img 
                    src={news.image} 
                    alt={news.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </ScrollReveal>

              {/* Article Body */}
              <ScrollReveal delay={300}>
                <div 
                  className="prose prose-lg dark:prose-invert max-w-none mb-8"
                  dangerouslySetInnerHTML={{ __html: news.content }}
                />
              </ScrollReveal>

              {/* Share Buttons */}
              <ScrollReveal delay={400}>
                <div className="border-t border-b border-border py-6 mb-8">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Share2 className="w-4 h-4" />
                      Bagikan:
                    </span>
                    <div className="flex gap-2">
                      <Button size="icon" variant="outline" className="rounded-full">
                        <Facebook className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="outline" className="rounded-full">
                        <Twitter className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="outline" className="rounded-full">
                        <Linkedin className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Related News */}
              {relatedNews.length > 0 && (
                <ScrollReveal delay={500}>
                  <h2 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-6">
                    Berita Terkait
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {relatedNews.map((item) => (
                      <Link key={item.id} to={`/berita/${item.id}`}>
                        <Card className="h-full group cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                          <div className="aspect-video overflow-hidden rounded-t-lg">
                            <img 
                              src={item.image} 
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <CardContent className="p-4">
                            <Badge className={`mb-2 text-xs ${getCategoryColor(item.category)}`}>
                              {item.category}
                            </Badge>
                            <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                              {item.title}
                            </h3>
                            <span className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {item.date}
                            </span>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </ScrollReveal>
              )}
            </div>
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default BeritaDetail;
