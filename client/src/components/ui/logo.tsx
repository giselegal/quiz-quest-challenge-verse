
import React from 'react';

interface LogoProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

const Logo: React.FC<LogoProps> = ({ src, alt, className = '', style }) => {
  return (
    <img 
      src={src} 
      alt={alt} 
      className={`object-contain ${className}`}
      style={style}
    />
  );
};

export default Logo;
