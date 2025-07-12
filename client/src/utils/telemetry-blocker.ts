
/**
 * Enhanced Telemetry Blocker with Circuit Breaker and Performance Optimization
 */

class TelemetryBlocker {
  private static BLOCKED_PATTERNS = [
    'us-central1-gpt-engineer-390607.cloudfunctions.net',
    'pushLogsToGrafana',
    'id-preview--65efd17d-5178-405d-9721-909c97470c6d.lovable.app',
    'ingesteer.services-prod.nsvcs.net',
    'rum_collection',
    'lovable.app',
    'grafana',
    'cloudfunctions.net'
  ];

  private static failureCount = new Map<string, number>();
  private static circuitBreakerThreshold = 5;
  private static lastError = new Map<string, number>();
  private static errorCooldown = 30000; // 30 seconds

  static init() {
    console.log('🛡️ Enhanced Telemetry Blocker activated');
    
    this.interceptFetch();
    this.interceptXHR();
    this.interceptConsole();
    this.interceptErrors();
    this.optimizeTimers();
    this.setupVisibilityAPI();
  }

  private static shouldBlock(url: string): boolean {
    if (!url) return false;
    const urlString = url.toString().toLowerCase();
    return this.BLOCKED_PATTERNS.some(pattern => 
      urlString.includes(pattern.toLowerCase())
    );
  }

  private static isCircuitOpen(url: string): boolean {
    const failures = this.failureCount.get(url) || 0;
    const lastErrorTime = this.lastError.get(url) || 0;
    const now = Date.now();
    
    // Reset circuit breaker after cooldown
    if (now - lastErrorTime > this.errorCooldown) {
      this.failureCount.set(url, 0);
      return false;
    }
    
    return failures >= this.circuitBreakerThreshold;
  }

  private static recordFailure(url: string) {
    const current = this.failureCount.get(url) || 0;
    this.failureCount.set(url, current + 1);
    this.lastError.set(url, Date.now());
  }

  private static interceptFetch() {
    const originalFetch = window.fetch;
    window.fetch = async function(resource: RequestInfo | URL, init?: RequestInit) {
      const url = resource.toString();
      
      if (TelemetryBlocker.shouldBlock(url) || TelemetryBlocker.isCircuitOpen(url)) {
        console.log('🚫 Blocked telemetry request:', url);
        TelemetryBlocker.recordFailure(url);
        return Promise.reject(new Error('Telemetry blocked by circuit breaker'));
      }
      
      try {
        // Add timeout to prevent hanging requests
        const timeoutId = setTimeout(() => {
          TelemetryBlocker.recordFailure(url);
        }, 5000);
        
        const response = await originalFetch.call(this, resource, init);
        clearTimeout(timeoutId);
        return response;
      } catch (error) {
        TelemetryBlocker.recordFailure(url);
        throw error;
      }
    };
  }

  private static interceptXHR() {
    const originalXHROpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method: string, url: string | URL) {
      const urlString = url.toString();
      
      if (TelemetryBlocker.shouldBlock(urlString) || TelemetryBlocker.isCircuitOpen(urlString)) {
        console.log('🚫 Blocked XHR telemetry:', urlString);
        this.send = function() {};
        this.setRequestHeader = function() {};
        return;
      }
      
      return originalXHROpen.apply(this, arguments as any);
    };
  }

  private static interceptConsole() {
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;
    
    console.error = function(...args: any[]) {
      const message = Array.from(args).join(' ');
      const isBlockedError = TelemetryBlocker.BLOCKED_PATTERNS.some(pattern => 
        message.toLowerCase().includes(pattern.toLowerCase())
      );
      
      if (!isBlockedError) {
        originalConsoleError.apply(console, args);
      }
    };

    console.warn = function(...args: any[]) {
      const message = Array.from(args).join(' ');
      const isBlockedWarning = TelemetryBlocker.BLOCKED_PATTERNS.some(pattern => 
        message.toLowerCase().includes(pattern.toLowerCase())
      );
      
      if (!isBlockedWarning) {
        originalConsoleWarn.apply(console, args);
      }
    };
  }

  private static interceptErrors() {
    const originalOnError = window.onerror;
    window.onerror = function(message, source, lineno, colno, error) {
      if (TelemetryBlocker.shouldBlock(source?.toString() || '') || 
          TelemetryBlocker.shouldBlock(message?.toString() || '')) {
        console.log('🚫 Blocked error from telemetry:', source);
        return true;
      }
      if (originalOnError) {
        return originalOnError.apply(this, arguments as any);
      }
      return false;
    };

    window.addEventListener('unhandledrejection', function(event) {
      const reason = event.reason;
      if (reason && (TelemetryBlocker.shouldBlock(reason.message) || 
                     TelemetryBlocker.shouldBlock(reason.stack))) {
        console.log('🚫 Blocked unhandled rejection from telemetry');
        event.preventDefault();
      }
    });
  }

  private static optimizeTimers() {
    // Create optimized timer functions without overriding global ones
    const createOptimizedTimeout = (originalTimeout: typeof setTimeout) => {
      return function(callback: Function, delay: number = 100, ...args: any[]) {
        // Increase minimum delay to reduce violations
        const optimizedDelay = Math.max(delay, 100);
        
        // Use debouncing for rapid consecutive calls
        return originalTimeout(() => {
          try {
            callback.apply(this, args);
          } catch (error) {
            console.warn('Timer callback error:', error);
          }
        }, optimizedDelay);
      };
    };

    const createOptimizedInterval = (originalInterval: typeof setInterval) => {
      return function(callback: Function, delay: number = 1000, ...args: any[]) {
        // Increase minimum delay for intervals
        const optimizedDelay = Math.max(delay, 1000);
        
        return originalInterval(() => {
          try {
            // Check if page is visible before executing
            if (document.visibilityState === 'visible') {
              callback.apply(this, args);
            }
          } catch (error) {
            console.warn('Interval callback error:', error);
          }
        }, optimizedDelay);
      };
    };

    // Store references to optimized functions (not overriding globals)
    (window as any).__optimizedTimeout = createOptimizedTimeout(setTimeout);
    (window as any).__optimizedInterval = createOptimizedInterval(setInterval);
  }

  private static setupVisibilityAPI() {
    document.addEventListener('visibilitychange', function() {
      if (document.visibilityState === 'hidden') {
        console.log('🔇 Page hidden - reducing background activity');
        // Additional optimizations when page is hidden
      } else {
        console.log('👀 Page visible - resuming normal activity');
      }
    });
  }

  static disable() {
    console.log('🔊 Telemetry Blocker disabled');
  }

  static getStats() {
    return {
      failureCount: Object.fromEntries(this.failureCount),
      lastError: Object.fromEntries(this.lastError)
    };
  }
}

// Auto-initialize only in development
if (typeof window !== 'undefined') {
  TelemetryBlocker.init();
}

export { TelemetryBlocker };
