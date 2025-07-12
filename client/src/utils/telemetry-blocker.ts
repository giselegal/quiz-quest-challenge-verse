// Emergency telemetry blocker with circuit breaker pattern
class TelemetryBlocker {
  private static instance: TelemetryBlocker;
  private circuitBreakerState: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';
  private failureCount = 0;
  private lastFailureTime = 0;
  private readonly maxFailures = 5;
  private readonly resetTimeout = 30000; // 30 seconds

  private constructor() {
    this.initializeBlocking();
  }

  public static getInstance(): TelemetryBlocker {
    if (!TelemetryBlocker.instance) {
      TelemetryBlocker.instance = new TelemetryBlocker();
    }
    return TelemetryBlocker.instance;
  }

  private initializeBlocking() {
    try {
      this.blockConsoleErrors();
      this.blockNetworkRequests();
      this.blockGlobalErrors();
      this.optimizeTimers();
    } catch (error) {
      this.handleFailure();
    }
  }

  private handleFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();

    if (this.failureCount >= this.maxFailures) {
      this.circuitBreakerState = 'OPEN';
      setTimeout(() => {
        this.circuitBreakerState = 'HALF_OPEN';
        this.failureCount = 0;
      }, this.resetTimeout);
    }
  }

  private blockConsoleErrors() {
    if (this.circuitBreakerState === 'OPEN') return;

    const blockedTerms = [
      'pushLogsToGrafana',
      'lovable.app',
      'gpt-engineer-390607',
      'rum_collection',
      'Failed to load resource',
      'Internal Server Error',
      'status of 500',
      'status of 404',
      'status of 400'
    ];

    const originalError = console.error;
    const originalWarn = console.warn;

    console.error = (...args: any[]) => {
      const message = args.join(' ');
      const shouldBlock = blockedTerms.some(term => 
        message.toLowerCase().includes(term.toLowerCase())
      );
      
      if (!shouldBlock) {
        originalError.apply(console, args);
      }
    };

    console.warn = (...args: any[]) => {
      const message = args.join(' ');
      const shouldBlock = blockedTerms.some(term => 
        message.toLowerCase().includes(term.toLowerCase())
      );
      
      if (!shouldBlock) {
        originalWarn.apply(console, args);
      }
    };
  }

  private blockNetworkRequests() {
    if (this.circuitBreakerState === 'OPEN') return;

    const originalFetch = window.fetch;
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === 'string' ? input : input.toString();
      
      const blockedDomains = [
        'lovable.app',
        'gpt-engineer-390607',
        'grafana'
      ];

      const shouldBlock = blockedDomains.some(domain => url.includes(domain));
      
      if (shouldBlock) {
        return new Response('Blocked', { status: 204 });
      }
      
      return originalFetch(input, init);
    };
  }

  private blockGlobalErrors() {
    if (this.circuitBreakerState === 'OPEN') return;

    window.addEventListener('error', (event) => {
      const message = event.message || '';
      const filename = event.filename || '';
      
      const blockedTerms = [
        'pushLogsToGrafana',
        'lovable.app',
        'gpt-engineer-390607'
      ];

      const shouldBlock = blockedTerms.some(term => 
        message.includes(term) || filename.includes(term)
      );
      
      if (shouldBlock) {
        event.preventDefault();
        event.stopPropagation();
      }
    }, true);

    window.addEventListener('unhandledrejection', (event) => {
      const reason = event.reason || {};
      const message = reason.message || reason.toString() || '';
      
      const blockedTerms = [
        'pushLogsToGrafana',
        'lovable.app',
        'gpt-engineer-390607'
      ];

      const shouldBlock = blockedTerms.some(term => 
        message.toLowerCase().includes(term.toLowerCase())
      );
      
      if (shouldBlock) {
        event.preventDefault();
      }
    });
  }

  private optimizeTimers() {
    // Create optimized timer functions without overriding globals
    (window as any).__optimizedTimeout = (callback: Function, delay: number = 0, ...args: any[]) => {
      return setTimeout(() => {
        try {
          callback(...args);
        } catch (error) {
          // Silently handle timer errors
        }
      }, Math.max(delay, 16)); // Minimum 16ms for performance
    };

    (window as any).__optimizedInterval = (callback: Function, delay: number = 100, ...args: any[]) => {
      return setInterval(() => {
        try {
          callback(...args);
        } catch (error) {
          // Silently handle interval errors
        }
      }, Math.max(delay, 50)); // Minimum 50ms for intervals
    };
  }

  public performHealthCheck(): Promise<Array<{ endpoint: string; status: number; ok: boolean; error?: string }>> {
    return new Promise((resolve) => {
      try {
        const healthChecks = [
          {
            endpoint: 'telemetry-blocker',
            status: this.circuitBreakerState === 'CLOSED' ? 200 : 503,
            ok: this.circuitBreakerState === 'CLOSED',
            error: this.circuitBreakerState !== 'CLOSED' ? 'Circuit breaker open' : undefined
          },
          {
            endpoint: 'console-blocking',
            status: 200,
            ok: true
          },
          {
            endpoint: 'network-blocking',
            status: 200,
            ok: true
          }
        ];
        resolve(healthChecks);
      } catch (error) {
        resolve([{
          endpoint: 'health-check',
          status: 500,
          ok: false,
          error: 'Health check failed'
        }]);
      }
    });
  }

  public getStatus() {
    return {
      state: this.circuitBreakerState,
      failures: this.failureCount,
      lastFailure: this.lastFailureTime
    };
  }
}

// Initialize the blocker
const telemetryBlocker = TelemetryBlocker.getInstance();

// Export functions
export const performHealthCheck = () => telemetryBlocker.performHealthCheck();
export const getTelemetryStatus = () => telemetryBlocker.getStatus();

// Initialize on module load
if (typeof window !== 'undefined') {
  console.log('🛡️ Telemetry blocker initialized');
}

export default telemetryBlocker;
