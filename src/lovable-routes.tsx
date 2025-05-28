import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Lazy loading dos componentes principais para o Lovable
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const EditorPage = lazy(() => import('./pages/admin/EditorPage'));
const SettingsPage = lazy(() => import('./pages/admin/SettingsPage'));
const AnalyticsPage = lazy(() => import('./pages/admin/AnalyticsPage'));
const ABTestPage = lazy(() => import('./pages/admin/ABTestPage'));
const ABTestManagerPage = lazy(() => import('./pages/ABTestManagerPage'));
const ResultPagePrototype = lazy(() => import('./pages/ResultPagePrototype'));
const EnhancedResultPageEditorPage = lazy(() => import('./pages/EnhancedResultPageEditorPage'));
const ResultPage = lazy(() => import('./components/pages/ResultPage'));
const QuizPage = lazy(() => import('./components/QuizPage'));

// Componente de loading para Suspense
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="text-center">
      <div className="h-12 w-12 border-4 border-t-[#B89B7A] rounded-full animate-spin mx-auto"></div>
      <p className="mt-4 text-gray-600">Carregando...</p>
    </div>
  </div>
);

/**
 * Rotas específicas para o ambiente Lovable.dev
 * Este componente é injetado quando o aplicativo é executado dentro do ambiente Lovable
 */
export const LovableRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/editor" element={<EditorPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="/admin/analytics" element={<AnalyticsPage />} />
        <Route path="/admin/ab-test" element={<ABTestPage />} />
        <Route path="/admin/ab-test-manager" element={<ABTestManagerPage />} />
        <Route path="/admin/prototipo" element={<ResultPagePrototype />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/resultado/editor" element={<EnhancedResultPageEditorPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/prototipo" element={<ResultPagePrototype />} />
      </Routes>
    </Suspense>
  );
};

export default LovableRoutes;
