/**
 * JUMO UEOS — Authoritative Education & School ERP Workspace
 * Restores and isolates academic domain runtimes with defensive boundary protection.
 */

import React from 'react';
import { DomainDefinition } from '../../../types';
import { EducationWorkspaceProvider } from './EducationWorkspaceProvider';
import { PlatformErrorBoundary } from '../../../platform-runtime/boundaries/PlatformBoundaries';
import { UniversalDomainRuntime } from '../../../components/domain-runtime/UniversalDomainRuntime';

export interface EducationWorkspaceProps {
  domain: DomainDefinition;
}

export const EducationWorkspace: React.FC<EducationWorkspaceProps> = ({ domain }) => {
  return (
    <PlatformErrorBoundary platformName={domain.name || "Education & School ERP"}>
      <EducationWorkspaceProvider domain={domain}>
        <div className="min-h-screen bg-[#FFFFFF] text-[#1F1F1F] font-sans">
          <UniversalDomainRuntime domain={domain} />
        </div>
      </EducationWorkspaceProvider>
    </PlatformErrorBoundary>
  );
};

export default EducationWorkspace;
