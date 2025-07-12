
/**
 * Filtro de Console Específico - Suprime apenas logs de telemetria específicos
 */

class ConsoleErrorFilter {
  private static FILTERED_DOMAINS = [
    'us-central1-gpt-engineer-390607.cloudfunctions.net',
    'ingesteer.services-prod.nsvcs.net'
  ];

  private static FILTERED_MESSAGES = [
    'POST https://us-central1-gpt-engineer-390607.cloudfunctions.net/pushLogsToGrafana',
    'rum_collection',
    'grafana'
  ];

  static init() {
    // Interceptar console.error original
    const originalError = console.error;
    const originalWarn = console.warn;

    console.error = (...args: any[]) => {
      if (!this.shouldFilter(args)) {
        originalError.apply(console, args);
      }
    };

    console.warn = (...args: any[]) => {
      if (!this.shouldFilter(args)) {
        originalWarn.apply(console, args);
      }
    };

    console.log('🔇 Console Error Filter específico ativado');
  }

  private static shouldFilter(args: any[]): boolean {
    const message = args.join(' ').toLowerCase();
    
    // Filtrar apenas por domínios específicos de telemetria
    const hasFilteredDomain = this.FILTERED_DOMAINS.some(domain => 
      message.includes(domain.toLowerCase())
    );

    // Filtrar por mensagens específicas de telemetria
    const hasFilteredMessage = this.FILTERED_MESSAGES.some(msg => 
      message.includes(msg.toLowerCase())
    );

    return hasFilteredDomain || hasFilteredMessage;
  }

  static disable() {
    console.log('🔊 Console Error Filter desativado');
  }
}

// Auto-inicializar apenas em desenvolvimento
if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
  ConsoleErrorFilter.init();
}

export { ConsoleErrorFilter };
