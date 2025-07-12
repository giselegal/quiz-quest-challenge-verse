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
    'grafana',
    'facebook.com/tr'
  ];
  
  // Avisos específicos do Lovable que devem ser silenciados
  const BLOCKED_WARNINGS = [
    'Unrecognized feature:',
    'vr',
    'ambient-light-sensor', 
    'battery',
    'iframe which has both allow-scripts and allow-same-origin',
    'sandbox attribute can escape',
    'preloaded using link preload but not used',
    'facebook.com/tr'
  ];
  
  // Função para verificar se uma URL deve ser bloqueada
  function shouldBlock(url) {
    if (!url) return false;
    const urlString = url.toString().toLowerCase();
    return BLOCKED_PATTERNS.some(pattern => urlString.includes(pattern.toLowerCase()));
  }
  
  // Função para verificar se um aviso deve ser silenciado
  function shouldBlockWarning(message) {
    if (!message) return false;
    const messageString = message.toString().toLowerCase();
    return BLOCKED_WARNINGS.some(warning => messageString.includes(warning.toLowerCase()));
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
      this.send = function() {};
      this.setRequestHeader = function() {};
      return;
    }
    return originalXHROpen.apply(this, arguments);
  };
  
  // 3. Interceptar console.error e console.warn para filtrar logs
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;
  
  console.error = function() {
    const message = Array.from(arguments).join(' ');
    
    const isBlockedError = BLOCKED_PATTERNS.some(pattern => 
      message.toLowerCase().includes(pattern.toLowerCase())
    );
    
    const isBlockedWarning = shouldBlockWarning(message);
    
    if (!isBlockedError && !isBlockedWarning) {
      originalConsoleError.apply(console, arguments);
    }
  };
  
  console.warn = function() {
    const message = Array.from(arguments).join(' ');
    
    const isBlockedWarning = shouldBlockWarning(message);
    
    if (!isBlockedWarning) {
      originalConsoleWarn.apply(console, arguments);
    }
  };
  
  // 4. Interceptar window.onerror
  const originalOnError = window.onerror;
  window.onerror = function(message, source, lineno, colno, error) {
    if (shouldBlock(source) || shouldBlock(message) || shouldBlockWarning(message)) {
      return true;
    }
    if (originalOnError) {
      return originalOnError.apply(this, arguments);
    }
  };
  
  console.log('✅ Bloqueador de telemetria configurado com sucesso');
  
})();
