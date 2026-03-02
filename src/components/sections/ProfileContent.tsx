import { ScrollReveal } from '@/hooks/useScrollReveal';
import videoukts from '@/assets/videos/videoukts.mp4';

const ProfileContent = () => {
  return (
    <section className="py-12 lg:py-20 bg-background">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <ScrollReveal>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-primary mb-8">
              Profil Singkat Solotech University
            </h2>
          </ScrollReveal>

          {/* Video Embed - replace `profilbaru.mp4` with your provided video file in `src/assets/gallery/` */}
          <ScrollReveal delay={100}>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl mb-10 bg-muted flex items-center justify-center">
                <video
                  src={videoukts}
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                >
                  Your browser does not support the video tag.
                </video>
            </div>
          </ScrollReveal>

          {/* Profile Content */}
          <div className="prose prose-lg max-w-none">
            <ScrollReveal>
              <h3 className="font-heading font-semibold text-xl text-primary mb-4">
                Solotech University
              </h3>

              <p className="text-foreground/80 leading-relaxed mb-6">
                Universitas Kristen Teknologi Solo (UKTS) atau Solotech: Solo Technology Christian University, sebelumnya Universitas Kristen Surakarta, sedang bertransformasi menjadi kampus yang berfokus pada tiga kriteria: <strong>teknologi dan entrepreneurship yang ditopang oleh nilai-nilai kristiani</strong>.
              </p>

              <p className="text-foreground/80 leading-relaxed mb-6">
                Dengan tagline <strong>"Technology for Transformation"</strong>, semua prodi di lingkungan UKTS mengintegrasikan teknologi ke dalam bidang-bidang ilmu yang diajarkan, termasuk di prodi-prodi di dalam Fakultas Ekonomi dan Teologi. Misalnya, di fakultas teologi, terdapat mata kuliah Digital Theology. Dengan demikian, lulusan UKTS diharapkan fasih memakai produk-produk teknologi dalam profesi mereka kelak.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h3 id="sejarah" className="font-heading font-semibold text-xl text-primary mt-8 mb-4">
                Sejarah Singkat
              </h3>

              <p className="text-foreground/80 leading-relaxed mb-6">
                Universitas Kristen Teknologi Solo (UKTS) adalah nama baru dari Universitas Kristen Surakarta (UKS) yang dikukuhkan dengan Keputusan Menteri Pendidikan, Kebudayaan, dan Teknologi Nomor 725/E/O/2022. Embrio UKTS adalah Institut Agama Kristen Surakarta (IAKS) yang didirikan pada tanggal 24 Agustus 1983.
              </p>

              <p className="text-foreground/80 leading-relaxed mb-6">
                Pembentukan Yayasan Penyelenggara Universitas, yaitu Yayasan Pendidikan Tinggi Kristen Wolter Monginsidi diinisiasi oleh majelis 9 gereja (8 GKJ dan 1 GPIB) dalam komitmen "gereja turut berpartisipasi membangun bangsa melalui jalur pendidikan."
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h3 id="visi-misi" className="font-heading font-semibold text-xl text-primary mt-8 mb-4">
                Visi dan Misi
              </h3>

              <div className="bg-muted/50 rounded-xl p-6 mb-6 hover:shadow-lg transition-shadow">
                <h4 className="font-heading font-semibold text-lg text-foreground mb-2">Visi</h4>
                <p className="text-foreground/80 leading-relaxed">
                  Menjadi universitas unggul berkelas global dengan kekuatan karakter kewirausahaan dan teknologi berlandaskan nilai-nilai kristiani.
                </p>
              </div>

              <div className="bg-muted/50 rounded-xl p-6 mb-8 hover:shadow-lg transition-shadow">
                <h4 className="font-heading font-semibold text-lg text-foreground mb-3">Misi</h4>
                <ul className="space-y-2 text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Menyelenggarakan pendidikan ilmu, teknologi, dan seni yang relevan untuk menghasilkan lulusan berkualitas global yang memiliki pengetahuan keilmuan yang handal, berjiwa kewirausahaan, berkarakter handal teknologi, dan berintegritas berlandaskan nilai-nilai kristiani.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Menyelenggarakan penelitian dengan mengembangkan budaya inovatif, proaktif, dan kolaboratif untuk menghasilkan karya-karya baru yang bermanfaat bagi gereja dan masyarakat berlandaskan nilai-nilai kristiani.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Menyelenggarakan pengabdian kepada masyarakat sebagai wujud komitmen partisipasi untuk berkontribusi pada transformasi gereja dan masyarakat berlandaskan nilai-nilai kristiani.</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <h3 id="struktur" className="font-heading font-semibold text-xl text-primary mt-8 mb-4">
                Fakultas & Program Studi
              </h3>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {[
                  { name: 'Fakultas Teologi', programs: ['S1 Pendidikan Agama Kristen'] },
                  { name: 'Fakultas Teknik', programs: ['S1 Teknik Informatika', 'S1 Teknik Lingkungan'] },
                  { name: 'Fakultas Ekonomi', programs: ['S1 Manajemen', 'S1 Akuntansi'] },
                ].map((faculty, index) => (
                  <div 
                    key={faculty.name} 
                    className="bg-card border border-border rounded-xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <h5 className="font-heading font-semibold text-foreground mb-2">{faculty.name}</h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {faculty.programs.map((program) => (
                        <li key={program}>• {program}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <h3 id="fasilitas" className="font-heading font-semibold text-xl text-primary mt-8 mb-4">
                Keunggulan UKTS
              </h3>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {[
                  { title: 'Technology for Transformation', desc: 'Integrasi teknologi ke seluruh program studi untuk menghasilkan lulusan siap era digital' },
                  { title: 'Nilai-Nilai Kristiani', desc: 'Pendidikan berbasis karakter kristiani yang membentuk integritas dan pelayanan' },
                  { title: 'Program Beasiswa SPARK', desc: 'Beasiswa hingga 100% untuk mahasiswa bertalenta dan berprestasi' },
                  { title: 'Entrepreneurship', desc: 'Pengembangan jiwa kewirausahaan untuk mencetak lulusan mandiri dan inovatif' },
                ].map((item, index) => (
                  <div 
                    key={item.title} 
                    className="bg-card border border-border rounded-xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <h5 className="font-heading font-semibold text-foreground mb-2">{item.title}</h5>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <h3 id="akreditasi" className="font-heading font-semibold text-xl text-primary mt-8 mb-4">
                Akreditasi & Penghargaan
              </h3>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {[
                  { 
                    title: 'Akreditasi Institusi', 
                    status: 'Unggul',
                    issuer: 'BAN-PT',
                    desc: 'Terakreditasi dengan predikat Unggul oleh Badan Akreditasi Nasional Perguruan Tinggi' 
                  },
                  { 
                    title: 'Program Studi Teologi', 
                    status: 'Terakreditasi',
                    issuer: 'LAM Pendidikan Agama',
                    desc: 'S1 Pendidikan Agama Kristen dengan standar kurikulum internasional' 
                  },
                  { 
                    title: 'Program Teknik', 
                    status: 'Terakreditasi',
                    issuer: 'ABET/IABEE',
                    desc: 'Program Teknik Informatika dan Teknik Lingkungan dengan sertifikasi engineering' 
                  },
                  { 
                    title: 'ISO 9001:2015', 
                    status: 'Tersertifikasi',
                    issuer: 'Badan Sertifikasi',
                    desc: 'Sistem manajemen mutu untuk semua proses akademik dan administratif' 
                  },
                  { 
                    title: 'Green Campus', 
                    status: 'Bersertifikat',
                    issuer: 'Kementerian LHK',
                    desc: 'Komitmen terhadap keberlanjutan lingkungan dan pengembangan kampus hijau' 
                  },
                  { 
                    title: 'International Partnership', 
                    status: 'Aktif',
                    issuer: 'Global Universities',
                    desc: 'Kerjasama dengan 25+ universitas internasional di berbagai negara' 
                  },
                ].map((cert, index) => (
                  <div 
                    key={cert.title} 
                    className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-heading font-semibold text-foreground flex-1">{cert.title}</h5>
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full whitespace-nowrap ml-2">{cert.status}</span>
                    </div>
                    <p className="text-xs text-primary font-semibold mb-2">{cert.issuer}</p>
                    <p className="text-sm text-muted-foreground">{cert.desc}</p>
                  </div>
                ))}
              </div>

              <p className="text-foreground/80 leading-relaxed">
                Sebagai institusi pendidikan yang terus bertransformasi, Universitas Kristen Teknologi Solo berkomitmen untuk menghasilkan lulusan yang tidak hanya kompeten secara teknis, tetapi juga memiliki karakter kuat berdasarkan nilai-nilai kristiani, jiwa kewirausahaan, dan kemampuan beradaptasi dengan perubahan teknologi. Bergabunglah dengan UKTS dan jadilah bagian dari transformasi melalui teknologi!
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileContent;
