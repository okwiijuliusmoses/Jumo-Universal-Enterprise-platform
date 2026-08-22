import React from 'react';
import { SovereignProductShell } from '../../SovereignProductShell';
import { 
  NurseryHeadTeacherPortal, 
  NurseryBursarPortal, 
  NurseryHealthPortal,
  PlaceholderOfficePortal 
} from './portals/NurseryOffices';
import { NurseryAdminPortal, NurseryEcdMilestonesPortal } from './portals/NurseryPortals';

interface NurseryErpWebShellProps {
  onNavigate?: (route: string) => void;
}

export const NurseryErpWebShell: React.FC<NurseryErpWebShellProps> = ({ onNavigate }) => {
  const renderPortal = (officeId: string) => {
    switch (officeId) {
      case 'OFF_NUR_HEAD':
        return <NurseryHeadTeacherPortal />;
      case 'OFF_NUR_BURSAR':
        return <NurseryBursarPortal />;
      case 'OFF_NUR_HEALTH':
        return <NurseryHealthPortal />;
      case 'OFF_NUR_REGISTRAR':
        return <NurseryAdminPortal />;
      case 'OFF_NUR_DOS':
        return <NurseryEcdMilestonesPortal />;
      case 'OFF_NUR_BOG':
        return <PlaceholderOfficePortal name="Board of Governors" />;
      case 'OFF_NUR_RECORDS':
        return <PlaceholderOfficePortal name="Records & Archive" />;
      case 'OFF_NUR_CAREGIVERS':
        return <PlaceholderOfficePortal name="Caregivers & Teachers" />;
      case 'OFF_NUR_ACCOUNTS':
        return <PlaceholderOfficePortal name="Accounts" />;
      case 'OFF_NUR_WELFARE':
        return <PlaceholderOfficePortal name="Safeguarding & Welfare" />;
      default:
        return <PlaceholderOfficePortal name={officeId} />;
    }
  };

  return (
    <SovereignProductShell 
      productId="JUMO-NURSERY-ERP" 
      onNavigate={onNavigate}
      renderPortal={renderPortal}
    />
  );
};
