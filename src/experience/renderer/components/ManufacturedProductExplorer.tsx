// JUMO UEOS — Manufactured Product Explorer Component
// Interactive enterprise tree navigator for inspectable, navigable manufactured products.
// Standard: JDPM-NAV-UI-9001 Manufactured Product Tree Navigator

import React, { useState } from 'react';
import { 
  Folder, FileCode, Layers, Server, Cpu, Database, Shield, 
  Workflow, FileText, Smartphone, Monitor, ChevronRight, ChevronDown,
  Search, ExternalLink, CheckCircle2, Clock, AlertTriangle, Play,
  Activity, ArrowUpRight, ArrowDownRight, Tag, ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ManufacturedProductExplorerEngine, 
  ManufacturedProductNode, 
  ManufacturedArtifactDetails 
} from '../../../core/factory/explorer/ManufacturedProductExplorerEngine';
import { ProductManufacturingJob } from '../../../core/factory/registry/HubRegistryTypes';
import { STATUS_ORDER } from '../../../core/factory/ProductManufacturingOrchestrator';
import { useJobNavigation } from '../../shell/JobNavigationContext';

export const isArtifactTypeManufactured = (type: string, currentJobStatus: string) => {
  const currentIdx = STATUS_ORDER.indexOf(currentJobStatus as any);
  if (currentIdx === -1) return false;
  
  switch (type) {
    case 'PRODUCT':
    case 'PRODUCT_IDENTITY':
      return currentIdx >= STATUS_ORDER.indexOf('SPECIFICATION_NORMALIZATION');
    case 'PRODUCT_BLUEPRINT':
      return currentIdx >= STATUS_ORDER.indexOf('ARCHITECTURE_CONTRACT_GENERATION');
    case 'TENANT_INSTITUTION':
      return currentIdx >= STATUS_ORDER.indexOf('PLATFORM_INSTANCE_DEFINITION');
    case 'EXPERIENCE':
    case 'PORTAL':
      return currentIdx >= STATUS_ORDER.indexOf('AWAITING_HUMAN_ENGINEERING_APPROVAL');
    case 'DIRECTORATE_DEPARTMENT':
      return currentIdx >= STATUS_ORDER.indexOf('REQUIREMENTS_DECOMPOSITION');
    case 'MODULE':
    case 'SUBMODULE':
    case 'FEATURE':
    case 'COMPONENT':
    case 'FORM':
      return currentIdx >= STATUS_ORDER.indexOf('APPLICATION_ENGINEERING');
    case 'SERVICE':
    case 'API':
      return currentIdx >= STATUS_ORDER.indexOf('API_AND_INTEGRATION_ENGINEERING');
    case 'DATA_SCHEMA':
    case 'DATABASE_OBJECT':
      return currentIdx >= STATUS_ORDER.indexOf('SCHEMA_MANUFACTURING');
    case 'WORKFLOW':
    case 'BUSINESS_RULE':
      return currentIdx >= STATUS_ORDER.indexOf('SOURCE_AND_ARTIFACT_GENERATION');
    case 'AI_CAPABILITY':
    case 'AI_AGENT':
      return currentIdx >= STATUS_ORDER.indexOf('AI_AND_AUTOMATION_ENGINEERING');
    case 'REPORT':
    case 'DASHBOARD':
      return currentIdx >= STATUS_ORDER.indexOf('COMMERCIAL_PRODUCT_ENGINEERING');
    case 'SECURITY_CONTROL':
      return currentIdx >= STATUS_ORDER.indexOf('SECURITY_ENGINEERING');
    case 'INFRASTRUCTURE':
    case 'DEPLOYMENT_UNIT':
      return currentIdx >= STATUS_ORDER.indexOf('INFRASTRUCTURE_ENGINEERING');
    case 'TEST':
    case 'VERIFICATION_EVIDENCE':
    case 'CERTIFICATION':
      return currentIdx >= STATUS_ORDER.indexOf('APPLICATION_COMPLETENESS_VERIFICATION');
    case 'DEPLOYMENT':
    case 'RUNTIME':
    case 'OPERATIONS':
      return currentIdx >= STATUS_ORDER.indexOf('DEPLOYMENT_AND_PUBLISHING');
    default:
      return true;
  }
};

export interface ManufacturedProductExplorerProps {
  job?: ProductManufacturingJob;
  onSelectNode?: (nodeId: string) => void;
}

export const ManufacturedProductExplorer: React.FC<ManufacturedProductExplorerProps> = ({ job: jobProp }) => {
  const context = useJobNavigation();
  const activeJob = jobProp || context.selectedJob;

  if (!activeJob) {
    return (
      <div className="p-8 text-center bg-white border border-slate-200 rounded-2xl shadow-xs">
        <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2 animate-pulse" />
        <p className="text-xs font-bold text-slate-800">No active job selected.</p>
        <p className="text-[10px] text-slate-400 mt-1">Please select a manufacturing job from the Command Palette or Assembly Line.</p>
      </div>
    );
  }

  const job = activeJob;
  const engine = ManufacturedProductExplorerEngine.getInstance();
  const rootTree = engine.buildProductTree(job);

  const [selectedNodeId, setSelectedNodeId] = useState<string>(rootTree.id);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set([
    rootTree.id,
    rootTree.children[0]?.id || '',
    rootTree.children[1]?.id || '',
    rootTree.children[3]?.id || ''
  ]));
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<'DETAILS' | 'DEPENDENCIES' | 'EVIDENCE' | 'SANDBOX_RUNTIME'>('DETAILS');

  const artifactDetails = engine.getArtifactDetails(selectedNodeId, job);

  const toggleExpand = (nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = new Set(expandedNodes);
    if (next.has(nodeId)) {
      next.delete(nodeId);
    } else {
      next.add(nodeId);
    }
    setExpandedNodes(next);
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'PRODUCT': return <PackageIcon className="w-4 h-4 text-purple-600" />;
      case 'EXPERIENCE': return <Monitor className="w-4 h-4 text-blue-600" />;
      case 'PORTAL': return <Layers className="w-4 h-4 text-indigo-600" />;
      case 'DIRECTORATE':
      case 'DEPARTMENT': return <Folder className="w-4 h-4 text-amber-600" />;
      case 'APPLICATION': return <Smartphone className="w-4 h-4 text-emerald-600" />;
      case 'MODULE':
      case 'SUBMODULE': return <Layers className="w-4 h-4 text-teal-600" />;
      case 'COMPONENT':
      case 'FORM': return <FileCode className="w-4 h-4 text-slate-700" />;
      case 'SERVICE': return <Server className="w-4 h-4 text-sky-600" />;
      case 'WORKFLOW': return <Workflow className="w-4 h-4 text-orange-600" />;
      case 'AI_CAPABILITY': return <Cpu className="w-4 h-4 text-purple-600" />;
      case 'DATA_SCHEMA': return <Database className="w-4 h-4 text-emerald-700" />;
      case 'SECURITY_POLICY': return <Shield className="w-4 h-4 text-red-600" />;
      default: return <FileText className="w-4 h-4 text-slate-500" />;
    }
  };

  const getStatusBadge = (status: string, nodeType: string) => {
    const isManufactured = isArtifactTypeManufactured(nodeType, job.status);
    if (!isManufactured) {
      return <span className="px-2 py-0.5 bg-rose-50 text-rose-700 border border-rose-200 rounded font-bold uppercase text-[9px]">NOT MANUFACTURED</span>;
    }
    switch (status) {
      case 'MANUFACTURING':
      case 'AVAILABLE':
        return <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded font-bold uppercase text-[9px]">MANUFACTURED</span>;
      case 'UNDER_MANUFACTURING':
        return <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded font-bold uppercase text-[9px]">MANUFACTURING</span>;
      case 'FAILED':
        return <span className="px-2 py-0.5 bg-red-50 text-red-700 border border-red-200 rounded font-bold uppercase text-[9px]">FAILED</span>;
      default:
        return <span className="px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-200 rounded font-bold uppercase text-[9px]">{status}</span>;
    }
  };

  const renderTreeNode = (node: ManufacturedProductNode, level: number = 0) => {
    const isExpanded = expandedNodes.has(node.id);
    const isSelected = selectedNodeId === node.id;
    const hasChildren = node.children && node.children.length > 0;
    const isManufactured = isArtifactTypeManufactured(node.type, job.status);

    if (searchQuery && !node.name.toLowerCase().includes(searchQuery.toLowerCase()) && !node.code.toLowerCase().includes(searchQuery.toLowerCase())) {
      if (!node.children.some(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))) {
        return null;
      }
    }

    return (
      <div key={node.id} className="select-none">
        <div 
          onClick={() => setSelectedNodeId(node.id)}
          style={{ paddingLeft: `${level * 16 + 12}px` }}
          className={`flex items-center justify-between py-1.5 pr-3 text-xs rounded-lg cursor-pointer transition-colors ${
            isSelected 
              ? 'bg-purple-100 text-purple-900 font-bold border border-purple-300' 
              : isManufactured
                ? 'hover:bg-slate-100 text-slate-700 font-medium'
                : 'hover:bg-slate-100 text-slate-400 font-normal opacity-60'
          }`}
        >
          <div className="flex items-center space-x-2 truncate">
            {hasChildren ? (
              <button 
                onClick={(e) => toggleExpand(node.id, e)}
                className="p-0.5 hover:bg-slate-200 rounded text-slate-500"
              >
                {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            ) : (
              <span className="w-4" />
            )}
            <span className={isManufactured ? "" : "grayscale opacity-75"}>
              {getNodeIcon(node.type)}
            </span>
            <span className="truncate flex items-center gap-1.5">
              <span>{node.name}</span>
              {!isManufactured && (
                <span className="text-[7px] font-mono font-black uppercase text-rose-500 bg-rose-50 border border-rose-100 px-1 py-0.2 rounded shrink-0">
                  GAP
                </span>
              )}
            </span>
          </div>

          <div className="flex items-center space-x-2 font-mono text-[9px] text-slate-400">
            <span className="uppercase">{node.type}</span>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="space-y-0.5 mt-0.5">
            {node.children.map(child => renderTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
      {/* Top Breadcrumb & Product Header Bar */}
      <div className="bg-white border-b border-slate-200 p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-400 uppercase font-black">
            <span>Job: {job.id}</span>
            <span>/</span>
            <span>Product Structure</span>
            <span>/</span>
            <span className="text-purple-700 font-bold">{artifactDetails.name}</span>
          </div>
          <h2 className="text-base font-black uppercase text-slate-900 tracking-wider mt-0.5 flex items-center space-x-2">
            <span>{job.productName || 'Manufactured Enterprise Product'}</span>
            <span className="px-2 py-0.5 text-[9px] bg-purple-50 text-purple-700 border border-purple-200 rounded font-mono font-bold">
              {job.version || '1.0.4-BETA'}
            </span>
          </h2>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input 
              type="text" 
              placeholder="Filter product tree..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-500 w-48 font-sans"
            />
          </div>
        </div>
      </div>

      {/* Main Two-Pane Explorer View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 min-h-[500px]">
        {/* Left Tree Navigator Pane */}
        <div className="lg:col-span-5 p-3 bg-white space-y-2 overflow-y-auto max-h-[600px]">
          <div className="px-2 py-1 flex items-center justify-between text-[10px] font-mono font-black uppercase text-slate-400 border-b border-slate-100 pb-2">
            <span>Product Hierarchy Tree</span>
            <span>Navigable Artifacts</span>
          </div>
          {renderTreeNode(rootTree)}
        </div>

        {/* Right Artifact Detail Inspector Pane */}
        <div className="lg:col-span-7 bg-slate-50/50 p-5 space-y-5 overflow-y-auto max-h-[600px]">
          {/* Header & Status Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3 shadow-xs">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono font-black text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 uppercase">
                    {artifactDetails.identity.type}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{artifactDetails.identity.id}</span>
                </div>
                <h3 className="text-base font-black text-slate-900 uppercase mt-1">{artifactDetails.name}</h3>
              </div>
              {getStatusBadge(artifactDetails.status, artifactDetails.type)}
            </div>

            {isArtifactTypeManufactured(artifactDetails.type, job.status) && (
              <div className="flex items-center space-x-2 border-t border-slate-100 pt-3 font-mono text-xs font-bold">
                {(['DETAILS', 'DEPENDENCIES', 'EVIDENCE', 'SANDBOX_RUNTIME'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      selectedTab === tab 
                        ? 'bg-slate-900 text-white' 
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {tab.replace('_', ' ')}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tab Content Panels or Not Manufactured Message */}
          {!isArtifactTypeManufactured(artifactDetails.type, job.status) ? (
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-8 text-center space-y-4 shadow-xs">
              <AlertTriangle className="w-12 h-12 text-rose-500 mx-auto animate-pulse" />
              <div className="space-y-1">
                <h3 className="text-sm font-black uppercase text-rose-950 tracking-wider">NOT MANUFACTURED</h3>
                <p className="text-xs text-rose-800 max-w-md mx-auto">
                  This component/layer is not yet manufactured. The pipeline is currently at <span className="font-mono font-bold bg-rose-100 px-1 rounded">{job.status}</span>.
                </p>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="px-2.5 py-1 bg-rose-100 border border-rose-200 text-rose-700 font-mono text-[10px] font-bold rounded-md uppercase">
                  IMPLEMENTATION GAP
                </span>
              </div>
            </div>
          ) : (
            <>
              {selectedTab === 'DETAILS' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                      <div className="text-[10px] font-mono font-black uppercase text-slate-400">Assigned AI Agent</div>
                      <div className="text-xs font-bold text-slate-900 mt-1 flex items-center space-x-1.5">
                        <Cpu className="w-3.5 h-3.5 text-purple-600" />
                        <span>{artifactDetails.manufacturing.assignedAgent}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">Model: {artifactDetails.manufacturing.model}</div>
                    </div>

                    <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                      <div className="text-[10px] font-mono font-black uppercase text-slate-400">Manufacturing Phase</div>
                      <div className="text-xs font-bold text-slate-900 mt-1">
                        Phase 07 — Module Manufacturing
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">Job: {job.id}</div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                    <div className="text-[10px] font-mono font-black uppercase text-slate-400">Ownership & Domain Scope</div>
                    <div className="grid grid-cols-2 gap-2 text-xs font-sans">
                      <div><span className="text-slate-400 font-mono text-[10px]">Product:</span> <span className="font-bold text-slate-800">{artifactDetails.ownership.productName}</span></div>
                      <div><span className="text-slate-400 font-mono text-[10px]">Tenant:</span> <span className="font-bold text-slate-800">{artifactDetails.ownership.tenantId}</span></div>
                      <div><span className="text-slate-400 font-mono text-[10px]">Domain:</span> <span className="font-bold text-slate-800">{artifactDetails.ownership.domain}</span></div>
                      <div><span className="text-slate-400 font-mono text-[10px]">Security:</span> <span className="font-bold text-slate-800">{artifactDetails.governance.securityLevel}</span></div>
                    </div>
                  </div>
                </div>
              )}

              {selectedTab === 'DEPENDENCIES' && (
                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                  <div className="text-[10px] font-mono font-black uppercase text-slate-400">Upstream & Required Dependencies</div>
                  <div className="space-y-2">
                    {artifactDetails.dependencies.required.map((dep, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs font-mono">
                        <span className="font-bold text-slate-800">{dep}</span>
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-[9px] font-bold uppercase">VERIFIED</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedTab === 'EVIDENCE' && (
                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                  <div className="text-[10px] font-mono font-black uppercase text-slate-400">20-Gate Test Evidence & Cryptographic SHA-256 Digest</div>
                  <div className="p-3 bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl space-y-1">
                    <div>HASH: {artifactDetails.evidence.sha256Hash}</div>
                    <div>TESTS: {artifactDetails.evidence.testsPassed} / {artifactDetails.evidence.testsTotal} PASSED (100%)</div>
                    <div>VERIFIED AT: {artifactDetails.evidence.lastVerifiedAt}</div>
                  </div>
                </div>
              )}

              {selectedTab === 'SANDBOX_RUNTIME' && (
                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                  <div className="text-[10px] font-mono font-black uppercase text-slate-400">Sandboxed Runtime Inspection</div>
                  {artifactDetails.runtime.isDeployed ? (
                    <div className="space-y-2">
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-bold flex items-center space-x-2">
                        <Activity className="w-4 h-4 text-emerald-600" />
                        <span>Runtime Service Endpoint Active in Sovereign Enclave</span>
                      </div>
                      <div className="text-xs font-mono text-slate-600 bg-slate-100 p-2.5 rounded-lg border border-slate-200 truncate">
                        {artifactDetails.runtime.serviceEndpoint}
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 font-medium">
                      Runtime not provisioned yet for this manufactured artifact. Complete Phase 12 (Provisioning & Deployment) to activate sandboxed endpoint inspection.
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const PackageIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Folder className={className} />
);
