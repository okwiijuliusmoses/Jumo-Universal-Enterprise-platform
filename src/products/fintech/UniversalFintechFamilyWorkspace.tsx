import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Zap, ShieldAlert, CheckCircle2, Cpu, FileText, 
  Play, Terminal, Landmark, ShieldCheck, Database, Layers, 
  Sparkles, DollarSign, RefreshCw, Send, Lock, Check
} from 'lucide-react';
import { FintechFamilyDefinition } from './registries/FintechFamilyRegistry';

interface UniversalWorkspaceProps {
  family: FintechFamilyDefinition;
  onBack: () => void;
}

export const UniversalFintechFamilyWorkspace: React.FC<UniversalWorkspaceProps> = ({ family, onBack }) => {
  // Simulator state
  const [amount, setAmount] = useState<string>('50000');
  const [debitAcc, setDebitAcc] = useState<string>('1000 - Local Cash Vault');
  const [creditAcc, setCreditAcc] = useState<string>('2100 - Customer Wallet Liability');
  const [reference, setReference] = useState<string>(`REF-${Math.floor(100000 + Math.random() * 900000)}`);
  const [description, setDescription] = useState<string>(`Simulated ${family.name} transaction.`);
  const [applyFee, setApplyFee] = useState<boolean>(true);
  
  // Compliance Sanction screening status
  const [amlScreened, setAmlScreened] = useState<'IDLE' | 'SCREENING' | 'PASSED' | 'FLAGGED'>('IDLE');
  
  // Double-Entry ledger journal logs
  const [localJournal, setLocalJournal] = useState<Array<{
    id: string;
    date: string;
    ref: string;
    desc: string;
    account: string;
    debit: number;
    credit: number;
  }>>([
    { id: 'J_001', date: new Date().toISOString().split('T')[0], ref: 'INIT_SYS', desc: 'System Liquidity Core Funding', account: '1000 - Local Cash Vault', debit: 250000000, credit: 0 },
    { id: 'J_002', date: new Date().toISOString().split('T')[0], ref: 'INIT_SYS', desc: 'System Liquidity Core Funding', account: '3000 - Sovereign Reserve Equity', debit: 0, credit: 250000000 }
  ]);

  // API Client payload
  const [apiEndpoint, setApiEndpoint] = useState<string>(`/api/v1/fintech/${family.code.toLowerCase()}/transact`);
  const [apiPayload, setApiPayload] = useState<string>('');
  const [apiResponse, setApiResponse] = useState<string>('{}');
  const [apiStatus, setApiStatus] = useState<number | null>(null);
  const [apiLoading, setApiLoading] = useState<boolean>(false);

  // System console logs
  const [logs, setLogs] = useState<Array<{ time: string; msg: string; type: 'info' | 'success' | 'warn' | 'error' }>>([
    { time: new Date().toLocaleTimeString(), msg: `Platform workspace for family [${family.code}] successfully initialized.`, type: 'info' },
    { time: new Date().toLocaleTimeString(), msg: `Verifying dependency: FAAP Double-Entry Accounting Core is ACTIVE.`, type: 'info' },
    { time: new Date().toLocaleTimeString(), msg: `Sanctions list loaded: 142,510 high-risk individuals and entities synced.`, type: 'success' }
  ]);

  const addLog = (msg: string, type: 'info' | 'success' | 'warn' | 'error' = 'info') => {
    setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), msg, type }]);
  };

  // Generate payload based on family
  useEffect(() => {
    const payloadTemplate: Record<string, any> = {
      family_id: family.id,
      family_code: family.code,
      family_name: family.name,
      timestamp: new Date().toISOString(),
      transaction: {
        amount: parseFloat(amount) || 0,
        currency: 'USD',
        reference_id: reference,
        description: description,
        routing_parameters: {
          debit_account: debitAcc,
          credit_account: creditAcc,
          apply_jumo_clearing_fee: applyFee
        }
      },
      metadata: {
        agent_id: 'JUMO-AGENT-991A',
        tenant_domain: 'sovereign.jumo.org',
        compliance_check: {
          aml_screen_required: true,
          regulatory_sanction_match: false
        }
      }
    };
    setApiPayload(JSON.stringify(payloadTemplate, null, 2));
  }, [family, amount, debitAcc, creditAcc, reference, description, applyFee]);

  const runAmlScreening = () => {
    setAmlScreened('SCREENING');
    addLog(`Initiating Zero-Trust Sanction Lists Screening for Reference ${reference}...`, 'info');
    setTimeout(() => {
      // 95% pass, 5% flagged
      const passed = Math.random() > 0.05;
      if (passed) {
        setAmlScreened('PASSED');
        addLog(`Zero-Trust Compliance Check: PASSED. No PEP or Sanction Matches found for current entity.`, 'success');
      } else {
        setAmlScreened('FLAGGED');
        addLog(`Compliance Alert: FLAGGED! Sentry node reported match on PEP high-risk watchlists.`, 'error');
      }
    }, 1200);
  };

  const handleExecuteTransaction = () => {
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) {
      addLog('Invalid transaction amount.', 'error');
      return;
    }

    if (amlScreened !== 'PASSED') {
      addLog('Transaction aborted. Sanctions AML check must be successfully PASSED before execution.', 'warn');
      return;
    }

    addLog(`Preparing double-entry ledger journals with 0.00 offset verification...`, 'info');
    
    const today = new Date().toISOString().split('T')[0];
    const newEntries = [];

    // Base debit & credit
    const mainDebitId = `JE_${Math.floor(100000 + Math.random() * 900000)}`;
    const mainCreditId = `JE_${Math.floor(100000 + Math.random() * 900000)}`;

    let baseAmount = amt;
    let feeAmount = 0;

    if (applyFee) {
      feeAmount = Math.round(amt * 0.015 * 100) / 100;
      baseAmount = amt - feeAmount;
      addLog(`Global JUMO 1.5% Settlement Clearing Fee applied: $${feeAmount.toFixed(2)}`, 'success');
    }

    // Post main transaction
    newEntries.push({
      id: mainDebitId,
      date: today,
      ref: reference,
      desc: description,
      account: debitAcc,
      debit: baseAmount,
      credit: 0
    });

    newEntries.push({
      id: mainCreditId,
      date: today,
      ref: reference,
      desc: description,
      account: creditAcc,
      debit: 0,
      credit: baseAmount
    });

    // If 1.5% JUMO fee applied: Automatically debit JUMO Master Treasury and credit Fee Revenue
    if (feeAmount > 0) {
      const feeDebitId = `JE_${Math.floor(100000 + Math.random() * 900000)}`;
      const feeCreditId = `JE_${Math.floor(100000 + Math.random() * 900000)}`;

      newEntries.push({
        id: feeDebitId,
        date: today,
        ref: `${reference}-FEE`,
        desc: `JUMO 1.5% Settlement Fee for ${reference}`,
        account: '1250 - JUMO Master Treasury Clearing',
        debit: feeAmount,
        credit: 0
      });

      newEntries.push({
        id: feeCreditId,
        date: today,
        ref: `${reference}-FEE`,
        desc: `JUMO 1.5% Settlement Fee for ${reference}`,
        account: '4100 - JUMO Platform Fee Revenue',
        debit: 0,
        credit: feeAmount
      });
    }

    // Parity Check (Sum of Debits === Sum of Credits)
    const totalDebit = newEntries.reduce((sum, item) => sum + item.debit, 0);
    const totalCredit = newEntries.reduce((sum, item) => sum + item.credit, 0);
    const offsetParity = totalDebit - totalCredit;

    if (Math.abs(offsetParity) < 0.001) {
      setLocalJournal(prev => [...prev, ...newEntries]);
      addLog(`Double-Entry parity validated successfully (Offset: $0.00). Ledger journal committed.`, 'success');
      setReference(`REF-${Math.floor(100000 + Math.random() * 900000)}`);
      setAmlScreened('IDLE');
    } else {
      addLog(`Fatal Balance Parity Error: Offset is $${offsetParity.toFixed(2)}. Postings rejected.`, 'error');
    }
  };

  const handleTestApi = () => {
    setApiLoading(true);
    addLog(`Dispatching REST payload to secure proxy routing endpoint ${apiEndpoint}...`, 'info');
    
    setTimeout(() => {
      setApiLoading(false);
      setApiStatus(200);
      
      const responseTemplate = {
        status: 'SUCCESS',
        code: 200,
        message: 'Fintech boundary API query completed.',
        data: {
          family_id: family.id,
          family_code: family.code,
          active_capabilities_benchmarked: 4,
          tenant_isolated_schema: 'ueos_tenant_prod_01',
          double_entry_integrity: 'PASS',
          jumo_fee_applied: applyFee ? '1.5%' : '0%',
          audit_hash: `sha256-${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`
        }
      };

      setApiResponse(JSON.stringify(responseTemplate, null, 2));
      addLog(`API Response Code: 200 OK. Dynamic token validated under Zero-Trust scope.`, 'success');
    }, 1000);
  };

  // Helper to pre-fill accounts based on family
  useEffect(() => {
    if (family.category === 'Payments') {
      setDebitAcc('1100 - Clearing Bank Transit Account');
      setCreditAcc('1200 - Mobile Money Cash Pool');
      setDescription(`Processed payment switch routing via ${family.name}.`);
    } else if (family.category === 'Lending & Credit') {
      setDebitAcc('1400 - Disbursed Customer Loans Receivable');
      setCreditAcc('1100 - Clearing Bank Transit Account');
      setDescription(`Approved and issued credit product amortization.`);
    } else if (family.category === 'Treasury & Wealth') {
      setDebitAcc('1300 - Investment Asset Pool');
      setCreditAcc('1000 - Local Cash Vault');
      setDescription(`Structured treasury asset placement under ${family.name}.`);
    } else {
      setDebitAcc('1000 - Local Cash Vault');
      setCreditAcc('2100 - Customer Wallet Liability');
      setDescription(`Account ledger entry via ${family.name}.`);
    }
  }, [family]);

  return (
    <div className="min-h-screen bg-white text-[#1F1F1F] flex flex-col font-sans">
      {/* Dynamic Header */}
      <header className="bg-[#1F1F1F] text-white px-6 py-3 border-b border-slate-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 transition"
              title="Return to Architecture"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono font-bold uppercase tracking-widest">
                <span>JUMO FINTECH</span>
                <span>/</span>
                <span>Workspace Developer Console</span>
              </div>
              <h1 className="text-base font-black tracking-tight flex items-center gap-2 mt-0.5">
                {family.name} Workspace
                <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-[9px] font-mono rounded border border-emerald-500/30">
                  {family.code}
                </span>
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-[11px] bg-slate-800 text-slate-300 px-3 py-1 rounded border border-slate-700">
            <Database className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Schema: <strong className="text-white font-mono">ueos_db_fintech</strong></span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left Column: Transaction Simulator */}
        <section className="lg:col-span-4 border border-slate-200 rounded bg-slate-50 p-4 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
              Interactive Tx Simulator
            </h2>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold font-mono">
              REAL-TIME
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                Transaction Reference
              </label>
              <input 
                type="text" 
                value={reference}
                onChange={e => setReference(e.target.value)}
                className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded font-mono text-xs focus:ring-1 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                Amount ($)
              </label>
              <input 
                type="number" 
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded font-mono text-xs focus:ring-1 focus:ring-emerald-500 outline-none font-bold"
              />
            </div>

            <div className="grid grid-cols-1 gap-2">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                  Debit Account
                </label>
                <select 
                  value={debitAcc} 
                  onChange={e => setDebitAcc(e.target.value)}
                  className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs focus:ring-1 focus:ring-emerald-500 outline-none"
                >
                  <option value="1000 - Local Cash Vault">1000 - Local Cash Vault</option>
                  <option value="1100 - Clearing Bank Transit Account">1100 - Clearing Bank Transit Account</option>
                  <option value="1200 - Mobile Money Cash Pool">1200 - Mobile Money Cash Pool</option>
                  <option value="1250 - JUMO Master Treasury Clearing">1250 - JUMO Master Treasury Clearing</option>
                  <option value="1300 - Investment Asset Pool">1300 - Investment Asset Pool</option>
                  <option value="1400 - Disbursed Customer Loans Receivable">1400 - Disbursed Customer Loans Receivable</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                  Credit Account
                </label>
                <select 
                  value={creditAcc} 
                  onChange={e => setCreditAcc(e.target.value)}
                  className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs focus:ring-1 focus:ring-emerald-500 outline-none"
                >
                  <option value="2100 - Customer Wallet Liability">2100 - Customer Wallet Liability</option>
                  <option value="1100 - Clearing Bank Transit Account">1100 - Clearing Bank Transit Account</option>
                  <option value="1200 - Mobile Money Cash Pool">1200 - Mobile Money Cash Pool</option>
                  <option value="3000 - Sovereign Reserve Equity">3000 - Sovereign Reserve Equity</option>
                  <option value="4100 - JUMO Platform Fee Revenue">4100 - JUMO Platform Fee Revenue</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                Narrative / Description
              </label>
              <input 
                type="text" 
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded text-xs focus:ring-1 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div className="flex items-center gap-2 py-1">
              <input 
                type="checkbox" 
                id="apply_fee" 
                checked={applyFee} 
                onChange={e => setApplyFee(e.target.checked)}
                className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <label htmlFor="apply_fee" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                Apply JUMO 1.5% Settlement Clearing Fee
                <span className="text-[10px] bg-slate-200 text-slate-800 px-1 py-0.2 rounded font-bold">
                  RULE FAAP-7
                </span>
              </label>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded space-y-2">
              <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Mandatory AML PEP Screening
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-700">Screening Status:</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-black tracking-wider ${
                  amlScreened === 'PASSED' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : amlScreened === 'FLAGGED'
                      ? 'bg-red-100 text-red-800'
                      : amlScreened === 'SCREENING'
                        ? 'bg-amber-100 text-amber-800 animate-pulse'
                        : 'bg-slate-100 text-slate-600'
                }`}>
                  {amlScreened}
                </span>
              </div>
              
              {amlScreened !== 'PASSED' ? (
                <button 
                  onClick={runAmlScreening}
                  disabled={amlScreened === 'SCREENING'}
                  className="w-full py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded transition flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Perform AML Compliance Screen
                </button>
              ) : (
                <div className="text-[10px] text-emerald-700 font-semibold text-center flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Ready for Posting
                </div>
              )}
            </div>

            <button 
              onClick={handleExecuteTransaction}
              disabled={amlScreened !== 'PASSED'}
              className={`w-full py-2.5 rounded text-white font-black text-xs tracking-wider uppercase transition shadow-sm flex items-center justify-center gap-2 ${
                amlScreened === 'PASSED' 
                  ? 'bg-emerald-600 hover:bg-emerald-500' 
                  : 'bg-slate-300 cursor-not-allowed text-slate-500'
              }`}
            >
              <Zap className="w-4 h-4" />
              Commit Double-Entry Postings
            </button>
          </div>
        </section>

        {/* Center Column: FAAP Double-Entry ledger journal */}
        <section className="lg:col-span-5 border border-slate-200 rounded bg-white p-4 flex flex-col h-[520px] lg:h-auto overflow-hidden">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 mb-3">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <Landmark className="w-3.5 h-3.5 text-emerald-600" />
              Double-Entry Ledger (FAAP Engine)
            </h2>
            <div className="flex items-center gap-1.5 text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-black font-mono">
              <Check className="w-3 h-3 text-emerald-700" />
              0.00 OFFSET PARITY GUARANTEED
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {localJournal.map(item => (
              <div key={item.id} className="p-2 border border-slate-100 bg-slate-50 rounded text-xs flex flex-col justify-between hover:border-slate-300 transition">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-[9px] text-slate-400 font-semibold">{item.id} &bull; {item.date}</span>
                  <span className="font-mono text-[10px] font-bold text-slate-600 bg-white px-1.5 py-0.2 rounded border border-slate-200">
                    {item.ref}
                  </span>
                </div>
                
                <p className="text-slate-800 font-semibold text-xs mt-1">{item.desc}</p>
                <div className="font-semibold text-slate-500 mt-1.5 text-[11px] font-mono">{item.account}</div>

                <div className="flex justify-between items-center mt-2 pt-1.5 border-t border-slate-200/50">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">Debit</div>
                  <div className={`font-mono font-bold ${item.debit > 0 ? 'text-emerald-700' : 'text-slate-400'}`}>
                    ${item.debit > 0 ? item.debit.toLocaleString() : '—'}
                  </div>
                </div>

                <div className="flex justify-between items-center mt-1">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">Credit</div>
                  <div className={`font-mono font-bold ${item.credit > 0 ? 'text-blue-700' : 'text-slate-400'}`}>
                    ${item.credit > 0 ? item.credit.toLocaleString() : '—'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right Column: API Gateway Client & Console logs */}
        <section className="lg:col-span-3 space-y-4 flex flex-col h-auto overflow-hidden">
          
          {/* API Sandbox client */}
          <div className="border border-slate-200 rounded bg-slate-900 text-slate-300 p-4 flex flex-col h-[280px]">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
              <div className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">API REST Client Sandbox</span>
              </div>
              <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-emerald-400 font-bold">
                POST
              </span>
            </div>

            <div className="flex-1 flex flex-col space-y-2 overflow-hidden">
              <div className="font-mono text-[10px] text-slate-300 bg-slate-950 p-1 rounded border border-slate-800 truncate">
                {apiEndpoint}
              </div>
              
              <div className="flex-1 grid grid-cols-1 gap-2 overflow-hidden">
                <div className="overflow-auto bg-slate-950 text-[10px] font-mono p-2 rounded border border-slate-800 leading-tight">
                  <div className="text-slate-400 font-black mb-1">Payload Request</div>
                  <pre className="text-emerald-400">{apiPayload}</pre>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button 
                  onClick={handleTestApi}
                  disabled={apiLoading}
                  className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] uppercase rounded flex items-center justify-center gap-1.5 transition"
                >
                  <Send className="w-3 h-3 text-white" />
                  {apiLoading ? 'Invoking...' : 'Dispatch Request'}
                </button>
              </div>
            </div>
          </div>

          {/* Console logs */}
          <div className="border border-slate-200 rounded bg-[#1F1F1F] text-slate-300 p-4 flex flex-col h-[230px]">
            <div className="flex items-center justify-between pb-2 border-b border-slate-850 mb-2">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Platform System Log</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-1.5 font-mono text-[9px] pr-1">
              {logs.map((log, i) => (
                <div key={i} className="leading-snug">
                  <span className="text-slate-500 mr-1">[{log.time}]</span>
                  <span className={
                    log.type === 'success' ? 'text-emerald-400 font-semibold' :
                    log.type === 'error' ? 'text-red-400 font-bold' :
                    log.type === 'warn' ? 'text-amber-400 font-bold' : 'text-slate-300'
                  }>
                    {log.msg}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </section>

      </main>

      {/* Dynamic Workspace footer */}
      <footer className="bg-slate-50 border-t border-slate-200 px-6 py-2 text-[10px] text-slate-500 font-mono flex flex-wrap justify-between items-center">
        <span>Security Policy: Zero-Trust SHA-256 Administrative Walls Active</span>
        <span>JUMO UEOS v23.5 Core Engine Ready</span>
      </footer>
    </div>
  );
};
