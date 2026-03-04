import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  GraduationCap, 
  Calendar, 
  FileText, 
  CreditCard, 
  CheckCircle, 
  Phone, 
  MessageCircle,
  Award,
  Users,
  Clock
} from 'lucide-react';

// fallback poster image
import pmbPosterFallback from '@/assets/gallery/pmbbaru.png';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const PMB = () => {
  const [posterUrl, setPosterUrl] = useState<string>(pmbPosterFallback);

  useEffect(() => {
    supabase.from('site_settings').select('value').eq('key', 'pmb_poster_url').maybeSingle().then(({ data }) => {
      if (data?.value) setPosterUrl(data.value);
    });
  }, []);
  const breadcrumbs = [
    { label: 'PMB', href: '/pmb' },
  ];

  const steps = [
    {
      number: '1',
      title: 'Pendaftaran Online',
      description: 'Daftar melalui website PMB dan lengkapi formulir pendaftaran.',
    },
    {
      number: '2',
      title: 'Upload Dokumen',
      description: 'Unggah dokumen persyaratan seperti ijazah, transkrip, dan foto.',
    },
    {
      number: '3',
      title: 'Pembayaran',
      description: 'Lakukan pembayaran biaya pendaftaran melalui bank yang ditentukan.',
    },
    {
      number: '4',
      title: 'Seleksi',
      description: 'Ikuti proses seleksi berupa tes tertulis dan/atau wawancara.',
    },
    {
      number: '5',
      title: 'Pengumuman',
      description: 'Cek hasil seleksi melalui website atau media sosial UKTS.',
    },
    {
      number: '6',
      title: 'Daftar Ulang',
      description: 'Lakukan daftar ulang dan pembayaran biaya kuliah.',
    },
  ];

  const requirements = [
    'Fotokopi Ijazah/SKL (legalisir)',
    'Fotokopi Rapor semester 1-5',
    'Pas Foto 3x4 (4 lembar)',
    'Fotokopi KTP/KK',
    'Surat Keterangan Sehat',
    'Formulir Pendaftaran',
  ];

  const scholarships = [
    {
      name: 'Beasiswa SPARK',
      description: 'Beasiswa prestasi akademik untuk mahasiswa berprestasi.',
      coverage: 'Hingga 100% biaya kuliah',
    },
    {
      name: 'Beasiswa Prestasi',
      description: 'Untuk calon mahasiswa dengan nilai rapor tinggi.',
      coverage: 'Potongan 25-50% biaya kuliah',
    },
    {
      name: 'Beasiswa Ekonomi',
      description: 'Bantuan untuk mahasiswa dari keluarga kurang mampu.',
      coverage: 'Potongan biaya kuliah',
    },
    {
      name: 'Beasiswa Pelayanan',
      description: 'Khusus untuk calon mahasiswa teologi dan PAK.',
      coverage: 'Hingga 75% biaya kuliah',
    },
  ];

  const timeline = [
    { period: 'Pendaftaran', date: 'November - Juli', status: 'Dibuka' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      
      <main className="flex-1 pb-24">
        <HeroSection 
          title="Penerimaan Mahasiswa Baru" 
          breadcrumbs={breadcrumbs}
        />

        {/* Poster terbaru (menggunakan asset lokal) */}
        <section className="py-12 lg:py-16 bg-muted/10">
          <div className="section-container">
            <div className="max-w-3xl mx-auto text-center">
              <img
                src={posterUrl}
                alt="Poster PMB Baru"
                className="mx-auto w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-12 lg:py-16">
          <div className="section-container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-6">
                Bergabunglah dengan UKTS
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Universitas Kristen Teknologi Solo membuka kesempatan bagi calon mahasiswa baru 
                untuk bergabung dan menjadi bagian dari komunitas yang berkomitmen pada 
                transformasi melalui teknologi dan nilai-nilai kristiani.
              </p>
              <Button 
              asChild 
              className="cta-button text-lg px-8 py-6"
>
            <a href="/pendaftaran">Daftar Sekarang</a>
            </Button>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-12 bg-primary">
          <div className="section-container">
            <h2 className="font-heading font-bold text-2xl text-primary-foreground mb-8 text-center">
              Jadwal Pendaftaran 2025/2026
            </h2>
           <div className="flex justify-center">
              {timeline.map((item) => (
               <div key={item.period} className="bg-primary-foreground/10 rounded-lg p-6 text-center w-full max-w-sm">
                  <div className="font-heading font-bold text-xl text-primary-foreground mb-2">
                    {item.period}
                  </div>
                  <div className="text-primary-foreground/80 mb-2">{item.date}</div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    item.status === 'Dibuka' 
                      ? 'bg-accent text-accent-foreground' 
                      : 'bg-primary-foreground/20 text-primary-foreground'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Registration Steps */}
        <section className="py-12 lg:py-16 bg-muted/50">
          <div className="section-container">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-8 text-center">
              Alur Pendaftaran
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {steps.map((step) => (
                <div key={step.number} className="flex gap-4">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-12 lg:py-16">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-6">
                  Persyaratan Pendaftaran
                </h2>
                <div className="space-y-3">
                  {requirements.map((req) => (
                    <div key={req} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{req}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Biaya Pendaftaran
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-heading font-bold text-primary mb-2">
                    Rp 250.000
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    Biaya pendaftaran tidak dapat dikembalikan
                  </p>
                  <div className="bg-muted rounded-lg p-4 text-sm">
                    <p className="font-medium mb-2">Transfer ke:</p>
                    <p className="text-muted-foreground">Bank BCA</p>
                    <p className="text-muted-foreground">No. Rek: 123-456-7890</p>
                    <p className="text-muted-foreground">a.n. Yayasan UKTS</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Scholarships */}
        <section className="py-12 lg:py-16 bg-muted/50">
          <div className="section-container">
            <div className="text-center mb-8">
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-4">
                Program Beasiswa
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                UKTS menyediakan berbagai program beasiswa untuk membantu calon mahasiswa 
                mewujudkan impian kuliah.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {scholarships.map((scholarship) => (
                <Card key={scholarship.name} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                      <Award className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-heading font-semibold mb-2">{scholarship.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{scholarship.description}</p>
                    <div className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded inline-block">
                      {scholarship.coverage}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact PMB */}
        <section className="py-12 lg:py-16">
          <div className="section-container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-6">
                Butuh Bantuan?
              </h2>
              <p className="text-muted-foreground mb-8">
                Tim PMB UKTS siap membantu Anda. Hubungi kami untuk informasi lebih lanjut.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:0271637145"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  (0271) 637145
                </a>
                <a 
                  href="https://api.whatsapp.com/send?phone=6285117247527"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp PMB
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default PMB;
