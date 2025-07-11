
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const QuizPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Quiz Page</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Quiz functionality coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizPage;
