import React from 'react';
import PublicPortalSrc from '../../../src/components/PublicPortal';
import { useAuth } from '../../context/AuthContext';
import { Header } from '../Header';
import { Footer } from '../Footer';

export const PublicPortalView: React.FC<{ onNavigate?: (route: string) => void }> = ({ onNavigate }) => {
  const { login } = useAuth();

  const handleLoginSuccess = async (user: any, token?: string) => {
    try {
      await login(user.email || 'citizen@jumo.eu', 'secret');
      if (onNavigate) {
        if (user.role === 'OWNER' || user.role === 'SecOps_Administrator') {
          onNavigate('/owner');
        } else {
          onNavigate('/tenant');
        }
      }
    } catch {
      if (onNavigate) onNavigate('/tenant');
    }
  };

  return (
    <div className="bg-white min-h-screen text-slate-900 flex flex-col justify-between font-sans">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <PublicPortalSrc onLoginSuccess={handleLoginSuccess} onNavigate={onNavigate} />
      </main>
      <Footer />
    </div>
  );
};

export default PublicPortalView;
