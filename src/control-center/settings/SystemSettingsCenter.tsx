/**
 * JUMO UEOS — Authoritative System Settings & Governance Center
 * Dedicated management workspace for 30 comprehensive enterprise configuration sections, 
 * security rules, SSO/MFA parameters, financial clearing settings, and platform metadata.
 */

import React from 'react';
import { SettingsCenterView } from '../../../experience/pages/SettingsCenterView';

export interface SystemSettingsCenterProps {
  onNavigate?: (route: string) => void;
  [key: string]: any;
}

export const SystemSettingsCenter: React.FC<SystemSettingsCenterProps> = (props) => {
  return <SettingsCenterView {...props} />;
};

export default SystemSettingsCenter;
