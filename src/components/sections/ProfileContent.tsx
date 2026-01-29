const ProfileContent = () => {
  return (
    <section className="py-12 lg:py-20 bg-background">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-primary mb-8">
            Profil Singkat Solotech University
          </h2>

          {/* Video Embed - Note: Using placeholder since no official UKTS video found */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl mb-10 bg-muted flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <p className="text-muted-foreground">Video Profil UKTS</p>
              <p className="text-sm text-muted-foreground/60 mt-1">Coming Soon</p>
            </div>
          </div>

          {/* Profile Content */}
          <div className="prose prose-lg max-w-none">
            <h3 className="font-heading font-semibold text-xl text-primary mb-4">
              Solotech University
            </h3>

            <p className="text-foreground/80 leading-relaxed mb-6">
              Universitas Kristen Teknologi Solo (UKTS) atau Solotech: Solo Technology Christian University, sebelumnya Universitas Kristen Surakarta, sedang bertransformasi menjadi kampus yang berfokus pada tiga kriteria: <strong>teknologi dan entrepreneurship yang ditopang oleh nilai-nilai kristiani</strong>.
            </p>

            <p className="text-foreground/80 leading-relaxed mb-6">
              Dengan tagline <strong>"Technology for Transformation"</strong>, semua prodi di lingkungan UKTS mengintegrasikan teknologi ke dalam bidang-bidang ilmu yang diajarkan, termasuk di prodi-prodi di dalam Fakultas Ekonomi dan Teologi. Misalnya, di fakultas teologi, terdapat mata kuliah Digital Theology. Dengan demikian, lulusan UKTS diharapkan fasih memakai produk-produk teknologi dalam profesi mereka kelak.
            </p>

            <h3 className="font-heading font-semibold text-xl text-primary mt-8 mb-4">
              Sejarah Singkat
            </h3>

            <p className="text-foreground/80 leading-relaxed mb-6">
              Universitas Kristen Teknologi Solo (UKTS) adalah nama baru dari Universitas Kristen Surakarta (UKS) yang dikukuhkan dengan Keputusan Menteri Pendidikan, Kebudayaan, dan Teknologi Nomor 725/E/O/2022. Embrio UKTS adalah Institut Agama Kristen Surakarta (IAKS) yang didirikan pada tanggal 24 Agustus 1983.
            </p>

            <p className="text-foreground/80 leading-relaxed mb-6">
              Pembentukan Yayasan Penyelenggara Universitas, yaitu Yayasan Pendidikan Tinggi Kristen Wolter Monginsidi diinisiasi oleh majelis 9 gereja (8 GKJ dan 1 GPIB) dalam komitmen "gereja turut berpartisipasi membangun bangsa melalui jalur pendidikan."
            </p>

            <h3 className="font-heading font-semibold text-xl text-primary mt-8 mb-4">
              Visi dan Misi
            </h3>

            <div className="bg-muted/50 rounded-xl p-6 mb-6">
              <h4 className="font-heading font-semibold text-lg text-foreground mb-2">Visi</h4>
              <p className="text-foreground/80 leading-relaxed">
                Menjadi universitas unggul berkelas global dengan kekuatan karakter kewirausahaan dan teknologi berlandaskan nilai-nilai kristiani.
              </p>
            </div>

            <div className="bg-muted/50 rounded-xl p-6 mb-8">
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

            <h3 className="font-heading font-semibold text-xl text-primary mt-8 mb-4">
              Fakultas & Program Studi
            </h3>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-shadow">
                <h5 className="font-heading font-semibold text-foreground mb-2">Fakultas Teologi</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Pendidikan Agama Kristen</li>
                  <li>• Pastoral Konseling</li>
                </ul>
              </div>
              <div className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-shadow">
                <h5 className="font-heading font-semibold text-foreground mb-2">Fakultas Teknik</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Teknik Informatika</li>
                  <li>• Teknik Lingkungan</li>
                </ul>
              </div>
              <div className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-shadow">
                <h5 className="font-heading font-semibold text-foreground mb-2">Fakultas Ekonomi</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Manajemen</li>
                  <li>• Akuntansi</li>
                </ul>
              </div>
            </div>

            <h3 className="font-heading font-semibold text-xl text-primary mt-8 mb-4">
              Keunggulan UKTS
            </h3>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {[
                { title: 'Technology for Transformation', desc: 'Integrasi teknologi ke seluruh program studi untuk menghasilkan lulusan siap era digital' },
                { title: 'Nilai-Nilai Kristiani', desc: 'Pendidikan berbasis karakter kristiani yang membentuk integritas dan pelayanan' },
                { title: 'Program Beasiswa SPARK', desc: 'Beasiswa hingga 100% untuk mahasiswa bertalenta dan berprestasi' },
                { title: 'Entrepreneurship', desc: 'Pengembangan jiwa kewirausahaan untuk mencetak lulusan mandiri dan inovatif' },
              ].map((item) => (
                <div key={item.title} className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-shadow">
                  <h5 className="font-heading font-semibold text-foreground mb-2">{item.title}</h5>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>

            <p className="text-foreground/80 leading-relaxed">
              Sebagai institusi pendidikan yang terus bertransformasi, Universitas Kristen Teknologi Solo berkomitmen untuk menghasilkan lulusan yang tidak hanya kompeten secara teknis, tetapi juga memiliki karakter kuat berdasarkan nilai-nilai kristiani, jiwa kewirausahaan, dan kemampuan beradaptasi dengan perubahan teknologi. Bergabunglah dengan UKTS dan jadilah bagian dari transformasi melalui teknologi!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileContent;
