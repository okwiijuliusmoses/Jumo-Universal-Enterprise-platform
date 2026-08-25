/**
 * JUMO UEOS — Sovereign Education & School ERP Workspace Provider
 * Establishes an isolated state container for academic institutional runtimes.
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DomainDefinition } from '../../../types';
import { ERPWorkspaceContract, validateERPWorkspaceContract } from '../../../platform-runtime/contracts/ERPWorkspaceContract';

interface EducationWorkspaceContextType {
  contract: ERPWorkspaceContract;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  resetWorkspaceState: () => void;
}

const EducationWorkspaceContext = createContext<EducationWorkspaceContextType | null>(null);

export const EducationWorkspaceProvider: React.FC<{ domain: DomainDefinition; children: ReactNode }> = ({ domain, children }) => {
  const contract = validateERPWorkspaceContract({
    id: domain.id,
    name: domain.name,
    category: domain.category || 'Education & School ERP',
    modules: domain.erpModules ?? [],
    features: domain.aiCapabilities ?? []
  });

  const [activeTab, setActiveTab] = useState<string>('overview');

  const resetWorkspaceState = () => {
    setActiveTab('overview');
  };

  return (
    <EducationWorkspaceContext.Provider value={{ contract, activeTab, setActiveTab, resetWorkspaceState }}>
      {children}
    </EducationWorkspaceContext.Provider>
  );
};

export const useEducationWorkspace = () => {
  const context = useContext(EducationWorkspaceContext);
  if (!context) {
    throw new Error('useEducationWorkspace must be used within an EducationWorkspaceProvider');
  }
  return context;
};
