import React from 'react';
import { SovereignProductShell } from '../../SovereignProductShell';
import { 
  DigitalPayWalletPortal
} from './portals/DigitalPayPortals';
import { PlaceholderOfficePortal } from '../../nursery-erp/web/portals/NurseryOffices';

interface DigitalPayWebShellProps {
  onNavigate?: (route: string) => void;
}

export const DigitalPayWebShell: React.FC<DigitalPayWebShellProps> = ({ onNavigate }) => {
  const renderPortal = (officeId: string) => {
    switch (officeId) {
      case 'OFF_DP_WALLET':
      case 'OFF_DP_MERCHANT':
        return <DigitalPayWalletPortal />;
      case 'OFF_DP_GATEWAY':
        return <PlaceholderOfficePortal name="Payment Gateway Switch" />;
      case 'OFF_DP_TREASURY':
        return <PlaceholderOfficePortal name="JUMO Master Treasury" />;
      default:
        return <PlaceholderOfficePortal name={officeId} />;
    }
  };

  return (
    <SovereignProductShell 
      productId="JUMO-FINPAY" 
      onNavigate={onNavigate}
      renderPortal={renderPortal}
    />
  );
};
