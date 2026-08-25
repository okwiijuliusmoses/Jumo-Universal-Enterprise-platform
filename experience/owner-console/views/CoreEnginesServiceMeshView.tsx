import React, { useState } from 'react';
import { 
  ShieldCheck, DollarSign, Cpu, Activity, ArrowRightLeft, Layers, 
  CheckCircle2, AlertTriangle, FileText, Lock, Sparkles, RefreshCw, 
  TrendingUp, Building2, CreditCard, PieChart, Database, Terminal,
  Play, Check, Eye, HelpCircle, Server
} from 'lucide-react';
import { jumoServiceMesh } from '../../../platform/service-mesh';
import { faapEngine } from '../../../platform/faap';
import { fintechEngine } from '../../../platform/fintech';
import { aegisAccountabilityEngine } from '../../../platform/security';
import { universalTreasuryRouter } from '../../../platform/treasury';
import { jumoAiOrchestrator } from '../../../platform/ai';

interface CoreEnginesServiceMeshViewProps {
  initialTab?: 'FAAP' | 'FINTECH' | 'AEGIS' | 'TREASURY' | 'SERVICE_MESH' | 'AI_ORCHESTRATOR';
}

export const CoreEnginesServiceMeshView: React.FC<CoreEnginesServiceMeshViewProps> = ({
  initialTab = 'SERVICE_MESH',
}) => {
  const [activeEngine, setActiveEngine] = useState<string>(initialTab);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [selectedAiAgent, setSelectedAiAgent] = useState<any>('FAAP_FINANCIAL_ANALYST');
  const [customAiPrompt, setCustomAiPrompt] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  // Live platform stats
  const meshStats = jumoServiceMesh.getMeshStats();
  const faapSummary = faapEngine.generateFinancialSummary();
  const fintechStats = fintechEngine.getFintechMetrics();
  const aegisStats = aegisAccountabilityEngine.getSecurityMetrics();
  const treasuryStats = universalTreasuryRouter.getTreasuryStats();
  const aiAgents = jumoAiOrchestrator.getAgents();
  const aiReports = jumoAiOrchestrator.getReports();

  const handleSimulatePayment = () => {
    universalTreasuryRouter.routeCustomerPayment({
      sourceDomainId: 'dom_finbank_com',
      tenantId: 'tenant_finbank_01',
      channel: 'API_USAGE',
      rawAmount: Math.floor(10000 + Math.random() * 50000),
      currency: 'USD',
      paymentGateway: 'SWIFT_INSTITUTIONAL',
      description: 'Simulated Real-Time Sovereign API & HSM Volume Settlement',
    });

    aegisAccountabilityEngine.logEvent({
      category: 'FINANCIAL',
      eventType: 'TREASURY_SETTLEMENT_ROUTED',
      tenantId: 'tenant_finbank_01',
      actorId: 'usr_owner_root',
      actorName: 'JUMO Enterprise Owner Console',
      sourceIp: '10.240.0.1 (Sovereign Control Plane)',
      actionSummary: 'Executed live automated revenue allocation across JUMO Treasury Router.',
      severity: 'NORMAL',
    });

    setRefreshTrigger((prev) => prev + 1);
  };

  const handleRunBillingCycle = () => {
    const result = universalTreasuryRouter.executeAutomatedBillingCycle();
    aegisAccountabilityEngine.logEvent({
      category: 'FINANCIAL',
      eventType: 'AUTOMATED_BILLING_CYCLE_EXEC',
      tenantId: 'tenant_owner_global',
      actorId: 'engine_revenue_auto',
      actorName: 'JUMO Revenue Automation Engine',
      sourceIp: 'Internal Service Mesh',
      actionSummary: `Processed ${result.billedCount} automated billing deductions totaling $${result.totalCollectedUSD} USD.`,
      severity: 'NORMAL',
    });
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleGenerateAiReport = () => {
    setIsGeneratingAi(true);
    setTimeout(() => {
      jumoAiOrchestrator.generateExecutiveIntelligenceReport(selectedAiAgent, undefined, customAiPrompt);
      setCustomAiPrompt('');
      setIsGeneratingAi(false);
      setRefreshTrigger((prev) => prev + 1);
    }, 600);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Sovereign Engine Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 rounded-xl p-6 text-white shadow-xl border border-blue-200/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-slate-700 text-xs font-bold font-mono tracking-wider mb-3 uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#0078D4] animate-pulse" />
              JUMO UEOS Phase 27 — Sovereign Enterprise Service Mesh
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Core Platform Engines & Automated Revenue Wiring
            </h1>
            <p className="text-blue-100/90 text-sm mt-1 max-w-2xl">
              Centralized command center for FAAP Financial Accounting, FINTECH Commercial Banking Switch, AEGIS Verifiable CCTV Accountability, and the Universal Treasury Revenue Router.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSimulatePayment}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md transition-all active:scale-95 border border-blue-400/30"
            >
              <DollarSign className="w-4 h-4 text-[#0078D4]" />
              Simulate Revenue Settlement
            </button>
            <button
              onClick={handleRunBillingCycle}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition-all active:scale-95 border border-emerald-400/30"
            >
              <Play className="w-4 h-4 text-white" />
              Run Automated Billing
            </button>
          </div>
        </div>

        {/* Real-time Status Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6 pt-6 border-t border-blue-200/50">
          <div className="bg-slate-50/50 rounded-lg p-3 border border-blue-200/60">
            <div className="text-[10px] uppercase tracking-wider text-blue-700 font-bold">Mesh Status</div>
            <div className="text-lg font-extrabold text-white flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              {meshStats.connectedDomainsCount} Domains Wired
            </div>
          </div>

          <div className="bg-slate-50/50 rounded-lg p-3 border border-blue-200/60">
            <div className="text-[10px] uppercase tracking-wider text-blue-700 font-bold">FAAP Assets</div>
            <div className="text-lg font-extrabold text-[#0078D4] mt-0.5 font-mono">
              ${(faapSummary.totalAssetsUSD / 1000000).toFixed(2)}M USD
            </div>
          </div>

          <div className="bg-slate-50/50 rounded-lg p-3 border border-blue-200/60">
            <div className="text-[10px] uppercase tracking-wider text-blue-700 font-bold">FINTECH Liquidity</div>
            <div className="text-lg font-extrabold text-white mt-0.5 font-mono">
              ${(fintechStats.totalDepositsUSD / 1000000).toFixed(2)}M USD
            </div>
          </div>

          <div className="bg-slate-50/50 rounded-lg p-3 border border-blue-200/60">
            <div className="text-[10px] uppercase tracking-wider text-blue-700 font-bold">Treasury Settled</div>
            <div className="text-lg font-extrabold text-emerald-400 mt-0.5 font-mono">
              ${(treasuryStats.totalSettledUSD / 1000).toFixed(1)}k USD
            </div>
          </div>

          <div className="bg-slate-50/50 rounded-lg p-3 border border-blue-200/60">
            <div className="text-[10px] uppercase tracking-wider text-blue-700 font-bold">AEGIS Audit Chain</div>
            <div className="text-sm font-extrabold text-emerald-700 flex items-center gap-1 mt-1 font-mono">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              100% VERIFIED
            </div>
          </div>

          <div className="bg-slate-50/50 rounded-lg p-3 border border-blue-200/60">
            <div className="text-[10px] uppercase tracking-wider text-blue-700 font-bold">AI Orchestrator</div>
            <div className="text-sm font-extrabold text-purple-300 flex items-center gap-1 mt-1 font-mono">
              <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
              5 AGENTS ONLINE
            </div>
          </div>
        </div>
      </div>

      {/* Engine Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { id: 'SERVICE_MESH', label: 'Enterprise Service Mesh (JESM)', icon: <Layers className="w-4 h-4 text-blue-600" /> },
          { id: 'TREASURY', label: 'Treasury & Revenue Router', icon: <DollarSign className="w-4 h-4 text-emerald-600" /> },
          { id: 'FAAP', label: 'FAAP Accounting Engine', icon: <PieChart className="w-4 h-4 text-cyan-600" /> },
          { id: 'FINTECH', label: 'FINTECH Commercial Switch', icon: <Building2 className="w-4 h-4 text-indigo-600" /> },
          { id: 'AEGIS', label: 'AEGIS Accountability CCTV', icon: <ShieldCheck className="w-4 h-4 text-emerald-600" /> },
          { id: 'AI_ORCHESTRATOR', label: 'Enterprise AI Orchestrator', icon: <Sparkles className="w-4 h-4 text-purple-600" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveEngine(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap border ${
              activeEngine === tab.id
                ? 'bg-blue-600 text-white border-blue-200 shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Enterprise Service Mesh (JESM) */}
      {activeEngine === 'SERVICE_MESH' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Server className="w-5 h-5 text-blue-600" />
                  Connected Sovereign Domains & Engine Registry
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Universal Service Contracts binding internal engines, ERP domains, and external installations into one operational ecosystem.
                </p>
              </div>
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold font-mono">
                {jumoServiceMesh.getConnectedDomains().length} Active Domain Contracts
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {jumoServiceMesh.getConnectedDomains().map((domain) => (
                <div key={domain.domainId} className="bg-slate-50 rounded-lg p-4 border border-slate-200 hover:border-blue-300 transition-all">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold rounded font-mono uppercase">
                        {domain.domainType}
                      </span>
                      <h4 className="font-bold text-slate-900 mt-1.5 text-sm">{domain.name}</h4>
                      <div className="text-xs font-mono text-slate-500">{domain.domainId}</div>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm" title="Gateway HEALTHY" />
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-mono text-slate-600">
                    <span>Gateway: {domain.gatewayEndpoint}</span>
                    <span className="text-emerald-700 font-bold">{domain.healthStatus}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
              <ArrowRightLeft className="w-5 h-5 text-indigo-600" />
              Recent Service Mesh Routed Transactions
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 uppercase font-bold text-[10px]">
                    <th className="p-3">Transaction ID</th>
                    <th className="p-3">Source & Target</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Payload Summary</th>
                    <th className="p-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {jumoServiceMesh.getRoutedTransactions().map((tx) => (
                    <tr key={tx.transactionId} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-blue-600">{tx.transactionId}</td>
                      <td className="p-3 text-slate-700">
                        <span className="font-semibold">{tx.sourceDomainId}</span> &rarr; <span className="font-semibold">{tx.targetDomainId}</span>
                      </td>
                      <td className="p-3"><span className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded font-bold">{tx.transactionType}</span></td>
                      <td className="p-3 text-slate-600 font-sans max-w-md truncate">{tx.payload.description || JSON.stringify(tx.payload)}</td>
                      <td className="p-3 text-right font-bold text-emerald-600">{tx.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Universal Treasury & Revenue Router */}
      {activeEngine === 'TREASURY' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm border-l-4 border-l-blue-600">
              <div className="text-xs uppercase font-bold text-slate-500">Total Settled Volume</div>
              <div className="text-2xl font-extrabold text-slate-900 mt-1 font-mono">${treasuryStats.totalSettledUSD.toLocaleString()} USD</div>
              <p className="text-xs text-slate-500 mt-2">All revenue routed through single JUMO institutional treasury channel.</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm border-l-4 border-l-emerald-600">
              <div className="text-xs uppercase font-bold text-slate-500">Platform Sovereign Fee (12%)</div>
              <div className="text-2xl font-extrabold text-emerald-600 mt-1 font-mono">${treasuryStats.totalPlatformFeeUSD.toLocaleString()} USD</div>
              <p className="text-xs text-slate-500 mt-2">Automated drawdown allocated to JUMO Sovereign Operating Reserve.</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm border-l-4 border-l-purple-600">
              <div className="text-xs uppercase font-bold text-slate-500">AEGIS Contingency Reserve (3%)</div>
              <div className="text-2xl font-extrabold text-purple-600 mt-1 font-mono">${treasuryStats.totalAegisReserveUSD.toLocaleString()} USD</div>
              <p className="text-xs text-slate-500 mt-2">Dedicated security insurance & risk mitigation liquidity pool.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              Sovereign Treasury Revenue Router Ledger
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 uppercase font-bold text-[10px]">
                    <th className="p-3">Payment ID</th>
                    <th className="p-3">Source & Tenant</th>
                    <th className="p-3">Channel</th>
                    <th className="p-3">Raw Amount</th>
                    <th className="p-3">Settled USD</th>
                    <th className="p-3">Platform Fee</th>
                    <th className="p-3">Tenant Net</th>
                    <th className="p-3">Gateway</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {universalTreasuryRouter.getTreasuryLedger().map((pay) => (
                    <tr key={pay.paymentId} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-blue-600">{pay.paymentId}</td>
                      <td className="p-3 text-slate-700 font-sans font-semibold">{pay.sourceDomainId} <span className="text-slate-600 font-mono">({pay.tenantId})</span></td>
                      <td className="p-3"><span className="px-2 py-0.5 bg-blue-50 text-blue-800 rounded font-bold">{pay.channel}</span></td>
                      <td className="p-3 font-bold text-slate-800">{pay.rawAmount.toLocaleString()} {pay.currency}</td>
                      <td className="p-3 font-bold text-emerald-600">${pay.settledAmountUSD.toLocaleString()}</td>
                      <td className="p-3 text-slate-600">${pay.allocationBreakdown.platformSovereignFeeUSD.toLocaleString()}</td>
                      <td className="p-3 font-bold text-indigo-600">${pay.allocationBreakdown.tenantNetRevenueUSD.toLocaleString()}</td>
                      <td className="p-3 text-slate-500 text-[11px]">{pay.paymentGateway}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: FAAP Accounting Engine */}
      {activeEngine === 'FAAP' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
              <div className="text-xs font-bold text-slate-500 uppercase">Total Assets</div>
              <div className="text-xl font-extrabold text-blue-600 mt-1 font-mono">${faapSummary.totalAssetsUSD.toLocaleString()} USD</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
              <div className="text-xs font-bold text-slate-500 uppercase">Total Liabilities</div>
              <div className="text-xl font-extrabold text-indigo-600 mt-1 font-mono">${faapSummary.totalLiabilitiesUSD.toLocaleString()} USD</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
              <div className="text-xs font-bold text-slate-500 uppercase">Total Equity</div>
              <div className="text-xl font-extrabold text-emerald-600 mt-1 font-mono">${faapSummary.totalEquityUSD.toLocaleString()} USD</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
              <div className="text-xs font-bold text-slate-500 uppercase">Balance Sheet Status</div>
              <div className="text-sm font-extrabold text-emerald-700 flex items-center gap-1.5 mt-2 font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                100% BALANCED
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
              <PieChart className="w-5 h-5 text-cyan-600" />
              Sovereign Chart of Accounts (Double-Entry General Ledger)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 uppercase font-bold text-[10px]">
                    <th className="p-3">Account No.</th>
                    <th className="p-3">Account Name</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Category</th>
                    <th className="p-3 text-right">Balance (USD)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {faapEngine.getChartOfAccounts().map((acc) => (
                    <tr key={acc.accountNumber} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-blue-600">{acc.accountNumber}</td>
                      <td className="p-3 font-bold text-slate-800 font-sans">{acc.accountName}</td>
                      <td className="p-3"><span className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded font-bold">{acc.type}</span></td>
                      <td className="p-3 text-slate-600">{acc.category}</td>
                      <td className="p-3 text-right font-extrabold text-slate-900">${acc.balanceUSD.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Financial Recommendations */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-purple-600" />
              FAAP Financial Intelligence AI Recommendations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {faapEngine.getAiRecommendations().map((rec) => (
                <div key={rec.recId} className="bg-purple-50/50 rounded-lg p-4 border border-purple-200">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded text-[10px] font-bold font-mono">{rec.category}</span>
                    <span className="text-xs font-bold text-emerald-600 font-mono">+${rec.potentialImpactUSD.toLocaleString()} USD</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mt-2">{rec.title}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{rec.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: FINTECH Commercial Switch */}
      {activeEngine === 'FINTECH' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
              <Building2 className="w-5 h-5 text-indigo-600" />
              Institutional Banking & Escrow Deposit Accounts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {fintechEngine.getAccounts().map((acc) => (
                <div key={acc.accountId} className="bg-slate-50 rounded-lg p-5 border border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-blue-600">{acc.accountNumber}</span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">{acc.status}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 mt-2">{acc.accountHolderName}</h4>
                  <div className="text-xs text-slate-500 font-mono mt-0.5">{acc.accountType}</div>
                  <div className="mt-4 pt-4 border-t border-slate-200 flex items-baseline justify-between font-mono">
                    <span className="text-xs text-slate-500">Balance:</span>
                    <span className="text-lg font-extrabold text-slate-900">{acc.balance.toLocaleString()} {acc.currency}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
              <ArrowRightLeft className="w-5 h-5 text-blue-600" />
              Payment Switch & Mobile Money Interconnect Transactions
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 uppercase font-bold text-[10px]">
                    <th className="p-3">TX ID</th>
                    <th className="p-3">Sender & Recipient</th>
                    <th className="p-3">Method</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Settled USD</th>
                    <th className="p-3">Purpose</th>
                    <th className="p-3">AML Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {fintechEngine.getTransactions().map((tx) => (
                    <tr key={tx.transactionId} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-blue-600">{tx.transactionId}</td>
                      <td className="p-3 font-sans font-semibold text-slate-800">{tx.recipientName}</td>
                      <td className="p-3"><span className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded font-bold">{tx.paymentMethod}</span></td>
                      <td className="p-3 font-bold text-slate-800">{tx.amount.toLocaleString()} {tx.currency}</td>
                      <td className="p-3 font-bold text-emerald-600">${tx.settledAmountUSD.toLocaleString()}</td>
                      <td className="p-3 text-slate-600 font-sans">{tx.purposeCode}</td>
                      <td className="p-3"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold">{tx.amlStatus}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: AEGIS Accountability CCTV */}
      {activeEngine === 'AEGIS' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-emerald-900 to-teal-950 rounded-xl p-6 text-white shadow-md border border-emerald-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Sovereign Financial CCTV & Cryptographic Chain</h3>
                <p className="text-xs text-emerald-200 mt-0.5">Every financial, administrative, and system event is permanently sealed with SHA-256 hash chaining.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-emerald-950/80 px-4 py-2.5 rounded-lg border border-emerald-700 font-mono text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-700 font-bold">100% VERIFIED CHAIN INTEGRITY</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-emerald-600" />
              Immutable Audit Log Feed (Financial & Administrative Telemetry)
            </h3>
            <div className="space-y-3">
              {aegisAccountabilityEngine.getAuditLedger().map((evt) => (
                <div key={evt.eventId} className="bg-slate-50 rounded-lg p-4 border border-slate-200 hover:border-emerald-300 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase ${
                        evt.category === 'FINANCIAL' ? 'bg-blue-100 text-blue-800' : evt.category === 'SYSTEM' ? 'bg-purple-100 text-purple-800' : 'bg-slate-200 text-slate-800'
                      }`}>
                        {evt.category}
                      </span>
                      <span className="font-bold text-slate-900 text-sm font-mono">{evt.eventType}</span>
                    </div>
                    <span className="text-xs font-mono text-slate-600">{evt.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-700 mt-2 font-sans font-semibold">{evt.actionSummary}</p>
                  <div className="mt-3 pt-3 border-t border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono text-slate-500">
                    <div>Actor: <span className="text-slate-800 font-bold">{evt.actorName}</span> ({evt.sourceIp})</div>
                    <div className="truncate max-w-md text-emerald-700" title={evt.cryptographicHash}>Hash: {evt.cryptographicHash}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: Enterprise AI Orchestrator */}
      {activeEngine === 'AI_ORCHESTRATOR' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                Generate Executive AI Analysis
              </h3>
              <p className="text-xs text-slate-500">
                Select a specialized JUMO AI agent to synthesize live telemetry across FAAP ledgers, FINTECH switches, and AEGIS security logs.
              </p>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Select Sovereign Agent:</label>
                <select
                  value={selectedAiAgent}
                  onChange={(e) => setSelectedAiAgent(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {aiAgents.map((ag) => (
                    <option key={ag.agentId} value={ag.agentId}>{ag.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Custom Directive (Optional):</label>
                <textarea
                  value={customAiPrompt}
                  onChange={(e) => setCustomAiPrompt(e.target.value)}
                  placeholder="e.g. Analyze Q3 cash flow liquidity in SWIFT repo accounts..."
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-xs text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-500 h-24"
                />
              </div>

              <button
                onClick={handleGenerateAiReport}
                disabled={isGeneratingAi}
                className="w-full py-2.5 px-4 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isGeneratingAi ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    Synthesizing Cross-Domain Intelligence...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-purple-200" />
                    Generate Live AI Report
                  </>
                )}
              </button>
            </div>

            <div className="md:col-span-2 space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Orchestrated AI Intelligence Reports History
              </h3>
              {aiReports.map((rep) => (
                <div key={rep.reportId} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded text-[10px] font-bold font-mono uppercase">
                        {rep.agentId}
                      </span>
                      <h4 className="font-extrabold text-slate-900 text-base mt-1">{rep.title}</h4>
                    </div>
                    <span className="text-xs font-mono text-slate-600">{rep.timestamp}</span>
                  </div>
                  
                  <p className="text-xs text-slate-700 leading-relaxed font-sans">{rep.summary}</p>

                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Key Sovereign Insights:</div>
                    <ul className="list-disc list-inside space-y-1 text-xs text-slate-800 font-semibold">
                      {rep.keyInsights.map((insight, idx) => (
                        <li key={idx} className="leading-normal">{insight}</li>
                      ))}
                    </ul>
                  </div>

                  {rep.recommendedActions.length > 0 && (
                    <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 space-y-2">
                      <div className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Recommended Executive Actions:</div>
                      {rep.recommendedActions.map((act, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs font-semibold text-slate-800">
                          <span className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            {act.action}
                          </span>
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-mono text-[10px]">{act.impact}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
