
import React from 'react';
import CanvasEditor from '@/components/editor/CanvasEditor';

const SimpleCanvasEditorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Editor Visual Simples</h1>
          <p className="text-muted-foreground mt-2">
            Arraste componentes da sidebar e monte sua página
          </p>
        </div>
        <CanvasEditor />
      </div>
    </div>
  );
};

export default SimpleCanvasEditorPage;
