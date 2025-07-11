import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AdminLayout } from '@/components/admin/AdminLayout';

const AdminDashboard: React.FC = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Administrativo</h1>
          <p className="text-gray-600">Gerencie seu quiz e visualize métricas</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciar Quiz</CardTitle>
              <CardDescription>
                Configure perguntas e opções do quiz
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/admin/quiz">
                <Button className="w-full">Acessar</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configurações</CardTitle>
              <CardDescription>
                Ajuste configurações gerais do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/admin/settings">
                <Button className="w-full" variant="outline">Acessar</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sincronização</CardTitle>
              <CardDescription>
                Gerencie sincronização de dados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/admin/sync">
                <Button className="w-full" variant="outline">Acessar</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Testes A/B</CardTitle>
              <CardDescription>
                Configure e monitore testes A/B
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/admin/ab-tests">
                <Button className="w-full" variant="outline">Acessar</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;