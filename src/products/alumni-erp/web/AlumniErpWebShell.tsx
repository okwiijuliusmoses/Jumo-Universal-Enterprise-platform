import React from 'react';
import { SovereignProductShell } from '../../SovereignProductShell';

interface AlumniErpWebShellProps {
  onNavigate?: (route: string) => void;
}

export const AlumniErpWebShell: React.FC<AlumniErpWebShellProps> = ({ onNavigate }) => {
  const renderPortal = (officeId: string) => {
    // Delegate ALL portal rendering to the UniversalModuleWorkspace for registry-driven execution
    return null;
  };

  return (
    <SovereignProductShell 
      productId="JUMO-ALUMNI" 
      onNavigate={onNavigate}
      renderPortal={renderPortal}
    />
  );
};
