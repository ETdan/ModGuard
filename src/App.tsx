
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "@/context/UserContext";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";

// Public Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";

// Protected Pages
import Dashboard from "./pages/Dashboard";
import ApiManagement from "./pages/ApiManagement";
import Analysis from "./pages/Analysis";
import Documentation from "./pages/Documentation";
import UserSettings from "./pages/UserSettings";
import ModerationRequests from "./pages/ModerationRequests";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/pricing" element={<Pricing />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <AuthenticatedLayout>
                <Dashboard />
              </AuthenticatedLayout>
            } />
            <Route path="/api-management" element={
              <AuthenticatedLayout>
                <ApiManagement />
              </AuthenticatedLayout>
            } />
            <Route path="/analysis" element={
              <AuthenticatedLayout>
                <Analysis />
              </AuthenticatedLayout>
            } />
            <Route path="/documentation" element={
              <AuthenticatedLayout>
                <Documentation />
              </AuthenticatedLayout>
            } />
            <Route path="/settings" element={
              <AuthenticatedLayout>
                <UserSettings />
              </AuthenticatedLayout>
            } />
            <Route path="/moderation-requests" element={
              <AuthenticatedLayout>
                <ModerationRequests />
              </AuthenticatedLayout>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
