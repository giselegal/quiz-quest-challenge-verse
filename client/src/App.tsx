
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SupabaseConnectionTest from "@/components/SupabaseConnectionTest";
import { AuthProvider } from "@/context/AuthContext";
import { QuizProvider } from "@/context/QuizContext";
import LovableClientProvider from "@/components/LovableClientProvider";
import ErrorBoundary from "@/components/error-boundary/ErrorBoundary";
import ErrorMonitor from "@/components/error-monitoring/ErrorMonitor";
import "@/utils/telemetry-blocker";

// Pages
import Index from "./pages/Index";
import QuizPage from "./components/QuizPage";
import ResultPage from "./pages/ResultPage";
import LoadingAccessPage from "./pages/LoadingAccessPage";
import SimpleTestPage from "./components/SimpleTestPage";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import QuizManagement from "./pages/admin/QuizManagement";
import ABTestsPage from "./pages/admin/ABTestsPage";
import CriativosPage from "./pages/admin/CriativosPage";
import AnalyticsPage from "./pages/admin/AnalyticsPage";
import SettingsPage from "./pages/admin/SettingsPage";
import SyncManagementPage from "./pages/admin/SyncManagementPage";

// Editor Pages
import SimpleCanvasEditorPage from "./pages/SimpleCanvasEditorPage";

const queryClient = new QueryClient();

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <LovableClientProvider>
          <AuthProvider>
            <QuizProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <ErrorMonitor showInDevelopment={true} />
                <BrowserRouter>
                  <Routes>
                    {/* Test Route - REMOVE THIS AFTER TESTING */}
                    <Route path="/test" element={<SimpleTestPage />} />
                    
                    {/* Public Routes */}
                    <Route path="/" element={<Index />} />
                    <Route path="/quiz-descubra-seu-estilo" element={<QuizPage />} />
                    <Route path="/descubra-seu-estilo" element={<QuizPage />} />
                    <Route path="/quiz" element={<QuizPage />} />
                    <Route path="/resultado" element={<ResultPage />} />
                    <Route path="/resultado/:id" element={<ResultPage />} />
                    <Route path="/loading-access" element={<LoadingAccessPage />} />
                    
                    {/* Editor Routes */}
                    <Route path="/simple-editor" element={<SimpleCanvasEditorPage />} />
                    
                    {/* Admin Routes */}
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/quiz" element={<QuizManagement />} />
                    <Route path="/admin/ab-tests" element={<ABTestsPage />} />
                    <Route path="/admin/criativos" element={<CriativosPage />} />
                    <Route path="/admin/analytics" element={<AnalyticsPage />} />
                    <Route path="/admin/sync" element={<SyncManagementPage />} />
                    <Route path="/admin/settings" element={<SettingsPage />} />
                    
                    {/* Development/Testing Routes */}
                    <Route path="/test-supabase" element={<SupabaseConnectionTest />} />
                  </Routes>
                </BrowserRouter>
              </TooltipProvider>
            </QuizProvider>
          </AuthProvider>
        </LovableClientProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
