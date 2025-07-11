import React from 'react';

/**
 * BLOCO EDITÁVEL: Barra de Progresso do Quiz
 */

export interface QuizProgressBlockProps {
  blockId?: string;
  progressValue?: number;
  showPercentage?: boolean;
  progressColor?: string;
  backgroundColor?: string;
  className?: string;
}

const QuizProgressBlock: React.FC<QuizProgressBlockProps> = ({
  blockId = 'quiz-progress-block',
  progressValue = 50,
  showPercentage = true,
  progressColor = '#B89B7A',
  backgroundColor = '#F3E8E6',
  className = '',
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progressValue));

  const progressBarStyle = {
    width: `${clampedProgress}%`,
    backgroundColor: progressColor,
    height: '10px',
    borderRadius: '5px',
    transition: 'width 0.3s ease-in-out',
  };

  const progressRingStyle = {
    backgroundColor: backgroundColor,
    borderColor: progressColor,
  };

  return (
    <div className={`quiz-progress-block ${className}`} data-block-id={blockId}>
      <div className="relative pt-1">
        {showPercentage && (
          <div className="text-center mb-2 text-sm font-medium">
            {clampedProgress}% Completo
          </div>
        )}
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200" style={progressRingStyle}>
          <div
            style={progressBarStyle}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default QuizProgressBlock;
