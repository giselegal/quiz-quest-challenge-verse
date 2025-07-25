import type { BlockData } from '@/components/editor/blocks';
import { QuizDataAdapter } from './quizDataAdapter';
import { supabase } from '../lib/supabase';

// Dados inline do quiz - movidos para este arquivo
const REAL_QUIZ_QUESTIONS = [
  {
    id: 'q1',
    question: 'Qual dessas opções representa melhor seu estilo predominante?',
    options: [
      { id: '1', text: 'Clássico e elegante', value: 'classico' },
      { id: '2', text: 'Moderno e descolado', value: 'moderno' },
      { id: '3', text: 'Natural e autêntico', value: 'natural' },
      { id: '4', text: 'Casual e descontraído', value: 'casual' }
    ],
    type: 'text',
    multipleSelection: false,
    maxSelections: 1
  },
  {
    id: 'q2',
    question: 'Qual ambiente você mais se identifica?',
    options: [
      { id: '1', text: 'Casa aconchegante', value: 'casa' },
      { id: '2', text: 'Escritório moderno', value: 'escritorio' },
      { id: '3', text: 'Natureza ao ar livre', value: 'natureza' },
      { id: '4', text: 'Café urbano', value: 'cafe' }
    ],
    type: 'text',
    multipleSelection: false,
    maxSelections: 1
  },
  {
    id: 'q3',
    question: 'Quais cores mais combinam com você?',
    options: [
      { id: '1', text: 'Tons neutros (bege, branco, cinza)', value: 'neutros' },
      { id: '2', text: 'Cores vibrantes (azul, vermelho, amarelo)', value: 'vibrantes' },
      { id: '3', text: 'Tons terrosos (marrom, verde, ocre)', value: 'terrosos' },
      { id: '4', text: 'Cores pastéis (rosa, lilás, azul claro)', value: 'pasteis' }
    ],
    type: 'text',
    multipleSelection: false,
    maxSelections: 1
  },
  {
    id: 'q4',
    question: 'Qual peça você usaria em um jantar especial?',
    options: [
      { id: '1', text: 'Vestido preto básico', value: 'vestido_preto' },
      { id: '2', text: 'Blazer estruturado', value: 'blazer' },
      { id: '3', text: 'Blusa fluida', value: 'blusa_fluida' },
      { id: '4', text: 'Jeans escuro elegante', value: 'jeans_elegante' }
    ],
    type: 'text',
    multipleSelection: false,
    maxSelections: 1
  },
  {
    id: 'q5',
    question: 'Como você prefere seus acessórios?',
    options: [
      { id: '1', text: 'Minimalistas e discretos', value: 'minimalistas' },
      { id: '2', text: 'Statement e chamativos', value: 'statement' },
      { id: '3', text: 'Naturais e orgânicos', value: 'naturais' },
      { id: '4', text: 'Práticos e funcionais', value: 'praticos' }
    ],
    type: 'text',
    multipleSelection: false,
    maxSelections: 1
  },
  {
    id: 'q6',
    question: 'Qual estampa você mais usa?',
    options: [
      { id: '1', text: 'Listras clássicas', value: 'listras' },
      { id: '2', text: 'Estampas geométricas', value: 'geometricas' },
      { id: '3', text: 'Florais delicados', value: 'florais' },
      { id: '4', text: 'Prefiro liso', value: 'liso' }
    ],
    type: 'text',
    multipleSelection: false,
    maxSelections: 1
  },
  {
    id: 'q7',
    question: 'Qual tipo de calçado você mais usa?',
    options: [
      { id: '1', text: 'Salto médio clássico', value: 'salto_medio' },
      { id: '2', text: 'Tênis moderno', value: 'tenis' },
      { id: '3', text: 'Sandália rasteira', value: 'rasteira' },
      { id: '4', text: 'Sapato oxford', value: 'oxford' }
    ],
    type: 'text',
    multipleSelection: false,
    maxSelections: 1
  },
  {
    id: 'q8',
    question: 'Como você se veste para trabalhar?',
    options: [
      { id: '1', text: 'Formal e estruturado', value: 'formal' },
      { id: '2', text: 'Business casual', value: 'business_casual' },
      { id: '3', text: 'Confortável e solto', value: 'confortavel' },
      { id: '4', text: 'Criativo e expressivo', value: 'criativo' }
    ],
    type: 'text',
    multipleSelection: false,
    maxSelections: 1
  },
  {
    id: 'q9',
    question: 'Qual silhueta você prefere?',
    options: [
      { id: '1', text: 'Ajustada ao corpo', value: 'ajustada' },
      { id: '2', text: 'Estruturada e angular', value: 'estruturada' },
      { id: '3', text: 'Fluida e solta', value: 'fluida' },
      { id: '4', text: 'Oversized confortável', value: 'oversized' }
    ],
    type: 'text',
    multipleSelection: false,
    maxSelections: 1
  },
  {
    id: 'q10',
    question: 'Qual é seu mood de fim de semana?',
    options: [
      { id: '1', text: 'Elegante mesmo no casual', value: 'elegante_casual' },
      { id: '2', text: 'Moderno e urbano', value: 'moderno_urbano' },
      { id: '3', text: 'Natural e relaxado', value: 'natural_relaxado' },
      { id: '4', text: 'Prático e esportivo', value: 'pratico_esportivo' }
    ],
    type: 'text',
    multipleSelection: false,
    maxSelections: 1
  }
];

const STRATEGIC_QUESTIONS = [
  {
    id: 'sq1',
    question: 'O que mais te incomoda no seu guarda-roupa atual?',
    options: [
      { id: '1', text: 'Não sei combinar as peças', value: 'combinacao' },
      { id: '2', text: 'Tenho muita roupa mas nada para usar', value: 'excesso' },
      { id: '3', text: 'Não me sinto confiante', value: 'confianca' },
      { id: '4', text: 'Não sei qual é meu estilo', value: 'identidade' }
    ],
    type: 'text',
    multipleSelection: false,
    maxSelections: 1
  },
  {
    id: 'sq2',
    question: 'Quanto você gasta por mês com roupas?',
    options: [
      { id: '1', text: 'Até R$ 200', value: 'ate_200' },
      { id: '2', text: 'R$ 200 a R$ 500', value: '200_500' },
      { id: '3', text: 'R$ 500 a R$ 1000', value: '500_1000' },
      { id: '4', text: 'Mais de R$ 1000', value: 'mais_1000' }
    ],
    type: 'text',
    multipleSelection: false,
    maxSelections: 1
  },
  {
    id: 'sq3',
    question: 'Qual sua maior dificuldade na hora de se vestir?',
    options: [
      { id: '1', text: 'Escolher as cores certas', value: 'cores' },
      { id: '2', text: 'Combinar estampas', value: 'estampas' },
      { id: '3', text: 'Escolher a ocasião certa', value: 'ocasiao' },
      { id: '4', text: 'Valorizar meu corpo', value: 'corpo' }
    ],
    type: 'text',
    multipleSelection: false,
    maxSelections: 1
  },
  {
    id: 'sq4',
    question: 'O que você mais gostaria de mudar?',
    options: [
      { id: '1', text: 'Ter mais confiança', value: 'confianca' },
      { id: '2', text: 'Organizar melhor o guarda-roupa', value: 'organizacao' },
      { id: '3', text: 'Comprar menos e melhor', value: 'consumo' },
      { id: '4', text: 'Descobrir meu estilo único', value: 'estilo_unico' }
    ],
    type: 'text',
    multipleSelection: false,
    maxSelections: 1
  },
  {
    id: 'sq5',
    question: 'Como você prefere receber orientação de estilo?',
    options: [
      { id: '1', text: 'Consultoria individual', value: 'individual' },
      { id: '2', text: 'Guias e materiais online', value: 'online' },
      { id: '3', text: 'Workshops em grupo', value: 'grupo' },
      { id: '4', text: 'Aplicativo interativo', value: 'app' }
    ],
    type: 'text',
    multipleSelection: false,
    maxSelections: 1
  },
  {
    id: 'sq6',
    question: 'Você estaria disposta a investir em consultoria?',
    options: [
      { id: '1', text: 'Sim, quero atendimento personalizado', value: 'sim_personalizado' },
      { id: '2', text: 'Talvez, dependendo do valor', value: 'talvez' },
      { id: '3', text: 'Prefiro primeiro ver resultados', value: 'resultados_primeiro' },
      { id: '4', text: 'Não neste momento', value: 'nao_agora' }
    ],
    type: 'text',
    multipleSelection: false,
    maxSelections: 1
  }
];

const TRANSITIONS = {
  main: 'Agora vamos conhecer você melhor',
  final: 'Preparando seu resultado personalizado'
};

// DEBUG: Verificar se os dados estão sendo importados corretamente
console.log('🔍 DEBUG - Dados importados:');
console.log('  REAL_QUIZ_QUESTIONS:', REAL_QUIZ_QUESTIONS?.length || 'UNDEFINED');
console.log('  STRATEGIC_QUESTIONS:', STRATEGIC_QUESTIONS?.length || 'UNDEFINED');
console.log('  TRANSITIONS:', TRANSITIONS ? 'OK' : 'UNDEFINED');

// Tipos para o sistema schema-driven
export interface SchemaDrivenFunnelData {
  id: string;
  name: string;
  description?: string;
  theme: string;
  isPublished: boolean;
  pages: SchemaDrivenPageData[];
  config: FunnelConfig;
  version: number;
  lastModified: Date;
  createdAt: Date;
  userId?: number;
}

export interface SchemaDrivenPageData {
  id: string;
  name: string;
  title: string;
  type: 'intro' | 'question' | 'result' | 'offer' | 'thank-you' | 'custom';
  order: number;
  blocks: BlockData[];
  settings: PageSettings;
  metadata?: Record<string, any>;
}

export interface PageSettings {
  showProgress: boolean;
  progressValue: number;
  backgroundColor: string;
  textColor: string;
  maxWidth: string;
  padding?: string;
  customCSS?: string;
}

export interface FunnelConfig {
  name: string;
  description?: string;
  isPublished: boolean;
  theme: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  abTesting?: {
    enabled: boolean;
    variants: string[];
    currentVariant: string;
  };
  analytics?: {
    trackingId?: string;
    events: string[];
    conversionGoals: string[];
  };
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: string;
  };
}

export interface FunnelVersion {
  id: string;
  funnelId: string;
  version: number;
  data: SchemaDrivenFunnelData;
  createdAt: Date;
  description?: string;
  isAutoSave: boolean;
}

export interface AutoSaveState {
  isEnabled: boolean;
  interval: number; // em segundos
  lastSave: Date | null;
  pendingChanges: boolean;
  errorCount: number;
}

class SchemaDrivenFunnelService {
  private baseUrl = 'http://localhost:3001/api/schema-driven';
  private localStorageKey = 'schema-driven-funnel';
  private versionStorageKey = 'schema-driven-versions';
  private autoSaveInterval: NodeJS.Timeout | null = null;
  private autoSaveState: AutoSaveState = {
    isEnabled: false, // Auto-save desabilitado por padrão
    interval: 10, // 10 segundos
    lastSave: null,
    pendingChanges: false,
    errorCount: 0
  };

  constructor() {
    // Limpeza imediata na inicialização
    this.performEmergencyCleanup();
  }

  // Auto-save management
  enableAutoSave(interval: number = 10) {
    this.autoSaveState.isEnabled = true;
    this.autoSaveState.interval = interval;
    // Limpeza inicial ao habilitar auto-save
    this.cleanupLocalStorage();
    this.startAutoSaveInterval();
  }

  disableAutoSave() {
    this.autoSaveState.isEnabled = false;
    if (this.autoSaveInterval) {
      clearInterval(this.autoSaveInterval);
      this.autoSaveInterval = null;
    }
  }

  private startAutoSaveInterval() {
    if (this.autoSaveInterval) {
      clearInterval(this.autoSaveInterval);
    }

    this.autoSaveInterval = setInterval(() => {
      if (this.autoSaveState.pendingChanges && this.autoSaveState.isEnabled) {
        this.performAutoSave();
      }
    }, this.autoSaveState.interval * 1000);
  }

  private async performAutoSave() {
    try {
      const localData = this.getLocalFunnel();
      if (localData) {
        await this.saveFunnel(localData, true);
        this.autoSaveState.pendingChanges = false;
        this.autoSaveState.lastSave = new Date();
        this.autoSaveState.errorCount = 0;
        console.log('🔄 Auto-save successful:', new Date().toLocaleTimeString());
      }
    } catch (error) {
      this.autoSaveState.errorCount++;
      console.error('❌ Auto-save failed:', error);
      
      // Se muitos erros, aumentar intervalo
      if (this.autoSaveState.errorCount > 3) {
        this.autoSaveState.interval = Math.min(this.autoSaveState.interval * 2, 60);
        this.startAutoSaveInterval();
      }
    }
  }

  markPendingChanges() {
    this.autoSaveState.pendingChanges = true;
  }

  hasPendingChanges(): boolean {
    return this.autoSaveState.pendingChanges;
  }

  clearPendingChanges() {
    this.autoSaveState.pendingChanges = false;
  }

  getAutoSaveState(): AutoSaveState {
    return { ...this.autoSaveState };
  }

  // Local storage operations
  saveLocalFunnel(funnel: SchemaDrivenFunnelData): void {
    try {
      localStorage.setItem(this.localStorageKey, JSON.stringify({
        ...funnel,
        lastModified: new Date().toISOString()
      }));
      this.markPendingChanges();
      // console.log('💾 Funnel saved locally');
    } catch (error) {
      console.error('❌ Failed to save funnel locally:', error);
    }
  }

  getLocalFunnel(): SchemaDrivenFunnelData | null {
    try {
      const stored = localStorage.getItem(this.localStorageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...parsed,
          lastModified: new Date(parsed.lastModified),
          createdAt: new Date(parsed.createdAt)
        };
      }
      return null;
    } catch (error) {
      console.error('❌ Failed to load funnel from local storage:', error);
      return null;
    }
  }

  clearLocalFunnel(): void {
    localStorage.removeItem(this.localStorageKey);
    this.autoSaveState.pendingChanges = false;
  }

  // Limpeza preventiva do localStorage
  private cleanupLocalStorage(): void {
    try {
      // Remover versões antigas (mais de 7 dias)
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - 7);
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith(this.versionStorageKey)) {
          try {
            const versions = JSON.parse(localStorage.getItem(key) || '[]');
            const recentVersions = versions.filter((v: any) => 
              new Date(v.createdAt) > cutoffDate
            ).slice(-5); // Manter apenas 5 versões recentes
            
            if (recentVersions.length === 0) {
              localStorage.removeItem(key);
            } else if (recentVersions.length !== versions.length) {
              localStorage.setItem(key, JSON.stringify(recentVersions));
            }
          } catch {
            localStorage.removeItem(key);
          }
        }
      }
    } catch (error) {
      console.warn('⚠️ Error during localStorage cleanup:', error);
    }
  }

  // Limpeza de emergência em caso de quota exceeded
  private emergencyCleanup(): void {
    try {
      console.log('🚨 Emergency cleanup initiated');
      
      // Remover todas as versões antigas
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith(this.versionStorageKey)) {
          keysToRemove.push(key);
        }
      }
      
      keysToRemove.forEach(key => {
        try {
          localStorage.removeItem(key);
        } catch {
          // Ignorar erros individuais
        }
      });
      
      console.log(`🧹 Removed ${keysToRemove.length} version history entries`);
    } catch (error) {
      console.error('❌ Emergency cleanup failed:', error);
    }
  }

  // Limpeza mais agressiva na inicialização
  private performEmergencyCleanup(): void {
    try {
      console.log('🧹 Performing initial localStorage cleanup...');
      let removed = 0;
      
      // Obter todas as chaves de uma vez para evitar problemas de índice
      const allKeys: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) allKeys.push(key);
      }
      
      // Remover todas as versões antigas
      allKeys.forEach(key => {
        if (key.startsWith(this.versionStorageKey)) {
          try {
            localStorage.removeItem(key);
            removed++;
          } catch {
            // Ignorar erros
          }
        }
      });
      
      if (removed > 0) {
        console.log(`🧹 Cleared ${removed} version entries from localStorage`);
      }
    } catch (error) {
      console.error('❌ Initial cleanup failed:', error);
    }
  }

  // Version management
  saveVersion(funnel: SchemaDrivenFunnelData, description?: string, isAutoSave: boolean = false): FunnelVersion {
    const version: FunnelVersion = {
      id: `version-${Date.now()}`,
      funnelId: funnel.id,
      version: funnel.version + 1,
      data: { ...funnel, version: funnel.version + 1 },
      createdAt: new Date(),
      description: description || (isAutoSave ? 'Auto-save' : 'Manual save'),
      isAutoSave
    };

    try {
      // Limpeza proativa do localStorage antes de salvar
      this.cleanupLocalStorage();
      
      const versions = this.getVersionHistory(funnel.id);
      versions.push(version);
      
      // Manter apenas as últimas 10 versões para economizar espaço
      const limitedVersions = versions.slice(-10);
      localStorage.setItem(`${this.versionStorageKey}-${funnel.id}`, JSON.stringify(limitedVersions));
      
      // console.log(`📋 Version ${version.version} saved`);
      return version;
    } catch (error) {
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        console.warn('⚠️ LocalStorage quota exceeded, performing emergency cleanup');
        this.emergencyCleanup();
        // Tentar salvar novamente apenas a versão atual sem histórico
        try {
          localStorage.setItem(`${this.versionStorageKey}-${funnel.id}`, JSON.stringify([version]));
          console.log(`📋 Version ${version.version} saved after cleanup`);
        } catch (secondError) {
          console.error('❌ Failed to save even after cleanup:', secondError);
        }
      } else {
        console.error('❌ Failed to save version:', error);
      }
      return version;
    }
  }

  getVersionHistory(funnelId: string): FunnelVersion[] {
    try {
      const stored = localStorage.getItem(`${this.versionStorageKey}-${funnelId}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.map((v: any) => ({
          ...v,
          createdAt: new Date(v.createdAt),
          data: {
            ...v.data,
            lastModified: new Date(v.data.lastModified),
            createdAt: new Date(v.data.createdAt)
          }
        }));
      }
      return [];
    } catch (error) {
      console.error('❌ Failed to load version history:', error);
      return [];
    }
  }

  restoreVersion(funnelId: string, versionId: string): SchemaDrivenFunnelData | null {
    const versions = this.getVersionHistory(funnelId);
    const version = versions.find(v => v.id === versionId);
    
    if (version) {
      this.saveLocalFunnel(version.data);
      console.log(`🔄 Restored to version ${version.version}`);
      return version.data;
    }
    
    return null;
  }

  // Backend operations - USANDO SUPABASE
  async saveFunnel(funnel: SchemaDrivenFunnelData, isAutoSave: boolean = false): Promise<SchemaDrivenFunnelData> {
    console.log('💾 [DEBUG] saveFunnel called:', { 
      funnelId: funnel.id, 
      isAutoSave, 
      funnelName: funnel.name,
      pagesCount: funnel.pages?.length || 0
    });

    try {
      // Salvar no Supabase
      console.log('🌐 [DEBUG] Saving to Supabase...');
      
      // Prepare data for the correct 'funnels' table schema
      const supabaseData = {
        id: funnel.id,
        name: funnel.name,
        description: funnel.description || '',
        settings: {
          ...funnel.config,
          pages: funnel.pages || []
        },
        is_published: funnel.config?.isPublished || false,
        updated_at: new Date().toISOString()
      };

      console.log('� [DEBUG] Supabase data:', supabaseData);

      // Verificar se já existe
      const { data: existing } = await supabase
        .from('funnels')
        .select('id')
        .eq('id', funnel.id)
        .single();

      let result;
      if (existing) {
        // Atualizar existente
        const { data, error } = await supabase
          .from('funnels')
          .update(supabaseData)
          .eq('id', funnel.id)
          .select()
          .single();
        
        if (error) throw error;
        result = data;
      } else {
        // Criar novo
        const { data, error } = await supabase
          .from('funnels')
          .insert([{ ...supabaseData, created_at: new Date().toISOString() }])
          .select()
          .single();
        
        if (error) throw error;
        result = data;
      }

      console.log('✅ [DEBUG] Supabase response:', result);

      const savedFunnel = {
        ...funnel,
        lastModified: new Date(),
        version: funnel.version + (isAutoSave ? 0 : 1)
      };

      // Salvar versão se sucesso no Supabase
      if (!isAutoSave) {
        this.saveVersion(savedFunnel, 'Manual save to Supabase');
      }

      // Atualizar localStorage com dados salvos
      this.saveLocalFunnel(savedFunnel);
      
      console.log('☁️ [DEBUG] Funnel saved to Supabase successfully');
      return savedFunnel;

    } catch (error) {
      console.error('❌ [DEBUG] Supabase save failed:', error);
      console.warn('⚠️ Supabase unavailable, saving locally only:', error);
      
      // Fallback para localStorage
      const updatedFunnel = {
        ...funnel,
        lastModified: new Date(),
        version: funnel.version + (isAutoSave ? 0 : 1)
      };
      
      this.saveLocalFunnel(updatedFunnel);
      
      if (!isAutoSave) {
        this.saveVersion(updatedFunnel, 'Manual save (offline)');
      }
      
      console.log('💾 [DEBUG] Funnel saved locally as fallback');
      return updatedFunnel;
    }
  }

  async loadFunnel(funnelId: string): Promise<SchemaDrivenFunnelData | null> {
    // Validar funnelId para evitar requisições inválidas
    if (!funnelId || typeof funnelId !== 'string' || funnelId === '[object Object]') {
      console.error('❌ Invalid funnelId provided to loadFunnel:', funnelId);
      return null;
    }

    try {
      // Tentar carregar do Supabase primeiro
      console.log('🌐 [DEBUG] Loading from Supabase...');
      const { data, error } = await supabase
        .from('funnels')
        .select('*')
        .eq('id', funnelId)
        .single();
      
      if (error) {
        console.warn('⚠️ Supabase error:', error);
        throw error;
      }

      if (data) {
        console.log('✅ [DEBUG] Found in Supabase:', data);
        
        // Converter dados do Supabase para o formato esperado
        const funnel: SchemaDrivenFunnelData = {
          id: data.id,
          name: data.title,
          description: data.description || '',
          pages: data.data?.pages || [],
          config: data.data?.config || {},
          theme: 'default',
          isPublished: data.is_published || false,
          version: 1,
          lastModified: new Date(data.updated_at),
          createdAt: new Date(data.created_at)
        };
        
        // Atualizar localStorage com dados mais recentes
        try {
          this.saveLocalFunnel(funnel);
        } catch (saveError) {
          console.warn('⚠️ Failed to save to localStorage, continuing without cache:', saveError);
        }
        console.log('☁️ Funnel loaded from Supabase');
        return funnel;
      }
    } catch (error) {
      console.warn('⚠️ Supabase unavailable, trying local storage:', error);
    }

    // Fallback para localStorage
    const localFunnel = this.getLocalFunnel();
    if (localFunnel && localFunnel.id === funnelId) {
      console.log('💾 Funnel loaded from local storage');
      return localFunnel;
    }

    console.log('❌ Funnel not found in Supabase or localStorage');
    return null;
  }

  async createFunnel(data: Omit<SchemaDrivenFunnelData, 'id' | 'version' | 'lastModified' | 'createdAt'>): Promise<SchemaDrivenFunnelData> {
    const now = new Date();
    const funnel: SchemaDrivenFunnelData = {
      ...data,
      id: `funnel-${Date.now()}`,
      version: 1,
      lastModified: now,
      createdAt: now
    };

    try {
      // Tentar criar no Supabase
      console.log('🌐 [DEBUG] Creating in Supabase...');
      
      const supabaseData = {
        id: funnel.id,
        name: funnel.name,
        description: funnel.description || '',
        settings: {
          ...funnel.config,
          pages: funnel.pages || []
        },
        is_published: funnel.isPublished || false,
        created_at: now.toISOString(),
        updated_at: now.toISOString()
      };

      const { data: result, error } = await supabase
        .from('funnels')
        .insert([supabaseData])
        .select()
        .single();

      if (error) throw error;

      console.log('✅ [DEBUG] Created in Supabase:', result);
      
      this.saveLocalFunnel(funnel);
      this.saveVersion(funnel, 'Initial creation');
      console.log('☁️ Funnel created in Supabase');
      return funnel;
    } catch (error) {
      console.warn('⚠️ Supabase unavailable, creating locally only:', error);
      console.warn('⚠️ Backend unavailable, creating locally:', error);
    }

    // Fallback para criação local
    this.saveLocalFunnel(funnel);
    this.saveVersion(funnel, 'Initial creation (offline)');
    console.log('💾 Funnel created locally');
    return funnel;
  }

  // Método removido - agora usamos Supabase diretamente nos métodos saveFunnel/loadFunnel

  // Utility methods
  createDefaultFunnel(): SchemaDrivenFunnelData {
    const now = new Date();
    
    return {
      id: `funnel-${Date.now()}`,
      name: 'Quiz CaktoQuiz - Descubra Seu Estilo',
      description: 'Funil completo para descoberta do estilo pessoal - 21 etapas modulares',
      theme: 'caktoquiz',
      isPublished: false,
      pages: this.createModularPages(),
      config: {
        name: 'Quiz CaktoQuiz - Descubra Seu Estilo',
        description: 'Funil completo para descoberta do estilo pessoal - 21 etapas modulares',
        isPublished: false,
        theme: 'caktoquiz',
        primaryColor: '#B89B7A',
        secondaryColor: '#432818',
        fontFamily: 'Inter, sans-serif',
        analytics: {
          trackingId: 'FB_PIXEL_ID',
          events: ['page_view', 'quiz_start', 'quiz_complete', 'conversion'],
          conversionGoals: ['quiz_completion', 'purchase']
        },
        seo: {
          title: 'Descubra Seu Estilo Pessoal - Quiz CaktoQuiz',
          description: 'Descubra seu estilo pessoal em poucos minutos com nosso quiz especializado.',
          keywords: ['estilo pessoal', 'moda', 'quiz', 'consultoria']
        }
      },
      version: 1,
      lastModified: now,
      createdAt: now
    };
  }

  /**
   * Gera um ID único para páginas do funil
   */
  private generateUniquePageId(baseName: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `${baseName}-${timestamp}-${random}`;
  }

  /**
   * Cria todas as 21 páginas usando APENAS componentes inline modulares ES7+
   * Arquitetura 100% modular com componentes independentes e responsivos
   */
  private createModularPages(): SchemaDrivenPageData[] {
    console.log('🏗️ [ES7+] Iniciando criação das 21 etapas modulares...');
    console.log('🔍 DEBUG: REAL_QUIZ_QUESTIONS length:', REAL_QUIZ_QUESTIONS?.length);
    console.log('🔍 DEBUG: STRATEGIC_QUESTIONS length:', STRATEGIC_QUESTIONS?.length);
    
    const pages: SchemaDrivenPageData[] = [];

    // ==========================================
    // ETAPA 1: INTRODUÇÃO (COLETA DO NOME)
    // ==========================================
    pages.push({
      id: this.generateUniquePageId('etapa-1-intro'),
      name: 'Introdução',
      title: 'Etapa 1: Introdução - Coleta do Nome',
      type: 'intro',
      order: 1,
      blocks: [
        {
          id: 'intro-header',
          type: 'quiz-intro-header',
          properties: {
            logoUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
            logoAlt: 'Logo Gisele Galvão',
            logoWidth: 96,
            logoHeight: 96,
            progressValue: 0,
            progressMax: 100,
            showBackButton: false
          }
        },
        {
          id: 'intro-decorative-spacer',
          type: 'spacer',
          properties: {
            height: 4,
            backgroundColor: '#B89B7A',
            marginTop: 0,
            marginBottom: 24
          }
        },
        {
          id: 'intro-main-heading',
          type: 'text-inline',
          properties: {
            content: '<span style="color: #B89B7A; font-weight: 700;">Chega</span> de um guarda-roupa lotado e da sensação de que nada combina com você.',
            fontSize: 'text-3xl',
            fontWeight: 'font-bold',
            textAlign: 'text-center',
            color: '#432818',
            marginBottom: 24
          }
        },
        {
          id: 'intro-hero-image',
          type: 'image-display-inline',
          properties: {
            src: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1746838118/20250509_2137_Desordem_e_Reflex%C3%A3o_simple_compose_01jtvszf8sfaytz493z9f16rf2_z1c2up.webp',
            alt: 'Transforme seu guarda-roupa',
            width: 600,
            height: 400,
            className: 'object-cover w-full h-auto rounded-lg mx-auto'
          }
        },
        {
          id: 'intro-subtitle',
          type: 'text-inline',
          properties: {
            content: 'Em poucos minutos, descubra seu Estilo Predominante — e aprenda a montar looks que realmente refletem sua essência, com praticidade e confiança.',
            fontSize: 'text-lg',
            textAlign: 'text-center',
            color: '#432818',
            marginTop: 16,
            marginBottom: 32
          }
        },
        {
          id: 'intro-name-input',
          type: 'form-input',
          properties: {
            label: 'NOME',
            placeholder: 'Digite seu nome aqui...',
            required: true,
            inputType: 'text',
            helperText: '',
            name: 'userName'
          }
        },
        {
          id: 'intro-cta-button',
          type: 'button-inline',
          properties: {
            text: 'Quero Descobrir meu Estilo Agora!',
            variant: 'primary',
            size: 'large',
            fullWidth: true,
            backgroundColor: '#B89B7A',
            textColor: '#ffffff',
            requiresValidInput: true
          }
        }
      ],
      settings: {
        showProgress: false,
        progressValue: 0,
        backgroundColor: '#ffffff',
        textColor: '#432818',
        maxWidth: 'max-w-4xl',
        padding: 'p-6'
      }
    });

    // ==========================================
    // ETAPAS 2-11: QUESTÕES PRINCIPAIS (10 QUESTÕES)
    // Componentes: quiz-intro-header + heading-inline + text-inline + options-grid + button-inline
    // ==========================================
    REAL_QUIZ_QUESTIONS.forEach((questionData, index) => {
      console.log(`🎯 [ES7+] Criando questão ${index + 1}:`, questionData.question);
      const currentProgress = 5 + (index + 1) * 5; // 5%, 10%, 15%... até 55%
      
      pages.push({
        id: this.generateUniquePageId(`etapa-${index + 2}-questao-${index + 1}`),
        name: `Questão ${index + 1}`,
        title: `Etapa ${index + 2}: ${questionData.question}`,
        type: 'question',
        order: index + 2,
        blocks: [
          // 1. Cabeçalho modular com logo e progresso
          {
            id: `question-${index + 1}-header`,
            type: 'quiz-intro-header',
            properties: {
              logoUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
              logoAlt: 'Logo Gisele Galvão',
              logoWidth: 96,
              logoHeight: 96,
              progressValue: currentProgress,
              progressMax: 100,
              showBackButton: true
            }
          },
          // 2. Título da questão (componente inline)
          {
            id: `question-${index + 1}-title`,
            type: 'heading-inline',
            properties: {
              content: questionData.question,
              level: 'h2',
              fontSize: 'text-2xl',
              fontWeight: 'font-bold',
              textAlign: 'text-center',
              color: '#432818',
              marginBottom: 8
            }
          },
          // 3. Indicador de progresso textual (componente inline)
          {
            id: `question-${index + 1}-progress-label`,
            type: 'text-inline',
            properties: {
              content: `Questão ${index + 1} de 10`,
              fontSize: 'text-sm',
              textAlign: 'text-center',
              color: '#6B7280',
              marginBottom: 24
            }
          },
          // 4. Grid de opções responsivo (máx 2 colunas)
          {
            id: `question-${index + 1}-options`,
            type: 'options-grid',
            properties: {
              options: questionData.options.map(opt => ({
                id: opt.id,
                text: opt.text,
                value: opt.value || opt.id,
                imageUrl: (opt as any).imageUrl || undefined,
                category: (opt as any).category || opt.value || opt.id
              })),
              columns: questionData.type === 'both' ? 2 : 1,
              showImages: questionData.type === 'both' || questionData.type === undefined,
              imageSize: 'large',
              multipleSelection: questionData.multipleSelection || false,
              maxSelections: questionData.maxSelections || 1,
              minSelections: 1,
              validationMessage: `Selecione ${questionData.maxSelections || 1} opç${(questionData.maxSelections || 1) > 1 ? 'ões' : 'ão'}`,
              gridGap: 16,
              responsiveColumns: true // Força máximo 2 colunas
            }
          },
          // 5. Botão continuar modular (componente inline)
          {
            id: `question-${index + 1}-continue`,
            type: 'button-inline',
            properties: {
              text: 'Continuar',
              variant: 'primary',
              size: 'large',
              fullWidth: true,
              backgroundColor: '#B89B7A',
              textColor: '#ffffff',
              disabled: true,
              requiresValidSelection: true
            }
          }
        ],
        settings: {
          showProgress: true,
          progressValue: currentProgress,
          backgroundColor: '#ffffff',
          textColor: '#432818',
          maxWidth: 'max-w-4xl',
          padding: 'p-6'
        }
      });
    });

    // ==========================================
    // ETAPA 12: TRANSIÇÃO PRINCIPAL
    // Componentes: quiz-intro-header + heading-inline + text-inline + progress-inline + button-inline
    // ==========================================
    pages.push({
      id: this.generateUniquePageId('etapa-12-transicao-principal'),
      name: 'Transição Principal',
      title: 'Etapa 12: Transição - Agora vamos conhecer você melhor',
      type: 'custom',
      order: 12,
      blocks: [
        // 1. Cabeçalho modular com logo e progresso
        {
          id: 'transition-main-header',
          type: 'quiz-intro-header',
          properties: {
            logoUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
            logoAlt: 'Logo Gisele Galvão',
            logoWidth: 96,
            logoHeight: 96,
            progressValue: 60,
            progressMax: 100,
            showBackButton: true
          }
        },
        // 2. Título da transição (componente inline)
        {
          id: 'transition-main-title',
          type: 'heading-inline',
          properties: {
            content: 'Agora vamos conhecer você melhor',
            level: 'h2',
            fontSize: 'text-2xl',
            fontWeight: 'font-bold',
            textAlign: 'text-center',
            color: '#432818',
            marginBottom: 16
          }
        },
        // 3. Texto motivacional (componente inline)
        {
          id: 'transition-motivation',
          type: 'text-inline',
          properties: {
            content: 'Suas escolhas até agora já revelam muito sobre seu estilo. Agora vamos aprofundar para criar um perfil ainda mais preciso.',
            fontSize: 'text-lg',
            textAlign: 'text-center',
            color: '#6B7280',
            marginBottom: 32
          }
        },
        // 4. Barra de progresso visual (componente inline)
        {
          id: 'transition-progress-bar',
          type: 'progress-inline',
          properties: {
            progressValue: 60,
            progressMax: 100,
            showPercentage: true,
            color: '#B89B7A',
            backgroundColor: '#F5F5F5',
            height: 8,
            marginBottom: 32
          }
        },
        // 5. Botão continuar (componente inline)
        {
          id: 'transition-continue',
          type: 'button-inline',
          properties: {
            text: 'Continuar Análise',
            variant: 'primary',
            size: 'large',
            fullWidth: true,
            backgroundColor: '#B89B7A',
            textColor: '#ffffff'
          }
        }
      ],
      settings: {
        showProgress: true,
        progressValue: 60,
        backgroundColor: '#ffffff',
        textColor: '#432818',
        maxWidth: 'max-w-4xl',
        padding: 'p-6'
      }
    });

    // ==========================================
    // ETAPAS 13-18: QUESTÕES ESTRATÉGICAS (6 QUESTÕES)
    // Componentes: quiz-intro-header + heading-inline + text-inline + options-grid + button-inline
    // ==========================================
    STRATEGIC_QUESTIONS.forEach((questionData, index) => {
      console.log(`🎯 [ES7+] Criando questão estratégica ${index + 1}:`, questionData.question);
      const currentProgress = 65 + (index * 5); // 65%, 70%, 75%... até 90%
      
      pages.push({
        id: this.generateUniquePageId(`etapa-${index + 13}-estrategica-${index + 1}`),
        name: `Questão Estratégica ${index + 1}`,
        title: `Etapa ${index + 13}: ${questionData.question}`,
        type: 'question',
        order: index + 13,
        blocks: [
          // 1. Cabeçalho modular com logo e progresso
          {
            id: `strategic-${index + 1}-header`,
            type: 'quiz-intro-header',
            properties: {
              logoUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
              logoAlt: 'Logo Gisele Galvão',
              logoWidth: 96,
              logoHeight: 96,
              progressValue: currentProgress,
              progressMax: 100,
              showBackButton: true
            }
          },
          // 2. Título da questão estratégica (componente inline)
          {
            id: `strategic-${index + 1}-title`,
            type: 'heading-inline',
            properties: {
              content: questionData.question,
              level: 'h2',
              fontSize: 'text-2xl',
              fontWeight: 'font-bold',
              textAlign: 'text-center',
              color: '#432818',
              marginBottom: 8
            }
          },
          // 3. Indicador de progresso (componente inline)
          {
            id: `strategic-${index + 1}-progress-label`,
            type: 'text-inline',
            properties: {
              content: `Questão estratégica ${index + 1} de 6`,
              fontSize: 'text-sm',
              textAlign: 'text-center',
              color: '#6B7280',
              marginBottom: 24
            }
          },
          // 4. Grid de opções (estilo simplificado)
          {
            id: `strategic-${index + 1}-options`,
            type: 'options-grid',
            properties: {
              options: questionData.options.map(opt => ({
                id: opt.id,
                text: opt.text,
                value: opt.value || opt.id,
                category: (opt as any).category || opt.value || opt.id
              })),
              columns: 1,
              showImages: false,
              multipleSelection: false,
              maxSelections: 1,
              minSelections: 1,
              validationMessage: 'Selecione uma opção',
              gridGap: 12,
              responsiveColumns: true
            }
          },
          // 5. Botão continuar (componente inline)
          {
            id: `strategic-${index + 1}-continue`,
            type: 'button-inline',
            properties: {
              text: 'Continuar',
              variant: 'primary',
              size: 'large',
              fullWidth: true,
              backgroundColor: '#B89B7A',
              textColor: '#ffffff',
              disabled: true,
              requiresValidSelection: true
            }
          }
        ],
        settings: {
          showProgress: true,
          progressValue: currentProgress,
          backgroundColor: '#ffffff',
          textColor: '#432818',
          maxWidth: 'max-w-4xl',
          padding: 'p-6'
        }
      });
    });

    // ==========================================
    // ETAPA 19: TRANSIÇÃO FINAL 
    // Componentes: quiz-intro-header + heading-inline + progress-inline + text-inline + loading-animation + button-inline
    // ==========================================
    // ==========================================
    // ETAPA 19: TRANSIÇÃO FINAL 
    // Componentes: quiz-intro-header + heading-inline + progress-inline + text-inline + loading-animation + button-inline
    // ==========================================
    pages.push({
      id: this.generateUniquePageId('etapa-19-transicao-final'),
      name: 'Transição Final',
      title: 'Etapa 19: Preparando seu resultado personalizado',
      type: 'custom',
      order: 19,
      blocks: [
        // 1. Cabeçalho com progresso completo
        {
          id: 'final-transition-header',
          type: 'quiz-intro-header',
          properties: {
            logoUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
            logoAlt: 'Logo Gisele Galvão',
            logoWidth: 96,
            logoHeight: 96,
            progressValue: 95,
            progressMax: 100,
            showBackButton: false
          }
        },
        // 2. Título da transição final
        {
          id: 'final-transition-title',
          type: 'heading-inline',
          properties: {
            content: 'Analisando suas respostas...',
            level: 'h2',
            fontSize: 'text-2xl',
            fontWeight: 'font-bold',
            textAlign: 'text-center',
            color: '#432818',
            marginBottom: 16
          }
        },
        // 3. Barra de carregamento animada
        {
          id: 'final-transition-progress',
          type: 'progress-inline',
          properties: {
            progressValue: 95,
            progressMax: 100,
            showPercentage: true,
            animated: true,
            color: '#B89B7A',
            backgroundColor: '#F5F5F5',
            height: 12,
            marginBottom: 24
          }
        },
        // 4. Texto de aguardo
        {
          id: 'final-transition-message',
          type: 'text-inline',
          properties: {
            content: 'Estamos criando seu perfil personalizado baseado nas suas 18 respostas...',
            fontSize: 'text-lg',
            textAlign: 'text-center',
            color: '#6B7280',
            marginBottom: 32
          }
        },
        // 5. Loading animation placeholder
        {
          id: 'final-transition-loading',
          type: 'loading-animation',
          properties: {
            type: 'spinner',
            size: 'large',
            color: '#B89B7A',
            duration: 3000
          }
        },
        // 6. Botão que aparece após 3 segundos
        {
          id: 'final-transition-reveal',
          type: 'button-inline',
          properties: {
            text: 'Ver Meu Resultado Personalizado',
            variant: 'primary',
            size: 'large',
            fullWidth: true,
            backgroundColor: '#B89B7A',
            textColor: '#ffffff',
            delayShow: 3000 // Aparece após 3 segundos
          }
        }
      ],
      settings: {
        showProgress: true,
        progressValue: 95,
        backgroundColor: '#ffffff',
        textColor: '#432818',
        maxWidth: 'max-w-4xl',
        padding: 'p-6'
      }
    });

    // ==========================================
    // ETAPA 20: PÁGINA DE RESULTADO PERSONALIZADO
    // Componentes inline específicos para resultado
    // ==========================================
    pages.push({
      id: this.generateUniquePageId('etapa-20-resultado'),
      name: 'Resultado Personalizado',
      title: 'Etapa 20: Seu Estilo Predominante Identificado',
      type: 'result',
      order: 20,
      blocks: [
        // 1. Header de resultado com logo e nome do usuário
        {
          id: 'result-header-inline',
          type: 'result-header-inline',
          properties: {
            logoUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
            logoAlt: 'Logo Gisele Galvão',
            logoWidth: 96,
            logoHeight: 96,
            userName: 'dinamicUserName', // Será preenchido dinamicamente
            showProgress: false
          }
        },
        // 2. Card principal do resultado (85% match)
        {
          id: 'result-main-card',
          type: 'result-card-inline',
          properties: {
            title: 'Seu Estilo Predominante',
            styleName: 'dinamicStyleName', // Será preenchido dinamicamente
            percentage: 85,
            description: 'Baseado nas suas respostas, identificamos que você tem características predominantes do estilo...',
            imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/2_ziffwx.webp',
            showMatch: true,
            animateReveal: true
          }
        },
        // 3. Características do estilo (lista com ícones)
        {
          id: 'result-characteristics',
          type: 'text-inline',
          properties: {
            content: `
              <div class="characteristics-list">
                <h3 class="text-xl font-semibold mb-4 text-[#432818]">Suas principais características:</h3>
                <ul class="space-y-3">
                  <li class="flex items-center">
                    <span class="w-6 h-6 bg-[#B89B7A] rounded-full flex items-center justify-center text-white text-sm mr-3">✓</span>
                    Elegância natural e sofisticação
                  </li>
                  <li class="flex items-center">
                    <span class="w-6 h-6 bg-[#B89B7A] rounded-full flex items-center justify-center text-white text-sm mr-3">✓</span>
                    Preferência por peças atemporais
                  </li>
                  <li class="flex items-center">
                    <span class="w-6 h-6 bg-[#B89B7A] rounded-full flex items-center justify-center text-white text-sm mr-3">✓</span>
                    Valoriza qualidade sobre quantidade
                  </li>
                </ul>
              </div>
            `,
            fontSize: 'text-base',
            textAlign: 'text-left',
            color: '#432818',
            marginBottom: 32
          }
        },
        // 4. Imagem de transformação/guia
        {
          id: 'result-transformation-image',
          type: 'image-display-inline',
          properties: {
            src: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071344/GUIA_NATURAL_fzp6fc.webp',
            alt: 'Guia de transformação do seu estilo',
            width: 600,
            height: 400,
            className: 'object-cover w-full h-auto rounded-lg mx-auto shadow-lg'
          }
        },
        // 5. Título dos estilos secundários
        {
          id: 'result-secondary-title',
          type: 'heading-inline',
          properties: {
            content: 'Seus Estilos Secundários',
            level: 'h3',
            fontSize: 'text-xl',
            fontWeight: 'font-semibold',
            textAlign: 'text-center',
            color: '#432818',
            marginTop: 32,
            marginBottom: 16
          }
        },
        // 6-8. Cards dos estilos secundários (3 cards)
        {
          id: 'result-secondary-1',
          type: 'style-card-inline',
          properties: {
            styleName: 'Moderno',
            percentage: 20,
            description: 'Traços modernos na sua personalidade',
            imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/3_moderno.webp',
            compact: true
          }
        },
        {
          id: 'result-secondary-2',
          type: 'style-card-inline',
          properties: {
            styleName: 'Casual',
            percentage: 15,
            description: 'Praticidade em situações do dia a dia',
            imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/4_casual.webp',
            compact: true
          }
        },
        {
          id: 'result-secondary-3',
          type: 'style-card-inline',
          properties: {
            styleName: 'Romântico',
            percentage: 10,
            description: 'Toques delicados e femininos',
            imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/5_romantico.webp',
            compact: true
          }
        },
        // 9. Motivação/transição para oferta
        {
          id: 'result-transition-text',
          type: 'text-inline',
          properties: {
            content: 'Agora que você conhece seu estilo predominante, é hora de aplicar esse conhecimento no seu guarda-roupa e criar looks que realmente refletem sua essência.',
            fontSize: 'text-lg',
            textAlign: 'text-center',
            color: '#432818',
            marginTop: 32,
            marginBottom: 24
          }
        },
        // 10. CTA principal
        {
          id: 'result-main-cta',
          type: 'button-inline',
          properties: {
            text: 'QUERO TRANSFORMAR MEU GUARDA-ROUPA AGORA',
            variant: 'primary',
            size: 'large',
            fullWidth: true,
            backgroundColor: '#B89B7A',
            textColor: '#ffffff',
            pulse: true // Animação de destaque
          }
        }
      ],
      settings: {
        showProgress: false,
        progressValue: 100,
        backgroundColor: '#ffffff',
        textColor: '#432818',
        maxWidth: 'max-w-4xl',
        padding: 'p-6'
      }
    });

    // ==========================================
    // ETAPA 21: PÁGINA DE OFERTA COMERCIAL
    // Componentes inline específicos para conversão
    // ==========================================
    pages.push({
      id: this.generateUniquePageId('etapa-21-oferta'),
      name: 'Oferta Especial',
      title: 'Etapa 21: Oferta Personalizada Para Você',
      type: 'offer',
      order: 21,
      blocks: [
        // 1. Título da oferta especial
        {
          id: 'offer-main-title',
          type: 'heading-inline',
          properties: {
            content: 'Oferta Especial Para Você!',
            level: 'h1',
            fontSize: 'text-3xl',
            fontWeight: 'font-bold',
            textAlign: 'text-center',
            color: '#432818',
            marginBottom: 16
          }
        },
        // 2. Subtítulo personalizado com estilo
        {
          id: 'offer-subtitle',
          type: 'text-inline',
          properties: {
            content: 'Como você tem o estilo <strong class="text-[#B89B7A]">ELEGANTE</strong> predominante, criei uma oferta especial para você transformar seu guarda-roupa.',
            fontSize: 'text-lg',
            textAlign: 'text-center',
            color: '#432818',
            marginBottom: 24
          }
        },
        // 3. Imagem do produto/guia
        {
          id: 'offer-product-image',
          type: 'image-display-inline',
          properties: {
            src: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071344/GUIA_COMPLETO_PRODUTO.webp',
            alt: 'Guia Completo do Seu Estilo',
            width: 500,
            height: 400,
            className: 'object-cover w-full h-auto rounded-lg mx-auto shadow-xl'
          }
        },
        // 4. Timer de urgência (15 minutos)
        {
          id: 'offer-countdown',
          type: 'countdown-inline',
          properties: {
            title: 'Esta oferta expira em:',
            targetMinutes: 15,
            showLabels: true,
            urgencyColor: 'red',
            size: 'large',
            centerAlign: true,
            onExpire: 'redirect' // Redireciona quando expirar
          }
        },
        // 5. Bloco de preços com desconto
        {
          id: 'offer-pricing',
          type: 'quiz-offer-pricing-inline',
          properties: {
            originalPrice: 197,
            discountedPrice: 97,
            discountPercentage: 51,
            currency: 'BRL',
            installments: {
              number: 12,
              value: 8.83
            },
            features: [
              'Guia Completo do Seu Estilo (PDF)',
              'Análise Personalizada Detalhada',
              'Dicas de Combinações',
              'Lista de Compras Estratégicas',
              'Suporte por 30 dias'
            ],
            highlighted: true
          }
        },
        // 6. Lista de benefícios
        {
          id: 'offer-benefits-title',
          type: 'heading-inline',
          properties: {
            content: 'O que você vai receber:',
            level: 'h3',
            fontSize: 'text-xl',
            fontWeight: 'font-semibold',
            textAlign: 'text-center',
            color: '#432818',
            marginTop: 32,
            marginBottom: 16
          }
        },
        {
          id: 'offer-benefits-list',
          type: 'text-inline',
          properties: {
            content: `
              <div class="benefits-grid grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="benefit-item flex items-start p-4 bg-gray-50 rounded-lg">
                  <span class="text-2xl mr-3">📚</span>
                  <div>
                    <h4 class="font-semibold text-[#432818]">Guia Completo</h4>
                    <p class="text-sm text-gray-600">Manual com todas as dicas do seu estilo</p>
                  </div>
                </div>
                <div class="benefit-item flex items-start p-4 bg-gray-50 rounded-lg">
                  <span class="text-2xl mr-3">🎯</span>
                  <div>
                    <h4 class="font-semibold text-[#432818]">Análise Personalizada</h4>
                    <p class="text-sm text-gray-600">Baseada nas suas 18 respostas</p>
                  </div>
                </div>
                <div class="benefit-item flex items-start p-4 bg-gray-50 rounded-lg">
                  <span class="text-2xl mr-3">👗</span>
                  <div>
                    <h4 class="font-semibold text-[#432818]">Dicas de Looks</h4>
                    <p class="text-sm text-gray-600">Combinações práticas para o dia a dia</p>
                  </div>
                </div>
                <div class="benefit-item flex items-start p-4 bg-gray-50 rounded-lg">
                  <span class="text-2xl mr-3">📝</span>
                  <div>
                    <h4 class="font-semibold text-[#432818]">Lista de Compras</h4>
                    <p class="text-sm text-gray-600">Peças estratégicas para o seu estilo</p>
                  </div>
                </div>
              </div>
            `,
            fontSize: 'text-base',
            textAlign: 'text-left',
            color: '#432818',
            marginBottom: 32
          }
        },
        // 8. Depoimento/prova social
        {
          id: 'offer-testimonial',
          type: 'testimonial-card-inline',
          properties: {
            name: 'Ana Carolina',
            location: 'São Paulo, SP',
            text: 'Depois do quiz descobri que sou do estilo Elegante e o guia me ajudou a reorganizar todo meu guarda-roupa. Agora me visto com muito mais confiança!',
            rating: 5,
            avatar: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071344/avatar-ana.webp',
            compact: false
          }
        },
        // 9. Badge de garantia
        {
          id: 'offer-guarantee',
          type: 'badge-inline',
          properties: {
            text: '7 DIAS DE GARANTIA',
            subtext: 'Se não gostar, devolvemos seu dinheiro',
            icon: 'shield',
            color: 'green',
            size: 'large',
            centered: true
          }
        },
        // 10. CTA principal
        {
          id: 'offer-main-cta',
          type: 'button-inline',
          properties: {
            text: 'QUERO MEU GUIA PERSONALIZADO',
            variant: 'primary',
            size: 'large',
            fullWidth: true,
            backgroundColor: '#B89B7A',
            textColor: '#ffffff',
            pulse: true,
            urgency: true // Estilo de urgência
          }
        },
        // 11. Informações de segurança
        {
          id: 'offer-security-info',
          type: 'text-inline',
          properties: {
            content: `
              <div class="security-info text-center">
                <div class="flex items-center justify-center space-x-4 mb-2">
                  <span class="text-green-600">🔒</span>
                  <span class="text-sm font-medium">Compra 100% Segura</span>
                  <span class="text-green-600">✓</span>
                </div>
                <p class="text-xs text-gray-500">
                  Aceitamos PIX, Cartão de Crédito e Boleto<br>
                  Dados protegidos com certificado SSL
                </p>
              </div>
            `,
            fontSize: 'text-sm',
            textAlign: 'text-center',
            color: '#6B7280',
            marginTop: 24
          }
        }
      ],
      settings: {
        showProgress: false,
        progressValue: 100,
        backgroundColor: '#ffffff',
        textColor: '#432818',
        maxWidth: 'max-w-4xl',
        padding: 'p-6'
      }
    });

    console.log(`✅ [ES7+] Criadas ${pages.length} etapas modulares (1-21)`);
    return pages;
  }

  /**
   * Método legado mantido para compatibilidade
   * Usa a mesma lógica modular do createModularPages()
   */
  createLegacyDefaultFunnel(): SchemaDrivenFunnelData {
    console.log('🔄 Creating legacy funnel using modular architecture...');
    return this.createDefaultFunnel();
  }

  // Cleanup
  destroy() {
    this.disableAutoSave();
  }

  async deleteBlock(funnelId: string, pageId: string, blockId: string): Promise<void> {
    try {
      // Carregar o funil atual
      const funnel = await this.loadFunnel(funnelId);
      if (!funnel) {
        console.error(`❌ Funil com ID ${funnelId} não encontrado.`);
        return;
      }

      // Encontrar a página e remover o bloco
      const updatedPages = funnel.pages.map(page => {
        if (page.id === pageId) {
          return {
            ...page,
            blocks: page.blocks.filter(block => block.id !== blockId)
          };
        }
        return page;
      });

      const updatedFunnel = {
        ...funnel,
        pages: updatedPages,
        lastModified: new Date()
      };

      // Salvar o funil atualizado no backend
      const { error } = await supabase
        .from('funnels')
        .update({
          settings: updatedFunnel, // Supabase armazena o objeto completo em 'settings'
          updated_at: updatedFunnel.lastModified.toISOString() // Atualiza o timestamp
        })
        .eq('id', funnelId);

      if (error) {
        throw error;
      }

      // Atualizar o localStorage e o histórico de versões
      this.saveLocalFunnel(updatedFunnel);
      this.saveVersion(updatedFunnel, `Block ${blockId} deleted from page ${pageId}`);
      console.log(`🗑️ Bloco ${blockId} excluído da página ${pageId} do funil ${funnelId} e salvo no backend.`);
    } catch (error) {
      console.error(`❌ Erro ao excluir bloco ${blockId} do funil ${funnelId}:`, error);
      throw error; // Re-lançar para que o chamador possa lidar com isso
    }
  }


  async deleteFunnel(funnelId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('funnels')
        .delete()
        .eq('id', funnelId);

      if (error) {
        throw error;
      }

      // Remover do localStorage
      localStorage.removeItem(`funnel_${funnelId}`);
      // Limpar histórico de versões para este funil
      localStorage.removeItem(`funnel_versions_${funnelId}`);

      console.log(`🗑️ Funil ${funnelId} excluído do backend e do localStorage.`);
    } catch (error) {
      console.error(`❌ Erro ao excluir funil ${funnelId}:`, error);
      throw error;
    }
  }


  async deletePage(funnelId: string, pageId: string): Promise<void> {
    try {
      const funnel = await this.loadFunnel(funnelId);
      if (!funnel) {
        throw new Error(`Funil com ID ${funnelId} não encontrado.`);
      }

      const updatedPages = funnel.pages.filter(page => page.id !== pageId);

      const updatedFunnel = {
        ...funnel,
        pages: updatedPages,
        lastModified: new Date()
      };

      // Salvar o funil atualizado no backend
      const { error } = await supabase
        .from('funnels')
        .update({
          settings: updatedFunnel, // Supabase armazena o objeto completo em 'settings'
          updated_at: updatedFunnel.lastModified.toISOString() // Atualiza o timestamp
        })
        .eq('id', funnelId);

      if (error) {
        throw error;
      }

      // Atualizar o localStorage e o histórico de versões
      this.saveLocalFunnel(updatedFunnel);
      this.saveVersion(updatedFunnel, `Page ${pageId} deleted from funnel ${funnelId}`);
      console.log(`🗑️ Página ${pageId} excluída do funil ${funnelId} e salva no backend.`);
    } catch (error) {
      console.error(`❌ Erro ao excluir página ${pageId} do funil ${funnelId}:`, error);
      throw error; // Re-lançar para que o chamador possa lidar com isso
    }
  }
}

export const schemaDrivenFunnelService = new SchemaDrivenFunnelService();
