import { useState, useEffect } from 'react';
import { PlatformRegistry } from '../lib/registry';

export type BootStage = 'CONFIG' | 'SESSION' | 'NAVIGATION' | 'REGISTRY' | 'READY';

export const useAppBoot = () => {
  const [stage, setStage] = useState<BootStage>('CONFIG');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function boot() {
      try {
        // 1. Load Config
        setStage('CONFIG');
        setProgress(20);
        await new Promise(resolve => setTimeout(resolve, 300));
        PlatformRegistry.getPlatformConfig();

        // 2. Validate Session (Stub)
        setStage('SESSION');
        setProgress(40);
        await new Promise(resolve => setTimeout(resolve, 300));

        // 3. Load Navigation
        setStage('NAVIGATION');
        setProgress(60);
        await new Promise(resolve => setTimeout(resolve, 300));
        PlatformRegistry.getNavigation();

        // 4. Load Registry/Factories/Domains
        setStage('REGISTRY');
        setProgress(80);
        await new Promise(resolve => setTimeout(resolve, 300));
        PlatformRegistry.getDomains();
        PlatformRegistry.getFactories();

        // 5. Final
        setStage('READY');
        setProgress(100);
      } catch (err) {
        setError("Failed to initialize platform.");
      }
    }
    boot();
  }, []);

  return { stage, progress, error };
};
