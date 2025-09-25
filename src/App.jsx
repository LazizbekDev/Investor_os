import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import MorningBrief from "@/pages/MorningBrief";
import Pipeline from "@/pages/Pipeline";
import NotFound from "@/pages/NotFound";
import Settings from "@/pages/Settings";
import Login from "@/pages/Login";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="login" element={<Login />} />

            <Route path="/" element={<ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>}>
              <Route index element={<MorningBrief />} />
              <Route path="pipeline" element={<Pipeline />} />
              <Route path="diligence" element={<div className="p-8 text-center text-muted-foreground">Diligence page coming soon...</div>} />
              <Route path="portfolio" element={<div className="p-8 text-center text-muted-foreground">Portfolio page coming soon...</div>} />
              <Route path="network" element={<div className="p-8 text-center text-muted-foreground">Network page coming soon...</div>} />
              <Route path="inbox" element={<div className="p-8 text-center text-muted-foreground">Inbox & Library page coming soon...</div>} />
              <Route path="analytics" element={<div className="p-8 text-center text-muted-foreground">Analytics page coming soon...</div>} />
              <Route path="settings" element={<Settings />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;