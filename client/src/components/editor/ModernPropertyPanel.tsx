
import React from 'react';

interface ModernPropertyPanelProps {
  selectedComponent: any;
  onChange: (component: any) => void;
}

export const ModernPropertyPanel: React.FC<ModernPropertyPanelProps> = ({
  selectedComponent,
  onChange
}) => {
  return (
    <div className="p-4">
      <h3>Modern Property Panel</h3>
    </div>
  );
};
