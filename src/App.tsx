import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Writing from "./pages/Writing";
import WritingDetail from "./pages/WritingDetail";
import Work from "./pages/Work";
import Contact from "./pages/Contact";
import Stuck from "./pages/Stuck";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <SpeedInsights />
        <Analytics />
        <BrowserRouter>
          <ScrollToTop />
          <SimpleBar style={{ maxHeight: "100vh" }} autoHide={false} forceVisible="y">
            <div className="min-h-screen bg-background text-foreground">
              <Navbar />
              <main className="pt-20 pb-16">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/writing" element={<Writing />} />
                  <Route path="/writing/:slug" element={<WritingDetail />} />
                  <Route path="/work" element={<Work />} />
                  <Route path="/work/:slug" element={<ProjectDetail />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/stuck" element={<Stuck />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </SimpleBar>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
