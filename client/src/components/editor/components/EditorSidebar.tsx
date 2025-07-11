/**
 * Editor Sidebar - ES7 Pattern
 * Barra lateral com componentes disponíveis
 */

import React, { useState } from 'react';
import { BlockType } from '../types/EditorTypes';

interface ComponentCategory {
  id: string;
  name: string;
  icon: string;
  blocks: BlockDefinition[];
}

interface BlockDefinition {
  type: BlockType;
  name: string;
  description: string;
  icon: string;
  category: string;
  preview?: string;
}

interface EditorSidebarProps {
  onAddBlock: (type: string, content?: any) => void;
  className?: string;
  style?: React.CSSProperties;
}

// Definições dos blocos disponíveis
const BLOCK_DEFINITIONS: BlockDefinition[] = [
  {
    type: 'quiz-question',
    name: 'Quiz Question',
    description: 'Pergunta de quiz com opções',
    icon: '❓',
    category: 'quiz'
  },
  {
    type: 'quiz-intro',
    name: 'Quiz Intro',
    description: 'Introdução do quiz',
    icon: '🏁',
    category: 'quiz'
  },
  {
    type: 'quiz-result',
    name: 'Quiz Result',
    description: 'Resultado do quiz',
    icon: '🎯',
    category: 'quiz'
  },
  {
    type: 'heading',
    name: 'Título',
    description: 'Títulos e subtítulos',
    icon: '📝',
    category: 'content'
  },
  {
    type: 'paragraph',
    name: 'Parágrafo',
    description: 'Texto e conteúdo',
    icon: '📄',
    category: 'content'
  },
  {
    type: 'image',
    name: 'Imagem',
    description: 'Imagens e mídia',
    icon: '🖼️',
    category: 'media'
  },
  {
    type: 'button',
    name: 'Botão',
    description: 'Botões de ação',
    icon: '🔘',
    category: 'interactive'
  }
];

// Agrupar blocos por categoria
const CATEGORIES: ComponentCategory[] = [
  {
    id: 'quiz',
    name: 'Quiz',
    icon: '🧩',
    blocks: BLOCK_DEFINITIONS.filter(block => block.category === 'quiz')
  },
  {
    id: 'content',
    name: 'Conteúdo',
    icon: '📝',
    blocks: BLOCK_DEFINITIONS.filter(block => block.category === 'content')
  },
  {
    id: 'media',
    name: 'Mídia',
    icon: '🎨',
    blocks: BLOCK_DEFINITIONS.filter(block => block.category === 'media')
  },
  {
    id: 'interactive',
    name: 'Interativo',
    icon: '⚡',
    blocks: BLOCK_DEFINITIONS.filter(block => block.category === 'interactive')
  }
];

export const EditorSidebar: React.FC<EditorSidebarProps> = ({
  onAddBlock,
  className = '',
  style
}) => {
  const [activeCategory, setActiveCategory] = useState('quiz');
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar blocos baseado na busca
  const filteredBlocks = searchTerm
    ? BLOCK_DEFINITIONS.filter(block =>
        block.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        block.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : CATEGORIES.find(cat => cat.id === activeCategory)?.blocks || [];

  const handleAddBlock = (blockType: BlockType) => {
    // Conteúdo padrão baseado no tipo
    const defaultContent = getDefaultContent(blockType);
    onAddBlock(blockType, defaultContent);
  };

  return (
    <div className={`editor-sidebar bg-white border-r border-gray-200 ${className}`} style={style}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Componentes</h2>
        
        {/* Search */}
        <input
          type="text"
          placeholder="Buscar componentes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Categories */}
      {!searchTerm && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span className="mr-1">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Blocks List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {filteredBlocks.map(block => (
            <div
              key={block.type}
              onClick={() => handleAddBlock(block.type)}
              className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-colors group"
            >
              <div className="flex items-start space-x-3">
                <span className="text-2xl">{block.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-800 group-hover:text-blue-700">
                    {block.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {block.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBlocks.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">Nenhum componente encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Função para obter conteúdo padrão baseado no tipo
const getDefaultContent = (type: BlockType) => {
  switch (type) {
    case 'quiz-question':
      return {
        question: 'Nova pergunta de quiz',
        options: [
          { id: '1', text: 'Opção 1', value: 'opcao1' },
          { id: '2', text: 'Opção 2', value: 'opcao2' }
        ],
        multipleSelection: false,
        showImages: false,
        logoUrl: '/api/placeholder/96/96',
        showBackButton: true,
        progressPercent: 50
      };
    
    case 'heading':
      return {
        title: 'Novo Título',
        subtitle: 'Subtítulo opcional'
      };
    
    case 'paragraph':
      return {
        text: 'Novo parágrafo de texto. Clique para editar.'
      };
    
    case 'image':
      return {
        imageUrl: '/api/placeholder/400/300',
        imageAlt: 'Descrição da imagem'
      };
    
    case 'button':
      return {
        buttonText: 'Clique aqui',
        buttonUrl: '#'
      };
    
    default:
      return {};
  }
};

export default EditorSidebar;
