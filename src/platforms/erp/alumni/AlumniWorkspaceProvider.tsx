/**
 * JUMO UEOS — Sovereign Alumni & Advancement ERP Workspace Provider
 * Establishes an isolated state container for advancement and donor relations runtimes.
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DomainDefinition } from '../../../types';
import { ERPWorkspaceContract, validateERPWorkspaceContract } from '../../../platform-runtime/contracts/ERPWorkspaceContract';

interface AlumniWorkspaceContextType {
  contract: ERPWorkspaceContract;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  resetWorkspaceState: () => void;
}

const AlumniWorkspaceContext = createContext<AlumniWorkspaceContextType | null>(null);

export const AlumniWorkspaceProvider: React.FC<{ domain: DomainDefinition; children: ReactNode }> = ({ domain, children }) => {
  const contract = validateERPWorkspaceContract({
    id: domain.id,
    name: domain.name,
    category: domain.category || 'Alumni & Advancement ERP',
    modules: domain.erpModules ?? [],
    features: domain.aiCapabilities ?? []
  });

  const [activeTab, setActiveTab] = useState<string>('overview');

  const resetWorkspaceState = () => {
    setActiveTab('overview');
  };

  return (
    <AlumniWorkspaceContext.Provider value={{ contract, activeTab, setActiveTab, resetWorkspaceState }}>
      {children}
    </AlumniWorkspaceContext.Provider>
  );
};

export const useAlumniWorkspace = () => {
  const context = useContext(AlumniWorkspaceContext);
  if (!context) {
    throw new Error('useAlumniWorkspace must be used within an AlumniWorkspaceProvider');
  }
  return context;
};
