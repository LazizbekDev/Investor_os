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
import ProtectedRoute from "@/components/ProtectedRoute";
import Profile from "@/pages/Profile";
import Notifications from "@/pages/Notifications";
import Diligence from "@/pages/Diligence";
import Portfolio from "./pages/Portfolio";
import Network from "./pages/Network";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />

          <Route path="/" element={<ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>}>
            <Route index element={<MorningBrief />} />
            <Route path="pipeline" element={<Pipeline />} />
            <Route path="diligence" element={<Diligence/>} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="network" element={<Network />} />
            <Route path="inbox" element={<div className="p-8 text-center text-muted-foreground">Inbox & Library page coming soon...</div>} />
            <Route path="analytics" element={<div className="p-8 text-center text-muted-foreground">Analytics page coming soon...</div>} />
            <Route path="profile" element={<Profile />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;