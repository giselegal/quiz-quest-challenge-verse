
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedWrapperProps {
  children: React.ReactNode;
  show: boolean;
  className?: string;
  animation?: string;
  duration?: number;
  delay?: number;
}

export const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({
  children,
  show,
  className = '',
  animation = 'fade',
  duration = 0.3,
  delay = 0
}) => {
  const getAnimationVariants = () => {
    switch (animation) {
      case 'scale':
        return {
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.95 }
        };
      case 'slide':
        return {
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -20 }
        };
      case 'none':
        return {
          initial: { opacity: 1 },
          animate: { opacity: 1 },
          exit: { opacity: 1 }
        };
      default: // 'fade'
        return {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 }
        };
    }
  };

  const variants = getAnimationVariants();

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={variants.initial}
          animate={variants.animate}
          exit={variants.exit}
          transition={{ duration, delay }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
