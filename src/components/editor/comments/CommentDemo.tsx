import React from 'react';
import { CommentSystem } from '../comments/CommentSystem';
import { EditorProvider } from '../EditorProvider';

/**
 * CommentDemo - Demonstrates the comment system functionality
 * 
 * This demo shows that:
 * 1. Comments can be added without triggering editing functionality
 * 2. Comments are clearly separated from editor state
 * 3. Multiple comment instances can coexist independently
 */
export const CommentDemo: React.FC = () => {
  return (
    <EditorProvider>
      <div className="p-6 max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Sistema de Comentários - Demonstração
          </h1>
          <p className="text-gray-600">
            Demonstra que comentários NÃO disparam funcionalidade de edição
          </p>
        </div>

        {/* Block-level comment example */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Comentários por Bloco
          </h2>
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded p-4">
              <h3 className="font-medium text-blue-800 mb-2">Bloco: Título Principal</h3>
              <p className="text-blue-600 text-sm mb-3">
                Este é um bloco de título que pode receber comentários
              </p>
              <CommentSystem 
                blockId="title-block-1" 
                stepKey="step-1"
              />
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded p-4">
              <h3 className="font-medium text-green-800 mb-2">Bloco: Botão de Ação</h3>
              <p className="text-green-600 text-sm mb-3">
                Este é um bloco de botão que pode receber comentários independentes
              </p>
              <CommentSystem 
                blockId="button-block-1" 
                stepKey="step-1"
              />
            </div>
          </div>
        </div>

        {/* Step-level comment example */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Comentários por Etapa
          </h2>
          <div className="bg-purple-50 border border-purple-200 rounded p-4">
            <h3 className="font-medium text-purple-800 mb-2">Etapa 1: Introdução</h3>
            <p className="text-purple-600 text-sm mb-3">
              Comentários gerais sobre toda a etapa
            </p>
            <CommentSystem 
              stepKey="step-1"
            />
          </div>
        </div>

        {/* Key principles */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            ✅ Princípios Importantes
          </h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Comentários são apenas anotações - não modificam o editor
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Cada instância de comentário é independente
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Adicionar/remover comentários não dispara ações do editor
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Sistema é isolado do estado principal do editor
            </li>
          </ul>
        </div>

        {/* Console log instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-800 mb-2">🔍 Para Desenvolvedores</h3>
          <p className="text-blue-700 text-sm">
            Abra o console do navegador (F12) e adicione/remova comentários. 
            Você verá logs confirmando que nenhuma ação do editor foi disparada.
          </p>
        </div>
      </div>
    </EditorProvider>
  );
};

export default CommentDemo;