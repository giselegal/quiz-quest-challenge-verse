// Temporary file to silence missing imports
import React from 'react';

export const InlineEditableText = ({ value, onSave, onChange, ...props }: any) => (
  <input 
    value={value} 
    onChange={(e) => onChange?.(e.target.value)} 
    onBlur={(e) => onSave?.(e.target.value)}
    {...props} 
  />
);

export const Plus = () => <span>+</span>;
export const BlockRenderer = ({ block }: any) => <div>{JSON.stringify(block)}</div>;
export const getIconByName = (name: string) => () => React.createElement('span', { size: 16 }, name);

// Fix for missing interface export
export interface InlineEditableTextProps {
  value: any;
  onSave?: (value: any) => void;
  onChange?: (value: any) => void;
  className?: string;
  style?: any;
  placeholder?: string;
  isTextArea?: boolean;
  disabled?: boolean;
}