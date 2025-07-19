import React, { useState } from 'react';
import QuizValidationPanel from '@/components/quiz/QuizValidationPanel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Play, 
  CheckCircle, 
  AlertTriangle,
  Target,
  Award,
  ShoppingCart,
  Users
} from 'lucide-react';

const QuizSystemDemoPage: React.FC = () => {
  const [selectedDemo, setSelectedDemo] = useState<string>('points');

  const demoSections = [
    {
      id: 'points',
      title: 'Sistema de Pontuação',
      icon: <Target className="w-5 h-5" />,
      status: 'fixed',
      description: 'Configuração de pontos por categoria de estilo'
    },
    {
      id: 'buttons',
      title: 'Ativação de Botões',
      icon: <Play className="w-5 h-5" />,
      status: 'fixed',
      description: 'Lógica de ativação baseada em seleções mínimas'
    },
    {
      id: 'result',
      title: 'Etapa 20 - Resultado',
      icon: <Award className="w-5 h-5" />,
      status: 'enhanced',
      description: 'Componentes de resultado e exibição'
    },
    {
      id: 'offers',
      title: 'Etapa 21 - Ofertas',
      icon: <ShoppingCart className="w-5 h-5" />,
      status: 'enhanced',
      description: 'Páginas de ofertas de vendas'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'fixed':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">✅ Corrigido</Badge>;
      case 'enhanced':
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">🚀 Melhorado</Badge>;
      default:
        return <Badge variant="secondary">Status</Badge>;
    }
  };

  const renderDemoContent = () => {
    switch (selectedDemo) {
      case 'points':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-[#B89B7A]" />
                Sistema de Pontuação - Corrigido
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-medium text-green-800 mb-2">✅ Problema Resolvido</h3>
                <p className="text-sm text-green-700">
                  O sistema agora define corretamente tanto a <code>styleCategory</code> quanto os <code>points</code> para cada opção.
                </p>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Como funciona agora:</h4>
                <ul className="text-sm space-y-2 text-[#8F7A6A]">
                  <li>• <strong>Categoria de Estilo:</strong> Natural, Clássico, Contemporâneo, etc.</li>
                  <li>• <strong>Pontos por Opção:</strong> 0-5 pontos configuráveis</li>
                  <li>• <strong>Cálculo Automático:</strong> Sistema soma pontos por categoria</li>
                  <li>• <strong>Resultado Final:</strong> Categoria com maior pontuação vence</li>
                </ul>
              </div>
              
              <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                <p className="text-sm text-blue-700">
                  <strong>Implementado:</strong> QuestionOptionEditor agora permite configurar ambos os campos
                </p>
              </div>
            </CardContent>
          </Card>
        );

      case 'buttons':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="w-5 h-5 text-[#B89B7A]" />
                Ativação de Botões - Corrigido
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-medium text-green-800 mb-2">✅ Problema Resolvido</h3>
                <p className="text-sm text-green-700">
                  Botões agora ativam corretamente baseado no número de seleções obrigatórias.
                </p>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Lógica de Ativação:</h4>
                <ul className="text-sm space-y-2 text-[#8F7A6A]">
                  <li>• <strong>Questões Normais:</strong> Requer 3 seleções</li>
                  <li>• <strong>Questões Estratégicas:</strong> Requer 1 seleção</li>
                  <li>• <strong>Auto-avanço:</strong> Para questões normais (opcional)</li>
                  <li>• <strong>Feedback Visual:</strong> Botão muda cor quando ativo</li>
                </ul>
              </div>
              
              <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                <p className="text-sm text-blue-700">
                  <strong>Implementado:</strong> QuizNavigation com lógica aprimorada de ativação
                </p>
              </div>
            </CardContent>
          </Card>
        );

      case 'result':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#B89B7A]" />
                Etapa 20 - Componentes de Resultado
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-800 mb-2">🚀 Componentes Implementados</h3>
                <p className="text-sm text-blue-700">
                  Sistema completo de exibição de resultados com múltiplos layouts.
                </p>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Componentes Disponíveis:</h4>
                <ul className="text-sm space-y-2 text-[#8F7A6A]">
                  <li>• <strong>quiz-result-display:</strong> Componente principal de resultado</li>
                  <li>• <strong>result-header-inline:</strong> Cabeçalho modular</li>
                  <li>• <strong>QuizResultDisplayBlock:</strong> Layout Card, Hero, Minimal</li>
                </ul>
              </div>

              <div className="p-3 bg-green-50 border border-green-200 rounded">
                <p className="text-sm text-green-700">
                  <strong>Funcional:</strong> Todos os componentes registrados em blockDefinitions.ts
                </p>
              </div>
            </CardContent>
          </Card>
        );

      case 'offers':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-[#B89B7A]" />
                Etapa 21 - Componentes de Vendas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-800 mb-2">🚀 Componentes de Vendas</h3>
                <p className="text-sm text-blue-700">
                  Página completa de ofertas com elementos de conversão.
                </p>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Elementos de Conversão:</h4>
                <ul className="text-sm space-y-2 text-[#8F7A6A]">
                  <li>• <strong>sales-offer:</strong> Apresentação da oferta principal</li>
                  <li>• <strong>urgency-timer:</strong> Timer de urgência</li>
                  <li>• <strong>testimonials-grid:</strong> Depoimentos de clientes</li>
                  <li>• <strong>guarantee-section:</strong> Selo de garantia</li>
                </ul>
              </div>

              <div className="p-3 bg-green-50 border border-green-200 rounded">
                <p className="text-sm text-green-700">
                  <strong>Disponível:</strong> Todos os componentes na categoria "Vendas" e "Credibilidade"
                </p>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#432818] mb-2">
            Quiz System - Problemas Corrigidos ✅
          </h1>
          <p className="text-[#8F7A6A] max-w-2xl mx-auto">
            Demonstração das correções implementadas para os problemas mencionados: 
            pontuação de opções, ativação de botões e componentes das etapas 20 e 21.
          </p>
        </div>

        {/* Navigation */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-3">
              {demoSections.map((section) => (
                <Button
                  key={section.id}
                  variant={selectedDemo === section.id ? "default" : "outline"}
                  className={`flex items-center gap-2 ${
                    selectedDemo === section.id 
                      ? "bg-[#B89B7A] hover:bg-[#A38A69]" 
                      : "border-[#B89B7A] text-[#B89B7A] hover:bg-[#FAF9F7]"
                  }`}
                  onClick={() => setSelectedDemo(section.id)}
                >
                  {section.icon}
                  {section.title}
                  {getStatusBadge(section.status)}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Demo Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {renderDemoContent()}
          </div>
          
          <div>
            <QuizValidationPanel />
          </div>
        </div>

        {/* Footer */}
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <h3 className="text-lg font-medium text-[#432818]">
                Todos os Problemas Corrigidos
              </h3>
            </div>
            
            <p className="text-[#8F7A6A] mb-4">
              O sistema de quiz está agora totalmente funcional com pontuação adequada, 
              botões responsivos e componentes completos para resultados e ofertas.
            </p>
            
            <div className="flex justify-center gap-3">
              <Button className="bg-[#B89B7A] hover:bg-[#A38A69]">
                <Settings className="w-4 h-4 mr-2" />
                Ir para Editor
              </Button>
              
              <Button variant="outline" className="border-[#B89B7A] text-[#B89B7A]">
                <Users className="w-4 h-4 mr-2" />
                Testar Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizSystemDemoPage;
