import React, { useState } from 'react';
import { useJobNavigation } from '../../shell/JobNavigationContext';
import { BrandingStudio } from './BrandingStudio';
import { ConfigStudio } from './ConfigStudio';
import { ProvisioningStudio } from './ProvisioningStudio';
import { DeploymentStudio } from './DeploymentStudio';
import { RuntimeOperationsStudio } from './OperationsStudio';
import { Globe, Palette, Sliders, Server, Cloud, Activity } from 'lucide-react';

export function InstitutionalizationExperienceDeploymentStudio() {
  const { selectedJob } = useJobNavigation();
  const [activeTab, setActiveTab] = useState<'branding' | 'config' | 'provisioning' | 'deployment' | 'operations'>('branding');

  // Static fallback data for DeploymentStudio
  const dummyDeploymentRecords = [
    {
      id: 'DEPL-001',
      jobId: selectedJob?.id || 'JOB-MSXBRDP8',
      productId: selectedJob?.productId || 'ATUTUR-EDU-OS',
      environment: 'SOVEREIGN_PRODUCTION',
      deployedAt: new Date().toISOString(),
      status: 'ACTIVE' as const,
      commitSha: '7c8b0a9f1e2d3c4b5a6f',
      serviceEndpoint: 'https://atutur.edu.gov.ug',
      deployedBy: 'National Hub Authority'
    }
  ];

  const dummyDeploymentSlots = [
    {
      id: 'SLOT-01',
      name: 'Primary Production Cluster',
      activeRelease: 'v1.0.4-RELEASE',
      health: 'HEALTHY' as const,
      cpu: 45,
      memory: 62,
      trafficWeight: 100
    },
    {
      id: 'SLOT-02',
      name: 'Staging Sandbox Enclave',
      activeRelease: 'v1.0.5-BETA',
      health: 'HEALTHY' as const,
      cpu: 12,
      memory: 30,
      trafficWeight: 0
    }
  ];

  return (
    <div className="space-y-6">
      {/* Master Studio Header */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider">Studio 3</span>
            <h2 className="text-xl font-black text-slate-950 tracking-tight mt-0.5">
              Institutionalization, Experience & Deployment Studio
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Sovereign cloud operations plane covering organization mapping, bespoke tenant brand styling, secure database enclaves, and live telemetry monitoring.
            </p>
          </div>
          {selectedJob && (
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2">
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse" />
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase block tracking-wider leading-none">Target Tenant</span>
                <span className="text-xs font-black text-slate-800">{selectedJob.productName || selectedJob.id}</span>
              </div>
            </div>
          )}
        </div>

        {/* Master Tab Bar */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-6 pt-6 border-t border-slate-100">
          <button
            onClick={() => setActiveTab('branding')}
            className={`flex flex-col p-3 rounded-xl border text-left transition-all ${
              activeTab === 'branding' 
                ? 'bg-slate-950 border-slate-950 text-white shadow-xs' 
                : 'bg-slate-50 hover:bg-slate-100/70 border-slate-250/50 text-slate-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Palette className={`w-4 h-4 ${activeTab === 'branding' ? 'text-pink-400' : 'text-slate-500'}`} />
              <span className="text-xs font-black">1. Identity & Branding</span>
            </div>
            <span className={`text-[9px] font-medium mt-1 ${activeTab === 'branding' ? 'text-slate-300' : 'text-slate-400'}`}>
              Customize logos, colors, typography and design density
            </span>
          </button>

          <button
            onClick={() => setActiveTab('config')}
            className={`flex flex-col p-3 rounded-xl border text-left transition-all ${
              activeTab === 'config' 
                ? 'bg-slate-950 border-slate-950 text-white shadow-xs' 
                : 'bg-slate-50 hover:bg-slate-100/70 border-slate-250/50 text-slate-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Sliders className={`w-4 h-4 ${activeTab === 'config' ? 'text-blue-400' : 'text-slate-500'}`} />
              <span className="text-xs font-black">2. Configuration</span>
            </div>
            <span className={`text-[9px] font-medium mt-1 ${activeTab === 'config' ? 'text-slate-300' : 'text-slate-400'}`}>
              Set parameter overrides, scope trees and fallbacks
            </span>
          </button>

          <button
            onClick={() => setActiveTab('provisioning')}
            className={`flex flex-col p-3 rounded-xl border text-left transition-all ${
              activeTab === 'provisioning' 
                ? 'bg-slate-950 border-slate-950 text-white shadow-xs' 
                : 'bg-slate-50 hover:bg-slate-100/70 border-slate-250/50 text-slate-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Server className={`w-4 h-4 ${activeTab === 'provisioning' ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span className="text-xs font-black">3. Provisioning</span>
            </div>
            <span className={`text-[9px] font-medium mt-1 ${activeTab === 'provisioning' ? 'text-slate-300' : 'text-slate-400'}`}>
              Establish secure database enclaves and isolation units
            </span>
          </button>

          <button
            onClick={() => setActiveTab('deployment')}
            className={`flex flex-col p-3 rounded-xl border text-left transition-all ${
              activeTab === 'deployment' 
                ? 'bg-slate-950 border-slate-950 text-white shadow-xs' 
                : 'bg-slate-50 hover:bg-slate-100/70 border-slate-250/50 text-slate-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Cloud className={`w-4 h-4 ${activeTab === 'deployment' ? 'text-purple-400' : 'text-slate-500'}`} />
              <span className="text-xs font-black">4. Cloud Deployment</span>
            </div>
            <span className={`text-[9px] font-medium mt-1 ${activeTab === 'deployment' ? 'text-slate-300' : 'text-slate-400'}`}>
              Operate active production slots, scale controls, and release pushes
            </span>
          </button>

          <button
            onClick={() => setActiveTab('operations')}
            className={`flex flex-col p-3 rounded-xl border text-left transition-all ${
              activeTab === 'operations' 
                ? 'bg-slate-950 border-slate-950 text-white shadow-xs' 
                : 'bg-slate-50 hover:bg-slate-100/70 border-slate-250/50 text-slate-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Activity className={`w-4 h-4 ${activeTab === 'operations' ? 'text-amber-400' : 'text-slate-500'}`} />
              <span className="text-xs font-black">5. Runtime Operations</span>
            </div>
            <span className={`text-[9px] font-medium mt-1 ${activeTab === 'operations' ? 'text-slate-300' : 'text-slate-400'}`}>
              Check live telemetry dashboards, monitoring logs, and hot-fixes
            </span>
          </button>
        </div>
      </div>

      {/* Main Workspace Frame */}
      <div className="min-h-[50vh]">
        {activeTab === 'branding' && (
          <BrandingStudio />
        )}

        {activeTab === 'config' && (
          <ConfigStudio />
        )}

        {activeTab === 'provisioning' && (
          <ProvisioningStudio />
        )}

        {activeTab === 'deployment' && (
          <DeploymentStudio 
            records={dummyDeploymentRecords as any} 
            slots={dummyDeploymentSlots} 
            isDeploying={false} 
            deploymentLogs={['[OPS] Connecting to sovereign enclave JUMO-NODE-01...', '[OPS] Deployed successfully.']} 
          />
        )}

        {activeTab === 'operations' && (
          <RuntimeOperationsStudio />
        )}
      </div>
    </div>
  );
}
