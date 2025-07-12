
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const EditorPage = () => {
  const { style } = useParams<{ style?: string }>();
  const [showFullEditor, setShowFullEditor] = useState(false);
  
  const styleCategory = (style as "Natural" | "Clássico" | "Contemporâneo" | "Elegante" | "Romântico" | "Sexy" | "Dramático" | "Criativo") || 'Natural';

  if (showFullEditor) {
    // Lazy load the full editor only when requested
    const { ResultPageVisualEditor } = require('@/components/result-editor/ResultPageVisualEditor');
    const { defaultResultTemplate } = require('@/config/resultPageTemplates');
    const { createOfferSectionConfig } = require('@/utils/config/offerDefaults');
    
    const selectedStyle = {
      category: styleCategory,
      score: 100,
      percentage: 100
    };
    
    const initialConfig = {
      styleType: styleCategory,
      header: {
        ...defaultResultTemplate.header,
        visible: true,
        style: {
          ...defaultResultTemplate.header.style,
          borderRadius: '0'
        }
      },
      mainContent: {
        ...defaultResultTemplate.mainContent,
        visible: true
      },
      offer: createOfferSectionConfig(),
      secondaryStyles: {
        visible: true,
        content: {},
        style: {
          padding: '20px'
        }
      },
      globalStyles: {
        primaryColor: '#B89B7A',
        secondaryColor: '#432818',
        textColor: '#432818',
        backgroundColor: '#FAF9F7',
        fontFamily: 'Playfair Display, serif'
      },
      blocks: []
    };
    
    return (
      <div className="h-screen">
        <ResultPageVisualEditor 
          selectedStyle={selectedStyle} 
          onShowTemplates={() => {}}
          initialConfig={initialConfig}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Editor de Páginas - {styleCategory}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Bem-vindo ao editor visual de páginas de resultado! 
              {style && ` Estilo selecionado: ${styleCategory}`}
            </p>
            <div className="flex gap-4">
              <Button 
                onClick={() => setShowFullEditor(true)}
                className="w-full"
              >
                Abrir Editor Visual Completo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditorPage;
