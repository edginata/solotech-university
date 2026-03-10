import { useLocation, useNavigate } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  FlaskConical,
  HandHeart,
  Newspaper,
  Calendar,
  Image,
  Award,
  ShieldCheck,
  UserCheck,
  LogOut,
  Settings,
} from 'lucide-react';
import uktsLogo from '@/assets/gallery/logo-ukts.png';

const menuItems = [
  { title: 'Dashboard', url: '/admin/dashboard', icon: LayoutDashboard },
  { title: 'Data Pendaftar', url: '/admin/pendaftar', icon: Users },
  { title: 'Akademik', url: '/admin/akademik', icon: GraduationCap },
  { title: 'Berita', url: '/admin/berita', icon: Newspaper },
  { title: 'Kegiatan', url: '/admin/kegiatan', icon: Calendar },
  { title: 'Penelitian', url: '/admin/penelitian', icon: FlaskConical },
  { title: 'Pengabdian', url: '/admin/pengabdian', icon: HandHeart },
  { title: 'BEM', url: '/admin/bem', icon: Award },
  { title: 'Alumni', url: '/admin/alumni', icon: UserCheck },
  { title: 'Akreditasi', url: '/admin/akreditasi', icon: ShieldCheck },
  { title: 'Jadwal', url: '/admin/jadwal', icon: BookOpen },
  { title: 'Pengaturan', url: '/admin/settings', icon: Settings },
];

interface Props {
  onLogout: () => void;
}

const AdminSidebar = ({ onLogout }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <img src={uktsLogo} alt="UKTS" className="w-9 h-9 object-contain shrink-0" />
          {!collapsed && (
            <div className="overflow-hidden">
              <h2 className="font-heading font-bold text-sm text-foreground truncate">Admin CMS</h2>
              <p className="text-xs text-muted-foreground truncate">UKTS Solo</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      onClick={() => navigate(item.url)}
                      isActive={isActive}
                      tooltip={item.title}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={onLogout}
          className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span>Logout</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
