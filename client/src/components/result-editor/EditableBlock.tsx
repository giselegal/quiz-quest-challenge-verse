
import React from 'react';
import { Block, EditableContent } from '@/types/editor';
import { StyleResult } from '@/types/quiz';

export interface EditableBlockProps {
  block: Block;
  isSelected: boolean;
  onClick: () => void;
  isPreviewMode: boolean;
  onReorderBlocks: (sourceIndex: number, destinationIndex: number) => void;
  primaryStyle: StyleResult;
}

export const EditableBlock: React.FC<EditableBlockProps> = ({
  block,
  isSelected,
  onClick,
  isPreviewMode,
  onReorderBlocks,
  primaryStyle
}) => {
  const renderBlockContent = () => {
    switch (block.type) {
      case 'header':
        return (
          <div className="text-center py-4">
            <h1 className="text-2xl font-bold text-[#432818]">
              {block.content.title || 'Header Title'}
            </h1>
          </div>
        );
      case 'text':
        return (
          <div className="py-4">
            <p className="text-[#432818]">
              {block.content.text || 'Text content goes here'}
            </p>
          </div>
        );
      case 'image':
        return (
          <div className="py-4">
            {block.content.imageUrl ? (
              <img 
                src={block.content.imageUrl} 
                alt="Block image" 
                className="max-w-full h-auto rounded"
              />
            ) : (
              <div className="bg-gray-200 h-48 rounded flex items-center justify-center">
                <span className="text-gray-500">Image placeholder</span>
              </div>
            )}
          </div>
        );
      case 'button':
        return (
          <div className="py-4">
            <button className="bg-[#B89B7A] text-white px-6 py-2 rounded">
              {block.content.buttonText || 'Button Text'}
            </button>
          </div>
        );
      default:
        return (
          <div className="py-4">
            <p className="text-gray-500">Unknown block type: {block.type}</p>
          </div>
        );
    }
  };

  return (
    <div
      className={`
        border-2 transition-all duration-200 cursor-pointer
        ${isSelected 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-transparent hover:border-gray-300'
        }
        ${isPreviewMode ? 'pointer-events-none' : ''}
      `}
      onClick={onClick}
      style={{ backgroundColor: block.content.backgroundColor }}
    >
      {renderBlockContent()}
    </div>
  );
};

export default EditableBlock;
