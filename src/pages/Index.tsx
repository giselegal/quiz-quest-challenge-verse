import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Descubra Seu <span className="text-pink-600">Estilo Pessoal</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Um quiz personalizado para descobrir qual estilo combina mais com você. 
            Responda algumas perguntas simples e receba recomendações únicas.
          </p>
          <Link to="/quiz">
            <Button size="lg" className="text-lg px-8 py-4 bg-pink-600 hover:bg-pink-700">
              Começar Quiz
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <Card>
            <CardHeader>
              <CardTitle>Personalizado</CardTitle>
              <CardDescription>
                Quiz adaptado às suas preferências
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Perguntas cuidadosamente elaboradas para entender seu estilo único.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rápido</CardTitle>
              <CardDescription>
                Apenas alguns minutos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Um processo simples e direto que respeita seu tempo.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resultado Detalhado</CardTitle>
              <CardDescription>
                Análise completa do seu perfil
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Receba insights valiosos sobre seu estilo pessoal.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <Link to="/admin">
            <Button variant="outline">
              Área Administrativa
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;