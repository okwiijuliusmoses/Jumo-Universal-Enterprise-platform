import React from 'react';
import { SovereignProductShell } from '../../SovereignProductShell';
import { 
  AlumniRegistryPortal,
  AlumniDonationPortal
} from './portals/AlumniPortals';
import { PlaceholderOfficePortal } from '../../nursery-erp/web/portals/NurseryOffices';

interface AlumniErpWebShellProps {
  onNavigate?: (route: string) => void;
}

export const AlumniErpWebShell: React.FC<AlumniErpWebShellProps> = ({ onNavigate }) => {
  const renderPortal = (officeId: string) => {
    switch (officeId) {
      case 'OFF_ALUM_REGISTRAR':
      case 'OFF_ALUM_DIR':
        return <AlumniRegistryPortal />;
      case 'OFF_ALUM_FUND':
        return <AlumniDonationPortal />;
      case 'OFF_ALUM_CHAPTERS':
        return <PlaceholderOfficePortal name="Alumni Chapters" />;
      default:
        return <PlaceholderOfficePortal name={officeId} />;
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
