import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { User, Mail, Phone, MapPin, GraduationCap, FileText } from 'lucide-react';

const Pendaftaran = () => {
  const breadcrumbs = [
    { label: 'Pendaftaran', href: '/pendaftaran' },
  ];

  const programs = [
    { value: 'teologi', label: 'S1 Teologi' },
    { value: 'pak', label: 'S1 Pendidikan Agama Kristen' },
    { value: 'musik', label: 'S1 Musik Gerejawi' },
    { value: 'ti', label: 'S1 Teknik Informatika' },
    { value: 'si', label: 'S1 Sistem Informasi' },
    { value: 'd3tk', label: 'D3 Teknik Komputer' },
    { value: 'manajemen', label: 'S1 Manajemen' },
    { value: 'akuntansi', label: 'S1 Akuntansi' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      
      <main className="flex-1">
        <HeroSection 
          title="Formulir Pendaftaran" 
          breadcrumbs={breadcrumbs}
        />

        <section className="py-12 lg:py-16">
          <div className="section-container">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-4">
                  Daftar Mahasiswa Baru
                </h2>
                <p className="text-muted-foreground">
                  Lengkapi formulir di bawah ini untuk mendaftar sebagai calon mahasiswa baru UKTS.
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Data Pribadi</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    {/* Personal Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nama">Nama Lengkap *</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input id="nama" placeholder="Masukkan nama lengkap" className="pl-10" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input id="email" type="email" placeholder="email@example.com" className="pl-10" />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="telepon">Nomor Telepon *</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input id="telepon" placeholder="08xxxxxxxxxx" className="pl-10" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tanggal-lahir">Tanggal Lahir *</Label>
                        <Input id="tanggal-lahir" type="date" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="alamat">Alamat Lengkap *</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Textarea id="alamat" placeholder="Masukkan alamat lengkap" className="pl-10 min-h-[80px]" />
                      </div>
                    </div>

                    {/* Education Background */}
                    <div className="pt-4 border-t">
                      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-primary" />
                        Riwayat Pendidikan
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="asal-sekolah">Asal Sekolah *</Label>
                          <Input id="asal-sekolah" placeholder="Nama SMA/SMK/MA" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="tahun-lulus">Tahun Lulus *</Label>
                          <Input id="tahun-lulus" placeholder="2024" />
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <Label htmlFor="jurusan">Jurusan di SMA/SMK *</Label>
                        <Input id="jurusan" placeholder="IPA/IPS/Teknik/dll" />
                      </div>
                    </div>

                    {/* Program Selection */}
                    <div className="pt-4 border-t">
                      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary" />
                        Pilihan Program Studi
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="prodi-1">Pilihan 1 *</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih program studi" />
                            </SelectTrigger>
                            <SelectContent>
                              {programs.map((program) => (
                                <SelectItem key={program.value} value={program.value}>
                                  {program.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="prodi-2">Pilihan 2 (Opsional)</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih program studi" />
                            </SelectTrigger>
                            <SelectContent>
                              {programs.map((program) => (
                                <SelectItem key={program.value} value={program.value}>
                                  {program.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className="pt-4 border-t">
                      <h3 className="font-semibold text-foreground mb-4">Informasi Tambahan</h3>
                      <div className="space-y-2">
                        <Label htmlFor="info-beasiswa">Apakah Anda tertarik dengan program beasiswa?</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ya">Ya, saya tertarik</SelectItem>
                            <SelectItem value="tidak">Tidak</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="mt-4 space-y-2">
                        <Label htmlFor="catatan">Catatan Tambahan</Label>
                        <Textarea 
                          id="catatan" 
                          placeholder="Tuliskan catatan atau pertanyaan jika ada" 
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>

                    {/* Submit */}
                    <div className="pt-6 border-t">
                      <div className="bg-muted rounded-lg p-4 mb-6">
                        <p className="text-sm text-muted-foreground">
                          Dengan mengirimkan formulir ini, Anda menyetujui untuk menerima informasi 
                          terkait pendaftaran mahasiswa baru UKTS melalui email dan/atau telepon.
                        </p>
                      </div>
                      <Button type="submit" className="cta-button w-full text-lg py-6">
                        Kirim Pendaftaran
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="mt-8 text-center">
                <p className="text-muted-foreground">
                  Butuh bantuan? Hubungi kami di{' '}
                  <a href="tel:0271637145" className="text-primary hover:underline">(0271) 637145</a>
                  {' '}atau{' '}
                  <a 
                    href="https://api.whatsapp.com/send?phone=6285117247527" 
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pendaftaran;
