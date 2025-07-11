
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const QuizManagement: React.FC = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Quiz Management</h1>
          <Button>Create New Quiz</Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Existing Quizzes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No quizzes created yet.</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default QuizManagement;
