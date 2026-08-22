import React from 'react';
import { SovereignProductShell } from '../../SovereignProductShell';
import { 
  ChurchSecretariatPortal,
  ChurchFinancePortal,
  ChurchPastorPortal
} from './portals/ChurchPortals';
import { PlaceholderOfficePortal } from '../../nursery-erp/web/portals/NurseryOffices';

interface ChurchErpWebShellProps {
  onNavigate?: (route: string) => void;
}

export const ChurchErpWebShell: React.FC<ChurchErpWebShellProps> = ({ onNavigate }) => {
  const renderPortal = (officeId: string) => {
    switch (officeId) {
      case 'OFF_CH_SECRETARIAT':
        return <ChurchSecretariatPortal />;
      case 'OFF_CH_TREASURY':
      case 'OFF_CH_FINANCE':
        return <ChurchFinancePortal />;
      case 'OFF_CH_PASTOR':
      case 'OFF_CH_BISHOP':
        return <ChurchPastorPortal />;
      default:
        return <PlaceholderOfficePortal name={officeId} />;
    }
  };

  return (
    <SovereignProductShell 
      productId="JUMO-CHURCH" 
      onNavigate={onNavigate}
      renderPortal={renderPortal}
    />
  );
};
