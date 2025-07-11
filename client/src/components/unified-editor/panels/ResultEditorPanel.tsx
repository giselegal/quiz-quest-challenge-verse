import React, { useState } from 'react';
import { StyleResult } from '@/types/quiz';

interface ResultEditorPanelProps {
  isPreviewing: boolean;
  primaryStyle: StyleResult;
}

const ResultEditorPanel: React.FC<ResultEditorPanelProps> = ({ 
  isPreviewing, 
  primaryStyle 
}) => {
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  
  return (
    <div className="h-full bg-white">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Result Editor</h2>
        <p className="text-gray-600 mb-4">Primary Style: {primaryStyle.category}</p>
        
        {isPreviewing ? (
          <div className="bg-blue-50 p-4 rounded">
            <p>Preview mode active</p>
          </div>
        ) : (
          <div className="bg-gray-50 p-4 rounded">
            <p>Edit mode - Select components to modify</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultEditorPanel;