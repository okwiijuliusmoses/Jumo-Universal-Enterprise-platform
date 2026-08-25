/**
 * JUMO UEOS — Authoritative Church & Religious ERP Workspace
 * Restores and isolates ecclesiastical domain runtimes with defensive boundary protection.
 */

import React from 'react';
import { DomainDefinition } from '../../../types';
import { ChurchWorkspaceProvider } from './ChurchWorkspaceProvider';
import { PlatformErrorBoundary } from '../../../platform-runtime/boundaries/PlatformBoundaries';
import { UniversalDomainRuntime } from '../../../components/domain-runtime/UniversalDomainRuntime';

export interface ChurchWorkspaceProps {
  domain: DomainDefinition;
}

export const ChurchWorkspace: React.FC<ChurchWorkspaceProps> = ({ domain }) => {
  return (
    <PlatformErrorBoundary platformName={domain.name || "Church & Religious ERP"}>
      <ChurchWorkspaceProvider domain={domain}>
        <div className="min-h-screen bg-[#FFFFFF] text-[#1F1F1F] font-sans">
          <UniversalDomainRuntime domain={domain} />
        </div>
      </ChurchWorkspaceProvider>
    </PlatformErrorBoundary>
  );
};

export default ChurchWorkspace;
