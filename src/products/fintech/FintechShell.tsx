import React from 'react';
import { SovereignProductShell } from '../SovereignProductShell';

interface FintechShellProps {
  onNavigate?: (route: string) => void;
  currentUser?: any;
  onLogout?: () => void;
}

export const FintechShell: React.FC<FintechShellProps> = ({ onNavigate }) => {
  const renderPortal = (officeId: string) => {
    // Delegate ALL portal rendering to the UniversalModuleWorkspace for registry-driven execution
    return null;
  };

  return (
    <SovereignProductShell 
      productId="JUMO-FINTECH-SWITCH" 
      onNavigate={onNavigate}
      renderPortal={renderPortal}
    />
  );
};
