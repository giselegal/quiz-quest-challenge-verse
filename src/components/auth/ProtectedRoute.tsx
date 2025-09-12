import React, { Suspense } from 'react';
import { useAuth } from '@/context/AuthContext';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useLocation } from 'wouter';
import { Route } from 'wouter';

interface ProtectedRouteProps {
  path: string;
  component: React.ComponentType<any>;
  requireAuth?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  path,
  component: Component,
  requireAuth = true
}) => {
  console.log('🔒 ProtectedRoute: INICIANDO para path:', path);

  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();

  // Allow access during development (multiple checks for robustness)
  const isDevelopment =
    import.meta.env.DEV ||
    import.meta.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'development' ||
    window.location.hostname === 'localhost';

  // Enhanced debug log
  console.log('🔒 ProtectedRoute Debug DETALHADO:', {
    path,
    user: !!user,
    userDetails: user ? 'Logado' : 'Não logado',
    isDevelopment,
    requireAuth,
    loading,
    hostname: window.location.hostname,
    env: import.meta.env.MODE,
    devCheck: import.meta.env.DEV,
    nodeEnv: process.env.NODE_ENV,
    componentName: Component.name || 'Unknown',
  });

  return (
    <Route path={path}>
      {() => {
        // Show loading while checking authentication
        if (requireAuth && loading) {
          return (
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <LoadingSpinner size="lg" color="#00BFFF" className="mx-auto" />
                <p className="mt-4 text-brand-darkBlue">
                  Verificando autenticação...
                </p>
              </div>
            </div>
          );
        }

        // If authentication is required and user is not logged in (and not in dev)
        if (requireAuth && !user && !isDevelopment) {
          console.log('❌ ProtectedRoute: ACESSO NEGADO para', path, '- Redirecionando para /auth');
          setLocation('/auth');
          return (
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <p className="text-brand-darkBlue">Redirecionando para login...</p>
              </div>
            </div>
          );
        }

        console.log('✅ ProtectedRoute: ACESSO PERMITIDO para', path, '- Carregando componente');
        return (
          <Suspense fallback={<LoadingSpinner size="lg" color="#00BFFF" />}> 
            <Component />
          </Suspense>
        );
      }}
    </Route>
  );
};
