
import React from 'react';

interface EditorLayoutProps {
  children: React.ReactNode;
}

const EditorLayout: React.FC<EditorLayoutProps> = ({ children }) => {
  return (
    <div className="h-full flex">
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

export default EditorLayout;
