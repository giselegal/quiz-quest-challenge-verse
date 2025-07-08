import { useCallback, useRef, useEffect, useState } from 'react';

/**
 * Hook para debounce de auto-save com controle inteligente
 * Evita saves excessivos e melhora performance
 */
export const useAutoSaveDebounce = (
  saveFunction: () => Promise<void>,
  delay: number = 1000,
  maxInterval: number = 10000
) => {
  const [isActive, setIsActive] = useState(true);
  const [lastSave, setLastSave] = useState<Date | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const debounceRef = useRef<NodeJS.Timeout>();
  const maxDelayRef = useRef<NodeJS.Timeout>();
  const lastSaveRef = useRef<number>(0);
  const isActiveRef = useRef<boolean>(true);

  // Limpar timers ao desmontar
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (maxDelayRef.current) clearTimeout(maxDelayRef.current);
    };
  }, []);

  // Save com debounce inteligente
  const debouncedSave = useCallback(() => {
    if (!isActiveRef.current) return;

    // Limpar timeout anterior
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Configurar novo timeout de debounce
    debounceRef.current = setTimeout(async () => {
      const now = Date.now();

      // Evitar saves muito frequentes (mínimo 5 segundos entre saves)
      if (now - lastSaveRef.current < 5000) {
        console.log('[AutoSave] Save ignorado - muito recente');
        return;
      }

      try {
        console.log('[AutoSave] Executando save...');
        await saveFunction();
        lastSaveRef.current = now;
        console.log('[AutoSave] Save concluído com sucesso');
      } catch (error) {
        console.error('[AutoSave] Erro no save:', error);
      }
    }, delay);

    // Garantir save máximo a cada maxDelay
    if (maxDelayRef.current) {
      clearTimeout(maxDelayRef.current);
    }

    maxDelayRef.current = setTimeout(async () => {
      const now = Date.now();

      // Só fazer save forçado se passou tempo suficiente
      if (now - lastSaveRef.current >= maxInterval - 1000) {
        try {
          console.log('[AutoSave] Save forçado por tempo máximo');
          await saveFunction();
          lastSaveRef.current = now;
        } catch (error) {
          console.error('[AutoSave] Erro no save forçado:', error);
        }
      }
    }, maxInterval);
  }, [saveFunction, delay, maxInterval]);

  // Save imediato (para ações importantes)
  const saveNow = useCallback(async () => {
    if (!isActiveRef.current) return;

    // Limpar timeouts pendentes
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (maxDelayRef.current) clearTimeout(maxDelayRef.current);

    try {
      console.log('[AutoSave] Save imediato executado');
      await saveFunction();
      lastSaveRef.current = Date.now();
    } catch (error) {
      console.error('[AutoSave] Erro no save imediato:', error);
    }
  }, [saveFunction]);

  // Pausar/resumir auto-save
  const pauseAutoSave = useCallback(() => {
    isActiveRef.current = false;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (maxDelayRef.current) clearTimeout(maxDelayRef.current);
    console.log('[AutoSave] Auto-save pausado');
  }, []);

  const resumeAutoSave = useCallback(() => {
    isActiveRef.current = true;
    console.log('[AutoSave] Auto-save resumido');
  }, []);

  return {
    debouncedSave,
    saveNow,
    pauseAutoSave,
    resumeAutoSave,
    isActive: isActiveRef.current
  };
};

export default useAutoSaveDebounce;