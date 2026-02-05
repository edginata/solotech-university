 import { useState } from 'react';
 import { useNavigate } from 'react-router-dom';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Label } from '@/components/ui/label';
 import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
 import { supabase } from '@/integrations/supabase/client';
 import { toast } from 'sonner';
 import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
 import uktsLogo from '@/assets/ukts-logo.png';
 
 const AdminLogin = () => {
   const navigate = useNavigate();
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [loading, setLoading] = useState(false);
   const [showPassword, setShowPassword] = useState(false);
 
   const handleLogin = async (e: React.FormEvent) => {
     e.preventDefault();
     setLoading(true);
 
     try {
       const { data, error } = await supabase.auth.signInWithPassword({
         email: email.trim(),
         password,
       });
 
       if (error) {
         toast.error('Login gagal: ' + error.message);
         setLoading(false);
         return;
       }
 
       if (data.user) {
         // Check if user has admin role
         const { data: roleData, error: roleError } = await supabase
           .from('user_roles')
           .select('role')
           .eq('user_id', data.user.id)
           .eq('role', 'admin')
           .maybeSingle();
 
         if (roleError || !roleData) {
           await supabase.auth.signOut();
           toast.error('Anda tidak memiliki akses admin');
           setLoading(false);
           return;
         }
 
         toast.success('Login berhasil!');
         navigate('/admin/dashboard');
       }
     } catch (err) {
       toast.error('Terjadi kesalahan saat login');
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
           <CardTitle className="font-heading text-2xl">Login Admin</CardTitle>
           <CardDescription>
             Masuk ke panel administrasi UKTS
           </CardDescription>
         </CardHeader>
         <CardContent>
           <form onSubmit={handleLogin} className="space-y-4">
             <div className="space-y-2">
               <Label htmlFor="email">Email</Label>
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
                   placeholder="••••••••"
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
             <Button type="submit" className="w-full" disabled={loading}>
               {loading ? 'Memproses...' : 'Masuk'}
             </Button>
           </form>
           <div className="mt-6 text-center">
             <a href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
               ← Kembali ke Beranda
             </a>
           </div>
         </CardContent>
       </Card>
     </div>
   );
 };
 
 export default AdminLogin;