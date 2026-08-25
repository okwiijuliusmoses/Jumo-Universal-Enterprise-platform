import React from 'react';
import { SovereignProductShell } from '../../SovereignProductShell';
import { AdmissionsPortal } from './portals/admissions/AdmissionsPortal';
import { PrimaryDosPortal } from './portals/academics-primary/PrimaryDosPortal';
import { PrimaryTimetablePortal } from './portals/academics-primary/PrimaryTimetablePortal';
import { PrimaryExamsPortal, PrimaryLibraryPortal, PrimaryELearningPortal } from './portals/academics-primary/PrimaryAcademicPortals';
import { PrimaryHeadTeacherPortal, PrimarySmcPortal, PrimaryQualityPortal } from './portals/governance/PrimaryGovernancePortals';
import { PrimaryProcurementPortal, PrimaryStoresPortal } from './portals/finance/PrimaryFinanceStoresPortals';
import { 
  PrimaryRecordsPortal, 
  PrimaryHrPortal, 
  PrimaryCommunicationsPortal, 
  PrimaryHostelPortal, 
  PrimarySportsPortal 
} from './portals/operations/PrimaryOperationsWelfarePortals';
import { NurseryMilestonesPortal } from './portals/academics-ecd/NurseryMilestonesPortal';
import { BursarPortal } from './portals/finance/BursarPortal';
import { SchoolClinicPortal } from './portals/clinic/SchoolClinicPortal';
import { SafeguardingPortal } from './portals/safeguarding/SafeguardingPortal';
import { TransportPortal } from './portals/transport/TransportPortal';
import { CateringPortal } from './portals/catering/CateringPortal';

interface NurseryPrimaryErpWebShellProps {
  onNavigate?: (route: string) => void;
}

export const NurseryPrimaryErpWebShell: React.FC<NurseryPrimaryErpWebShellProps> = ({ onNavigate }) => {
  const renderPortal = (officeId: string) => {
    // Delegate ALL portal rendering to the UniversalModuleWorkspace for registry-driven execution
    // This removes the "static UI cards" defect and enables real metadata reconstruction.
    return null; 
  };

  return (
    <SovereignProductShell 
      productId="JUMO-NURSERY-PRIMARY-ERP" 
      onNavigate={onNavigate}
      renderPortal={renderPortal}
    />
  );
};
