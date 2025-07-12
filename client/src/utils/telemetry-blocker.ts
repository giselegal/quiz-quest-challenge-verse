
// Bloqueador de telemetria específico com circuit breaker
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
      this.blockSpecificTelemetry();
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

  private blockSpecificTelemetry() {
    if (this.circuitBreakerState === 'OPEN') return;

    // Apenas termos muito específicos de telemetria
    const blockedTerms = [
      'pushLogsToGrafana',
      'gpt-engineer-390607',
      'rum_collection',
      'grafana'
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

    // Bloquear apenas requests de telemetria específicos
    const originalFetch = window.fetch;
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === 'string' ? input : input.toString();
      
      const blockedUrls = [
        'pushLogsToGrafana',
        'gpt-engineer-390607',
        'grafana'
      ];

      const shouldBlock = blockedUrls.some(blocked => url.includes(blocked));
      
      if (shouldBlock) {
        return new Response('Blocked', { status: 204 });
      }
      
      return originalFetch(input, init);
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
  console.log('🛡️ Telemetry blocker específico initialized');
}

export default telemetryBlocker;
