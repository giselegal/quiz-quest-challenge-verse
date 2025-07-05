import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

/**
 * QuizIntroBlock - Componente de introdução do quiz (Etapa 1)
 * 
 * Props editáveis via editor visual:
 * - title: string - Título principal 
 * - subtitle: string - Subtítulo/descrição
 * - namePlaceholder: string - Placeholder do input de nome
 * - buttonText: string - Texto do botão
 * - showLogo: boolean - Mostrar logo
 * - logoUrl: string - URL do logo
 * - backgroundColor: string - Cor de fundo
 * - textColor: string - Cor do texto
 * - onStart: function - Callback ao iniciar
 * 
 * @example
 * <QuizIntroBlock
 *   blockId="quiz-intro-1"
 *   title="Descubra Seu Estilo Pessoal"
 *   subtitle="Um quiz personalizado para descobrir seu estilo único"
 *   namePlaceholder="Digite seu nome aqui..."
 *   buttonText="Iniciar Quiz"
 *   onStart={(nome) => console.log('Iniciando quiz para:', nome)}
 * />
 */

export interface QuizIntroBlockProps {
  // Identificação
  blockId: string;
  className?: string;
  style?: React.CSSProperties;

  // Conteúdo editável
  title?: string;
  subtitle?: string;
  namePlaceholder?: string;
  buttonText?: string;
  
  // Visual
  showLogo?: boolean;
  logoUrl?: string;
  backgroundColor?: string;
  textColor?: string;
  buttonColor?: string;
  
  // Funcionalidade
  onStart?: (nome: string) => void;
  disabled?: boolean;
  required?: boolean;
  
  // Layout
  alignment?: 'left' | 'center' | 'right';
  spacing?: 'compact' | 'normal' | 'spacious';
}

const QuizIntroBlock: React.FC<QuizIntroBlockProps> = ({
  blockId = 'quiz-intro-block',
  className = '',
  style = {},
  
  title = 'Descubra Seu Estilo Pessoal',
  subtitle = 'Um quiz personalizado para descobrir seu estilo único e transformar seu guarda-roupa',
  namePlaceholder = 'Digite seu nome aqui...',
  buttonText = 'Iniciar Quiz',
  
  showLogo = true,
  logoUrl = 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
  backgroundColor = '#ffffff',
  textColor = '#432818',
  buttonColor = '#B89B7A',
  
  onStart,
  disabled = false,
  required = true,
  
  alignment = 'center',
  spacing = 'normal',
}) => {
  const [nome, setNome] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (required && !nome.trim()) {
      setError('Por favor, digite seu nome para continuar');
      return;
    }
    
    setError('');
    if (onStart) {
      onStart(nome.trim());
    }
  };

  const spacingClasses = {
    compact: 'py-8 px-4 space-y-4',
    normal: 'py-12 px-6 space-y-6',
    spacious: 'py-16 px-8 space-y-8'
  };

  return (
    <div 
      className={`quiz-intro-block ${spacingClasses[spacing]} ${className}`}
      data-block-id={blockId}
      style={{ 
        backgroundColor,
        color: textColor,
        textAlign: alignment,
        ...style 
      }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Logo */}
        {showLogo && logoUrl && (
          <div className="mb-8">
            <img 
              src={logoUrl} 
              alt="Logo" 
              className="h-16 md:h-20 mx-auto object-contain"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Título */}
        <h1 
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          style={{ 
            fontFamily: 'Playfair Display, serif',
            color: textColor 
          }}
        >
          {title}
        </h1>

        {/* Subtítulo */}
        {subtitle && (
          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="max-w-md mx-auto">
            <Input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder={namePlaceholder}
              className={`w-full px-4 py-3 text-lg rounded-lg border-2 focus:ring-2 focus:ring-opacity-50 ${
                error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-[#B89B7A] focus:ring-[#B89B7A]'
              }`}
              disabled={disabled}
              autoFocus
            />
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={disabled}
            className="px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            style={{
              backgroundColor: buttonColor,
              color: '#ffffff'
            }}
          >
            {buttonText}
          </Button>
        </form>

        {/* Informações adicionais */}
        <div className="mt-8 text-sm text-gray-500">
          <p>✨ Leva apenas 3 minutos • 100% gratuito • Resultado instantâneo</p>
        </div>
      </div>
    </div>
  );
};

export default QuizIntroBlock;
