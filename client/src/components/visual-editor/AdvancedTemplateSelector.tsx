
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  category: 'intro' | 'question' | 'result' | 'offer';
  components: any[];
}

const ADVANCED_TEMPLATES: Template[] = [
  {
    id: 'modern-intro',
    name: 'Introdução Moderna',
    description: 'Layout moderno com vídeo de fundo e CTA destacado',
    preview: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/template-preview-1.webp',
    category: 'intro',
    components: [
      { type: 'video-background', data: { src: '', overlay: true } },
      { type: 'heading', data: { text: 'Descubra Seu Estilo Único' } },
      { type: 'benefits-grid', data: { benefits: [] } },
      { type: 'start-button', data: { text: 'Começar Quiz Agora' } }
    ]
  },
  {
    id: 'interactive-question',
    name: 'Pergunta Interativa',
    description: 'Pergunta com animações e feedback visual',
    preview: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/template-preview-2.webp',
    category: 'question',
    components: [
      { type: 'progress-animated', data: { value: 40 } },
      { type: 'question-animated', data: { text: '' } },
      { type: 'options-grid', data: { layout: 'masonry' } }
    ]
  }
];

interface AdvancedTemplateSelectorProps {
  onSelectTemplate: (template: Template) => void;
  currentPageType: string;
}

const AdvancedTemplateSelector: React.FC<AdvancedTemplateSelectorProps> = ({
  onSelectTemplate,
  currentPageType
}) => {
  const filteredTemplates = ADVANCED_TEMPLATES.filter(
    template => template.category === currentPageType
  );

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Templates Avançados</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTemplates.map(template => (
          <Card key={template.id} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">{template.name}</CardTitle>
                <Badge variant="secondary">{template.category}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-100 rounded-md mb-3 flex items-center justify-center">
                <span className="text-xs text-gray-500">Preview</span>
              </div>
              <p className="text-xs text-gray-600 mb-3">{template.description}</p>
              <Button 
                size="sm" 
                className="w-full"
                onClick={() => onSelectTemplate(template)}
              >
                Aplicar Template
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdvancedTemplateSelector;
