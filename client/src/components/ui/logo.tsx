
import React from 'react';

interface LogoProps {
  src?: string;
  alt?: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  src = '/lovable-uploads/9f029fbb-cabe-48ef-9877-aad214e94c60.png', 
  alt = 'Logo',
  className = '' 
}) => {
  return (
    <img 
      src={src} 
      alt={alt} 
      className={className}
    />
  );
};

export default Logo;
