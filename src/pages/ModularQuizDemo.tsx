/**
 * ModularQuizDemo.tsx - Demonstration of the new modular quiz system
 * Shows the complete integration and usage example
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QuizFlowPage, QuizMode } from '../components/editor/quiz/QuizFlowPage';
import { QUIZ_STYLE_21_STEPS_TEMPLATE } from '@/templates/quiz21StepsComplete';

const ModularQuizDemo: React.FC = () => {
  const [currentMode, setCurrentMode] = useState<QuizMode>('preview');
  const [showExample, setShowExample] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              🎯 Quiz Quest - Sistema Modular de 21 Etapas
            </CardTitle>
            <div className="text-center text-gray-600">
              Arquitetura modular completa para gerenciamento das 21 etapas do quiz
            </div>
            <div className="flex justify-center gap-2 mt-4">
              <Badge variant="outline">8 Componentes Modulares</Badge>
              <Badge variant="outline">3 Modos de Operação</Badge>
              <Badge variant="outline">21 Etapas Configuradas</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant={currentMode === 'editor' ? 'default' : 'outline'}
                  onClick={() => setCurrentMode('editor')}
                  className="w-full"
                >
                  🔧 Editor Mode
                  <div className="text-xs opacity-70 block">Full editing + debug</div>
                </Button>
                <Button
                  variant={currentMode === 'preview' ? 'default' : 'outline'}
                  onClick={() => setCurrentMode('preview')}
                  className="w-full"
                >
                  👁️ Preview Mode
                  <div className="text-xs opacity-70 block">Identical to production</div>
                </Button>
                <Button
                  variant={currentMode === 'production' ? 'default' : 'outline'}
                  onClick={() => setCurrentMode('production')}
                  className="w-full"
                >
                  🚀 Production Mode
                  <div className="text-xs opacity-70 block">Final experience</div>
                </Button>
              </div>
              
              <Button 
                onClick={() => setShowExample(!showExample)}
                className="w-full max-w-md"
              >
                {showExample ? 'Ocultar Quiz' : 'Demonstrar Quiz Interativo'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Component Architecture Overview */}
        <Card>
          <CardHeader>
            <CardTitle>🏗️ Arquitetura dos Componentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  name: 'QuizFlowPage',
                  desc: 'Orquestração principal',
                  icon: '🎭',
                  features: ['Estado global', 'Navegação', 'Integração']
                },
                {
                  name: 'QuizNavigationBlock',
                  desc: 'Navegação inteligente',
                  icon: '🧭',
                  features: ['Progresso', 'Fases', 'Controles']
                },
                {
                  name: 'QuizStepRenderer',
                  desc: 'Renderização dinâmica',
                  icon: '🎨',
                  features: ['Tipos de etapas', 'Blocos', 'Templates']
                },
                {
                  name: 'QuizDataManager',
                  desc: 'Persistência de dados',
                  icon: '💾',
                  features: ['Auto-save', 'LocalStorage', 'Estado']
                },
                {
                  name: 'QuizValidationSystem',
                  desc: 'Validação em tempo real',
                  icon: '✅',
                  features: ['Regras', 'Feedback', 'Etapas']
                },
                {
                  name: 'QuizScoreCalculator',
                  desc: 'Cálculo automático',
                  icon: '🧮',
                  features: ['Algoritmos', 'Estilos', 'Pontuação']
                },
                {
                  name: 'QuizQuestionBlockModular',
                  desc: 'Blocos reutilizáveis',
                  icon: '🧩',
                  features: ['Questões', 'Layouts', 'Interação']
                },
                {
                  name: 'QuizEditorExample',
                  desc: 'Exemplo completo',
                  icon: '📚',
                  features: ['Demonstração', 'Configuração', 'Docs']
                }
              ].map((component, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-4">
                    <div className="text-2xl mb-2">{component.icon}</div>
                    <div className="font-semibold text-sm mb-1">{component.name}</div>
                    <div className="text-xs text-gray-600 mb-2">{component.desc}</div>
                    <div className="space-y-1">
                      {component.features.map((feature, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Interactive Quiz Demo */}
        {showExample && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                🎯 Quiz Interativo - Modo: {currentMode}
                <Badge variant="outline">{currentMode}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <QuizFlowPage
                mode={currentMode}
                template={QUIZ_STYLE_21_STEPS_TEMPLATE}
                customConfig={{
                  enableLivePreview: true,
                  enableValidation: true,
                  enableScoring: true,
                  theme: {
                    primaryColor: '#B89B7A',
                    backgroundColor: '#FEFEFE',
                    textColor: '#432818',
                  },
                }}
                onBlocksChange={(blocks) => {
                  console.log('Blocks changed:', blocks.length);
                }}
              />
            </CardContent>
          </Card>
        )}

        {/* Usage Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>📖 Como Usar o Sistema Modular</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">1. Importação Básica</h4>
              <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm">
                <pre>{`import { QuizFlowPage } from '@/components/editor/quiz/QuizFlowPage';
import { QUIZ_STYLE_21_STEPS_TEMPLATE } from '@/templates/quiz21StepsComplete';`}</pre>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">2. Uso Básico</h4>
              <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm">
                <pre>{`<QuizFlowPage
  mode="production"
  template={QUIZ_STYLE_21_STEPS_TEMPLATE}
  customConfig={{
    enableValidation: true,
    enableScoring: true,
    theme: { primaryColor: '#B89B7A' }
  }}
/>`}</pre>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">3. Configuração Avançada</h4>
              <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm">
                <pre>{`<QuizFlowPage
  mode="editor"
  template={customTemplate}
  onBlocksChange={handleBlocksChange}
  customConfig={{
    enableLivePreview: true,
    enableValidation: true,
    enableScoring: true,
    theme: {
      primaryColor: '#B89B7A',
      backgroundColor: '#FEFEFE',
      textColor: '#432818'
    }
  }}
/>`}</pre>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-green-50 rounded-lg">
                <h5 className="font-semibold text-green-800 mb-2">✅ Características Implementadas</h5>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Componentes duplicáveis</li>
                  <li>• Componentes reutilizáveis</li>
                  <li>• Componentes modulares</li>
                  <li>• Componentes independentes</li>
                </ul>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <h5 className="font-semibold text-blue-800 mb-2">🔄 Modos de Operação</h5>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Editor: Edição completa</li>
                  <li>• Preview: Visualização final</li>
                  <li>• Production: Experiência real</li>
                </ul>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <h5 className="font-semibold text-purple-800 mb-2">🎯 Experiência Idêntica</h5>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Validação consistente</li>
                  <li>• Cálculos uniformes</li>
                  <li>• Renderização igual</li>
                  <li>• Efeitos preservados</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ModularQuizDemo;