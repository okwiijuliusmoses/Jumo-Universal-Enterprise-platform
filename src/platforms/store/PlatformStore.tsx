/**
 * JUMO UEOS — Authoritative Platform Store & Marketplace Registry
 * Dedicated management workspace for discovering, licensing, installing, updating, 
 * and hot-mounting sovereign enterprise domain plug-ins and extensions.
 */

import React from 'react';
import { JUMOEnterprisePlatformStore } from '../../components/JUMOEnterprisePlatformStore';

export interface PlatformStoreProps {
  onNavigate?: (route: string) => void;
  [key: string]: any;
}

export const PlatformStore: React.FC<PlatformStoreProps> = (props) => {
  return <JUMOEnterprisePlatformStore onNavigate={props.onNavigate} />;
};

export default PlatformStore;
