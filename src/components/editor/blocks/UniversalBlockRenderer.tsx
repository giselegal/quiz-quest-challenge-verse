import React from 'react';
import { Block } from '@/types/editor';
import { cn } from '@/lib/utils';

export interface UniversalBlockRendererProps {
  block: Block;
  isSelected?: boolean;
  isPreviewing?: boolean;
  mode?: 'editor' | 'preview' | 'production';
  onClick?: () => void;
  onUpdate?: (blockId: string, updates: Partial<Block>) => void;
  onDelete?: (blockId: string) => void;
  onPropertyChange?: (key: string, value: any) => void;
}

/**
 * UniversalBlockRenderer - Renderiza blocos baseado no tipo
 */
export const UniversalBlockRenderer: React.FC<UniversalBlockRendererProps> = ({
  block,
  isSelected = false,
  mode = 'production',
  onClick,
}) => {
  const props = block.properties || {};
  const content = block.content || {};
  const blockType = String(block.type);

  // Render based on block type
  const renderBlockContent = () => {
    switch (blockType) {
      case 'quiz-intro-header':
        return (
          <div className="flex flex-col items-center gap-4 p-4">
            {props.logoUrl && (
              <img 
                src={props.logoUrl} 
                alt={props.logoAlt || 'Logo'} 
                className="w-24 h-24 object-contain"
              />
            )}
            {props.showProgress && (
              <div className="w-full bg-stone-200 rounded-full h-2">
                <div 
                  className="bg-[#B89B7A] h-2 rounded-full transition-all"
                  style={{ width: `${props.progressValue || 0}%` }}
                />
              </div>
            )}
          </div>
        );

      case 'decorative-bar-inline':
        return (
          <div 
            className="w-full"
            style={{ 
              height: props.height || 4,
              backgroundColor: props.backgroundColor || '#B89B7A',
              marginTop: props.marginTop || 0,
              marginBottom: props.marginBottom || 24,
            }}
          />
        );

      case 'text-inline':
      case 'text-block':
        // Handle content that might be an object with numbered keys or a string
        let text = '';
        if (typeof content === 'string') {
          text = content;
        } else if (typeof content === 'object') {
          // Convert numbered object keys to string
          const keys = Object.keys(content).filter(k => !isNaN(Number(k))).sort((a, b) => Number(a) - Number(b));
          text = keys.map(k => (content as Record<string, string>)[k]).join('');
        }
        if (props.text) text = props.text;
        
        return (
          <div 
            className={cn(
              "text-stone-800",
              props.textAlign === 'center' && 'text-center',
              props.textAlign === 'right' && 'text-right',
            )}
            style={{
              fontSize: props.fontSize || '1rem',
              fontWeight: props.fontWeight || 'normal',
              color: props.color,
            }}
            dangerouslySetInnerHTML={{ __html: text }}
          />
        );

      case 'heading-inline':
      case 'heading-block':
        const HeadingTag = `h${props.level || 2}` as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag 
            className={cn(
              "font-semibold text-stone-800",
              props.textAlign === 'center' && 'text-center',
            )}
            style={{ color: props.color }}
          >
            {props.text || (content as Record<string, unknown>).text || ''}
          </HeadingTag>
        );

      case 'image-inline':
      case 'image-block':
        return (
          <div className={cn("flex", props.alignment === 'center' && 'justify-center')}>
            <img 
              src={props.src || props.url || ''} 
              alt={props.alt || ''} 
              className="max-w-full h-auto rounded"
              style={{ 
                maxWidth: props.maxWidth,
                borderRadius: props.borderRadius,
              }}
            />
          </div>
        );

      case 'button-inline':
      case 'button-block':
        return (
          <div className={cn("flex", props.alignment === 'center' && 'justify-center')}>
            <button 
              className={cn(
                "px-6 py-3 rounded-lg font-medium transition-all",
                "bg-[#B89B7A] text-white hover:bg-[#A08966]"
              )}
              style={{
                backgroundColor: props.backgroundColor,
                color: props.textColor,
              }}
            >
              {props.text || props.label || 'Continuar'}
            </button>
          </div>
        );

      case 'name-input-inline':
      case 'name-input-block':
        return (
          <div className="space-y-4">
            <input 
              type="text"
              placeholder={props.placeholder || 'Digite seu nome'}
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#B89B7A] focus:border-transparent"
            />
          </div>
        );

      case 'options-grid-inline':
      case 'options-grid':
        const options = props.options || [];
        return (
          <div className={cn(
            "grid gap-4",
            props.columns === 2 && 'grid-cols-2',
            props.columns === 3 && 'grid-cols-3',
            !props.columns && 'grid-cols-2 md:grid-cols-3'
          )}>
            {options.map((option: { id?: string; imageUrl?: string; label?: string; text?: string }, idx: number) => (
              <div 
                key={option.id || idx}
                className="p-4 border rounded-lg cursor-pointer hover:border-[#B89B7A] transition-all"
              >
                {option.imageUrl && (
                  <img src={option.imageUrl} alt={option.label || ''} className="w-full h-32 object-cover rounded mb-2" />
                )}
                <p className="text-center text-sm font-medium">{option.label || option.text}</p>
              </div>
            ))}
          </div>
        );

      case 'result-header-inline':
        return (
          <div className="text-center space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-[#B89B7A]">
              {props.title || 'Seu Resultado'}
            </h1>
            {props.subtitle && (
              <p className="text-stone-600">{props.subtitle}</p>
            )}
          </div>
        );

      case 'spacer-inline':
      case 'spacer-block':
        return <div style={{ height: props.height || 24 }} />;

      default:
        // Fallback for unknown block types
        if (mode === 'editor') {
          return (
            <div className="p-4 border-2 border-dashed border-stone-300 rounded-lg text-center text-stone-500">
              <p className="text-sm">Bloco: {blockType}</p>
              <p className="text-xs">ID: {block.id}</p>
            </div>
          );
        }
        return null;
    }
  };

  return (
    <div 
      className={cn(
        "block-renderer transition-all",
        isSelected && mode === 'editor' && "ring-2 ring-blue-500 ring-offset-2 rounded",
        onClick && "cursor-pointer"
      )}
      onClick={onClick}
    >
      {renderBlockContent()}
    </div>
  );
};

export default UniversalBlockRenderer;
