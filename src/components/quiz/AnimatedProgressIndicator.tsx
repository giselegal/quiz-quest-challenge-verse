import React from 'react';
import { motion } from 'framer-motion';

const AnimatedProgressIndicator: React.FC = () => (
  <div className="flex items-center justify-center gap-1 mt-2">
    <motion.div 
      className="w-8 h-1.5 rounded-full bg-[#B89B7A]"
      initial={{ width: 0 }}
      animate={{ width: '2rem' }}
      transition={{ duration: 0.5 }}
    />
    <div className="w-8 h-1.5 rounded-full bg-gray-200"></div>
    <div className="w-8 h-1.5 rounded-full bg-gray-200"></div>
    <div className="w-8 h-1.5 rounded-full bg-gray-200"></div>
  </div>
);

export default AnimatedProgressIndicator;
