import React from 'react';
import OwnerControlCenter from '../../src/components/OwnerControlCenter';
import { useAuth } from '../context/AuthContext';

export const OwnerConsoleView: React.FC<{ onNavigate?: (route: string) => void }> = ({ onNavigate }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    if (onNavigate) {
      onNavigate('/public');
    }
  };

  const currentUser = {
    email: user?.email || 'owner@jumo.eu',
    name: user?.name || 'Sovereign Administrator',
    role: user?.role || 'OWNER',
    tenantId: user?.organization || 'JUMO-MASTER-01',
    trustLevel: 'SOVEREIGN_ROOT'
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <OwnerControlCenter currentUser={currentUser} onLogout={handleLogout} onNavigate={onNavigate} />
    </div>
  );
};

export default OwnerConsoleView;
