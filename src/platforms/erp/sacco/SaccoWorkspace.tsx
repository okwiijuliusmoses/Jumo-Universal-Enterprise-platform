/**
 * JUMO UEOS — Authoritative SACCO & Microfinance ERP Workspace
 * Restores and isolates cooperative financial domain runtimes with defensive boundary protection.
 */

import React from 'react';
import { DomainDefinition } from '../../../types';
import { SaccoWorkspaceProvider } from './SaccoWorkspaceProvider';
import { PlatformErrorBoundary } from '../../../platform-runtime/boundaries/PlatformBoundaries';
import { UniversalDomainRuntime } from '../../../components/domain-runtime/UniversalDomainRuntime';

export interface SaccoWorkspaceProps {
  domain: DomainDefinition;
}

export const SaccoWorkspace: React.FC<SaccoWorkspaceProps> = ({ domain }) => {
  return (
    <PlatformErrorBoundary platformName={domain.name || "SACCO & Microfinance ERP"}>
      <SaccoWorkspaceProvider domain={domain}>
        <div className="min-h-screen bg-[#FFFFFF] text-[#1F1F1F] font-sans">
          <UniversalDomainRuntime domain={domain} />
        </div>
      </SaccoWorkspaceProvider>
    </PlatformErrorBoundary>
  );
};

export default SaccoWorkspace;
