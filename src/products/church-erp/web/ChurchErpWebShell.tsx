import React from 'react';
import { SovereignProductShell } from '../../SovereignProductShell';
import { 
  ChurchSecretariatPortal,
  ChurchFinancePortal,
  ChurchPastorPortal
} from './portals/ChurchPortals';
import { ChurchPersonnelRosterPortal } from './portals/people/ChurchPersonnelRosterPortal';
import { ChurchMembershipPortal } from './portals/membership/ChurchMembershipPortal';

interface ChurchErpWebShellProps {
  onNavigate?: (route: string) => void;
}

export const ChurchErpWebShell: React.FC<ChurchErpWebShellProps> = ({ onNavigate }) => {
  const renderPortal = (officeId: string) => {
    switch (officeId) {
      case 'OFF_CH_BISHOP':
      case 'PORTAL_CH_BISHOP':
      case 'OFF_CH_SYNOD':
      case 'PORTAL_CH_SYNOD':
      case 'OFF_CH_CHANCELLOR':
      case 'PORTAL_CH_CHANCELLOR':
      case 'OFF_CH_ARCH':
      case 'PORTAL_CH_ARCH':
      case 'PORTAL_CH_SECRETARIAT':
        return <ChurchSecretariatPortal />;

      case 'OFF_CH_TREASURY':
      case 'PORTAL_CH_TREASURY':
      case 'OFF_CH_CONTRIB':
      case 'PORTAL_CH_CONTRIB':
      case 'OFF_CH_BUDGET':
      case 'PORTAL_CH_BUDGET':
      case 'OFF_CH_PROJECTS':
      case 'PORTAL_CH_PROJECTS':
      case 'OFF_CH_PAYROLL':
      case 'PORTAL_CH_PAYROLL':
      case 'PORTAL_CH_FINANCE':
      case 'PORTAL_CH_TITHES':
        return <ChurchFinancePortal />;

      case 'OFF_CH_PARISH':
      case 'PORTAL_CH_PARISH':
      case 'OFF_CH_PASTORAL':
      case 'PORTAL_CH_PASTORAL':
      case 'OFF_CH_MINISTRIES':
      case 'PORTAL_CH_MINISTRIES':
        return <ChurchPastorPortal />;

      case 'OFF_CH_MEMBERS':
      case 'PORTAL_CH_MEMBERS':
        return <ChurchMembershipPortal />;
      case 'OFF_CH_CLERGY':
      case 'PORTAL_CH_CLERGY':
      case 'OFF_CH_SACRAMENTS':
      case 'PORTAL_CH_SACRAMENTS':
      case 'OFF_CH_EVENTS':
      case 'PORTAL_CH_EVENTS':
      case 'OFF_CH_ASSETS':
      case 'PORTAL_CH_ASSETS':
      case 'OFF_CH_COMM':
      case 'PORTAL_CH_COMM':
      case 'OFF_CH_ARCHIVE':
      case 'PORTAL_CH_ARCHIVE':
      case 'PORTAL_CH_LAY_READERS':
      case 'PORTAL_CH_STAFF':
      case 'PORTAL_CH_RETIRED':
      case 'PORTAL_CH_REGISTRY':
        return <ChurchPersonnelRosterPortal />;

      default:
        return null;
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
