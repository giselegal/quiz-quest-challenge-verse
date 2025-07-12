import React, { useState, useCallback } from "react";
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

  // Carregar versões do localStorage na inicialização
  React.useEffect(() => {
    if (funnelId) {
      try {
        const versionsKey = `quiz-versions-${funnelId}`;
        const savedVersions = localStorage.getItem(versionsKey);
        if (savedVersions) {
          const parsedVersions = JSON.parse(savedVersions);
          setVersions(parsedVersions);
          console.log('📋 Loaded versions from localStorage:', parsedVersions.length);
        }
      } catch (error) {
        console.warn('⚠️ Failed to load versions from localStorage:', error);
      }
    }
  }, [funnelId]);

  const saveVersion = useCallback(
    (funnel: QuizFunnel, name: string, description: string = '') => {
      try {
        const newVersion: Version = {
          id: Date.now().toString(),
          name,
          description,
          timestamp: Date.now(),
          createdAt: new Date().toISOString(),
          data: JSON.parse(JSON.stringify(funnel)),
        };

        // Tentar salvar no localStorage com fallback
        try {
          const versionsKey = `quiz-versions-${funnelId || 'default'}`;
          const existingVersions = JSON.parse(localStorage.getItem(versionsKey) || '[]');
          
          // Limitar a 10 versões para evitar problemas de tamanho
          const limitedVersions = [...existingVersions, newVersion].slice(-10);
          
          localStorage.setItem(versionsKey, JSON.stringify(limitedVersions));
          console.log('✅ Version saved to localStorage:', newVersion.id);
        } catch (storageError) {
          console.warn('⚠️ Failed to save to localStorage:', storageError);
          // Continuar mesmo se localStorage falhar
        }

        setVersions((prev) => {
          const newVersions = [...prev, newVersion];
          // Manter apenas as últimas 10 versões na memória
          return newVersions.slice(-10);
        });
        setCurrentVersion(newVersion.id);

        return newVersion.id;
      } catch (error) {
        console.error('❌ Failed to save version:', error);
        throw new Error('Falha ao salvar versão: ' + (error as Error).message);
      }
    },
    [funnelId]
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

  const clearHistory = useCallback(() => {
    try {
      if (funnelId) {
        const versionsKey = `quiz-versions-${funnelId}`;
        localStorage.removeItem(versionsKey);
        console.log('🗑️ Cleared version history from localStorage');
      }
    } catch (error) {
      console.warn('⚠️ Failed to clear localStorage:', error);
    }
    setVersions([]);
    setCurrentVersion(null);
  }, [funnelId]);

  const getVersionHistory = useCallback(() => {
    return listVersions();
  }, [listVersions]);

  const getVersionMetadata = useCallback(() => {
    return {
      currentVersion,
      totalVersions: versions.length,
      lastModified: versions.length > 0 ? versions[versions.length - 1].createdAt : null
    };
  }, [currentVersion, versions]);

  return {
    versions: listVersions(),
    currentVersion,
    saveVersion,
    loadVersion,
    deleteVersion,
    createVersion,
    createBackup,
    restoreBackup,
    clearHistory,
    getVersionHistory,
    getVersionMetadata,
  };
};
