import React, { useEffect } from 'react';
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

const HeadingInlineBlock: React.FC<BlockComponentProps> = ({ 
  block,
  isSelected = false,
  onPropertyChange,
  className = ''
}) => {
  const { 
    content = 'Seu Título Aqui',
    title = 'Título Principal',
    subtitle = '',
    level = 'h2',
    size = 'large',
    titleSize = 'large',
    subtitleSize = 'medium',
    alignment = 'center',
    showSubtitle = false,
    useUsername = false,
    usernamePattern = 'Olá {{username}}!',
    trackingEnabled = false,
    animation = 'fadeIn',
    theme = 'primary'
  } = block.properties;

  // Get username from context (placeholder)
  const username = 'Usuário';

  useEffect(() => {
    if (trackingEnabled) {
      trackComponentView(block.id, 'heading-inline');
    }
  }, [trackingEnabled, block.id]);

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  const handleClick = () => {
    if (trackingEnabled) {
      trackComponentClick(block.id, 'heading-inline', 'heading_click');
    }
  };

  // Use title if available, fallback to content for backward compatibility
  const displayTitle = title || content;
  
  const personalizedTitle = getPersonalizedText(
    displayTitle,
    usernamePattern || displayTitle,
    username,
    useUsername
  );

  const sizeClasses = {
    small: 'text-lg md:text-xl',
    medium: 'text-xl md:text-2xl lg:text-3xl',
    large: 'text-2xl md:text-3xl lg:text-4xl xl:text-5xl',
    xl: 'text-3xl md:text-4xl lg:text-5xl xl:text-6xl'
  };

  const subtitleSizeClasses = {
    small: 'text-sm md:text-base',
    medium: 'text-base md:text-lg',
    large: 'text-lg md:text-xl'
  };

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  const HeadingTag = level as keyof JSX.IntrinsicElements;

  return (
    <InlineBaseWrapper
      block={block}
      isSelected={isSelected}
      onPropertyChange={onPropertyChange}
      className={cn(className, INLINE_ANIMATIONS[animation as keyof typeof INLINE_ANIMATIONS])}
      minHeight="3rem"
      editLabel="Editar Título"
    >
      <div 
        className={cn(
          "w-full",
          RESPONSIVE_PATTERNS.MOBILE_CENTER,
          alignmentClasses[alignment as keyof typeof alignmentClasses]
        )}
        onClick={handleClick}
      >
        {/* Main Title */}
        <HeadingTag 
          className={cn(
            "w-full font-bold text-gray-900 leading-tight",
            sizeClasses[size as keyof typeof sizeClasses],
            alignmentClasses[alignment as keyof typeof alignmentClasses],
            subtitle && "mb-2"
          )}
        >
          <InlineEditableText
            value={personalizedTitle}
            onChange={(value) => handlePropertyChange(title ? 'title' : 'content', value)}
            placeholder="Digite seu título aqui..."
            fontSize={titleSize as any}
            fontWeight="bold"
            textAlign={alignment as any}
            className="w-full bg-transparent outline-none"
          />
        </HeadingTag>
        
        {/* Subtitle */}
        {(showSubtitle || subtitle) && (
          <div className={cn(
            "text-gray-600 leading-relaxed mt-2",
            subtitleSizeClasses[subtitleSize as keyof typeof subtitleSizeClasses],
            alignmentClasses[alignment as keyof typeof alignmentClasses]
          )}>
            <InlineEditableText
              value={subtitle}
              onChange={(value) => handlePropertyChange('subtitle', value)}
              placeholder="Subtítulo opcional..."
              fontSize={subtitleSize as any}
              fontWeight="normal"
              textAlign={alignment as any}
              multiline={true}
              maxLines={2}
              className="w-full bg-transparent outline-none text-gray-600"
            />
          </div>
        )}
      </div>
    </InlineBaseWrapper>
  );
};

export default HeadingInlineBlock;