
// @ts-nocheck
import React from 'react';
import { Block, BlockType } from '@/types/editor';

interface PropertiesPanelProps {
  selectedBlock: Block | null;
  onUpdate: (content: any) => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedBlock,
  onUpdate
}) => {
  if (!selectedBlock) {
    return (
      <div className="p-4">
        <p>Select a block to edit its properties</p>
      </div>
    );
  }

  const validBlockTypes: BlockType[] = [
    'headline', 'text', 'image', 'benefits', 'testimonials', 
    'pricing', 'guarantee', 'cta', 'header', 'hero', 'bonus-carousel'
  ];

  if (!validBlockTypes.includes(selectedBlock.type as BlockType)) {
    return (
      <div className="p-4">
        <p>Unsupported block type: {selectedBlock.type}</p>
      </div>
    );
  }

  const renderProperties = () => {
    switch (selectedBlock.type as BlockType) {
      case 'headline':
        return (
          <div>
            <label>Title:</label>
            <input 
              type="text" 
              value={selectedBlock.content.title || ''} 
              onChange={(e) => onUpdate({ title: e.target.value })}
            />
          </div>
        );
      case 'text':
        return (
          <div>
            <label>Text:</label>
            <textarea 
              value={selectedBlock.content.text || ''} 
              onChange={(e) => onUpdate({ text: e.target.value })}
            />
          </div>
        );
      default:
        return <div>No properties available</div>;
    }
  };

  return (
    <div className="p-4">
      <h3>Properties</h3>
      {renderProperties()}
    </div>
  );
};
