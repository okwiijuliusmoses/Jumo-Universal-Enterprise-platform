import React from 'react';
import { SovereignProductShell } from '../../SovereignProductShell';
import { 
  SecondarySenatePortal, 
  SecondaryRegistrarPortal,
  SecondaryHodPortal, 
  SecondaryBursarPortal 
} from './portals/SecondaryPortals';
import { PlaceholderOfficePortal } from '../../nursery-erp/web/portals/NurseryOffices';

interface SecondaryErpWebShellProps {
  onNavigate?: (route: string) => void;
}

export const SecondaryErpWebShell: React.FC<SecondaryErpWebShellProps> = ({ onNavigate }) => {
  const renderPortal = (officeId: string) => {
    switch (officeId) {
      case 'OFF_SEC_PRINCIPAL':
      case 'OFF_SEC_SENATE':
        return <SecondarySenatePortal />;
      case 'OFF_SEC_REGISTRAR':
        return <SecondaryRegistrarPortal />;
      case 'OFF_SEC_DOS':
      case 'OFF_SEC_HOD':
        return <SecondaryHodPortal />;
      case 'OFF_SEC_BURSAR':
        return <SecondaryBursarPortal />;
      default:
        return <PlaceholderOfficePortal name={officeId} />;
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
