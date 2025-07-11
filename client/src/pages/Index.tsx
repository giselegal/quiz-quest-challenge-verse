
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quiz Sell Genius</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Bem-vindo ao Quiz Sell Genius - Sua plataforma completa para criar quizzes interativos.
            </p>
            <div className="flex gap-4">
              <Button asChild>
                <a href="/quiz-descubra-seu-estilo">Começar Quiz</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/admin">Painel Admin</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
