 import { useState } from 'react';
 import { useNavigate } from 'react-router-dom';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Label } from '@/components/ui/label';
 import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
 import { supabase } from '@/integrations/supabase/client';
 import { toast } from 'sonner';
 import { Lock, Mail, Eye, EyeOff, UserPlus } from 'lucide-react';
 import uktsLogo from '@/assets/ukts-logo.png';
 
 const AdminSetup = () => {
   const navigate = useNavigate();
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [loading, setLoading] = useState(false);
   const [showPassword, setShowPassword] = useState(false);
 
   const handleSetup = async (e: React.FormEvent) => {
     e.preventDefault();
     
     if (password !== confirmPassword) {
       toast.error('Password tidak cocok');
       return;
     }
 
     if (password.length < 6) {
       toast.error('Password minimal 6 karakter');
       return;
     }
 
     setLoading(true);
 
     try {
       // Create admin user
       const { data: authData, error: authError } = await supabase.auth.signUp({
         email: email.trim(),
         password,
         options: {
           emailRedirectTo: window.location.origin,
         }
       });
 
       if (authError) {
         toast.error('Gagal membuat akun: ' + authError.message);
         setLoading(false);
         return;
       }
 
       if (authData.user) {
         // Add admin role
         const { error: roleError } = await supabase
           .from('user_roles')
           .insert({
             user_id: authData.user.id,
             role: 'admin' as const,
           });
 
         if (roleError) {
           toast.error('Gagal menambahkan role admin');
           setLoading(false);
           return;
         }
 
         toast.success('Akun admin berhasil dibuat! Silakan cek email untuk verifikasi atau login langsung.');
         navigate('/admin/login');
       }
     } catch (err) {
       toast.error('Terjadi kesalahan saat membuat akun');
     } finally {
       setLoading(false);
     }
   };
 
   return (
     <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-accent/10 flex items-center justify-center p-4">
       <Card className="w-full max-w-md shadow-2xl">
         <CardHeader className="text-center space-y-4">
           <div className="flex justify-center">
             <img src={uktsLogo} alt="UKTS Logo" className="w-20 h-20 object-contain" />
           </div>
           <CardTitle className="font-heading text-2xl">Setup Admin Pertama</CardTitle>
           <CardDescription>
             Buat akun administrator untuk mengelola website UKTS
           </CardDescription>
         </CardHeader>
         <CardContent>
           <form onSubmit={handleSetup} className="space-y-4">
             <div className="space-y-2">
               <Label htmlFor="email">Email Admin</Label>
               <div className="relative">
                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                 <Input
                   id="email"
                   type="email"
                   placeholder="admin@ukts.ac.id"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   className="pl-10"
                   required
                 />
               </div>
             </div>
             <div className="space-y-2">
               <Label htmlFor="password">Password</Label>
               <div className="relative">
                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                 <Input
                   id="password"
                   type={showPassword ? 'text' : 'password'}
                   placeholder="Minimal 6 karakter"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className="pl-10 pr-10"
                   required
                 />
                 <button
                   type="button"
                   onClick={() => setShowPassword(!showPassword)}
                   className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                 >
                   {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                 </button>
               </div>
             </div>
             <div className="space-y-2">
               <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
               <div className="relative">
                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                 <Input
                   id="confirmPassword"
                   type={showPassword ? 'text' : 'password'}
                   placeholder="Ulangi password"
                   value={confirmPassword}
                   onChange={(e) => setConfirmPassword(e.target.value)}
                   className="pl-10"
                   required
                 />
               </div>
             </div>
             <Button type="submit" className="w-full gap-2" disabled={loading}>
               <UserPlus className="w-4 h-4" />
               {loading ? 'Memproses...' : 'Buat Akun Admin'}
             </Button>
           </form>
           <div className="mt-6 text-center space-y-2">
             <a href="/admin/login" className="text-sm text-primary hover:underline transition-colors">
               Sudah punya akun? Login di sini
             </a>
             <br />
             <a href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
               ← Kembali ke Beranda
             </a>
           </div>
         </CardContent>
       </Card>
     </div>
   );
 };
 
 export default AdminSetup;