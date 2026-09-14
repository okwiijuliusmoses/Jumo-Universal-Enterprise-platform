// ============================================================================
// PHASE 5: METADATA-DRIVEN SAAS WORKSPACE DASHBOARD
// ============================================================================

import React, { useState, useEffect, useCallback } from "react";
import { 
  Landmark, Users, DollarSign, CreditCard, Briefcase, 
  Activity, Plus, Search, RefreshCw, AlertCircle, 
  CheckCircle2, ArrowRight, Send, Smartphone, ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// 1. UNIVERSAL METADATA INTERFACES
interface MetricDefinition {
  id: string;
  label: string;
  key: string;
  dataType: "MONEY" | "NUMBER" | "PERCENTAGE" | "COUNT";
  description?: string;
}

interface TenantConfig {
  tenantId: string;
  classification: string;
  baseCurrency: string;
  terminology: {
    partyLabel: string;
    idLabel: string;
    itemLabel: string;
    metricsHeader: string;
  };
  accounts: {
    clearing: string;
    receivables: string;
    payables: string;
    wallets: string;
    revenue: string;
  };
  metrics: MetricDefinition[];
}

// 2. HELPER TO COMPUTE HMAC SIGNATURE USING BROWSER WEB CRYPTO
async function computeHmacSha256(secret: string, data: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const msgData = encoder.encode(data);
  const cryptoKey = await window.crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signatureArrayBuffer = await window.crypto.subtle.sign(
    "HMAC",
    cryptoKey,
    msgData
  );
  const hashArray = Array.from(new Uint8Array(signatureArrayBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function Dashboard() {
  const [activeTenantId, setActiveTenantId] = useState<string>("TENT-2");
  const [report, setReport] = useState<{ config: TenantConfig; values: Record<string, number> } | null>(null);
  const [parties, setParties] = useState<any[]>([]);
  const [openItems, setOpenItems] = useState<any[]>([]);
  const [ledgerAccounts, setLedgerAccounts] = useState<any[]>([]);
  const [journalEntries, setJournalEntries] = useState<any[]>([]);
  const [ledgerLines, setLedgerLines] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Webhook Simulator State
  const [selectedPartyId, setSelectedPartyId] = useState<string>("");
  const [remittanceAmount, setRemittanceAmount] = useState<string>("5000000"); // 50,000.00 UGX
  const [extRef, setExtRef] = useState<string>("REF-" + Math.floor(Math.random() * 100000));
  const [webhookStatus, setWebhookStatus] = useState<{ success: boolean; msg: string } | null>(null);

  // USSD Simulator State
  const [ussdInput, setUssdInput] = useState<string>("");
  const [ussdHistory, setUssdHistory] = useState<Array<{ type: "in" | "out"; text: string }>>([
    { type: "out", text: "Phone ready. USSD connection initialized." }
  ]);

  // Seeding Database through API or resetting seed values
  const triggerDatabaseReset = async () => {
    setIsLoading(true);
    setWebhookStatus(null);
    try {
      const res = await fetch("/api/v1/ueos/state/reset-sovereign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activeTenantId })
      });
      if (res.ok) {
        await refreshDashboardData();
      }
    } catch (err: any) {
      console.error("Failed to seed database:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch updated records over standard full-stack API endpoint
  const refreshDashboardData = useCallback(async () => {
    try {
      const res = await fetch(`/api/v1/dashboard/data?tenantId=${activeTenantId}`);
      if (res.ok) {
        const data = await res.json();
        setReport(data.report);
        setParties(data.parties || []);
        setOpenItems(data.openItems || []);
        setLedgerAccounts(data.ledgerAccounts || []);
        setJournalEntries(data.journalEntries || []);
        setLedgerLines(data.ledgerLines || []);

        if (data.parties && data.parties.length > 0 && !selectedPartyId) {
          setSelectedPartyId(data.parties[0].id);
        }
      }
    } catch (err) {
      console.error("Error refreshing dashboard stats:", err);
    } finally {
      setIsLoading(false);
    }
  }, [activeTenantId, selectedPartyId]);

  useEffect(() => {
    setIsLoading(true);
    refreshDashboardData();
    const timer = setInterval(refreshDashboardData, 4000);
    return () => clearInterval(timer);
  }, [refreshDashboardData, activeTenantId]);

  // Execute Cryptographic Webhook Remittance simulator
  const handleTriggerWebhook = async (e: React.FormEvent) => {
    e.preventDefault();
    setWebhookStatus(null);
    if (!selectedPartyId || !report) return;

    try {
      const amount = parseInt(remittanceAmount, 10);
      if (isNaN(amount) || amount <= 0) {
        setWebhookStatus({ success: false, msg: "Remittance amount must be a valid positive integer." });
        return;
      }

      const payload = {
        tenantId: activeTenantId,
        partyId: selectedPartyId,
        remittanceAmountMinor: amount,
        currency: report.config.baseCurrency,
        externalReference: extRef,
        // Accounts are now driven by authoritative config
        clearingAccountId: report.config.accounts.clearing,
        receivablesAccountId: report.config.accounts.receivables,
        walletAccountId: report.config.accounts.wallets
      };

      const rawBody = JSON.stringify(payload);
      const secretKey = "jumo_secret_key_123456";
      const timestamp = Math.floor(Date.now() / 1000).toString();

      const signature = await computeHmacSha256(secretKey, `${timestamp}.${rawBody}`);

      const response = await fetch("/api/v1/allocation/webhook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-signature": signature,
          "x-timestamp": timestamp
        },
        body: rawBody
      });

      const result = await response.json();
      if (result.success) {
        setWebhookStatus({
          success: true,
          msg: `Success! Payment processed and journaled. Ref: ${result.paymentId}`
        });
        setExtRef("REF-" + Math.floor(Math.random() * 100000));
        refreshDashboardData();
      } else {
        setWebhookStatus({ success: false, msg: `Execution Failed: ${result.error || result.message}` });
      }
    } catch (err: any) {
      setWebhookStatus({ success: false, msg: `Cryptographic Error: ${err.message}` });
    }
  };

  // Execute USSD Session command
  const handleUssdSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = ussdInput.trim();
    setUssdInput("");

    setUssdHistory(prev => [...prev, { type: "in", text: `Dialed: ${query}` }]);

    try {
      const response = await fetch("/api/v1/ussd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: "SESS-" + activeTenantId,
          phoneNumber: "+256772009483",
          networkCode: "MTN_UG",
          serviceCode: "*270#",
          text: query,
          tenantId: activeTenantId
        })
      });

      const textResult = await response.text();
      setUssdHistory(prev => [...prev, { type: "out", text: textResult }]);
    } catch (err: any) {
      setUssdHistory(prev => [...prev, { type: "out", text: `END Network Error: ${err.message}` }]);
    }
  };

  if (!report) return (
    <div className="h-screen w-full bg-slate-50 flex items-center justify-center font-bold text-slate-400">
      Loading Sovereign Workspace Metadata...
    </div>
  );

  const activeConfig = report.config;
  const computedStats = report.values;

  const themeClasses = {
    NON_COMMERCIAL_FAITH: { text: "text-indigo-600", bg: "bg-indigo-600", bgHover: "hover:bg-indigo-700", badge: "bg-indigo-50 text-indigo-700 border-indigo-100", ring: "ring-indigo-200", borderFocus: "focus:border-indigo-500" },
    NON_COMMERCIAL_EDUCATION: { text: "text-emerald-600", bg: "bg-emerald-600", bgHover: "hover:bg-emerald-700", badge: "bg-emerald-50 text-emerald-700 border-emerald-100", ring: "ring-emerald-200", borderFocus: "focus:border-emerald-500" },
    COMMERCIAL_RETAIL: { text: "text-rose-600", bg: "bg-rose-600", bgHover: "hover:bg-rose-700", badge: "bg-rose-50 text-rose-700 border-rose-100", ring: "ring-rose-200", borderFocus: "focus:border-rose-500" }
  }[activeConfig.classification as "NON_COMMERCIAL_FAITH" | "NON_COMMERCIAL_EDUCATION" | "COMMERCIAL_RETAIL"] || { text: "text-slate-600", bg: "bg-slate-600", bgHover: "hover:bg-slate-700", badge: "bg-slate-50 text-slate-700 border-slate-100", ring: "ring-slate-200", borderFocus: "focus:border-slate-500" };

  return (
    <div className="h-screen w-full bg-slate-50 flex flex-col font-sans overflow-hidden antialiased text-slate-800">
      
      {/* 1. UNIVERSAL SaaS WORKSPACE HEADER */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 ${themeClasses.badge} border rounded-xl flex items-center justify-center`}>
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-black tracking-tight text-slate-900 flex items-center gap-2">
              JUMO SOVEREIGN OPERATING SYSTEM
              <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest border rounded-full ${themeClasses.badge}`}>
                B2B Multi-Tenant
              </span>
            </h1>
            <p className="text-[11px] text-slate-400 font-medium tracking-tight">
              A highly defensive hybrid Ledger Engine & Stateless USSD routing platform.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Active Tenant Workspace:
            </span>
            <select
              value={activeTenantId}
              onChange={(e) => {
                setActiveTenantId(e.target.value);
                setIsLoading(true);
              }}
              className={`mt-1 pl-2 pr-8 py-1.5 text-xs font-bold bg-slate-50 border border-slate-200 rounded-lg outline-none transition-all cursor-pointer ${themeClasses.ring} ${themeClasses.borderFocus}`}
            >
              <option value="TENT-1">⛪ Church Parish (Faith Ward Ledger)</option>
              <option value="TENT-2">🏫 School Academy (Sovereign Primary)</option>
              <option value="TENT-3">🎓 Alumni Network (Namilyango Alumni)</option>
              <option value="TENT-4">🛒 Retail Shop (Sovereign Distributors)</option>
            </select>
          </div>

          <button
            onClick={triggerDatabaseReset}
            title="Reset & Seed Database Tables"
            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-all flex items-center justify-center"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </header>

      {/* DASHBOARD CONTENT BODY */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* MAIN VISUAL WORKSPACE PANEL */}
        <main className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 scrollbar-thin">
          
          {/* A. DYNAMIC METRICS GRID */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
            {activeConfig.metrics.map((metric: MetricDefinition) => {
              const rawValue = (computedStats as any)[metric.key] || 0;
              const displayValue = metric.dataType === "MONEY"
                ? `${activeConfig.baseCurrency} ${(rawValue / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}`
                : rawValue.toLocaleString();

              return (
                <div 
                  key={metric.id} 
                  className="bg-white border border-slate-200/80 p-5 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-all group"
                >
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                      {metric.label}
                    </span>
                    <p className="text-xl font-black text-slate-900 mt-1 tracking-tight">
                      {displayValue}
                    </p>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2 font-medium">
                    {metric.description}
                  </p>
                </div>
              );
            })}
          </section>

          {/* B. MAIN INTERACTIVE VIEWS */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            
            {/* LEFT SIDE: POLYMORPHIC PARTY DIRECTORY (DETERMINED BY JSONB MATRIX!) */}
            <section className="xl:col-span-8 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                    Polymorphic {activeConfig.terminology.partyLabel} Directory
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Unified records loaded dynamically with custom vertical-specific JSONB attributes.
                  </p>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                  Total: {parties.length}
                </span>
              </div>

              {/* TABLE AREA */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase text-[9px] tracking-wider">
                      <th className="px-4 py-3">Full Legal Name / Email</th>
                      <th className="px-4 py-3">{activeConfig.terminology.idLabel}</th>
                      <th className="px-4 py-3 text-right">Outstanding Dues</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {parties.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="text-center py-8 text-slate-400 font-bold">
                          No active party records found. Reset/Seed the workspace using the refresh button.
                        </td>
                      </tr>
                    ) : (
                      parties.map((party) => {
                        // Calculate total outstanding dues
                        const dues = openItems
                          .filter(i => i.party_id === party.id && i.status !== "PAID")
                          .reduce((sum, item) => sum + item.remaining_minor, 0);

                        return (
                          <tr key={party.id} className="hover:bg-slate-50/50 transition-all">
                            <td className="px-4 py-3">
                              <div className="font-extrabold text-slate-900">{party.name}</div>
                              <div className="text-[10px] text-slate-400 font-medium">{party.email || "+256 772 000000"}</div>
                            </td>
                            <td className="px-4 py-3 font-mono font-bold text-slate-500">
                              {party.id}
                            </td>
                            <td className="px-4 py-3 text-right font-bold text-[11px] font-mono text-slate-900">
                              {dues > 0 ? (
                                <span className="text-rose-600">
                                  {activeConfig.baseCurrency} {(dues / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </span>
                              ) : (
                                <span className="text-emerald-600">Paid/None</span>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {/* RIGHT SIDE: CHART OF ACCOUNTS & TRIAL BALANCE */}
            <section className="xl:col-span-4 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-200 bg-slate-50/50">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                  QuickBooks-Style Chart of Accounts
                </h3>
                <p className="text-[11px] text-slate-400 font-medium">
                  Authoritative double-entry ledger accounts with atomic real-time balances.
                </p>
              </div>

              <div className="overflow-y-auto max-h-[350px]">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase text-[9px] tracking-wider">
                      <th className="px-4 py-3">Code / Name</th>
                      <th className="px-4 py-3">Type</th>
                      <th className="px-4 py-3 text-right">Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {ledgerAccounts.map((account) => (
                      <tr key={account.id} className="hover:bg-slate-50/50 transition-all">
                        <td className="px-4 py-2.5">
                          <div className="font-mono font-black text-slate-800">{account.code}</div>
                          <div className="text-[10px] text-slate-400 font-semibold">{account.name}</div>
                        </td>
                        <td className="px-4 py-2.5">
                          <span className={`px-1.5 py-0.5 text-[8px] font-extrabold uppercase rounded tracking-widest border ${
                            account.type === "ASSET" ? "bg-blue-50 text-blue-700 border-blue-100" :
                            account.type === "LIABILITY" ? "bg-amber-50 text-amber-700 border-amber-100" :
                            account.type === "EQUITY" ? "bg-purple-50 text-purple-700 border-purple-100" :
                            account.type === "REVENUE" ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                            "bg-rose-50 text-rose-700 border-rose-100"
                          }`}>
                            {account.type}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-right font-mono font-bold text-slate-900">
                          UGX ${(account.balance_minor / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* C. FINANCIAL REPORTING AND JOURNAL ENTRY SUB-PANEL */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            
            {/* DEBT TRACKING OPEN ITEMS */}
            <section className="xl:col-span-6 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-200 bg-slate-50/50">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                  Open Receivables Ledger ({activeConfig.terminology.itemLabel}s)
                </h3>
                <p className="text-[11px] text-slate-400 font-medium">
                  Detailed status of issued fee statements, tithe pledges, and retail bills.
                </p>
              </div>

              <div className="overflow-y-auto max-h-[300px]">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase text-[9px] tracking-wider">
                      <th className="px-4 py-3">Party Reference</th>
                      <th className="px-4 py-3">Due Date</th>
                      <th className="px-4 py-3">Allocation Progress</th>
                      <th className="px-4 py-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                    {openItems.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="text-center py-6 text-slate-400">
                          No open items recorded.
                        </td>
                      </tr>
                    ) : (
                      openItems.map((item) => {
                        const party = parties.find(p => p.id === item.party_id) || { name: item.party_id };
                        const percent = item.amount_minor > 0 
                          ? Math.round((item.allocated_amount_minor / item.amount_minor) * 100) 
                          : 0;

                        return (
                          <tr key={item.id} className="hover:bg-slate-50/50 transition-all">
                            <td className="px-4 py-3">
                              <div className="font-extrabold text-slate-900">{party.name}</div>
                              <div className="text-[10px] text-slate-400 font-mono font-bold">{item.id} • {item.type}</div>
                            </td>
                            <td className="px-4 py-3 text-slate-500 font-medium">
                              {item.due_date}
                            </td>
                            <td className="px-4 py-3">
                              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
                                <div 
                                  className={`h-full ${themeClasses.bg} transition-all duration-500`}
                                  style={{ width: `${percent}%` }}
                                />
                              </div>
                              <div className="text-[9px] text-slate-400 mt-1 font-extrabold font-mono">
                                UGX ${(item.allocated_amount_minor / 100).toFixed(2)} / UGX ${(item.amount_minor / 100).toFixed(2)} ({percent}%)
                              </div>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <span className={`px-2 py-0.5 text-[8px] font-black uppercase tracking-wider rounded-full border ${
                                item.status === "PAID" ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                                item.status === "PARTIALLY_PAID" ? "bg-amber-50 text-amber-700 border-amber-100" :
                                "bg-rose-50 text-rose-700 border-rose-100"
                              }`}>
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {/* DOUBLE-ENTRY JOURNAL LOGS */}
            <section className="xl:col-span-6 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                    Real-time Double-Entry General Journal
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Strict audit log matching balanced debits and credits from webhook postings.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-600 font-extrabold text-[10px] uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  Zero-Parity Active
                </div>
              </div>

              <div className="overflow-y-auto max-h-[300px] p-4 flex flex-col gap-3">
                {journalEntries.length === 0 ? (
                  <div className="text-center py-10 text-slate-400 font-bold">
                    No general journal headers posted yet. Trigger a webhook callback to register accounts ledger postings.
                  </div>
                ) : (
                  journalEntries.map((journal) => {
                    const lines = ledgerLines.filter(l => l.journal_entry_id === journal.id);
                    const totalDebit = lines.reduce((s, l) => s + l.debit_minor, 0);

                    return (
                      <div key={journal.id} className="border border-slate-200 rounded-lg overflow-hidden text-xs">
                        {/* Header info */}
                        <div className="bg-slate-50 px-3 py-2 border-b border-slate-200 flex items-center justify-between font-mono font-bold text-[10px] text-slate-600">
                          <div>
                            <span className="text-slate-400 uppercase mr-1">REF:</span>
                            <span className="text-slate-800">{journal.reference}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 uppercase mr-1">ID:</span>
                            <span className="text-slate-800">{journal.id.slice(0, 14)}...</span>
                          </div>
                          <div className="text-emerald-600">
                            Balanced (UGX {(totalDebit / 100).toLocaleString()})
                          </div>
                        </div>

                        {/* Description */}
                        <div className="p-2.5 text-slate-500 italic bg-white border-b border-slate-100 font-medium text-[11px]">
                          {journal.description}
                        </div>

                        {/* Lines */}
                        <div className="divide-y divide-slate-100 bg-slate-50/20">
                          {lines.map((line) => {
                            const account = ledgerAccounts.find(a => a.id === line.ledger_account_id) || { code: line.ledger_account_id, name: "Ledger Account" };
                            return (
                              <div key={line.id} className="px-3 py-2 flex items-center justify-between font-mono font-semibold">
                                <div className="flex flex-col">
                                  <span className="text-slate-900 font-black">{account.code}</span>
                                  <span className="text-[9px] text-slate-400 font-sans font-extrabold">{account.name}</span>
                                </div>
                                <div className="flex gap-4">
                                  <div className="w-24 text-right">
                                    {line.debit_minor > 0 ? (
                                      <span className="text-blue-600 font-bold">
                                        DR {(line.debit_minor / 100).toFixed(2)}
                                      </span>
                                    ) : <span className="text-slate-300">-</span>}
                                  </div>
                                  <div className="w-24 text-right">
                                    {line.credit_minor > 0 ? (
                                      <span className="text-emerald-600 font-bold">
                                        CR {(line.credit_minor / 100).toFixed(2)}
                                      </span>
                                    ) : <span className="text-slate-300">-</span>}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </section>
          </div>
        </main>

        {/* SIMULATOR SUITE - RIGHT BAR */}
        <aside className="w-[360px] border-l border-slate-200 bg-white flex flex-col overflow-hidden shrink-0">
          
          {/* HEADER */}
          <div className="p-4 border-b border-slate-200 bg-slate-50/50">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">
              Sovereign Simulation Suite
            </h2>
            <p className="text-[11px] text-slate-400 font-medium">
              Interact with payment aggregators and cellular telecom networks in real-time.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6 scrollbar-thin">
            
            {/* PANEL 1: CRYPTOGRAPHIC WEBHOOK REMITTANCE INGRESS */}
            <section className="bg-slate-50/50 border border-slate-200 rounded-lg p-4 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-slate-900">
                <CreditCard className={`w-4 h-4 ${themeClasses.text}`} />
                <h3 className="text-xs font-black uppercase tracking-wider">
                  SchoolPay / Momo Webhook Trigger
                </h3>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                Simulates real-time telecom callback processing with cryptographic timing-safe HMAC checks.
              </p>

              <form onSubmit={handleTriggerWebhook} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    Select {activeConfig.terminology.partyLabel} Subject
                  </label>
                  <select
                    value={selectedPartyId}
                    onChange={(e) => setSelectedPartyId(e.target.value)}
                    className="w-full text-xs font-semibold px-2 py-1.5 bg-white border border-slate-200 rounded outline-none cursor-pointer"
                  >
                    {parties.map(p => (
                      <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    Remittance Amount (Integer Minor Units)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={remittanceAmount}
                      onChange={(e) => setRemittanceAmount(e.target.value)}
                      placeholder="e.g. 5000000"
                      className="w-full text-xs font-mono font-bold pl-3 pr-16 py-1.5 bg-white border border-slate-200 rounded outline-none"
                    />
                    <span className="absolute right-2 top-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-1.5 py-0.5 rounded border">
                      shs/cents
                    </span>
                  </div>
                  <span className="text-[9px] text-slate-400 italic">
                    Equals UGX {(parseInt(remittanceAmount, 10) / 100 || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    External Network reference
                  </label>
                  <input
                    type="text"
                    value={extRef}
                    onChange={(e) => setExtRef(e.target.value)}
                    className="w-full text-xs font-mono font-bold px-3 py-1.5 bg-white border border-slate-200 rounded outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full py-2 text-xs font-black uppercase tracking-widest text-white rounded transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-slate-950/10 ${themeClasses.bg} ${themeClasses.bgHover}`}
                >
                  <Send className="w-3.5 h-3.5" />
                  Emit Webhook Callback
                </button>
              </form>

              {webhookStatus && (
                <div className={`mt-2 p-3 border rounded text-[11px] leading-tight flex items-start gap-2 ${
                  webhookStatus.success 
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200" 
                    : "bg-rose-50 text-rose-800 border-rose-200"
                }`}>
                  {webhookStatus.success ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <span className="font-semibold break-all">{webhookStatus.msg}</span>
                </div>
              )}
            </section>

            {/* PANEL 2: STATELESS TELECOM CELLULAR USSD EMULATOR */}
            <section className="bg-slate-900 border border-slate-950 rounded-2xl p-4 flex flex-col gap-3 shadow-2xl relative">
              <div className="absolute top-3 right-3 flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
              </div>

              <div className="flex items-center gap-2 text-white">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-100">
                  Cellular USSD Edge Emulator
                </h3>
              </div>

              {/* PHONE SCREEN SCREEN */}
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 h-[180px] flex flex-col justify-between font-mono text-[11px] leading-relaxed select-text overflow-y-auto">
                <div className="flex flex-col gap-2">
                  {ussdHistory.slice(-4).map((h, index) => (
                    <div 
                      key={index} 
                      className={`p-1.5 rounded ${
                        h.type === "in" 
                          ? "bg-slate-800/80 text-emerald-400 self-end font-bold text-right" 
                          : "text-slate-200 border-l-2 border-emerald-500 pl-2 py-0.5 bg-slate-900/40"
                      }`}
                    >
                      {h.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* INPUT BOX */}
              <form onSubmit={ussdSubmitWithRef} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. 1*STD-884, 2*STD-884*50000"
                  value={ussdInput}
                  onChange={(e) => setUssdInput(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded px-2 py-1.5 text-[11px] font-mono font-bold text-slate-200 outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-black text-xs uppercase tracking-widest flex items-center justify-center cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* POPULAR COMMANDS */}
              <div className="flex flex-col gap-1.5 mt-1">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider">
                  Common Test Commands:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setUssdInput("")}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[9px] font-black rounded border border-slate-700 cursor-pointer"
                  >
                    *270# [Home]
                  </button>
                  <button
                    onClick={() => setUssdInput("1")}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[9px] font-black rounded border border-slate-700 cursor-pointer"
                  >
                    1 [Balance Enquiry]
                  </button>
                  {parties.slice(0, 2).map(p => (
                    <button
                      key={p.id}
                      onClick={() => setUssdInput(`1*${p.id}`)}
                      className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[9px] font-black rounded border border-slate-700 cursor-pointer text-left truncate max-w-[130px]"
                    >
                      Check {p.id}
                    </button>
                  ))}
                  {parties.slice(0, 2).map(p => (
                    <button
                      key={p.id}
                      onClick={() => setUssdInput(`2*${p.id}*100000`)}
                      className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[9px] font-black rounded border border-slate-700 cursor-pointer text-left truncate max-w-[130px]"
                    >
                      Pay {p.id}
                    </button>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </aside>
      </div>
    </div>
  );

  function ussdSubmitWithRef(e: React.FormEvent) {
    handleUssdSubmit(e);
  }
}
export default Dashboard;
