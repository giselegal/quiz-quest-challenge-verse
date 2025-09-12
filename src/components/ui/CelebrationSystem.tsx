import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, Award, Trophy, Zap, Crown, Heart, Gift } from 'lucide-react';

export type CelebrationTrigger = 
  | 'template-applied'
  | 'quiz-saved'
  | 'quiz-completed'
  | 'milestone-reached'
  | 'perfect-score'
  | 'first-quiz'
  | 'streak-achieved'
  | 'level-up';

export interface CelebrationConfig {
  trigger: CelebrationTrigger;
  title: string;
  subtitle?: string;
  icon?: React.ComponentType<{ className?: string }>;
  color: 'blue' | 'green' | 'purple' | 'gold' | 'rainbow';
  intensity: 'low' | 'medium' | 'high' | 'epic';
  duration?: number;
  particles?: boolean;
  sound?: string;
}

const celebrationConfigs: Record<CelebrationTrigger, CelebrationConfig> = {
  'template-applied': {
    trigger: 'template-applied',
    title: '🎨 Template Aplicado!',
    subtitle: 'Seu quiz está ficando incrível!',
    icon: Sparkles,
    color: 'blue',
    intensity: 'medium',
    particles: true
  },
  'quiz-saved': {
    trigger: 'quiz-saved',
    title: '💾 Quiz Salvo!',
    subtitle: 'Suas alterações foram salvas com sucesso',
    icon: Star,
    color: 'green',
    intensity: 'low',
    particles: false
  },
  'quiz-completed': {
    trigger: 'quiz-completed',
    title: '✅ Quiz Finalizado!',
    subtitle: 'Parabéns por completar seu quiz!',
    icon: Award,
    color: 'green',
    intensity: 'high',
    particles: true
  },
  'milestone-reached': {
    trigger: 'milestone-reached',
    title: '🏆 Marco Atingido!',
    subtitle: 'Você alcançou um objetivo importante!',
    icon: Trophy,
    color: 'gold',
    intensity: 'high',
    particles: true
  },
  'perfect-score': {
    trigger: 'perfect-score',
    title: '⚡ Pontuação Perfeita!',
    subtitle: 'Incrível! Você acertou tudo!',
    icon: Zap,
    color: 'gold',
    intensity: 'epic',
    particles: true
  },
  'first-quiz': {
    trigger: 'first-quiz',
    title: '👑 Primeiro Quiz!',
    subtitle: 'Bem-vindo à família Quiz Quest!',
    icon: Crown,
    color: 'purple',
    intensity: 'epic',
    particles: true
  },
  'streak-achieved': {
    trigger: 'streak-achieved',
    title: '💝 Sequência Incrível!',
    subtitle: 'Você está em uma série fantástica!',
    icon: Heart,
    color: 'rainbow',
    intensity: 'high',
    particles: true
  },
  'level-up': {
    trigger: 'level-up',
    title: '🎁 Nível Aumentado!',
    subtitle: 'Você desbloqueou novas funcionalidades!',
    icon: Gift,
    color: 'rainbow',
    intensity: 'epic',
    particles: true
  }
};

interface CelebrationProps {
  trigger?: CelebrationTrigger;
  customConfig?: Partial<CelebrationConfig>;
  onComplete?: () => void;
}

export const CelebrationAnimation: React.FC<CelebrationProps> = ({
  trigger = 'quiz-saved',
  customConfig,
  onComplete
}) => {
  const config = { ...celebrationConfigs[trigger], ...customConfig };
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const duration = config.duration || (config.intensity === 'epic' ? 4000 : config.intensity === 'high' ? 3000 : 2000);
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [config.duration, config.intensity, onComplete]);

  const colorClasses = {
    blue: {
      bg: 'from-blue-500 to-cyan-500',
      text: 'text-blue-100',
      accent: 'text-blue-200'
    },
    green: {
      bg: 'from-green-500 to-emerald-500',
      text: 'text-green-100',
      accent: 'text-green-200'
    },
    purple: {
      bg: 'from-purple-500 to-pink-500',
      text: 'text-purple-100',
      accent: 'text-purple-200'
    },
    gold: {
      bg: 'from-yellow-500 to-orange-500',
      text: 'text-yellow-100',
      accent: 'text-yellow-200'
    },
    rainbow: {
      bg: 'from-pink-500 via-purple-500 to-indigo-500',
      text: 'text-white',
      accent: 'text-gray-200'
    }
  };

  const intensityConfig = {
    low: { scale: 1.05, particles: 8, duration: 1.5 },
    medium: { scale: 1.1, particles: 15, duration: 2.5 },
    high: { scale: 1.15, particles: 25, duration: 3.5 },
    epic: { scale: 1.2, particles: 40, duration: 4.5 }
  };

  const { scale, particles: particleCount, duration } = intensityConfig[config.intensity];
  const IconComponent = config.icon || Star;

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8, y: -100 }}
        className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
      >
        {/* Background overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black"
        />

        {/* Main celebration card */}
        <motion.div
          initial={{ scale: 0.5, y: 100 }}
          animate={{ 
            scale: [0.5, scale, 1],
            y: [100, -20, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: duration,
            ease: "easeOut"
          }}
          className={`
            relative px-8 py-6 rounded-2xl shadow-2xl backdrop-blur-sm border border-white/20
            bg-gradient-to-br ${colorClasses[config.color].bg}
            max-w-md mx-4 text-center
          `}
        >
          {/* Icon */}
          <motion.div
            animate={{
              rotate: config.intensity === 'epic' ? [0, 360] : [0, 10, -10, 0],
              scale: config.intensity === 'epic' ? [1, 1.2, 1] : [1, 1.1, 1]
            }}
            transition={{
              duration: config.intensity === 'epic' ? 2 : 1,
              repeat: config.intensity === 'epic' ? Infinity : 2
            }}
            className="mb-4 flex justify-center"
          >
            <IconComponent className={`w-16 h-16 ${colorClasses[config.color].text}`} />
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`text-2xl font-bold mb-2 ${colorClasses[config.color].text}`}
          >
            {config.title}
          </motion.h2>

          {/* Subtitle */}
          {config.subtitle && (
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className={`text-sm ${colorClasses[config.color].accent}`}
            >
              {config.subtitle}
            </motion.p>
          )}

          {/* Particles */}
          {config.particles && (
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: particleCount }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 1,
                    scale: 0,
                    x: "50%",
                    y: "50%"
                  }}
                  animate={{
                    opacity: [1, 1, 0],
                    scale: [0, Math.random() * 0.8 + 0.4, 1.2],
                    x: [
                      "50%",
                      `${50 + (Math.random() - 0.5) * 400}%`
                    ],
                    y: [
                      "50%",
                      `${50 + (Math.random() - 0.5) * 400}%`
                    ],
                    rotate: [0, Math.random() * 360]
                  }}
                  transition={{
                    duration: duration / 1000,
                    delay: i * 0.05,
                    ease: "easeOut"
                  }}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: config.color === 'rainbow' 
                      ? `hsl(${Math.random() * 360}, 70%, 60%)`
                      : config.color === 'gold' 
                        ? '#fbbf24'
                        : config.color === 'blue'
                          ? '#3b82f6'
                          : config.color === 'green'
                            ? '#10b981'
                            : '#8b5cf6'
                  }}
                />
              ))}
            </div>
          )}

          {/* Ring animation for epic celebrations */}
          {config.intensity === 'epic' && (
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ 
                scale: [0, 3, 5], 
                opacity: [1, 0.5, 0] 
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatDelay: 0.5
              }}
              className="absolute inset-0 border-4 border-white/30 rounded-2xl"
            />
          )}
        </motion.div>

        {/* Fireworks for epic celebrations */}
        {config.intensity === 'epic' && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.3,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
                className="absolute"
                style={{
                  left: `${Math.random() * 80 + 10}%`,
                  top: `${Math.random() * 80 + 10}%`
                }}
              >
                <Sparkles className={`w-8 h-8 ${colorClasses[config.color].text}`} />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

// Hook for managing celebrations
export const useCelebration = () => {
  const [activeCelebration, setActiveCelebration] = useState<CelebrationTrigger | null>(null);
  const [customConfig, setCustomConfig] = useState<Partial<CelebrationConfig> | undefined>();

  const celebrate = (trigger: CelebrationTrigger, config?: Partial<CelebrationConfig>) => {
    setCustomConfig(config);
    setActiveCelebration(trigger);
  };

  const stopCelebration = () => {
    setActiveCelebration(null);
    setCustomConfig(undefined);
  };

  return {
    activeCelebration,
    customConfig,
    celebrate,
    stopCelebration
  };
};

// Celebration Provider Context
const CelebrationContext = React.createContext<{
  celebrate: (trigger: CelebrationTrigger, config?: Partial<CelebrationConfig>) => void;
} | null>(null);

export const CelebrationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { activeCelebration, customConfig, celebrate, stopCelebration } = useCelebration();

  return (
    <CelebrationContext.Provider value={{ celebrate }}>
      {children}
      {activeCelebration && (
        <CelebrationAnimation
          trigger={activeCelebration}
          customConfig={customConfig}
          onComplete={stopCelebration}
        />
      )}
    </CelebrationContext.Provider>
  );
};

export const useCelebrationContext = () => {
  const context = React.useContext(CelebrationContext);
  if (!context) {
    throw new Error('useCelebrationContext must be used within CelebrationProvider');
  }
  return context;
};