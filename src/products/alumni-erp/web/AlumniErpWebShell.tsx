import React from 'react';
import { SovereignProductShell } from '../../SovereignProductShell';
import { 
  AlumniRegistryPortal,
  AlumniDonationPortal,
  AlumniChaptersPortal,
  AlumniCareerEventsPortal
} from './portals/AlumniPortals';

interface AlumniErpWebShellProps {
  onNavigate?: (route: string) => void;
}

export const AlumniErpWebShell: React.FC<AlumniErpWebShellProps> = ({ onNavigate }) => {
  const renderPortal = (officeId: string) => {
    switch (officeId) {
      case 'OFF_ALUM_DIR':
      case 'PORTAL_ALUM_DIR':
      case 'OFF_ALUM_BOARD':
      case 'PORTAL_ALUM_BOARD':
      case 'OFF_ALUM_REGISTRAR':
      case 'PORTAL_ALUM_REGISTRAR':
      case 'OFF_ALUM_ENGAGE':
      case 'PORTAL_ALUM_ENGAGE':
        return <AlumniRegistryPortal />;

      case 'OFF_ALUM_CHAPTERS':
      case 'PORTAL_ALUM_CHAPTERS':
      case 'OFF_ALUM_COMM':
      case 'PORTAL_ALUM_COMM':
        return <AlumniChaptersPortal />;

      case 'OFF_ALUM_FUND':
      case 'PORTAL_ALUM_FUND':
      case 'OFF_ALUM_GIVING':
      case 'PORTAL_ALUM_GIVING':
      case 'OFF_ALUM_RECONCILE':
      case 'PORTAL_ALUM_RECONCILE':
        return <AlumniDonationPortal />;

      case 'OFF_ALUM_CAREER':
      case 'PORTAL_ALUM_CAREER':
      case 'OFF_ALUM_EVENTS':
      case 'PORTAL_ALUM_EVENTS':
      case 'OFF_ALUM_MERCH':
      case 'PORTAL_ALUM_MERCH':
        return <AlumniCareerEventsPortal />;

      default:
        return <AlumniRegistryPortal />;
    }
  };

  return (
    <SovereignProductShell 
      productId="JUMO-ALUMNI" 
      onNavigate={onNavigate}
      renderPortal={renderPortal}
    />
  );
};
