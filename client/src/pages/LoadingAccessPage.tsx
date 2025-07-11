
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const LoadingAccessPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
            <h2 className="text-xl font-semibold">Carregando...</h2>
            <p className="text-gray-600">
              Preparando sua experiência personalizada.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadingAccessPage;
