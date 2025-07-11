/**
 * Layout Principal do Editor
 * Interface unificada e organizada
 */

import React from 'react';
import Toolbar from './Toolbar';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import PropertyPanel from './PropertyPanel';

interface EditorLayoutProps {
  className?: string;
}

const EditorLayout: React.FC<EditorLayoutProps> = ({ className = '' }) => {
  return (
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
  );
};

export default EditorLayout;
