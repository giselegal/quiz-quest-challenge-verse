
import React from 'react';
import { useParams } from 'react-router-dom';

export const EditorPage = () => {
  const { style } = useParams<{ style?: string }>();
  
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-6">
          Editor de Páginas
        </h1>
        <div className="bg-card p-6 rounded-lg border">
          <p className="text-muted-foreground mb-4">
            Rota carregada com sucesso! 
            {style && ` Estilo selecionado: ${style}`}
          </p>
          <p className="text-sm text-muted-foreground">
            Esta é uma versão simplificada do editor para testar se a rota está funcionando.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
