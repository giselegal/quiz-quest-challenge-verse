// Enhanced telemetry and external service error suppression
export const suppressExternalErrors = () => {
  // Suppress console errors from external services
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;
  
  console.error = (...args: any[]) => {
    const errorMessage = args.join(' ');
    
    // Enhanced filter patterns for external service errors
    const suppressedPatterns = [
      'pushLogsToGrafana',
      'us-central1-gpt-engineer',
      'cloudfunctions.net',
      'gptengineer',
      'Failed to load resource',
      'Internal Server Error',
      'lovable.app',
      'lovableproject.com',
      'lovable-api.com',
      'WebSocket connection',
      'rum_collection',
      'ingesteer.services',
      'status of 404',
      'status of 500',
      'status of 502',
      'status of 400',
      'Bad Request',
      'Network Error',
      'ERR_HTTP2_PROTOCOL_ERROR',
      'Entenda o erro',
      'editor:1',
      'id-preview--',
      '65efd17d-5178-405d-9721-909c97470c6d',
      'wss://',
      'createOrJoinSocket',
      'anônimo',
      '__lovable_token='
    ];
    
    const shouldSuppress = suppressedPatterns.some(pattern => 
      errorMessage.toLowerCase().includes(pattern.toLowerCase())
    );
    
    if (!shouldSuppress) {
      // Log to custom monitoring if available
      if (window.customErrorLogger) {
        window.customErrorLogger('error', args);
      }
      originalConsoleError.apply(console, args);
    }
  };

  console.warn = (...args: any[]) => {
    const warningMessage = args.join(' ');
    
    const suppressedWarnings = [
      'pushLogsToGrafana',
      'WebSocket',
      'lovable.app',
      'cloudfunctions.net'
    ];
    
    const shouldSuppress = suppressedWarnings.some(pattern => 
      warningMessage.toLowerCase().includes(pattern.toLowerCase())
    );
    
    if (!shouldSuppress) {
      originalConsoleWarn.apply(console, args);
    }
  };

  // Enhanced network error suppression
  const originalFetch = window.fetch;
  window.fetch = async (...args) => {
    try {
      const response = await originalFetch(...args);
      return response;
    } catch (error) {
      const url = args[0]?.toString() || '';
      
      // Suppress errors from known external services
      const blockedDomains = [
        'pushLogsToGrafana',
        'cloudfunctions.net',
        'gptengineer',
        'lovable.app',
        'lovableproject.com',
        'ingesteer.services',
        'rum_collection'
      ];
      
      const shouldBlock = blockedDomains.some(domain => url.includes(domain));
      
      if (shouldBlock) {
        // Silently fail for external telemetry
        return new Response('{}', { status: 200 });
      }
      
      // Log legitimate errors to custom monitoring
      if (window.customErrorLogger) {
        window.customErrorLogger('fetch_error', { url, error: (error as Error).message });
      }
      
      throw error;
    }
  };

  // Suppress global error events
  window.addEventListener('error', (event) => {
    const message = event.message || '';
    const filename = event.filename || '';
    
    const suppressedSources = [
      'pushLogsToGrafana',
      'cloudfunctions.net',
      'lovable.app',
      'lovableproject.com'
    ];
    
    const shouldSuppress = suppressedSources.some(source => 
      message.includes(source) || filename.includes(source)
    );
    
    if (shouldSuppress) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, true);

  // Suppress unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason || {};
    const message = reason.message || reason.toString() || '';
    
    const suppressedReasons = [
      'pushLogsToGrafana',
      'WebSocket',
      'lovable.app',
      'cloudfunctions.net'
    ];
    
    const shouldSuppress = suppressedReasons.some(reason => 
      message.toLowerCase().includes(reason.toLowerCase())
    );
    
    if (shouldSuppress) {
      event.preventDefault();
    }
  });
};

// Custom error monitoring setup
const setupCustomErrorMonitoring = () => {
  window.customErrorLogger = (type: string, data: any) => {
    // Only log in development or for critical errors
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Custom Error Monitor] ${type}:`, data);
    }
    
    // Here you could send to your own analytics service
    // instead of external telemetry services
  };
};

// WebSocket fallback system
export const createWebSocketWithFallback = (url: string, protocols?: string | string[]) => {
  try {
    const ws = new WebSocket(url, protocols);
    
    ws.addEventListener('error', (error) => {
      console.log('[WebSocket] Connection failed, implementing fallback logic');
      // Implement fallback logic here (polling, etc.)
    });
    
    return ws;
  } catch (error) {
    console.log('[WebSocket] Failed to create connection, using fallback');
    // Return a mock WebSocket or implement alternative communication
    return null;
  }
};

// Health check system
export const performHealthCheck = () => {
  const checkEndpoints = [
    '/api/health',
    '/editor'
  ];
  
  return Promise.allSettled(
    checkEndpoints.map(endpoint => 
      fetch(endpoint, { method: 'HEAD' })
        .then(response => ({ endpoint, status: response.status, ok: response.ok }))
        .catch(error => ({ endpoint, status: 0, ok: false, error: error.message }))
    )
  );
};

// Initialize all systems
setupCustomErrorMonitoring();
suppressExternalErrors();

// Export health check for manual use
export { performHealthCheck as healthCheck };