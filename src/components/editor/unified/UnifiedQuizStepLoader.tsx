/**
 * 🎯 UnifiedQuizStepLoader - Componente para carregar dados de etapas do quiz
 *
 * Este componente fornece uma integração robusta entre o Editor Unificado
 * e os dados de etapas do quiz21StepsComplete
 */

import { useEditor } from '@/context/EditorContext';
import { loadStepBlocks } from '@/utils/quiz21StepsRenderer';
import { useEffect, useRef, useState } from 'react';

interface UnifiedQuizStepLoaderProps {
  stepNumber: number;
  onStepLoaded?: (blockCount: number) => void;
  onStepError?: (error: Error) => void;
}

export const UnifiedQuizStepLoader: React.FC<UnifiedQuizStepLoaderProps> = ({
  stepNumber,
  onStepLoaded,
  onStepError,
}) => {
  const { blockActions, computed } = useEditor();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [lastLoadedStep, setLastLoadedStep] = useState<number | null>(null);
  
  // ✅ CORREÇÃO: Use ref para armazenar blockActions e evitar dependência instável
  const blockActionsRef = useRef(blockActions);
  blockActionsRef.current = blockActions;

  useEffect(() => {
    let isMounted = true;

    const loadStep = async () => {
      if (!stepNumber || stepNumber < 1 || stepNumber > 21) return;
      
      // ✅ CORREÇÃO CRÍTICA: Evitar re-carregamentos desnecessários
      if (lastLoadedStep === stepNumber && computed.currentBlocks.length > 0) {
        console.log(`⚡ UnifiedQuizStepLoader: Etapa ${stepNumber} já carregada, pulando...`);
        return;
      }

      if (isMounted) setIsLoading(true);

      try {
        console.log(`🔄 UnifiedQuizStepLoader: Carregando etapa ${stepNumber}...`);

        // Carrega os blocos da etapa diretamente do quiz21StepsRenderer
        const stepBlocks = loadStepBlocks(stepNumber);

        console.log(
          `✅ UnifiedQuizStepLoader: Carregados ${stepBlocks.length} blocos para etapa ${stepNumber}`
        );

        // Atualiza o EditorContext com os novos blocos usando a API unificada
        if (stepBlocks.length > 0 && isMounted) {
          blockActionsRef.current.replaceBlocks(stepBlocks);
          setLastLoadedStep(stepNumber);
          onStepLoaded?.(stepBlocks.length);
        } else if (isMounted) {
          const error = new Error(`Nenhum bloco encontrado para etapa ${stepNumber}`);
          setError(error);
          onStepError?.(error);
        }
      } catch (err) {
        console.error(`❌ UnifiedQuizStepLoader: Erro ao carregar etapa ${stepNumber}:`, err);
        const error = err instanceof Error ? err : new Error(String(err));

        if (isMounted) {
          setError(error);
          onStepError?.(error);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadStep();

    return () => {
      isMounted = false;
    };
  }, [stepNumber, onStepLoaded, onStepError]); // ✅ CORREÇÃO: Removidas dependências problemáticas

  // Exibir informação de status
  return (
    <>
      {isLoading && (
        <div className="fixed bottom-4 right-4 bg-blue-500 text-white px-3 py-2 rounded shadow-lg z-50 text-sm animate-pulse">
          Carregando etapa {stepNumber}...
        </div>
      )}

      {error && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-3 py-2 rounded shadow-lg z-50 text-sm">
          Erro: {error.message}
        </div>
      )}
    </>
  );
};

export default UnifiedQuizStepLoader;
