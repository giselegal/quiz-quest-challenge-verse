import React, { useEffect } from 'react';
import { useLocation, useRoute } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import LiveQuizEditor from '@/components/live-editor/LiveQuizEditor';
import { useLiveEditor } from '@/hooks/useLiveEditor';

const LiveEditorPage: React.FC = () => {
  const [, setLocation] = useLocation();
  // Extract ID parameter from route - supports both /live-editor and /live-editor/:id
  const [matchWithId, paramsWithId] = useRoute('/live-editor/:id');
  const [matchWithoutId] = useRoute('/live-editor');
  
  // Get quizId if available
  const quizId = paramsWithId?.id;

  const { loadEditor, stages, addStage } = useLiveEditor();

  useEffect(() => {
    // Carregar editor salvo
    loadEditor();

    // Se não houver etapas, criar uma introdução padrão
    if (stages.length === 0) {
      addStage({
        id: 'intro-1',
        name: 'Introdução do Quiz',
        type: 'intro',
        order: 0,
        components: [],
        settings: {},
      });
    }
  }, []);

  return (
    <div className="h-screen flex flex-col">
      {/* Header com navegação */}
      <div style={{ borderColor: '#E5DDD5' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => setLocation('/admin')}
              className="text-[#432818] hover:text-[#B89B7A]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Admin
            </Button>

            <div className="h-6 w-px bg-gray-300" />

            <h1 className="text-xl font-bold text-[#432818]">
              Editor Visual ao Vivo
              {quizId && <span className="text-sm font-normal ml-2">- Quiz: {quizId}</span>}
            </h1>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1">
        <LiveQuizEditor quizId={quizId} />
      </div>
    </div>
  );
};

export default LiveEditorPage;
