import React from 'react';
import { SovereignProductShell } from '../../SovereignProductShell';
import { 
  PrimaryAdminPortal
} from './portals/PrimaryPortals';
import { PlaceholderOfficePortal } from '../../nursery-erp/web/portals/NurseryOffices';

interface PrimaryErpWebShellProps {
  onNavigate?: (route: string) => void;
}

export const PrimaryErpWebShell: React.FC<PrimaryErpWebShellProps> = ({ onNavigate }) => {
  const renderPortal = (officeId: string) => {
    switch (officeId) {
      case 'OFF_PRI_HEAD':
      case 'OFF_PRI_REGISTRAR':
        return <PrimaryAdminPortal />;
      case 'OFF_PRI_BURSAR':
        return <PrimaryAdminPortal />; // Using consolidated admin for now
      case 'OFF_PRI_EXAMS':
        return <PlaceholderOfficePortal name="PLE Examinations Office" />;
      case 'OFF_PRI_DOS':
        return <PlaceholderOfficePortal name="Thematic Curriculum Office" />;
      default:
        return <PlaceholderOfficePortal name={officeId} />;
    }
  };

  return (
    <SovereignProductShell 
      productId="JUMO-PRIMARY-ERP" 
      onNavigate={onNavigate}
      renderPortal={renderPortal}
    />
  );
};
