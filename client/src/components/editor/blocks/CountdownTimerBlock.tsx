
import React, { useState, useEffect } from 'react';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { InlineEditableText } from './InlineEditableText';
import { cn } from '@/lib/utils';
import type { BlockComponentProps } from '@/types/blocks';

interface CountdownTimerBlockProps extends BlockComponentProps {
  initialMinutes?: number;
  title?: string;
  backgroundColor?: string;
  textColor?: string;
  showControls?: boolean;
}

const CountdownTimerBlock: React.FC<CountdownTimerBlockProps> = ({
  block,
  initialMinutes = 15,
  title = 'Oferta Limitada!',
  backgroundColor = '#dc2626',
  textColor = '#ffffff',
  showControls = true,
  isSelected = false,
  isEditing = false,
  onClick,
  onPropertyChange,
  className = ''
}) => {
  const {
    initialMinutes: blockInitialMinutes = initialMinutes,
    title: blockTitle = title,
    backgroundColor: blockBackgroundColor = backgroundColor,
    textColor: blockTextColor = textColor,
    showControls: blockShowControls = showControls
  } = block.properties;

  const [timeLeft, setTimeLeft] = useState(blockInitialMinutes * 60);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0 && !isEditing) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isEditing]);

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setTimeLeft(blockInitialMinutes * 60);
    setIsRunning(true);
  };

  return (
    <div
      className={cn(
        "w-full transition-all duration-200",
        isSelected && "ring-1 ring-gray-400/40 bg-gray-50/30",
        className
      )}
      onClick={onClick}
      data-block-id={block.id}
      data-block-type={block.type}
    >
      <Card className="border-0 shadow-lg" style={{ backgroundColor: blockBackgroundColor }}>
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold mb-4" style={{ color: blockTextColor }}>
            <InlineEditableText
              value={blockTitle}
              onChange={(value: string) => handlePropertyChange('title', value)}
              className="inline-block"
              placeholder="Título do countdown"
            />
          </h3>
          
          <div className="flex items-center justify-center gap-4 mb-4">
            <Clock className="w-8 h-8" style={{ color: blockTextColor }} />
            <span 
              className="text-4xl font-bold font-mono tracking-wider"
              style={{ color: blockTextColor }}
            >
              {formatTime(timeLeft)}
            </span>
          </div>

          {blockShowControls && isEditing && (
            <div className="flex justify-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePlayPause}
                className="text-current hover:bg-white/20"
                style={{ color: blockTextColor }}
              >
                {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="text-current hover:bg-white/20"
                style={{ color: blockTextColor }}
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CountdownTimerBlock;
