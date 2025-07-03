import { useState, useCallback } from "react";
import { QuizFunnel } from "@/interfaces/quiz";

export interface Version {
  id: string;
  name: string;
  description: string;
  timestamp: number;
  createdAt: string;
  data: QuizFunnel;
}

export const useVersionManager = (funnelId?: string) => {
  const [versions, setVersions] = useState<Version[]>([]);
  const [currentVersion, setCurrentVersion] = useState<string | null>(null);

  const saveVersion = useCallback(
    (funnel: QuizFunnel, name: string, description: string = '') => {
      const newVersion: Version = {
        id: Date.now().toString(),
        name,
        description,
        timestamp: Date.now(),
        createdAt: new Date().toISOString(),
        data: JSON.parse(JSON.stringify(funnel)),
      };

      setVersions((prev) => [...prev, newVersion]);
      setCurrentVersion(newVersion.id);

      return newVersion.id;
    },
    []
  );

  const createVersion = useCallback(
    async (funnel: QuizFunnel, name: string, description: string = '') => {
      return saveVersion(funnel, name, description);
    },
    [saveVersion]
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

  const createBackup = useCallback(
    (funnel: QuizFunnel) => {
      return saveVersion(funnel, `Backup ${new Date().toLocaleString()}`, 'Backup automático');
    },
    [saveVersion]
  );

  const restoreBackup = useCallback(
    () => {
      const backupVersions = versions.filter(v => v.description.includes('Backup'));
      if (backupVersions.length > 0) {
        const latestBackup = backupVersions.sort((a, b) => b.timestamp - a.timestamp)[0];
        return loadVersion(latestBackup.id);
      }
      return null;
    },
    [versions, loadVersion]
  );

  return {
    versions: listVersions(),
    currentVersion,
    saveVersion,
    loadVersion,
    deleteVersion,
    createVersion,
    createBackup,
    restoreBackup,
  };
};
