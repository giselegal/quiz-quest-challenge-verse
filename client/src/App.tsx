import React, { Suspense, lazy, useEffect } from "react";
import { Router, Route, Switch } from "wouter";
import { AuthProvider } from "./context/AuthContext";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import { QuizProvider } from "./context/QuizContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { captureUTMParameters } from "./utils/analytics";
import { loadFacebookPixelDynamic } from "./utils/facebookPixelDynamic";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import CriticalCSSLoader from "./components/CriticalCSSLoader";
import { initialCriticalCSS, heroCriticalCSS } from "./utils/critical-css";
import { AdminRoute } from "./components/admin/AdminRoute";

// Componente de loading para Suspense
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="text-center">
      <LoadingSpinner size="lg" color="#B89B7A" className="mx-auto" />
      <p className="mt-4 text-gray-600">Carregando...</p>
    </div>
  </div>
);

// Lazy loading das páginas essenciais
const LandingPage = lazy(() => import("./pages/LandingPage"));
const QuizPage = lazy(() => import("./components/QuizPage"));
const ResultPage = lazy(() => import("./pages/ResultPage"));
const TestResultPage = lazy(() => import("./pages/TestResultPage"));
const QuizDescubraSeuEstilo = lazy(
  () => import("./pages/quiz-descubra-seu-estilo")
);
const DashboardPage = lazy(() => import("./pages/admin/DashboardPage"));

// Editor Principal - Consolidado
const SchemaDrivenEditorPage = lazy(() => import("./pages/SchemaDrivenEditorPage"));
const BlockDefinitionsTest = lazy(() => import("./components/editor/tests/BlockDefinitionsTest"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const App = () => {
  // Inicializar analytics na montagem do componente
  useEffect(() => {
    try {
      loadFacebookPixelDynamic();
      captureUTMParameters();

      console.log("App initialized with essential routes only");
    } catch (error) {
      console.error("Erro ao inicializar aplicativo:", error);
    }
  }, []);

  return (
    <AuthProvider>
      <QuizProvider>
        <TooltipProvider>
          <Router>
            <CriticalCSSLoader
              cssContent={initialCriticalCSS}
              id="initial-critical"
              removeOnLoad={true}
            />
            <CriticalCSSLoader
              cssContent={heroCriticalCSS}
              id="hero-critical"
              removeOnLoad={true}
            />

            <Suspense fallback={<LoadingFallback />}>
              <Switch>
                {/* Página inicial com teste A/B */}
                <Route path="/" component={LandingPage} />
                {/* Rota do quiz específica */}
                <Route path="/quiz" component={QuizPage} />
                {/* Rotas do teste A/B */}
                <Route path="/resultado" component={ResultPage} />
                {/* Teste do componente de resultado */}
                <Route path="/test-resultado" component={TestResultPage} />
                <Route
                  path="/quiz-descubra-seu-estilo"
                  component={QuizDescubraSeuEstilo}
                />
                {/* Manter rota antiga para compatibilidade */}
                <Route
                  path="/descubra-seu-estilo"
                  component={QuizDescubraSeuEstilo}
                />
                {/* Editor Principal - ÚNICO EDITOR para Quiz e Funis Completos */}
                <Route
                  path="/editor"
                  component={SchemaDrivenEditorPage}
                />
                {/* Editor com ID específico */}
                <Route
                  path="/editor/:id"
                  component={SchemaDrivenEditorPage}
                />
                
                {/* Teste de definições de blocos */}
                <Route
                  path="/test-blocks"
                  component={BlockDefinitionsTest}
                />
                {/* Admin - protegido com AdminAuthProvider */}
                <Route path="/admin/:rest*">
                  {() => (
                    <AdminAuthProvider>
                      <AdminRoute>
                        <DashboardPage />
                      </AdminRoute>
                    </AdminAuthProvider>
                  )}
                </Route>
                {/* 404 - Fallback para rotas não encontradas */}
                <Route path="*" component={NotFoundPage} />
              </Switch>
            </Suspense>
          </Router>
          <Toaster />
        </TooltipProvider>
      </QuizProvider>
    </AuthProvider>
  );
};

export default App;
