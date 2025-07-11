
import React, { useState } from 'react';
import { QuizQuestion } from '@/types/quiz';
import { Button } from '@/components/ui/button';

interface QuizBuilderProps {
  onSave?: (questions: QuizQuestion[]) => void;
}

const QuizBuilder: React.FC<QuizBuilderProps> = ({ onSave }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  const addQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: `question-${Date.now()}`,
      title: 'Nova Pergunta',
      text: 'Digite sua pergunta aqui',
      type: 'multiple',
      options: []
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleSave = () => {
    if (onSave) {
      onSave(questions);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quiz Builder</h1>
        <div className="space-x-2">
          <Button onClick={addQuestion}>Adicionar Pergunta</Button>
          <Button onClick={handleSave} variant="default">Salvar</Button>
        </div>
      </div>
      
      <div className="space-y-4">
        {questions.map((question, index) => (
          <div key={question.id} className="border p-4 rounded-lg">
            <h3 className="font-medium">Pergunta {index + 1}</h3>
            <p className="text-gray-600">{question.text}</p>
          </div>
        ))}
        
        {questions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Nenhuma pergunta adicionada. Clique em "Adicionar Pergunta" para começar.
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizBuilder;
