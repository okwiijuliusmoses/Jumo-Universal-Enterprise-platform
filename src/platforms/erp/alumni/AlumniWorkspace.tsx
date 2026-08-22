/**
 * JUMO UEOS — Authoritative Alumni & Advancement ERP Workspace
 * Restores and isolates advancement domain runtimes with defensive boundary protection.
 */

import React from 'react';
import { DomainDefinition } from '../../../types';
import { AlumniWorkspaceProvider } from './AlumniWorkspaceProvider';
import { PlatformErrorBoundary } from '../../../platform-runtime/boundaries/PlatformBoundaries';
import { UniversalDomainRuntime } from '../../../components/domain-runtime/UniversalDomainRuntime';

export interface AlumniWorkspaceProps {
  domain: DomainDefinition;
}

export const AlumniWorkspace: React.FC<AlumniWorkspaceProps> = ({ domain }) => {
  return (
    <PlatformErrorBoundary platformName={domain.name || "Alumni & Advancement ERP"}>
      <AlumniWorkspaceProvider domain={domain}>
        <div className="min-h-screen bg-[#FFFFFF] text-[#1F1F1F] font-sans">
          <UniversalDomainRuntime domain={domain} />
        </div>
      </AlumniWorkspaceProvider>
    </PlatformErrorBoundary>
  );
};

export default AlumniWorkspace;
