import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Sparkles, Heart, Crown } from 'lucide-react';
import type { QuizResult } from '@/types/quiz';
import { getStyleById } from '@/data/styles';

interface CaktoQuizResultProps {
  result: QuizResult;
  onContinue?: () => void;
}

export const CaktoQuizResult: React.FC<CaktoQuizResultProps> = ({
  result,
  onContinue
}) => {
  const predominantStyleData = getStyleById(result.predominantStyle);
  const complementaryStylesData = result.complementaryStyles.map(styleId => 
    getStyleById(styleId)
  );

  const predominantScore = result.styleScores.find(s => s.style === result.predominantStyle);
  const complementaryScores = result.complementaryStyles.map(styleId =>
    result.styleScores.find(s => s.style === styleId)
  ).filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Crown className="w-8 h-8 text-yellow-500" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Parabéns, {result.participantName}!
            </h1>
          </div>
          <p className="text-xl text-gray-600">
            Descobrimos seu perfil de estilo único
          </p>
        </div>

        {/* Predominant Style */}
        <Card className="mb-8 overflow-hidden shadow-xl">
          <div 
            className="relative p-8 text-white"
            style={{ 
              background: `linear-gradient(135deg, ${predominantStyleData.colors.primary} 0%, ${predominantStyleData.colors.accent} 100%)` 
            }}
          >
            <div className="absolute top-4 right-4">
              <Sparkles className="w-8 h-8 text-yellow-300" />
            </div>
            
            <div className="text-center mb-6">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                SEU ESTILO É
              </h2>
              <h3 className="text-4xl md:text-5xl font-black uppercase tracking-wide">
                {predominantStyleData.name}
              </h3>
            </div>

            {/* Percentage */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-semibold">Compatibilidade</span>
                <span className="text-2xl font-bold">{predominantScore?.percentage}%</span>
              </div>
              <Progress 
                value={predominantScore?.percentage || 0} 
                className="h-3 bg-white/20"
              />
            </div>

            {/* Description */}
            <p className="text-lg leading-relaxed opacity-95">
              {predominantStyleData.description}
            </p>
          </div>

          {/* Style Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Personal Style Image */}
            <div className="relative">
              <img
                src={predominantStyleData.imageUrl}
                alt={`Estilo ${predominantStyleData.name} - Imagem Pessoal`}
                className="w-full h-64 md:h-80 object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h4 className="text-white font-semibold text-lg">
                  Seu Estilo Pessoal
                </h4>
              </div>
            </div>

            {/* Style Guide Image */}
            <div className="relative">
              <img
                src={predominantStyleData.guideImageUrl}
                alt={`Estilo ${predominantStyleData.name} - Guia`}
                className="w-full h-64 md:h-80 object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h4 className="text-white font-semibold text-lg">
                  Guia de Estilo
                </h4>
              </div>
            </div>
          </div>
        </Card>

        {/* Complementary Styles */}
        {complementaryStylesData.length > 0 && (
          <div className="mb-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Seus Estilos Complementares
              </h3>
              <p className="text-gray-600">
                Estes estilos também fazem parte da sua personalidade
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {complementaryStylesData.map((style, index) => {
                const score = complementaryScores[index];
                return (
                  <Card key={style.id} className="p-6 shadow-lg">
                    <div className="flex items-center gap-2 mb-4">
                      <Heart className="w-5 h-5 text-pink-500" />
                      <h4 className="text-xl font-bold" style={{ color: style.colors.primary }}>
                        {style.name}
                      </h4>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Compatibilidade</span>
                        <span className="font-semibold">{score?.percentage}%</span>
                      </div>
                      <Progress 
                        value={score?.percentage || 0} 
                        className="h-2"
                      />
                    </div>

                    <div className="flex gap-2">
                      {style.keywords.slice(0, 3).map((keyword, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs font-medium rounded-full"
                          style={{ 
                            backgroundColor: style.colors.secondary,
                            color: style.colors.primary
                          }}
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Statistics */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-gray-50 to-gray-100">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            Resumo da Análise
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {result.totalNormalQuestions}
              </div>
              <div className="text-sm text-gray-600">Questões Analisadas</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-pink-600">
                {predominantScore?.points}
              </div>
              <div className="text-sm text-gray-600">Pontos Predominante</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {result.styleScores.filter(s => s.points > 0).length}
              </div>
              <div className="text-sm text-gray-600">Estilos Identificados</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {predominantScore?.percentage}%
              </div>
              <div className="text-sm text-gray-600">Precisão</div>
            </div>
          </div>
        </Card>

        {/* Call to Action */}
        {onContinue && (
          <div className="text-center">
            <button
              onClick={onContinue}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Descobrir Como Aplicar Meu Estilo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaktoQuizResult;
