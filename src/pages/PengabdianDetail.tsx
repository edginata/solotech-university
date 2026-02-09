import { useParams } from 'react-router-dom';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollReveal } from '@/hooks/useScrollReveal';

const projects = [
  {
    id: '0',
    image: '/src/assets/gallery/galerikerja.jpeg',
    author: 'Mahasiswa Teknik - Alfandi W.S',
    title: 'Sistem Informasi Pemilihan Presiden Mahasiswa',
    description:
      'Seiring dengan berkembangnya zaman saat ini, kini pekerjaan-pekerjaan yang dahulu dilakukan dengan cara manual dapat dipermudah dengan penerapan dari ilmu informatika.',
  },
  {
    id: '1',
    image: '/src/assets/gallery/tomat.jpg',
    author: 'Mahasiswa Teknik - Alfandi W.S',
    title: 'Teknologi Pendeteksi Dini Hama Tanaman Tomat',
    description:
      'Meningkatkan efisiensi pertanian dan mengurangi dampak serangan hama, memberikan langkah preventif yang cepat dan tepat bagi para petani.',
  },
  {
    id: '2',
    image: '/src/assets/gallery/baktisosialukts.png',
    author: 'Mahasiswa dan Dosen UKTS',
    title: 'Bakti Sosial Di Panti Jompo GKJ Margoyudan',
    description:
      'Salah satu bentuk pengabdian kepada masyarakat, dan wujud dari kasih kepada sesama. Mahasiswa dan Dosen melakukan kegiatan Bakti Sosial di Panti Jompo Margoyudan.',
  },
];

const PengabdianDetail = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id) || projects[0];

  const breadcrumbs = [{ label: 'Pengabdian', href: '/pengabdian' }, { label: project.title, href: `/pengabdian/${project.id}` }];

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-1">
        <HeroSection title={project.title} breadcrumbs={breadcrumbs} />

        <section className="py-12 lg:py-16">
          <div className="section-container">
            <ScrollReveal>
              <Card>
                <img src={project.image} alt={project.title} className="w-full h-64 object-cover rounded-t-lg" />
                <CardContent>
                  <h2 className="font-heading font-bold text-2xl mb-2">{project.title}</h2>
                  <p className="text-sm text-muted-foreground mb-4">{project.author}</p>
                  <p className="text-foreground/80 leading-relaxed">{project.description}</p>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PengabdianDetail;
