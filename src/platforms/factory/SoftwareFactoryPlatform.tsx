/**
 * JUMO UEOS — Authoritative Software Factory Platform
 * Dedicated management workspace for Low-Code Studio, No-Code Builder, 
 * API Schema Mapper, UI Generator, and Automated CI/CD Pipelines.
 */

import React from 'react';
import { SovereignFactoryView } from '../../../experience/pages/SovereignFactoryView';

export interface SoftwareFactoryPlatformProps {
  onNavigate?: (route: string) => void;
  [key: string]: any;
}

export const SoftwareFactoryPlatform: React.FC<SoftwareFactoryPlatformProps> = (props) => {
  return <SovereignFactoryView {...props} />;
};

export default SoftwareFactoryPlatform;
