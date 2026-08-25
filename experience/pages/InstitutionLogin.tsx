import React from 'react';
import { LoginView } from './Login';

export interface InstitutionLoginProps {
  onNavigate: (route: string) => void;
}

export const InstitutionLogin: React.FC<InstitutionLoginProps> = ({ onNavigate }) => {
  return <LoginView onNavigate={onNavigate} />;
};

export default InstitutionLogin;
