
// Bloqueador de telemetria mais robusto para Lovable
// Deve ser carregado ANTES de qualquer outro script

(function() {
  'use strict';
  
  console.log('🛡️ Bloqueador de telemetria ativado');
  
  // URLs e termos que devem ser bloqueados
  const BLOCKED_PATTERNS = [
    'us-central1-gpt-engineer-390607.cloudfunctions.net',
    'pushLogsToGrafana',
    'id-preview--65efd17d-5178-405d-9721-909c97470c6d.lovable.app',
    'ingesteer.services-prod.nsvcs.net',
    'rum_collection',
    'lovable.app'
  ];
  
  // Função para verificar se uma URL deve ser bloqueada
  function shouldBlock(url: string | URL | undefined): boolean {
    if (!url) return false;
    const urlString = url.toString().toLowerCase();
    return BLOCKED_PATTERNS.some(pattern => urlString.includes(pattern.toLowerCase()));
  }
  
  // 1. Interceptar Fetch API
  const originalFetch = window.fetch;
  window.fetch = function(resource: RequestInfo | URL, init?: RequestInit) {
    if (shouldBlock(resource as string)) {
      console.log('🚫 Blocked telemetry request:', resource);
      return Promise.reject(new Error('Telemetry blocked'));
    }
    return originalFetch.apply(this, arguments as any);
  };
  
  // 2. Interceptar XMLHttpRequest
  const originalXHROpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method: string, url: string | URL) {
    if (shouldBlock(url as string)) {
      console.log('🚫 Blocked XHR telemetry:', url);
      // Criar um XHR "fake" que não faz nada
      this.send = function() {};
      this.setRequestHeader = function() {};
      return;
    }
    return originalXHROpen.apply(this, arguments as any);
  };
  
  // 3. Interceptar console.error para filtrar logs
  const originalConsoleError = console.error;
  console.error = function(...args: any[]) {
    const message = Array.from(arguments).join(' ');
    
    // Verificar se é um erro de telemetria
    const isBlockedError = BLOCKED_PATTERNS.some(pattern => 
      message.toLowerCase().includes(pattern.toLowerCase())
    );
    
    if (!isBlockedError) {
      originalConsoleError.apply(console, arguments as any);
    }
  };
  
  // 4. Interceptar window.onerror
  const originalOnError = window.onerror;
  window.onerror = function(message: Event | string, source?: string, lineno?: number, colno?: number, error?: Error) {
    if (shouldBlock(source) || shouldBlock(message as string)) {
      console.log('🚫 Blocked error from telemetry:', source);
      return true; // Previne o erro padrão
    }
    if (originalOnError) {
      return originalOnError.apply(this, arguments as any);
    }
    return false;
  };
  
  // 5. Interceptar unhandledrejection
  window.addEventListener('unhandledrejection', function(event: PromiseRejectionEvent) {
    const reason = event.reason;
    if (reason && (shouldBlock(reason.message) || shouldBlock(reason.stack))) {
      console.log('🚫 Blocked unhandled rejection from telemetry');
      event.preventDefault();
    }
  });
  
  // 6. Bloquear appendChild de scripts de telemetria
  const originalAppendChild = Node.prototype.appendChild;
  Node.prototype.appendChild = function<T extends Node>(child: T): T {
    if ((child as any).tagName === 'SCRIPT' && (child as any).src && shouldBlock((child as any).src)) {
      console.log('🚫 Blocked script injection:', (child as any).src);
      return child;
    }
    return originalAppendChild.apply(this, arguments as any);
  };
  
  // 7. Interceptar createElement para scripts
  const originalCreateElement = document.createElement;
  document.createElement = function<K extends keyof HTMLElementTagNameMap>(
    tagName: K,
    options?: ElementCreationOptions
  ): HTMLElementTagNameMap[K] {
    const element = originalCreateElement.apply(this, arguments as any);
    
    if (tagName.toLowerCase() === 'script') {
      const originalSetAttribute = element.setAttribute;
      element.setAttribute = function(name: string, value: string) {
        if (name === 'src' && shouldBlock(value)) {
          console.log('🚫 Blocked script src:', value);
          return;
        }
        return originalSetAttribute.apply(this, arguments as any);
      };
      
      Object.defineProperty(element, 'src', {
        set: function(value: string) {
          if (shouldBlock(value)) {
            console.log('🚫 Blocked script src property:', value);
            return;
          }
          originalSetAttribute.call(this, 'src', value);
        },
        get: function() {
          return this.getAttribute('src');
        }
      });
    }
    
    return element;
  };
  
  console.log('✅ Bloqueador de telemetria configurado com sucesso');
  
})();

// Circuit Breaker para controlar chamadas com falhas
class CircuitBreaker {
  private failures = 0;
  private lastFailureTime = 0;
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';
  
  constructor(
    private threshold = 5,
    private timeout = 60000
  ) {}
  
  async call<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime > this.timeout) {
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }
    
    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }
  
  private onSuccess() {
    this.failures = 0;
    this.state = 'CLOSED';
  }
  
  private onFailure() {
    this.failures++;
    this.lastFailureTime = Date.now();
    if (this.failures >= this.threshold) {
      this.state = 'OPEN';
    }
  }
}

// Timeout helper melhorado
export function __optimizedTimeout(callback: () => void, delay = 100): number {
  return window.setTimeout(callback, Math.max(delay, 100));
}

// Interval helper melhorado
export function __optimizedInterval(callback: () => void, delay = 1000): number {
  return window.setInterval(callback, Math.max(delay, 1000));
}

// Health check para verificar status dos serviços
interface HealthCheckResult {
  endpoint: string;
  status: number;
  ok: boolean;
  error?: string;
}

const circuitBreaker = new CircuitBreaker();

export async function performHealthCheck(): Promise<HealthCheckResult[]> {
  const endpoints = [
    '/api/health',
    '/api/quiz/status',
    '/api/admin/status'
  ];
  
  const results = await Promise.allSettled(
    endpoints.map(async (endpoint) => {
      try {
        return await circuitBreaker.call(async () => {
          const response = await fetch(endpoint, {
            method: 'HEAD',
            signal: AbortSignal.timeout(5000)
          });
          
          return {
            endpoint,
            status: response.status,
            ok: response.ok
          };
        });
      } catch (error) {
        return {
          endpoint,
          status: 0,
          ok: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    })
  );
  
  return results.map(result => 
    result.status === 'fulfilled' ? result.value : result.reason
  );
}
