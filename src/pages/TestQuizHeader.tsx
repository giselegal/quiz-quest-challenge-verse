import React from 'react';
import QuizQuestionBlock from '@/components/blocks/quiz/QuizQuestionBlock';

const TestQuizHeader = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-center">Teste do Cabeçalho do Quiz</h1>
        
        <QuizQuestionBlock
          blockId="test-header"
          question="Teste do Cabeçalho Atualizado"
          options={[
            { id: '1', text: 'Opção 1', value: 'opcao1' },
            { id: '2', text: 'Opção 2', value: 'opcao2' },
            { id: '3', text: 'Opção 3', value: 'opcao3' },
            { id: '4', text: 'Opção 4', value: 'opcao4' }
          ]}
          logoUrl="/api/placeholder/96/96"
          showBackButton={true}
          progressPercent={75}
          onBack={() => console.log('Voltar clicado')}
          multipleSelection={false}
          maxSelections={1}
          minSelections={1}
          required={false}
          alignment="center"
          optionLayout="grid"
          showImages={false}
          onAnswer={(answers) => console.log('Respostas:', answers)}
        />
      </div>
    </div>
  );
};

export default TestQuizHeader;
