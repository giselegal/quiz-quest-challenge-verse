
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { QuizProvider } from "@/context/QuizContext";
import ErrorBoundary from "@/components/error-boundary/ErrorBoundary";
import "@/utils/telemetry-blocker";

// Lazy load pages for better performance
import { lazy, Suspense } from "react";

const Index = lazy(() => import("./pages/Index"));
const QuizPage = lazy(() => import("./components/QuizPage"));
const ResultPage = lazy(() => import("./pages/ResultPage"));
const LoadingAccessPage = lazy(() => import("./pages/LoadingAccessPage"));

// Admin Pages - lazy loaded
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const QuizManagement = lazy(() => import("./pages/admin/QuizManagement"));

// Create optimized query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error: any) => {
        // Don't retry for external service errors
        if (error?.message?.includes('pushLogsToGrafana') || 
            error?.message?.includes('cloudfunctions.net')) {
          return false;
        }
        return failureCount < 2; // Reduced retries
      },
      refetchOnWindowFocus: false, // Disable automatic refetch on focus
    },
  },
});

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B89B7A]"></div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <QuizProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Index />} />
                    <Route path="/quiz-descubra-seu-estilo" element={<QuizPage />} />
                    <Route path="/descubra-seu-estilo" element={<QuizPage />} />
                    <Route path="/quiz" element={<QuizPage />} />
                    <Route path="/resultado" element={<ResultPage />} />
                    <Route path="/resultado/:id" element={<ResultPage />} />
                    <Route path="/loading-access" element={<LoadingAccessPage />} />
                    
                    {/* Admin Routes */}
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/quiz" element={<QuizManagement />} />
                  </Routes>
                </Suspense>
              </BrowserRouter>
            </TooltipProvider>
          </QuizProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
