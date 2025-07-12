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
  
  // 3. Interceptar console.error para filtrar logs
  const originalConsoleError = console.error;
  console.error = function() {
    const message = Array.from(arguments).join(' ');
    
    // Verificar se é um erro de telemetria
    const isBlockedError = BLOCKED_PATTERNS.some(pattern => 
      message.toLowerCase().includes(pattern.toLowerCase())
    );
    
    if (!isBlockedError) {
      originalConsoleError.apply(console, arguments);
    }
  };
  
  // 4. Interceptar window.onerror
  const originalOnError = window.onerror;
  window.onerror = function(message, source, lineno, colno, error) {
    if (shouldBlock(source) || shouldBlock(message)) {
      console.log('🚫 Blocked error from telemetry:', source);
      return true; // Previne o erro padrão
    }
    if (originalOnError) {
      return originalOnError.apply(this, arguments);
    }
  };
  
  // 5. Interceptar unhandledrejection
  window.addEventListener('unhandledrejection', function(event) {
    const reason = event.reason;
    if (reason && (shouldBlock(reason.message) || shouldBlock(reason.stack))) {
      console.log('🚫 Blocked unhandled rejection from telemetry');
      event.preventDefault();
    }
  });
  
  // 6. Bloquear appendChild de scripts de telemetria
  const originalAppendChild = Node.prototype.appendChild;
  Node.prototype.appendChild = function(child) {
    if (child.tagName === 'SCRIPT' && child.src && shouldBlock(child.src)) {
      console.log('🚫 Blocked script injection:', child.src);
      return child;
    }
    return originalAppendChild.apply(this, arguments);
  };
  
  // 7. Interceptar createElement para scripts
  const originalCreateElement = document.createElement;
  document.createElement = function(tagName) {
    const element = originalCreateElement.apply(this, arguments);
    
    if (tagName.toLowerCase() === 'script') {
      const originalSetAttribute = element.setAttribute;
      element.setAttribute = function(name, value) {
        if (name === 'src' && shouldBlock(value)) {
          console.log('🚫 Blocked script src:', value);
          return;
        }
        return originalSetAttribute.apply(this, arguments);
      };
      
      Object.defineProperty(element, 'src', {
        set: function(value) {
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
