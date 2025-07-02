import { useState, useCallback } from "react";

export interface Version {
  id: string;
  name: string;
  timestamp: number;
  data: Record<string, unknown>;
}

export const useVersionManager = () => {
  const [versions, setVersions] = useState<Version[]>([]);
  const [currentVersion, setCurrentVersion] = useState<string | null>(null);

  const saveVersion = useCallback(
    (name: string, data: Record<string, unknown>) => {
      const newVersion: Version = {
        id: Date.now().toString(),
        name,
        timestamp: Date.now(),
        data: JSON.parse(JSON.stringify(data)),
      };

      setVersions((prev) => [...prev, newVersion]);
      setCurrentVersion(newVersion.id);

      return newVersion.id;
    },
    []
  );

  const loadVersion = useCallback(
    (versionId: string) => {
      const version = versions.find((v) => v.id === versionId);
      if (version) {
        setCurrentVersion(versionId);
        return version.data;
      }
      return null;
    },
    [versions]
  );

  const deleteVersion = useCallback(
    (versionId: string) => {
      setVersions((prev) => prev.filter((v) => v.id !== versionId));
      if (currentVersion === versionId) {
        setCurrentVersion(null);
      }
    },
    [currentVersion]
  );

  const listVersions = useCallback(() => {
    return [...versions].sort((a, b) => b.timestamp - a.timestamp);
  }, [versions]);

  return {
    versions: listVersions(),
    currentVersion,
    saveVersion,
    loadVersion,
    deleteVersion,
  };
};
