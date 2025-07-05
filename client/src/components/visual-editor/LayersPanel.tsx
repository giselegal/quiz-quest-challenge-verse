import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Eye, 
  EyeOff, 
  Lock, 
  Unlock, 
  Trash2, 
  Copy, 
  GripVertical,
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  Type,
  Image as ImageIcon,
  Layout,
  Smartphone,
  ShoppingCart,
  Star,
  MessageCircle
} from 'lucide-react';

interface BlockData {
  id: string;
  type: string;
  order?: number;
  settings?: Record<string, any>;
  style?: Record<string, any>;
}

interface PageData {
  id: string;
  type: string;
  title?: string; // Tornando opcional para compatibilidade
  blocks: BlockData[];
  settings?: Record<string, any>;
}

interface LayersPanelProps {
  currentPage: PageData | undefined;
  selectedBlockId: string | null;
  onSelectBlock: (blockId: string | null) => void;
  onReorderBlocks: (newBlocks: BlockData[]) => void;
  onDeleteBlock: (blockId: string) => void;
  onDuplicateBlock: (blockId: string) => void;
  blockLibrary: Array<{ type: string; name: string; icon: any; category: string }>;
}

// Função utilitária para obter ícone do bloco
const getBlockIcon = (blockType: string) => {
  if (blockType.includes('text') || blockType.includes('heading') || blockType === 'header') return Type;
  if (blockType.includes('image') || blockType.includes('media')) return ImageIcon;
  if (blockType.includes('button') || blockType.includes('cta')) return Smartphone;
  if (blockType.includes('testimonial') || blockType.includes('review')) return MessageCircle;
  if (blockType.includes('benefit') || blockType.includes('feature')) return Star;
  if (blockType.includes('purchase') || blockType.includes('price') || blockType.includes('offer')) return ShoppingCart;
  return Layout;
};

// Função utilitária para obter nome amigável do bloco
const getBlockFriendlyName = (blockType: string, settings?: Record<string, any>) => {
  const friendlyNames: Record<string, string> = {
    'header': 'Cabeçalho',
    'quiz-intro-section': 'Seção Introdução Quiz',
    'quiz-progress-bar': 'Barra de Progresso',
    'question-multiple': 'Questão Múltipla Escolha',
    'quiz-navigation-controls': 'Controles de Navegação',
    'text': 'Texto',
    'image': 'Imagem',
    'button': 'Botão',
    'cta-button': 'Botão CTA',
    'testimonials-component': 'Depoimentos',
    'secure-purchase-component': 'Compra Segura',
    'before-after-component': 'Antes e Depois',
    'motivation-component': 'Seção Motivação',
    'bonus-component': 'Seção Bônus',
    'result-header-component': 'Cabeçalho do Resultado',
    'result-style-card-component': 'Card de Estilo',
    'secondary-styles-component': 'Estilos Secundários',
    'QuizIntroBlock': 'Bloco Introdução Quiz',
    'StartButtonBlock': 'Botão Iniciar Quiz',
    'QuizBenefitsBlock': 'Benefícios do Quiz'
  };

  return friendlyNames[blockType] || blockType.replace(/-/g, ' ').replace(/([A-Z])/g, ' $1').trim();
};

export const LayersPanel: React.FC<LayersPanelProps> = ({
  currentPage,
  selectedBlockId,
  onSelectBlock,
  onReorderBlocks,
  onDeleteBlock,
  onDuplicateBlock,
  blockLibrary
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showHidden, setShowHidden] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['all']));
  const [draggedBlock, setDraggedBlock] = useState<string | null>(null);

  if (!currentPage) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 text-sm">
        <div className="text-center">
          <Layout className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>Selecione uma página para ver suas camadas</p>
        </div>
      </div>
    );
  }

  const blocks = currentPage.blocks || [];
  
  // Filtrar blocos baseado no termo de busca
  const filteredBlocks = blocks.filter(block => {
    const blockName = getBlockFriendlyName(block.type, block.settings);
    return blockName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           block.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
           (block.settings?.title?.toLowerCase() || '').includes(searchTerm.toLowerCase());
  });

  // Agrupar blocos por categoria para melhor organização
  const groupedBlocks = filteredBlocks.reduce((groups: Record<string, BlockData[]>, block) => {
    const category = getBlockCategory(block.type);
    if (!groups[category]) groups[category] = [];
    groups[category].push(block);
    return groups;
  }, {});

  function getBlockCategory(blockType: string): string {
    if (blockType.includes('quiz') || blockType.includes('question') || blockType.includes('navigation')) return 'Quiz';
    if (blockType.includes('text') || blockType.includes('header') || blockType.includes('heading')) return 'Texto';
    if (blockType.includes('image') || blockType.includes('media')) return 'Mídia';
    if (blockType.includes('button') || blockType.includes('cta')) return 'Interação';
    if (blockType.includes('testimonial') || blockType.includes('review')) return 'Social';
    if (blockType.includes('purchase') || blockType.includes('price') || blockType.includes('offer')) return 'Vendas';
    if (blockType.includes('result') || blockType.includes('style')) return 'Resultado';
    return 'Outros';
  }

  const handleDragStart = (blockId: string) => {
    setDraggedBlock(blockId);
  };

  const handleDragOver = (e: React.DragEvent, targetBlockId: string) => {
    e.preventDefault();
    if (draggedBlock && draggedBlock !== targetBlockId) {
      // Visual feedback durante o drag
    }
  };

  const handleDrop = (e: React.DragEvent, targetBlockId: string) => {
    e.preventDefault();
    if (draggedBlock && draggedBlock !== targetBlockId) {
      const draggedBlockData = blocks.find(b => b.id === draggedBlock);
      const targetBlockData = blocks.find(b => b.id === targetBlockId);
      
      if (draggedBlockData && targetBlockData) {
        const newBlocks = [...blocks];
        const draggedIndex = newBlocks.findIndex(b => b.id === draggedBlock);
        const targetIndex = newBlocks.findIndex(b => b.id === targetBlockId);
        
        // Remove o bloco arrastado
        newBlocks.splice(draggedIndex, 1);
        
        // Insere na nova posição
        const adjustedTargetIndex = draggedIndex < targetIndex ? targetIndex - 1 : targetIndex;
        newBlocks.splice(adjustedTargetIndex, 0, draggedBlockData);
        
        // Atualiza a ordem
        const reorderedBlocks = newBlocks.map((block, index) => ({
          ...block,
          order: index + 1
        }));
        
        onReorderBlocks(reorderedBlocks);
      }
    }
    setDraggedBlock(null);
  };

  const toggleGroupExpansion = (groupName: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupName)) {
      newExpanded.delete(groupName);
    } else {
      newExpanded.add(groupName);
    }
    setExpandedGroups(newExpanded);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header com busca e filtros */}
      <div className="p-3 border-b space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Layers</h3>
          <Badge variant="outline" className="text-xs">
            {blocks.length} {blocks.length === 1 ? 'bloco' : 'blocos'}
          </Badge>
        </div>
        
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
          <Input
            placeholder="Buscar blocos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-7 h-8 text-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowHidden(!showHidden)}
            className="h-6 text-xs flex-1"
          >
            <Filter className="h-3 w-3 mr-1" />
            {showHidden ? 'Ocultar blocos' : 'Mostrar ocultos'}
          </Button>
        </div>
      </div>

      {/* Lista de blocos */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {Object.keys(groupedBlocks).length === 0 ? (
            <div className="text-center py-8 text-gray-500 text-xs">
              <Layout className="h-6 w-6 mx-auto mb-2 opacity-50" />
              <p>Nenhum bloco encontrado</p>
              {searchTerm && (
                <p className="mt-1">Tente um termo diferente</p>
              )}
            </div>
          ) : (
            Object.entries(groupedBlocks).map(([category, categoryBlocks]) => (
              <div key={category} className="mb-3">
                {/* Header da categoria */}
                <button
                  onClick={() => toggleGroupExpansion(category)}
                  className="flex items-center w-full text-left py-1 px-2 hover:bg-gray-50 rounded text-xs font-medium text-gray-600 transition-colors"
                >
                  {expandedGroups.has(category) ? (
                    <ChevronDown className="h-3 w-3 mr-1" />
                  ) : (
                    <ChevronRight className="h-3 w-3 mr-1" />
                  )}
                  {category}
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {categoryBlocks.length}
                  </Badge>
                </button>

                {/* Blocos da categoria */}
                {expandedGroups.has(category) && (
                  <div className="ml-2 space-y-1">
                    {categoryBlocks
                      .sort((a, b) => (a.order || 0) - (b.order || 0))
                      .map((block, index) => {
                        const Icon = getBlockIcon(block.type);
                        const blockName = getBlockFriendlyName(block.type, block.settings);
                        const isSelected = selectedBlockId === block.id;
                        
                        return (
                          <div
                            key={block.id}
                            className={`
                              group flex items-center p-2 rounded-lg border cursor-pointer transition-all
                              ${isSelected 
                                ? 'bg-blue-50 border-blue-200 shadow-sm' 
                                : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                              }
                              ${draggedBlock === block.id ? 'opacity-50' : ''}
                            `}
                            onClick={() => onSelectBlock(block.id)}
                            draggable
                            onDragStart={() => handleDragStart(block.id)}
                            onDragOver={(e) => handleDragOver(e, block.id)}
                            onDrop={(e) => handleDrop(e, block.id)}
                          >
                            {/* Drag handle */}
                            <GripVertical className="h-3 w-3 text-gray-400 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                            
                            {/* Ícone do bloco */}
                            <Icon className={`h-4 w-4 mr-2 ${isSelected ? 'text-blue-600' : 'text-gray-500'}`} />
                            
                            {/* Informações do bloco */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className={`text-xs font-medium truncate ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                                  {blockName}
                                </p>
                                <Badge variant="outline" className="text-xs ml-2 flex-shrink-0">
                                  {block.order || index + 1}
                                </Badge>
                              </div>
                              
                              {/* Subtítulo se disponível */}
                              {block.settings?.title && (
                                <p className="text-xs text-gray-500 truncate mt-0.5">
                                  {block.settings.title}
                                </p>
                              )}
                            </div>

                            {/* Controles do bloco */}
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                              {/* Visibilidade toggle */}
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // TODO: Implementar toggle de visibilidade
                                }}
                                className="h-6 w-6 p-0"
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                              
                              {/* Lock toggle */}
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // TODO: Implementar toggle de lock
                                }}
                                className="h-6 w-6 p-0"
                              >
                                <Unlock className="h-3 w-3" />
                              </Button>
                              
                              {/* Duplicar */}
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onDuplicateBlock(block.id);
                                }}
                                className="h-6 w-6 p-0"
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                              
                              {/* Excluir */}
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onDeleteBlock(block.id);
                                }}
                                className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      {/* Footer com informações */}
      <div className="p-3 border-t bg-gray-50">
        <div className="text-xs text-gray-600 space-y-1">
          <div className="flex justify-between">
            <span>Total de blocos:</span>
            <span className="font-medium">{blocks.length}</span>
          </div>
          {selectedBlockId && (
            <div className="flex justify-between">
              <span>Bloco selecionado:</span>
              <span className="font-medium">{selectedBlockId.split('-')[0]}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
