import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface QuizTransitionProps {
  onContinue: () => void;
  progress?: number;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const QuizTransition: React.FC<QuizTransitionProps> = ({
  onContinue,
  progress = 50,
  title = "Descobrindo seu estilo...",
  subtitle = "Agora vamos entender melhor suas motivações e preferências pessoais.",
  className
}) => {
  const isMobile = useIsMobile();
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Animate progress bar
    const timer1 = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 500);

    // Show continue button after animation
    const timer2 = setTimeout(() => {
      setShowButton(true);
    }, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [progress]);

  return (
    <div className={cn(
      "w-full h-full flex items-center justify-center",
      "bg-gradient-to-br from-background via-muted/10 to-accent/5",
      "min-h-[600px]",
      className
    )}>
      <Card className="max-w-lg w-full mx-4 p-8 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <div className="text-center space-y-6">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Sparkles className={cn(
                "text-primary animate-pulse",
                isMobile ? "w-12 h-12" : "w-16 h-16"
              )} />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-ping"></div>
            </div>
          </div>

          {/* Title */}
          <h2 className={cn(
            "font-playfair font-bold text-primary",
            isMobile ? "text-xl" : "text-2xl"
          )}>
            {title}
          </h2>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Progresso</span>
              <span>{animatedProgress}%</span>
            </div>
            <Progress 
              value={animatedProgress} 
              className="h-3 bg-muted"
              style={{
                transition: 'all 1.5s ease-in-out'
              }}
            />
          </div>

          {/* Subtitle */}
          <p className={cn(
            "text-muted-foreground leading-relaxed",
            isMobile ? "text-sm" : "text-base"
          )}>
            {subtitle}
          </p>

          {/* Continue Button */}
          {showButton && (
            <div className="pt-4">
              <Button
                onClick={onContinue}
                size="lg"
                className={cn(
                  "w-full group transition-all duration-300",
                  "bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl",
                  "hover:scale-105"
                )}
              >
                <span className="flex items-center gap-2">
                  Continuar Descoberta
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default QuizTransition;