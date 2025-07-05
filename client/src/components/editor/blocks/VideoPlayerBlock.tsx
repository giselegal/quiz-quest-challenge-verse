import React from 'react';
import { InlineEditableText } from './InlineEditableText';
import { Play } from 'lucide-react';

interface VideoPlayerBlockProps {
  properties: {
    title?: string;
    videoUrl?: string;
    thumbnailUrl?: string;
    description?: string;
    autoplay?: boolean;
    controls?: boolean;
  };
  isSelected?: boolean;
  onClick?: () => void;
  onSaveInline?: (key: string) => (newValue: string) => void;
}

export const VideoPlayerBlock: React.FC<VideoPlayerBlockProps> = ({ 
  properties, 
  isSelected = false,
  onClick,
  onSaveInline
}) => {
  const { 
    title = 'Vídeo Explicativo',
    videoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl,
    description = 'Assista ao vídeo para entender melhor nosso processo.',
    autoplay = false,
    controls = true
  } = properties;

  const isYouTube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');
  const embedUrl = isYouTube 
    ? videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')
    : videoUrl;

  return (
    <div 
      className={`
        p-6 rounded-lg cursor-pointer transition-all duration-200
        ${isSelected 
          ? 'border-2 border-blue-500 bg-blue-50' 
          : 'border-2 border-dashed border-[#B89B7A]/40 hover:bg-[#FAF9F7]'
        }
      `}
      onClick={onClick}
    >
      <div className="max-w-4xl mx-auto">
        {onSaveInline ? (
          <InlineEditableText
            tag="h3"
            value={title}
            onSave={onSaveInline('title')}
            className="text-2xl font-bold text-[#432818] text-center mb-6"
            placeholder="Título do vídeo"
          />
        ) : (
          <h3 className="text-2xl font-bold text-[#432818] text-center mb-6">
            {title}
          </h3>
        )}
        
        <div className="relative bg-black rounded-lg overflow-hidden shadow-lg mb-4" style={{ aspectRatio: '16/9' }}>
          {videoUrl ? (
            <iframe
              src={`${embedUrl}${autoplay ? '?autoplay=1' : ''}${controls ? '&controls=1' : '&controls=0'}`}
              title={title}
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
              <div className="text-center text-white">
                <Play className="w-16 h-16 mx-auto mb-4 opacity-60" />
                <p className="text-lg opacity-80">Configure a URL do vídeo</p>
              </div>
            </div>
          )}
        </div>
        
        {description && (
          onSaveInline ? (
            <InlineEditableText
              tag="p"
              isTextArea
              value={description}
              onSave={onSaveInline('description')}
              className="text-gray-600 text-center leading-relaxed"
              placeholder="Descrição do vídeo"
            />
          ) : (
            <p className="text-gray-600 text-center leading-relaxed">
              {description}
            </p>
          )
        )}
      </div>
    </div>
  );
};
