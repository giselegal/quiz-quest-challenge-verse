
import React from 'react';

export interface LogoProps {
  src?: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}

const Logo: React.FC<LogoProps> = ({ 
  src = "/logo.png", 
  alt = "Logo", 
  className = "",
  style 
}) => {
  return (
    <img 
      src={src} 
      alt={alt} 
      className={className}
      style={style}
    />
  );
};

export default Logo;
