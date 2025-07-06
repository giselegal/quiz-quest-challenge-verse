import React from 'react';
import { cn } from '@/lib/utils';
import { Play } from 'lucide-react';

interface VideoPlayerBlockProps {
  block: {
    id: string;
    type: string;
    properties: {
      title?: string;
      videoUrl?: string;
      thumbnailUrl?: string;
      description?: string;
      autoplay?: boolean;
      controls?: boolean;
    };
  };
  isSelected?: boolean;
  onClick?: () => void;
  onSaveInline?: (blockId: string, key: string, newValue: string) => void;
  disabled?: boolean;
  className?: string;
}

export const VideoPlayerBlock: React.FC<VideoPlayerBlockProps> = ({ 
  block,
  isSelected = false,
  onClick,
  disabled = false,
  className
}) => {
  const { 
    title = 'Vídeo Explicativo',
    videoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl,
    description = 'Assista ao vídeo para entender melhor nosso processo.',
    autoplay = false,
    controls = true
  } = block?.properties || {};

  const isYouTube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');
  const embedUrl = isYouTube 
    ? videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')
    : videoUrl;

  return (
    <div 
      className={cn(
        'relative w-full p-4 rounded-lg border-2 border-dashed',
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white',
        'cursor-pointer hover:border-gray-400 transition-colors',
        className
      )}
      onClick={onClick}
    >
      {/* Title Section - Visual Only */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {title}
        </h3>
      </div>

      {/* Video Section - Visual Only */}
      <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
        {thumbnailUrl ? (
          <div className="relative w-full h-full">
            <img 
              src={thumbnailUrl} 
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Play className="w-8 h-8 text-white ml-1" />
              </div>
            </div>
          </div>
        ) : (
          <iframe
            src={embedUrl}
            title={title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>

      {/* Description Section - Visual Only */}
      {description && (
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            {description}
          </p>
        </div>
      )}
    </div>
  );
};