
import React, { useState, useRef } from 'react';
import type { BlockComponentProps } from '@/types/blocks';

interface BeforeAfterBlockProps extends BlockComponentProps {
  block: {
    id: string;
    type: 'before-after';
    properties: {
      title?: string;
      subtitle?: string;
      beforeImage: string;
      afterImage: string;
      beforeLabel?: string;
      afterLabel?: string;
      beforeDescription?: string;
      afterDescription?: string;
      showLabels?: boolean;
      showDescriptions?: boolean;
      sliderPosition?: number;
      orientation?: 'horizontal' | 'vertical';
      backgroundColor?: string;
      textColor?: string;
    };
  };
}

const BeforeAfterBlock: React.FC<BeforeAfterBlockProps> = ({
  block,
  isSelected = false,
  onClick,
  className = ''
}) => {
  const {
    title = 'Transformação',
    subtitle = '',
    beforeImage,
    afterImage,
    beforeLabel = 'Antes',
    afterLabel = 'Depois',
    beforeDescription = '',
    afterDescription = '',
    showLabels = true,
    showDescriptions = true,
    sliderPosition: initialPosition = 50,
    orientation = 'horizontal',
    backgroundColor = '#ffffff',
    textColor = '#374151'
  } = block.properties;

  const [sliderPosition, setSliderPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const position = orientation === 'horizontal' 
      ? ((e.clientX - rect.left) / rect.width) * 100
      : ((e.clientY - rect.top) / rect.height) * 100;
    
    setSliderPosition(Math.min(100, Math.max(0, position)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <div 
      className={`
        w-full p-6 rounded-lg cursor-pointer transition-all duration-200
        ${isSelected 
          ? 'border-2 border-blue-500 bg-blue-50' 
          : 'border-2 border-dashed border-[#B89B7A]/40 hover:bg-[#FAF9F7]'
        }
        ${className}
      `}
      style={{ backgroundColor, color: textColor }}
      onClick={onClick}
      data-block-id={block.id}
      data-block-type={block.type}
    >
      {/* Header */}
      {(title || subtitle) && (
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
      )}

      <div className={`flex ${orientation === 'horizontal' ? 'flex-col lg:flex-row' : 'flex-col'} gap-8 items-center`}>
        {/* Before/After Slider */}
        <div className="flex-1 w-full max-w-2xl">
          <div
            ref={containerRef}
            className="relative overflow-hidden rounded-lg shadow-lg aspect-video bg-gray-100"
            style={{ userSelect: 'none' }}
          >
            {/* After Image (Background) */}
            <img
              src={afterImage}
              alt={afterLabel}
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
            
            {/* Before Image (Clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                clipPath: orientation === 'horizontal'
                  ? `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
                  : `polygon(0 0, 100% 0, 100% ${sliderPosition}%, 0 ${sliderPosition}%)`
              }}
            >
              <img
                src={beforeImage}
                alt={beforeLabel}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>

            {/* Slider Handle */}
            <div
              className={`absolute ${orientation === 'horizontal' ? 'top-0 bottom-0 w-1' : 'left-0 right-0 h-1'} bg-white shadow-lg cursor-${orientation === 'horizontal' ? 'ew' : 'ns'}-resize`}
              style={{
                [orientation === 'horizontal' ? 'left' : 'top']: `${sliderPosition}%`,
                transform: orientation === 'horizontal' ? 'translateX(-50%)' : 'translateY(-50%)'
              }}
              onMouseDown={handleMouseDown}
            >
              <div
                className={`absolute ${orientation === 'horizontal' ? 'top-1/2 left-1/2 w-8 h-8' : 'left-1/2 top-1/2 w-8 h-8'} bg-white rounded-full shadow-lg border-2 border-gray-300 cursor-pointer`}
                style={{
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="flex items-center justify-center h-full">
                  {orientation === 'horizontal' ? (
                    <div className="flex gap-0.5">
                      <div className="w-0.5 h-4 bg-gray-600"></div>
                      <div className="w-0.5 h-4 bg-gray-600"></div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-0.5">
                      <div className="w-4 h-0.5 bg-gray-600"></div>
                      <div className="w-4 h-0.5 bg-gray-600"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Labels */}
            {showLabels && (
              <>
                <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {beforeLabel}
                </div>
                <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {afterLabel}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Descriptions */}
        {showDescriptions && (beforeDescription || afterDescription) && (
          <div className="flex-1 w-full max-w-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {beforeDescription && (
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2 text-red-600">
                    {beforeLabel}
                  </h3>
                  <p className="text-gray-600">
                    {beforeDescription}
                  </p>
                </div>
              )}
              {afterDescription && (
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2 text-green-600">
                    {afterLabel}
                  </h3>
                  <p className="text-gray-600">
                    {afterDescription}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BeforeAfterBlock;
