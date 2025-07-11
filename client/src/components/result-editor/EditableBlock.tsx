
import React from 'react';
import { Block } from '@/types/editor';
import { StyleResult } from '@/types/quiz';
import { cn } from '@/lib/utils';

export interface EditableBlockProps {
  block: Block;
  isSelected: boolean;
  onClick: () => void;
  isPreviewMode: boolean;
  onReorderBlocks: (sourceIndex: number, destinationIndex: number) => void;
  primaryStyle: StyleResult;
}

const EditableBlock: React.FC<EditableBlockProps> = ({
  block,
  isSelected,
  onClick,
  isPreviewMode,
  primaryStyle
}) => {
  const renderBlockContent = () => {
    switch (block.type) {
      case 'header':
        return (
          <div className="text-center">
            <h1 className="text-2xl font-bold">{block.content.title || 'Header Title'}</h1>
            {block.content.subtitle && (
              <p className="text-gray-600 mt-2">{block.content.subtitle}</p>
            )}
          </div>
        );
      
      case 'text':
        return (
          <div>
            <p>{block.content.text || 'Text content goes here...'}</p>
          </div>
        );
      
      case 'image':
        return (
          <div className="text-center">
            {block.content.imageUrl ? (
              <img 
                src={block.content.imageUrl} 
                alt={block.content.caption || 'Image'} 
                className="max-w-full h-auto rounded"
              />
            ) : (
              <div className="bg-gray-200 p-8 rounded">
                <p className="text-gray-500">Image placeholder</p>
              </div>
            )}
            {block.content.caption && (
              <p className="text-sm text-gray-600 mt-2">{block.content.caption}</p>
            )}
          </div>
        );
      
      case 'button':
        return (
          <div className="text-center">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              {block.content.buttonText || 'Button Text'}
            </button>
          </div>
        );
      
      default:
        return (
          <div className="p-4 bg-gray-100 rounded">
            <p className="text-gray-600">Block type: {block.type}</p>
          </div>
        );
    }
  };

  return (
    <div
      className={cn(
        "relative border-2 rounded-lg p-4 cursor-pointer transition-all",
        isSelected 
          ? "border-blue-400 bg-blue-50" 
          : "border-transparent hover:border-gray-300",
        !isPreviewMode && "hover:shadow-md"
      )}
      onClick={!isPreviewMode ? onClick : undefined}
    >
      {renderBlockContent()}
      
      {isSelected && !isPreviewMode && (
        <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
          Selected
        </div>
      )}
    </div>
  );
};

export default EditableBlock;
