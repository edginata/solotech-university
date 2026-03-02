import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { LogOut, Users, FileDown, Edit, Trash2, Eye, Search, Plus, ChevronDown, X, Upload } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';

interface Pendaftar {
  id: string;
  nama: string;
  email: string;
  telepon: string;
  no_wa_aktif?: string | null;
  alamat: string | null;
  program_studi: string;
  jalur_pendaftaran: string | null;
  status: string;
  tanggal_lahir: string | null;
  jenis_kelamin: string | null;
  asal_sekolah: string | null;
  created_at: string;
  updated_at: string;
}

interface Faculty {
  id: string;
  name: string;
  description: string | null;
  order_num: number | null;
}

interface Program {
  id: string;
  name: string;
  description: string | null;
  faculty_id: string | null;
}

interface SectionMetadata {
  id: string;
  section_name: string;
  title: string;
  description: string | null;
}

type SectionType = 'pendaftar' | 'akademik' | 'pengabdian' | 'penelitian' | 'berita' | 'kegiatan' | 'jadwal' | 'galeri' | 'bem';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState<SectionType>('pendaftar');
  const params = useParams();

  // Dialog states
  const [isEditingHeader, setIsEditingHeader] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Data states
  const [sectionMetadata, setSectionMetadata] = useState<SectionMetadata | null>(null);
  const [pendaftars, setPendaftars] = useState<Pendaftar[]>([]);

  // states for editing pendaftar
  const [isEditPendaftarOpen, setIsEditPendaftarOpen] = useState(false);
  const [pendaftarForm, setPendaftarForm] = useState<Partial<Pendaftar>>({});
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [pengabdianList, setPengabdianList] = useState<any[]>([]);
  const [penelitianList, setPenelitianList] = useState<any[]>([]);
  const [beritaList, setBeritaList] = useState<any[]>([]);
  const [kegiatanList, setKegiatanList] = useState<any[]>([]);
  const [jadwalList, setJadwalList] = useState<any[]>([]);
  const [galeriList, setGaleriList] = useState<any[]>([]);
  const [bemList, setBemList] = useState<any[]>([]);

  // Form states
  const [headerForm, setHeaderForm] = useState({ title: '', description: '' });
  const [itemForm, setItemForm] = useState<any>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'Pending' | 'Diterima' | 'Ditolak'>('all');

  const handleSetSelectedSection = (s: SectionType) => {
    setSelectedSection(s);
    setIsEditingHeader(false);
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
    setEditingItem(null);
    setItemForm({});
    navigate(`/admin/${s}`);
  };

  useEffect(() => {
    const s = (params as any).section as string | undefined;
    const allowed: SectionType[] = ['pendaftar', 'akademik', 'pengabdian', 'penelitian', 'berita', 'kegiatan', 'jadwal', 'galeri', 'bem'];
    if (s && allowed.includes(s as SectionType)) {
      setSelectedSection(s as SectionType);
    }
  }, [params]);

  // Fetch section metadata
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const { data } = await supabase
          .from('section_metadata')
          .select('*')
          .eq('section_name', selectedSection)
          .single();
        if (data) {
          setSectionMetadata(data);
          setHeaderForm({ title: data.title, description: data.description || '' });
        }
      } catch (err) {
        console.error('Error fetching metadata:', err);
      }
    };
    fetchMetadata();
  }, [selectedSection]);

  // Fetch data by section
  useEffect(() => {
    const fetch = async () => {
      try {
        if (selectedSection === 'pendaftar') {
          const { data } = await supabase.from('pendaftar').select('*').order('created_at', { ascending: false });
          setPendaftars(data || []);
        } else if (selectedSection === 'akademik') {
          const [{ data: fac }, { data: prog }] = await Promise.all([
            supabase.from('faculty').select('*').order('order_num'),
            supabase.from('program_studi').select('*'),
          ]);
          setFaculties(fac || []);
          setPrograms(prog || []);
        } else if (selectedSection === 'pengabdian') {
          const { data } = await supabase.from('pengabdian').select('*');
          setPengabdianList(data || []);
        } else if (selectedSection === 'penelitian') {
          const { data } = await supabase.from('pengabdian').select('*').eq('category', 'penelitian');
          setPenelitianList(data || []);
        } else if (selectedSection === 'berita') {
          const { data } = await supabase.from('berita').select('*');
          setBeritaList(data || []);
        } else if (selectedSection === 'kegiatan') {
          const { data } = await supabase.from('kegiatan').select('*');
          setKegiatanList(data || []);
        } else if (selectedSection === 'jadwal') {
          const { data } = await supabase.from('jadwal').select('*');
          setJadwalList(data || []);
        } else if (selectedSection === 'galeri') {
          const { data } = await supabase.from('galeri').select('*');
          setGaleriList(data || []);
        } else if (selectedSection === 'bem') {
          const { data } = await supabase.from('bem').select('*');
          setBemList(data || []);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetch();
  }, [selectedSection]);

  // Update section metadata
  const updateMetadata = async () => {
    if (!sectionMetadata) return;
    try {
      await supabase
        .from('section_metadata')
        .update({ title: headerForm.title, description: headerForm.description })
        .eq('id', sectionMetadata.id);
      setSectionMetadata({ ...sectionMetadata, ...headerForm });
      setIsEditingHeader(false);
      toast.success('Section header updated');
    } catch (err) {
      toast.error('Failed to update');
    }
  };

  // Upload image (improved error handling, returns public URL or null)
  const uploadImage = async (file: File) => {
    try {
      const filename = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage.from('media').upload(filename, file);
      if (error) throw error;
      if (!data) throw new Error('No data');
      const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(filename);
      return publicUrl;
    } catch (err) {
      console.error('uploadImage error', err);
      toast.error('Failed to upload image');
      return null;
    }
  };

  // attempt to delete an image from storage given its public url
  const deleteImage = async (url: string) => {
    try {
      const segments = url.split('/');
      const filename = segments.pop();
      if (!filename) return;
      const { error } = await supabase.storage.from('media').remove([filename]);
      if (error) console.warn('failed to delete image from storage', error);
    } catch (err) {
      console.error('deleteImage error', err);
    }
  };

  // Generic CRUD handlers for content sections
  const createContentItem = async (table: string) => {
    if (!itemForm.title) return toast.error('Judul wajib diisi');
    try {
      const { data } = await (supabase.from as any)(table).insert([itemForm]).select().single();
      if (table === 'pengabdian') setPengabdianList([...pengabdianList, data]);
      else if (table === 'berita') setBeritaList([...beritaList, data]);
      else if (table === 'kegiatan') setKegiatanList([...kegiatanList, data]);
      else if (table === 'jadwal') setJadwalList([...jadwalList, data]);
      else if (table === 'galeri') setGaleriList([...galeriList, data]);
      else if (table === 'bem') setBemList([...bemList, data]);
      setIsAddDialogOpen(false);
      setItemForm({});
      toast.success('Item ditambahkan');
    } catch (err) {
      console.error(err);
      toast.error('Gagal menambahkan item');
    }
  };

  const updateContentItem = async (table: string, id: string) => {
    if (!editingItem) return;
    try {
      await (supabase.from as any)(table).update(itemForm).eq('id', id);
      // Update local state
      if (table === 'pengabdian') setPengabdianList(pengabdianList.map(i => i.id === id ? {...i, ...itemForm} : i));
      else if (table === 'berita') setBeritaList(beritaList.map(i => i.id === id ? {...i, ...itemForm} : i));
      else if (table === 'kegiatan') setKegiatanList(kegiatanList.map(i => i.id === id ? {...i, ...itemForm} : i));
      else if (table === 'jadwal') setJadwalList(jadwalList.map(i => i.id === id ? {...i, ...itemForm} : i));
      else if (table === 'galeri') setGaleriList(galeriList.map(i => i.id === id ? {...i, ...itemForm} : i));
      else if (table === 'bem') setBemList(bemList.map(i => i.id === id ? {...i, ...itemForm} : i));
      setIsEditDialogOpen(false);
      setEditingItem(null);
      setItemForm({});
      toast.success('Item updated');
    } catch (err) {
      toast.error('Gagal update item');
    }
  };

  const deleteContentItem = async (table: string, id: string) => {
    if (!confirm('Hapus item ini?')) return;
    try {
      await (supabase.from as any)(table).delete().eq('id', id);
      if (table === 'pengabdian') setPengabdianList(pengabdianList.filter(i => i.id !== id));
      else if (table === 'berita') setBeritaList(beritaList.filter(i => i.id !== id));
      else if (table === 'kegiatan') setKegiatanList(kegiatanList.filter(i => i.id !== id));
      else if (table === 'jadwal') setJadwalList(jadwalList.filter(i => i.id !== id));
      else if (table === 'galeri') setGaleriList(galeriList.filter(i => i.id !== id));
      else if (table === 'bem') setBemList(bemList.filter(i => i.id !== id));
      toast.success('Item dihapus');
    } catch (err) {
      toast.error('Gagal hapus item');
    }
  };

  // Render sections
  const renderSection = () => {
    switch (selectedSection) {
      case 'pendaftar': return renderPendaftar();
      case 'akademik': return renderAkademik();
      case 'pengabdian': return renderContentSection('pengabdian', pengabdianList, 'pengabdian');
      case 'penelitian': return renderContentSection('penelitian', penelitianList, 'pengabdian');
      case 'berita': return renderContentSection('berita', beritaList, 'berita');
      case 'kegiatan': return renderContentSection('kegiatan', kegiatanList, 'kegiatan');
      case 'jadwal': return renderContentSection('jadwal', jadwalList, 'jadwal');
      case 'galeri': return renderContentSection('galeri', galeriList, 'galeri');
      case 'bem': return renderContentSection('bem', bemList, 'bem');
      default: return null;
    }
  };

const deletePendaftar = async (id: string) => {
        if (!confirm('Hapus pendaftar ini?')) return;
        try {
          await supabase.from('pendaftar').delete().eq('id', id);
          setPendaftars(pendaftars.filter(p => p.id !== id));
          toast.success('Pendaftar dihapus');
        } catch (err) {
          toast.error('Gagal menghapus pendaftar');
        }
      };

      const renderPendaftar = () => {
    const filtered = pendaftars.filter(p => {
      const matchSearch = [p.nama, p.email, p.telepon].some(v => v?.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchStatus = filterStatus === 'all' || p.status === filterStatus;
      return matchSearch && matchStatus;
    });

    return (
      <div className="space-y-4">
        <div className="flex gap-2 mb-4 flex-wrap">
          <Input placeholder="Cari..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="flex-1 min-w-48" />
          <Select value={filterStatus} onValueChange={(v: any) => setFilterStatus(v)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Diterima">Diterima</SelectItem>
              <SelectItem value="Ditolak">Ditolak</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader><TableRow>
            <TableHead>Nama</TableHead><TableHead>Email</TableHead><TableHead>Telepon</TableHead><TableHead>Program</TableHead><TableHead>Status</TableHead><TableHead>Aksi</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {filtered.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.nama}</TableCell>
                <TableCell>{p.email}</TableCell>
                <TableCell>{p.telepon}</TableCell>
                <TableCell>{p.program_studi}</TableCell>
                <TableCell>{p.status === 'Pending' ? <Badge variant="secondary">Pending</Badge> : p.status === 'Diterima' ? <Badge className="bg-green-600">Diterima</Badge> : <Badge variant="destructive">Ditolak</Badge>}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => { setPendaftarForm(p); setIsEditPendaftarOpen(true); }}><Edit className="w-4 h-4" /></Button>
                    <Button size="sm" variant="ghost" className="text-destructive" onClick={() => deletePendaftar(p.id)}><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={isEditPendaftarOpen} onOpenChange={setIsEditPendaftarOpen}>
          <DialogContent>
            <DialogHeader><DialogTitle>Edit Pendaftar</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Nama</Label><Input value={pendaftarForm.nama || ''} onChange={(e) => setPendaftarForm({...pendaftarForm, nama: e.target.value})} /></div>
              <div><Label>Email</Label><Input value={pendaftarForm.email || ''} onChange={(e) => setPendaftarForm({...pendaftarForm, email: e.target.value})} /></div>
              <div><Label>Telepon</Label><Input value={pendaftarForm.telepon || ''} onChange={(e) => setPendaftarForm({...pendaftarForm, telepon: e.target.value})} /></div>
              <div><Label>Status</Label>
                <Select value={pendaftarForm.status || ''} onValueChange={(v: any) => setPendaftarForm({...pendaftarForm, status: v})}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Diterima">Diterima</SelectItem>
                    <SelectItem value="Ditolak">Ditolak</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 justify-between">
                <Button size="sm" variant="destructive" onClick={() => {
                  if (!pendaftarForm.id) return;
                  deletePendaftar(pendaftarForm.id as string);
                  setIsEditPendaftarOpen(false);
                  setPendaftarForm({});
                }}>Hapus</Button>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => { setIsEditPendaftarOpen(false); setPendaftarForm({}); }}>Batal</Button>
                  <Button onClick={async () => {
                  if (!pendaftarForm.id) return;
                  try {
                    const { data, error } = await supabase.from('pendaftar').update(pendaftarForm).eq('id', pendaftarForm.id as string);
                    if (error) throw error;
                    setPendaftars(pendaftars.map(p => p.id === pendaftarForm.id ? {...p, ...(pendaftarForm as any)} : p));
                    setFilterStatus('all'); // reset filter so updated row stays visible
                    setIsEditPendaftarOpen(false);
                    setPendaftarForm({});
                    toast.success('Pendaftar updated');
                  } catch (err) {
                    console.error('update pendaftar error', err);
                    toast.error('Gagal update pendaftar');
                  }
                }}>Simpan</Button>
              </div>
            </div>
          </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  const renderAkademik = () => {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
          {isEditingHeader ? (
            <div className="space-y-4">
              <div><Label>Judul</Label><Input value={headerForm.title} onChange={(e) => setHeaderForm({...headerForm, title: e.target.value})} /></div>
              <div><Label>Deskripsi</Label><Textarea value={headerForm.description} onChange={(e) => setHeaderForm({...headerForm, description: e.target.value})} rows={3} /></div>
              <div className="flex gap-2">
                <Button size="sm" onClick={updateMetadata}>Simpan</Button>
                <Button size="sm" variant="outline" onClick={() => setIsEditingHeader(false)}>Batal</Button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold mb-2">{sectionMetadata?.title}</h2>
                <p className="text-gray-600">{sectionMetadata?.description}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setIsEditingHeader(true)}><Edit className="w-4 h-4 mr-1" />Edit Header</Button>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {faculties.map((faculty) => {
            const facultyPrograms = programs.filter(p => p.faculty_id === faculty.id);
            return (
              <Collapsible key={faculty.id} className="border rounded-lg">
                <CollapsibleTrigger className="w-full p-4 flex justify-between items-center hover:bg-gray-50">
                  <h3 className="font-semibold text-lg">{faculty.name}</h3>
                  <ChevronDown className="w-5 h-5" />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 border-t space-y-3">
                  {facultyPrograms.map((prog) => (
                    <div key={prog.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div className="flex-1">
                        <p className="font-medium">{prog.name}</p>
                        {prog.description && <p className="text-sm text-gray-600">{prog.description}</p>}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => { setEditingItem(prog); setItemForm({...prog}); setIsEditDialogOpen(true); }}><Edit className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm" className="text-destructive" onClick={() => {
                          if (confirm('Hapus program ini?')) {
                            supabase.from('program_studi').delete().eq('id', prog.id).then(() => {
                              setPrograms(programs.filter(p => p.id !== prog.id));
                              toast.success('Program dihapus');
                            });
                          }
                        }}><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </div>
                  ))}
                  <Button size="sm" variant="outline" onClick={() => { setItemForm({faculty_id: faculty.id}); setIsAddDialogOpen(true); }} className="w-full"><Plus className="w-4 h-4 mr-1" />Tambah Program</Button>
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent>
            <DialogHeader><DialogTitle>Tambah Program Studi</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Nama</Label><Input value={itemForm.name || ''} onChange={(e) => setItemForm({...itemForm, name: e.target.value})} /></div>
              <div><Label>Deskripsi</Label><Textarea value={itemForm.description || ''} onChange={(e) => setItemForm({...itemForm, description: e.target.value})} rows={2} /></div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => { setIsAddDialogOpen(false); setItemForm({}); }}>Batal</Button>
                <Button onClick={async () => {
                  if (!itemForm.name || !itemForm.faculty_id) return toast.error('Wajib diisi');
                  try {
                    const { data } = await supabase.from('program_studi').insert([itemForm]).select().single();
                    setPrograms([...programs, data]);
                    setIsAddDialogOpen(false);
                    setItemForm({});
                    toast.success('Program ditambahkan');
                  } catch (err) {
                    toast.error('Gagal menambahkan');
                  }
                }}>Simpan</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader><DialogTitle>Edit Program Studi</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Nama</Label><Input value={itemForm.name || ''} onChange={(e) => setItemForm({...itemForm, name: e.target.value})} /></div>
              <div><Label>Deskripsi</Label><Textarea value={itemForm.description || ''} onChange={(e) => setItemForm({...itemForm, description: e.target.value})} rows={2} /></div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => { setIsEditDialogOpen(false); setEditingItem(null); setItemForm({}); }}>Batal</Button>
                <Button onClick={async () => {
                  if (!editingItem) return;
                  try {
                    await supabase.from('program_studi').update(itemForm).eq('id', editingItem.id);
                    setPrograms(programs.map(p => p.id === editingItem.id ? { ...p, ...itemForm } : p));
                    setIsEditDialogOpen(false);
                    setEditingItem(null);
                    setItemForm({});
                    toast.success('Program updated');
                  } catch (err) {
                    toast.error('Gagal update');
                  }
                }}>Simpan</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  const renderContentSection = (section: SectionType, items: any[], table: string) => {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
          {isEditingHeader ? (
            <div className="space-y-4">
              <div><Label>Judul</Label><Input value={headerForm.title} onChange={(e) => setHeaderForm({...headerForm, title: e.target.value})} /></div>
              <div><Label>Deskripsi</Label><Textarea value={headerForm.description} onChange={(e) => setHeaderForm({...headerForm, description: e.target.value})} rows={3} /></div>
              <div className="flex gap-2">
                <Button size="sm" onClick={updateMetadata}>Simpan</Button>
                <Button size="sm" variant="outline" onClick={() => setIsEditingHeader(false)}>Batal</Button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold mb-2">{sectionMetadata?.title}</h2>
                <p className="text-gray-600">{sectionMetadata?.description}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setIsEditingHeader(true)}><Edit className="w-4 h-4 mr-1" />Edit Header</Button>
            </div>
          )}
        </div>

        <div className="space-y-3">
          {items.length === 0 ? (
            <p className="text-gray-500">Belum ada item</p>
          ) : (
            items.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex gap-4">
                  {item.image_url && <img src={item.image_url} alt={item.title} className="w-24 h-24 object-cover rounded" />}
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.description || item.excerpt || item.location || ''}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => { setEditingItem(item); setItemForm({...item}); setIsEditDialogOpen(true); }}><Edit className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="sm" className="text-destructive" onClick={() => deleteContentItem(table, item.id)}><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        <Button onClick={() => { setItemForm({}); setIsAddDialogOpen(true); }}><Plus className="w-4 h-4 mr-2" />Tambah Item</Button>

        {/* Add Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent>
            <DialogHeader><DialogTitle>Tambah {sectionMetadata?.title}</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Judul</Label><Input value={itemForm.title || ''} onChange={(e) => setItemForm({...itemForm, title: e.target.value})} /></div>
              {['berita'].includes(table) && <div><Label>Kutipan</Label><Input value={itemForm.excerpt || ''} onChange={(e) => setItemForm({...itemForm, excerpt: e.target.value})} /></div>}
              {['kegiatan', 'jadwal'].includes(table) && <div><Label>Lokasi</Label><Input value={itemForm.location || ''} onChange={(e) => setItemForm({...itemForm, location: e.target.value})} /></div>}
              {['jadwal'].includes(table) && <>
                <div><Label>Hari</Label><Input value={itemForm.day || ''} onChange={(e) => setItemForm({...itemForm, day: e.target.value})} /></div>
                <div className="grid grid-cols-2 gap-2"><div><Label>Jam Mulai</Label><Input value={itemForm.time_from || ''} onChange={(e) => setItemForm({...itemForm, time_from: e.target.value})} /></div><div><Label>Jam Selesai</Label><Input value={itemForm.time_to || ''} onChange={(e) => setItemForm({...itemForm, time_to: e.target.value})} /></div></div>
              </>}
              <div><Label>Deskripsi</Label><Textarea value={itemForm.description || ''} onChange={(e) => setItemForm({...itemForm, description: e.target.value})} rows={3} /></div>
              {!['jadwal'].includes(table) && <>
                <div><Label>Upload Gambar</Label><Input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadImage(f).then(url => setItemForm({...itemForm, image_url: url})); }} /></div>
                <div><Label>Atau URL Gambar</Label><Input value={itemForm.image_url || ''} onChange={(e) => setItemForm({...itemForm, image_url: e.target.value})} placeholder="https://..." /></div>
              </>}
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => { setIsAddDialogOpen(false); setItemForm({}); }}>Batal</Button>
                <Button onClick={() => createContentItem(table)}>Simpan</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader><DialogTitle>Edit {sectionMetadata?.title}</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Judul</Label><Input value={itemForm.title || ''} onChange={(e) => setItemForm({...itemForm, title: e.target.value})} /></div>
              {itemForm.image_url && (
                <div className="space-y-1">
                  <Label>Gambar Saat Ini</Label>
                  <img src={itemForm.image_url} alt="preview" className="w-32 h-auto rounded mb-2" />
                  <Button size="sm" variant="destructive" onClick={async () => {
                    await deleteImage(itemForm.image_url as string);
                    setItemForm({...itemForm, image_url: ''});
                  }}>Hapus Gambar</Button>
                </div>
              )}
              {['berita'].includes(table) && <div><Label>Kutipan</Label><Input value={itemForm.excerpt || ''} onChange={(e) => setItemForm({...itemForm, excerpt: e.target.value})} /></div>}
              {['kegiatan', 'jadwal'].includes(table) && <div><Label>Lokasi</Label><Input value={itemForm.location || ''} onChange={(e) => setItemForm({...itemForm, location: e.target.value})} /></div>}
              {['jadwal'].includes(table) && <>
                <div><Label>Hari</Label><Input value={itemForm.day || ''} onChange={(e) => setItemForm({...itemForm, day: e.target.value})} /></div>
                <div className="grid grid-cols-2 gap-2"><div><Label>Jam Mulai</Label><Input value={itemForm.time_from || ''} onChange={(e) => setItemForm({...itemForm, time_from: e.target.value})} /></div><div><Label>Jam Selesai</Label><Input value={itemForm.time_to || ''} onChange={(e) => setItemForm({...itemForm, time_to: e.target.value})} /></div></div>
              </>}
              <div><Label>Deskripsi</Label><Textarea value={itemForm.description || ''} onChange={(e) => setItemForm({...itemForm, description: e.target.value})} rows={3} /></div>
              {!['jadwal'].includes(table) && <div><Label>Upload Gambar Baru</Label><Input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadImage(f).then(url => setItemForm({...itemForm, image_url: url})); }} /></div>}
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => { setIsEditDialogOpen(false); setEditingItem(null); setItemForm({}); }}>Batal</Button>
                <Button onClick={() => updateContentItem(table, editingItem.id)}>Simpan</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <AdminLayout selectedSection={selectedSection} setSelectedSection={handleSetSelectedSection} onLogout={handleLogout} hideSidebar={false}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">{renderSection()}</div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
