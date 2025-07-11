import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ResultPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Seu Resultado</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-600">
              Os resultados serão exibidos aqui.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResultPage;