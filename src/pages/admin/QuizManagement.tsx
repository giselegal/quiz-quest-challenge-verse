import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AdminLayout } from '@/components/admin/AdminLayout';

const QuizManagement: React.FC = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Gerenciamento do Quiz</h1>
          <p className="text-gray-600">Configure perguntas, respostas e lógica do quiz</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Perguntas do Quiz</CardTitle>
            <CardDescription>
              Gerencie as perguntas e opções de resposta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-600">
                O gerenciamento de perguntas será implementado aqui.
              </p>
              <Button>Adicionar Nova Pergunta</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default QuizManagement;