
import React from 'react';

interface EditBlockContentProps {
  content: any;
  onChange: (content: any) => void;
}

export const EditBlockContent: React.FC<EditBlockContentProps> = ({
  content,
  onChange
}) => {
  return (
    <div className="p-4">
      <p>Edit Block Content</p>
    </div>
  );
};
