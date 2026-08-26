import React, { useState } from 'react';
import { SovereignProductShell } from '../SovereignProductShell';
import { WorkforceOrchestrator } from './core/agents/WorkforceOrchestrator';
import { 
  FintechExecutivePortal, 
  FintechCompliancePortal,
  FintechVoteBookPortal,
  FintechGeneralLedgerPortal,
  FintechReconciliationPortal,
  FintechAuditTrailPortal,
  FintechPaymentSwitchPortal,
  FintechTaxPortal,
  SaccoManagementPortal
} from './web/portals/FintechOffices';

interface FintechShellProps {
  onNavigate?: (route: string) => void;
  currentUser?: any;
  onLogout?: () => void;
}

export const FintechShell: React.FC<FintechShellProps> = ({ onNavigate }) => {
  const renderPortal = (officeId: string) => {
    switch (officeId) {
      case 'PORTAL_FIN_CFO':
      case 'OFF_FIN_CFO':
      case 'PORTAL_FIN_EXEC':
        return <FintechExecutivePortal />;
      
      case 'OFF_FIN_TREASURY':
      case 'PORTAL_FIN_TREASURY':
        return <FintechExecutivePortal />;

      case 'OFF_FIN_OPS':
      case 'PORTAL_FIN_OPS':
        return <FintechGeneralLedgerPortal />;

      case 'OFF_FIN_RECON':
      case 'PORTAL_FIN_RECON':
        return <FintechReconciliationPortal />;

      case 'OFF_FIN_AUDIT':
      case 'PORTAL_FIN_AUDIT':
        return <FintechAuditTrailPortal />;

      case 'OFF_FIN_COMPLIANCE':
      case 'PORTAL_FIN_COMPLIANCE':
        return <FintechCompliancePortal />;

      case 'OFF_FIN_DATA_INT':
      case 'PORTAL_FIN_DATA_INT':
      case 'OFF_FIN_PAYROLL':
      case 'PORTAL_FIN_PAYROLL':
        return <FintechVoteBookPortal />;

      case 'OFF_FIN_SWITCH':
      case 'PORTAL_FIN_SWITCH':
      case 'OFF_FIN_MOMO':
      case 'PORTAL_FIN_MOMO':
      case 'OFF_FIN_GATEWAY':
      case 'PORTAL_FIN_GATEWAY':
      case 'OFF_FIN_COLLECTIONS':
      case 'PORTAL_FIN_COLLECTIONS':
      case 'OFF_FIN_PAYOUTS':
      case 'PORTAL_FIN_PAYOUTS':
      case 'OFF_FIN_BANK_PAY':
      case 'PORTAL_FIN_BANK_PAY':
      case 'OFF_FIN_BILLS':
      case 'PORTAL_FIN_BILLS':
      case 'OFF_FIN_STABLECOIN':
      case 'PORTAL_FIN_STABLECOIN':
        return <FintechPaymentSwitchPortal />;

      case 'OFF_FIN_MERCH_SRV':
      case 'PORTAL_FIN_MERCH_SRV':
      case 'OFF_FIN_MERCH_ACQ':
      case 'PORTAL_FIN_MERCH_ACQ':
      case 'OFF_FIN_CARDS':
      case 'PORTAL_FIN_CARDS':
      case 'OFF_FIN_ATM':
      case 'PORTAL_FIN_ATM':
      case 'OFF_FIN_DIGI_WALLET':
      case 'PORTAL_FIN_DIGI_WALLET':
      case 'OFF_FIN_MULTI_CURR':
      case 'PORTAL_FIN_MULTI_CURR':
      case 'OFF_FIN_GLOBAL_ACC':
      case 'PORTAL_FIN_GLOBAL_ACC':
      case 'OFF_FIN_CROSS_BORDER':
      case 'PORTAL_FIN_CROSS_BORDER':
      case 'OFF_FIN_REMITTANCE':
      case 'PORTAL_FIN_REMITTANCE':
      case 'OFF_FIN_FX':
      case 'PORTAL_FIN_FX':
        return <FintechReconciliationPortal />;

      case 'OFF_FIN_SACCO':
      case 'PORTAL_FIN_SACCO':
      case 'OFF_FIN_MICRO':
      case 'PORTAL_FIN_MICRO':
      case 'OFF_FIN_LENDING':
      case 'PORTAL_FIN_LENDING':
      case 'OFF_FIN_AGENT':
      case 'PORTAL_FIN_AGENT':
      case 'OFF_FIN_DIGI_BANK':
      case 'PORTAL_FIN_DIGI_BANK':
      case 'OFF_FIN_SAVINGS':
      case 'PORTAL_FIN_SAVINGS':
      case 'OFF_FIN_EMBEDDED':
      case 'PORTAL_FIN_EMBEDDED':
      case 'OFF_FIN_AGRI':
      case 'PORTAL_FIN_AGRI':
        return <SaccoManagementPortal />;

      case 'OFF_FIN_CUSTODY':
      case 'PORTAL_FIN_CUSTODY':
      case 'OFF_FIN_INSURANCE':
      case 'PORTAL_FIN_INSURANCE':
      case 'OFF_FIN_TRADE':
      case 'PORTAL_FIN_TRADE':
      case 'OFF_FIN_API':
      case 'PORTAL_FIN_API':
        return <FintechAuditTrailPortal />;

      case 'PORTAL_WORKFORCE':
        return <WorkforceOrchestrator />;

      default:
        return <FintechVoteBookPortal />;
    }
  };

  return (
    <SovereignProductShell 
      productId="JUMO-FINTECH-SWITCH" 
      onNavigate={onNavigate}
      renderPortal={renderPortal}
    />
  );
};
