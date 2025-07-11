import { useCallback, useRef, useEffect } from 'react';

/**
 * Hook for performance optimization utilities
 * Provides debounced functions, throttling, and optimized timers
 */
export const usePerformanceOptimization = () => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const intervalRef = useRef<NodeJS.Timeout>();
  const animationFrameRef = useRef<number>();

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  /**
   * Debounced function execution
   */
  const debounce = useCallback(<T extends (...args: any[]) => void>(
    func: T,
    delay: number
  ) => {
    return (...args: Parameters<T>) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => func(...args), delay);
    };
  }, []);

  /**
   * Throttled function execution
   */
  const throttle = useCallback(<T extends (...args: any[]) => void>(
    func: T,
    limit: number
  ) => {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }, []);

  /**
   * Optimized timer using requestAnimationFrame
   */
  const createOptimizedTimer = useCallback((
    callback: () => void,
    interval: number = 1000
  ) => {
    let lastUpdateTime = Date.now();
    
    const tick = () => {
      const now = Date.now();
      if (now - lastUpdateTime >= interval) {
        callback();
        lastUpdateTime = now;
      }
      animationFrameRef.current = requestAnimationFrame(tick);
    };
    
    animationFrameRef.current = requestAnimationFrame(tick);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  /**
   * Optimized polling with dynamic intervals
   */
  const createSmartPolling = useCallback((
    callback: () => void,
    baseInterval: number = 30000,
    options: {
      maxInterval?: number;
      backoffMultiplier?: number;
      resetOnActivity?: boolean;
    } = {}
  ) => {
    const {
      maxInterval = 300000, // 5 minutes max
      backoffMultiplier = 1.5,
      resetOnActivity = true
    } = options;

    let currentInterval = baseInterval;
    let consecutiveRuns = 0;

    const scheduleNext = () => {
      intervalRef.current = setTimeout(() => {
        callback();
        consecutiveRuns++;
        
        // Gradually increase interval to reduce load
        if (currentInterval < maxInterval) {
          currentInterval = Math.min(
            currentInterval * backoffMultiplier,
            maxInterval
          );
        }
        
        scheduleNext();
      }, currentInterval);
    };

    const reset = () => {
      currentInterval = baseInterval;
      consecutiveRuns = 0;
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
        scheduleNext();
      }
    };

    // Setup activity listeners if enabled
    if (resetOnActivity) {
      const activityEvents = ['click', 'scroll', 'keydown', 'mousemove'];
      const activityHandler = throttle(reset, 60000); // Reset at most once per minute
      
      activityEvents.forEach(event => {
        document.addEventListener(event, activityHandler, { passive: true });
      });
    }

    scheduleNext();

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
      if (resetOnActivity) {
        const activityEvents = ['click', 'scroll', 'keydown', 'mousemove'];
        const activityHandler = throttle(reset, 60000);
        activityEvents.forEach(event => {
          document.removeEventListener(event, activityHandler);
        });
      }
    };
  }, [throttle]);

  return {
    debounce,
    throttle,
    createOptimizedTimer,
    createSmartPolling
  };
};