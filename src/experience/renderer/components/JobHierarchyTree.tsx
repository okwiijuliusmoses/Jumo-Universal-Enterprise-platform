// JUMO UEOS — Authoritative Job Hierarchy Tree component
// Aligned with the canonical factory control plane. Exposes all nodes dynamically as inspectable artifacts.
// Standard: JDPM-TREE-UI-9002

import React, { useState } from 'react';
import { 
  Folder, FileCode, Layers, Server, Cpu, Database, Shield, 
  Workflow, FileText, Smartphone, Monitor, ChevronRight, ChevronDown,
  Search, CheckCircle2, AlertTriangle, Activity, Landmark, ShieldCheck,
  Award, Cloud, Terminal, Check, Info, Box
} from 'lucide-react';
import { useJobTree } from '../../shell/JobTreeProvider';
import { ManufacturedProductNode } from '../../../core/factory/explorer/ManufacturedProductExplorerEngine';
import { isArtifactTypeManufactured } from './ManufacturedProductExplorer';

export const JobHierarchyTree: React.FC = () => {
  const { jobTree, selectedNodeId, setSelectedNodeId, activeJob } = useJobTree();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  if (!activeJob || !jobTree) {
    return (
      <div className="p-8 text-center bg-white border border-slate-200 rounded-3xl shadow-xs">
        <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2 animate-pulse" />
        <p className="text-xs font-bold text-slate-800">No Active Job Context Available</p>
        <p className="text-[10px] text-slate-400 mt-1">Please select an active manufacturing job in the queue.</p>
      </div>
    );
  }

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
      case 'PRODUCT': return <Box className="w-4 h-4 text-indigo-600 shrink-0" />;
      case 'PRODUCT_IDENTITY': return <Info className="w-4 h-4 text-blue-600 shrink-0" />;
      case 'PRODUCT_BLUEPRINT': return <FileText className="w-4 h-4 text-slate-600 shrink-0" />;
      case 'TENANT_INSTITUTION': return <Landmark className="w-4 h-4 text-emerald-600 shrink-0" />;
      case 'EXPERIENCE': return <Monitor className="w-4 h-4 text-sky-600 shrink-0" />;
      case 'PORTAL': return <Layers className="w-4 h-4 text-indigo-500 shrink-0" />;
      case 'APPLICATION': return <Smartphone className="w-4 h-4 text-emerald-500 shrink-0" />;
      case 'DIRECTORATE_DEPARTMENT': return <Folder className="w-4 h-4 text-amber-600 shrink-0" />;
      case 'MODULE':
      case 'SUBMODULE': return <Layers className="w-4 h-4 text-teal-600 shrink-0" />;
      case 'COMPONENT':
      case 'FORM': return <FileCode className="w-4 h-4 text-slate-600 shrink-0" />;
      case 'SERVICE': return <Server className="w-4 h-4 text-sky-600 shrink-0" />;
      case 'API': return <Cpu className="w-4 h-4 text-purple-600 shrink-0" />;
      case 'DATA_SCHEMA':
      case 'DATABASE_OBJECT': return <Database className="w-4 h-4 text-teal-600 shrink-0" />;
      case 'WORKFLOW':
      case 'BUSINESS_RULE': return <Workflow className="w-4 h-4 text-orange-500 shrink-0" />;
      case 'AI_CAPABILITY':
      case 'AI_AGENT': return <Cpu className="w-4 h-4 text-indigo-500 shrink-0" />;
      case 'REPORT':
      case 'DASHBOARD': return <Activity className="w-4 h-4 text-blue-500 shrink-0" />;
      case 'SECURITY_CONTROL': return <Shield className="w-4 h-4 text-rose-600 shrink-0" />;
      case 'INFRASTRUCTURE':
      case 'DEPLOYMENT_UNIT': return <Cloud className="w-4 h-4 text-blue-600 shrink-0" />;
      case 'TEST': return <Terminal className="w-4 h-4 text-slate-700 shrink-0" />;
      case 'VERIFICATION_EVIDENCE': return <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />;
      case 'CERTIFICATION': return <Award className="w-4 h-4 text-amber-500 shrink-0" />;
      case 'DEPLOYMENT':
      case 'RUNTIME':
      case 'OPERATIONS': return <Activity className="w-4 h-4 text-indigo-600 shrink-0" />;
      default: return <FileText className="w-4 h-4 text-slate-400 shrink-0" />;
    }
  };

  const getStatusBadge = (status: string, nodeType: string) => {
    const isManufactured = isArtifactTypeManufactured(nodeType, activeJob.status);
    if (!isManufactured) {
      return (
        <span className="px-1.5 py-0.5 bg-slate-100 text-slate-400 border border-slate-200/60 rounded font-mono font-bold text-[8px] uppercase">
          LOCKED
        </span>
      );
    }
    switch (status) {
      case 'AVAILABLE':
      case 'MANUFACTURED':
        return (
          <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded font-mono font-bold text-[8px] uppercase">
            ACTIVE
          </span>
        );
      case 'UNDER_MANUFACTURING':
        return (
          <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded font-mono font-bold text-[8px] uppercase animate-pulse">
            MANUFACTURING
          </span>
        );
      case 'FAILED':
        return (
          <span className="px-1.5 py-0.5 bg-red-50 text-red-700 border border-red-100 rounded font-mono font-bold text-[8px] uppercase">
            FAILED
          </span>
        );
      default:
        return (
          <span className="px-1.5 py-0.5 bg-slate-50 text-slate-500 border border-slate-200 rounded font-mono font-bold text-[8px] uppercase">
            {status}
          </span>
        );
    }
  };

  const renderNode = (node: ManufacturedProductNode, depth = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes.has(node.id) || searchQuery.length > 0;
    const isSelected = selectedNodeId === node.id;
    const matchesSearch = searchQuery === '' || node.name.toLowerCase().includes(searchQuery.toLowerCase()) || node.type.toLowerCase().includes(searchQuery.toLowerCase());

    if (searchQuery !== '' && !matchesSearch && !node.children.some(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return null;
    }

    return (
      <div key={node.id} className="space-y-1">
        <div
          onClick={() => setSelectedNodeId(node.id)}
          className={`flex items-center justify-between px-3 py-2 rounded-xl transition-all cursor-pointer group text-xs ${
            isSelected 
              ? 'bg-slate-900 text-white shadow-xs font-black' 
              : 'hover:bg-slate-100 text-slate-700 font-medium'
          }`}
          style={{ paddingLeft: `${Math.max(12, depth * 16)}px` }}
        >
          <div className="flex items-center gap-2 min-w-0">
            {hasChildren ? (
              <button
                onClick={(e) => toggleExpand(node.id, e)}
                className={`p-0.5 rounded hover:bg-slate-200/50 transition-colors ${isSelected ? 'text-white' : 'text-slate-400'}`}
              >
                {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>
            ) : (
              <span className="w-4" />
            )}
            {getNodeIcon(node.type)}
            <span className="truncate">{node.name}</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 pl-2">
            {getStatusBadge(node.status, node.type)}
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="space-y-1 relative pl-2 border-l border-slate-100/80 ml-4">
            {node.children.map(child => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col bg-slate-50/50 border border-slate-200 rounded-2xl h-[580px] overflow-hidden">
      <div className="p-3 bg-white border-b border-slate-100 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] font-mono font-black uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            Active Job Artifact Tree
          </h3>
          <span className="text-[9px] font-mono font-bold text-slate-400">
            Job ID: <strong className="text-slate-700">{activeJob.id}</strong>
          </span>
        </div>
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            placeholder="Filter artifacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 text-[11px] font-medium text-slate-700 placeholder-slate-400 pl-8 pr-3 py-1.5 rounded-xl border border-slate-200/60 focus:outline-none focus:ring-1 focus:ring-slate-400 transition-all"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {renderNode(jobTree)}
      </div>
    </div>
  );
};
