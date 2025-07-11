
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Block } from '@/types/editor';
import { LucideIcon, Code } from 'lucide-react';

interface ComponentItemProps {
  type: Block['type'];
  label: string;
  icon: LucideIcon;
  description: string;
  onSelect: (type: Block['type']) => void;
  componentPath?: string;
}

// ES7+ Arrow function component with destructuring and spread
export const ComponentItem: React.FC<ComponentItemProps> = ({
  type,
  label,
  icon: Icon,
  description,
  onSelect,
  componentPath,
  ...props
}) => {
  // ES7+ Event handler with arrow function
  const handleSelect = () => onSelect(type);
  
  // ES7+ Conditional rendering with logical operators
  const isComponentReference = type === 'component-reference';
  
  return (
    <div 
      className={cn(
        // ES7+ Template literals and logical operators
        'border border-[#B89B7A]/20 rounded-md bg-white transition-colors cursor-pointer overflow-hidden',
        'hover:bg-[#FAF9F7] hover:border-[#B89B7A]/40 hover:shadow-sm',
        isComponentReference && 'border-l-4 border-l-blue-500 bg-blue-50/30'
      )}
      onClick={handleSelect}
      {...props}
    >
      <div className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <Icon className={cn(
            'w-4 h-4',
            isComponentReference ? 'text-blue-600' : 'text-[#8F7A6A]'
          )} />
          <span className="font-medium text-[#432818] flex-1">{label}</span>
          {isComponentReference && (
            <Code className="w-3 h-3 text-blue-500" />
          )}
        </div>
        <p className={cn(
          'text-xs',
          isComponentReference ? 'text-blue-600' : 'text-[#8F7A6A]'
        )}>
          {description}
        </p>
        {componentPath && (
          <div className="mt-2 text-xs text-blue-500 bg-blue-100 px-2 py-1 rounded">
            <code>{componentPath.split('/').pop()}</code>
          </div>
        )}
      </div>
    </div>
  );
};
