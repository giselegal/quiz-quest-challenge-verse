import React, { Suspense, lazy, useEffect, useState } from "react";
import { Router, Route, Switch } from "wouter";
import { QuizProvider } from "./context/QuizContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { fixLocalStorageIssues, checkLocalStorageIntegrity } from "./utils/fixLocalStorageIssues";

// Loading component for Suspense
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-white">
    <div className="text-center">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-gray-600">Carregando...</p>
    </div>
  </div>
);

// Error Boundary Component
const ErrorFallback = ({ error, resetError }: { error: Error; resetError: () => void }) => (
  <div className="flex items-center justify-center min-h-screen bg-white p-4">
    <div className="text-center max-w-md">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Ops! Algo deu errado</h2>
      <p className="text-gray-600 mb-4">
        Ocorreu um erro inesperado. Isso pode ser devido a dados corrompidos no navegador.
      </p>
      <div className="space-y-2">
        <button
          onClick={resetError}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Tentar Novamente
        </button>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
          className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Limpar Dados e Recarregar
        </button>
      </div>
      <details className="mt-4 text-left">
        <summary className="cursor-pointer text-sm text-gray-500">Detalhes do erro</summary>
        <pre className="text-xs text-red-500 mt-2 overflow-auto">{error.message}</pre>
      </details>
    </div>
  </div>
);

// Error Boundary Hook
const useErrorBoundary = () => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const resetError = () => {
    setHasError(false);
    setError(null);
  };

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Erro capturado:', event.error);
      setError(event.error);
      setHasError(true);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Promise rejeitada:', event.reason);
      setError(new Error(event.reason));
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return { hasError, error, resetError };
};

// Lazy loaded pages
const LandingPage = lazy(() => import("./pages/LandingPage"));
const QuizPage = lazy(() => import("./components/QuizPage"));
const TestResultPage = lazy(() => import("./pages/TestResultPage"));
const SchemaDrivenEditorPage = lazy(() => import("./pages/SchemaDrivenEditorPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const { hasError, error, resetError } = useErrorBoundary();

  // Inicializar aplicação
  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log('🚀 Inicializando aplicação...');
        
        // Verificar integridade do localStorage
        const isStorageWorking = checkLocalStorageIntegrity();
        if (!isStorageWorking) {
          console.warn('⚠️ Problemas detectados no localStorage');
        }
        
        // Corrigir problemas conhecidos
        fixLocalStorageIssues();
        
        console.log('✅ Aplicação inicializada com sucesso');
      } catch (error) {
        console.error('❌ Erro na inicialização:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    initializeApp();
  }, []);

  // Mostrar erro se houver
  if (hasError && error) {
    return <ErrorFallback error={error} resetError={resetError} />;
  }

  // Mostrar loading durante inicialização
  if (!isInitialized) {
    return <LoadingFallback />;
  }

  return (
    <QuizProvider>
      <TooltipProvider>
        <Router>
          <Suspense fallback={<LoadingFallback />}>
            <Switch>
              {/* Main routes */}
              <Route path="/" component={LandingPage} />
              <Route path="/quiz" component={QuizPage} />
              <Route path="/resultado" component={TestResultPage} />
              <Route path="/test-resultado" component={TestResultPage} />
              <Route path="/editor" component={SchemaDrivenEditorPage} />
              <Route path="/editor/:id" component={SchemaDrivenEditorPage} />
              
              {/* 404 - Fallback for not found routes */}
              <Route path="*" component={NotFoundPage} />
            </Switch>
          </Suspense>
        </Router>
        <Toaster />
      </TooltipProvider>
    </QuizProvider>
  );
};

export default App;
