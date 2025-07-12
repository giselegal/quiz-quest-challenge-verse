import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface StyleGuideViewerProps {
  styleData: {
    category: string;
    title: string;
    description: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor?: string;
    fontFamily?: string;
    fontSize?: string;
    sections: {
      id: string;
      title: string;
      content: string;
      imageUrl?: string;
    }[];
  };
  className?: string;
  compact?: boolean;
}

/**
 * StyleGuideViewer - Componente para visualização de guias de estilo
 * 
 * Exibe um guia visual de estilo personalizado baseado no resultado
 * do quiz, com amostras de cores, tipografia e seções informativas.
 */
export const StyleGuideViewer: React.FC<StyleGuideViewerProps> = ({
  styleData,
  className = '',
  compact = false
}) => {
  const {
    category,
    title,
    description,
    primaryColor,
    secondaryColor,
    accentColor = '#f59e0b',
    fontFamily = 'Inter, sans-serif',
    fontSize = '16px',
    sections = []
  } = styleData;
  
  // Obter a primeira seção como padrão
  const defaultTabId = sections[0]?.id || 'overview';

  return (
    <div 
      className={cn(
        "style-guide-viewer",
        className
      )}
      style={{ 
        fontFamily, 
        fontSize,
        '--primary-color': primaryColor,
        '--secondary-color': secondaryColor,
        '--accent-color': accentColor
      } as React.CSSProperties}
    >
      {/* Cabeçalho */}
      <div className="mb-6">
        <div className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-2" 
          style={{ backgroundColor: primaryColor + '20', color: primaryColor }}>
          {category}
        </div>
        
        <h2 className="text-2xl font-bold mb-2" style={{ color: primaryColor }}>
          {title}
        </h2>
        
        <p className="text-gray-700">
          {description}
        </p>
      </div>
      
      {/* Amostras de cor */}
      {!compact && (
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <h3 className="text-sm font-medium">Cores do seu estilo</h3>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="space-y-1">
                <div className="h-12 w-12 rounded-full border" style={{ backgroundColor: primaryColor }}></div>
                <p className="text-xs text-center">Principal</p>
              </div>
              
              <div className="space-y-1">
                <div className="h-12 w-12 rounded-full border" style={{ backgroundColor: secondaryColor }}></div>
                <p className="text-xs text-center">Secundária</p>
              </div>
              
              {accentColor && (
                <div className="space-y-1">
                  <div className="h-12 w-12 rounded-full border" style={{ backgroundColor: accentColor }}></div>
                  <p className="text-xs text-center">Destaque</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Seções em abas */}
      <Tabs defaultValue={defaultTabId} className="w-full">
        {!compact && sections.length > 1 && (
          <TabsList className="grid grid-cols-3 mb-4">
            {sections.map(section => (
              <TabsTrigger key={section.id} value={section.id}>
                {section.title}
              </TabsTrigger>
            ))}
          </TabsList>
        )}
        
        {sections.map(section => (
          <TabsContent key={section.id} value={section.id}>
            <Card>
              <CardContent className={cn(
                "p-6",
                compact ? "px-3 py-4" : ""
              )}>
                {!compact && (
                  <h3 className="text-lg font-semibold mb-4" style={{ color: primaryColor }}>
                    {section.title}
                  </h3>
                )}
                
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: section.content }} />
                  
                  {section.imageUrl && (
                    <div className={compact ? "hidden md:block" : ""}>
                      <img 
                        src={section.imageUrl} 
                        alt={section.title}
                        className="rounded-lg object-cover w-full h-auto"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
      
      <style jsx>{`
        .style-guide-viewer {
          --primary-color: ${primaryColor};
          --secondary-color: ${secondaryColor};
          --accent-color: ${accentColor};
        }
      `}</style>
    </div>
  );
};

export default StyleGuideViewer;
