import React from 'react';
import { SovereignProductShell } from '../../SovereignProductShell';
import { DigitalPayWalletPortal } from './portals/DigitalPayPortals';
import { PRNEngine } from './modules/PRNEngine';
import { SettlementSwitch } from './modules/SettlementSwitch';

interface DigitalPayWebShellProps {
  onNavigate?: (route: string) => void;
}

export const DigitalPayWebShell: React.FC<DigitalPayWebShellProps> = ({ onNavigate }) => {
  const renderPortal = (officeId: string) => {
    switch (officeId) {
      case 'OFF_DP_WALLET':
      case 'OFF_DP_MERCHANT':
      case 'PORTAL_DP_WALLET':
      case 'PORTAL_DP_MERCHANT':
        return <DigitalPayWalletPortal />;
      case 'OFF_DP_GATEWAY':
      case 'PORTAL_DP_GATEWAY':
      case 'PORTAL_DP_PRN':
        return <PRNEngine />;
      case 'OFF_DP_TREASURY':
      case 'PORTAL_DP_TREASURY':
      case 'PORTAL_DP_SETTLEMENT':
        return <SettlementSwitch />;
      default:
        return <DigitalPayWalletPortal />;
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
