
import React from 'react';
import { Block } from '@/types/editor';
import { StyleResult } from '@/types/quiz';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface EditorPreviewProps {
  blocks: Block[];
  selectedBlockId: string | null;
  onSelectBlock: (id: string) => void;
  isPreviewing: boolean;
  primaryStyle: StyleResult;
  onReorderBlocks: (sourceIndex: number, destinationIndex: number) => void;
}

const BlockRenderer: React.FC<{
  block: Block;
  isSelected: boolean;
  isPreviewing: boolean;
  onSelect: () => void;
}> = ({ block, isSelected, isPreviewing, onSelect }) => {
  const renderBlockContent = () => {
    switch (block.type) {
      case 'headline':
        return (
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#432818]">
              {block.content.title || 'Título Principal'}
            </h1>
          </div>
        );
      case 'text':
        return (
          <div className="prose max-w-none">
            <p className="text-[#432818]">
              {block.content.text || 'Digite seu texto aqui...'}
            </p>
          </div>
        );
      case 'image':
        return (
          <div className="text-center">
            <img 
              src={block.content.imageUrl || 'https://placehold.co/600x400?text=Imagem'} 
              alt={block.content.caption || 'Imagem'}
              className="mx-auto rounded-lg max-w-full h-auto"
            />
            {block.content.caption && (
              <p className="text-sm text-[#8F7A6A] mt-2">{block.content.caption}</p>
            )}
          </div>
        );
      case 'button':
        return (
          <div className="text-center">
            <button 
              className="px-6 py-3 rounded-lg font-medium text-white"
              style={{
                backgroundColor: block.content.backgroundColor || '#B89B7A',
                color: block.content.textColor || '#FFFFFF'
              }}
            >
              {block.content.buttonText || 'Clique aqui'}
            </button>
          </div>
        );
      case 'benefits':
        return (
          <div>
            <h3 className="text-xl font-semibold text-[#432818] mb-4">
              {block.content.title || 'Benefícios'}
            </h3>
            <ul className="space-y-2">
              {(block.content.items || ['Benefício 1', 'Benefício 2']).map((item: string, index: number) => (
                <li key={index} className="flex items-center text-[#432818]">
                  <span className="w-2 h-2 bg-[#B89B7A] rounded-full mr-3"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );
      default:
        return (
          <div className="p-4 border-2 border-dashed border-[#B89B7A]/30 rounded-lg text-center">
            <p className="text-[#8F7A6A]">Componente: {block.type}</p>
          </div>
        );
    }
  };

  return (
    <div
      className={cn(
        "p-4 mb-4 rounded-lg border-2 cursor-pointer transition-all",
        isSelected && !isPreviewing 
          ? "border-[#B89B7A] bg-[#B89B7A]/5" 
          : "border-transparent hover:border-[#B89B7A]/30",
        isPreviewing && "cursor-default"
      )}
      onClick={!isPreviewing ? onSelect : undefined}
    >
      {renderBlockContent()}
    </div>
  );
};

export const EditorPreview: React.FC<EditorPreviewProps> = ({
  blocks,
  selectedBlockId,
  onSelectBlock,
  isPreviewing,
  primaryStyle,
  onReorderBlocks
}) => {
  return (
    <div className="h-full bg-[#FAF9F7] p-4">
      <div className="bg-white rounded-lg shadow-sm h-full overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-6">
            {blocks.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-[#B89B7A]/30 rounded-lg">
                <p className="text-[#8F7A6A] text-center">
                  Adicione componentes do painel esquerdo para começar
                </p>
              </div>
            ) : (
              blocks.map((block) => (
                <BlockRenderer
                  key={block.id}
                  block={block}
                  isSelected={block.id === selectedBlockId}
                  isPreviewing={isPreviewing}
                  onSelect={() => onSelectBlock(block.id)}
                />
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
