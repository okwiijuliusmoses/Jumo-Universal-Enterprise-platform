import React from 'react';
import { SovereignProductShell } from '../SovereignProductShell';
import { 
  FintechExecutivePortal, 
  FintechCompliancePortal 
} from './web/portals/FintechOffices';
import { PlaceholderOfficePortal } from '../nursery-erp/web/portals/NurseryOffices';

interface FintechShellProps {
  onNavigate?: (route: string) => void;
}

export const FintechShell: React.FC<FintechShellProps> = ({ onNavigate }) => {
  const renderPortal = (officeId: string) => {
    switch (officeId) {
      case 'OFF_FIN_EXEC':
        return <FintechExecutivePortal />;
      case 'OFF_FIN_COMPLIANCE':
        return <FintechCompliancePortal />;
      case 'OFF_FIN_TREASURY':
        return <PlaceholderOfficePortal name="Institutional Treasury" />;
      case 'OFF_FIN_OPS':
        return <PlaceholderOfficePortal name="Financial Operations" />;
      default:
        return <PlaceholderOfficePortal name={officeId} />;
    }
  };

  return (
    <SovereignProductShell 
      productId="JUMO-FINTECH" 
      onNavigate={onNavigate}
      renderPortal={renderPortal}
    />
  );
};
