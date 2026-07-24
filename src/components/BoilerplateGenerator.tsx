import { jumoFetch } from "../core/config/api";
import React, { useState, useEffect } from "react";
import { Code2, Database, Globe, Copy, Check, Terminal, Sparkles, Cpu } from "lucide-react";
import { SoftwareBlueprint } from "../types";

interface BoilerplateGeneratorProps {
  blueprint: SoftwareBlueprint;
}

export default function BoilerplateGenerator({ blueprint }: BoilerplateGeneratorProps) {
  const [sourceType, setSourceType] = useState<"table" | "endpoint" | "component">("table");
  const [selectedIdentifier, setSelectedIdentifier] = useState("");
  const [language, setLanguage] = useState<"typescript" | "javascript" | "sql">("typescript");
  const [generatedCode, setGeneratedCode] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Set default identifier on source type change
  useEffect(() => {
    if (sourceType === "table" && blueprint.databaseSchema?.length > 0) {
      setSelectedIdentifier(blueprint.databaseSchema[0].tableName);
      setLanguage("sql");
    } else if (sourceType === "endpoint" && blueprint.apiContract?.length > 0) {
      setSelectedIdentifier(blueprint.apiContract[0].path);
      setLanguage("typescript");
    } else {
      setSelectedIdentifier(blueprint.name || "MainDashboard");
      setLanguage("typescript");
    }
  }, [sourceType, blueprint]);

  const handleGenerate = async () => {
    if (!selectedIdentifier) return;
    setIsGenerating(true);
    setError(null);
    setGeneratedCode("");

    try {
      const response = await jumoFetch("/api/blueprint/boilerplate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blueprint,
          type: sourceType,
          identifier: selectedIdentifier,
          language,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to generate boilerplate.");
      }

      setGeneratedCode(data.code || "// No code returned.");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred during boilerplate generation.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!generatedCode) return;
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden shadow-xl p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-4 mb-6">
        <div>
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Cpu className="h-4 w-4 text-emerald-400" />
            <span>AI Boilerplate Scaffolder</span>
          </h3>
          <p className="text-xs text-slate-400">Instantly generate high-quality database, backend, or frontend files based on your architecture schema.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Scaffolding Form controls */}
        <div className="space-y-5 lg:col-span-1 bg-slate-950/20 border border-slate-800/60 p-5 rounded-xl">
          {/* Target Element Selector */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              1. Choose Source Layer
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSourceType("table")}
                className={`py-2 px-3 border rounded-lg text-xs font-semibold flex flex-col items-center gap-1 transition cursor-pointer ${
                  sourceType === "table"
                    ? "bg-emerald-950/25 border-emerald-500/50 text-emerald-400"
                    : "bg-slate-950/40 border-slate-800 text-slate-400 hover:bg-slate-900/40"
                }`}
              >
                <Database className="h-3.5 w-3.5" />
                <span>DB Table</span>
              </button>
              <button
                type="button"
                onClick={() => setSourceType("endpoint")}
                className={`py-2 px-3 border rounded-lg text-xs font-semibold flex flex-col items-center gap-1 transition cursor-pointer ${
                  sourceType === "endpoint"
                    ? "bg-emerald-950/25 border-emerald-500/50 text-emerald-400"
                    : "bg-slate-950/40 border-slate-800 text-slate-400 hover:bg-slate-900/40"
                }`}
              >
                <Globe className="h-3.5 w-3.5" />
                <span>API Route</span>
              </button>
              <button
                type="button"
                onClick={() => setSourceType("component")}
                className={`py-2 px-3 border rounded-lg text-xs font-semibold flex flex-col items-center gap-1 transition cursor-pointer ${
                  sourceType === "component"
                    ? "bg-emerald-950/25 border-emerald-500/50 text-emerald-400"
                    : "bg-slate-950/40 border-slate-800 text-slate-400 hover:bg-slate-900/40"
                }`}
              >
                <Code2 className="h-3.5 w-3.5" />
                <span>Component</span>
              </button>
            </div>
          </div>

          {/* Identifier Dropdown */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              2. Select Model / Route / View
            </label>
            <select
              value={selectedIdentifier}
              onChange={(e) => setSelectedIdentifier(e.target.value)}
              className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-emerald-500/50 cursor-pointer appearance-none"
            >
              {sourceType === "table" && blueprint.databaseSchema?.map((table) => (
                <option key={table.tableName} value={table.tableName}>
                  {table.tableName} ({table.type})
                </option>
              ))}
              {sourceType === "endpoint" && blueprint.apiContract?.map((api) => (
                <option key={api.path} value={api.path}>
                  {api.method} {api.path}
                </option>
              ))}
              {sourceType === "component" && (
                <>
                  <option value="MainDashboard">MainDashboard (Main view layout)</option>
                  <option value="ItemGrid">ItemGrid (List display grid)</option>
                  <option value="InputForm">InputForm (Interactive form container)</option>
                  <option value="NavigationHeader">NavigationHeader (App top controller bar)</option>
                </>
              )}
            </select>
          </div>

          {/* Language selection */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              3. Target Syntax / Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-emerald-500/50 cursor-pointer"
            >
              <option value="typescript">TypeScript (.ts / .tsx)</option>
              <option value="javascript">JavaScript (.js)</option>
              <option value="sql">SQL Query (PostgreSQL Dialect)</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating || !selectedIdentifier}
            className="w-full bg-slate-800 border border-slate-700 text-slate-100 hover:bg-slate-700 disabled:text-slate-500 hover:border-slate-600 disabled:bg-slate-950 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition shadow-sm"
          >
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span>{isGenerating ? "Scaffolding Templates..." : "Scaffold Boilerplate"}</span>
          </button>
        </div>

        {/* Output code window */}
        <div className="lg:col-span-2 flex flex-col h-full min-h-[300px]">
          <div className="bg-slate-950 border border-slate-850 rounded-xl flex-1 flex flex-col overflow-hidden relative shadow-inner">
            {/* Header controls for copy */}
            <div className="bg-slate-900/60 border-b border-slate-850 px-4 py-2 flex justify-between items-center text-xs font-mono">
              <span className="flex items-center gap-2 text-slate-400">
                <Terminal className="h-4 w-4 text-emerald-400" />
                <span>boilerplate_output.{language === "sql" ? "sql" : "tsx"}</span>
              </span>
              {generatedCode && (
                <button
                  onClick={handleCopy}
                  className="bg-slate-800 border border-slate-700 hover:bg-slate-700/80 px-2.5 py-1.5 rounded text-[11px] text-slate-300 font-sans flex items-center gap-1.5 transition cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Template</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Code Body */}
            <div className="p-4 flex-1 font-mono text-[11px] text-slate-300 overflow-y-auto max-h-[380px] leading-relaxed relative whitespace-pre-wrap select-text">
              {isGenerating ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 text-slate-400">
                  <div className="h-10 w-10 border-2 border-slate-800 border-t-emerald-400 animate-spin rounded-full mb-3"></div>
                  <span className="text-xs font-mono text-emerald-400 animate-pulse">Gemini assembling codebase templates...</span>
                </div>
              ) : error ? (
                <div className="text-rose-400 p-4 flex gap-2.5 items-start">
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              ) : generatedCode ? (
                <pre className="text-slate-300 font-mono tracking-wide">{generatedCode}</pre>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-slate-600">
                  <Terminal className="h-8 w-8 mb-2 animate-pulse" />
                  <span className="text-xs">Setup scaffolding options on the left and click Generate</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
