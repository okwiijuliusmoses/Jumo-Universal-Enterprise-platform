/**
 * JUMO UEOS — Authoritative Sovereign Domain Workspace Router
 * Routes enterprise domain launches to their isolated, sovereign workspace containers.
 * Enforces Phase 4 (Error Boundary), Phase 5 (Workspace Provider), Phase 6 (Sovereign State), and Phase 9 (Control Center Isolation).
 */

import React from 'react';
import { DomainDefinition } from '../types';
import { ChurchWorkspace } from '../platforms/erp/church';
import { AlumniWorkspace } from '../platforms/erp/alumni';
import { EducationWorkspace } from '../platforms/erp/education';
import { SaccoWorkspace } from '../platforms/erp/sacco';
import { UniversalERPWorkspace } from '../platforms/erp/universal';

interface DomainWorkspaceProps {
  domain: DomainDefinition;
  onNavigate?: (route: string) => void;
  currentRoute?: string;
}

export const DomainWorkspace: React.FC<DomainWorkspaceProps> = ({ domain, onNavigate, currentRoute }) => {
  const id = (domain.id || '').toUpperCase();
  const category = (domain.category || '').toLowerCase();
  const name = (domain.name || '').toLowerCase();

  // 1. FINANCIAL & DIGITAL PAY PLATFORM
  if (id === 'JUMO-FINPAY' || id === 'FINANCE' || id === 'PAYMENTS') {
    return <SaccoWorkspace domain={domain} onNavigate={onNavigate} currentRoute={currentRoute} />;
  }

  // 2. EDUCATION & ALUMNI ERP
  if (id === 'JUMO-EDU-ALUMNI' || id === 'EDUCATION' || id === 'ALUMNI') {
    // Both Alumni and Education workspaces are candidates
    if (name.includes('alumni') || id === 'ALUMNI') {
      return <AlumniWorkspace domain={domain} onNavigate={onNavigate} currentRoute={currentRoute} />;
    }
    return <EducationWorkspace domain={domain} onNavigate={onNavigate} currentRoute={currentRoute} />;
  }

  // 3. CHURCH & DIOCESE ERP
  if (id === 'JUMO-CHURCH' || id === 'CHURCH') {
    return <ChurchWorkspace domain={domain} onNavigate={onNavigate} currentRoute={currentRoute} />;
  }

  // 4. SOVEREIGN CONTROL CENTER
  if (id === 'JUMO-CONTROL' || id === 'CONTROL') {
    return <UniversalERPWorkspace domain={domain} onNavigate={onNavigate} currentRoute={currentRoute} />;
  }

  // Fallback to Universal Sovereign ERP Workspace
  return <UniversalERPWorkspace domain={domain} onNavigate={onNavigate} currentRoute={currentRoute} />;
};

export default DomainWorkspace;
