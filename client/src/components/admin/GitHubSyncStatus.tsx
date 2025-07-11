import React from 'react';

const GitHubSyncStatus: React.FC = () => {
  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-semibold">GitHub Sync Status</h3>
      <p className="text-gray-600">No sync configured</p>
    </div>
  );
};

export default GitHubSyncStatus;