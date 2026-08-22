import React from 'react';
import { JUMOEnterpriseHeader } from '../../src/components/JUMOEnterpriseHeader';
import { useAuth } from '../context/AuthContext';

export const Header: React.FC = () => {
  let authUser = null;
  try {
    const auth = useAuth();
    authUser = auth.user;
  } catch {
    // ignore outside AuthProvider
  }

  return (
    <JUMOEnterpriseHeader
      titleOverride="JUMO UEOS Digital Hybrid Platform"
      subtitleOverride="Sovereign Enterprise Operating System"
      user={authUser ? {
        name: authUser.name || 'Enterprise Administrator',
        role: authUser.role || 'Sovereign Gateway'
      } : undefined}
    />
  );
};
