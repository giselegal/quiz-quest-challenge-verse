import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import QuizResultDisplayBlock from '@/components/editor/blocks/QuizResultDisplayBlock';
import QuizResultMainCardBlock from '@/components/editor/blocks/QuizResultMainCardBlock';
import ResultPageBlock from '@/components/editor/blocks/ResultPageBlock';
import ResultsLibrary from '@/components/editor/ResultsLibrary';

const ResultsShowcase = () => {
  // Dados de teste para os blocos
  const sampleBlock = {
    id: 'test-result',
    type: 'quiz-result-display' as const,
    properties: {
      showAnimation: true,
      showCharacteristics: true,
      showProgressBar: true,
      accentColor: '#B89B7A',
      textColor: '#432818',
      backgroundColor: '#fffaf7',
      layoutStyle: 'card',
      customTitle: 'Seu Estilo Elegante',
      customDescription: 'Você tem um estilo sofisticado e refinado que reflete elegância em cada detalhe.'
    }
  };

  const handlePropertyChange = (key: string, value: any) => {
    console.log(`Propriedade alterada: ${key} = ${value}`);
  };

  const handleResultSelect = (result: any) => {
    console.log('Resultado selecionado:', result);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🏆 Showcase de Componentes de Resultado
          </h1>
          <p className="text-gray-600">
            Visualize todos os componentes de resultado disponíveis para quizzes
          </p>
        </div>

        <div className="space-y-12">
          {/* Quiz Result Display Block */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle>1. QuizResultDisplayBlock (Novo)</CardTitle>
                <p className="text-sm text-gray-600">
                  Componente integrado que carrega resultados automaticamente do localStorage
                </p>
              </CardHeader>
              <CardContent>
                <div className="bg-white rounded-lg border">
                  <QuizResultDisplayBlock
                    block={sampleBlock}
                    isSelected={false}
                    isEditing={false}
                    onClick={() => {}}
                    onPropertyChange={handlePropertyChange}
                  />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Layout Hero */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle>2. Layout Hero (Tela Cheia)</CardTitle>
                <p className="text-sm text-gray-600">
                  Resultado em tela cheia para maior impacto visual
                </p>
              </CardHeader>
              <CardContent>
                <div className="bg-white rounded-lg border h-96 overflow-hidden">
                  <QuizResultDisplayBlock
                    block={{
                      ...sampleBlock,
                      properties: {
                        ...sampleBlock.properties,
                        layoutStyle: 'hero'
                      }
                    }}
                    isSelected={false}
                    isEditing={false}
                    onClick={() => {}}
                    onPropertyChange={handlePropertyChange}
                  />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Layout Minimal */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle>3. Layout Minimal (Compacto)</CardTitle>
                <p className="text-sm text-gray-600">
                  Versão minimalista para espaços reduzidos
                </p>
              </CardHeader>
              <CardContent>
                <div className="bg-white rounded-lg border">
                  <QuizResultDisplayBlock
                    block={{
                      ...sampleBlock,
                      properties: {
                        ...sampleBlock.properties,
                        layoutStyle: 'minimal'
                      }
                    }}
                    isSelected={false}
                    isEditing={false}
                    onClick={() => {}}
                    onPropertyChange={handlePropertyChange}
                  />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* QuizResultMainCardBlock Existente */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle>4. QuizResultMainCardBlock (Existente)</CardTitle>
                <p className="text-sm text-gray-600">
                  Componente existente para resultados de estilo
                </p>
              </CardHeader>
              <CardContent>
                <div className="bg-white rounded-lg border">
                  <QuizResultMainCardBlock
                    block={{
                      id: 'main-card-test',
                      type: 'quiz-result-main-card',
                      properties: {
                        primaryStyle: 'elegante',
                        showStyleImage: true,
                        showCharacteristics: true,
                        accentColor: '#B89B7A',
                        textColor: '#432818'
                      }
                    }}
                    isSelected={false}
                    isEditing={false}
                    onClick={() => {}}
                    onPropertyChange={handlePropertyChange}
                  />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Results Library */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle>5. Biblioteca de Resultados</CardTitle>
                <p className="text-sm text-gray-600">
                  Gerencie e visualize todos os resultados disponíveis
                </p>
              </CardHeader>
              <CardContent>
                <ResultsLibrary onResultSelect={handleResultSelect} />
              </CardContent>
            </Card>
          </section>

          {/* Comparação de Variações */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle>6. Variações de Cores e Estilos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Variação Elegante */}
                  <div className="bg-white rounded-lg border p-4">
                    <h4 className="font-medium mb-2">Estilo Elegante</h4>
                    <QuizResultDisplayBlock
                      block={{
                        ...sampleBlock,
                        properties: {
                          ...sampleBlock.properties,
                          layoutStyle: 'minimal',
                          accentColor: '#B89B7A',
                          customTitle: 'Elegante',
                          customDescription: 'Sofisticação e refinamento'
                        }
                      }}
                      isSelected={false}
                      isEditing={false}
                      onClick={() => {}}
                      onPropertyChange={handlePropertyChange}
                    />
                  </div>

                  {/* Variação Natural */}
                  <div className="bg-white rounded-lg border p-4">
                    <h4 className="font-medium mb-2">Estilo Natural</h4>
                    <QuizResultDisplayBlock
                      block={{
                        ...sampleBlock,
                        properties: {
                          ...sampleBlock.properties,
                          layoutStyle: 'minimal',
                          accentColor: '#8FA389',
                          customTitle: 'Natural',
                          customDescription: 'Conforto e autenticidade'
                        }
                      }}
                      isSelected={false}
                      isEditing={false}
                      onClick={() => {}}
                      onPropertyChange={handlePropertyChange}
                    />
                  </div>

                  {/* Variação Contemporâneo */}
                  <div className="bg-white rounded-lg border p-4">
                    <h4 className="font-medium mb-2">Estilo Contemporâneo</h4>
                    <QuizResultDisplayBlock
                      block={{
                        ...sampleBlock,
                        properties: {
                          ...sampleBlock.properties,
                          layoutStyle: 'minimal',
                          accentColor: '#AA6B5D',
                          customTitle: 'Contemporâneo',
                          customDescription: 'Tendências e modernidade'
                        }
                      }}
                      isSelected={false}
                      isEditing={false}
                      onClick={() => {}}
                      onPropertyChange={handlePropertyChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Instruções de Uso */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>📋 Como Usar os Componentes de Resultado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">1. No Editor Integrado:</h4>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• Acesse /editor</li>
                <li>• Vá para aba "Componentes"</li>
                <li>• Clique em "Resultado do Quiz" (ícone de troféu)</li>
                <li>• Configure na aba "Quiz" usando a Biblioteca de Resultados</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">2. Configuração de Resultados:</h4>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• Use a Biblioteca de Resultados para criar templates</li>
                <li>• Configure características, cores e imagens</li>
                <li>• Conecte com questões do quiz via pontuação</li>
                <li>• Teste validação em tempo real</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">3. Layouts Disponíveis:</h4>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• <strong>Card:</strong> Layout padrão com card elegante</li>
                <li>• <strong>Hero:</strong> Tela cheia para maior impacto</li>
                <li>• <strong>Minimal:</strong> Versão compacta e clean</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResultsShowcase;
