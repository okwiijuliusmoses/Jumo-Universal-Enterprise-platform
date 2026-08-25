import React from 'react';
import { SovereignProductShell } from '../../SovereignProductShell';

interface DigitalPayWebShellProps {
  onNavigate?: (route: string) => void;
}

export const DigitalPayWebShell: React.FC<DigitalPayWebShellProps> = ({ onNavigate }) => {
  const renderPortal = (officeId: string) => {
    // Delegate ALL portal rendering to the UniversalModuleWorkspace for registry-driven execution
    return null;
  };

  return (
    <SovereignProductShell 
      productId="JUMO-FINPAY" 
      onNavigate={onNavigate}
      renderPortal={renderPortal}
    />
  );
};
