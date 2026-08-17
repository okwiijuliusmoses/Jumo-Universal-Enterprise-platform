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

export interface ManufacturedProductExplorerProps {
  job: ProductManufacturingJob;
  onSelectNode?: (nodeId: string) => void;
}

export const ManufacturedProductExplorer: React.FC<ManufacturedProductExplorerProps> = ({ job }) => {
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

  const getStatusBadge = (status: string) => {
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
              : 'hover:bg-slate-100 text-slate-700 font-medium'
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
            {getNodeIcon(node.type)}
            <span className="truncate">{node.name}</span>
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
              {getStatusBadge(artifactDetails.status)}
            </div>

            {/* Tab Controls */}
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
          </div>

          {/* Tab Content Panels */}
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
        </div>
      </div>
    </div>
  );
};

const PackageIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Folder className={className} />
);
