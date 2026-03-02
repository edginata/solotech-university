import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, FileText, Image, Calendar as CalIcon, LogOut } from 'lucide-react';
import uktsLogo from '@/assets/gallery/logo-ukts.png';

type SectionKey = 'pendaftar' | 'akademik' | 'pengabdian' | 'penelitian' | 'berita' | 'kegiatan' | 'jadwal' | 'galeri';

interface Props {
  selectedSection: SectionKey;
  setSelectedSection: (s: SectionKey) => void;
  onLogout?: () => void;
  children: React.ReactNode;
  hideSidebar?: boolean;
}

const AdminLayout: React.FC<Props> = ({ selectedSection, setSelectedSection, onLogout, children, hideSidebar }) => {
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={uktsLogo} alt="UKTS Logo" className="w-10 h-10 object-contain" />
            <div>
              <h1 className="font-heading font-bold text-lg">Admin Dashboard</h1>
              <p className="text-sm text-primary-foreground/80">Universitas Kristen Teknologi Solo</p>
            </div>
          </div>
          <Button variant="secondary" onClick={onLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {!hideSidebar && (
            <aside className="md:col-span-3">
              <div className="bg-white rounded-lg shadow p-4 sticky top-6">
                <div className="mb-4">
                  <h3 className="font-semibold">Menu Admin</h3>
                  <p className="text-sm text-muted-foreground">Pilih area untuk diedit</p>
                </div>
                <nav className="space-y-1">
                  <button onClick={() => setSelectedSection('pendaftar')} className={`w-full text-left px-3 py-2 rounded ${selectedSection === 'pendaftar' ? 'bg-primary/10' : 'hover:bg-muted'}`}>
                    <div className="flex items-center gap-2"><Users className="w-4 h-4" /> Pendaftar</div>
                  </button>
                  <button onClick={() => setSelectedSection('akademik')} className={`w-full text-left px-3 py-2 rounded ${selectedSection === 'akademik' ? 'bg-primary/10' : 'hover:bg-muted'}`}>
                    <div className="flex items-center gap-2"><FileText className="w-4 h-4" /> Program Akademik</div>
                  </button>
                  <button onClick={() => setSelectedSection('pengabdian')} className={`w-full text-left px-3 py-2 rounded ${selectedSection === 'pengabdian' ? 'bg-primary/10' : 'hover:bg-muted'}`}>
                    <div className="flex items-center gap-2"><Image className="w-4 h-4" /> Pengabdian</div>
                  </button>
                  <button onClick={() => setSelectedSection('penelitian')} className={`w-full text-left px-3 py-2 rounded ${selectedSection === 'penelitian' ? 'bg-primary/10' : 'hover:bg-muted'}`}>
                    <div className="flex items-center gap-2"><FileText className="w-4 h-4" /> Penelitian</div>
                  </button>
                  <button onClick={() => setSelectedSection('berita')} className={`w-full text-left px-3 py-2 rounded ${selectedSection === 'berita' ? 'bg-primary/10' : 'hover:bg-muted'}`}>
                    <div className="flex items-center gap-2"><FileText className="w-4 h-4" /> Berita</div>
                  </button>
                  <button onClick={() => setSelectedSection('kegiatan')} className={`w-full text-left px-3 py-2 rounded ${selectedSection === 'kegiatan' ? 'bg-primary/10' : 'hover:bg-muted'}`}>
                    <div className="flex items-center gap-2"><CalIcon className="w-4 h-4" /> Kegiatan</div>
                  </button>
                  <button onClick={() => setSelectedSection('jadwal')} className={`w-full text-left px-3 py-2 rounded ${selectedSection === 'jadwal' ? 'bg-primary/10' : 'hover:bg-muted'}`}>
                    <div className="flex items-center gap-2"><CalIcon className="w-4 h-4" /> Jadwal</div>
                  </button>
                  <button onClick={() => setSelectedSection('galeri')} className={`w-full text-left px-3 py-2 rounded ${selectedSection === 'galeri' ? 'bg-primary/10' : 'hover:bg-muted'}`}>
                    <div className="flex items-center gap-2"><Image className="w-4 h-4" /> Galeri</div>
                  </button>
                </nav>
              </div>
            </aside>
          )}

          <section className={`${hideSidebar ? 'md:col-span-12' : 'md:col-span-9'}`}>
            {children}
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
