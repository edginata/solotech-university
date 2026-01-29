const ProfileContent = () => {
  return (
    <section className="py-12 lg:py-20 bg-background">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-primary mb-8">
            Profil Singkat Universitas Amikom Yogyakarta
          </h2>

          {/* Video Embed */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl mb-10">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/KMMbKqX7rlE"
              title="University of AMIKOM Yogyakarta - Creative Economy Park"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Profile Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-foreground/80 leading-relaxed mb-6">
              Universitas AMIKOM Yogyakarta merupakan salah satu perguruan tinggi swasta terkemuka di Indonesia yang berfokus pada bidang teknologi informasi dan komunikasi. Didirikan pada tahun 1994, AMIKOM telah berkembang menjadi institusi pendidikan yang diakui secara nasional dan internasional dalam menghasilkan lulusan berkualitas di era digital.
            </p>

            <p className="text-foreground/80 leading-relaxed mb-6">
              Dengan visi menjadi universitas unggul yang menghasilkan lulusan berkualitas global, AMIKOM terus berinovasi dalam pengembangan kurikulum dan fasilitas pembelajaran. Kampus ini dilengkapi dengan laboratorium komputer modern, studio multimedia, dan Creative Economy Park yang menjadi pusat pengembangan ekonomi kreatif.
            </p>

            <p className="text-foreground/80 leading-relaxed mb-6">
              AMIKOM memiliki berbagai program studi unggulan di bidang informatika, sistem informasi, desain komunikasi visual, animasi, dan bisnis digital. Dengan dukungan tenaga pengajar profesional dan kurikulum yang selalu diperbarui sesuai perkembangan industri, lulusan AMIKOM siap bersaing di dunia kerja global.
            </p>

            <h3 className="font-heading font-semibold text-xl text-primary mt-8 mb-4">
              Visi dan Misi
            </h3>

            <div className="bg-muted/50 rounded-xl p-6 mb-6">
              <h4 className="font-heading font-semibold text-lg text-foreground mb-2">Visi</h4>
              <p className="text-foreground/80 leading-relaxed">
                Menjadi universitas unggul yang menghasilkan lulusan berkualitas global di bidang teknologi informasi dan ekonomi kreatif.
              </p>
            </div>

            <div className="bg-muted/50 rounded-xl p-6 mb-8">
              <h4 className="font-heading font-semibold text-lg text-foreground mb-3">Misi</h4>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span>Menyelenggarakan pendidikan tinggi berkualitas yang berfokus pada teknologi informasi dan komunikasi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span>Melaksanakan penelitian yang berkontribusi pada pengembangan ilmu pengetahuan dan teknologi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span>Mengembangkan pengabdian masyarakat yang memberikan dampak positif bagi masyarakat</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span>Membangun kerjasama strategis dengan industri dan institusi dalam dan luar negeri</span>
                </li>
              </ul>
            </div>

            <h3 className="font-heading font-semibold text-xl text-primary mt-8 mb-4">
              Keunggulan AMIKOM
            </h3>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {[
                { title: 'Creative Economy Park', desc: 'Pusat pengembangan ekonomi kreatif dan inkubator startup digital' },
                { title: 'Kurikulum Industri', desc: 'Kurikulum yang selalu diperbarui sesuai kebutuhan industri terkini' },
                { title: 'Fasilitas Modern', desc: 'Laboratorium komputer dan studio multimedia berstandar internasional' },
                { title: 'Kerja Sama Global', desc: 'Kemitraan dengan universitas dan perusahaan teknologi terkemuka dunia' },
              ].map((item) => (
                <div key={item.title} className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-shadow">
                  <h5 className="font-heading font-semibold text-foreground mb-2">{item.title}</h5>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>

            <p className="text-foreground/80 leading-relaxed">
              Sebagai institusi pendidikan yang terus berkembang, Universitas AMIKOM Yogyakarta berkomitmen untuk menghasilkan lulusan yang tidak hanya kompeten secara teknis, tetapi juga memiliki karakter kuat, jiwa kewirausahaan, dan kemampuan beradaptasi dengan perubahan teknologi yang cepat. Bergabunglah dengan ribuan alumni sukses AMIKOM yang kini berkarya di berbagai perusahaan teknologi terkemuka di Indonesia dan dunia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileContent;
