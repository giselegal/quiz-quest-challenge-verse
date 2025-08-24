import { Suspense, lazy } from 'react';
import { Route, Router, Switch } from 'wouter';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { ThemeProvider } from './components/theme-provider';
import { LoadingFallback } from './components/ui/loading-fallback';
import { Toaster } from './components/ui/toaster';
import { AuthProvider } from './context/AuthContext';

// 🎯 PÁGINAS ESSENCIAIS - SEM CONFLITOS
const Home = lazy(() => import('./pages/Home'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
// Import estático para evitar falhas de dynamic import em alguns ambientes (ex.: Lovable)
import MainEditor from './pages/MainEditor';
const DashboardPage = lazy(() => import('./pages/admin/DashboardPage'));
// ✅ Runner publicado (21 etapas, sem colunas)
const QuizFlowPage = lazy(() => import('./pages/QuizFlowPage'));

// Loading component
const PageLoading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
  </div>
);

/**
 * 🎯 APLICAÇÃO PRINCIPAL - LIMPA E OTIMIZADA
 *
 * Estrutura simplificada:
 * ✅ Editor Principal único (/editor)
 * ✅ Sistema de lazy loading
 * ✅ Rotas essenciais apenas
 * ✅ Sem conflitos entre editores
 * ✅ Drag & Drop sem aninhamento excessivo
 */
function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="quiz-quest-theme">
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Suspense fallback={<LoadingFallback />}>
              <Switch>
                {/* 🏠 PÁGINA INICIAL */}
                <Route path="/" component={Home} />

                {/* 🎯 EDITOR PRINCIPAL ÚNICO - SEM ANINHAMENTO */}
                <Route path="/editor">
                  {/* MainEditor importado estaticamente para maior estabilidade */}
                  <MainEditor />
                </Route>

                {/* 🔐 AUTENTICAÇÃO */}
                <Route path="/auth">
                  <Suspense fallback={<PageLoading />}>
                    <AuthPage />
                  </Suspense>
                </Route>

                {/* 🔀 Compat: Redirecionar /quiz-modular para a versão publicada (/quiz) para evitar duplicidade com /editor */}
                <Route path="/quiz-modular">
                  {() => {
                    if (typeof window !== 'undefined') window.location.replace('/quiz');
                    return null;
                  }}
                </Route>

                {/* 🌐 VERSÃO PUBLICADA SEM COLUNAS (Runner 21 etapas) */}
                <Route path="/quiz">
                  <Suspense fallback={<PageLoading />}>
                    <QuizFlowPage />
                  </Suspense>
                </Route>

                {/* 📊 DASHBOARD ADMINISTRATIVO */}
                <ProtectedRoute path="/admin" component={DashboardPage} requireAuth={true} />
                <ProtectedRoute path="/admin/:rest*" component={DashboardPage} requireAuth={true} />

                {/* 🔄 FALLBACK */}
                <Route>
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-2xl font-bold mb-4">Página não encontrada</h1>
                      <a href="/" className="text-blue-600 hover:underline">
                        Voltar ao Início
                      </a>
                    </div>
                  </div>
                </Route>
              </Switch>
            </Suspense>

            <Toaster />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
