
import React from 'react';

const ComponentList: React.FC = () => {
  return (
    <div className="p-4">
      <h3>Components</h3>
      <div className="space-y-2">
        <div className="p-2 border rounded">Headline</div>
        <div className="p-2 border rounded">Text</div>
        <div className="p-2 border rounded">Image</div>
      </div>
    </div>
  );
};

export default ComponentList;
