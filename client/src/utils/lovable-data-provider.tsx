// lovable-data-provider.ts - Fornece dados para o Lovable.dev
import React from 'react';

// Tipos de dados que o Lovable precisa acessar
export interface LovableDataContext {
  // Dados do usuário
  user?: {
    id: string;
    name?: string;
    email?: string;
  };
  
  // Dados do quiz atual
  quiz?: {
    id: string;
    title: string;
    description: string;
    questions: any[];
    results: any[];
  };
  
  // Dados de tracking/analytics
  analytics?: {
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    participantId?: string;
  };
  
  // Configurações globais
  settings?: {
    theme: any;
    branding: any;
    integrations: any;
  };
  
  // Dados de funil/conversão
  funnel?: {
    id: string;
    name: string;
    pages: any[];
    settings: any;
  };
}

// Provider para dados do Lovable
export function LovableDataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = React.useState<LovableDataContext>({});
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Carregar dados iniciais
    loadLovableData();
  }, []);

  const loadLovableData = async () => {
    try {
      setIsLoading(true);
      
      // Carregar dados do usuário
      const userData = await fetch('/api/user/current').then(r => r.ok ? r.json() : null);
      
      // Carregar dados do quiz atual
      const quizData = await fetch('/api/quiz/current').then(r => r.ok ? r.json() : null);
      
      // Carregar configurações
      const settingsData = await fetch('/api/settings').then(r => r.ok ? r.json() : null);
      
      // Carregar dados de analytics/UTM
      const analyticsData = {
        utmSource: new URLSearchParams(window.location.search).get('utm_source') || undefined,
        utmMedium: new URLSearchParams(window.location.search).get('utm_medium') || undefined,
        utmCampaign: new URLSearchParams(window.location.search).get('utm_campaign') || undefined,
        participantId: localStorage.getItem('participant_id') || crypto.randomUUID(),
      };
      
      // Carregar dados do funil
      const funnelData = await fetch('/api/funnel/current').then(r => r.ok ? r.json() : null);

      setData({
        user: userData,
        quiz: quizData,
        analytics: analyticsData,
        settings: settingsData,
        funnel: funnelData,
      });

      // Tornar dados disponíveis globalmente para o Lovable
      if (typeof window !== 'undefined') {
        (window as any).LOVABLE_DATA = {
          user: userData,
          quiz: quizData,
          analytics: analyticsData,
          settings: settingsData,
          funnel: funnelData,
        };
        
        console.log('🎨 Lovable: Dados carregados e disponibilizados', (window as any).LOVABLE_DATA);
      }

    } catch (error) {
      console.error('Erro ao carregar dados para Lovable:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateData = (newData: Partial<LovableDataContext>) => {
    setData(prev => ({ ...prev, ...newData }));
    
    // Atualizar dados globais também
    if (typeof window !== 'undefined') {
      (window as any).LOVABLE_DATA = { ...(window as any).LOVABLE_DATA, ...newData };
    }
  };

  const contextValue = React.useMemo(() => ({
    data,
    isLoading,
    updateData,
    refreshData: loadLovableData,
  }), [data, isLoading]);

  return (
    <LovableDataContext.Provider value={contextValue}>
      {children}
    </LovableDataContext.Provider>
  );
}

// Context para acessar dados
const LovableDataContext = React.createContext<{
  data: LovableDataContext;
  isLoading: boolean;
  updateData: (data: Partial<LovableDataContext>) => void;
  refreshData: () => Promise<void>;
} | null>(null);

// Hook para usar dados do Lovable
export function useLovableData() {
  const context = React.useContext(LovableDataContext);
  if (!context) {
    throw new Error('useLovableData deve ser usado dentro de LovableDataProvider');
  }
  return context;
}

// Função para acessar dados diretamente (para componentes Lovable)
export function getLovableData(): LovableDataContext {
  if (typeof window !== 'undefined' && (window as any).LOVABLE_DATA) {
    return (window as any).LOVABLE_DATA;
  }
  return {};
}

// Função para atualizar dados diretamente
export function updateLovableData(newData: Partial<LovableDataContext>) {
  if (typeof window !== 'undefined') {
    (window as any).LOVABLE_DATA = { ...(window as any).LOVABLE_DATA, ...newData };
  }
}
