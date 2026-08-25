/**
 * JUMO UEOS — Authoritative Universal ERP Workspace
 * Restores and isolates specialized domain runtimes with defensive boundary protection.
 */

import React from 'react';
import { DomainDefinition } from '../../../types';
import { UniversalERPWorkspaceProvider } from './UniversalERPWorkspaceProvider';
import { PlatformErrorBoundary } from '../../../platform-runtime/boundaries/PlatformBoundaries';
import { UniversalDomainRuntime } from '../../../components/domain-runtime/UniversalDomainRuntime';

export interface UniversalERPWorkspaceProps {
  domain: DomainDefinition;
}

export const UniversalERPWorkspace: React.FC<UniversalERPWorkspaceProps> = ({ domain }) => {
  return (
    <PlatformErrorBoundary platformName={domain.name || "Universal Enterprise ERP"}>
      <UniversalERPWorkspaceProvider domain={domain}>
        <div className="min-h-screen bg-[#FFFFFF] text-[#1F1F1F] font-sans">
          <UniversalDomainRuntime domain={domain} />
        </div>
      </UniversalERPWorkspaceProvider>
    </PlatformErrorBoundary>
  );
};

export default UniversalERPWorkspace;
