import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import {
  Users, FileDown, Edit, Trash2, Eye, Search, Plus, ChevronDown, Upload,
  TrendingUp, Clock, CheckCircle, XCircle, BarChart3,
} from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';

// ── Types ──────────────────────────────────────────────
interface Pendaftar {
  id: string; nama: string; email: string; telepon: string;
  alamat: string | null; program_studi: string; jalur_pendaftaran: string | null;
  status: string; tanggal_lahir: string | null; jenis_kelamin: string | null;
  asal_sekolah: string | null; created_at: string; updated_at: string;
}

type SectionType = 'dashboard' | 'pendaftar' | 'akademik' | 'pengabdian' | 'penelitian' | 'berita' | 'kegiatan' | 'jadwal' | 'bem' | 'settings';

const sectionTitles: Record<SectionType, string> = {
  dashboard: 'Dashboard', pendaftar: 'Data Pendaftar', akademik: 'Program Studi',
  pengabdian: 'Pengabdian', penelitian: 'Penelitian', berita: 'Berita',
  kegiatan: 'Kegiatan', jadwal: 'Jadwal', bem: 'BEM', settings: 'Pengaturan',
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const params = useParams();
  const section = (params as any).section as string | undefined;
  const selectedSection: SectionType = (section && section in sectionTitles ? section : 'dashboard') as SectionType;

  // ── Data states ──
  const [pendaftars, setPendaftars] = useState<Pendaftar[]>([]);
  const [faculties, setFaculties] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [contentList, setContentList] = useState<any[]>([]);
  const [pmbOpen, setPmbOpen] = useState(true);
  const [pmbPosterUrl, setPmbPosterUrl] = useState('');

  // ── UI states ──
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [detailItem, setDetailItem] = useState<Pendaftar | null>(null);
  const [itemForm, setItemForm] = useState<any>({});
  const [isEditPendaftarOpen, setIsEditPendaftarOpen] = useState(false);
  const [pendaftarForm, setPendaftarForm] = useState<Partial<Pendaftar>>({});

  // ── Fetch data ──
  useEffect(() => {
    const load = async () => {
      try {
        if (selectedSection === 'dashboard' || selectedSection === 'pendaftar') {
          const { data } = await supabase.from('pendaftar').select('*').order('created_at', { ascending: false });
          setPendaftars(data || []);
        }
        if (selectedSection === 'akademik') {
          const [{ data: fac }, { data: prog }] = await Promise.all([
            supabase.from('faculty').select('*').order('order_num'),
            supabase.from('program_studi').select('*'),
          ]);
          setFaculties(fac || []); setPrograms(prog || []);
        }
        if (['pengabdian', 'penelitian', 'berita', 'kegiatan', 'jadwal', 'bem'].includes(selectedSection)) {
          const table = selectedSection === 'penelitian' ? 'pengabdian' : selectedSection;
          let query = (supabase.from as any)(table).select('*');
          if (selectedSection === 'penelitian') query = query.eq('category', 'penelitian');
          const { data } = await query.order('created_at', { ascending: false });
          setContentList(data || []);
        }
        if (selectedSection === 'settings') {
          const [pmbRes, posterRes] = await Promise.all([
            supabase.from('site_settings').select('*').eq('key', 'pmb_open').maybeSingle(),
            supabase.from('site_settings').select('*').eq('key', 'pmb_poster_url').maybeSingle(),
          ]);
          setPmbOpen(pmbRes.data?.value === 'true');
          setPmbPosterUrl(posterRes.data?.value || '');
        }
      } catch (err) { console.error('Fetch error:', err); }
    };
    load();
  }, [selectedSection]);

  // ── Upload ──
  const uploadImage = async (file: File) => {
    try {
      const filename = `${Date.now()}-${file.name}`;
      const { error } = await supabase.storage.from('media').upload(filename, file);
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(filename);
      return publicUrl;
    } catch (err) { toast.error('Gagal upload gambar'); return null; }
  };

  // ── CRUD helpers ──
  const createContentItem = async (table: string) => {
    if (!itemForm.title) return toast.error('Judul wajib diisi');
    try {
      const { data } = await (supabase.from as any)(table).insert([itemForm]).select().single();
      setContentList([data, ...contentList]);
      setIsAddDialogOpen(false); setItemForm({});
      toast.success('Item ditambahkan');
    } catch { toast.error('Gagal menambahkan'); }
  };

  const updateContentItem = async (table: string, id: string) => {
    try {
      await (supabase.from as any)(table).update(itemForm).eq('id', id);
      setContentList(contentList.map(i => i.id === id ? { ...i, ...itemForm } : i));
      setIsEditDialogOpen(false); setEditingItem(null); setItemForm({});
      toast.success('Item diperbarui');
    } catch { toast.error('Gagal update'); }
  };

  const deleteContentItem = async (table: string, id: string) => {
    if (!confirm('Hapus item ini?')) return;
    try {
      await (supabase.from as any)(table).delete().eq('id', id);
      setContentList(contentList.filter(i => i.id !== id));
      toast.success('Item dihapus');
    } catch { toast.error('Gagal hapus'); }
  };

  const deletePendaftar = async (id: string) => {
    if (!confirm('Hapus pendaftar ini?')) return;
    try {
      await supabase.from('pendaftar').delete().eq('id', id);
      setPendaftars(pendaftars.filter(p => p.id !== id));
      toast.success('Pendaftar dihapus');
    } catch { toast.error('Gagal menghapus'); }
  };

  const exportCSV = () => {
    const headers = ['Nama', 'Email', 'Telepon', 'Program Studi', 'Jalur', 'Status', 'Jenis Kelamin', 'Asal Sekolah', 'Alamat', 'Tanggal Lahir', 'Tanggal Daftar'];
    const rows = pendaftars.map(p => [p.nama, p.email, p.telepon, p.program_studi, p.jalur_pendaftaran || '', p.status, p.jenis_kelamin || '', p.asal_sekolah || '', p.alamat || '', p.tanggal_lahir || '', new Date(p.created_at).toLocaleDateString('id-ID')]);
    const csv = [headers.join(','), ...rows.map(r => r.map(c => `"${c}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'pendaftar.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  const togglePMB = async () => {
    const newVal = !pmbOpen;
    await supabase.from('site_settings').update({ value: newVal ? 'true' : 'false' }).eq('key', 'pmb_open');
    setPmbOpen(newVal);
    toast.success(newVal ? 'PMB dibuka' : 'PMB ditutup');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  // ── Dashboard stats ──
  const stats = {
    total: pendaftars.length,
    pending: pendaftars.filter(p => p.status === 'Pending').length,
    diterima: pendaftars.filter(p => p.status === 'Diterima').length,
    ditolak: pendaftars.filter(p => p.status === 'Ditolak').length,
  };

  // ── Render sections ──
  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card><CardContent className="p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-primary/10"><Users className="h-6 w-6 text-primary" /></div>
          <div><p className="text-sm text-muted-foreground">Total Pendaftar</p><p className="text-2xl font-bold text-foreground">{stats.total}</p></div>
        </CardContent></Card>
        <Card><CardContent className="p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-100"><Clock className="h-6 w-6 text-amber-600" /></div>
          <div><p className="text-sm text-muted-foreground">Pending</p><p className="text-2xl font-bold text-foreground">{stats.pending}</p></div>
        </CardContent></Card>
        <Card><CardContent className="p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-100"><CheckCircle className="h-6 w-6 text-emerald-600" /></div>
          <div><p className="text-sm text-muted-foreground">Diterima</p><p className="text-2xl font-bold text-foreground">{stats.diterima}</p></div>
        </CardContent></Card>
        <Card><CardContent className="p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-rose-100"><XCircle className="h-6 w-6 text-rose-600" /></div>
          <div><p className="text-sm text-muted-foreground">Ditolak</p><p className="text-2xl font-bold text-foreground">{stats.ditolak}</p></div>
        </CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Pendaftar Terbaru</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow>
              <TableHead>Nama</TableHead><TableHead>Program</TableHead><TableHead>Status</TableHead><TableHead>Tanggal</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {pendaftars.slice(0, 5).map(p => (
                <TableRow key={p.id} className="cursor-pointer" onClick={() => { setDetailItem(p); setIsDetailOpen(true); }}>
                  <TableCell className="font-medium">{p.nama}</TableCell>
                  <TableCell>{p.program_studi}</TableCell>
                  <TableCell><StatusBadge status={p.status} /></TableCell>
                  <TableCell className="text-muted-foreground">{new Date(p.created_at).toLocaleDateString('id-ID')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const renderPendaftar = () => {
    const filtered = pendaftars.filter(p => {
      const match = [p.nama, p.email, p.telepon].some(v => v?.toLowerCase().includes(searchTerm.toLowerCase()));
      return match && (filterStatus === 'all' || p.status === filterStatus);
    });

    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Cari nama, email, telepon..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-9" />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Diterima">Diterima</SelectItem>
              <SelectItem value="Ditolak">Ditolak</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={exportCSV} className="gap-2"><FileDown className="h-4 w-4" />Export CSV</Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader><TableRow>
                <TableHead>Nama</TableHead><TableHead className="hidden md:table-cell">Email</TableHead><TableHead className="hidden sm:table-cell">Telepon</TableHead><TableHead>Program</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Aksi</TableHead>
              </TableRow></TableHeader>
              <TableBody>
                {filtered.map(p => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.nama}</TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">{p.email}</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">{p.telepon}</TableCell>
                    <TableCell>{p.program_studi}</TableCell>
                    <TableCell><StatusBadge status={p.status} /></TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-1 justify-end">
                        <Button size="icon" variant="ghost" onClick={() => { setDetailItem(p); setIsDetailOpen(true); }}><Eye className="h-4 w-4" /></Button>
                        <Button size="icon" variant="ghost" onClick={() => { setPendaftarForm(p); setIsEditPendaftarOpen(true); }}><Edit className="h-4 w-4" /></Button>
                        <Button size="icon" variant="ghost" className="text-destructive" onClick={() => deletePendaftar(p.id)}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Tidak ada data</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Detail Dialog */}
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Detail Pendaftar</DialogTitle><DialogDescription>Informasi lengkap calon mahasiswa</DialogDescription></DialogHeader>
            {detailItem && (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><p className="text-muted-foreground">Nama</p><p className="font-medium">{detailItem.nama}</p></div>
                <div><p className="text-muted-foreground">Email</p><p className="font-medium">{detailItem.email}</p></div>
                <div><p className="text-muted-foreground">Telepon</p><p className="font-medium">{detailItem.telepon}</p></div>
                <div><p className="text-muted-foreground">Jenis Kelamin</p><p className="font-medium">{detailItem.jenis_kelamin || '-'}</p></div>
                <div><p className="text-muted-foreground">Tanggal Lahir</p><p className="font-medium">{detailItem.tanggal_lahir || '-'}</p></div>
                <div><p className="text-muted-foreground">Asal Sekolah</p><p className="font-medium">{detailItem.asal_sekolah || '-'}</p></div>
                <div className="col-span-2"><p className="text-muted-foreground">Alamat</p><p className="font-medium">{detailItem.alamat || '-'}</p></div>
                <div><p className="text-muted-foreground">Program Studi</p><p className="font-medium">{detailItem.program_studi}</p></div>
                <div><p className="text-muted-foreground">Jalur</p><p className="font-medium">{detailItem.jalur_pendaftaran || '-'}</p></div>
                <div><p className="text-muted-foreground">Status</p><StatusBadge status={detailItem.status} /></div>
                <div><p className="text-muted-foreground">Tanggal Daftar</p><p className="font-medium">{new Date(detailItem.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p></div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Pendaftar Dialog */}
        <Dialog open={isEditPendaftarOpen} onOpenChange={setIsEditPendaftarOpen}>
          <DialogContent>
            <DialogHeader><DialogTitle>Edit Pendaftar</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>Nama</Label><Input value={pendaftarForm.nama || ''} onChange={e => setPendaftarForm({ ...pendaftarForm, nama: e.target.value })} /></div>
              <div><Label>Email</Label><Input value={pendaftarForm.email || ''} onChange={e => setPendaftarForm({ ...pendaftarForm, email: e.target.value })} /></div>
              <div><Label>Telepon</Label><Input value={pendaftarForm.telepon || ''} onChange={e => setPendaftarForm({ ...pendaftarForm, telepon: e.target.value })} /></div>
              <div><Label>Status</Label>
                <Select value={pendaftarForm.status || ''} onValueChange={v => setPendaftarForm({ ...pendaftarForm, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Diterima">Diterima</SelectItem>
                    <SelectItem value="Ditolak">Ditolak</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <Button variant="outline" onClick={() => { setIsEditPendaftarOpen(false); setPendaftarForm({}); }}>Batal</Button>
                <Button onClick={async () => {
                  if (!pendaftarForm.id) return;
                  try {
                    await supabase.from('pendaftar').update(pendaftarForm).eq('id', pendaftarForm.id);
                    setPendaftars(pendaftars.map(p => p.id === pendaftarForm.id ? { ...p, ...pendaftarForm } as Pendaftar : p));
                    setIsEditPendaftarOpen(false); setPendaftarForm({});
                    toast.success('Pendaftar diperbarui');
                  } catch { toast.error('Gagal update'); }
                }}>Simpan</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  const renderAkademik = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">Kelola fakultas dan program studi</p>
      </div>
      {faculties.map(faculty => {
        const facultyPrograms = programs.filter((p: any) => p.faculty_id === faculty.id);
        return (
          <Card key={faculty.id}>
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="w-full p-4 flex justify-between items-center hover:bg-muted/50 rounded-t-lg">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{faculty.name}</h3>
                  <Badge variant="secondary">{facultyPrograms.length} prodi</Badge>
                </div>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 pt-0 space-y-2">
                  {facultyPrograms.map((prog: any) => (
                    <div key={prog.id} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{prog.name}</p>
                        {prog.description && <p className="text-xs text-muted-foreground">{prog.description}</p>}
                      </div>
                      <div className="flex gap-1">
                        <Button size="icon" variant="ghost" onClick={() => { setEditingItem(prog); setItemForm({ ...prog }); setIsEditDialogOpen(true); }}><Edit className="h-4 w-4" /></Button>
                        <Button size="icon" variant="ghost" className="text-destructive" onClick={async () => {
                          if (!confirm('Hapus program ini?')) return;
                          await supabase.from('program_studi').delete().eq('id', prog.id);
                          setPrograms(programs.filter((p: any) => p.id !== prog.id));
                          toast.success('Program dihapus');
                        }}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </div>
                  ))}
                  <Button size="sm" variant="outline" className="w-full mt-2 gap-1" onClick={() => { setItemForm({ faculty_id: faculty.id }); setIsAddDialogOpen(true); }}>
                    <Plus className="h-4 w-4" />Tambah Program
                  </Button>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        );
      })}

      {/* Add Program Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Tambah Program Studi</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Nama</Label><Input value={itemForm.name || ''} onChange={e => setItemForm({ ...itemForm, name: e.target.value })} /></div>
            <div><Label>Deskripsi</Label><Textarea value={itemForm.description || ''} onChange={e => setItemForm({ ...itemForm, description: e.target.value })} rows={2} /></div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => { setIsAddDialogOpen(false); setItemForm({}); }}>Batal</Button>
              <Button onClick={async () => {
                if (!itemForm.name) return toast.error('Nama wajib diisi');
                const { data } = await supabase.from('program_studi').insert([itemForm]).select().single();
                setPrograms([...programs, data]);
                setIsAddDialogOpen(false); setItemForm({});
                toast.success('Program ditambahkan');
              }}>Simpan</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Program Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Program Studi</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Nama</Label><Input value={itemForm.name || ''} onChange={e => setItemForm({ ...itemForm, name: e.target.value })} /></div>
            <div><Label>Deskripsi</Label><Textarea value={itemForm.description || ''} onChange={e => setItemForm({ ...itemForm, description: e.target.value })} rows={2} /></div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => { setIsEditDialogOpen(false); setEditingItem(null); setItemForm({}); }}>Batal</Button>
              <Button onClick={async () => {
                if (!editingItem) return;
                await supabase.from('program_studi').update(itemForm).eq('id', editingItem.id);
                setPrograms(programs.map((p: any) => p.id === editingItem.id ? { ...p, ...itemForm } : p));
                setIsEditDialogOpen(false); setEditingItem(null); setItemForm({});
                toast.success('Program diperbarui');
              }}>Simpan</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );

  const renderContentSection = () => {
    const table = selectedSection === 'penelitian' ? 'pengabdian' : selectedSection;
    const isJadwal = selectedSection === 'jadwal';

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">{contentList.length} item</p>
          <Button onClick={() => { setItemForm(selectedSection === 'penelitian' ? { category: 'penelitian' } : {}); setIsAddDialogOpen(true); }} className="gap-1">
            <Plus className="h-4 w-4" />Tambah
          </Button>
        </div>

        {(
          <div className="space-y-3">
            {contentList.map(item => (
              <Card key={item.id} className="p-4">
                <div className="flex gap-4 items-start">
                  {item.image_url && <img src={item.image_url} alt={item.title} className="w-20 h-20 object-cover rounded-lg shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm">{item.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{item.description || item.excerpt || item.location || ''}</p>
                    {isJadwal && item.day && <p className="text-xs text-primary mt-1">{item.day} {item.time_from && `${item.time_from} - ${item.time_to || ''}`}</p>}
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button size="icon" variant="ghost" onClick={() => { setEditingItem(item); setItemForm({ ...item }); setIsEditDialogOpen(true); }}><Edit className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" className="text-destructive" onClick={() => deleteContentItem(table, item.id)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              </Card>
            ))}
            {contentList.length === 0 && <p className="text-center py-8 text-muted-foreground">Belum ada data</p>}
          </div>
        )}

        {/* Add Dialog */}
        <ContentFormDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          title={`Tambah ${sectionTitles[selectedSection]}`}
          form={itemForm}
          setForm={setItemForm}
          isJadwal={isJadwal}
          showImage={!isJadwal}
          onUpload={uploadImage}
          onSubmit={() => createContentItem(table)}
        />

        {/* Edit Dialog */}
        <ContentFormDialog
          open={isEditDialogOpen}
          onOpenChange={v => { setIsEditDialogOpen(v); if (!v) { setEditingItem(null); setItemForm({}); } }}
          title={`Edit ${sectionTitles[selectedSection]}`}
          form={itemForm}
          setForm={setItemForm}
          isJadwal={isJadwal}
          showImage={!isJadwal}
          onUpload={uploadImage}
          onSubmit={() => editingItem && updateContentItem(table, editingItem.id)}
          isEdit
        />
      </div>
    );
  };

  const handlePosterUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const ext = file.name.split('.').pop();
    const path = `pmb/poster_${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage.from('media').upload(path, file, { upsert: true });
    if (upErr) { toast.error('Gagal upload poster'); return; }
    const { data: urlData } = supabase.storage.from('media').getPublicUrl(path);
    const url = urlData.publicUrl;
    // upsert setting
    const { data: existing } = await supabase.from('site_settings').select('id').eq('key', 'pmb_poster_url').maybeSingle();
    if (existing) {
      await supabase.from('site_settings').update({ value: url }).eq('key', 'pmb_poster_url');
    } else {
      await supabase.from('site_settings').insert({ key: 'pmb_poster_url', value: url });
    }
    setPmbPosterUrl(url);
    toast.success('Poster PMB berhasil diperbarui');
  };

  const renderSettings = () => (
    <div className="space-y-6 max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Penerimaan Mahasiswa Baru (PMB)</CardTitle>
          <CardDescription>Kontrol apakah form pendaftaran dapat diakses publik</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">{pmbOpen ? 'PMB Dibuka' : 'PMB Ditutup'}</p>
              <p className="text-xs text-muted-foreground">{pmbOpen ? 'Form pendaftaran aktif' : 'Form pendaftaran tidak aktif'}</p>
            </div>
            <Switch checked={pmbOpen} onCheckedChange={togglePMB} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Poster PMB</CardTitle>
          <CardDescription>Upload gambar poster PMB yang ditampilkan di halaman PMB</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {pmbPosterUrl && (
            <img src={pmbPosterUrl} alt="Poster PMB" className="w-full max-w-xs rounded-lg border" />
          )}
          <div>
            <Label htmlFor="poster-upload" className="cursor-pointer">
              <div className="flex items-center gap-2 text-sm text-primary hover:underline">
                <Upload className="w-4 h-4" /> Ganti Poster
              </div>
            </Label>
            <input id="poster-upload" type="file" accept="image/*" className="hidden" onChange={handlePosterUpload} />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSection = () => {
    switch (selectedSection) {
      case 'dashboard': return renderDashboard();
      case 'pendaftar': return renderPendaftar();
      case 'akademik': return renderAkademik();
      case 'settings': return renderSettings();
      default: return renderContentSection();
    }
  };

  return (
    <AdminLayout onLogout={handleLogout} pageTitle={sectionTitles[selectedSection]}>
      {renderSection()}
    </AdminLayout>
  );
};

// ── Sub-components ──
const StatusBadge = ({ status }: { status: string }) => {
  if (status === 'Diterima') return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Diterima</Badge>;
  if (status === 'Ditolak') return <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100">Ditolak</Badge>;
  return <Badge variant="secondary">Pending</Badge>;
};

interface ContentFormDialogProps {
  open: boolean; onOpenChange: (v: boolean) => void; title: string;
  form: any; setForm: (f: any) => void; isJadwal: boolean; showImage: boolean;
  onUpload: (f: File) => Promise<string | null>; onSubmit: () => void; isEdit?: boolean;
}

const ContentFormDialog = ({ open, onOpenChange, title, form, setForm, isJadwal, showImage, onUpload, onSubmit, isEdit }: ContentFormDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader><DialogTitle>{title}</DialogTitle></DialogHeader>
      <div className="space-y-3 max-h-[60vh] overflow-y-auto">
        <div><Label>Judul</Label><Input value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
        <div><Label>Deskripsi</Label><Textarea value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} /></div>
        {isJadwal && (
          <>
            <div><Label>Hari</Label><Input value={form.day || ''} onChange={e => setForm({ ...form, day: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-2">
              <div><Label>Jam Mulai</Label><Input value={form.time_from || ''} onChange={e => setForm({ ...form, time_from: e.target.value })} /></div>
              <div><Label>Jam Selesai</Label><Input value={form.time_to || ''} onChange={e => setForm({ ...form, time_to: e.target.value })} /></div>
            </div>
            <div><Label>Lokasi</Label><Input value={form.location || ''} onChange={e => setForm({ ...form, location: e.target.value })} /></div>
          </>
        )}
        {showImage && (
          <>
            {isEdit && form.image_url && <img src={form.image_url} alt="preview" className="w-full h-32 object-cover rounded-lg" />}
            <div><Label>Upload Gambar</Label><Input type="file" accept="image/*" onChange={e => { const f = e.target.files?.[0]; if (f) onUpload(f).then(url => url && setForm({ ...form, image_url: url })); }} /></div>
            <div><Label>Atau URL Gambar</Label><Input value={form.image_url || ''} onChange={e => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." /></div>
          </>
        )}
        <div className="flex gap-2 justify-end pt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Batal</Button>
          <Button onClick={onSubmit}>Simpan</Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
);

export default AdminDashboard;
