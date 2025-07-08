import React, { useEffect } from 'react';
import InlineBaseWrapper from './base/InlineBaseWrapper';
import InlineEditableText from './base/InlineEditableText';
import type { BlockComponentProps } from '@/types/blocks';
import { 
  getPersonalizedText, 
  trackComponentView, 
  trackComponentClick,
  RESPONSIVE_PATTERNS 
} from '@/utils/inlineComponentUtils';

const TextInlineBlock: React.FC<BlockComponentProps> = ({ 
  block,
  isSelected = false,
  onPropertyChange,
  className = ''
}) => {
  const { 
    content = 'Conteúdo do texto aqui...',
    fontSize = 'base',
    fontWeight = 'normal',
    textAlign = 'left',
    useUsername = false,
    usernamePattern = '',
    trackingEnabled = false,
    animation = 'fadeIn'
  } = block.properties;

  // Get username from context or props (placeholder for now)
  const username = 'Usuário'; // This would come from user context

  useEffect(() => {
    if (trackingEnabled) {
      trackComponentView(block.id, 'text-inline');
    }
  }, [trackingEnabled, block.id]);

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  const handleClick = () => {
    if (trackingEnabled) {
      trackComponentClick(block.id, 'text-inline', 'text_click');
    }
  };

  const personalizedContent = getPersonalizedText(
    content,
    usernamePattern || content,
    username,
    useUsername
  );

  return (
    <InlineBaseWrapper
      block={block}
      isSelected={isSelected}
      onPropertyChange={onPropertyChange}
      className={className}
      minHeight="2rem"
      editLabel="Editar Texto"
    >
      <div 
        className={`
          w-full flex items-center
          ${RESPONSIVE_PATTERNS.MOBILE_CENTER}
        `}
        onClick={handleClick}
      >
        <InlineEditableText
          value={personalizedContent}
          onChange={(value) => handlePropertyChange('content', value)}
          placeholder="Digite seu texto aqui..."
          fontSize={fontSize as any}
          fontWeight={fontWeight as any}
          textAlign={textAlign as any}
          multiline={true}
          maxLines={3}
          className="w-full leading-relaxed"
        />
      </div>
    </InlineBaseWrapper>
  );
};

export default TextInlineBlock;