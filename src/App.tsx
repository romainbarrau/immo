import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Listings from "./pages/Listings";
import ListingDetail from "./pages/ListingDetail";
import SoldProperties from "./pages/SoldProperties";
import Videos from "./pages/Videos";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import AdminUpload from "./pages/AdminUpload";
import AdminImport from "./pages/AdminImport";
import AdminPropertyCreate from "./pages/AdminPropertyCreate";
import AdminPropertyList from "./pages/AdminPropertyList";
import AdminPropertyEdit from "./pages/AdminPropertyEdit";
import AdminReviewsList from "./pages/AdminReviewsList";
import AdminVideosList from "./pages/AdminVideosList";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/listings/:id" element={<ListingDetail />} />
            <Route path="/sold" element={<SoldProperties />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<Auth />} />
            {/* Protected Admin Routes - require admin role */}
            <Route path="/admin/upload" element={<ProtectedRoute requireAdmin><AdminUpload /></ProtectedRoute>} />
            <Route path="/admin/import" element={<ProtectedRoute requireAdmin><AdminImport /></ProtectedRoute>} />
            <Route path="/admin/properties" element={<ProtectedRoute requireAdmin><AdminPropertyList /></ProtectedRoute>} />
            <Route path="/admin/create" element={<ProtectedRoute requireAdmin><AdminPropertyCreate /></ProtectedRoute>} />
            <Route path="/admin/edit/:id" element={<ProtectedRoute requireAdmin><AdminPropertyEdit /></ProtectedRoute>} />
            <Route path="/admin/reviews" element={<ProtectedRoute requireAdmin><AdminReviewsList /></ProtectedRoute>} />
            <Route path="/admin/videos" element={<ProtectedRoute requireAdmin><AdminVideosList /></ProtectedRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
