import React from 'react';
import { CheckCircle } from 'lucide-react';
import { InlineEditableText } from './InlineEditableText';
import type { BlockComponentProps } from '@/types/blocks';

/**
 * QuestionMultipleBlock - Pergunta de múltipla escolha completa
 * 
 * Suporta:
 * - Layout configurável (colunas, direção, disposição)
 * - Validações (múltipla escolha, obrigatório, auto-avançar)
 * - Estilização (bordas, sombras, espaçamento, detalhes)
 * - Personalização de cores
 * - Edição inline da pergunta (opções são editáveis via painel)
 */

interface QuestionOption {
  text: string;
  value: string;
  imageUrl?: string;
}

const QuestionMultipleBlock: React.FC<BlockComponentProps> = ({
  block,
  isSelected = false,
  onClick,
  onPropertyChange
}) => {
  if (!block?.properties) {
    return (
      <div className="p-4 border-2 border-red-300 bg-red-50 rounded-lg">
        <p className="text-red-600 font-medium">Erro: Configuração do bloco inválida</p>
      </div>
    );
  }

  const {
    // Conteúdo
    question = 'Qual é a sua pergunta?',
    options = [
      { text: 'Opção A', value: 'a' },
      { text: 'Opção B', value: 'b' },
      { text: 'Opção C', value: 'c' },
      { text: 'Opção D', value: 'd' },
    ],
    
    // Layout
    columns = '2',
    direction = 'vertical',
    contentLayout = 'text-image',
    
    // Validações
    multipleSelection = false,
    required = true,
    autoProceed = false,
    
    // Estilização
    borderStyle = 'sm',
    shadowStyle = 'none',
    spacing = 'md',
    detailStyle = 'none',
    optionVisualStyle = 'simple',
    
    // Cores
    primaryColor = '#B89B7A',
    textColor = '#432818',
    borderColor = '#B89B7A',
    
    // Geral
    maxWidth = 100,
    alignment = 'center',
    componentId
  } = block.properties;

  const handlePropertyChange = (key: string, value: string) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  // Classes CSS baseadas nas propriedades
  const getBorderClass = (style: string) => {
    switch (style) {
      case 'sm': return 'border-2 rounded-md';
      case 'md': return 'border-3 rounded-lg';
      case 'lg': return 'border-4 rounded-xl';
      case 'none': return '';
      default: return 'border-2 rounded-md';
    }
  };

  const getShadowClass = (style: string) => {
    switch (style) {
      case 'sm': return 'shadow-sm';
      case 'md': return 'shadow-md';
      case 'lg': return 'shadow-lg';
      case 'none': return '';
      default: return '';
    }
  };

  const getSpacingClass = (style: string) => {
    switch (style) {
      case 'sm': return 'gap-2';
      case 'md': return 'gap-4';
      case 'lg': return 'gap-6';
      default: return 'gap-4';
    }
  };

  const getGridColsClass = (cols: string) => {
    switch (cols) {
      case '1': return 'grid-cols-1';
      case '2': return 'grid-cols-1 md:grid-cols-2';
      case '3': return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case '4': return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
      default: return 'grid-cols-1 md:grid-cols-2';
    }
  };

  const getAlignmentClass = (align: string) => {
    switch (align) {
      case 'left': return 'text-left';
      case 'right': return 'text-right';
      case 'center': return 'text-center';
      default: return 'text-center';
    }
  };

  const hasImages = options.some((opt: QuestionOption) => opt.imageUrl && contentLayout !== 'text-only');
  const isHorizontal = direction === 'horizontal';

  return (
    <div
      className={`
        py-6 px-4 transition-all duration-200
        ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
      `}
      style={{ maxWidth: `${maxWidth}%` }}
      onClick={handleClick}
      data-block-id={block.id}
      data-block-type={block.type}
      id={componentId}
    >
      <div className={`space-y-6 max-w-5xl mx-auto ${getAlignmentClass(alignment)}`}>
        {/* Pergunta Principal */}
        <div className="mb-8">
          <InlineEditableText
            value={question}
            onSave={(value) => handlePropertyChange('question', value)}
            className="text-xl md:text-2xl font-semibold leading-relaxed"
            style={{ color: textColor }}
            placeholder="Qual é a sua pergunta?"
            isTextArea={true}
          />
        </div>

        {/* Grid de Opções */}
        <div className={`
          grid ${getGridColsClass(columns)} ${getSpacingClass(spacing)}
          ${isHorizontal ? 'flex flex-row flex-wrap justify-center' : 'w-full'}
        `}>
          {options.map((option: QuestionOption, index: number) => (
            <div
              key={index}
              className={`
                ${getBorderClass(borderStyle)}
                ${getShadowClass(shadowStyle)}
                hover:shadow-lg
                rounded-xl transition-all duration-300 cursor-pointer group overflow-hidden
                ${optionVisualStyle === 'card' ? 'p-4' : 'p-0'}
                hover:scale-105 transform
              `}
              style={{ 
                borderColor: borderStyle !== 'none' ? borderColor : 'transparent',
                backgroundColor: '#ffffff'
              }}
            >
              {/* Layout com Imagem */}
              {contentLayout !== 'text-only' && option.imageUrl && hasImages ? (
                <>
                  <div className="aspect-[4/3] overflow-hidden relative bg-gray-100">
                    <img
                      src={option.imageUrl}
                      alt={option.text}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = 'https://placehold.co/600x400/cccccc/333333?text=Erro+Imagem';
                      }}
                    />
                    {/* Detalhe Visual - Badge com letra */}
                    {detailStyle === 'full' && (
                      <div 
                        className="absolute top-4 left-4 w-10 h-10 text-white rounded-full flex items-center justify-center font-bold text-base group-hover:scale-110 transition-all shadow-lg"
                        style={{ backgroundColor: primaryColor }}
                      >
                        {String.fromCharCode(65 + index)}
                      </div>
                    )}
                  </div>
                  {/* Texto abaixo da imagem */}
                  {contentLayout !== 'image-only' && (
                    <div className="p-5">
                      <span 
                        className="text-base leading-relaxed font-medium block"
                        style={{ color: textColor }}
                      >
                        {option.text}
                      </span>
                    </div>
                  )}
                </>
              ) : (
                /* Layout Apenas Texto */
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Badge com letra */}
                    {detailStyle !== 'none' && (
                      <span 
                        className="font-bold min-w-[40px] h-10 w-10 rounded-full flex items-center justify-center group-hover:text-white transition-all text-base"
                        style={{ 
                          backgroundColor: `${primaryColor}1A`,
                          color: primaryColor 
                        }}
                      >
                        {String.fromCharCode(65 + index)}
                      </span>
                    )}
                    {/* Texto da opção */}
                    <span 
                      className="text-base leading-relaxed font-medium flex-1"
                      style={{ color: textColor }}
                    >
                      {option.text}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Indicadores de Validação */}
        <div className="space-y-2 text-center">
          {multipleSelection && (
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
              style={{ 
                backgroundColor: `${primaryColor}1A`, 
                color: primaryColor 
              }}
            >
              <CheckCircle className="w-4 h-4" />
              Selecione uma ou mais opções
            </div>
          )}
          
          {required && (
            <p className="text-sm text-red-500">
              * Esta pergunta é obrigatória
            </p>
          )}
          
          {autoProceed && (
            <p className="text-sm text-gray-500">
              ⚡ Avança automaticamente após seleção
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionMultipleBlock;
