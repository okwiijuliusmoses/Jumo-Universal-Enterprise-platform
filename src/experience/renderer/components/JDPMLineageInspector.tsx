import React, { useState, useEffect } from 'react';
import { 
  GitBranch, ShieldCheck, CheckCircle2, ChevronRight, Search, 
  RefreshCw, ArrowRight, ArrowLeft, Copy, ExternalLink, Box,
  Layers, Settings2, Shield, Cpu, Database, FileCode, Clock,
  Filter, Tag, Key, Sparkles, Check, AlertTriangle, Plus, ChevronDown
} from 'lucide-react';
import { 
  JDPM2608LineageEngine, 
  JDPMArtifactRecord, 
  JDPMArtifactType, 
  JDPMManufacturingLineage 
} from '../../../core/factory/lineage/JDPM2608LineageEngine';

interface JDPMLineageInspectorProps {
  initialArtifactId?: string;
  productName?: string;
  onSelectArtifact?: (artifactId: string) => void;
}

export const JDPMLineageInspector: React.FC<JDPMLineageInspectorProps> = ({
  initialArtifactId,
  productName,
  onSelectArtifact
}) => {
  const lineageEngine = JDPM2608LineageEngine.getInstance();

  const [artifacts, setArtifacts] = useState<JDPMArtifactRecord[]>([]);
  const [lineages, setLineages] = useState<JDPMManufacturingLineage[]>([]);
  const [selectedArtifactId, setSelectedArtifactId] = useState<string | null>(initialArtifactId || null);
  const [typeFilter, setTypeFilter] = useState<JDPMArtifactType | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedHash, setCopiedHash] = useState<boolean>(false);
  const [traversalPath, setTraversalPath] = useState<string[]>([]);
  
  // New Artifact Creation Modal
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [newArtifactType, setNewArtifactType] = useState<JDPMArtifactType>('MFG');
  const [newArtifactName, setNewArtifactName] = useState<string>(productName || 'ATUTUR SEED SECONDARY SCHOOL');
  const [newArtifactDomain, setNewArtifactDomain] = useState<string>('Education & Sovereign Administration');
  const [newArtifactMetadata, setNewArtifactMetadata] = useState<string>(JSON.stringify({ notes: 'Child artifact registered via Manufacturing Studio' }, null, 2));

  // Integrity Check Toast
  const [integrityStatus, setIntegrityStatus] = useState<{ verified: boolean; message: string } | null>(null);

  const loadLineageData = () => {
    const allArts = lineageEngine.getAllArtifacts();
    const allLins = lineageEngine.getAllLineages();
    setArtifacts(allArts);
    setLineages(allLins);

    if (allArts.length > 0 && !selectedArtifactId) {
      setSelectedArtifactId(allArts[0].jdpmId);
      setTraversalPath([allArts[0].jdpmId]);
    }
  };

  useEffect(() => {
    loadLineageData();
  }, []);

  useEffect(() => {
    if (initialArtifactId) {
      setSelectedArtifactId(initialArtifactId);
      setTraversalPath([initialArtifactId]);
    }
  }, [initialArtifactId]);

  const selectedArtifact = artifacts.find(a => a.jdpmId === selectedArtifactId) || artifacts[0];

  const handleSelectArtifact = (id: string) => {
    setSelectedArtifactId(id);
    if (!traversalPath.includes(id)) {
      setTraversalPath(prev => [...prev, id]);
    }
    if (onSelectArtifact) {
      onSelectArtifact(id);
    }
  };

  const handleCopyHash = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleVerifyIntegrity = () => {
    if (!selectedArtifact) return;
    const computed = lineageEngine.computeHash({
      type: selectedArtifact.artifactType,
      productName: selectedArtifact.productName,
      domain: selectedArtifact.domain,
      payload: selectedArtifact.metadata,
      parentJdpmId: selectedArtifact.parentJdpmId
    });

    const isMatch = computed === selectedArtifact.payloadHash;
    setIntegrityStatus({
      verified: isMatch,
      message: isMatch 
        ? `[VERIFIED] SHA-256 Digest matches payload hash (${selectedArtifact.payloadHash.substring(0, 16)}...). Provenance intact.`
        : `[WARNING] Computed hash mismatch (${computed} vs ${selectedArtifact.payloadHash}). Potential payload drift.`
    });

    setTimeout(() => setIntegrityStatus(null), 6000);
  };

  const handleCreateChildArtifact = () => {
    if (!selectedArtifact) return;
    try {
      const parsedMeta = JSON.parse(newArtifactMetadata);
      const childRecord = lineageEngine.registerArtifact(
        newArtifactType,
        newArtifactName,
        newArtifactDomain,
        parsedMeta,
        selectedArtifact.jdpmId,
        ['AGENT-001', 'OPERATOR-GOVERNOR']
      );

      loadLineageData();
      handleSelectArtifact(childRecord.jdpmId);
      setShowCreateModal(false);
      setIntegrityStatus({
        verified: true,
        message: `Child artifact ${childRecord.jdpmId} registered cleanly with parent ${selectedArtifact.jdpmId}.`
      });
      setTimeout(() => setIntegrityStatus(null), 5000);
    } catch (e: any) {
      alert("Invalid JSON metadata: " + e.message);
    }
  };

  // Filtered Artifacts
  const filteredArtifacts = artifacts.filter(art => {
    const matchesType = typeFilter === 'ALL' || art.artifactType === typeFilter;
    const q = searchQuery.toLowerCase();
    const matchesQuery = !searchQuery || 
      art.jdpmId.toLowerCase().includes(q) || 
      art.productName.toLowerCase().includes(q) || 
      art.payloadHash.toLowerCase().includes(q) ||
      art.status.toLowerCase().includes(q);
    return matchesType && matchesQuery;
  });

  // Canonical Type Badges Color Helper
  const getTypeColor = (type: JDPMArtifactType) => {
    switch (type) {
      case 'SPEC': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'ARCH': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'BLUE': return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case 'MFG': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'VER': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'CERT': return 'bg-rose-100 text-rose-800 border-rose-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  // Parent & Child Artifact Records
  const parentArtifact = selectedArtifact?.parentJdpmId ? artifacts.find(a => a.jdpmId === selectedArtifact.parentJdpmId) : null;
  const childArtifacts = selectedArtifact?.childJdpmIds ? artifacts.filter(a => selectedArtifact.childJdpmIds.includes(a.jdpmId)) : [];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col space-y-0">
      {/* Header Bar */}
      <div className="bg-slate-900 text-white p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-black">
            <GitBranch className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-white">
              JDPM Parent-Child Lineage & Provenance Traversal
            </h3>
            <p className="text-[11px] text-slate-400 font-medium">
              Standard: JDPM/[TYPE][YYMM]/[SEQUENCE] (SPEC → ARCH → BLUE → MFG → VER → CERT)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={loadLineageData}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Sync Engine</span>
          </button>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Register Downstream Artifact</span>
          </button>
        </div>
      </div>

      {integrityStatus && (
        <div className={`p-3.5 text-xs font-mono font-bold flex items-center gap-2 border-b ${
          integrityStatus.verified ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-rose-50 text-rose-800 border-rose-200'
        }`}>
          {integrityStatus.verified ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />}
          <span>{integrityStatus.message}</span>
        </div>
      )}

      {/* Traversal Breadcrumb Path Bar */}
      {traversalPath.length > 0 && (
        <div className="bg-slate-50 px-5 py-2.5 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs font-mono">
          <span className="text-[10px] font-black uppercase text-slate-400 shrink-0">Traversal History:</span>
          {traversalPath.map((id, index) => (
            <React.Fragment key={`${id}-${index}`}>
              {index > 0 && <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />}
              <button 
                onClick={() => handleSelectArtifact(id)}
                className={`px-2 py-0.5 rounded font-bold transition-all cursor-pointer whitespace-nowrap ${
                  id === selectedArtifactId ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {id}
              </button>
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Main 2-Column Inspector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        
        {/* LEFT COLUMN: Artifact Registry List & Filters */}
        <div className="lg:col-span-5 p-4 space-y-4 bg-slate-50/50">
          
          {/* Filters Bar */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search JDPM ID, hash, or product..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {(['ALL', 'SPEC', 'ARCH', 'BLUE', 'MFG', 'VER', 'CERT'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                    typeFilter === type 
                      ? 'bg-slate-900 text-white' 
                      : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Artifact Cards Feed */}
          <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
            {filteredArtifacts.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400 font-medium">
                No JDPM artifacts match filter criteria.
              </div>
            ) : (
              filteredArtifacts.map(art => {
                const isSelected = art.jdpmId === selectedArtifactId;
                return (
                  <button
                    key={art.jdpmId}
                    onClick={() => handleSelectArtifact(art.jdpmId)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-blue-50/80 border-blue-500 shadow-sm ring-1 ring-blue-500/30' 
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase border ${getTypeColor(art.artifactType)}`}>
                          {art.artifactType}
                        </span>
                        <span className="text-xs font-black font-mono text-slate-900">{art.jdpmId}</span>
                      </div>
                      <span className="text-[9px] font-bold uppercase text-slate-400">{art.status}</span>
                    </div>

                    <div className="text-xs font-bold text-slate-800 truncate mb-1">
                      {art.productName}
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>Hash: {art.payloadHash.substring(0, 14)}...</span>
                      <span>Children: {art.childJdpmIds.length}</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Active Artifact Parent-Child Traversal & Deep Inspection */}
        <div className="lg:col-span-7 p-6 space-y-6 bg-white">
          {selectedArtifact ? (
            <>
              {/* Selected Artifact Title & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-black uppercase border ${getTypeColor(selectedArtifact.artifactType)}`}>
                      {selectedArtifact.artifactType}
                    </span>
                    <h4 className="text-base font-black font-mono text-slate-900">{selectedArtifact.jdpmId}</h4>
                  </div>
                  <p className="text-xs font-bold text-slate-500 mt-1">
                    {selectedArtifact.productName} • Domain: {selectedArtifact.domain}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleVerifyIntegrity}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verify Hash Integrity</span>
                  </button>
                </div>
              </div>

              {/* PARENT-CHILD TRAVERSAL PANEL */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-4">
                <div className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                  <GitBranch className="w-3.5 h-3.5 text-blue-600" />
                  Lineage Graph Connectivity
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Parent Artifact Node */}
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2">
                    <div className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-1">
                      <ArrowLeft className="w-3 h-3 text-slate-400" />
                      Parent Origin Artifact
                    </div>
                    {parentArtifact ? (
                      <button 
                        onClick={() => handleSelectArtifact(parentArtifact.jdpmId)}
                        className="w-full text-left p-2.5 bg-blue-50/50 hover:bg-blue-100/60 border border-blue-200 rounded-lg transition-all cursor-pointer group"
                      >
                        <div className="flex items-center justify-between">
                          <span className={`px-1.5 py-0.5 text-[8px] font-black uppercase rounded border ${getTypeColor(parentArtifact.artifactType)}`}>
                            {parentArtifact.artifactType}
                          </span>
                          <span className="text-[10px] font-bold text-blue-600 group-hover:underline">Traverse Up →</span>
                        </div>
                        <div className="text-xs font-black font-mono text-slate-900 mt-1">{parentArtifact.jdpmId}</div>
                        <div className="text-[10px] font-medium text-slate-500 truncate">{parentArtifact.productName}</div>
                      </button>
                    ) : (
                      <div className="p-3 bg-slate-50 text-[11px] text-slate-400 font-semibold rounded-lg text-center border border-dashed border-slate-200">
                        Root Origin (No Parent)
                      </div>
                    )}
                  </div>

                  {/* Child Artifact Nodes */}
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2">
                    <div className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-1">
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                      Downstream Child Artifacts ({childArtifacts.length})
                    </div>
                    {childArtifacts.length > 0 ? (
                      <div className="space-y-1.5 max-h-[140px] overflow-y-auto">
                        {childArtifacts.map(child => (
                          <button
                            key={child.jdpmId}
                            onClick={() => handleSelectArtifact(child.jdpmId)}
                            className="w-full text-left p-2 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-lg transition-all cursor-pointer flex items-center justify-between group"
                          >
                            <div className="flex items-center gap-2">
                              <span className={`px-1.5 py-0.5 text-[8px] font-black uppercase rounded border ${getTypeColor(child.artifactType)}`}>
                                {child.artifactType}
                              </span>
                              <span className="text-xs font-black font-mono text-slate-800">{child.jdpmId}</span>
                            </div>
                            <span className="text-[10px] font-bold text-blue-600 group-hover:underline">Inspect →</span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="p-3 bg-slate-50 text-[11px] text-slate-400 font-semibold rounded-lg text-center border border-dashed border-slate-200">
                        Leaf Node (No Children Yet)
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Cryptographic Hash & Provenance Details */}
              <div className="space-y-3">
                <h5 className="text-xs font-black uppercase text-slate-800 tracking-wider">Cryptographic Provenance</h5>
                <div className="bg-slate-900 text-slate-100 p-4 rounded-xl space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-[10px] uppercase font-bold">SHA-256 Payload Hash:</span>
                    <button 
                      onClick={() => handleCopyHash(selectedArtifact.payloadHash)}
                      className="text-blue-400 hover:text-blue-300 text-[10px] uppercase font-bold flex items-center gap-1 cursor-pointer"
                    >
                      {copiedHash ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedHash ? 'Copied' : 'Copy Hash'}</span>
                    </button>
                  </div>
                  <div className="text-emerald-400 break-all font-bold">{selectedArtifact.payloadHash}</div>
                </div>
              </div>

              {/* Metadata Payload Viewer */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-black uppercase text-slate-800 tracking-wider">Artifact Metadata Payload</h5>
                  <span className="text-[10px] font-mono text-slate-400">Created: {new Date(selectedArtifact.createdAt).toLocaleString()}</span>
                </div>
                <pre className="bg-slate-950 text-slate-200 p-4 rounded-xl text-xs font-mono overflow-x-auto max-h-56 border border-slate-800">
                  {JSON.stringify(selectedArtifact.metadata, null, 2)}
                </pre>
              </div>

              {/* Assigned Cognitive Agents */}
              <div className="space-y-2">
                <h5 className="text-xs font-black uppercase text-slate-800 tracking-wider">Assigned AI Agents</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedArtifact.assignedAgents.map(agent => (
                    <span key={agent} className="px-3 py-1 bg-slate-100 text-slate-800 rounded-lg text-xs font-mono font-bold border border-slate-200 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-blue-600" />
                      {agent}
                    </span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="p-12 text-center text-slate-400 font-medium text-xs">
              Select an artifact from the lineage queue to begin inspection.
            </div>
          )}
        </div>
      </div>

      {/* CREATE CHILD ARTIFACT MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-sm font-black uppercase text-slate-900 tracking-wider">Register Downstream Child Artifact</h4>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Parent Artifact ID</label>
                <input type="text" readOnly value={selectedArtifact?.jdpmId || ''} className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-700" />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Artifact Type</label>
                <select 
                  value={newArtifactType} 
                  onChange={(e) => setNewArtifactType(e.target.value as any)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
                >
                  <option value="ARCH">ARCH — Architecture Contract</option>
                  <option value="BLUE">BLUE — Manufacturing Blueprint</option>
                  <option value="MFG">MFG — Compiled Build Package</option>
                  <option value="VER">VER — Verification Audit</option>
                  <option value="CERT">CERT — Sovereign Certification</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Product Name</label>
                <input type="text" value={newArtifactName} onChange={(e) => setNewArtifactName(e.target.value)} className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900" />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Domain</label>
                <input type="text" value={newArtifactDomain} onChange={(e) => setNewArtifactDomain(e.target.value)} className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900" />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">JSON Metadata Payload</label>
                <textarea 
                  rows={4} 
                  value={newArtifactMetadata} 
                  onChange={(e) => setNewArtifactMetadata(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 text-slate-100 font-mono border border-slate-800 rounded-xl text-xs focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button onClick={() => setShowCreateModal(false)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold cursor-pointer">Cancel</button>
              <button onClick={handleCreateChildArtifact} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-black uppercase cursor-pointer">Register Artifact</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
