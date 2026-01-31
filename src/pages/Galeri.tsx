import { useState } from 'react';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import { ScrollReveal } from '@/hooks/useScrollReveal';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X, ZoomIn } from 'lucide-react';

// Import gallery images
import kampusUtama from '@/assets/gallery/kampus-utama.jpg';
import labKomputer from '@/assets/gallery/lab-komputer.jpg';
import kapel from '@/assets/gallery/kapel.jpg';
import wisuda from '@/assets/gallery/wisuda.jpg';
import perpustakaan from '@/assets/gallery/perpustakaan.jpg';
import pentasSeni from '@/assets/gallery/pentas-seni.jpg';
import olahraga from '@/assets/gallery/olahraga.jpg';
import pengabdian from '@/assets/gallery/pengabdian.jpg';

interface GalleryItem {
  id: number;
  src: string;
  title: string;
  category: string;
  description: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    src: kampusUtama,
    title: 'Gedung Utama Kampus',
    category: 'Kampus',
    description: 'Gedung utama UKTS yang modern dengan fasilitas lengkap untuk kegiatan akademik.'
  },
  {
    id: 2,
    src: labKomputer,
    title: 'Laboratorium Komputer',
    category: 'Fasilitas',
    description: 'Lab komputer dengan perangkat modern untuk mendukung pembelajaran teknologi.'
  },
  {
    id: 3,
    src: kapel,
    title: 'Kapel Kampus',
    category: 'Kampus',
    description: 'Kapel kampus sebagai pusat kegiatan kerohanian civitas akademika.'
  },
  {
    id: 4,
    src: wisuda,
    title: 'Wisuda Sarjana',
    category: 'Kegiatan',
    description: 'Momen kebahagiaan wisuda mahasiswa UKTS yang telah menyelesaikan studi.'
  },
  {
    id: 5,
    src: perpustakaan,
    title: 'Perpustakaan',
    category: 'Fasilitas',
    description: 'Perpustakaan dengan koleksi buku lengkap dan ruang baca yang nyaman.'
  },
  {
    id: 6,
    src: pentasSeni,
    title: 'Pentas Seni Budaya',
    category: 'Kegiatan',
    description: 'Penampilan seni budaya mahasiswa dalam acara kampus tahunan.'
  },
  {
    id: 7,
    src: olahraga,
    title: 'Kompetisi Olahraga',
    category: 'Kegiatan',
    description: 'Pertandingan basket antar fakultas dalam rangka Dies Natalis kampus.'
  },
  {
    id: 8,
    src: pengabdian,
    title: 'Pengabdian Masyarakat',
    category: 'Kegiatan',
    description: 'Kegiatan pengabdian masyarakat mahasiswa di desa binaan.'
  },
];

const categories = ['Semua', 'Kampus', 'Fasilitas', 'Kegiatan'];

const Galeri = () => {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const breadcrumbs = [
    { label: 'Galeri', href: '/galeri' },
  ];

  const filteredItems = selectedCategory === 'Semua' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      
      <main className="flex-1">
        <HeroSection 
          title="Galeri Foto" 
          breadcrumbs={breadcrumbs}
        />

        {/* Filter Section */}
        <section className="py-8 bg-muted/30">
          <div className="section-container">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'bg-background text-foreground border border-border hover:border-primary hover:text-primary'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-12 lg:py-16">
          <div className="section-container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item, index) => (
                <ScrollReveal key={item.id} delay={index * 50}>
                  <div 
                    className="group relative overflow-hidden rounded-xl bg-background shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedImage(item)}
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <span className="text-primary-foreground/80 text-xs uppercase tracking-wider mb-1">
                        {item.category}
                      </span>
                      <h3 className="text-primary-foreground font-semibold text-lg">
                        {item.title}
                      </h3>
                    </div>

                    {/* Zoom Icon */}
                    <div className="absolute top-4 right-4 bg-background/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ZoomIn className="w-5 h-5 text-primary" />
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary/90 text-primary-foreground text-xs px-3 py-1 rounded-full">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox Dialog */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background">
            {selectedImage && (
              <div className="relative">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 z-10 bg-background/90 p-2 rounded-full hover:bg-background transition-colors"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
                <div className="p-6">
                  <span className="text-primary text-sm uppercase tracking-wider">
                    {selectedImage.category}
                  </span>
                  <h3 className="font-heading font-bold text-xl text-foreground mt-1">
                    {selectedImage.title}
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    {selectedImage.description}
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Stats Section */}
        <section className="py-12 lg:py-16 bg-primary text-primary-foreground">
          <div className="section-container">
            <ScrollReveal>
              <div className="text-center mb-8">
                <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                  Kehidupan Kampus UKTS
                </h2>
                <p className="text-primary-foreground/80 max-w-2xl mx-auto">
                  Bergabunglah dengan ribuan mahasiswa yang mengembangkan potensi mereka 
                  di lingkungan kampus yang kondusif dan penuh kesempatan.
                </p>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <ScrollReveal delay={100}>
                <div>
                  <div className="font-heading font-bold text-4xl mb-2">20+</div>
                  <div className="text-primary-foreground/80 text-sm">Unit Kegiatan Mahasiswa</div>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <div>
                  <div className="font-heading font-bold text-4xl mb-2">50+</div>
                  <div className="text-primary-foreground/80 text-sm">Kegiatan Tahunan</div>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={300}>
                <div>
                  <div className="font-heading font-bold text-4xl mb-2">100+</div>
                  <div className="text-primary-foreground/80 text-sm">Prestasi Mahasiswa</div>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={400}>
                <div>
                  <div className="font-heading font-bold text-4xl mb-2">15+</div>
                  <div className="text-primary-foreground/80 text-sm">Fasilitas Modern</div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Galeri;
