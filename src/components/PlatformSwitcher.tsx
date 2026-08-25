import React from 'react';
import { AppLauncherPopup } from './AppLauncherPopup';

interface PlatformSwitcherProps {
  currentProductId?: string;
  onNavigate?: (path: string) => void;
}

export const PlatformSwitcher: React.FC<PlatformSwitcherProps> = ({
  currentProductId = 'fintech',
  onNavigate
}) => {
  let mappedId: 'fintech' | 'education' | 'alumni' | 'owner' = 'fintech';
  if (currentProductId.includes('edu') || currentProductId.includes('school')) {
    mappedId = 'education';
  } else if (currentProductId.includes('alumni')) {
    mappedId = 'alumni';
  } else if (currentProductId.includes('owner') || currentProductId.includes('admin')) {
    mappedId = 'owner';
  }

  return (
    <AppLauncherPopup currentProductId={mappedId} onNavigate={onNavigate} />
  );
};
