/**
 * Sidebar - Barra lateral com componentes e páginas
 */

import React, { useState } from 'react';
import { useEditor } from '../core/EditorContext';
import { BlockDefinition } from '../core/EditorTypes';

// Definições de blocos disponíveis
const blockDefinitions: BlockDefinition[] = [
  // Quiz
  {
    type: 'quiz-question',
    name: 'Pergunta Quiz',
    icon: '❓',
    category: 'quiz',
    description: 'Pergunta com opções de resposta',
    defaultContent: {
      question: 'Nova pergunta?',
      options: [
        { id: '1', text: 'Opção 1', value: 'opt1' },
        { id: '2', text: 'Opção 2', value: 'opt2' }
      ]
    }
  },
  {
    type: 'quiz-result',
    name: 'Resultado Quiz',
    icon: '🎯',
    category: 'quiz',
    description: 'Página de resultado do quiz',
    defaultContent: {
      title: 'Seu Resultado',
      description: 'Baseado nas suas respostas...'
    }
  },
  // Conteúdo
  {
    type: 'heading',
    name: 'Título',
    icon: '📝',
    category: 'content',
    description: 'Título principal',
    defaultContent: {
      text: 'Novo Título',
      level: 1
    }
  },
  {
    type: 'paragraph',
    name: 'Parágrafo',
    icon: '📄',
    category: 'content',
    description: 'Texto corrido',
    defaultContent: {
      text: 'Novo parágrafo de texto...'
    }
  },
  {
    type: 'button',
    name: 'Botão',
    icon: '🔘',
    category: 'content',
    description: 'Botão de ação',
    defaultContent: {
      text: 'Clique aqui',
      url: '#'
    }
  },
  // Mídia
  {
    type: 'image',
    name: 'Imagem',
    icon: '🖼️',
    category: 'media',
    description: 'Imagem ou foto',
    defaultContent: {
      src: 'https://via.placeholder.com/400x300',
      alt: 'Imagem'
    }
  }
];

const Sidebar: React.FC = () => {
  const { state, addBlock, switchPage, deletePage } = useEditor();
  const [activeTab, setActiveTab] = useState<'blocks' | 'pages'>('blocks');
  const [activeCategory, setActiveCategory] = useState<string>('quiz');

  const categories = ['quiz', 'content', 'media', 'layout'];
  const filteredBlocks = blockDefinitions.filter(block => block.category === activeCategory);

  const handleAddBlock = (block: BlockDefinition) => {
    addBlock(block.type, block.defaultContent);
  };

  return (
    <div className="sidebar w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('blocks')}
          className={`flex-1 py-3 px-4 text-sm font-medium ${
            activeTab === 'blocks'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          🧩 Blocos
        </button>
        <button
          onClick={() => setActiveTab('pages')}
          className={`flex-1 py-3 px-4 text-sm font-medium ${
            activeTab === 'pages'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          📄 Páginas
        </button>
      </div>

      {/* Conteúdo dos Tabs */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'blocks' ? (
          <div className="p-4">
            {/* Categorias */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Categorias</h3>
              <div className="flex flex-wrap gap-1">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-2 py-1 text-xs rounded ${
                      activeCategory === category
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Blocos */}
            <div className="space-y-2">
              {filteredBlocks.map(block => (
                <div
                  key={block.type}
                  onClick={() => handleAddBlock(block)}
                  className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{block.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-800">{block.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{block.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-4">
            {/* Páginas */}
            <div className="space-y-2">
              {state.currentProject?.pages.map(page => (
                <div
                  key={page.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    state.currentPageId === page.id
                      ? 'border-blue-300 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      onClick={() => switchPage(page.id)}
                      className="flex-1 min-w-0"
                    >
                      <h4 className="text-sm font-medium text-gray-800 truncate">
                        {page.title}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {page.blocks.length} blocos
                      </p>
                    </div>
                    
                    {state.currentProject!.pages.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm('Excluir esta página?')) {
                            deletePage(page.id);
                          }
                        }}
                        className="ml-2 p-1 text-red-500 hover:bg-red-50 rounded"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                </div>
              ))}
              
              {!state.currentProject?.pages.length && (
                <div className="text-center text-gray-500 py-8">
                  <p className="text-sm">Nenhuma página criada</p>
                  <p className="text-xs mt-1">Use o botão "+ Página" acima</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
