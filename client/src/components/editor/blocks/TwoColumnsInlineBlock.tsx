import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import InlineBaseWrapper from './base/InlineBaseWrapper';
import InlineEditableText from './base/InlineEditableText';
import type { BlockComponentProps } from '@/types/blocks';
import { 
  getPersonalizedText, 
  trackComponentView, 
  trackComponentClick,
  RESPONSIVE_PATTERNS,
  INLINE_ANIMATIONS
} from '@/utils/inlineComponentUtils';
import { 
  BRAND_COLORS,
  TYPOGRAPHY,
  ANIMATIONS,
  EFFECTS,
  SPACING
} from '@/utils/brandDesignSystem';
import { Star, Edit3, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ReviewItem {
  id: string;
  name: string;
  handle: string;
  review: string;
  rating: number;
  avatar?: string;
}

const TwoColumnsInlineBlock: React.FC<BlockComponentProps> = ({ 
  block,
  isSelected = false,
  onPropertyChange,
  className = ''
}) => {
  const { 
    title = 'Depoimentos dos Clientes',
    layout = 'grid',
    columnType = 'reviews',
    items = [
      {
        id: '1',
        name: 'Ana Silva',
        handle: '@anasilva',
        review: 'Produto incrível! Superou todas as minhas expectativas.',
        rating: 5
      },
      {
        id: '2',
        name: 'Carlos Santos',
        handle: '@carlossantos',
        review: 'Atendimento excepcional e entrega rápida. Recomendo!',
        rating: 5
      }
    ] as ReviewItem[],
    showTitle = true,
    showRating = true,
    showHandle = true,
    cardStyle = 'bordered',
    alignment = 'center',
    spacing = 'normal',
    useUsername = false,
    trackingEnabled = false,
    animation = 'fadeIn'
  } = block.properties;

  const [isEditing, setIsEditing] = useState(false);
  
  // Get username from context (placeholder)
  const username = 'Usuário';

  useEffect(() => {
    if (trackingEnabled) {
      trackComponentView(block.id, 'two-columns-inline');
    }
  }, [trackingEnabled, block.id]);

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  const addItem = () => {
    const newItem: ReviewItem = {
      id: Date.now().toString(),
      name: 'Novo Cliente',
      handle: '@cliente',
      review: 'Digite seu depoimento aqui...',
      rating: 5
    };
    handlePropertyChange('items', [...items, newItem]);
  };

  const updateItem = (id: string, field: keyof ReviewItem, value: any) => {
    const updatedItems = items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    handlePropertyChange('items', updatedItems);
  };

  const removeItem = (id: string) => {
    const updatedItems = items.filter(item => item.id !== id);
    handlePropertyChange('items', updatedItems);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          'w-4 h-4 transition-colors',
          i < rating 
            ? `text-[${BRAND_COLORS.warning}] fill-current` 
            : 'text-gray-300'
        )}
      />
    ));
  };

  const cardStyles = {
    bordered: `border-2 border-[${BRAND_COLORS.primary.light}] bg-white`,
    filled: `bg-[${BRAND_COLORS.primary.light}] border-transparent`,
    minimal: 'bg-white border border-gray-200',
    elevated: `bg-white border border-[${BRAND_COLORS.primary.main}] ${EFFECTS.shadows.brand}`
  };

  const spacingClasses = {
    tight: 'gap-2 md:gap-3',
    normal: 'gap-3 md:gap-4',
    loose: 'gap-4 md:gap-6'
  };

  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  };

  return (
    <InlineBaseWrapper
      block={block}
      isSelected={isSelected}
      onPropertyChange={onPropertyChange}
      className={cn(className, INLINE_ANIMATIONS[animation as keyof typeof INLINE_ANIMATIONS])}
      minHeight="12rem"
      editLabel="Editar Duas Colunas"
    >
      <div className={cn(
        'w-full',
        SPACING.section.y,
        alignmentClasses[alignment as keyof typeof alignmentClasses]
      )}>
        {/* Title */}
        {showTitle && (
          <div className="mb-6">
            <InlineEditableText
              value={getPersonalizedText(title, title, username, useUsername)}
              onChange={(value) => handlePropertyChange('title', value)}
              placeholder="Título da seção..."
              className={cn(
                TYPOGRAPHY.heading.h2,
                `text-[${BRAND_COLORS.secondary.main}]`,
                'mb-2'
              )}
              fontWeight="bold"
              textAlign={alignment as any}
            />
          </div>
        )}

        {/* Two Columns Grid - RESPONSIVO */}
        <div className={cn(
          // Mobile: 1 coluna, Tablet+: 2 colunas
          'grid grid-cols-1 md:grid-cols-2',
          spacingClasses[spacing as keyof typeof spacingClasses],
          'w-full max-w-4xl mx-auto'
        )}>
          {items.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                // Card styling com identidade da marca
                cardStyles[cardStyle as keyof typeof cardStyles],
                'rounded-lg p-4 md:p-6',
                ANIMATIONS.transition,
                ANIMATIONS.hover.lift,
                'group relative',
                'min-h-[200px] flex flex-col justify-between'
              )}
            >
              {/* Edit Controls - Visible when selected */}
              {isSelected && (
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 bg-white/90 hover:bg-white"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="w-3 h-3 text-red-500" />
                  </Button>
                </div>
              )}

              {/* Review Content */}
              <div className="flex flex-col gap-3">
                {/* Rating Stars */}
                {showRating && (
                  <div className={cn(
                    'flex gap-1',
                    alignment === 'center' && 'justify-center',
                    alignment === 'right' && 'justify-end'
                  )}>
                    {renderStars(item.rating)}
                  </div>
                )}

                {/* Review Text */}
                <div className="flex-1">
                  <InlineEditableText
                    value={item.review}
                    onChange={(value) => updateItem(item.id, 'review', value)}
                    placeholder="Depoimento do cliente..."
                    className={cn(
                      TYPOGRAPHY.body.base,
                      `text-[${BRAND_COLORS.text.secondary}]`,
                      'italic leading-relaxed'
                    )}
                    textAlign={alignment as any}
                    multiline
                  />
                </div>

                {/* Author Info */}
                <div className={cn(
                  'flex flex-col gap-1',
                  alignment === 'center' && 'items-center',
                  alignment === 'right' && 'items-end'
                )}>
                  <InlineEditableText
                    value={item.name}
                    onChange={(value) => updateItem(item.id, 'name', value)}
                    placeholder="Nome do cliente"
                    className={cn(
                      TYPOGRAPHY.heading.h6,
                      `text-[${BRAND_COLORS.secondary.main}]`
                    )}
                    fontWeight="bold"
                    textAlign={alignment as any}
                  />
                  
                  {showHandle && (
                    <InlineEditableText
                      value={item.handle}
                      onChange={(value) => updateItem(item.id, 'handle', value)}
                      placeholder="@handle"
                      className={cn(
                        TYPOGRAPHY.body.small,
                        `text-[${BRAND_COLORS.text.muted}]`
                      )}
                      textAlign={alignment as any}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Add New Item - Only when selected */}
          {isSelected && (
            <div className={cn(
              'border-2 border-dashed border-gray-300 rounded-lg',
              'flex items-center justify-center',
              'min-h-[200px] group cursor-pointer',
              'hover:border-gray-400 transition-colors'
            )}
            onClick={addItem}
            >
              <div className="text-center text-gray-500 group-hover:text-gray-700">
                <Plus className="w-8 h-8 mx-auto mb-2" />
                <span className={TYPOGRAPHY.body.small}>
                  Adicionar Item
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Instructions - Only when selected and editing */}
        {isSelected && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className={cn(TYPOGRAPHY.body.small, 'text-blue-700')}>
              💡 <strong>Dica:</strong> Clique nos textos para editar. Em mobile, as colunas ficam uma embaixo da outra automaticamente.
            </p>
          </div>
        )}
      </div>
    </InlineBaseWrapper>
  );
};

export default TwoColumnsInlineBlock;
