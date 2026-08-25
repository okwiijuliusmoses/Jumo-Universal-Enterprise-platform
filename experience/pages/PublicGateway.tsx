import React from 'react';
import { PublicPortalView } from '../components/public/PublicPortal';

export interface PublicGatewayProps {
  onNavigate?: (route: string) => void;
}

export const PublicGateway: React.FC<PublicGatewayProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-white">
      <PublicPortalView onNavigate={onNavigate} />
    </div>
  );
};

export default PublicGateway;
