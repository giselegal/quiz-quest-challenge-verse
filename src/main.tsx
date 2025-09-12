import { createRoot } from 'react-dom/client';
import App from './App';
import ClientLayout from './components/ClientLayout';
import './index.css';

// 🛡️ SUPRESSÃO DE ERROS DE TERCEIROS CONHECIDOS
function suppressThirdPartyErrors() {
  try {
    // Interceptar console.error IMEDIATAMENTE
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;
    
    // Override mais agressivo para console.error
    console.error = function(...args: any[]) {
      const message = args.join(' ');
      
      // Suprimir TODOS os erros relacionados ao RS SDK
      if (message.includes('RS SDK') || 
          message.includes('RudderStack') ||
          message.includes('rudderstack') ||
          (message.includes('Email, Phone are mandatory') && message.includes('mandatory fields')) ||
          (message.includes('identify call') && message.includes('mandatory')) ||
          message.includes('rrweb-plugin') ||
          message.includes('browser.js') ||
          message.includes('logger.js')) {
        console.warn('🟡 [SUPRIMIDO] RS SDK/Analytics:', message.substring(0, 100) + '...');
        return;
      }
      
      return originalConsoleError.apply(console, args);
    };

    // Override para console.warn também
    console.warn = function(...args: any[]) {
      const message = args.join(' ');
      if (message.includes('RS SDK') || message.includes('RudderStack')) {
        return; // Suprimir completamente
      }
      return originalConsoleWarn.apply(console, args);
    };

    // Interceptar window.onerror de forma mais agressiva
    const originalWindowError = window.onerror;
    window.onerror = function(message, source, lineno, colno, error) {
      const msg = String(message || '');
      const src = String(source || '');
      
      if (msg.includes('RS SDK') || 
          msg.includes('RudderStack') ||
          msg.includes('Email, Phone are mandatory') ||
          msg.includes('identify call') ||
          src.includes('rudderstack') ||
          src.includes('8113-d1a36f24b574faad.js') ||
          src.includes('c0166af3-b1eb4cd85304c1c2.js') ||
          src.includes('rrweb-plugin')) {
        console.warn('🟡 [SUPRIMIDO] Erro de script externo:', msg.substring(0, 80));
        return true; // Prevenir bubble up
      }
      
      if (originalWindowError) {
        return originalWindowError.call(window, message, source, lineno, colno, error);
      }
      return false;
    };

    // Interceptar addEventListener de forma mais agressiva
    const originalAddEventListener = window.addEventListener;
    window.addEventListener = function(type: string, listener: any, options: any) {
      if (type === 'error' && typeof listener === 'function') {
        const wrappedListener = function(event: ErrorEvent) {
          const message = event.message || '';
          if (message.includes('RS SDK') || 
              message.includes('RudderStack') ||
              message.includes('Email, Phone are mandatory') ||
              event.filename?.includes('rudderstack') ||
              event.filename?.includes('8113-d1a36f24b574faad.js')) {
            console.warn('🟡 [SUPRIMIDO] Erro addEventListener:', message.substring(0, 80));
            event.preventDefault();
            event.stopPropagation();
            return false;
          }
          return (listener as EventListener)(event);
        };
        return originalAddEventListener.call(window, type, wrappedListener as EventListener, options);
      }
      return originalAddEventListener.call(window, type, listener, options);
    };

    // Suprimir unhandledrejection também
    window.addEventListener('unhandledrejection', (event) => {
      const message = String(event.reason || '');
      if (message.includes('RS SDK') || 
          message.includes('RudderStack') ||
          message.includes('Email, Phone are mandatory')) {
        console.warn('🟡 [SUPRIMIDO] Promise rejeitada:', message.substring(0, 80));
        event.preventDefault();
      }
    });

    console.log('🛡️ Sistema de supressão de erros ativo');
    
  } catch (error) {
    console.warn('❌ Erro ao configurar supressão:', error);
  }
}

// Aplicar supressão antes de qualquer outro código
if (typeof window !== 'undefined') {
  suppressThirdPartyErrors();
}

// 🚀 SUPABASE: Inicialização do serviço de dados
// 🧹 DEVELOPMENT: Sistema de limpeza de avisos do console
import { initBrowserCleanup } from './utils/browserCleanup';
import { cleanupConsoleWarnings } from './utils/development';
// 🛡️ DEVELOPMENT: Bloquear conexões Lovable em desenvolvimento (DESABILITADO)
// import './utils/blockLovableInDev';
// import "./utils/hotmartWebhookSimulator"; // Carregar simulador de webhook - temporariamente desabilitado

// 🧹 DEVELOPMENT: Ativa limpeza de avisos apenas em desenvolvimento
if (import.meta.env.DEV) {
  cleanupConsoleWarnings();
  // Limpeza de warnings comuns de navegador (Permissions-Policy, sandbox, preload não usado)
  if (typeof window !== 'undefined') {
    initBrowserCleanup();
  }
}

// � Interceptor simples para bloquear logs externos em dev (Grafana/gpt-engineer)
if ((import.meta.env.DEV || typeof window !== 'undefined') && typeof window !== 'undefined') {
  const originalFetch = window.fetch.bind(window);
  window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === 'string' ? input : input.toString();
    const DISABLE_SUPABASE = (import.meta as any)?.env?.VITE_DISABLE_SUPABASE === 'true';
    try {
      (window as any).__USE_CLOUDINARY__ = ((import.meta as any)?.env?.VITE_ENABLE_CLOUDINARY === 'true');
    } catch { }
    const isPreviewHost = typeof location !== 'undefined' && /lovable\.app|stackblitz\.io|codesandbox\.io/.test(location.hostname);
    const isLovableEnv = typeof location !== 'undefined' && /lovable\.app/.test(location.hostname);

    // Bloqueia logs externos em dev MAS NÃO no Lovable
    if (url.includes('cloudfunctions.net/pushLogsToGrafana') && !isLovableEnv) {
      // Simula sucesso e evita 500 no console
      return Promise.resolve(new Response(null, { status: 204 }));
    }
    // Silencia Sentry em dev para evitar 404/429 e ruído excessivo MAS NÃO no Lovable
    if (/sentry\.io|ingest\.sentry\.io/.test(url) && (import.meta.env.DEV || isPreviewHost) && !isLovableEnv) {
      try {
        console.warn('🛑 Interceptado (Sentry desabilitado em dev):', url);
      } catch { }
      return Promise.resolve(new Response(null, { status: 204 }));
    }
    // Silencia chamadas REST do Supabase quando desabilitado (evita erros 400/403 durante QA) MAS NÃO no Lovable
    if (DISABLE_SUPABASE && url.includes('.supabase.co/rest/v1/') && !isLovableEnv) {
      try {
        console.warn('🛑 Interceptado (Supabase REST desabilitado em dev):', url);
      } catch { }
      // Responder com lista vazia ou sucesso sem corpo
      const wantsJson =
        (init?.headers &&
          typeof (init.headers as any).get === 'function' &&
          ((init.headers as any).get('accept') || '').includes('application/json')) ||
        (typeof url === 'string' && url.includes('select='));
      return Promise.resolve(
        wantsJson
          ? new Response('[]', {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          })
          : new Response(null, { status: 204 })
      );
    }
    return originalFetch(input as any, init);
  };

  // Também intercepta sendBeacon (Sentry usa esse transporte em prod)
  try {
    const isPreviewHost = typeof location !== 'undefined' && /lovable\.app|stackblitz\.io|codesandbox\.io/.test(location.hostname);
    const isLovableEnv = typeof location !== 'undefined' && /lovable\.app/.test(location.hostname);
    if (navigator?.sendBeacon && (import.meta.env.DEV || isPreviewHost) && !isLovableEnv) {
      const originalBeacon = navigator.sendBeacon.bind(navigator);
      (navigator as any).sendBeacon = (url: any, data?: any) => {
        try {
          const str = typeof url === 'string' ? url : String(url);
          if (/sentry\.io|ingest\.sentry\.io/.test(str)) {
            console.warn('🛑 Interceptado (sendBeacon -> Sentry bloqueado):', str);
            return true; // finge sucesso
          }
        } catch { }
        return originalBeacon(url, data);
      };
    }
  } catch { }

  // Intercepta XHR para evitar ruído em libs que não usam fetch
  try {
    const isPreviewHost = typeof location !== 'undefined' && /lovable\.app|stackblitz\.io|codesandbox\.io/.test(location.hostname);
    const isLovableEnv = typeof location !== 'undefined' && /lovable\.app/.test(location.hostname);
    if ((import.meta.env.DEV || isPreviewHost) && !isLovableEnv && typeof XMLHttpRequest !== 'undefined') {
      const OriginalXHR = XMLHttpRequest;
      // @ts-ignore - extend constructor
      function PatchedXHR(this: XMLHttpRequest) {
        const xhr = new OriginalXHR();
        const originalOpen = xhr.open;
        (xhr as any).open = function patchedOpen(method: string, url: string | URL) {
          try {
            const u = typeof url === 'string' ? url : url.toString();
            if (/sentry\.io|ingest\.sentry\.io/.test(u)) {
              // Reescreve para um data: vazio e ignora
              console.warn('🛑 Interceptado (XHR -> Sentry bloqueado):', u);
              return originalOpen.apply(xhr, ['GET', 'data:ignored', true]);
            }
          } catch { }
          return originalOpen.apply(xhr, [method, url as any, true]);
        } as any;
        return xhr as any;
      }
      // @ts-ignore
      (window as any).XMLHttpRequest = PatchedXHR as any;
    }
  } catch { }
}

// �🚀 SUPABASE: Configuração inicial do serviço
console.log('🚀 Inicializando serviços Supabase...');
console.log('🔧 DEBUG: main.tsx carregado');
// O serviço é inicializado automaticamente na importação

console.log('🔧 DEBUG: Criando root do React...');
createRoot(document.getElementById('root')!).render(
  <ClientLayout>
    <App />
  </ClientLayout>
);
console.log('✅ DEBUG: App renderizado com sucesso');
