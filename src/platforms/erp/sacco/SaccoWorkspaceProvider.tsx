/**
 * JUMO UEOS — Sovereign SACCO & Microfinance ERP Workspace Provider
 * Establishes an isolated state container for cooperative financial and lending runtimes.
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DomainDefinition } from '../../../types';
import { ERPWorkspaceContract, validateERPWorkspaceContract } from '../../../platform-runtime/contracts/ERPWorkspaceContract';

interface SaccoWorkspaceContextType {
  contract: ERPWorkspaceContract;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  resetWorkspaceState: () => void;
}

const SaccoWorkspaceContext = createContext<SaccoWorkspaceContextType | null>(null);

export const SaccoWorkspaceProvider: React.FC<{ domain: DomainDefinition; children: ReactNode }> = ({ domain, children }) => {
  const contract = validateERPWorkspaceContract({
    id: domain.id,
    name: domain.name,
    category: domain.category || 'SACCO & Microfinance ERP',
    modules: domain.erpModules ?? [],
    features: domain.aiCapabilities ?? []
  });

  const [activeTab, setActiveTab] = useState<string>('overview');

  const resetWorkspaceState = () => {
    setActiveTab('overview');
  };

  return (
    <SaccoWorkspaceContext.Provider value={{ contract, activeTab, setActiveTab, resetWorkspaceState }}>
      {children}
    </SaccoWorkspaceContext.Provider>
  );
};

export const useSaccoWorkspace = () => {
  const context = useContext(SaccoWorkspaceContext);
  if (!context) {
    throw new Error('useSaccoWorkspace must be used within a SaccoWorkspaceProvider');
  }
  return context;
};
