import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const QuizPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Quiz de Estilo Pessoal</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-600">
              O quiz será implementado aqui em breve.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizPage;