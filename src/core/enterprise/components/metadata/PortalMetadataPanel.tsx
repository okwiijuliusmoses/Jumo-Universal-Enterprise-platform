import React from 'react';
import { Globe, Shield, Users, Lock, Key, CheckCircle, ExternalLink } from 'lucide-react';

interface PortalMetadataPanelProps {
  portal: {
    id: string;
    displayName: string;
    productId: string;
    authorizedRoles: string[];
  };
  onLaunchPortal?: (portalId: string) => void;
}

export const PortalMetadataPanel: React.FC<PortalMetadataPanelProps> = ({
  portal,
  onLaunchPortal
}) => {
  return (
    <div className="space-y-6 text-slate-200">
      {/* Header */}
      <div className="flex items-start justify-between bg-slate-900/80 p-5 rounded-xl border border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-blue-400 border border-slate-700">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white tracking-tight">{portal.displayName}</h2>
              <span className="px-2 py-0.5 text-[10px] font-mono bg-blue-950 text-blue-400 border border-blue-800 rounded">
                {portal.id}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Sovereign external / role-based gateway providing authenticated entry into designated module workspaces.
            </p>
          </div>
        </div>
        {onLaunchPortal && (
          <button
            onClick={() => onLaunchPortal(portal.id)}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-mono font-medium transition-colors flex items-center gap-1.5"
          >
            <span>Launch Gateway</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Authorized Roles & Permissions */}
      <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 space-y-3">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-400" />
          <span>Authorized Role Scopes ({portal.authorizedRoles?.length || 0})</span>
        </h3>
        <div className="flex flex-wrap gap-2 font-mono text-xs">
          {portal.authorizedRoles?.map((role, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-md text-slate-300 flex items-center gap-1.5"
            >
              <Key className="w-3 h-3 text-indigo-400" />
              <span>{role}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
