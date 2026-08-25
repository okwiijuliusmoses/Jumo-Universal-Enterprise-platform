import React from 'react';
import { SovereignProductShell } from '../../SovereignProductShell';

interface SecondaryErpWebShellProps {
  onNavigate?: (route: string) => void;
}

export const SecondaryErpWebShell: React.FC<SecondaryErpWebShellProps> = ({ onNavigate }) => {
  const renderPortal = (officeId: string) => {
    // Delegate ALL portal rendering to the UniversalModuleWorkspace for registry-driven execution
    return null;
  };

  return (
    <SovereignProductShell 
      productId="JUMO-SECONDARY-ERP" 
      onNavigate={onNavigate}
      renderPortal={renderPortal}
    />
  );
};
