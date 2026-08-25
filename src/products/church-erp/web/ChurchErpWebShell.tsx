import React from 'react';
import { SovereignProductShell } from '../../SovereignProductShell';

interface ChurchErpWebShellProps {
  onNavigate?: (route: string) => void;
}

export const ChurchErpWebShell: React.FC<ChurchErpWebShellProps> = ({ onNavigate }) => {
  const renderPortal = (officeId: string) => {
    // Delegate ALL portal rendering to the UniversalModuleWorkspace for registry-driven execution
    return null;
  };

  return (
    <SovereignProductShell 
      productId="JUMO-CHURCH" 
      onNavigate={onNavigate}
      renderPortal={renderPortal}
    />
  );
};
