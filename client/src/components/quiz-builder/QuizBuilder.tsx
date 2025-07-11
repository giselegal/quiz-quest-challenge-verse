
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QuizQuestion } from '@/types/quiz';

export const QuizBuilder: React.FC = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<string>('');

  const addQuestion = () => {
    if (currentQuestion.trim()) {
      const newQuestion: QuizQuestion = {
        id: `q-${Date.now()}`,
        title: currentQuestion,
        text: currentQuestion,
        type: 'multiple',
        options: []
      };
      setQuestions([...questions, newQuestion]);
      setCurrentQuestion('');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Quiz Builder</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={currentQuestion}
              onChange={(e) => setCurrentQuestion(e.target.value)}
              placeholder="Enter question text..."
            />
            <Button onClick={addQuestion}>Add Question</Button>
          </div>
          
          <div className="space-y-2">
            {questions.map((question) => (
              <div key={question.id} className="p-3 border rounded">
                <p>{question.text}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizBuilder;
