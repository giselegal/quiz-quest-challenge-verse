import React from 'react';
import { InlineEditableText } from './InlineEditableText';
import { Play } from 'lucide-react';

interface VideoBlockProps {
  properties: {
    title?: string;
    videoUrl?: string;
    thumbnail?: string;
    autoplay?: boolean;
    controls?: boolean;
    width?: 'auto' | 'full';
    aspectRatio?: '16:9' | '4:3' | '1:1';
  };
  isSelected?: boolean;
  onClick?: () => void;
  onSaveInline?: (key: string) => (newValue: string) => void;
}

export const VideoBlock: React.FC<VideoBlockProps> = ({ 
  properties, 
  isSelected = false,
  onClick,
  onSaveInline
}) => {
  const { 
    title = '',
    videoUrl = '',
    thumbnail = '',
    autoplay = false,
    controls = true,
    width = 'full',
    aspectRatio = '16:9'
  } = properties;

  const aspectRatioClasses = {
    '16:9': 'aspect-video',
    '4:3': 'aspect-4/3',
    '1:1': 'aspect-square'
  };

  const widthClasses = {
    auto: 'max-w-2xl mx-auto',
    full: 'w-full'
  };

  // Função para converter URLs do YouTube em embed
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    
    // YouTube
    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}${autoplay ? '?autoplay=1' : ''}`;
    }
    
    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}${autoplay ? '?autoplay=1' : ''}`;
    }
    
    // URL direta
    return url;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <div 
      className={`
        p-4 rounded-lg cursor-pointer transition-all duration-200
        ${isSelected 
          ? 'border-2 border-blue-500 bg-blue-50' 
          : 'border-2 border-dashed border-[#B89B7A]/40 hover:bg-[#FAF9F7]'
        }
      `}
      onClick={onClick}
    >
      {/* Título opcional */}
      {(title || onSaveInline) && (
        <div className="mb-4">
          {onSaveInline ? (
            <InlineEditableText
              tag="h3"
              value={title}
              onSave={onSaveInline('title')}
              className="text-xl font-semibold text-[#432818] text-center"
              placeholder="Título do vídeo (opcional)"
            />
          ) : title ? (
            <h3 className="text-xl font-semibold text-[#432818] text-center">
              {title}
            </h3>
          ) : null}
        </div>
      )}

      {/* Vídeo ou placeholder */}
      <div className={`${widthClasses[width]}`}>
        <div className={`${aspectRatioClasses[aspectRatio]} bg-black rounded-lg overflow-hidden relative`}>
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={title || 'Vídeo'}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              {thumbnail ? (
                <div className="relative w-full h-full">
                  <img 
                    src={thumbnail}
                    alt="Thumbnail do vídeo"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black bg-opacity-50 rounded-full p-3">
                      <Play className="h-8 w-8 text-white fill-current" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <Play className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Nenhum vídeo definido</p>
                  <p className="text-xs">Configure a URL no painel de propriedades</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Nota sobre configuração */}
      {isSelected && !videoUrl && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs text-yellow-700">
            💡 Configure a URL do vídeo no painel de propriedades à direita
          </p>
        </div>
      )}
    </div>
  );
};
