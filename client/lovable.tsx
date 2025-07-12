// lovable.ts - Configuração principal do Lovable
import React from 'react';

// Tipos para o sistema Lovable
export interface LovableComponentProps {
  [key: string]: any;
}

export interface LovableComponent {
  name: string;
  displayName: string;
  description: string;
  category: string;
  defaultProps: LovableComponentProps;
  propsSchema: any;
  render: (props: LovableComponentProps) => React.ReactElement;
}

// Função principal para definir componentes Lovable
export function defineLovable(component: LovableComponent) {
  // Em desenvolvimento, registra o componente para o editor
  if (typeof window !== 'undefined' && window.location.search.includes('lovable=true')) {
    if (!(window as any).LOVABLE_COMPONENTS) {
      (window as any).LOVABLE_COMPONENTS = {};
    }
    (window as any).LOVABLE_COMPONENTS[component.name] = component;
  }

  // Retorna o componente React padrão
  return (props: LovableComponentProps) => {
    const mergedProps = { ...component.defaultProps, ...props };
    return component.render(mergedProps);
  };
}

// Hook para desenvolvimento/editor
export function useLovableEditor() {
  const [isEditorMode, setIsEditorMode] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const isEditor = window.location.search.includes('lovable=true') ||
                       window.location.pathname.includes('/admin') ||
                       window.location.pathname === '/';
      
      setIsEditorMode(isEditor);
      
      if (isEditor) {
        // Configurações específicas do editor
        (window as any).LOVABLE_CONFIG = {
          projectId: 'quiz-sell-genius',
          apiBaseUrl: 'https://api.lovable.dev',
          editorMode: true
        };
      }
    }
  }, []);

  return { isEditorMode };
}

// Utilitário para exportar componentes
export function exportLovableComponent(component: LovableComponent) {
  return {
    component,
    metadata: {
      name: component.name,
      displayName: component.displayName,
      description: component.description,
      category: component.category,
      propsSchema: component.propsSchema
    }
  };
}

// Provider para contexto global
export const LovableContext = React.createContext({
  isEditorMode: false,
  components: {} as Record<string, LovableComponent>
});

export function LovableProvider({ children }: { children: React.ReactNode }) {
  const { isEditorMode } = useLovableEditor();
  const [components] = React.useState({});

  return (
    <LovableContext.Provider value={{ isEditorMode, components }}>
      {children}
    </LovableContext.Provider>
  );
}

export default defineLovable;
