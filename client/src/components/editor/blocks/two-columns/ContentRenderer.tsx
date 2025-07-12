
import React from 'react';

interface ContentRendererProps {
  content: {
    type: 'text' | 'image' | 'video' | 'list';
    title?: string;
    content?: string;
    imageUrl?: string;
    videoUrl?: string;
    items?: string[];
    alignment?: 'left' | 'center' | 'right';
  };
  textColor: string;
}

export const ContentRenderer: React.FC<ContentRendererProps> = ({ content, textColor }) => {
  const getTextAlign = (alignment?: string) => {
    const aligns: Record<string, string> = {
      'left': 'text-left',
      'center': 'text-center',
      'right': 'text-right'
    };
    return aligns[alignment || 'left'] || 'text-left';
  };

  switch (content.type) {
    case 'text':
      return (
        <div className={getTextAlign(content.alignment)}>
          {content.title && (
            <h3 className="text-xl font-semibold mb-4" style={{ color: textColor }}>
              {content.title}
            </h3>
          )}
          {content.content && (
            <div 
              className="prose prose-gray max-w-none"
              style={{ color: textColor }}
              dangerouslySetInnerHTML={{ __html: content.content }}
            />
          )}
        </div>
      );

    case 'image':
      return (
        <div className={getTextAlign(content.alignment)}>
          {content.title && (
            <h3 className="text-xl font-semibold mb-4" style={{ color: textColor }}>
              {content.title}
            </h3>
          )}
          {content.imageUrl && (
            <img
              src={content.imageUrl}
              alt={content.title || 'Imagem'}
              className="w-full h-auto rounded-lg shadow-md"
              loading="lazy"
            />
          )}
        </div>
      );

    case 'video':
      return (
        <div className={getTextAlign(content.alignment)}>
          {content.title && (
            <h3 className="text-xl font-semibold mb-4" style={{ color: textColor }}>
              {content.title}
            </h3>
          )}
          {content.videoUrl && (
            <div className="aspect-video rounded-lg overflow-hidden shadow-md">
              <iframe
                src={content.videoUrl}
                title={content.title || 'Vídeo'}
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          )}
        </div>
      );

    case 'list':
      return (
        <div className={getTextAlign(content.alignment)}>
          {content.title && (
            <h3 className="text-xl font-semibold mb-4" style={{ color: textColor }}>
              {content.title}
            </h3>
          )}
          {content.items && content.items.length > 0 && (
            <ul className="space-y-3">
              {content.items.map((item: any, index: number) => (
                <li 
                  key={index} 
                  className="flex items-start gap-3"
                  style={{ color: textColor }}
                >
                  <span className="w-2 h-2 bg-[#B89B7A] rounded-full mt-2 flex-shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      );

    default:
      return (
        <div className="text-gray-400 text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
          Conteúdo não configurado
        </div>
      );
  }
};
