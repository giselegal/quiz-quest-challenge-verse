import React, { useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import type { BlockComponentProps } from '@/types/blocks';

const ConfettiBlock: React.FC<BlockComponentProps> = ({
  block,
  isSelected = false,
  isEditing = false,
  onClick,
  onPropertyChange,
  className = ''
}) => {
  const {
    duration = 3000,
    particleCount = 100
  } = block.properties;

  const confettiRef = useRef<HTMLDivElement>(null);

  // Este é um placeholder. Para um confetti real, você precisaria de uma lib como `canvas-confetti`
  useEffect(() => {
    if (confettiRef.current && !isSelected) {
      // Exemplo com `canvas-confetti` (se instalado)
      // confetti({
      //   particleCount: particleCount || 100,
      //   spread: 70,
      //   origin: { y: 0.6 },
      //   duration: duration || 3000,
      // });
    }
  }, [duration, particleCount, isSelected]);

  return (
    <div
      ref={confettiRef}
      className={`
        py-12 text-center bg-purple-50 rounded-lg border border-purple-200 cursor-pointer transition-all duration-200
        ${isSelected 
          ? 'ring-1 ring-gray-400/40 bg-gray-50/30' 
          : 'hover:shadow-sm hover:bg-purple-100'
        }
        ${className}
      `}
      onClick={onClick}
      data-block-id={block.id}
      data-block-type={block.type}
    >
      <Sparkles className="w-16 h-16 mx-auto text-purple-500 mb-4 animate-pulse" />
      <p className="text-lg text-purple-800 font-semibold">🎉 Efeito de Confete! 🎉</p>
      <p className="text-sm text-gray-600 mt-2">
        (Visível na página publicada ou ao simular)
      </p>
      <div className="text-xs text-gray-500 mt-2">
        Partículas: {particleCount} | Duração: {duration / 1000}s
      </div>
    </div>
  );
};

export default ConfettiBlock;
