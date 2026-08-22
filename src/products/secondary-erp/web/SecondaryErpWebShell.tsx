import React from 'react';
import { SovereignProductShell } from '../../SovereignProductShell';
import { 
  SecondaryPrincipalPortal, 
  SecondaryRegistrarPortal
} from './portals/SecondaryOffices';
import { SecondaryDosPortal, SecondaryBursarPortal } from './portals/SecondaryPortals';
import { PlaceholderOfficePortal } from '../../nursery-erp/web/portals/NurseryOffices';

interface SecondaryErpWebShellProps {
  onNavigate?: (route: string) => void;
}

export const SecondaryErpWebShell: React.FC<SecondaryErpWebShellProps> = ({ onNavigate }) => {
  const renderPortal = (officeId: string) => {
    switch (officeId) {
      case 'OFF_SEC_PRINCIPAL':
        return <SecondaryPrincipalPortal />;
      case 'OFF_SEC_REGISTRAR':
        return <SecondaryRegistrarPortal />;
      case 'OFF_SEC_DOS':
        return <SecondaryDosPortal />;
      case 'OFF_SEC_BURSAR':
        return <SecondaryBursarPortal />;
      case 'OFF_SEC_SENATE':
        return <PlaceholderOfficePortal name="Academic Senate" />;
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
