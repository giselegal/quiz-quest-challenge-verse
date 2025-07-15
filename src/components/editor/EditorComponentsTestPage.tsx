/**
 * Página de Teste dos Componentes do Editor
 * Verifica quais componentes estão funcionais
 */

import React, { useState } from 'react';
import { 
  ModernQuizEditor,
  ModularQuizEditor,
  EditorLayout,
  ComponentList,
  PropertyPanel,
  PageEditorCanvas,
  QuizEditorSteps
} from './index';

const EditorComponentsTestPage: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string>('modern-quiz');

  const components = [
    { id: 'modern-quiz', name: 'ModernQuizEditor', component: ModernQuizEditor },
    { id: 'modular-quiz', name: 'ModularQuizEditor', component: ModularQuizEditor },
    { id: 'editor-layout', name: 'EditorLayout', component: EditorLayout },
    { id: 'component-list', name: 'ComponentList', component: ComponentList },
    { id: 'property-panel', name: 'PropertyPanel', component: PropertyPanel },
    { id: 'page-canvas', name: 'PageEditorCanvas', component: PageEditorCanvas },
    { id: 'quiz-steps', name: 'QuizEditorSteps', component: QuizEditorSteps },
  ];

  const ActiveComponent = components.find(c => c.id === activeComponent)?.component;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '16px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ 
            margin: '0 0 16px 0', 
            fontSize: '24px', 
            fontWeight: 'bold',
            color: '#1f2937'
          }}>
            🧪 Teste dos Componentes do Editor
          </h1>
          
          {/* Selector de componentes */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {components.map(comp => (
              <button
                key={comp.id}
                onClick={() => setActiveComponent(comp.id)}
                style={{
                  padding: '6px 12px',
                  backgroundColor: activeComponent === comp.id ? '#3b82f6' : '#e5e7eb',
                  color: activeComponent === comp.id ? 'white' : '#374151',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                {comp.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Área de teste */}
      <div style={{ padding: '20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Info do componente ativo */}
          <div style={{
            backgroundColor: 'white',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '20px',
            border: '1px solid #e5e7eb'
          }}>
            <h2 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 'bold' }}>
              Testando: {components.find(c => c.id === activeComponent)?.name}
            </h2>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
              Se o componente não renderizar ou mostrar erro, significa que precisa ser corrigido.
            </p>
          </div>

          {/* Renderização do componente */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid #e5e7eb',
            minHeight: '400px'
          }}>
            {ActiveComponent ? (
              <ErrorBoundary componentName={components.find(c => c.id === activeComponent)?.name || ''}>
                <div style={{ padding: '20px' }}>
                  <ActiveComponent
                    initialFunnel={{
                      id: 'test-funnel',
                      name: 'Teste',
                      pages: [{
                        id: 'page-1',
                        title: 'Página Teste',
                        type: 'question',
                        progress: 50,
                        components: []
                      }]
                    }}
                    onSave={(data: any) => console.log('Salvo:', data)}
                    onAddBlock={(type: string) => console.log('Adicionando bloco:', type)}
                    components={[]}
                    selectedComponent={null}
                    onUpdateComponent={(comp: any) => console.log('Atualizando:', comp)}
                    onDeleteComponent={(id: string) => console.log('Deletando:', id)}
                    onSelectComponent={(comp: any) => console.log('Selecionando:', comp)}
                  />
                </div>
              </ErrorBoundary>
            ) : (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '400px',
                color: '#6b7280'
              }}>
                Componente não encontrado
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Error Boundary para capturar erros dos componentes
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; componentName: string },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode; componentName: string }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`Erro no componente ${this.props.componentName}:`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px',
          textAlign: 'center',
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          margin: '20px'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>❌</div>
          <h3 style={{ color: '#dc2626', marginBottom: '8px' }}>
            Erro no {this.props.componentName}
          </h3>
          <p style={{ color: '#7f1d1d', fontSize: '14px', marginBottom: '16px' }}>
            {this.state.error?.message || 'Erro desconhecido'}
          </p>
          <details style={{ textAlign: 'left', backgroundColor: 'white', padding: '12px', borderRadius: '4px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Ver detalhes do erro</summary>
            <pre style={{ fontSize: '12px', overflow: 'auto', marginTop: '8px' }}>
              {this.state.error?.stack}
            </pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default EditorComponentsTestPage;
