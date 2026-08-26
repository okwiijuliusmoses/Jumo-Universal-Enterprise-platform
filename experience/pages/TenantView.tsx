import React from 'react';
import { TenantShell } from '../tenant-shell/TenantShell';
import { Workspace } from '../workspace/Workspace';

export const TenantView: React.FC = () => {
  return (
    <TenantShell>
      <Workspace />
    </TenantShell>
  );
};
