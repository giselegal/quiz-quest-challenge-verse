import React from 'react';
import { Button } from '@/components/ui/button';

interface SchemaDrivenComponentsSidebarProps {
  onComponentSelect: (type: string) => void;
}

export const SchemaDrivenComponentsSidebar: React.FC<SchemaDrivenComponentsSidebarProps> = ({
  onComponentSelect
}) => {
  const componentCategories = [
    {
      name: 'Básicos',
      components: [
        { type: 'heading', name: 'Título', icon: '📝' },
        { type: 'text', name: 'Texto', icon: '📄' },
        { type: 'image', name: 'Imagem', icon: '🖼️' },
        { type: 'button', name: 'Botão', icon: '🔘' },
        { type: 'spacer', name: 'Espaço', icon: '📏' }
      ]
    },
    {
      name: 'Quiz',
      components: [
        { type: 'quiz-question', name: 'Pergunta', icon: '❓' },
        { type: 'quiz-options', name: 'Opções', icon: '☑️' },
        { type: 'quiz-progress', name: 'Progresso', icon: '📊' },
        { type: 'quiz-input', name: 'Campo Nome', icon: '✏️' }
      ]
    },
    {
      name: 'Resultado',
      components: [
        { type: 'result-header', name: 'Cabeçalho', icon: '🏆' },
        { type: 'style-card', name: 'Card Estilo', icon: '🎨' },
        { type: 'testimonial', name: 'Depoimento', icon: '💬' }
      ]
    }
  ];

  return (
    <div className="p-4">
      {componentCategories.map((category) => (
        <div key={category.name} className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            {category.name}
          </h4>
          <div className="space-y-2">
            {category.components.map((component) => (
              <Button
                key={component.type}
                variant="ghost"
                className="w-full justify-start text-left h-auto p-3"
                onClick={() => onComponentSelect(component.type)}
              >
                <span className="mr-3 text-lg">{component.icon}</span>
                <span className="text-sm">{component.name}</span>
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SchemaDrivenComponentsSidebar;
