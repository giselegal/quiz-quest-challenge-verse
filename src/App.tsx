import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from './components/ui/tooltip';
import { Toaster } from './components/ui/toaster';
import { Toaster as Sonner } from './components/ui/sonner';
import { ThemeProvider } from 'next-themes';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { QuizProvider } from './context/QuizContext';

// Lovable Client Provider
import { LovableClientProvider } from './components/LovableClientProvider';

// Pages
import Index from './pages/Index';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import SettingsPage from './pages/admin/SettingsPage';
import QuizManagement from './pages/admin/QuizManagement';
import SyncManagementPage from './pages/admin/SyncManagementPage';
import ABTestsPage from './pages/admin/ABTestsPage';

// Test Components
import SupabaseConnectionTest from './components/SupabaseConnectionTest';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <QuizProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <TooltipProvider>
              <LovableClientProvider>
                <BrowserRouter>
                  <div className="min-h-screen bg-background">
                    <Routes>
                      {/* Public Routes */}
                      <Route path="/" element={<Index />} />
                      <Route path="/quiz" element={<QuizPage />} />
                      <Route path="/resultado/:resultId" element={<ResultPage />} />
                      <Route path="/resultado" element={<ResultPage />} />
                      
                      {/* Admin Routes */}
                      <Route path="/admin" element={<AdminDashboard />} />
                      <Route path="/admin/settings" element={<SettingsPage />} />
                      <Route path="/admin/quiz" element={<QuizManagement />} />
                      <Route path="/admin/sync" element={<SyncManagementPage />} />
                      <Route path="/admin/ab-tests" element={<ABTestsPage />} />
                      
                      {/* Test Routes */}
                      <Route path="/test-supabase" element={<SupabaseConnectionTest />} />
                    </Routes>
                  </div>
                </BrowserRouter>
                <Toaster />
                <Sonner />
              </LovableClientProvider>
            </TooltipProvider>
          </ThemeProvider>
        </QuizProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;