
/**
 * Sistema de Diagnóstico Completo - Detecta problemas de conectividade
 */

interface DiagnosticResult {
  service: string;
  status: 'healthy' | 'degraded' | 'down';
  responseTime?: number;
  error?: string;
  timestamp: number;
}

interface ConnectivityReport {
  overall: 'healthy' | 'degraded' | 'down';
  services: DiagnosticResult[];
  recommendations: string[];
}

class DiagnosticSystem {
  private static instance: DiagnosticSystem;
  private healthHistory: Map<string, DiagnosticResult[]> = new Map();
  private fallbackMode: boolean = false;

  static getInstance(): DiagnosticSystem {
    if (!DiagnosticSystem.instance) {
      DiagnosticSystem.instance = new DiagnosticSystem();
    }
    return DiagnosticSystem.instance;
  }

  /**
   * Teste de conectividade principal
   */
  async runFullDiagnostic(): Promise<ConnectivityReport> {
    console.log('🔍 Iniciando diagnóstico completo do sistema...');
    
    const services = [
      { name: 'preview', url: 'https://id-preview--65efd17d-5178-405d-9721-909c97470c6d.lovable.app/' },
      { name: 'editor', url: 'https://65efd17d-5178-405d-9721-909c97470c6d.lovableproject.com/editor' },
      { name: 'websocket', url: 'wss://65efd17d-5178-405d-9721-909c97470c6d.lovableproject.com/' },
      { name: 'supabase', url: 'https://txqljpitotmcxntprxiu.supabase.co/rest/v1/' }
    ];

    const results: DiagnosticResult[] = [];

    for (const service of services) {
      const result = await this.testService(service.name, service.url);
      results.push(result);
      this.recordHistory(service.name, result);
    }

    const report = this.generateReport(results);
    this.logReport(report);
    
    // Ativar fallback se necessário
    if (report.overall === 'down') {
      this.activateFallbackMode();
    }

    return report;
  }

  /**
   * Teste individual de serviço
   */
  private async testService(name: string, url: string): Promise<DiagnosticResult> {
    const startTime = Date.now();
    
    try {
      if (name === 'websocket') {
        return await this.testWebSocket(url);
      } else {
        return await this.testHttpService(name, url);
      }
    } catch (error) {
      return {
        service: name,
        status: 'down',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: Date.now()
      };
    }
  }

  private async testHttpService(name: string, url: string): Promise<DiagnosticResult> {
    const startTime = Date.now();
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(url, {
        method: 'HEAD',
        signal: controller.signal,
        mode: 'no-cors' // Para evitar CORS em testes
      });

      clearTimeout(timeoutId);
      const responseTime = Date.now() - startTime;

      return {
        service: name,
        status: response.ok ? 'healthy' : 'degraded',
        responseTime,
        timestamp: Date.now()
      };
    } catch (error) {
      return {
        service: name,
        status: 'down',
        responseTime: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Network error',
        timestamp: Date.now()
      };
    }
  }

  private async testWebSocket(url: string): Promise<DiagnosticResult> {
    return new Promise((resolve) => {
      const startTime = Date.now();
      
      try {
        const ws = new WebSocket(url);
        
        const timeout = setTimeout(() => {
          ws.close();
          resolve({
            service: 'websocket',
            status: 'down',
            error: 'Connection timeout',
            timestamp: Date.now()
          });
        }, 3000);

        ws.onopen = () => {
          clearTimeout(timeout);
          ws.close();
          resolve({
            service: 'websocket',
            status: 'healthy',
            responseTime: Date.now() - startTime,
            timestamp: Date.now()
          });
        };

        ws.onerror = () => {
          clearTimeout(timeout);
          resolve({
            service: 'websocket',
            status: 'down',
            error: 'WebSocket connection failed',
            timestamp: Date.now()
          });
        };
      } catch (error) {
        resolve({
          service: 'websocket',
          status: 'down',
          error: error instanceof Error ? error.message : 'WebSocket error',
          timestamp: Date.now()
        });
      }
    });
  }

  private generateReport(results: DiagnosticResult[]): ConnectivityReport {
    const healthyCount = results.filter(r => r.status === 'healthy').length;
    const totalCount = results.length;
    
    let overall: 'healthy' | 'degraded' | 'down';
    if (healthyCount === totalCount) {
      overall = 'healthy';
    } else if (healthyCount > 0) {
      overall = 'degraded';
    } else {
      overall = 'down';
    }

    const recommendations = this.generateRecommendations(results);

    return {
      overall,
      services: results,
      recommendations
    };
  }

  private generateRecommendations(results: DiagnosticResult[]): string[] {
    const recommendations: string[] = [];
    
    const failedServices = results.filter(r => r.status === 'down');
    
    if (failedServices.some(s => s.service === 'preview')) {
      recommendations.push('Preview não está acessível - usando modo local');
    }
    
    if (failedServices.some(s => s.service === 'editor')) {
      recommendations.push('Editor Lovable indisponível - funcionalidades limitadas');
    }
    
    if (failedServices.some(s => s.service === 'websocket')) {
      recommendations.push('WebSocket falhou - sem atualizações em tempo real');
    }
    
    if (failedServices.length === results.length) {
      recommendations.push('Todos os serviços estão indisponíveis - ativando modo offline');
    }

    return recommendations;
  }

  private recordHistory(serviceName: string, result: DiagnosticResult) {
    if (!this.healthHistory.has(serviceName)) {
      this.healthHistory.set(serviceName, []);
    }
    
    const history = this.healthHistory.get(serviceName)!;
    history.push(result);
    
    // Manter apenas últimos 10 registros
    if (history.length > 10) {
      history.shift();
    }
  }

  private logReport(report: ConnectivityReport) {
    console.log('📊 === RELATÓRIO DE CONECTIVIDADE ===');
    console.log(`Status Geral: ${report.overall.toUpperCase()}`);
    
    report.services.forEach(service => {
      const emoji = service.status === 'healthy' ? '✅' : 
                   service.status === 'degraded' ? '⚠️' : '❌';
      const time = service.responseTime ? ` (${service.responseTime}ms)` : '';
      console.log(`${emoji} ${service.service}: ${service.status.toUpperCase()}${time}`);
      if (service.error) {
        console.log(`   Erro: ${service.error}`);
      }
    });
    
    console.log('\n💡 Recomendações:');
    report.recommendations.forEach(rec => {
      console.log(`• ${rec}`);
    });
    console.log('='.repeat(40));
  }

  activateFallbackMode() {
    this.fallbackMode = true;
    console.log('🚨 MODO FALLBACK ATIVADO - Funcionamento offline');
    
    // Notificar componentes sobre modo fallback
    window.dispatchEvent(new CustomEvent('fallback-mode-activated'));
  }

  isFallbackMode(): boolean {
    return this.fallbackMode;
  }

  getHealthHistory(serviceName: string): DiagnosticResult[] {
    return this.healthHistory.get(serviceName) || [];
  }
}

// Exportar instância singleton
export const diagnostics = DiagnosticSystem.getInstance();

// Auto-diagnóstico na inicialização
if (typeof window !== 'undefined') {
  // Executar diagnóstico após 2 segundos da inicialização
  setTimeout(() => {
    diagnostics.runFullDiagnostic();
  }, 2000);
  
  // Diagnóstico periódico a cada 30 segundos
  setInterval(() => {
    diagnostics.runFullDiagnostic();
  }, 30000);
}

export default diagnostics;
