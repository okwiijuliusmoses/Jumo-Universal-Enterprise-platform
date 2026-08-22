import React, { useState } from 'react';
import { ShieldCheck, Lock, Key, Building2, UserCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { FaapRbacService, UserSecurityProfile, DomainContext } from './faap/FaapRbacService';

interface PortalAuthenticationGateProps {
  portalId: string;
  portalName: string;
  domainContext: DomainContext;
  requiredRoles: string[];
  onAuthenticated: (profile: UserSecurityProfile) => void;
  children: React.ReactNode;
}

export const PortalAuthenticationGate: React.FC<PortalAuthenticationGateProps> = ({
  portalId,
  portalName,
  domainContext,
  requiredRoles,
  onAuthenticated,
  children
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string>(requiredRoles[0] || 'ROLE_ACCOUNTANT');
  const [tenantId, setTenantId] = useState<string>('TENANT-DEFAULT-01');
  const [accessKey, setAccessKey] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handlePortalLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!username.trim()) {
      setErrorMsg('Please enter a valid official username or officer ID.');
      return;
    }

    const rbac = FaapRbacService.getInstance();
    const isRoleValid = rbac.isRoleAuthorizedForContext(selectedRole, domainContext, false);

    if (!isRoleValid) {
      setErrorMsg(`Authorization Failed: Role "${selectedRole}" is not authorized for portal "${portalName}" in ${domainContext}.`);
      return;
    }

    const profile: UserSecurityProfile = {
      userId: `USR-${Math.floor(100000 + Math.random() * 900000)}`,
      username: username.trim(),
      primaryRole: selectedRole,
      allowedContexts: [domainContext],
      tenantId: tenantId.trim() || 'TENANT-DEFAULT-01',
      isSuperAdmin: false
    };

    setIsAuthenticated(true);
    onAuthenticated(profile);
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-[480px] bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-12 flex flex-col items-center justify-center animate-in fade-in duration-300">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl shadow-sm p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center mx-auto shadow-sm">
            <Lock className="w-6 h-6 text-emerald-400" />
          </div>
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 text-slate-700 uppercase tracking-widest border border-slate-200">
            Portal Authentication Gate
          </span>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">{portalName}</h2>
          <p className="text-xs text-slate-500">
            Identity & Role Resolution Boundary for <span className="font-semibold text-slate-700">{domainContext}</span>
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handlePortalLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1 uppercase text-[10px]">Officer / User Name</label>
            <div className="relative">
              <UserCheck className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="e.g. bursar.official@institution.org"
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1 uppercase text-[10px]">Portal Role Authorization</label>
            <select
              value={selectedRole}
              onChange={e => setSelectedRole(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 font-medium bg-white"
            >
              {requiredRoles.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1 uppercase text-[10px]">Organization / Tenant ID</label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={tenantId}
                onChange={e => setTenantId(e.target.value)}
                placeholder="e.g. TENANT-HILLSIDE-PRIMARY-01"
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-slate-900 font-mono text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1 uppercase text-[10px]">Security Pin / Access Key</label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="password"
                value={accessKey}
                onChange={e => setAccessKey(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-slate-900 font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-xs transition cursor-pointer"
          >
            <span>Authenticate & Enter Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-mono">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            AEGIS RBAC v16.2
          </span>
          <span>Tenant Scope Enforced</span>
        </div>
      </div>
    </div>
  );
};
