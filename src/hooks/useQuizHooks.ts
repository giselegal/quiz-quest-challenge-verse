// Arquivo criado usando snippets ES7 React/Redux/React-Native/JS
// Usando snippet "rafce" + Tab para criar o arquivo

import { useState, useEffect, useCallback } from 'react';

// Usando snippet "uch" + Tab para criar custom hook
export const useLoadingState = (initialState = false) => {
  const [loading, setLoading] = useState(initialState);
  
  const startLoading = useCallback(() => {
    setLoading(true);
  }, []);
  
  const stopLoading = useCallback(() => {
    setLoading(false);
  }, []);
  
  const toggleLoading = useCallback(() => {
    setLoading(prev => !prev);
  }, []);
  
  return {
    loading,
    startLoading,
    stopLoading,
    toggleLoading,
  };
};

// Usando snippet "uch" + Tab para criar hook de timer
export const useTimer = (initialTime = 0) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  
  const start = useCallback(() => {
    setIsRunning(true);
  }, []);
  
  const stop = useCallback(() => {
    setIsRunning(false);
  }, []);
  
  const reset = useCallback(() => {
    setTime(initialTime);
    setIsRunning(false);
  }, [initialTime]);
  
  // Usando snippet "useEffect" + Tab
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);
  
  return {
    time,
    isRunning,
    start,
    stop,
    reset,
  };
};

// Usando snippet "uch" + Tab para criar hook de analytics
export const useAnalytics = () => {
  const [events, setEvents] = useState<Array<{
    event: string;
    timestamp: number;
    data?: any;
  }>>([]);
  
  const trackEvent = useCallback((eventName: string, data?: any) => {
    const event = {
      event: eventName,
      timestamp: Date.now(),
      data,
    };
    
    setEvents(prev => [...prev, event]);
    
    // Usando snippet "clg" + Tab para debug
    console.log('Event tracked:', event);
  }, []);
  
  const clearEvents = useCallback(() => {
    setEvents([]);
  }, []);
  
  return {
    events,
    trackEvent,
    clearEvents,
  };
};

// Usando snippet "uch" + Tab para criar hook de scroll
export const useScrollToTop = () => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  
  return scrollToTop;
};

// Usando snippet "uch" + Tab para criar hook de viewport
export const useViewport = () => {
  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });
  
  // Usando snippet "useEffect" + Tab
  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const isMobile = viewport.width < 768;
  const isTablet = viewport.width >= 768 && viewport.width < 1024;
  const isDesktop = viewport.width >= 1024;
  
  return {
    viewport,
    isMobile,
    isTablet,
    isDesktop,
  };
};
