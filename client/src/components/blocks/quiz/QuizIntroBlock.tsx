import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useQuizTracking } from '@/hooks/useQuizTracking';
import { InlineEditableText } from '../InlineEditableText';
import type { BlockComponentProps } from '@/types/blocks';

/**
 * QuizIntroBlock - Schema-driven compatible version
 * 
 * Integrado com o sistema de edição visual schema-driven
 * Suporta edição inline e propriedades dinâmicas
 * 
 * @example
 * <QuizIntroBlock
 *   block={{
 *     id: 'quiz-intro-1',
 *     type: 'quiz-intro',
 *     properties: {
 *       title: 'Descubra Seu Estilo Pessoal',
 *       subtitle: 'Um quiz personalizado...',
 *       buttonText: 'Iniciar Quiz'
 *     }
 *   }}
 *   isSelected={false}
 *   onClick={() => {}}
 *   onPropertyChange={(key, value) => {}}
 * />
 */

// Interface compatível com schema-driven system
export interface QuizIntroBlockProps extends BlockComponentProps {
  // Props específicas do quiz intro (opcional - fallback para compatibilidade)
  onStart?: (nome: string) => void;
}

const QuizIntroBlock: React.FC<QuizIntroBlockProps> = ({
  block,
  isSelected = false,
  isEditing = false,
  onClick,
  onPropertyChange,
  onStart,
  className = '',
}) => {
  const [nome, setNome] = useState('');
  const [error, setError] = useState('');
  const { trackUIInteraction, trackCTAClick } = useQuizTracking();

  // Extrair propriedades do schema com valores padrão (usando cores da marca)
  const {
    title = 'Descubra Seu Estilo Pessoal',
    subtitle = 'Um quiz personalizado para descobrir seu estilo único',
    description = 'Responda algumas perguntas e descubra o estilo que combina perfeitamente com você.',
    inputPlaceholder = 'Digite seu primeiro nome',
    buttonText = 'Iniciar Quiz',
    backgroundColor = '#fffaf7', // brand-cream
    textColor = '#432818', // brand-coffee
    backgroundImage,
    showBenefits = true,
    benefits = [
      'Descubra seu estilo único',
      'Recomendações personalizadas', 
      'Resultado instantâneo'
    ]
  } = block.properties;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nome.trim()) {
      setError('Por favor, digite seu nome para continuar');
      trackUIInteraction('form_validation', 'name_input', 'validation_error', {
        error: 'empty_name'
      });
      return;
    }
    
    setError('');
    trackCTAClick('quiz_start', `Iniciar Quiz - ${nome.trim()}`);
    
    if (onStart) {
      onStart(nome.trim());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNome(value);
    setError('');
    
    if (value.length > 0 && nome.length === 0) {
      trackUIInteraction('form_field', 'name_input', 'first_input', {
        field: 'name'
      });
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      window.performance.mark('component-mounted');
    }
  }, []);

  return (
    <div
      className={cn(
        'min-h-screen flex flex-col items-center justify-center p-8',
        'transition-all duration-200',
        isSelected && 'ring-2 ring-blue-500 ring-offset-2',
        className
      )}
      style={{ backgroundColor, color: textColor }}
      onClick={handleClick}
      data-block-id={block.id}
      data-block-type={block.type}
    >
      {/* Background Image */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      <div className="relative z-10 w-full max-w-2xl mx-auto space-y-8 text-center">
        {/* Título */}
        <div className="space-y-4">
          <InlineEditableText
            value={title}
            onChange={(value) => handlePropertyChange('title', value)}
            className="text-4xl md:text-5xl font-bold leading-tight"
            style={{ color: textColor }}
            isEditing={isEditing}
            placeholder="Título do quiz"
          />
          
          <InlineEditableText
            value={subtitle}
            onChange={(value) => handlePropertyChange('subtitle', value)}
            className="text-xl md:text-2xl text-opacity-80"
            style={{ color: textColor }}
            isEditing={isEditing}
            placeholder="Subtítulo explicativo"
          />
          
          <InlineEditableText
            value={description}
            onChange={(value) => handlePropertyChange('description', value)}
            className="text-lg text-opacity-70"
            style={{ color: textColor }}
            isEditing={isEditing}
            placeholder="Descrição detalhada"
          />
        </div>

        {/* Benefícios */}
        {showBenefits && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">O que você vai descobrir:</h3>
            <div className="grid gap-2 text-left max-w-md mx-auto">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-current rounded-full opacity-60" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
          <div>
            <Input
              type="text"
              placeholder={inputPlaceholder}
              value={nome}
              onChange={handleInputChange}
              className={cn(
                "w-full p-4 text-lg rounded-lg border-2 bg-white/90",
                error 
                  ? "border-red-500 focus:ring-red-500" 
                  : "border-gray-300 focus:border-blue-500"
              )}
              autoFocus
              required
            />
            {error && (
              <p className="mt-2 text-sm text-red-500 font-medium">{error}</p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={!nome.trim()}
            className={cn(
              'w-full py-4 px-6 text-lg font-semibold rounded-lg',
              'transition-all duration-300 transform',
              'focus:outline-none focus:ring-4 focus:ring-opacity-50',
              nome.trim()
                ? 'bg-[#B89B7A] hover:bg-[#A38A69] text-white hover:scale-105 shadow-lg focus:ring-[#B89B7A]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            )}
          >
            <InlineEditableText
              value={buttonText}
              onChange={(value) => handlePropertyChange('buttonText', value)}
              isEditing={isEditing}
              placeholder="Texto do botão"
            />
          </button>
        </form>

        {/* Privacy notice */}
        <p className="text-sm opacity-70 max-w-md mx-auto">
          Seu nome é necessário para personalizar sua experiência. 
          Respeitamos sua privacidade.
        </p>
      </div>
    </div>
  );
};

export default QuizIntroBlock;
