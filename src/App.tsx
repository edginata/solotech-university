import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LiveChatWidget from "@/components/LiveChatWidget";
import Beranda from "./pages/Beranda";
import Index from "./pages/Index";
import Akademik from "./pages/Akademik";
import Penelitian from "./pages/Penelitian";
import Pengabdian from "./pages/Pengabdian";
import PengabdianDetail from "./pages/PengabdianDetail";
import BeritaKegiatan from "./pages/BeritaKegiatan";
import PMB from "./pages/PMB";
import Pendaftaran from "./pages/Pendaftaran";
import BEM from "./pages/BEM";
import FakultasTeologi from "./pages/FakultasTeologi";
import FakultasTeknik from "./pages/FakultasTeknik";
import FakultasEkonomi from "./pages/FakultasEkonomi";
 import NotFound from "./pages/NotFound";
 import AdminLogin from "./pages/admin/AdminLogin";
 import AdminDashboard from "./pages/admin/AdminDashboard";
 import AdminSetup from "./pages/admin/AdminSetup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Beranda />} />
          <Route path="/profil" element={<Index />} />
          <Route path="/akademik" element={<Akademik />} />
          <Route path="/penelitian" element={<Penelitian />} />
          <Route path="/pengabdian" element={<Pengabdian />} />
          <Route path="/pengabdian/:id" element={<PengabdianDetail />} />
          <Route path="/pmb" element={<PMB />} />
          <Route path="/berita-kegiatan" element={<BeritaKegiatan />} />
          <Route path="/pendaftaran" element={<Pendaftaran />} />
          <Route path="/bem" element={<BEM />} />
          <Route path="/fakultas/teologi" element={<FakultasTeologi />} />
          <Route path="/fakultas/teknik" element={<FakultasTeknik />} />
          <Route path="/fakultas/ekonomi" element={<FakultasEkonomi />} />
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/setup" element={<AdminSetup />} />
          <Route path="/admin/:section" element={<AdminDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <LiveChatWidget />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
