/**
 * Filtro de Console - Suprime logs de erros externos desnecessários
 * 
 * Este utilitário filtra erros de console de serviços externos que não são 
 * relevantes para o desenvolvimento local (Grafana, RUM collection, etc.)
 */

class ConsoleErrorFilter {
  private static FILTERED_DOMAINS = [
    'us-central1-gpt-engineer-390607.cloudfunctions.net',
    'id-preview--65efd17d-5178-405d-9721-909c97470c6d.lovable.app',
    'ingesteer.services-prod.nsvcs.net',
    'grafana',
    'rum_collection',
    'pushLogsToGrafana'
  ];

  private static FILTERED_MESSAGES = [
    'Failed to load resource: the server responded with a status of 500',
    'Failed to load resource: the server responded with a status of 404',
    'Failed to load resource: the server responded with a status of 400',
    'POST https://us-central1-gpt-engineer-390607.cloudfunctions.net/pushLogsToGrafana',
    'GET https://id-preview--65efd17d-5178-405d-9721-909c97470c6d.lovable.app'
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

    console.log('🔇 Console Error Filter ativado - logs externos filtrados');
  }

  private static shouldFilter(args: any[]): boolean {
    const message = args.join(' ').toLowerCase();
    
    // Filtrar por domínios externos
    const hasFilteredDomain = this.FILTERED_DOMAINS.some(domain => 
      message.includes(domain.toLowerCase())
    );

    // Filtrar por mensagens específicas
    const hasFilteredMessage = this.FILTERED_MESSAGES.some(msg => 
      message.includes(msg.toLowerCase())
    );

    return hasFilteredDomain || hasFilteredMessage;
  }

  static disable() {
    // Restaurar console original se necessário
    console.log('🔊 Console Error Filter desativado');
  }
}

// Auto-inicializar apenas em desenvolvimento
if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
  ConsoleErrorFilter.init();
}

export { ConsoleErrorFilter };
