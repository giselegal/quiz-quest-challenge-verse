/**
 * Layout Principal do Editor
 * Interface unificada e organizada
 */

import React from 'react';
import { EditorProvider } from '../core/EditorContext';
import { Toolbar, Sidebar, Canvas, PropertyPanel } from './index';

interface EditorLayoutProps {
  className?: string;
}

const EditorLayout: React.FC<EditorLayoutProps> = ({ className = '' }) => {
  return (
    <EditorProvider>
      <div className={`editor-layout h-screen flex flex-col bg-gray-50 ${className}`}>
        {/* Toolbar Superior */}
        <Toolbar />
        
        {/* Área Principal */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar Esquerda */}
          <Sidebar />
          
          {/* Canvas Central */}
          <div className="flex-1 flex flex-col">
            <Canvas />
          </div>
          
          {/* Painel de Propriedades Direita */}
          <PropertyPanel />
        </div>
      </div>
    </EditorProvider>
  );
};

export default EditorLayout;
