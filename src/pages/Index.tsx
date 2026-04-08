import { useEffect } from 'react';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import ProfileContent from '@/components/sections/ProfileContent';
import NewsSection from '@/components/sections/NewsSection';
import KegiatanSection from '@/components/sections/KegiatanSection';
import JadwalSection from '@/components/sections/JadwalSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import NewsletterSection from '@/components/sections/NewsletterSection';
import { useActiveYear } from '@/hooks/useActiveYear';

const Index = () => {
  const activeYear = useActiveYear();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      
      <main className="flex-1">
        <HeroSection 
          title="Selamat Datang di Solotech University" 
          subtitle="Pendidikan Berkualitas Global Berlandaskan Nilai Kristiani"
          cta={{ label: `Buka PMB ${activeYear}`, href: '/pmb' }}
        />
        
        <ProfileContent />
        
        <div id="berita">
          <NewsSection />
        </div>

        <div id="kegiatan">
          <KegiatanSection />
        </div>

        <div id="jadwal">
          <JadwalSection />
        </div>

        <div id="akses-cepat">
          <FeaturesSection />
        </div>
        
        <div id="testimonial">
          <TestimonialsSection />
        </div>
        
        <NewsletterSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
