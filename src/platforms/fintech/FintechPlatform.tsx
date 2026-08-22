/**
 * JUMO UEOS — Authoritative Fintech Payment Gateway Platform
 * Dedicated management workspace for Payment Integrations, M-Pesa Switch, 
 * Bank Settlement, and Transaction Clearing.
 */

import React from 'react';
import { FintechView } from '../../../experience/pages/FintechView';

export interface FintechPlatformProps {
  onNavigate?: (route: string) => void;
  [key: string]: any;
}

export const FintechPlatform: React.FC<FintechPlatformProps> = (props) => {
  return <FintechView {...props} />;
};

export default FintechPlatform;
