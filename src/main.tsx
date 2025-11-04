import { createRoot } from 'react-dom/client';
import App from './App';
import ClientLayout from './components/ClientLayout';
import './index.css';
import './styles/design-system.css';
// 🚀 SUPABASE: Inicialização do serviço de dados
// 🧹 DEVELOPMENT: Sistema de limpeza de avisos do console
import { initBrowserCleanup } from './utils/browserCleanup';
import { cleanupConsoleWarnings } from './utils/development';
// 🔧 WEBSOCKET: Otimizador para resolver problemas de reconexão
import { initializeWebSocketOptimization } from './utils/websocket-optimizer';
// 📊 RUDDERSTACK: Otimizador para resolver problemas de analytics
import { initializeRudderStackOptimization } from './utils/rudderstack-optimizer';
// 🛡️ DEVELOPMENT: Bloquear conexões Lovable em desenvolvimento
import './utils/blockLovableInDev';
// 🎯 PERFORMANCE: Controle de debug do canvas para melhor performance
import './utils/canvasPerformanceControl';
// ✨ MODULAR STEPS: Sistema modular de steps - auto-registro dos componentes
import './components/steps';

// 🧹 DEVELOPMENT: Ativa limpeza de avisos apenas em desenvolvimento
if (import.meta.env.DEV) {
  cleanupConsoleWarnings();
  // Limpeza de warnings comuns de navegador (Permissions-Policy, sandbox, preload não usado)
  if (typeof window !== 'undefined') {
    initBrowserCleanup();
  }
  // Inicializar otimizadores para desenvolvimento
  initializeWebSocketOptimization();
  initializeRudderStackOptimization();
}

// Interceptar chamadas de rede para desabilitar Supabase e Sentry em dev
// Isso acelera o desenvolvimento e previne side effects indesejados
// VITE_ENABLE_NETWORK_INTERCEPTORS=true para ativar
// VITE_DISABLE_SUPABASE=true para desabilitar Supabase
// VITE_ENABLE_CLOUDINARY=true para ativar Cloudinary

if (typeof window !== 'undefined') {
  const ENABLE_NETWORK_INTERCEPTORS = (import.meta as any)?.env?.VITE_ENABLE_NETWORK_INTERCEPTORS === 'true';
  const isDevOrPreview = import.meta.env.DEV || (typeof location !== 'undefined' && /lovable\.app|stackblitz\.io|codesandbox\.io/.test(location.hostname));

  if (ENABLE_NETWORK_INTERCEPTORS && isDevOrPreview) {
    const originalFetch = window.fetch.bind(window);
    window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === 'string' ? input : input.toString();
      const DISABLE_SUPABASE = (import.meta as any)?.env?.VITE_DISABLE_SUPABASE === 'true';
      try {
        (window as any).__USE_CLOUDINARY__ = ((import.meta as any)?.env?.VITE_ENABLE_CLOUDINARY === 'true');
      } catch { }
      const isPreviewHost = typeof location !== 'undefined' && /lovable\.app|stackblitz\.io|codesandbox\.io/.test(location.hostname);
      if (url.includes('cloudfunctions.net/pushLogsToGrafana')) {
        return Promise.resolve(new Response(null, { status: 204 }));
      }
      if (/sentry\.io|ingest\.sentry\.io/.test(url) && (import.meta.env.DEV || isPreviewHost)) {
        try {
          console.warn('🛑 Interceptado (Sentry desabilitado em dev):', url);
        } catch { }
        return Promise.resolve(new Response(null, { status: 204 }));
      }
      if (DISABLE_SUPABASE && url.includes('.supabase.co/rest/v1/')) {
        try {
          console.warn('🛑 Interceptado (Supabase REST desabilitado em dev):', url);
        } catch { }
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

    // Interceptar navigator.sendBeacon para evitar logs no Sentry em dev
    // Interceptar XMLHttpRequest para evitar logs no Sentry em dev

    try {
      const isPreviewHost = typeof location !== 'undefined' && /lovable\.app|stackblitz\.io|codesandbox\.io/.test(location.hostname);
      if (navigator?.sendBeacon && (import.meta.env.DEV || isPreviewHost)) {
        const originalBeacon = navigator.sendBeacon.bind(navigator);
        (navigator as any).sendBeacon = (url: any, data?: any) => {
          try {
            const str = typeof url === 'string' ? url : String(url);
            if (/sentry\.io|ingest\.sentry\.io/.test(str)) {
              console.warn('🛑 Interceptado (sendBeacon -> Sentry bloqueado):', str);
              return true;
            }
          } catch { }
          return originalBeacon(url, data);
        };
      }
    } catch { }

    try {
      const isPreviewHost = typeof location !== 'undefined' && /lovable\.app|stackblitz\.io|codesandbox\.io/.test(location.hostname);
      if ((import.meta.env.DEV || isPreviewHost) && typeof XMLHttpRequest !== 'undefined') {
        const OriginalXHR = XMLHttpRequest;
        function PatchedXHR(this: XMLHttpRequest) {
          const xhr = new OriginalXHR();
          const originalOpen = xhr.open;
          (xhr as any).open = function patchedOpen(method: string, url: string | URL) {
            try {
              const u = typeof url === 'string' ? url : url.toString();
              if (/sentry\.io|ingest\.sentry\.io/.test(u)) {
                console.warn('🛑 Interceptado (XHR -> Sentry bloqueado):', u);
                return originalOpen.apply(xhr, ['GET', 'data:ignored', true]);
              }
            } catch { }
            return originalOpen.apply(xhr, [method, url as any, true]);
          } as any;
          return xhr as any;
        }
        (window as any).XMLHttpRequest = PatchedXHR as any;
      }
    } catch { }

    window.addEventListener('beforeunload', () => {
      try { (window as any).fetch = originalFetch; } catch { }
    });
  }
}

// 🚀 SUPABASE: Configuração inicial do serviço
console.log('🚀 Inicializando serviços Supabase...');
console.log('🔧 DEBUG: main.tsx carregado');

// 🔧 DIAGNOSTIC: Testar template
import runTemplateDiagnostic from './utils/templateDiagnostic';
import { startPeriodicVersionCheck } from './utils/checkBuildVersion';

const diagnosticResult = runTemplateDiagnostic();
console.log('🔬 [MAIN] Template diagnostic:', diagnosticResult);

// 🔄 Versão / prevenção de 404 de chunks desatualizados
if (typeof window !== 'undefined') {
  try {
    startPeriodicVersionCheck(180000); // a cada 3 min
  } catch (e) {
    console.warn('[VersionCheck] Falha ao iniciar verificação de versão:', e);
  }
}

console.log('🔧 DEBUG: Criando root do React...');
createRoot(document.getElementById('root')!).render(
  <ClientLayout>
    <App />
  </ClientLayout>
);
console.log('✅ DEBUG: App renderizado com sucesso');
