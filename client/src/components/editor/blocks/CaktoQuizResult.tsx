import React from 'react';
import { cn } from '@/lib/utils';
import { BlockData } from '@/types/blocks';
import { Award, Download, Share2, Sparkles } from 'lucide-react';

interface CaktoQuizResultProps {
  block: BlockData;
  isSelected?: boolean;
  onClick?: () => void;
  onPropertyChange?: (key: string, value: any) => void;
  disabled?: boolean;
  className?: string;
}

export const CaktoQuizResult: React.FC<CaktoQuizResultProps> = ({
  block,
  isSelected = false,
  onClick,
  onPropertyChange,
  disabled = false,
  className
}) => {
  const {
    title = 'Seu Estilo Predominante',
    styleType = 'Clássico Elegante',
    description = 'Você tem um estilo sofisticado e atemporal, priorizando peças de qualidade e elegância.',
    confidence = 95,
    characteristics = [
      'Prefere cores neutras e sóbrias',
      'Investe em peças de qualidade',
      'Gosta de looks bem estruturados',
      'Valoriza a elegância sobre tendências'
    ],
    recommendations = [
      'Blazers bem cortados',
      'Calças de alfaiataria',
      'Sapatos de couro',
      'Acessórios discretos'
    ],
    backgroundImage,
    primaryColor = '#B89B7A',
    textColor = '#2D2D2D',
    resultImage
  } = block.properties || {};

  return (
    <div
      className={cn(
        'w-full min-h-screen flex flex-col justify-center items-center relative overflow-hidden',
        'bg-gradient-to-br from-neutral-50 to-neutral-100',
        isSelected && 'ring-4 ring-blue-500 ring-opacity-50',
        !disabled && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: textColor
      }}
    >
      {/* Overlay escuro se houver imagem de fundo */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />
      )}

      {/* Conteúdo principal */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 py-8">
        
        {/* Cabeçalho com ícone de conquista */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <div 
              className="inline-flex p-4 rounded-full bg-white/10 backdrop-blur-sm"
              style={{ color: primaryColor }}
            >
              <Award className="w-16 h-16" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            {title}
          </h1>

          {/* Tipo de estilo com destaque */}
          <div 
            className="inline-block px-8 py-3 rounded-full text-white font-bold text-xl md:text-2xl mb-6"
            style={{ backgroundColor: primaryColor }}
          >
            {styleType}
          </div>

          {/* Nível de confiança */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-3">
              <span className="text-lg font-medium text-gray-600">Confiança:</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-3">
                  <div 
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${confidence}%`,
                      backgroundColor: primaryColor 
                    }}
                  />
                </div>
                <span className="font-bold text-lg" style={{ color: primaryColor }}>
                  {confidence}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Seção principal do resultado */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          
          {/* Imagem do resultado */}
          <div className="flex justify-center">
            <div className="relative">
              {resultImage ? (
                <img
                  src={resultImage}
                  alt={styleType}
                  className="w-full max-w-md h-auto rounded-2xl shadow-2xl"
                />
              ) : (
                <div 
                  className="w-full max-w-md h-80 rounded-2xl flex items-center justify-center text-white"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Sparkles className="w-24 h-24 opacity-60" />
                </div>
              )}
              
              {/* Badge decorativo */}
              <div 
                className="absolute -top-3 -right-3 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: primaryColor }}
              >
                #{confidence}%
              </div>
            </div>
          </div>

          {/* Descrição e características */}
          <div className="space-y-8">
            
            {/* Descrição */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>
                Sobre seu estilo
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {description}
              </p>
            </div>

            {/* Características */}
            {characteristics && characteristics.length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>
                  Suas características
                </h3>
                <ul className="space-y-3">
                  {characteristics.map((char: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5"
                        style={{ backgroundColor: primaryColor }}
                      >
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                      <span className="text-gray-700">{char}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Recomendações */}
        {recommendations && recommendations.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-center mb-8" style={{ color: primaryColor }}>
              Recomendações para você
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {recommendations.map((rec: string, index: number) => (
                <div 
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <span className="text-gray-800 font-medium">{rec}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Botões de ação */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            className={cn(
              'inline-flex items-center justify-center px-8 py-3 rounded-full',
              'text-white font-semibold hover:scale-105 transition-all duration-300',
              'shadow-lg hover:shadow-xl'
            )}
            style={{ backgroundColor: primaryColor }}
          >
            <Download className="w-5 h-5 mr-2" />
            Baixar Resultado
          </button>
          
          <button
            className={cn(
              'inline-flex items-center justify-center px-8 py-3 rounded-full',
              'border-2 font-semibold hover:scale-105 transition-all duration-300',
              'bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl'
            )}
            style={{ 
              borderColor: primaryColor,
              color: primaryColor 
            }}
          >
            <Share2 className="w-5 h-5 mr-2" />
            Compartilhar
          </button>
        </div>

        {/* Indicador de progresso - 100% completo */}
        <div className="flex justify-center">
          <div className="flex space-x-2">
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full transition-all duration-300 opacity-100"
                style={{ backgroundColor: primaryColor }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Marca do CaktoQuiz */}
      <div className="absolute bottom-6 right-6 z-30">
        <div className="px-4 py-2 rounded-lg text-white font-medium text-sm bg-black bg-opacity-20 backdrop-blur-sm">
          CaktoQuiz
        </div>
      </div>

      {/* Confetti animado */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="absolute animate-confetti opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              backgroundColor: i % 2 === 0 ? primaryColor : '#FFD700',
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CaktoQuizResult;
