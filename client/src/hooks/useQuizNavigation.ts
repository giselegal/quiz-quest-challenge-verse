
import { useCallback } from 'react';
import { useRouter } from 'wouter';

export const useQuizNavigation = () => {
  const router = useRouter();
  const navigate = router.navigate;

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
