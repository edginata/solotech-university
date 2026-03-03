import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/admin/AdminSidebar';

interface Props {
  onLogout: () => void;
  children: React.ReactNode;
  pageTitle?: string;
}

const AdminLayout: React.FC<Props> = ({ onLogout, children, pageTitle }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-muted/30">
        <AdminSidebar onLogout={onLogout} />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center gap-3 border-b border-border bg-background px-4 shrink-0">
            <SidebarTrigger />
            {pageTitle && (
              <h1 className="font-heading font-semibold text-lg text-foreground truncate">{pageTitle}</h1>
            )}
          </header>
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
