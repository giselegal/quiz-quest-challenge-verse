// lovable.tsx - Configuração principal do Lovable
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
  if (typeof window !== 'undefined') {
    const isLovableMode = 
      window.location.search.includes('lovable=true') ||
      window.location.pathname.includes('/admin') ||
      window.location.pathname === '/';
    
    if (isLovableMode) {
      if (!(window as any).LOVABLE_COMPONENTS) {
        (window as any).LOVABLE_COMPONENTS = {};
      }
      (window as any).LOVABLE_COMPONENTS[component.name] = component;
      
      // Configuração global do Lovable
      (window as any).LOVABLE_CONFIG = {
        projectId: 'quiz-sell-genius',
        apiBaseUrl: 'https://api.lovable.dev',
        editorMode: true
      };
      
      console.log(`🎨 Lovable: Componente ${component.name} registrado`);
    }
  }

  // Retorna o componente React padrão
  return (props: LovableComponentProps) => {
    const mergedProps = { ...component.defaultProps, ...props };
    return component.render(mergedProps);
  };
}

// Hook simplificado para desenvolvimento/editor
export function useLovableEditor() {
  const [isEditorMode, setIsEditorMode] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const isEditor = 
        window.location.search.includes('lovable=true') ||
        window.location.pathname.includes('/admin') ||
        window.location.pathname === '/';
      
      setIsEditorMode(isEditor);
      
      if (isEditor) {
        console.log('🎨 Lovable: Modo editor ativado');
      }
    }
  }, []);

  return { isEditorMode };
}

// Provider simplificado
export function LovableProvider({ children }: { children: React.ReactNode }) {
  const { isEditorMode } = useLovableEditor();

  React.useEffect(() => {
    if (isEditorMode) {
      console.log('🎨 Lovable: Provider ativo no modo editor');
    }
  }, [isEditorMode]);

  return (
    <div className={isEditorMode ? 'lovable-editor-active' : ''}>
      {children}
    </div>
  );
}

export default defineLovable;
