
import { useCallback } from 'react';
import { useLocation } from 'wouter';

export const useQuizNavigation = () => {
  const [, navigate] = useLocation();

  const navigateToResult = useCallback(() => {
    navigate('/resultado');
  }, [navigate]);

  const navigateToHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return {
    navigateToResult,
    navigateToHome,
    navigate
  };
};
