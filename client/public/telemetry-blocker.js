
// Bloqueador de telemetria específico - permite recursos legítimos do Lovable
// Deve ser carregado ANTES de qualquer outro script

(function() {
  'use strict';
  
  console.log('🛡️ Bloqueador de telemetria específico ativado');
  
  // URLs e termos específicos que devem ser bloqueados (apenas telemetria)
  const BLOCKED_PATTERNS = [
    'us-central1-gpt-engineer-390607.cloudfunctions.net/pushLogsToGrafana',
    'ingesteer.services-prod.nsvcs.net',
    'rum_collection',
    'grafana'
  ];
  
  // Função para verificar se uma URL deve ser bloqueada
  function shouldBlock(url) {
    if (!url) return false;
    const urlString = url.toString().toLowerCase();
    return BLOCKED_PATTERNS.some(pattern => urlString.includes(pattern.toLowerCase()));
  }
  
  // 1. Interceptar Fetch API
  const originalFetch = window.fetch;
  window.fetch = function(resource, init) {
    if (shouldBlock(resource)) {
      console.log('🚫 Blocked telemetry request:', resource);
      return Promise.reject(new Error('Telemetry blocked'));
    }
    return originalFetch.apply(this, arguments);
  };
  
  // 2. Interceptar XMLHttpRequest
  const originalXHROpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url) {
    if (shouldBlock(url)) {
      console.log('🚫 Blocked XHR telemetry:', url);
      // Criar um XHR "fake" que não faz nada
      this.send = function() {};
      this.setRequestHeader = function() {};
      return;
    }
    return originalXHROpen.apply(this, arguments);
  };
  
  // 3. Interceptar console.error para filtrar logs específicos
  const originalConsoleError = console.error;
  console.error = function() {
    const message = Array.from(arguments).join(' ');
    
    // Verificar se é um erro de telemetria específica
    const isBlockedError = BLOCKED_PATTERNS.some(pattern => 
      message.toLowerCase().includes(pattern.toLowerCase())
    );
    
    if (!isBlockedError) {
      originalConsoleError.apply(console, arguments);
    }
  };
  
  console.log('✅ Bloqueador de telemetria específico configurado');
  
})();
