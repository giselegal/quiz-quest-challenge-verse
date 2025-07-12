import React from 'react';
import { cn } from '@/lib/utils';
import { FunnelStepProps } from '@/types/funnel';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Download } from 'lucide-react';

/**
 * ResultGuideStep - Etapa 19: Guia baseado no resultado
 * 
 * Este componente exibe um guia detalhado baseado no resultado,
 * com abas para diferentes categorias de informação e opção de download.
 */
export const ResultGuideStep: React.FC<FunnelStepProps> = ({
  id,
  className = '',
  isEditable = false,
  onNext,
  onPrevious,
  data = {},
  onEdit
}) => {
  const {
    title = 'Seu Guia Personalizado',
    subtitle = 'Use este guia completo para aproveitar ao máximo suas características',
    result = {
      category: 'Estilo Moderno',
      guideImageUrl: '/placeholder-guide.jpg',
      guideSections: [
        {
          id: 'essentials',
          title: 'Essenciais',
          content: 'Este é o conteúdo da seção essenciais do seu guia personalizado, com recomendações específicas para o seu estilo.',
          items: [
            'Item essencial 1 com descrição detalhada',
            'Item essencial 2 com descrição detalhada',
            'Item essencial 3 com descrição detalhada'
          ]
        },
        {
          id: 'advanced',
          title: 'Avançado',
          content: 'Este é o conteúdo da seção avançada do seu guia personalizado, com técnicas mais sofisticadas.',
          items: [
            'Item avançado 1 com descrição detalhada',
            'Item avançado 2 com descrição detalhada',
            'Item avançado 3 com descrição detalhada'
          ]
        },
        {
          id: 'resources',
          title: 'Recursos',
          content: 'Este é o conteúdo da seção de recursos do seu guia personalizado, com links e materiais úteis.',
          items: [
            'Recurso 1 com link e descrição',
            'Recurso 2 com link e descrição',
            'Recurso 3 com link e descrição'
          ]
        }
      ]
    },
    showDownloadOption = true,
    nextButtonText = 'Próximo passo',
    prevButtonText = 'Voltar',
    downloadButtonText = 'Baixar guia completo',
    backgroundColor = 'bg-white'
  } = data;
  
  // Obter a primeira aba como padrão
  const defaultTabId = result.guideSections?.[0]?.id || 'essentials';

  return (
    <div 
      className={cn(
        "relative rounded-xl shadow-md p-6",
        backgroundColor,
        className
      )}
      onClick={isEditable ? onEdit : undefined}
      data-funnel-step-id={id}
    >
      <div className="max-w-4xl mx-auto">
        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <div className="inline-block bg-indigo-100 text-indigo-800 px-4 py-1 rounded-full text-sm font-medium mb-4">
            {result.category}
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          
          <p className="text-gray-600">
            {subtitle}
          </p>
        </div>
        
        {/* Imagem do guia */}
        {result.guideImageUrl && (
          <div className="mb-8">
            <img 
              src={result.guideImageUrl} 
              alt="Guia personalizado"
              className="w-full max-h-80 object-cover rounded-lg"
            />
          </div>
        )}
        
        {/* Tabs de conteúdo */}
        <Tabs defaultValue={defaultTabId} className="mb-8">
          <TabsList className="grid grid-cols-3 mb-6">
            {result.guideSections?.map((section) => (
              <TabsTrigger key={section.id} value={section.id}>
                {section.title}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {result.guideSections?.map((section) => (
            <TabsContent key={section.id} value={section.id}>
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
                <p className="text-gray-700 mb-6">{section.content}</p>
                
                {section.items?.length > 0 && (
                  <div className="space-y-4">
                    {section.items.map((item, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </TabsContent>
          ))}
        </Tabs>
        
        {/* Download do guia */}
        {showDownloadOption && (
          <div className="flex justify-center mb-8">
            <Button variant="outline" className="gap-2">
              <Download size={18} />
              {downloadButtonText}
            </Button>
          </div>
        )}
        
        {/* Navegação */}
        <div className="flex justify-between mt-8">
          {onPrevious && (
            <Button 
              variant="outline"
              onClick={isEditable ? undefined : onPrevious}
            >
              {prevButtonText}
            </Button>
          )}
          
          <div className="flex-1 flex justify-end">
            <Button
              onClick={isEditable ? undefined : onNext}
              size="lg"
              className={onPrevious ? "ml-4" : ""}
            >
              {nextButtonText}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Indicador de edição */}
      {isEditable && (
        <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
          Editar
        </div>
      )}
    </div>
  );
};

export default ResultGuideStep;
