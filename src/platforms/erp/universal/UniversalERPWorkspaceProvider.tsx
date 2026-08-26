/**
 * JUMO UEOS — Sovereign Universal ERP Workspace Provider
 * Establishes an isolated state container for any specialized or custom enterprise domain runtime.
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DomainDefinition } from '../../../types';
import { ERPWorkspaceContract, validateERPWorkspaceContract } from '../../../platform-runtime/contracts/ERPWorkspaceContract';

interface UniversalERPWorkspaceContextType {
  contract: ERPWorkspaceContract;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  resetWorkspaceState: () => void;
}

const UniversalERPWorkspaceContext = createContext<UniversalERPWorkspaceContextType | null>(null);

export const UniversalERPWorkspaceProvider: React.FC<{ domain: DomainDefinition; children: ReactNode }> = ({ domain, children }) => {
  const contract = validateERPWorkspaceContract({
    id: domain.id,
    name: domain.name,
    category: domain.category || 'Universal Enterprise ERP',
    modules: domain.erpModules ?? [],
    features: domain.aiCapabilities ?? []
  });

  const [activeTab, setActiveTab] = useState<string>('overview');

  const resetWorkspaceState = () => {
    setActiveTab('overview');
  };

  return (
    <UniversalERPWorkspaceContext.Provider value={{ contract, activeTab, setActiveTab, resetWorkspaceState }}>
      {children}
    </UniversalERPWorkspaceContext.Provider>
  );
};

export const useUniversalERPWorkspace = () => {
  const context = useContext(UniversalERPWorkspaceContext);
  if (!context) {
    throw new Error('useUniversalERPWorkspace must be used within a UniversalERPWorkspaceProvider');
  }
  return context;
};
