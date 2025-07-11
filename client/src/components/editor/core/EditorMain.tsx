/**
 * Editor Principal - Componente unificado
 * Substitui todos os editores confusos existentes
 */

import React, { useEffect } from 'react';
import Layout from '../ui/Layout';
import { useEditor } from './EditorContext';
import { EditorProject } from './EditorTypes';

interface EditorMainProps {
  projectId?: string;
  initialProject?: EditorProject;
  className?: string;
}

const EditorMain: React.FC<EditorMainProps> = ({
  projectId,
  initialProject,
  className = ''
}) => {
  const { state, dispatch } = useEditor();

  useEffect(() => {
    // Inicializar projeto
    if (initialProject) {
      dispatch({ type: 'SET_PROJECT', payload: initialProject });
      if (initialProject.pages.length > 0) {
        dispatch({ type: 'SET_CURRENT_PAGE', payload: initialProject.pages[0].id });
      }
    } else if (projectId) {
      // Carregar projeto por ID (implementar depois)
      console.log('Carregando projeto:', projectId);
    } else {
      // Criar projeto padrão
      const defaultProject: EditorProject = {
        id: `project-${Date.now()}`,
        name: 'Novo Projeto',
        pages: [
          {
            id: `page-${Date.now()}`,
            title: 'Página Inicial',
            blocks: []
          }
        ],
        settings: {
          theme: 'default',
          responsive: true
        }
      };
      
      dispatch({ type: 'SET_PROJECT', payload: defaultProject });
      dispatch({ type: 'SET_CURRENT_PAGE', payload: defaultProject.pages[0].id });
    }
  }, [projectId, initialProject, dispatch]);

  return (
    <div className={`editor-main ${className}`}>
      <Layout />
    </div>
  );
};

export default EditorMain;
