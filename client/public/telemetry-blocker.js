// Interceptor para silenciar erros de telemetria do Lovable
// Este arquivo previne logs desnecessários no console durante desenvolvimento

(function() {
  'use strict';
  
  // Lista de URLs que devem ser silenciadas
  const BLOCKED_URLS = [
    'us-central1-gpt-engineer-390607.cloudfunctions.net',
    'pushLogsToGrafana',
    'id-preview--65efd17d-5178-405d-9721-909c97470c6d.lovable.app',
    'ingesteer.services-prod.nsvcs.net',
    'rum_collection'
  ];
  
  // Interceptar console.error para filtrar erros desnecessários
  const originalConsoleError = console.error;
  console.error = function(...args) {
    const message = args.join(' ');
    
    // Verificar se é um erro de telemetria
    const isBlockedError = BLOCKED_URLS.some(url => message.includes(url));
    
    if (!isBlockedError) {
      originalConsoleError.apply(console, args);
    }
  };
  
  // Interceptar fetch para silenciar requests de telemetria
  const originalFetch = window.fetch;
  window.fetch = function(url, options) {
    const urlString = typeof url === 'string' ? url : url.toString();
    
    // Verificar se é uma URL bloqueada
    const isBlockedUrl = BLOCKED_URLS.some(blockedUrl => urlString.includes(blockedUrl));
    
    if (isBlockedUrl) {
      // Retornar uma promise rejeitada silenciosamente
      return Promise.reject(new Error('Telemetry request blocked'));
    }
    
    return originalFetch.apply(this, arguments);
  };
  
  // Interceptar XMLHttpRequest
  const originalXHROpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
    const urlString = typeof url === 'string' ? url : url.toString();
    
    // Verificar se é uma URL bloqueada
    const isBlockedUrl = BLOCKED_URLS.some(blockedUrl => urlString.includes(blockedUrl));
    
    if (isBlockedUrl) {
      // Não executar a requisição
      return;
    }
    
    return originalXHROpen.apply(this, arguments);
  };
  
  console.log('🛡️ Telemetry blocker ativo - Logs do Lovable silenciados');
})();
