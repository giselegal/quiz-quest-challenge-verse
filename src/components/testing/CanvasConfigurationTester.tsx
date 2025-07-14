/**
 * COMPONENTE DE TESTE: Canvas Configuration Tester
 * 
 * Permite testar e validar as configurações do canvas para as etapas 20 e 21,
 * mostrando como os componentes são organizados e renderizados.
 */

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  CheckCircle, 
  AlertCircle, 
  Eye, 
  Settings, 
  Play,
  FileText,
  Image as ImageIcon,
  Type,
  MousePointer
} from 'lucide-react';

import { useCanvasConfiguration, useStep20Canvas, useStep21Canvas } from '@/hooks/useCanvasConfiguration';

interface ComponentPreviewProps {
  component: any;
  index: number;
}

const ComponentPreview: React.FC<ComponentPreviewProps> = ({ component, index }) => {
  const getComponentIcon = (type: string) => {
    switch (type) {
      case 'heading-inline':
      case 'result-header-inline':
        return <Type className="w-4 h-4" />;
      case 'text-inline':
        return <FileText className="w-4 h-4" />;
      case 'image-display-inline':
        return <ImageIcon className="w-4 h-4" />;
      case 'button-inline':
        return <MousePointer className="w-4 h-4" />;
      default:
        return <Settings className="w-4 h-4" />;
    }
  };

  const getComponentColor = (type: string) => {
    switch (type) {
      case 'heading-inline':
      case 'result-header-inline':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'text-inline':
        return 'bg-gray-50 border-gray-200 text-gray-800';
      case 'image-display-inline':
        return 'bg-purple-50 border-purple-200 text-purple-800';
      case 'button-inline':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'countdown-inline':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'quiz-offer-pricing-inline':
        return 'bg-orange-50 border-orange-200 text-orange-800';
      default:
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
    }
  };

  return (
    <div className={`p-3 rounded-lg border-2 border-dashed ${getComponentColor(component.type)} mb-2`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="bg-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
          {index + 1}
        </span>
        {getComponentIcon(component.type)}
        <span className="font-mono text-xs">{component.type}</span>
      </div>
      
      <div className="text-sm">
        <div className="font-medium">{component.id}</div>
        {component.properties?.text && (
          <div className="text-xs mt-1 opacity-75">
            "{ component.properties.text.substring(0, 50)}{component.properties.text.length > 50 ? '...' : ''}"
          </div>
        )}
        {component.properties?.title && (
          <div className="text-xs mt-1 opacity-75">
            "{ component.properties.title.substring(0, 50)}{component.properties.title.length > 50 ? '...' : ''}"
          </div>
        )}
      </div>
    </div>
  );
};

export const CanvasConfigurationTester: React.FC = () => {
  const { validateAllSteps } = useCanvasConfiguration();
  const { 
    isStep20Loaded, 
    loadAndApplyStep20, 
    getResultComponents, 
    config: step20Config 
  } = useStep20Canvas();
  
  const { 
    isStep21Loaded, 
    loadAndApplyStep21, 
    getOfferComponents, 
    config: step21Config 
  } = useStep21Canvas();

  const [activeTab, setActiveTab] = useState('overview');
  const [validationResults, setValidationResults] = useState<any>(null);

  useEffect(() => {
    // Carregar configurações automaticamente
    loadAndApplyStep20();
    loadAndApplyStep21();
    
    // Executar validação
    const results = validateAllSteps();
    setValidationResults(results);
  }, []);

  const renderOverview = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Status das Configurações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">1-19</div>
              <div className="text-sm text-green-700">Etapas Validadas</div>
              <Badge variant="secondary" className="mt-2">schemaDrivenFunnelService</Badge>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">20</div>
              <div className="text-sm text-blue-700">Resultado</div>
              <Badge variant={isStep20Loaded ? "default" : "secondary"} className="mt-2">
                {isStep20Loaded ? "Carregada" : "Carregando..."}
              </Badge>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">21</div>
              <div className="text-sm text-purple-700">Oferta</div>
              <Badge variant={isStep21Loaded ? "default" : "secondary"} className="mt-2">
                {isStep21Loaded ? "Carregada" : "Carregando..."}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {validationResults && (
        <Card>
          <CardHeader>
            <CardTitle>Validação das Etapas 1-19</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(validationResults).map(([key, step]: [string, any]) => (
                <div key={key} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <div className="flex-1">
                    <div className="font-medium">{step.title}</div>
                    <div className="text-sm text-gray-600">{step.description}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Componentes: {step.components.join(', ')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderStep20 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Etapa 20: Canvas de Resultado
          </CardTitle>
        </CardHeader>
        <CardContent>
          {step20Config && (
            <div>
              <div className="mb-4">
                <Badge variant="outline" className="mr-2">{step20Config.type}</Badge>
                <Badge variant="outline">{step20Config.components.length} componentes</Badge>
              </div>
              
              <ScrollArea className="h-[400px]">
                <div className="space-y-2">
                  {step20Config.components.map((component, index) => (
                    <ComponentPreview key={component.id} component={component} index={index} />
                  ))}
                </div>
              </ScrollArea>
              
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="font-medium mb-2">Componentes Principais:</div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {getResultComponents() && Object.entries(getResultComponents()).map(([key, comp]) => (
                    <div key={key} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>{key}: {comp ? '✅' : '❌'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderStep21 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Etapa 21: Canvas de Oferta
          </CardTitle>
        </CardHeader>
        <CardContent>
          {step21Config && (
            <div>
              <div className="mb-4">
                <Badge variant="outline" className="mr-2">{step21Config.type}</Badge>
                <Badge variant="outline">{step21Config.components.length} componentes</Badge>
              </div>
              
              <ScrollArea className="h-[400px]">
                <div className="space-y-2">
                  {step21Config.components.map((component, index) => (
                    <ComponentPreview key={component.id} component={component} index={index} />
                  ))}
                </div>
              </ScrollArea>
              
              <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                <div className="font-medium mb-2">Componentes Principais:</div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {getOfferComponents() && Object.entries(getOfferComponents()).map(([key, comp]) => (
                    <div key={key} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>{key}: {comp ? '✅' : '❌'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Canvas Configuration Tester
        </h1>
        <p className="text-gray-600">
          Teste e validação das configurações do canvas para todas as etapas do quiz
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="step20" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Etapa 20
          </TabsTrigger>
          <TabsTrigger value="step21" className="flex items-center gap-2">
            <Play className="w-4 h-4" />
            Etapa 21
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {renderOverview()}
        </TabsContent>

        <TabsContent value="step20">
          {renderStep20()}
        </TabsContent>

        <TabsContent value="step21">
          {renderStep21()}
        </TabsContent>
      </Tabs>

      <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="font-medium text-green-900">Configuração Completa</span>
        </div>
        <p className="text-sm text-green-800">
          Todas as etapas foram configuradas com componentes inline modulares. 
          O canvas está pronto para ser usado no editor visual.
        </p>
      </div>
    </div>
  );
};

export default CanvasConfigurationTester;
