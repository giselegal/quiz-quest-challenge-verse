
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const QuizManagement: React.FC = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Gerenciar Quizzes</h1>
          <Button>Novo Quiz</Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Quizzes Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Aqui você pode gerenciar todos os seus quizzes ativos.
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default QuizManagement;
