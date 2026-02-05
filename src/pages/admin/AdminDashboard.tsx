 import { useState, useEffect } from 'react';
 import { useNavigate } from 'react-router-dom';
 import { Button } from '@/components/ui/button';
 import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
 import { Input } from '@/components/ui/input';
 import { Label } from '@/components/ui/label';
 import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
 import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
 import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
 import { Badge } from '@/components/ui/badge';
 import { supabase } from '@/integrations/supabase/client';
 import { toast } from 'sonner';
 import { LogOut, Users, FileDown, Edit, Trash2, Eye, Search, Plus } from 'lucide-react';
 import uktsLogo from '@/assets/ukts-logo.png';
 
 interface Pendaftar {
   id: string;
   nama: string;
   email: string;
   telepon: string;
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
 
 const AdminDashboard = () => {
   const navigate = useNavigate();
   const [pendaftars, setPendaftars] = useState<Pendaftar[]>([]);
   const [loading, setLoading] = useState(true);
   const [searchTerm, setSearchTerm] = useState('');
   const [filterStatus, setFilterStatus] = useState('all');
   const [selectedPendaftar, setSelectedPendaftar] = useState<Pendaftar | null>(null);
   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
   const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
   const [editForm, setEditForm] = useState<Partial<Pendaftar>>({});
 
   useEffect(() => {
     checkAuth();
     fetchPendaftars();
   }, []);
 
   const checkAuth = async () => {
     const { data: { user } } = await supabase.auth.getUser();
     if (!user) {
       navigate('/admin/login');
       return;
     }
 
     const { data: roleData } = await supabase
       .from('user_roles')
       .select('role')
       .eq('user_id', user.id)
       .eq('role', 'admin')
       .maybeSingle();
 
     if (!roleData) {
       await supabase.auth.signOut();
       navigate('/admin/login');
     }
   };
 
   const fetchPendaftars = async () => {
     setLoading(true);
     const { data, error } = await supabase
       .from('pendaftar')
       .select('*')
       .order('created_at', { ascending: false });
 
     if (error) {
       toast.error('Gagal memuat data pendaftar');
     } else {
       setPendaftars(data || []);
     }
     setLoading(false);
   };
 
   const handleLogout = async () => {
     await supabase.auth.signOut();
     navigate('/admin/login');
   };
 
   const handleUpdateStatus = async (id: string, newStatus: string) => {
     const { error } = await supabase
       .from('pendaftar')
       .update({ status: newStatus })
       .eq('id', id);
 
     if (error) {
       toast.error('Gagal mengupdate status');
     } else {
       toast.success('Status berhasil diupdate');
       fetchPendaftars();
     }
   };
 
   const handleEdit = (pendaftar: Pendaftar) => {
     setSelectedPendaftar(pendaftar);
     setEditForm(pendaftar);
     setIsEditDialogOpen(true);
   };
 
   const handleView = (pendaftar: Pendaftar) => {
     setSelectedPendaftar(pendaftar);
     setIsViewDialogOpen(true);
   };
 
   const handleSaveEdit = async () => {
     if (!selectedPendaftar) return;
 
     const { error } = await supabase
       .from('pendaftar')
       .update({
         nama: editForm.nama,
         email: editForm.email,
         telepon: editForm.telepon,
         alamat: editForm.alamat,
         program_studi: editForm.program_studi,
         status: editForm.status,
         asal_sekolah: editForm.asal_sekolah,
       })
       .eq('id', selectedPendaftar.id);
 
     if (error) {
       toast.error('Gagal menyimpan perubahan');
     } else {
       toast.success('Data berhasil disimpan');
       setIsEditDialogOpen(false);
       fetchPendaftars();
     }
   };
 
   const handleDelete = async (id: string) => {
     if (!confirm('Yakin ingin menghapus data ini?')) return;
 
     const { error } = await supabase
       .from('pendaftar')
       .delete()
       .eq('id', id);
 
     if (error) {
       toast.error('Gagal menghapus data');
     } else {
       toast.success('Data berhasil dihapus');
       fetchPendaftars();
     }
   };
 
   const handleExportCSV = () => {
     const filteredData = getFilteredPendaftars();
     const headers = ['No', 'Nama', 'Email', 'Telepon', 'Program Studi', 'Asal Sekolah', 'Status', 'Tanggal Daftar'];
     const csvContent = [
       headers.join(','),
       ...filteredData.map((p, i) => [
         i + 1,
         `"${p.nama}"`,
         p.email,
         p.telepon,
         p.program_studi,
         `"${p.asal_sekolah || '-'}"`,
         p.status,
         new Date(p.created_at).toLocaleDateString('id-ID')
       ].join(','))
     ].join('\n');
 
     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
     const link = document.createElement('a');
     link.href = URL.createObjectURL(blob);
     link.download = `pendaftar_ukts_${new Date().toISOString().split('T')[0]}.csv`;
     link.click();
     toast.success('Data berhasil diexport');
   };
 
   const getFilteredPendaftars = () => {
     return pendaftars.filter(p => {
       const matchesSearch = p.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
         p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
         p.telepon.includes(searchTerm);
       const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
       return matchesSearch && matchesStatus;
     });
   };
 
   const getStatusBadge = (status: string) => {
     switch (status) {
       case 'Pending':
         return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Pending</Badge>;
       case 'Diterima':
         return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Diterima</Badge>;
       case 'Ditolak':
         return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Ditolak</Badge>;
       default:
         return <Badge variant="outline">{status}</Badge>;
     }
   };
 
   const filteredPendaftars = getFilteredPendaftars();
 
   return (
     <div className="min-h-screen bg-muted/30">
       {/* Header */}
       <header className="bg-primary text-primary-foreground shadow-lg">
         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
           <div className="flex items-center gap-3">
             <img src={uktsLogo} alt="UKTS Logo" className="w-10 h-10 object-contain" />
             <div>
               <h1 className="font-heading font-bold text-lg">Admin Dashboard</h1>
               <p className="text-sm text-primary-foreground/80">Universitas Kristen Teknologi Solo</p>
             </div>
           </div>
           <Button variant="secondary" onClick={handleLogout} className="gap-2">
             <LogOut className="w-4 h-4" />
             Logout
           </Button>
         </div>
       </header>
 
       <main className="container mx-auto px-4 py-8">
         {/* Stats Cards */}
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
           <Card>
             <CardContent className="p-4 flex items-center gap-4">
               <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                 <Users className="w-6 h-6 text-primary" />
               </div>
               <div>
                 <p className="text-2xl font-bold">{pendaftars.length}</p>
                 <p className="text-sm text-muted-foreground">Total Pendaftar</p>
               </div>
             </CardContent>
           </Card>
           <Card>
             <CardContent className="p-4 flex items-center gap-4">
               <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                 <Users className="w-6 h-6 text-yellow-600" />
               </div>
               <div>
                 <p className="text-2xl font-bold">{pendaftars.filter(p => p.status === 'Pending').length}</p>
                 <p className="text-sm text-muted-foreground">Pending</p>
               </div>
             </CardContent>
           </Card>
           <Card>
             <CardContent className="p-4 flex items-center gap-4">
               <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                 <Users className="w-6 h-6 text-green-600" />
               </div>
               <div>
                 <p className="text-2xl font-bold">{pendaftars.filter(p => p.status === 'Diterima').length}</p>
                 <p className="text-sm text-muted-foreground">Diterima</p>
               </div>
             </CardContent>
           </Card>
           <Card>
             <CardContent className="p-4 flex items-center gap-4">
               <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                 <Users className="w-6 h-6 text-red-600" />
               </div>
               <div>
                 <p className="text-2xl font-bold">{pendaftars.filter(p => p.status === 'Ditolak').length}</p>
                 <p className="text-sm text-muted-foreground">Ditolak</p>
               </div>
             </CardContent>
           </Card>
         </div>
 
         {/* Main Table Card */}
         <Card>
           <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
             <CardTitle className="flex items-center gap-2">
               <Users className="w-5 h-5" />
               Data Pendaftar Mahasiswa Baru
             </CardTitle>
             <div className="flex flex-wrap gap-2">
               <Button variant="outline" onClick={handleExportCSV} className="gap-2">
                 <FileDown className="w-4 h-4" />
                 Export CSV
               </Button>
             </div>
           </CardHeader>
           <CardContent>
             {/* Filters */}
             <div className="flex flex-col md:flex-row gap-4 mb-6">
               <div className="relative flex-1">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                 <Input
                   placeholder="Cari nama, email, atau telepon..."
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="pl-10"
                 />
               </div>
               <Select value={filterStatus} onValueChange={setFilterStatus}>
                 <SelectTrigger className="w-full md:w-48">
                   <SelectValue placeholder="Filter Status" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="all">Semua Status</SelectItem>
                   <SelectItem value="Pending">Pending</SelectItem>
                   <SelectItem value="Diterima">Diterima</SelectItem>
                   <SelectItem value="Ditolak">Ditolak</SelectItem>
                 </SelectContent>
               </Select>
             </div>
 
             {/* Table */}
             {loading ? (
               <div className="text-center py-8 text-muted-foreground">Memuat data...</div>
             ) : filteredPendaftars.length === 0 ? (
               <div className="text-center py-8 text-muted-foreground">
                 {searchTerm || filterStatus !== 'all' ? 'Tidak ada data yang sesuai filter' : 'Belum ada data pendaftar'}
               </div>
             ) : (
               <div className="overflow-x-auto">
                 <Table>
                   <TableHeader>
                     <TableRow>
                       <TableHead className="w-12">No</TableHead>
                       <TableHead>Nama</TableHead>
                       <TableHead>Email</TableHead>
                       <TableHead>Telepon</TableHead>
                       <TableHead>Program Studi</TableHead>
                       <TableHead>Status</TableHead>
                       <TableHead>Tanggal Daftar</TableHead>
                       <TableHead className="text-right">Aksi</TableHead>
                     </TableRow>
                   </TableHeader>
                   <TableBody>
                     {filteredPendaftars.map((pendaftar, index) => (
                       <TableRow key={pendaftar.id}>
                         <TableCell>{index + 1}</TableCell>
                         <TableCell className="font-medium">{pendaftar.nama}</TableCell>
                         <TableCell>{pendaftar.email}</TableCell>
                         <TableCell>{pendaftar.telepon}</TableCell>
                         <TableCell>{pendaftar.program_studi}</TableCell>
                         <TableCell>
                           <Select
                             value={pendaftar.status}
                             onValueChange={(value) => handleUpdateStatus(pendaftar.id, value)}
                           >
                             <SelectTrigger className="w-28 h-8">
                               {getStatusBadge(pendaftar.status)}
                             </SelectTrigger>
                             <SelectContent>
                               <SelectItem value="Pending">Pending</SelectItem>
                               <SelectItem value="Diterima">Diterima</SelectItem>
                               <SelectItem value="Ditolak">Ditolak</SelectItem>
                             </SelectContent>
                           </Select>
                         </TableCell>
                         <TableCell>{new Date(pendaftar.created_at).toLocaleDateString('id-ID')}</TableCell>
                         <TableCell>
                           <div className="flex justify-end gap-1">
                             <Button variant="ghost" size="icon" onClick={() => handleView(pendaftar)} title="Lihat Detail">
                               <Eye className="w-4 h-4" />
                             </Button>
                             <Button variant="ghost" size="icon" onClick={() => handleEdit(pendaftar)} title="Edit">
                               <Edit className="w-4 h-4" />
                             </Button>
                             <Button variant="ghost" size="icon" onClick={() => handleDelete(pendaftar.id)} title="Hapus" className="text-destructive hover:text-destructive">
                               <Trash2 className="w-4 h-4" />
                             </Button>
                           </div>
                         </TableCell>
                       </TableRow>
                     ))}
                   </TableBody>
                 </Table>
               </div>
             )}
           </CardContent>
         </Card>
 
         {/* View Dialog */}
         <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
           <DialogContent className="max-w-lg">
             <DialogHeader>
               <DialogTitle>Detail Pendaftar</DialogTitle>
             </DialogHeader>
             {selectedPendaftar && (
               <div className="space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <Label className="text-muted-foreground text-sm">Nama Lengkap</Label>
                     <p className="font-medium">{selectedPendaftar.nama}</p>
                   </div>
                   <div>
                     <Label className="text-muted-foreground text-sm">Email</Label>
                     <p className="font-medium">{selectedPendaftar.email}</p>
                   </div>
                   <div>
                     <Label className="text-muted-foreground text-sm">Telepon</Label>
                     <p className="font-medium">{selectedPendaftar.telepon}</p>
                   </div>
                   <div>
                     <Label className="text-muted-foreground text-sm">Program Studi</Label>
                     <p className="font-medium">{selectedPendaftar.program_studi}</p>
                   </div>
                   <div>
                     <Label className="text-muted-foreground text-sm">Asal Sekolah</Label>
                     <p className="font-medium">{selectedPendaftar.asal_sekolah || '-'}</p>
                   </div>
                   <div>
                     <Label className="text-muted-foreground text-sm">Status</Label>
                     <p>{getStatusBadge(selectedPendaftar.status)}</p>
                   </div>
                   <div className="col-span-2">
                     <Label className="text-muted-foreground text-sm">Alamat</Label>
                     <p className="font-medium">{selectedPendaftar.alamat || '-'}</p>
                   </div>
                   <div>
                     <Label className="text-muted-foreground text-sm">Tanggal Daftar</Label>
                     <p className="font-medium">{new Date(selectedPendaftar.created_at).toLocaleString('id-ID')}</p>
                   </div>
                 </div>
               </div>
             )}
           </DialogContent>
         </Dialog>
 
         {/* Edit Dialog */}
         <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
           <DialogContent className="max-w-lg">
             <DialogHeader>
               <DialogTitle>Edit Data Pendaftar</DialogTitle>
             </DialogHeader>
             <div className="space-y-4">
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <Label>Nama Lengkap</Label>
                   <Input
                     value={editForm.nama || ''}
                     onChange={(e) => setEditForm({ ...editForm, nama: e.target.value })}
                   />
                 </div>
                 <div className="space-y-2">
                   <Label>Email</Label>
                   <Input
                     type="email"
                     value={editForm.email || ''}
                     onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                   />
                 </div>
                 <div className="space-y-2">
                   <Label>Telepon</Label>
                   <Input
                     value={editForm.telepon || ''}
                     onChange={(e) => setEditForm({ ...editForm, telepon: e.target.value })}
                   />
                 </div>
                 <div className="space-y-2">
                   <Label>Program Studi</Label>
                   <Select
                     value={editForm.program_studi || ''}
                     onValueChange={(value) => setEditForm({ ...editForm, program_studi: value })}
                   >
                     <SelectTrigger>
                       <SelectValue placeholder="Pilih Program Studi" />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectItem value="S1 Teknik Informatika">S1 Teknik Informatika</SelectItem>
                       <SelectItem value="S1 Teknik Lingkungan">S1 Teknik Lingkungan</SelectItem>
                       <SelectItem value="S1 Manajemen">S1 Manajemen</SelectItem>
                       <SelectItem value="S1 Akuntansi">S1 Akuntansi</SelectItem>
                       <SelectItem value="S1 Pendidikan Agama Kristen">S1 Pendidikan Agama Kristen</SelectItem>
                     </SelectContent>
                   </Select>
                 </div>
                 <div className="space-y-2">
                   <Label>Asal Sekolah</Label>
                   <Input
                     value={editForm.asal_sekolah || ''}
                     onChange={(e) => setEditForm({ ...editForm, asal_sekolah: e.target.value })}
                   />
                 </div>
                 <div className="space-y-2">
                   <Label>Status</Label>
                   <Select
                     value={editForm.status || ''}
                     onValueChange={(value) => setEditForm({ ...editForm, status: value })}
                   >
                     <SelectTrigger>
                       <SelectValue placeholder="Pilih Status" />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectItem value="Pending">Pending</SelectItem>
                       <SelectItem value="Diterima">Diterima</SelectItem>
                       <SelectItem value="Ditolak">Ditolak</SelectItem>
                     </SelectContent>
                   </Select>
                 </div>
               </div>
               <div className="space-y-2">
                 <Label>Alamat</Label>
                 <Input
                   value={editForm.alamat || ''}
                   onChange={(e) => setEditForm({ ...editForm, alamat: e.target.value })}
                 />
               </div>
             </div>
             <DialogFooter>
               <DialogClose asChild>
                 <Button variant="outline">Batal</Button>
               </DialogClose>
               <Button onClick={handleSaveEdit}>Simpan Perubahan</Button>
             </DialogFooter>
           </DialogContent>
         </Dialog>
       </main>
     </div>
   );
 };
 
 export default AdminDashboard;