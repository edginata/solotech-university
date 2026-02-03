import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

interface SearchItem {
  title: string;
  description: string;
  href: string;
  category: string;
}

const searchItems: SearchItem[] = [
  // Beranda
  { title: 'Beranda', description: 'Halaman utama UKTS', href: '/', category: 'Halaman' },
  
  // Profil
  { title: 'Tentang UKTS', description: 'Informasi tentang universitas', href: '/profil', category: 'Profil' },
  { title: 'Visi & Misi', description: 'Visi dan misi UKTS', href: '/profil#visi-misi', category: 'Profil' },
  { title: 'Sejarah', description: 'Sejarah pendirian UKTS', href: '/profil#sejarah', category: 'Profil' },
  
  // Akademik
  { title: 'Akademik', description: 'Program akademik dan kalender', href: '/akademik', category: 'Akademik' },
  { title: 'Fakultas Teologi', description: 'Pendidikan Agama Kristen', href: '/fakultas/teologi', category: 'Fakultas' },
  { title: 'Fakultas Teknik', description: 'Teknik Informatika, Teknik Lingkungan', href: '/fakultas/teknik', category: 'Fakultas' },
  { title: 'Fakultas Ekonomi', description: 'Manajemen dan Akuntansi', href: '/fakultas/ekonomi', category: 'Fakultas' },
  
  // Program Studi
  { title: 'S1 Pendidikan Agama Kristen', description: 'Program studi PAK', href: '/fakultas/teologi', category: 'Program Studi' },
  { title: 'S1 Teknik Informatika', description: 'Program studi informatika', href: '/fakultas/teknik', category: 'Program Studi' },
  { title: 'S1 Teknik Lingkungan', description: 'Program studi teknik lingkungan', href: '/fakultas/teknik', category: 'Program Studi' },
  { title: 'S1 Manajemen', description: 'Program studi manajemen', href: '/fakultas/ekonomi', category: 'Program Studi' },
  { title: 'S1 Akuntansi', description: 'Program studi akuntansi', href: '/fakultas/ekonomi', category: 'Program Studi' },
  
  // Penelitian & Pengabdian
  { title: 'Penelitian', description: 'Kegiatan penelitian dan publikasi', href: '/penelitian', category: 'Lainnya' },
  { title: 'Pengabdian Masyarakat', description: 'Program pengabdian kepada masyarakat', href: '/pengabdian', category: 'Lainnya' },
  
  // PMB
  { title: 'Penerimaan Mahasiswa Baru', description: 'Informasi PMB UKTS', href: '/pmb', category: 'PMB' },
  { title: 'Pendaftaran Online', description: 'Form pendaftaran mahasiswa baru', href: '/pendaftaran', category: 'PMB' },
  { title: 'Beasiswa SPARK', description: 'Informasi beasiswa UKTS', href: '/pmb#beasiswa', category: 'PMB' },
  { title: 'Biaya Kuliah', description: 'Informasi biaya pendidikan', href: '/pmb#biaya', category: 'PMB' },
];

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const navigate = useNavigate();

  const handleSelect = (href: string) => {
    onOpenChange(false);
    if (href.startsWith('http')) {
      window.open(href, '_blank');
    } else {
      navigate(href);
    }
  };

  // Group items by category
  const groupedItems = searchItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, SearchItem[]>);

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Cari halaman, program studi, informasi..." />
      <CommandList>
        <CommandEmpty>Tidak ditemukan hasil pencarian.</CommandEmpty>
        {Object.entries(groupedItems).map(([category, items]) => (
          <CommandGroup key={category} heading={category}>
            {items.map((item) => (
              <CommandItem
                key={item.href}
                value={`${item.title} ${item.description}`}
                onSelect={() => handleSelect(item.href)}
                className="cursor-pointer"
              >
                <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-muted-foreground">{item.description}</div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
};

export default SearchDialog;
