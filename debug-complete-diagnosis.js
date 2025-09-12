#!/usr/bin/env node

console.log('🔍 DIAGNÓSTICO COMPLETO - RS SDK & 404 ERRORS');
console.log('='.repeat(60));

// 1. Verificar ambiente
const isLovable = typeof window !== 'undefined' && /lovable\.app/.test(location.hostname);
const isDev = typeof window !== 'undefined' && (location.hostname.includes('localhost') || location.port);

console.log(`📍 Ambiente: ${isLovable ? 'LOVABLE' : isDev ? 'DEVELOPMENT' : 'UNKNOWN'}`);

if (typeof window !== 'undefined') {
    console.log(`🌐 URL: ${location.href}`);
    console.log(`🏠 Host: ${location.hostname}`);
    console.log(`📡 Port: ${location.port || 'default'}`);

    // 2. Verificar scripts externos carregados
    console.log('\n📦 SCRIPTS EXTERNOS:');
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    const externalScripts = scripts.filter(s => {
        const src = s.src;
        return src && !src.startsWith(location.origin) && !src.startsWith('blob:') && !src.startsWith('data:');
    });

    if (externalScripts.length === 0) {
        console.log('✅ Nenhum script externo detectado');
    } else {
        externalScripts.forEach(script => {
            const src = script.src;
            const isAnalytics = /rudder|analytics|gtag|ga\.js|fbq|facebook|google.*ads/i.test(src);
            console.log(`${isAnalytics ? '🚨' : '📄'} ${src}`);
        });
    }

    // 3. Verificar objetos window suspeitos
    console.log('\n🪟 OBJETOS WINDOW SUSPEITOS:');
    const suspiciousObjects = [];
    for (const key of Object.keys(window)) {
        if (/rudder|analytics|ga|gtag|fbq|facebook|google.*ads/i.test(key)) {
            suspiciousObjects.push(key);
        }
    }

    if (suspiciousObjects.length === 0) {
        console.log('✅ Nenhum objeto suspeito detectado');
    } else {
        suspiciousObjects.forEach(obj => {
            console.log(`🚨 window.${obj} = ${typeof window[obj]}`);
        });
    }

    // 4. Verificar localStorage/sessionStorage
    console.log('\n💾 STORAGE SUSPEITO:');
    const suspiciousStorage = [];
    try {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && /rudder|analytics|ga|gtag|fbq|facebook|pixel/i.test(key)) {
                suspiciousStorage.push(key);
            }
        }
    } catch (e) {
        console.log('❌ Erro ao acessar localStorage:', e.message);
    }

    if (suspiciousStorage.length === 0) {
        console.log('✅ Nenhuma chave suspeita no storage');
    } else {
        suspiciousStorage.forEach(key => {
            console.log(`🚨 localStorage.${key}`);
        });
    }

    // 5. Verificar CSP (Content Security Policy)
    console.log('\n🛡️ CONTENT SECURITY POLICY:');
    const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (cspMeta) {
        console.log('📋 CSP encontrado:', cspMeta.content.substring(0, 100) + '...');
    } else {
        console.log('⚠️ Nenhum CSP definido no HTML');
    }

    // 6. Interceptar e monitorar network requests
    console.log('\n🌐 MONITORAMENTO DE NETWORK:');

    const originalFetch = window.fetch;
    window.fetch = function (...args) {
        const url = typeof args[0] === 'string' ? args[0] : args[0].url || args[0].toString();

        if (/rudder|analytics|google.*ads|facebook.*net|fbq/i.test(url)) {
            console.log('🚨 BLOCKED Analytics Request:', url);
            return Promise.resolve(new Response('{}', {
                status: 204,
                statusText: 'Blocked by debug script'
            }));
        }

        return originalFetch.apply(this, args).catch(error => {
            if (error.message.includes('404') || url.includes('404')) {
                console.log('📡 404 Error:', url);
            }
            throw error;
        });
    };

    // 7. Interceptar XMLHttpRequest
    const OriginalXHR = XMLHttpRequest;
    window.XMLHttpRequest = function () {
        const xhr = new OriginalXHR();
        const originalOpen = xhr.open;

        xhr.open = function (method, url, ...args) {
            if (/rudder|analytics|google.*ads|facebook.*net|fbq/i.test(url)) {
                console.log('🚨 BLOCKED XHR Request:', url);
                return originalOpen.call(this, method, 'data:,', ...args);
            }
            return originalOpen.call(this, method, url, ...args);
        };

        return xhr;
    };

    // 8. Interceptar carregamento dinâmico de scripts
    const originalAppendChild = Node.prototype.appendChild;
    Node.prototype.appendChild = function (child) {
        if (child.tagName === 'SCRIPT' && child.src) {
            const src = child.src;
            if (/rudder|analytics|google.*ads|facebook.*net|fbq/i.test(src)) {
                console.log('🚨 BLOCKED Dynamic Script:', src);
                return child; // Não adicionar ao DOM
            }
        }
        return originalAppendChild.call(this, child);
    };

    // 9. Override console.error para capturar erros RS SDK
    const originalConsoleError = console.error;
    console.error = function (...args) {
        const message = args.join(' ');
        if (/RS SDK|RudderStack|Email, Phone are mandatory|identify call/i.test(message)) {
            console.log('🔇 SUPPRESSED RS SDK Error:', message.substring(0, 100));
            return;
        }
        return originalConsoleError.apply(this, args);
    };

    console.log('✅ Interceptors ativados');
    console.log('✅ Monitoramento iniciado');

} else {
    console.log('❌ Executando em ambiente Node.js - algumas verificações não disponíveis');
}

// 10. Verificar se é específico da Lovable
if (typeof window !== 'undefined' && isLovable) {
    console.log('\n🏗️ DIAGNÓSTICO ESPECÍFICO LOVABLE:');
    console.log('⚠️ Ambiente de produção da Lovable detectado');
    console.log('💡 Possíveis causas dos erros:');
    console.log('   - Scripts de analytics injetados automaticamente');
    console.log('   - Configuração de CSP inadequada');
    console.log('   - Assets não encontrados no build final');
    console.log('   - Configurações de ambiente diferentes');

    // Verificar se há scripts injetados pela plataforma
    setTimeout(() => {
        const allScripts = Array.from(document.querySelectorAll('script'));
        const suspiciousInlineScripts = allScripts.filter(script =>
            !script.src && script.textContent &&
            /rudder|analytics|gtag|fbq|google.*ads/i.test(script.textContent)
        );

        if (suspiciousInlineScripts.length > 0) {
            console.log('🚨 Scripts inline suspeitos encontrados:');
            suspiciousInlineScripts.forEach((script, index) => {
                console.log(`   ${index + 1}. ${script.textContent.substring(0, 100)}...`);
            });
        }
    }, 2000);
}

console.log('\n🔚 Diagnóstico completo. Monitoramento ativo.');