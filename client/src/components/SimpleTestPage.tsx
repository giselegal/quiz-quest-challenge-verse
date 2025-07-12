
import React from 'react';

const SimpleTestPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          🎉 As rotas estão funcionando!
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Se você está vendo esta página, significa que o sistema de roteamento está funcionando corretamente.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 bg-card rounded-lg border">
            <h2 className="text-xl font-semibold mb-2">Rotas Principais</h2>
            <ul className="space-y-2">
              <li><a href="/" className="text-primary hover:underline">/ - Página Inicial</a></li>
              <li><a href="/quiz" className="text-primary hover:underline">/quiz - Quiz</a></li>
              <li><a href="/resultado" className="text-primary hover:underline">/resultado - Resultado</a></li>
            </ul>
          </div>
          
          <div className="p-6 bg-card rounded-lg border">
            <h2 className="text-xl font-semibold mb-2">Rotas Admin</h2>
            <ul className="space-y-2">
              <li><a href="/admin" className="text-primary hover:underline">/admin - Dashboard</a></li>
              <li><a href="/admin/quiz" className="text-primary hover:underline">/admin/quiz - Quiz Management</a></li>
              <li><a href="/admin/analytics" className="text-primary hover:underline">/admin/analytics - Analytics</a></li>
            </ul>
          </div>
          
          <div className="p-6 bg-card rounded-lg border">
            <h2 className="text-xl font-semibold mb-2">Editor</h2>
            <ul className="space-y-2">
              <li><a href="/simple-editor" className="text-primary hover:underline">/simple-editor - Editor Visual</a></li>
            </ul>
          </div>
          
          <div className="p-6 bg-card rounded-lg border">
            <h2 className="text-xl font-semibold mb-2">Debug</h2>
            <ul className="space-y-2">
              <li><a href="/test-supabase" className="text-primary hover:underline">/test-supabase - Teste Supabase</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleTestPage;
