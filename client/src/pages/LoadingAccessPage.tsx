
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const LoadingAccessPage: React.FC = () => {
  const { route } = useParams<{ route: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (route === 'resultado') {
        navigate('/resultado');
      } else {
        navigate('/');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [route, navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold mb-2">Carregando...</h1>
        <p className="text-muted-foreground">Redirecionando para {route || 'início'}...</p>
      </div>
    </div>
  );
};

export default LoadingAccessPage;
