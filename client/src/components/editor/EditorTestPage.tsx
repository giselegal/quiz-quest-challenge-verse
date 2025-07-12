import React from 'react';
import ModernQuizEditor from '@/components/editor/ModernQuizEditor';
import { QuizFunnel } from '@/interfaces/quiz';

// Mock data para testar o editor
const mockFunnel: QuizFunnel = {
  id: 'test-funnel-1',
  name: 'Quiz de Estilo Pessoal',
  pages: [
    {
      id: 'intro',
      title: 'Bem-vindo',
      type: 'intro',
      progress: 0,
      showHeader: true,
      showProgress: true,
      components: [
        {
          id: 'title-1',
          type: 'title',
          data: {
            text: 'Descubra Seu Estilo Pessoal',
          },
          style: {
            color: '#432818',
            fontSize: '2rem',
            fontWeight: 'bold',
            textAlign: 'center',
          },
        },
        {
          id: 'subtitle-1',
          type: 'subtitle',
          data: {
            text: 'Em apenas 3 minutos, descubra qual é o seu estilo pessoal dominante',
          },
          style: {
            color: '#6b4f43',
            fontSize: '1.25rem',
            textAlign: 'center',
          },
        },
        {
          id: 'button-1',
          type: 'button',
          data: {
            text: 'Começar Quiz',
          },
          style: {
            backgroundColor: '#b89b7a',
            color: '#ffffff',
            textAlign: 'center',
          },
        },
      ],
    },
    {
      id: 'question-1',
      title: 'Pergunta 1',
      type: 'question',
      progress: 33,
      showHeader: true,
      showProgress: true,
      components: [
        {
          id: 'title-2',
          type: 'title',
          data: {
            text: 'Qual dessas opções mais combina com você?',
          },
          style: {
            color: '#432818',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
          },
        },
        {
          id: 'options-1',
          type: 'options',
          data: {
            options: [
              { id: '1', text: 'Gosto de looks clássicos e elegantes', value: 'classico' },
              { id: '2', text: 'Prefiro um estilo mais moderno e ousado', value: 'moderno' },
              { id: '3', text: 'Adoro um visual romântico e feminino', value: 'romantico' },
              { id: '4', text: 'Meu estilo é mais casual e confortável', value: 'casual' },
            ],
            multiSelect: false,
            hasImages: false,
            maxSelections: 1,
          },
          style: {
            textAlign: 'center',
          },
        },
      ],
    },
    {
      id: 'result',
      title: 'Resultado',
      type: 'result',
      progress: 100,
      showHeader: true,
      showProgress: false,
      components: [
        {
          id: 'title-3',
          type: 'title',
          data: {
            text: 'Seu Estilo Pessoal é:',
          },
          style: {
            color: '#432818',
            fontSize: '2rem',
            fontWeight: 'bold',
            textAlign: 'center',
          },
        },
        {
          id: 'title-4',
          type: 'title',
          data: {
            text: 'CLÁSSICO ELEGANTE',
          },
          style: {
            color: '#b89b7a',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
          },
        },
        {
          id: 'paragraph-1',
          type: 'text',
          data: {
            text: 'Você tem uma preferência por peças atemporais, cortes refinados e uma paleta de cores neutras. Seu guarda-roupa é sinônimo de sofisticação e elegância.',
          },
          style: {
            color: '#432818',
            fontSize: '1.125rem',
            textAlign: 'center',
          },
        },
      ],
    },
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const EditorTestPage: React.FC = () => {
  const handleSave = (funnel: QuizFunnel) => {
    console.log('Saving funnel:', funnel);
    alert('Funil salvo com sucesso!');
  };

  const handlePreview = (funnel: QuizFunnel) => {
    console.log('Previewing funnel:', funnel);
    window.open('/quiz-preview', '_blank');
  };

  const handleExit = () => {
    console.log('Exiting editor');
    alert('Saindo do editor...');
  };

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <ModernQuizEditor
        initialFunnel={mockFunnel}
        onSave={handleSave}
        onPreview={handlePreview}
        onExit={handleExit}
      />
    </div>
  );
};

export default EditorTestPage;
