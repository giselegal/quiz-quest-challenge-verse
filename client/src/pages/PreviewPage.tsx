import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  ExternalLink, 
  Smartphone, 
  Tablet, 
  Monitor,
  Eye
} from 'lucide-react';

interface PreviewData {
  funnel?: {
    name?: string;
    pages?: Array<{
      id: string;
      title: string;
      blocks: Array<{
        id: string;
        type: string;
        content: any;
        style?: any;
      }>;
    }>;
  };
  currentPage?: {
    title: string;
    blocks: Array<{
      id: string;
      type: string;
      content: any;
      style?: any;
    }>;
  };
  metadata?: {
    totalBlocks: number;
    totalPages: number;
    lastModified: string;
    funnelName: string;
  };
  isPreview?: boolean;
  previewId?: string;
}

type DeviceView = 'mobile' | 'tablet' | 'desktop';

const PreviewPage: React.FC = () => {
  const [location, navigate] = useLocation();
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [deviceView, setDeviceView] = useState<DeviceView>('desktop');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const previewId = urlParams.get('id');
    
    // Recuperar dados do preview
    const savedPreview = localStorage.getItem('quiz-preview-data');
    
    if (savedPreview) {
      try {
        const data = JSON.parse(savedPreview);
        if (data.isPreview && data.previewId === previewId) {
          setPreviewData(data);
        } else {
          console.warn('Preview ID não corresponde ou dados inválidos');
        }
      } catch (error) {
        console.error('Erro ao carregar preview:', error);
      }
    }
    
    setLoading(false);
  }, []);

  const getDeviceStyles = () => {
    switch (deviceView) {
      case 'mobile':
        return 'max-w-sm mx-auto';
      case 'tablet':
        return 'max-w-2xl mx-auto';
      case 'desktop':
        return 'max-w-4xl mx-auto';
      default:
        return 'max-w-4xl mx-auto';
    }
  };

  const renderBlock = (block: any) => {
    const { type, content, style } = block;

    // Renderização básica de diferentes tipos de blocos
    switch (type) {
      case 'quiz-question':
        return (
          <div key={block.id} className="bg-white p-6 rounded-lg border border-gray-200 mb-4" style={style}>
            <h3 className="text-lg font-semibold mb-4">{content.question}</h3>
            <div className={`grid gap-3 ${content.optionLayout === 'grid' ? 'grid-cols-2' : 'grid-cols-1'}`}>
              {content.options?.map((option: any, index: number) => (
                <div key={option.id || index} className="p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                  {option.imageUrl && (
                    <img src={option.imageUrl} alt={option.text} className="w-full h-20 object-cover rounded mb-2" />
                  )}
                  <span className="text-sm">{option.text}</span>
                </div>
              ))}
            </div>
            {content.progressPercent && (
              <div className="mt-4">
                <div className="bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${content.progressPercent}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{content.progressPercent}% completo</p>
              </div>
            )}
          </div>
        );

      case 'headline':
        return (
          <div key={block.id} className="text-center mb-6" style={style}>
            <h2 className="text-2xl font-bold mb-2">{content.title}</h2>
            {content.subtitle && (
              <p className="text-gray-600">{content.subtitle}</p>
            )}
          </div>
        );

      case 'text':
        return (
          <div key={block.id} className="mb-4" style={style}>
            <p className={`text-${content.alignment || 'left'}`}>{content.text}</p>
          </div>
        );

      case 'image':
        return (
          <div key={block.id} className="mb-4" style={style}>
            <img 
              src={content.imageUrl} 
              alt={content.imageAlt || 'Imagem'} 
              className={`rounded-md ${content.alignment === 'center' ? 'mx-auto' : ''}`}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        );

      case 'pricing':
        return (
          <div key={block.id} className="bg-green-50 p-6 rounded-lg text-center mb-4" style={style}>
            <h3 className="text-xl font-semibold mb-2">{content.title}</h3>
            <div className="mb-4">
              {content.regularPrice && (
                <span className="text-gray-500 line-through mr-2">{content.regularPrice}</span>
              )}
              <span className="text-2xl font-bold text-green-600">{content.price}</span>
            </div>
            <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
              {content.ctaText}
            </button>
          </div>
        );

      default:
        return (
          <div key={block.id} className="bg-gray-100 p-4 rounded-md mb-4" style={style}>
            <p className="text-sm text-gray-600">
              Bloco do tipo "{type}" - {JSON.stringify(content).substring(0, 100)}...
            </p>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Eye className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Carregando preview...</p>
        </div>
      </div>
    );
  }

  if (!previewData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Preview não encontrado</h1>
          <p className="text-gray-600 mb-6">Os dados do preview podem ter expirado ou não estão disponíveis.</p>
          <Button onClick={() => navigate('/editor')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Editor
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header do Preview */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/editor')}
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Voltar
            </Button>
            <div>
              <h1 className="font-semibold text-gray-900">
                Preview: {previewData.metadata?.funnelName || 'Quiz sem nome'}
              </h1>
              <p className="text-xs text-gray-500">
                {previewData.metadata?.totalBlocks || 0} componentes • {previewData.metadata?.totalPages || 0} páginas
              </p>
            </div>
          </div>

          {/* Seletor de dispositivo */}
          <div className="flex items-center gap-2">
            <Button
              variant={deviceView === 'mobile' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setDeviceView('mobile')}
            >
              <Smartphone className="w-4 h-4" />
            </Button>
            <Button
              variant={deviceView === 'tablet' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setDeviceView('tablet')}
            >
              <Tablet className="w-4 h-4" />
            </Button>
            <Button
              variant={deviceView === 'desktop' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setDeviceView('desktop')}
            >
              <Monitor className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Conteúdo do Preview */}
      <div className="p-6">
        <div className={getDeviceStyles()}>
          <div className="bg-white rounded-lg shadow-sm min-h-[600px] p-6">
            <div className="mb-4 text-center">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                <Eye className="w-3 h-3 mr-1" />
                Preview Mode
              </span>
            </div>

            {/* Renderizar blocos da página atual */}
            {previewData.currentPage?.blocks?.map(renderBlock)}

            {(!previewData.currentPage?.blocks || previewData.currentPage.blocks.length === 0) && (
              <div className="text-center py-12 text-gray-500">
                <p>Nenhum componente para exibir no preview.</p>
                <p className="text-sm">Adicione componentes no editor para vê-los aqui.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer com informações */}
      <div className="bg-gray-800 text-white py-3">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-xs">
            Preview gerado em {new Date().toLocaleString()} • 
            Dispositivo: {deviceView} • 
            {previewData.metadata?.totalBlocks || 0} componentes
          </p>
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
