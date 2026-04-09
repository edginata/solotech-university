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
import { User, Mail, Phone, MapPin, GraduationCap, FileText, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Pendaftaran = () => {
  const breadcrumbs = [{ label: 'Pendaftaran', href: '/pendaftaran' }];

  const [formData, setFormData] = useState({
    nama: '', email: '', telepon: '', no_wa_aktif: '', tanggal_lahir: '',
    alamat: '', asal_sekolah: '', tahun_lulus: '', jurusan_sma: '',
    program_studi: '', program_studi_2: '', jalur_pendaftaran: '', catatan: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [programs, setPrograms] = useState<{ value: string; label: string }[]>([]);
  const [jalurOptions, setJalurOptions] = useState<string[]>([]);
  const [pmbOpen, setPmbOpen] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;
    Promise.all([
      supabase.from('program_studi').select('*').order('created_at', { ascending: true }),
      supabase.from('site_settings').select('value').eq('key', 'pmb_open').maybeSingle(),
      supabase.from('site_settings').select('value').eq('key', 'jalur_pendaftaran').maybeSingle(),
    ]).then(([prodiRes, pmbRes, jalurRes]) => {
      if (mounted) {
        setPrograms((prodiRes.data || []).map((p: any) => ({ value: p.name, label: p.name })));
        setPmbOpen(pmbRes.data?.value !== 'false');
        try {
          const parsed = JSON.parse(jalurRes.data?.value || '[]');
          setJalurOptions(Array.isArray(parsed) ? parsed : ['Reguler', 'Beasiswa Prestasi', 'Profesional']);
        } catch { setJalurOptions(['Reguler', 'Beasiswa Prestasi', 'Profesional']); }
      }
    });
    return () => { mounted = false; };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama || !formData.email || !formData.telepon || !formData.program_studi) {
      toast.error('Mohon lengkapi data yang wajib diisi'); return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) { toast.error('Format email tidak valid'); return; }
    const phoneClean = formData.telepon.replace(/[^0-9+]/g, '');
    if (phoneClean.length < 9) { toast.error('Nomor telepon tidak valid'); return; }

    setLoading(true);
    try {
      const { error } = await supabase.from('pendaftar').insert({
        nama: formData.nama.trim(), email: formData.email.trim(), telepon: formData.telepon.trim(),
        no_wa_aktif: formData.no_wa_aktif.trim() || null,
        alamat: formData.alamat.trim() || null, program_studi: formData.program_studi,
        jalur_pendaftaran: formData.jalur_pendaftaran || null,
        tanggal_lahir: formData.tanggal_lahir || null, asal_sekolah: formData.asal_sekolah.trim() || null,
      });
      if (error) {
        console.error('Error submitting:', error);
        toast.error('Gagal mengirim pendaftaran.');
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
        <TopBar /><Header />
        <main className="flex-1 pb-24">
          <HeroSection title="Pendaftaran Berhasil" breadcrumbs={breadcrumbs} />
          <section className="py-12 lg:py-16">
            <div className="section-container">
              <div className="max-w-lg mx-auto text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Terima Kasih!</h2>
                <p className="text-muted-foreground mb-6">Pendaftaran Anda telah berhasil dikirim. Tim kami akan segera menghubungi Anda melalui email atau telepon yang telah didaftarkan.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={() => window.location.href = '/pmb'} variant="default">Lihat Informasi Biaya & Pembayaran</Button>
                  <Button onClick={() => window.location.href = '/'} variant="outline">Kembali ke Beranda</Button>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  // PMB closed state
  if (pmbOpen === false) {
    return (
      <div className="min-h-screen flex flex-col">
        <TopBar /><Header />
        <main className="flex-1 pb-24">
          <HeroSection title="Formulir Pendaftaran" breadcrumbs={breadcrumbs} />
          <section className="py-16 lg:py-24">
            <div className="section-container">
              <div className="max-w-lg mx-auto text-center">
                <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <XCircle className="w-10 h-10 text-destructive" />
                </div>
                <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Pendaftaran Ditutup</h2>
                <p className="text-muted-foreground mb-6">Maaf, saat ini pendaftaran mahasiswa baru sedang tidak dibuka. Silakan hubungi panitia PMB atau kunjungi halaman PMB untuk informasi lebih lanjut.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={() => window.location.href = '/pmb'} variant="default">Halaman PMB</Button>
                  <Button onClick={() => window.location.href = '/'} variant="outline">Kembali ke Beranda</Button>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  // Still loading PMB status
  if (pmbOpen === null) {
    return (
      <div className="min-h-screen flex flex-col">
        <TopBar /><Header />
        <main className="flex-1 pb-24">
          <HeroSection title="Formulir Pendaftaran" breadcrumbs={breadcrumbs} />
          <section className="py-16"><div className="section-container text-center text-muted-foreground">Memuat...</div></section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar /><Header />
      <main className="flex-1 pb-24">
        <HeroSection title="Formulir Pendaftaran" breadcrumbs={breadcrumbs} />
        <section className="py-12 lg:py-16">
          <div className="section-container">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-4">Daftar Mahasiswa Baru</h2>
                <p className="text-muted-foreground">Lengkapi formulir di bawah ini untuk mendaftar sebagai calon mahasiswa baru UKTS.</p>
              </div>
              <Card>
                <CardHeader><CardTitle className="text-lg">Data Pribadi</CardTitle></CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nama">Nama Lengkap *</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input id="nama" placeholder="Masukkan nama lengkap" className="pl-10" value={formData.nama} onChange={(e) => setFormData({ ...formData, nama: e.target.value })} required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Aktif *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input id="email" type="email" placeholder="email@example.com" className="pl-10" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                        </div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="telepon">No Telp Aktif *</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input id="telepon" placeholder="08xxxxxxxxxx" className="pl-10" value={formData.telepon} onChange={(e) => setFormData({ ...formData, telepon: e.target.value })} required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="no_wa">No WA Aktif *</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input id="no_wa" placeholder="08xxxxxxxxxx" className="pl-10" value={formData.no_wa_aktif} onChange={(e) => setFormData({ ...formData, no_wa_aktif: e.target.value })} />
                        </div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="tanggal-lahir">Tanggal Lahir *</Label>
                        <Input id="tanggal-lahir" type="date" value={formData.tanggal_lahir} onChange={(e) => setFormData({ ...formData, tanggal_lahir: e.target.value })} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="alamat">Alamat Lengkap *</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Textarea id="alamat" placeholder="Masukkan alamat lengkap" className="pl-10 min-h-[80px]" value={formData.alamat} onChange={(e) => setFormData({ ...formData, alamat: e.target.value })} />
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-primary" />Riwayat Pendidikan
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Asal Sekolah *</Label>
                          <Input placeholder="Nama SMA/SMK/MA" value={formData.asal_sekolah} onChange={(e) => setFormData({ ...formData, asal_sekolah: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                          <Label>Tahun Lulus *</Label>
                          <Input placeholder="2024" value={formData.tahun_lulus} onChange={(e) => setFormData({ ...formData, tahun_lulus: e.target.value })} />
                        </div>
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary" />Pilihan Program Studi
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Pilihan 1 *</Label>
                          <Select value={formData.program_studi} onValueChange={(v) => setFormData({ ...formData, program_studi: v })}>
                            <SelectTrigger><SelectValue placeholder="Pilih program studi" /></SelectTrigger>
                            <SelectContent>
                              {programs.length > 0 ? programs.map((p) => (
                                <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                              )) : (
                                <SelectItem value="no_programs" disabled>Tidak ada program studi tersedia</SelectItem>
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Pilihan 2 (Opsional)</Label>
                          <Select value={formData.program_studi_2} onValueChange={(v) => setFormData({ ...formData, program_studi_2: v })}>
                            <SelectTrigger><SelectValue placeholder="Pilih program studi" /></SelectTrigger>
                            <SelectContent>
                              {programs.map((p) => (<SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <div className="pt-6 border-t">
                      <div className="bg-muted rounded-lg p-4 mb-6">
                        <p className="text-sm text-muted-foreground">Dengan mengirimkan formulir ini, Anda menyetujui untuk menerima informasi terkait pendaftaran mahasiswa baru UKTS melalui email dan/atau telepon.</p>
                      </div>
                      <Button type="submit" className="cta-button w-full text-lg py-6" disabled={loading}>
                        {loading ? 'Mengirim...' : 'Kirim Pendaftaran'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pendaftaran;
