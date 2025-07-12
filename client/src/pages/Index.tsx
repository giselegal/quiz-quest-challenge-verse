
import React from 'react';
import { Link } from 'react-router-dom';
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
                <Link to="/quiz-descubra-seu-estilo">Começar Quiz</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/admin">Painel Admin</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
