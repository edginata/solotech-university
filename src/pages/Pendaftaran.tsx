 import { useState, useEffect } from 'react';
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
 import { User, Mail, Phone, MapPin, GraduationCap, FileText, CheckCircle } from 'lucide-react';
 import { supabase } from '@/integrations/supabase/client';
 import { toast } from 'sonner';

const Pendaftaran = () => {
  const breadcrumbs = [
    { label: 'Pendaftaran', href: '/pendaftaran' },
  ];
   
   const [formData, setFormData] = useState({
     nama: '',
     email: '',
     telepon: '',
     no_wa_aktif: '',
     tanggal_lahir: '',
     alamat: '',
     asal_sekolah: '',
     tahun_lulus: '',
     jurusan_sma: '',
     program_studi: '',
     program_studi_2: '',
     beasiswa: '',
     catatan: '',
   });
   const [loading, setLoading] = useState(false);
   const [submitted, setSubmitted] = useState(false);

  const [programs, setPrograms] = useState<{ value: string; label: string }[]>([]);

  // load program studi options from supabase
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const { data, error } = await supabase.from('program_studi').select('*').order('created_at', { ascending: true });
      if (error) {
        console.error('Gagal memuat program studi', error);
      } else if (mounted) {
        const items = (data || []).map((p: any) => ({ value: p.name, label: p.name }));
        setPrograms(items);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);
 
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     
     if (!formData.nama || !formData.email || !formData.telepon || !formData.program_studi) {
       toast.error('Mohon lengkapi data yang wajib diisi');
       return;
     }

    // basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Format email tidak valid');
      return;
    }
    const phoneClean = formData.telepon.replace(/[^0-9+]/g, '');
    if (phoneClean.length < 9) {
      toast.error('Nomor telepon tidak valid');
      return;
    }
    // optional: validate WhatsApp number format if provided
    if (formData.no_wa_aktif) {
      const waClean = formData.no_wa_aktif.replace(/[^0-9+]/g, '');
      if (waClean.length < 9) {
        toast.error('Nomor WhatsApp tidak valid');
        return;
      }
    }
 
     setLoading(true);
 
     try {
       const { error } = await supabase.from('pendaftar').insert({
         nama: formData.nama.trim(),
         email: formData.email.trim(),
         telepon: formData.telepon.trim(),
         no_wa_aktif: formData.no_wa_aktif.trim() || null,
         alamat: formData.alamat.trim() || null,
         program_studi: formData.program_studi,
         tanggal_lahir: formData.tanggal_lahir || null,
         asal_sekolah: formData.asal_sekolah.trim() || null,
       });
 
       if (error) {
         console.error('Error submitting:', error);
        toast.error('Gagal mengirim ke server, menyimpan sementara secara lokal.');
        // fallback: save to localStorage so admin can see it
        const stored = JSON.parse(localStorage.getItem('pendaftar_local') || '[]');
        const localItem = {
          id: `local_${Date.now()}`,
          nama: formData.nama.trim(),
          email: formData.email.trim(),
            telepon: formData.telepon.trim(),
            no_wa_aktif: formData.no_wa_aktif.trim() || null,
          alamat: formData.alamat.trim() || null,
          program_studi: formData.program_studi,
          created_at: new Date().toISOString(),
          status: 'Pending',
        };
        stored.unshift(localItem);
        localStorage.setItem('pendaftar_local', JSON.stringify(stored));
        setSubmitted(true);
       } else {
         setSubmitted(true);
         toast.success('Pendaftaran berhasil dikirim!');
       }
     } catch (err) {
       console.error('Error:', err);
       toast.error('Terjadi kesalahan. Silakan coba lagi.');
     } finally {
       setLoading(false);
     }
   };
 
   if (submitted) {
     return (
       <div className="min-h-screen flex flex-col">
         <TopBar />
         <Header />
         <main className="flex-1 pb-24">
           <HeroSection title="Pendaftaran Berhasil" breadcrumbs={breadcrumbs} />
           <section className="py-12 lg:py-16">
             <div className="section-container">
               <div className="max-w-lg mx-auto text-center">
                 <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                   <CheckCircle className="w-10 h-10 text-green-600" />
                 </div>
                 <h2 className="font-heading font-bold text-2xl text-foreground mb-4">
                   Terima Kasih!
                 </h2>
                 <p className="text-muted-foreground mb-6">
                   Pendaftaran Anda telah berhasil dikirim. Tim kami akan segera menghubungi Anda
                   melalui email atau telepon yang telah didaftarkan.
                 </p>
                 <Button onClick={() => window.location.href = '/'}>
                   Kembali ke Beranda
                 </Button>
               </div>
             </div>
           </section>
         </main>
         <Footer />
       </div>
     );
   }

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      
      <main className="flex-1 pb-24">
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
                   <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nama">Nama Lengkap *</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                           <Input 
                             id="nama" 
                             placeholder="Masukkan nama lengkap" 
                             className="pl-10" 
                             value={formData.nama}
                             onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                             required
                           />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                           <Input 
                             id="email" 
                             type="email" 
                             placeholder="email@example.com" 
                             className="pl-10" 
                             value={formData.email}
                             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                             required
                           />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="telepon">Nomor Telepon *</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                           <Input 
                             id="telepon" 
                             placeholder="08xxxxxxxxxx" 
                             className="pl-10" 
                             value={formData.telepon}
                             onChange={(e) => setFormData({ ...formData, telepon: e.target.value })}
                             required
                           />
                        </div>
                        <div className="space-y-2 mt-2">
                          <Label htmlFor="no-wa">No. WhatsApp Aktif (opsional)</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                             <Input
                               id="no-wa"
                               placeholder="628xxxx..."
                               className="pl-10"
                               value={formData.no_wa_aktif}
                               onChange={(e) => setFormData({ ...formData, no_wa_aktif: e.target.value })}
                             />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tanggal-lahir">Tanggal Lahir *</Label>
                         <Input 
                           id="tanggal-lahir" 
                           type="date" 
                           value={formData.tanggal_lahir}
                           onChange={(e) => setFormData({ ...formData, tanggal_lahir: e.target.value })}
                         />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="alamat">Alamat Lengkap *</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                         <Textarea 
                           id="alamat" 
                           placeholder="Masukkan alamat lengkap" 
                           className="pl-10 min-h-[80px]" 
                           value={formData.alamat}
                           onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                         />
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
                           <Input 
                             id="asal-sekolah" 
                             placeholder="Nama SMA/SMK/MA" 
                             value={formData.asal_sekolah}
                             onChange={(e) => setFormData({ ...formData, asal_sekolah: e.target.value })}
                           />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="tahun-lulus">Tahun Lulus *</Label>
                           <Input 
                             id="tahun-lulus" 
                             placeholder="2024" 
                             value={formData.tahun_lulus}
                             onChange={(e) => setFormData({ ...formData, tahun_lulus: e.target.value })}
                           />
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <Label htmlFor="jurusan">Jurusan di SMA/SMK *</Label>
                         <Input 
                           id="jurusan" 
                           placeholder="IPA/IPS/Teknik/dll" 
                           value={formData.jurusan_sma}
                           onChange={(e) => setFormData({ ...formData, jurusan_sma: e.target.value })}
                         />
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
                           <Select value={formData.program_studi} onValueChange={(value) => setFormData({ ...formData, program_studi: value })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih program studi" />
                            </SelectTrigger>
                            <SelectContent>
                                {programs.length > 0 ? (
                                  programs.map((program) => (
                                    <SelectItem key={program.value} value={program.value}>
                                      {program.label}
                                    </SelectItem>
                                  ))
                                ) : (
                                  <SelectItem value="no_programs" disabled>
                                    Tidak ada program studi tersedia
                                  </SelectItem>
                                )}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="prodi-2">Pilihan 2 (Opsional)</Label>
                           <Select value={formData.program_studi_2} onValueChange={(value) => setFormData({ ...formData, program_studi_2: value })}>
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
                         <Select value={formData.beasiswa} onValueChange={(value) => setFormData({ ...formData, beasiswa: value })}>
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
                           value={formData.catatan}
                           onChange={(e) => setFormData({ ...formData, catatan: e.target.value })}
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
                       <Button type="submit" className="cta-button w-full text-lg py-6" disabled={loading}>
                         {loading ? 'Mengirim...' : 'Kirim Pendaftaran'}
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
