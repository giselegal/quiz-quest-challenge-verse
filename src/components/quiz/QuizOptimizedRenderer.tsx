import React from 'react';
import { QuizRenderer } from '@/components/core/QuizRenderer';

interface QuizOptimizedRendererProps {
  funnelId?: string;
  showBackendPanel?: boolean;
  showAnalytics?: boolean;
  className?: string;
}

/**
 * QuizOptimizedRenderer - Renderiza o quiz completo usando QuizRenderer
 */
export const QuizOptimizedRenderer: React.FC<QuizOptimizedRendererProps> = ({
  className = '',
}) => {
  return (
    <div className={className}>
      <QuizRenderer 
        mode="production"
        initialStep={1}
        className="w-full"
      />
    </div>
  );
};

export default QuizOptimizedRenderer;
