// Telemetry and external service error suppression
export const suppressExternalErrors = () => {
  // Suppress console errors from external services
  const originalConsoleError = console.error;
  console.error = (...args: any[]) => {
    const errorMessage = args.join(' ');
    
    // Filter out known external service errors
    const suppressedPatterns = [
      'pushLogsToGrafana',
      'us-central1-gpt-engineer',
      'cloudfunctions.net',
      'gptengineer',
      'Failed to load resource',
      'Internal Server Error',
      'lovable.app'
    ];
    
    const shouldSuppress = suppressedPatterns.some(pattern => 
      errorMessage.includes(pattern)
    );
    
    if (!shouldSuppress) {
      originalConsoleError.apply(console, args);
    }
  };

  // Suppress network errors for specific URLs
  const originalFetch = window.fetch;
  window.fetch = async (...args) => {
    try {
      return await originalFetch(...args);
    } catch (error) {
      const url = args[0]?.toString() || '';
      
      // Suppress errors from known external services
      if (url.includes('pushLogsToGrafana') || 
          url.includes('cloudfunctions.net') ||
          url.includes('gptengineer')) {
        // Silently fail for external telemetry
        return new Response('{}', { status: 200 });
      }
      
      throw error;
    }
  };
};

// Initialize on module load
suppressExternalErrors();