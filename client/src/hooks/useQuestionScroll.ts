
import { useCallback } from 'react';

export function useQuestionScroll() {
  const scrollToQuestion = useCallback((questionId: string) => {
    const element = document.getElementById(`question-${questionId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return { scrollToQuestion };
}
