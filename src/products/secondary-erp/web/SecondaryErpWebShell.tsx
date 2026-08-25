import React from 'react';
import { SovereignProductShell } from '../../SovereignProductShell';
import { 
  SecondarySenatePortal, 
  SecondaryRegistrarPortal,
  SecondaryHodPortal, 
  SecondaryBursarPortal,
  SecondaryExamsPortal,
  SecondaryLabsPortal,
  SecondaryWelfarePortal
} from './portals/SecondaryPortals';

interface SecondaryErpWebShellProps {
  onNavigate?: (route: string) => void;
}

export const SecondaryErpWebShell: React.FC<SecondaryErpWebShellProps> = ({ onNavigate }) => {
  const renderPortal = (officeId: string) => {
    switch (officeId) {
      case 'OFF_SEC_PRINCIPAL':
      case 'PORTAL_SEC_PRINCIPAL':
      case 'OFF_SEC_SENATE':
      case 'PORTAL_SEC_SENATE':
      case 'OFF_SEC_BOG':
      case 'PORTAL_SEC_BOG':
        return <SecondarySenatePortal />;

      case 'OFF_SEC_REGISTRAR':
      case 'PORTAL_SEC_REGISTRAR':
      case 'OFF_SEC_ADMISSIONS':
      case 'PORTAL_SEC_ADMISSIONS':
      case 'OFF_SEC_HR':
      case 'PORTAL_SEC_HR':
      case 'OFF_SEC_ESTATES':
      case 'PORTAL_SEC_ESTATES':
      case 'OFF_SEC_IT':
      case 'PORTAL_SEC_IT':
        return <SecondaryRegistrarPortal />;

      case 'OFF_SEC_DOS':
      case 'PORTAL_SEC_DOS':
      case 'OFF_SEC_LIBRARY':
      case 'PORTAL_SEC_LIBRARY':
      case 'OFF_SEC_ELEARNING':
      case 'PORTAL_SEC_ELEARNING':
        return <SecondaryHodPortal />;

      case 'OFF_SEC_EXAMS':
      case 'PORTAL_SEC_EXAMS':
        return <SecondaryExamsPortal />;

      case 'OFF_SEC_LABS':
      case 'PORTAL_SEC_LABS':
        return <SecondaryLabsPortal />;

      case 'OFF_SEC_BURSAR':
      case 'PORTAL_SEC_BURSAR':
      case 'OFF_SEC_PROC':
      case 'PORTAL_SEC_PROC':
      case 'OFF_SEC_STORES':
      case 'PORTAL_SEC_STORES':
        return <SecondaryBursarPortal />;

      case 'OFF_SEC_WARDEN':
      case 'PORTAL_SEC_WARDEN':
      case 'OFF_SEC_BOARDING':
      case 'PORTAL_SEC_BOARDING':
      case 'OFF_SEC_CLINIC':
      case 'PORTAL_SEC_CLINIC':
      case 'OFF_SEC_TRANSPORT':
      case 'PORTAL_SEC_TRANSPORT':
      case 'OFF_SEC_CATERING':
      case 'PORTAL_SEC_CATERING':
      case 'OFF_SEC_CLUBS':
      case 'PORTAL_SEC_CLUBS':
        return <SecondaryWelfarePortal />;

      default:
        return <SecondarySenatePortal />;
    }
  };

  return (
    <SovereignProductShell 
      productId="JUMO-SECONDARY-ERP" 
      onNavigate={onNavigate}
      renderPortal={renderPortal}
    />
  );
};
