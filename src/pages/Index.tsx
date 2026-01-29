import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import ProfileContent from '@/components/sections/ProfileContent';

const Index = () => {
  const breadcrumbs = [
    { label: 'Profil', href: '/profil' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      
      <main className="flex-1">
        <HeroSection 
          title="Profil Universitas Amikom Yogyakarta" 
          breadcrumbs={breadcrumbs}
        />
        <ProfileContent />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
