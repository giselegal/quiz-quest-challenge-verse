
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { QuizProvider } from "@/context/QuizContext";
import ErrorBoundary from "@/components/error-boundary/ErrorBoundary";
import RouteErrorBoundary from "@/components/RouteErrorBoundary";
// import "@/utils/telemetry-blocker"; // Temporarily disabled for debugging

// Lazy load pages for better performance
import { lazy, Suspense } from "react";

const Index = lazy(() => import("./pages/Index"));
const QuizPage = lazy(() => import("./components/QuizPage"));
const ResultPage = lazy(() => import("./pages/ResultPage"));
const LoadingAccessPage = lazy(() => import("./pages/LoadingAccessPage"));

// Editor Pages - lazy loaded
const EditorPage = lazy(() => import("./pages/EditorPage"));

// Admin Pages - lazy loaded
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const QuizManagement = lazy(() => import("./pages/admin/QuizManagement"));
const AdminEditorPage = lazy(() => import("./pages/admin/EditorPage"));

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

// Enhanced loading component with retry
const PageLoader = ({ error, retry }: { error?: Error; retry?: () => void }) => (
  <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
    {error ? (
      <>
        <div className="text-red-500 text-center">
          <p>Erro ao carregar página: {error.message}</p>
        </div>
        {retry && (
          <Button onClick={retry} variant="outline">
            Tentar Novamente
          </Button>
        )}
      </>
    ) : (
      <>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B89B7A]"></div>
        <p className="text-muted-foreground">Carregando...</p>
      </>
    )}
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
                    <Route path="/" element={
                      <RouteErrorBoundary routeName="Home">
                        <Index />
                      </RouteErrorBoundary>
                    } />
                    <Route path="/quiz-descubra-seu-estilo" element={
                      <RouteErrorBoundary routeName="Quiz">
                        <QuizPage />
                      </RouteErrorBoundary>
                    } />
                    <Route path="/descubra-seu-estilo" element={
                      <RouteErrorBoundary routeName="Quiz">
                        <QuizPage />
                      </RouteErrorBoundary>
                    } />
                    <Route path="/quiz" element={
                      <RouteErrorBoundary routeName="Quiz">
                        <QuizPage />
                      </RouteErrorBoundary>
                    } />
                    <Route path="/resultado" element={
                      <RouteErrorBoundary routeName="Result">
                        <ResultPage />
                      </RouteErrorBoundary>
                    } />
                    <Route path="/resultado/:id" element={
                      <RouteErrorBoundary routeName="Result">
                        <ResultPage />
                      </RouteErrorBoundary>
                    } />
                    <Route path="/loading-access" element={
                      <RouteErrorBoundary routeName="Loading">
                        <LoadingAccessPage />
                      </RouteErrorBoundary>
                    } />
                    
                    {/* Editor Routes */}
                    <Route path="/editor" element={
                      <RouteErrorBoundary routeName="Editor">
                        <EditorPage />
                      </RouteErrorBoundary>
                    } />
                    <Route path="/editor/:style" element={
                      <RouteErrorBoundary routeName="Editor">
                        <EditorPage />
                      </RouteErrorBoundary>
                    } />
                    
                    {/* Admin Routes */}
                    <Route path="/admin" element={
                      <RouteErrorBoundary routeName="Admin">
                        <AdminDashboard />
                      </RouteErrorBoundary>
                    } />
                    <Route path="/admin/quiz" element={
                      <RouteErrorBoundary routeName="Quiz Management">
                        <QuizManagement />
                      </RouteErrorBoundary>
                    } />
                    <Route path="/admin/editor" element={
                      <RouteErrorBoundary routeName="Admin Editor">
                        <AdminEditorPage />
                      </RouteErrorBoundary>
                    } />
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
