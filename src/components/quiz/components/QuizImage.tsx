
import React from 'react';

interface QuizImageProps {
  src?: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  alignment?: 'left' | 'center' | 'right';
  className?: string;
}

const QuizImage: React.FC<QuizImageProps> = ({
  src = '',
  alt,
  width = '100%',
  height = 'auto',
  borderRadius = '8px',
  alignment = 'center',
  className = '',
}) => {
  console.log(`[QuizImage] Loading image: ${src}`);

  const containerStyle: React.CSSProperties = {
    textAlign: alignment,
    margin: '1rem 0',
  };

  const imageStyle: React.CSSProperties = {
    width,
    height,
    borderRadius,
    maxWidth: '100%',
    objectFit: 'cover',
    display: 'inline-block',
  };

  if (!src) {
    console.warn('[QuizImage] No src provided');
    return null;
  }

  return (
    <div style={containerStyle} className={className}>
      <img 
        src={src}
        alt={alt}
        style={imageStyle}
        loading="lazy"
        onLoad={() => console.log(`[QuizImage] Successfully loaded: ${src}`)}
        onError={() => console.error(`[QuizImage] Failed to load: ${src}`)}
      />
    </div>
  );
};

export default QuizImage;
