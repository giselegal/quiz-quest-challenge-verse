
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const LoadingAccessPage: React.FC = () => {
  const { route } = useParams<{ route: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading and redirect
    const timer = setTimeout(() => {
      navigate(`/${route || ''}`);
    }, 2000);

    return () => clearTimeout(timer);
  }, [route, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF9F7]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#B89B7A] mx-auto mb-4"></div>
        <p className="text-[#432818] text-lg">Carregando...</p>
      </div>
    </div>
  );
};

export default LoadingAccessPage;
