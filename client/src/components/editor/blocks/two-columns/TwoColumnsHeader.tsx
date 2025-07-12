
import React from 'react';

interface TwoColumnsHeaderProps {
  title?: string;
  subtitle?: string;
  textColor: string;
}

export const TwoColumnsHeader: React.FC<TwoColumnsHeaderProps> = ({
  title,
  subtitle,
  textColor
}) => {
  if (!title && !subtitle) return null;

  return (
    <div className="text-center mb-8">
      {title && (
        <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: textColor }}>
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};
