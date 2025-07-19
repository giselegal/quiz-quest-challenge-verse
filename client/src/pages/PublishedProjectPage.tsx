import React, { useState, useEffect } from 'react';
import { useRoute } from 'wouter';
import { EditorPreview } from '@/components/result-editor/EditorPreview';
import { Block } from '@/types/editor';
import { StyleResult } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { Home, ExternalLink } from 'lucide-react';

// Mock data for preview
const mockStyleResult: StyleResult = {
  style: 'natural',
  points: 85,
  percentage: 85,
  rank: 1,
  category: 'natural',
  score: 85,
  description: 'Você tem um estilo natural e descontraído',
  imageUrl: 'https://example.com/natural.jpg',
  guideImageUrl: 'https://example.com/natural-guide.jpg'
};

const PublishedProjectPage: React.FC = () => {
  const [match, params] = useRoute('/published/:id');
  const projectId = params?.id;
  
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projectData, setProjectData] = useState<any>(null);

  useEffect(() => {
    if (!projectId) {
      setError('ID do projeto não fornecido');
      setLoading(false);
      return;
    }

    try {
      // Buscar projeto publicado no localStorage
      const publishedProject = localStorage.getItem('editor-project-published');
      
      if (!publishedProject) {
        setError('Projeto não encontrado');
        setLoading(false);
        return;
      }

      const data = JSON.parse(publishedProject);
      
      // Verificar se o ID corresponde
      if (data.id !== projectId) {
        // Tentar buscar em projetos salvos
        const savedProjects = JSON.parse(localStorage.getItem('editor-saved-projects') || '[]');
        const foundProject = savedProjects.find((p: any) => p.id === projectId);
        
        if (!foundProject) {
          setError(`Projeto com ID "${projectId}" não encontrado`);
          setLoading(false);
          return;
        }
        
        setProjectData(foundProject);
        setBlocks(foundProject.blocks || []);
      } else {
        setProjectData(data);
        setBlocks(data.blocks || []);
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Erro ao carregar projeto:', err);
      setError('Erro ao carregar projeto publicado');
      setLoading(false);
    }
  }, [projectId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando projeto...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Projeto não encontrado</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={() => window.location.href = '/editor'} className="bg-blue-600 hover:bg-blue-700">
            <Home className="w-4 h-4 mr-2" />
            Voltar ao Editor
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Projeto Publicado</h1>
            <div className="flex items-center gap-4 mt-1">
              <span className="text-sm text-gray-500">ID: {projectId}</span>
              {projectData?.publishedAt && (
                <span className="text-sm text-gray-500">
                  Publicado em: {new Date(projectData.publishedAt).toLocaleString()}
                </span>
              )}
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                🌐 Online
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.href = '/editor'}
            >
              <Home className="w-4 h-4 mr-2" />
              Editor
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const url = window.location.href;
                navigator.clipboard.writeText(url);
                alert('URL copiada para a área de transferência!');
              }}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Compartilhar
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto py-8">
        <div className="bg-white rounded-lg shadow-sm min-h-screen">
          <EditorPreview 
            blocks={blocks}
            selectedBlockId={null}
            onSelectBlock={() => {}}
            isPreviewing={true}
            primaryStyle={mockStyleResult}
            onReorderBlocks={() => {}}
          />
        </div>
        
        {/* Rodapé com info do projeto */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            {blocks.length} componente{blocks.length !== 1 ? 's' : ''} • 
            Criado com Editor Quiz Quest
          </p>
          {projectData?.metadata?.creator && (
            <p className="mt-1">
              Por: {projectData.metadata.creator}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublishedProjectPage;
