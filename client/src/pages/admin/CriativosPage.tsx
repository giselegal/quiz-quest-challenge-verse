
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CriativosPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Criativos</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Creative Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Creative management tools coming soon.</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default CriativosPage;
