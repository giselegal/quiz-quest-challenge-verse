
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ABTestsPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Testes A/B</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Testes em Andamento</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Configure e monitore seus testes A/B aqui.
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ABTestsPage;
