import React from 'react';
import LiveQuizEditor from '../components/live-editor/LiveQuizEditor';

const EditorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#1A1F2C]">
      <LiveQuizEditor />
    </div>
  );
};

export default EditorPage;
