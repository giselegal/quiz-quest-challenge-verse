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
        projectId: '65efd17d-5178-405d-9721-909c97470c6d',
        projectUrl: 'https://lovable.dev/projects/65efd17d-5178-405d-9721-909c97470c6d',
        apiBaseUrl: 'https://api.lovable.dev',
        editorMode: true,
        dataApiUrl: '/api/lovable/data'
      };
      
      // Carregar dados para o Lovable
      fetch('/api/lovable/data')
        .then(response => response.json())
        .then(data => {
          (window as any).LOVABLE_DATA = data;
          console.log('🎨 Lovable: Dados carregados', data);
        })
        .catch(error => {
          console.warn('🎨 Lovable: Erro ao carregar dados', error);
        });
      
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
