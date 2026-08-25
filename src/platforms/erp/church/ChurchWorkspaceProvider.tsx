/**
 * JUMO UEOS — Sovereign Church & Religious ERP Workspace Provider
 * Establishes an isolated state container and ledger scope for ecclesiastical runtimes.
 * Prevents state bleed to or from other enterprise domain platforms.
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DomainDefinition } from '../../../types';
import { ERPWorkspaceContract, validateERPWorkspaceContract } from '../../../platform-runtime/contracts/ERPWorkspaceContract';

interface ChurchWorkspaceContextType {
  contract: ERPWorkspaceContract;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeTenantId: string;
  setActiveTenantId: (id: string) => void;
  resetWorkspaceState: () => void;
}

const ChurchWorkspaceContext = createContext<ChurchWorkspaceContextType | null>(null);

export const ChurchWorkspaceProvider: React.FC<{ domain: DomainDefinition; children: ReactNode }> = ({ domain, children }) => {
  const contract = validateERPWorkspaceContract({
    id: domain.id,
    name: domain.name,
    category: domain.category || 'Church & Religious ERP',
    modules: domain.erpModules ?? [],
    features: domain.aiCapabilities ?? []
  });

  const [activeTab, setActiveTab] = useState<string>('overview');
  const [activeTenantId, setActiveTenantId] = useState<string>('TEN-01');

  const resetWorkspaceState = () => {
    setActiveTab('overview');
    setActiveTenantId('TEN-01');
  };

  return (
    <ChurchWorkspaceContext.Provider value={{ contract, activeTab, setActiveTab, activeTenantId, setActiveTenantId, resetWorkspaceState }}>
      {children}
    </ChurchWorkspaceContext.Provider>
  );
};

export const useChurchWorkspace = () => {
  const context = useContext(ChurchWorkspaceContext);
  if (!context) {
    throw new Error('useChurchWorkspace must be used within a ChurchWorkspaceProvider');
  }
  return context;
};
