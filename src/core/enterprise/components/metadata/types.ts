import React from 'react';

export interface MetadataValidationItem {
  id: string;
  name: string;
  type: 'PRODUCT' | 'MODULE' | 'OFFICE' | 'PORTAL' | 'CAPABILITY' | 'FORM' | 'WORKFLOW' | 'REPORT' | 'AI_AGENT';
  status: 'VALID' | 'WARNING' | 'ERROR';
  message: string;
  details?: string;
}

export interface RegistryHealthStats {
  totalProducts: number;
  totalModules: number;
  totalOffices: number;
  totalPortals: number;
  totalCapabilities: number;
  totalForms: number;
  totalWorkflows: number;
  totalReports: number;
  totalAIAgents: number;
  healthScore: number;
  verifiedPercentage: number;
}
