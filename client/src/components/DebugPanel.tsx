
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QuizQuestion, UserResponse } from '@/types/quiz';

interface DebugPanelProps {
  questions: QuizQuestion[];
  responses: UserResponse[];
  currentQuestionIndex: number;
}

export const DebugPanel: React.FC<DebugPanelProps> = ({
  questions,
  responses,
  currentQuestionIndex
}) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Debug Panel</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-2">Current Question</h4>
          <Badge variant="outline">
            {currentQuestionIndex + 1} / {questions.length}
          </Badge>
          {questions[currentQuestionIndex] && (
            <p className="text-xs text-gray-600 mt-1">
              {questions[currentQuestionIndex].question || questions[currentQuestionIndex].text}
            </p>
          )}
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Responses</h4>
          <div className="space-y-1">
            {responses.map((response, index) => (
              <div key={index} className="text-xs">
                <Badge variant="secondary" className="mr-2">
                  Q{index + 1}
                </Badge>
                <span className="text-gray-600">
                  {response.selectedOptionIds?.length || 0} selected
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DebugPanel;
