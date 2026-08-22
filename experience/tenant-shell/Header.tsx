/**
 * JUMO UEOS Tenant Workspace Header
 * Inherits the universal authoritative JUMOEnterpriseHeader component.
 */

import React from 'react';
import { JUMOEnterpriseHeader } from '../../src/components/JUMOEnterpriseHeader';
import { useAuth } from '../context/AuthContext';

export const TenantHeader: React.FC = () => {
  let authUser = null;
  try {
    const auth = useAuth();
    authUser = auth.user;
  } catch {
    // fallback if outside AuthProvider
  }

  return (
    <JUMOEnterpriseHeader
      titleOverride="Tenant Institutional Shell"
      subtitleOverride="Sovereign Enterprise Standard"
      user={{
        name: authUser?.name || 'Institutional Enterprise Administrator',
        role: authUser?.role || 'Sovereign Tenant Gateway'
      }}
    />
  );
};

export default TenantHeader;
