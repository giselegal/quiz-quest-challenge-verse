import React from 'react';
import SimpleEditor from './SimpleEditor';
import { EditorBlock } from './types/EditorTypes';

// Dados de exemplo para testar o editor ES7
const sampleBlocks: EditorBlock[] = [
  {
    id: 'header-1',
    type: 'quiz-header',
    content: {
      logoUrl: '/logo.png',
      progressPercent: 25
    },
    order: 0,
    metadata: {
      createdAt: new Date(),
      updatedAt: new Date(),
      version: '1.0.0'
    }
  },
  {
    id: 'question-1',
    type: 'quiz-question',
    content: {
      question: 'Qual é a sua cor favorita?',
      options: [
        { id: '1', text: 'Azul', value: 'blue' },
        { id: '2', text: 'Verde', value: 'green' },
        { id: '3', text: 'Vermelho', value: 'red' }
      ],
      multipleSelection: false
    },
    order: 1,
    metadata: {
      createdAt: new Date(),
      updatedAt: new Date(),
      version: '1.0.0'
    }
  }
];

/**
 * Página de teste para o novo Editor Visual ES7
 * Use esta página para testar a funcionalidade do editor reorganizado
 */
const ES7EditorTestPage: React.FC = () => {
  const handleSave = (blocks: EditorBlock[]) => {
    console.log('✅ Blocos salvos:', blocks);
    
    // Simular salvamento no localStorage
    localStorage.setItem('es7-editor-test-blocks', JSON.stringify(blocks));
    
    // Notificação de sucesso
    alert('📝 Editor ES7 salvo com sucesso! Verifique o console para detalhes.');
  };

  const handleExport = () => {
    const saved = localStorage.getItem('es7-editor-test-blocks');
    if (saved) {
      const blob = new Blob([saved], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'editor-es7-backup.json';
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleClear = () => {
    if (window.confirm('🗑️ Tem certeza que deseja limpar todos os dados ES7?')) {
      localStorage.removeItem('es7-editor-test-blocks');
      window.location.reload();
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f5f5f5',
      padding: '20px'
    }}>
      {/* Header de teste */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        marginBottom: '20px',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '2px solid #007acc'
      }}>
        <h1>🚀 Editor Visual ES7 - Página de Teste</h1>
        <p><strong>Nova estrutura ES7 reorganizada:</strong> Esta página testa a arquitetura modular com hooks, tipos TypeScript e componentes funcionais.</p>
        
        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          marginTop: '15px',
          flexWrap: 'wrap'
        }}>
          <button 
            onClick={handleExport}
            style={{
              padding: '8px 16px',
              backgroundColor: '#007acc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            📥 Exportar JSON
          </button>
          
          <button 
            onClick={handleClear}
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            🗑️ Limpar Tudo
          </button>

          <button 
            onClick={() => console.log('Estado atual:', localStorage.getItem('es7-editor-test-blocks'))}
            style={{
              padding: '8px 16px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            🔍 Debug Estado
          </button>
        </div>

        {/* Status ES7 */}
        <div style={{
          marginTop: '15px',
          padding: '10px',
          backgroundColor: '#e7f3ff',
          borderRadius: '4px',
          border: '1px solid #007acc'
        }}>
          <strong>✨ Características ES7:</strong>
          <ul style={{ margin: '5px 0', paddingLeft: '20px', fontSize: '14px' }}>
            <li>Hooks (useState, useReducer, useCallback)</li>
            <li>Destructuring e Spread Operator</li>
            <li>Async/Await e Optional Chaining</li>
            <li>Template Literals e Arrow Functions</li>
            <li>TypeScript com interfaces completas</li>
          </ul>
        </div>
      </div>

      {/* Editor principal */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        minHeight: '600px'
      }}>
        <SimpleEditor
          initialBlocks={sampleBlocks}
          onSave={handleSave}
        />
      </div>

      {/* Footer de teste com informações técnicas */}
      <div style={{
        maxWidth: '1200px',
        margin: '20px auto 0',
        padding: '15px',
        backgroundColor: '#e9ecef',
        borderRadius: '8px',
        fontSize: '14px',
        color: '#6c757d'
      }}>
        <h3>🎯 Como Testar o Editor ES7:</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', margin: '10px 0' }}>
          <div>
            <h4>Funcionalidades Principais:</h4>
            <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
              <li><strong>Sidebar Esquerda:</strong> Categorias de componentes (Quiz, Conteúdo, Mídia)</li>
              <li><strong>Canvas Central:</strong> Área de edição com seleção de blocos</li>
              <li><strong>Painel Direito:</strong> Propriedades específicas por tipo</li>
              <li><strong>Toolbar Superior:</strong> Salvar, Preview, Configurações</li>
            </ul>
          </div>
          <div>
            <h4>Recursos ES7:</h4>
            <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
              <li><strong>Auto-save:</strong> A cada 30 segundos automaticamente</li>
              <li><strong>State Management:</strong> useReducer com actions tipadas</li>
              <li><strong>Type Safety:</strong> Interfaces TypeScript completas</li>
              <li><strong>Modular:</strong> Componentes separados por responsabilidade</li>
            </ul>
          </div>
        </div>
        
        <div style={{
          marginTop: '15px',
          padding: '10px',
          backgroundColor: '#fff3cd',
          borderRadius: '4px',
          border: '1px solid #ffc107'
        }}>
          <strong>💡 Dica de Desenvolvimento:</strong> Abra o console do navegador (F12) para ver logs detalhados das operações ES7. 
          Todos os eventos de estado são logados com prefixo "[ES7 Editor]".
        </div>
      </div>
    </div>
  );
};

export default ES7EditorTestPage;
