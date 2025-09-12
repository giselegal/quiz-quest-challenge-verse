import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import { LANDING_PAGE_AB_TEST, getABTestRedirectUrl } from '../utils/abtest';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

/**
 * Página de entrada que redireciona baseado no teste A/B
 */
const LandingPage: React.FC = () => {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Redireciona para uma das variantes do teste A/B
    const redirectUrl = getABTestRedirectUrl(LANDING_PAGE_AB_TEST);

    console.log(`🔄 Landing Page: Redirecionando para ${redirectUrl}`);

    // Pequeno delay para mostrar o loading
    setTimeout(() => {
      setLocation(redirectUrl);
    }, 500);
  }, [setLocation]);

  return (
    <div style={{ backgroundColor: '#FAF9F7' }}>
      <div className="text-center">
        <LoadingSpinner size="lg" color="#00BFFF" className="mx-auto" />
        <p className="text-brand-darkBlue">Carregando sua experiência personalizada...</p>
        <p className="text-brand-darkBlue/70">
          Ou acesse diretamente:{' '}
          <a href="/quiz" className="text-brand-lightBlue hover:underline">
            Quiz Original
          </a>
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
