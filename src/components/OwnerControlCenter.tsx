import React, { useState } from 'react';
import { 
  Shield, Key, Server, Activity, ArrowRight, ShieldCheck, 
  CheckCircle2, Building2, Eye, Database, FileText, Lock, Sparkles, Sliders, Users, Layers
} from 'lucide-react';
import { ownerVerificationService } from '../core/security/ownerVerificationService';

// Fallback to the same logic in OwnerControlCenterLaunchpad if needed, or simply render it.
import { OwnerControlCenterLaunchpad } from '../control-center/launchpad/OwnerControlCenterLaunchpad';

interface OwnerControlCenterProps {
  onNavigate: (route: string) => void;
  currentUser?: {
    name?: string;
    email?: string;
    role?: string;
  };
  onLogout?: () => void;
}

export const OwnerControlCenter: React.FC<OwnerControlCenterProps> = ({
  onNavigate,
  currentUser,
  onLogout
}) => {
  return (
    <OwnerControlCenterLaunchpad 
      onNavigate={onNavigate}
      currentUser={currentUser}
      onLogout={onLogout}
    />
  );
};
export default OwnerControlCenter;
