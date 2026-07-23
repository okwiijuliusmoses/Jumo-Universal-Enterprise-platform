import React, { useState, useEffect } from "react";
import { 
  Database, Globe, Server, Layers, ListChecks, 
  ChevronRight, Play, CheckCircle2, AlertCircle, FileJson, Copy, Check
} from "lucide-react";
import { SoftwareBlueprint, DatabaseTable, APIEndpoint } from "../types";

interface BlueprintViewerProps {
  blueprint: SoftwareBlueprint;
}

export default function BlueprintViewer({ blueprint }: BlueprintViewerProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "stack" | "db" | "api" | "diagram">("overview");
  const [selectedTable, setSelectedTable] = useState<string>(
    blueprint.databaseSchema?.[0]?.tableName || ""
  );
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  // Sync selected table state when blueprint changes
  useEffect(() => {
    setSelectedTable(blueprint.databaseSchema?.[0]?.tableName || "");
  }, [blueprint]);

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPath(id);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  // Helper for color styling HTTP methods
  const getMethodBadge = (method: string) => {
    const colors: Record<string, string> = {
      GET: "bg-blue-950/40 text-blue-400 border-blue-800/30",
      POST: "bg-emerald-950/40 text-emerald-400 border-emerald-800/30",
      PUT: "bg-amber-950/40 text-amber-400 border-amber-800/30",
      PATCH: "bg-indigo-950/40 text-indigo-400 border-indigo-800/30",
      DELETE: "bg-rose-950/40 text-rose-400 border-rose-800/30",
    };
    return (
      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold font-mono border ${colors[method] || "bg-slate-800 text-slate-400 border-slate-700"}`}>
        {method}
      </span>
    );
  };

  const selectedTableData = blueprint.databaseSchema?.find(
    (t) => t.tableName === selectedTable
  );

  return (
    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col min-h-[500px]">
      {/* Tabs Header */}
      <div className="flex border-b border-slate-800/80 bg-slate-950/30 overflow-x-auto scrollbar-none">
        {(["overview", "stack", "db", "api", "diagram"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-3.5 text-xs font-semibold uppercase tracking-wider transition-all border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === tab
                ? "border-emerald-500 text-emerald-400 bg-slate-900/40"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/10"
            }`}
          >
            {tab === "overview" && <Layers className="h-4 w-4" />}
            {tab === "stack" && <Layers className="h-4 w-4 text-emerald-500" />}
            {tab === "db" && <Database className="h-4 w-4 text-emerald-500" />}
            {tab === "api" && <Globe className="h-4 w-4 text-emerald-500" />}
            {tab === "diagram" && <Server className="h-4 w-4 text-emerald-500" />}
            <span className="capitalize">{tab === "db" ? "Database" : tab === "api" ? "API contract" : tab}</span>
          </button>
        ))}
      </div>

      {/* Tab Content Canvas */}
      <div className="p-6 flex-1 flex flex-col">
        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{blueprint.name}</h2>
              <p className="text-slate-400 text-sm leading-relaxed">{blueprint.description}</p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-950/30 border border-slate-800 p-4 rounded-xl">
                <div className="text-xs text-slate-500 font-mono uppercase mb-1">Database Tables</div>
                <div className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  {blueprint.databaseSchema?.length || 0} Tables
                </div>
              </div>
              <div className="bg-slate-950/30 border border-slate-800 p-4 rounded-xl">
                <div className="text-xs text-slate-500 font-mono uppercase mb-1">API Endpoints</div>
                <div className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  {blueprint.apiContract?.length || 0} Endpoints
                </div>
              </div>
              <div className="bg-slate-950/30 border border-slate-800 p-4 rounded-xl">
                <div className="text-xs text-slate-500 font-mono uppercase mb-1">Kanban Tasks</div>
                <div className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
                  <ListChecks className="h-5 w-5" />
                  {blueprint.kanbanTasks?.length || 0} Tasks
                </div>
              </div>
            </div>

            {/* Core Features */}
            <div>
              <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">Core Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {blueprint.coreFeatures?.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-slate-950/10 border border-slate-800/40 p-3 rounded-lg">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-300 leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TECH STACK TAB */}
        {activeTab === "stack" && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-2">Selected Technologies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {blueprint.techStack?.map((item, idx) => (
                <div key={idx} className="bg-slate-950/20 border border-slate-800/80 p-4 rounded-xl flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-mono bg-slate-800 text-slate-400 px-2.5 py-1 rounded-md">
                        {item.category}
                      </span>
                      <span className="text-sm font-bold text-emerald-400 font-sans">
                        {item.technology}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.reasoning}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DATABASE SCHEMA TAB */}
        {activeTab === "db" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
            {/* Table Selector List */}
            <div className="space-y-2 max-h-[350px] overflow-y-auto">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Tables / Collections</h4>
              {blueprint.databaseSchema?.map((table) => (
                <button
                  key={table.tableName}
                  onClick={() => setSelectedTable(table.tableName)}
                  className={`w-full text-left p-3 rounded-xl border transition flex items-center justify-between cursor-pointer ${
                    selectedTable === table.tableName
                      ? "bg-emerald-950/20 border-emerald-500/50 text-emerald-300 shadow-md"
                      : "bg-slate-950/10 border-slate-800/60 text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Database className="h-4 w-4 shrink-0" />
                    <span className="text-xs font-mono font-bold truncate">{table.tableName}</span>
                  </div>
                  <span className="text-[9px] font-mono uppercase bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">
                    {table.type}
                  </span>
                </button>
              ))}
            </div>

            {/* Selected Table Fields Detail */}
            <div className="md:col-span-2 bg-slate-950/25 border border-slate-800/80 rounded-xl p-5 overflow-x-auto">
              {selectedTableData ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-200 font-mono mb-1">
                      {selectedTableData.tableName}
                    </h3>
                    <p className="text-xs text-slate-400">{selectedTableData.description}</p>
                  </div>

                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-500 font-medium">
                        <th className="py-2.5 pr-2">Field</th>
                        <th className="py-2.5 px-2">Type</th>
                        <th className="py-2.5 px-2">Properties</th>
                        <th className="py-2.5 pl-2">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {selectedTableData.fields?.map((field) => (
                        <tr key={field.name} className="text-slate-300 hover:bg-slate-900/10 transition">
                          <td className="py-3 pr-2 font-mono font-semibold text-slate-200">{field.name}</td>
                          <td className="py-3 px-2 font-mono text-emerald-400/90">{field.type}</td>
                          <td className="py-3 px-2">
                            <div className="flex flex-wrap gap-1">
                              {field.primaryKey && (
                                <span className="text-[9px] bg-yellow-950/40 text-yellow-500 border border-yellow-800/30 px-1.5 py-0.5 rounded font-mono font-bold">
                                  PK
                                </span>
                              )}
                              {!field.nullable && (
                                <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono">
                                  NOT NULL
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 pl-2 text-slate-400 leading-relaxed text-[11px]">{field.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                  <Database className="h-8 w-8 mb-2 animate-pulse" />
                  <span className="text-xs">Select a table to view details</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* API CONTRACT TAB */}
        {activeTab === "api" && (
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-2">Endpoint Specifications</h3>
            <div className="space-y-3">
              {blueprint.apiContract?.map((api, idx) => (
                <div key={idx} className="bg-slate-950/20 border border-slate-800/80 rounded-xl p-4 flex flex-col gap-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/50 pb-2">
                    <div className="flex items-center gap-2.5">
                      {getMethodBadge(api.method)}
                      <span className="text-xs font-mono font-bold text-slate-200">{api.path}</span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {api.description}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {api.requestBody && api.requestBody !== "" && (
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase font-mono mb-1">Expected Payload</div>
                        <div className="relative bg-slate-950/70 border border-slate-900 rounded-lg p-2.5 font-mono text-[11px] text-slate-300 max-h-[140px] overflow-y-auto">
                          <button
                            onClick={() => handleCopyText(api.requestBody!, `req-${idx}`)}
                            className="absolute right-2 top-2 p-1.5 bg-slate-900/80 border border-slate-800 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition cursor-pointer"
                          >
                            {copiedPath === `req-${idx}` ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                          </button>
                          <pre>{api.requestBody}</pre>
                        </div>
                      </div>
                    )}
                    <div className={api.requestBody ? "col-span-1" : "col-span-2"}>
                      <div className="text-[10px] text-slate-500 uppercase font-mono mb-1">Response Shape (200 OK)</div>
                      <div className="relative bg-slate-950/70 border border-slate-900 rounded-lg p-2.5 font-mono text-[11px] text-slate-300 max-h-[140px] overflow-y-auto">
                        <button
                          onClick={() => handleCopyText(api.responseBody, `res-${idx}`)}
                          className="absolute right-2 top-2 p-1.5 bg-slate-900/80 border border-slate-800 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition cursor-pointer"
                        >
                          {copiedPath === `res-${idx}` ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                        </button>
                        <pre>{api.responseBody}</pre>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ARCHITECTURE DIAGRAM TAB */}
        {activeTab === "diagram" && (
          <div className="flex-1 flex flex-col justify-between">
            <div className="mb-3 flex justify-between items-center text-xs">
              <span className="text-slate-400">Interactive System Flow Network Topology</span>
              <div className="flex gap-4 font-mono text-[10px]">
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-400 inline-block animate-ping"></span> Client</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-500 inline-block"></span> Server</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-indigo-500 inline-block"></span> Database</span>
              </div>
            </div>

            {/* SVG Visual Canvas */}
            <div className="flex-1 bg-slate-950/60 border border-slate-800/80 rounded-xl overflow-hidden min-h-[320px] relative flex items-center justify-center p-2">
              <svg 
                viewBox="0 0 900 420" 
                className="w-full h-full max-w-4xl"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* SVG Definitions for arrows and glow */}
                <defs>
                  <marker
                    id="arrow"
                    viewBox="0 0 10 10"
                    refX="22"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                  </marker>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Draw connections/arrows */}
                {blueprint.architectureDiagram?.connections?.map((conn, idx) => {
                  const fromNode = blueprint.architectureDiagram.nodes.find(n => n.id === conn.from);
                  const toNode = blueprint.architectureDiagram.nodes.find(n => n.id === conn.to);
                  if (!fromNode || !toNode) return null;

                  // Normalize coordinate scales
                  const x1 = (fromNode.x / 1000) * 900;
                  const y1 = (fromNode.y / 700) * 420;
                  const x2 = (toNode.x / 1000) * 900;
                  const y2 = (toNode.y / 700) * 420;

                  const midX = (x1 + x2) / 2;
                  const midY = (y1 + y2) / 2;

                  return (
                    <g key={idx}>
                      {/* Connection Line */}
                      <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#334155"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />
                      {/* Interactive Colored Overlay Line with animate */}
                      <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#10b981"
                        strokeWidth="2"
                        markerEnd="url(#arrow)"
                        opacity="0.8"
                        className="animate-[dash_10s_linear_infinite]"
                        strokeDasharray="10 50"
                      />
                      {/* Connection Label badge */}
                      <g transform={`translate(${midX}, ${midY})`}>
                        <rect
                          x="-65"
                          y="-9"
                          width="130"
                          height="18"
                          rx="4"
                          fill="#090d16"
                          stroke="#1e293b"
                          strokeWidth="1"
                        />
                        <text
                          textAnchor="middle"
                          dominantBaseline="central"
                          fill="#94a3b8"
                          fontSize="9"
                          fontFamily="monospace"
                        >
                          {conn.label}
                        </text>
                      </g>
                    </g>
                  );
                })}

                {/* Draw nodes */}
                {blueprint.architectureDiagram?.nodes?.map((node, idx) => {
                  const nodeX = (node.x / 1000) * 900;
                  const nodeY = (node.y / 700) * 420;

                  // Node color mappings
                  const typeStyles: Record<string, { fill: string; stroke: string; glow: string }> = {
                    Client: { fill: "#064e3b", stroke: "#10b981", glow: "rgba(16, 185, 129, 0.2)" },
                    Server: { fill: "#1e3a8a", stroke: "#3b82f6", glow: "rgba(59, 130, 246, 0.2)" },
                    Database: { fill: "#311042", stroke: "#a855f7", glow: "rgba(168, 85, 247, 0.2)" },
                    Cache: { fill: "#7c2d12", stroke: "#f97316", glow: "rgba(249, 115, 22, 0.2)" },
                    ExternalService: { fill: "#450a0a", stroke: "#ef4444", glow: "rgba(239, 68, 68, 0.2)" }
                  };

                  const styles = typeStyles[node.type] || typeStyles.Server;

                  return (
                    <g key={idx} transform={`translate(${nodeX}, ${nodeY})`}>
                      {/* Node outer glow */}
                      <circle r="36" fill={styles.glow} filter="url(#glow)" />
                      {/* Node core circle */}
                      <circle
                        r="28"
                        fill={styles.fill}
                        stroke={styles.stroke}
                        strokeWidth="2"
                      />
                      {/* Node icon placeholder/symbol based on type */}
                      <text
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="#f8fafc"
                        fontSize="10"
                        fontWeight="bold"
                        fontFamily="sans-serif"
                        y="-4"
                      >
                        {node.type === "Client" && "💻"}
                        {node.type === "Server" && "⚙️"}
                        {node.type === "Database" && "🗄️"}
                        {node.type === "Cache" && "⚡"}
                        {node.type === "ExternalService" && "🔌"}
                      </text>
                      {/* Node type tiny tag */}
                      <text
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="#94a3b8"
                        fontSize="7"
                        fontFamily="monospace"
                        y="12"
                      >
                        {node.type.toUpperCase()}
                      </text>
                      {/* Node main label under node */}
                      <text
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="#ffffff"
                        fontSize="11"
                        fontWeight="600"
                        fontFamily="sans-serif"
                        y="46"
                      >
                        {node.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
