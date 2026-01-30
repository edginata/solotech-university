import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Users, MapPin, Calendar, HandHeart, Building, GraduationCap } from 'lucide-react';

const Pengabdian = () => {
  const breadcrumbs = [
    { label: 'Pengabdian', href: '/pengabdian' },
  ];

  const programs = [
    {
      icon: HandHeart,
      title: 'Pemberdayaan Masyarakat',
      description: 'Program pelatihan dan pendampingan untuk meningkatkan kapasitas masyarakat dalam bidang teknologi dan kewirausahaan.',
    },
    {
      icon: GraduationCap,
      title: 'Pendidikan Masyarakat',
      description: 'Kegiatan edukasi berupa seminar, workshop, dan pelatihan untuk masyarakat umum.',
    },
    {
      icon: Building,
      title: 'Kemitraan Industri',
      description: 'Kerjasama dengan industri dan instansi dalam bentuk konsultasi dan pendampingan.',
    },
    {
      icon: Heart,
      title: 'Pelayanan Gerejawi',
      description: 'Dukungan bagi gereja-gereja dalam pengembangan program pelayanan dan manajemen.',
    },
  ];

  const recentActivities = [
    {
      title: 'Pelatihan Digital Marketing untuk UMKM',
      location: 'Kecamatan Banjarsari, Surakarta',
      date: 'Desember 2023',
      participants: '50 Peserta',
    },
    {
      title: 'Workshop Pembuatan Website Gereja',
      location: 'Sinode GKJ Solo',
      date: 'November 2023',
      participants: '30 Peserta',
    },
    {
      title: 'Bakti Sosial dan Pemeriksaan Kesehatan',
      location: 'Desa Gondang, Sragen',
      date: 'Oktober 2023',
      participants: '200 Warga',
    },
    {
      title: 'Pelatihan Komputer Dasar untuk Lansia',
      location: 'Panti Wredha Surakarta',
      date: 'September 2023',
      participants: '25 Peserta',
    },
  ];

  const impacts = [
    { value: '500+', label: 'Masyarakat Terdampak' },
    { value: '20+', label: 'Desa/Kelurahan' },
    { value: '50+', label: 'Kegiatan/Tahun' },
    { value: '100+', label: 'Mitra Kerjasama' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      
      <main className="flex-1">
        <HeroSection 
          title="Pengabdian Masyarakat" 
          breadcrumbs={breadcrumbs}
        />

        {/* Intro Section */}
        <section className="py-12 lg:py-16">
          <div className="section-container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-6">
                Pengabdian kepada Masyarakat
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Sebagai wujud Tri Dharma Perguruan Tinggi, UKTS aktif melaksanakan berbagai program 
                pengabdian kepada masyarakat. Kegiatan ini merupakan bentuk kontribusi nyata kampus 
                untuk pemberdayaan dan peningkatan kualitas hidup masyarakat, terutama di wilayah 
                Surakarta dan sekitarnya.
              </p>
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-12 bg-primary">
          <div className="section-container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {impacts.map((stat) => (
                <div key={stat.label} className="text-center text-primary-foreground">
                  <div className="font-heading font-bold text-3xl md:text-4xl mb-1">{stat.value}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Programs */}
        <section className="py-12 lg:py-16 bg-muted/50">
          <div className="section-container">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-8 text-center">
              Program Unggulan
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {programs.map((program) => (
                <Card key={program.title} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <program.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2">{program.title}</h3>
                    <p className="text-muted-foreground text-sm">{program.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Activities */}
        <section className="py-12 lg:py-16">
          <div className="section-container">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-8 text-center">
              Kegiatan Terbaru
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {recentActivities.map((activity, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="font-heading font-semibold text-lg mb-3">{activity.title}</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        {activity.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        {activity.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        {activity.participants}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership */}
        <section className="py-12 lg:py-16 bg-muted/50">
          <div className="section-container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-6">
                Bermitra dengan UKTS
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                UKTS terbuka untuk kerjasama pengabdian masyarakat dengan berbagai pihak, termasuk 
                pemerintah, perusahaan, LSM, dan komunitas. Mari bersama-sama memberikan dampak 
                positif bagi masyarakat.
              </p>
              <Card className="max-w-md mx-auto">
                <CardContent className="p-6 text-left">
                  <h3 className="font-heading font-semibold mb-4">Hubungi Kami</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><strong>LPPM UKTS</strong></p>
                    <p>Email: lppm@ukts.ac.id</p>
                    <p>Telepon: (0271) 637145</p>
                    <p>Jl. R.W. Monginsidi No. 36-38, Surakarta</p>
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

export default Pengabdian;
