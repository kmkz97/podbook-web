import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import NewProject from "./pages/NewProject";
import Processing from "./pages/Processing";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Start from "./pages/Start";
import ProjectDetail from "./pages/ProjectDetail";
import Settings from "./pages/Settings";
import ApiTest from "./components/ApiTest";
import Onboarding from "./pages/Onboarding";
import OnboardingGuard from "./components/OnboardingGuard";
import { ApolloProvider } from '@apollo/client';
import client from './lib/apolloClient';


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ApolloProvider client={client}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/start" element={<Start />} />
              <Route path="/dashboard" element={
                <OnboardingGuard>
                  <Dashboard />
                </OnboardingGuard>
              } />
              <Route path="/projects" element={
                <OnboardingGuard>
                  <Projects />
                </OnboardingGuard>
              } />
              <Route path="/projects/:id" element={
                <OnboardingGuard>
                  <ProjectDetail />
                </OnboardingGuard>
              } />
              <Route path="/new-project" element={
                <OnboardingGuard>
                  <NewProject />
                </OnboardingGuard>
              } />
              <Route path="/processing/:id" element={
                <OnboardingGuard>
                  <Processing />
                </OnboardingGuard>
              } />
              <Route path="/settings" element={
                <OnboardingGuard>
                  <Settings />
                </OnboardingGuard>
              } />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/api-test" element={<ApiTest />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
    </ApolloProvider>
  </QueryClientProvider>
);

export default App;
