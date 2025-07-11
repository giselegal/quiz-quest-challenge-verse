
// @ts-nocheck
import React from 'react';
import { Block, BlockType } from '@/types/editor';

interface BlockRendererProps {
  block: Block;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate?: (content: any) => void;
  onDelete?: () => void;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({
  block,
  isSelected,
  onSelect,
  onUpdate,
  onDelete
}) => {
  const renderBlockContent = () => {
    const validBlockTypes: BlockType[] = [
      'headline', 'text', 'image', 'benefits', 'testimonials', 
      'pricing', 'guarantee', 'cta', 'header', 'hero', 'bonus-carousel'
    ];

    if (!validBlockTypes.includes(block.type as BlockType)) {
      return (
        <div className="p-4 border border-gray-300 rounded">
          <p>Unsupported block type: {block.type}</p>
        </div>
      );
    }

    switch (block.type as BlockType) {
      case 'headline':
        return <h2 className="text-2xl font-bold">{block.content.title || 'Headline'}</h2>;
      case 'text':
        return <p>{block.content.text || 'Text content'}</p>;
      case 'image':
        return <img src={block.content.src || ''} alt={block.content.alt || ''} />;
      default:
        return <div>Block: {block.type}</div>;
    }
  };

  return (
    <div 
      className={`p-4 border rounded cursor-pointer ${isSelected ? 'border-blue-500' : 'border-gray-300'}`}
      onClick={onSelect}
    >
      {renderBlockContent()}
    </div>
  );
};
