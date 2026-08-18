import React, { useState, useEffect } from 'react';
import { 
  CreditCard, Search, Key, ShieldCheck, RefreshCw, Smartphone, Receipt, 
  Landmark, AlertTriangle, Building, Wallet, Check, Send, Sparkles, ExternalLink, ArrowRight
} from 'lucide-react';
import { SPDatabase, PaymentObligation, SchoolPayTx, EscrowBatch, SWalletAccount } from './SchoolPayStore';

export function SchoolPayViews({
  activeView,
  onNavigate,
  prefilledCode
}: {
  activeView: string;
  onNavigate: (view: string) => void;
  prefilledCode?: string;
}) {
  const [, setTick] = useState(0);

  useEffect(() => {
    return SPDatabase.subscribe(() => setTick(t => t + 1));
  }, []);

  if (activeView === 'PUBLIC_GATEWAY') return <SPPublicPortalView onNavigate={onNavigate} prefilledCode={prefilledCode} />;
  if (activeView === 'MERCHANT_LOGIN') return <SPMerchantLoginView onNavigate={onNavigate} />;
  if (activeView === 'CODE_RESOLVER') return <SPCodeResolverView prefilledCode={prefilledCode} />;
  if (activeView === 'STATE_MACHINE') return <SPStateMachineView />;
  if (activeView === 'RECEIPTS') return <SPReceiptCenterView />;
  if (activeView === 'ESCROW') return <SPEscrowSettlementView />;
  if (activeView === 'DISPUTES') return <SPDisputeConsoleView />;
  if (activeView === 'ERP_BINDING') return <SPSchoolPayERPView />;
  if (activeView === 'RECON_BI') return <SPReconBIView />;
  if (activeView === 'SWALLET') return <SPSWalletView />;
  if (activeView === 'GUARDIAN_MOBILE') return <SPGuardianMobileView />;
  if (activeView === 'ADMIN_WEBHOOKS') return <SPAdminConsoleView />;

  return <SPPublicPortalView onNavigate={onNavigate} prefilledCode={prefilledCode} />;
}

/* Native SchoolPay Workspace Header Component */
function SchoolPayHeader({
  title,
  subtitle,
  icon: Icon,
  codeBadge,
  statusText,
  actions
}: {
  title: string;
  subtitle: string;
  icon: any;
  codeBadge?: string;
  statusText?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-stone-900 flex items-center justify-center text-white shrink-0 shadow-sm">
          <Icon className="w-5 h-5 text-amber-400" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black text-slate-900 tracking-tight uppercase">{title}</h2>
            {codeBadge && (
              <span className="text-[10px] font-black text-amber-800 uppercase tracking-wider bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg">
                {codeBadge}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 font-medium">{subtitle}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {statusText && (
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold uppercase tracking-wider">
            {statusText}
          </span>
        )}
        {actions}
      </div>
    </div>
  );
}

const StudioHeader = ({ traceabilityId, ...props }: any) => <SchoolPayHeader codeBadge={traceabilityId} {...props} />;

/* =========================================================================
   1. UNIVERSAL PAYMENT PORTAL & DIRECTORY (JDP-PUB-001, JDP-PUB-002)
   ========================================================================= */
function SPPublicPortalView({ onNavigate, prefilledCode }: { onNavigate: (v: string) => void; prefilledCode?: string }) {
  const [shortCode, setShortCode] = useState(prefilledCode || '884192');
  const [resolved, setResolved] = useState<PaymentObligation | null>(null);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const res = SPDatabase.resolveCode(shortCode);
    setResolved(res);
  };

  return (
    <div className="space-y-6">
      <StudioHeader
        title="Universal SchoolPay Payment Gateway"
        subtitle="6-digit payment code lookup across mobile money, card rails, and agency banking"
        icon={CreditCard}
        traceabilityId="JDP-PUB-001 • JDP-PUB-002"
        statusText="Payment Switch Ready"
        actions={
          <button
            onClick={() => onNavigate('MERCHANT_LOGIN')}
            className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition cursor-pointer"
          >
            Merchant Portal SSO
          </button>
        }
      />

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <form onSubmit={handleLookup} className="flex gap-3">
          <input
            type="text"
            required
            placeholder="Enter 6-digit payment code (e.g. 884192)"
            value={shortCode}
            onChange={e => setShortCode(e.target.value)}
            className="flex-1 px-4 py-3 text-sm font-mono border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs transition cursor-pointer"
          >
            Resolve Payment Code
          </button>
        </form>

        {resolved && (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="px-2 py-0.5 bg-amber-100 text-amber-900 font-mono font-bold text-xs rounded">Code: {resolved.code}</span>
                <h4 className="text-base font-bold text-slate-900 mt-1">{resolved.studentName}</h4>
                <p className="text-xs text-slate-500">{resolved.institutionName} • LIN: {resolved.studentLin}</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 font-bold uppercase">Outstanding Amount</span>
                <p className="text-xl font-black font-mono text-slate-900">UGX {resolved.totalDueUGX.toLocaleString()}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => onNavigate('CODE_RESOLVER')}
                className="px-5 py-2 bg-emerald-600 text-white font-extrabold text-xs rounded-xl hover:bg-emerald-500 cursor-pointer"
              >
                Proceed to Checkout Switch
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <h4 className="text-xs font-black uppercase text-slate-800">USSD Direct Payment Rail (*165#)</h4>
          <p className="text-xs text-slate-600">MTN MoMo: Dial *165# &gt; SchoolPay &gt; Enter Code <span className="font-mono font-bold">884192</span> &gt; Enter PIN.</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <h4 className="text-xs font-black uppercase text-slate-800">Agent Banking & Counter Rail</h4>
          <p className="text-xs text-slate-600">Present code <span className="font-mono font-bold">884192</span> at any Stanbic, Centenary, or dfcu branch.</p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   2. MERCHANT AUTHENTICATION SSO (JDP-AUTH-001)
   ========================================================================= */
function SPMerchantLoginView({ onNavigate }: { onNavigate: (v: string) => void }) {
  const [operatorId, setOperatorId] = useState('MERCH-STANBIC-01');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('STATE_MACHINE');
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 my-4">
      <StudioHeader
        title="Merchant Console SSO"
        subtitle="Bank operator, bursar, and financial administrator access portal"
        icon={Key}
        traceabilityId="JDP-AUTH-001"
      />

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Merchant Operator ID</label>
            <input
              type="text"
              required
              value={operatorId}
              onChange={e => setOperatorId(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">2FA MFA Verification PIN</label>
            <input
              type="password"
              required
              value="••••••••"
              readOnly
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs transition cursor-pointer"
          >
            Authenticate Merchant Operator
          </button>
        </form>
      </div>
    </div>
  );
}

/* =========================================================================
   3. CODE RESOLVER & CHECKOUT SWITCH (JDP-ID-001, JDP-RAIL-001)
   ========================================================================= */
function SPCodeResolverView({ prefilledCode }: { prefilledCode?: string }) {
  const [code, setCode] = useState(prefilledCode || '884192');
  const [rail, setRail] = useState<'MTN_MOMO' | 'AIRTEL_MONEY' | 'VISA_CARD' | 'AGENT_BANKING'>('MTN_MOMO');
  const [payerPhone, setPayerPhone] = useState('+256772999000');
  const [payAmount, setPayAmount] = useState(500000);
  const [lastTx, setLastTx] = useState<SchoolPayTx | null>(null);

  const resolved = SPDatabase.resolveCode(code);

  const handleExecutePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resolved) return;
    const tx = SPDatabase.executeCheckout(code, payAmount, rail, payerPhone, 'Guardian Payer');
    setLastTx(tx);
  };

  return (
    <div className="space-y-6">
      <StudioHeader
        title="Multi-Rail Checkout Switch"
        subtitle="Real-time shortcode resolution and instant transaction execution"
        icon={Search}
        traceabilityId="JDP-ID-001 • JDP-RAIL-001"
      />

      {resolved ? (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <div><span className="text-slate-400 font-bold uppercase text-[10px]">Shortcode:</span> <span className="font-mono font-bold block">{resolved.code}</span></div>
            <div><span className="text-slate-400 font-bold uppercase text-[10px]">Student Name:</span> <span className="font-bold block">{resolved.studentName}</span></div>
            <div><span className="text-slate-400 font-bold uppercase text-[10px]">Institution:</span> <span className="font-bold block">{resolved.institutionName}</span></div>
            <div><span className="text-slate-400 font-bold uppercase text-[10px]">Amount Due:</span> <span className="font-mono font-black text-amber-600 block">UGX {resolved.totalDueUGX.toLocaleString()}</span></div>
          </div>

          {lastTx ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-xs">
              <p className="font-bold text-emerald-900">Transaction Executed Successfully!</p>
              <p className="font-mono text-emerald-800">TX Ref: {lastTx.transactionRef} • State: {lastTx.state} • Net Settlement: UGX {lastTx.netSettlementUGX.toLocaleString()} (Fee: UGX {lastTx.feeUGX.toLocaleString()})</p>
              <button onClick={() => setLastTx(null)} className="px-3 py-1 bg-emerald-200 text-emerald-900 font-bold rounded-lg text-xs cursor-pointer">New Payment</button>
            </div>
          ) : (
            <form onSubmit={handleExecutePayment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Select Payment Rail Channel</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {(['MTN_MOMO', 'AIRTEL_MONEY', 'VISA_CARD', 'AGENT_BANKING'] as const).map(r => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRail(r)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${rail === r ? 'bg-amber-50 border-amber-500 text-amber-950 shadow-2xs' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}
                    >
                      {r.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Payer Mobile / Card Contact</label>
                  <input
                    type="text"
                    required
                    value={payerPhone}
                    onChange={e => setPayerPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Payment Amount (UGX)</label>
                  <input
                    type="number"
                    required
                    value={payAmount}
                    onChange={e => setPayAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl transition cursor-pointer"
              >
                Authorize Payment of UGX {payAmount.toLocaleString()} via {rail.replace('_', ' ')}
              </button>
            </form>
          )}
        </div>
      ) : (
        <p className="text-xs text-slate-500 text-center py-12">Invalid payment shortcode.</p>
      )}
    </div>
  );
}

/* =========================================================================
   4. TRANSACTION STATE MACHINE (JDP-LFC-001)
   ========================================================================= */
function SPStateMachineView() {
  return (
    <div className="space-y-6">
      <SchoolPayHeader
        title="Transaction State Machine"
        subtitle="Real-time lifecycle state engine: PENDING → AUTHORIZED → CAPTURED → SETTLED"
        icon={RefreshCw}
        codeBadge="JDP-LFC-001"
      />

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 uppercase text-slate-400 text-[10px] font-black border-b">
            <tr>
              <th className="py-2.5 px-3">Transaction Ref</th>
              <th className="py-2.5 px-3">Shortcode</th>
              <th className="py-2.5 px-3">Payer Contact</th>
              <th className="py-2.5 px-3">Rail</th>
              <th className="py-2.5 px-3">Gross Amount</th>
              <th className="py-2.5 px-3">Gateway Fee</th>
              <th className="py-2.5 px-3">Net Settlement</th>
              <th className="py-2.5 px-3">State</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {SPDatabase.transactions.map(tx => (
              <tr key={tx.id} className="hover:bg-slate-50">
                <td className="py-3 px-3 font-mono font-bold text-slate-900">{tx.transactionRef}</td>
                <td className="py-3 px-3 font-mono text-amber-700 font-bold">{tx.paymentCode}</td>
                <td className="py-3 px-3 font-mono">{tx.phoneNumber}</td>
                <td className="py-3 px-3"><span className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded font-bold">{tx.rail}</span></td>
                <td className="py-3 px-3 font-mono font-bold">UGX {tx.amountUGX.toLocaleString()}</td>
                <td className="py-3 px-3 font-mono text-slate-400">UGX {tx.feeUGX.toLocaleString()}</td>
                <td className="py-3 px-3 font-mono text-emerald-600 font-bold">UGX {tx.netSettlementUGX.toLocaleString()}</td>
                <td className="py-3 px-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                    tx.state === 'SETTLED' ? 'bg-emerald-100 text-emerald-800' : 
                    tx.state === 'PENDING' ? 'bg-slate-100 text-slate-800' :
                    tx.state === 'AUTHORIZED' ? 'bg-blue-100 text-blue-800' :
                    tx.state === 'CAPTURED' ? 'bg-indigo-100 text-indigo-800' :
                    tx.state === 'FAILED' ? 'bg-red-100 text-red-800' :
                    tx.state === 'REVERSED' ? 'bg-purple-100 text-purple-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {tx.state}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================================================================
   5. RECEIPT CENTER (JDP-RCP-001)
   ========================================================================= */
function SPReceiptCenterView() {
  return (
    <div className="space-y-6">
      <StudioHeader
        title="SMS & Digital Receipt Dispatch Center"
        subtitle="Automated payment confirmation notifications and SMS log"
        icon={Receipt}
        traceabilityId="JDP-RCP-001"
      />

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
        {SPDatabase.transactions.map(tx => (
          <div key={tx.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-mono font-bold text-amber-800">{tx.receiptNumber}</span>
              <span className="text-[10px] text-slate-400">{tx.timestamp}</span>
            </div>
            <p className="font-bold text-slate-900">Paid Amount: UGX {tx.amountUGX.toLocaleString()} via {tx.rail}</p>
            <p className="text-slate-600 font-mono">Dispatched to SMS: {tx.phoneNumber} (Status: DELIVERED)</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   6. ESCROW SETTLEMENT LEDGER (JDP-STL-001)
   ========================================================================= */
function SPEscrowSettlementView() {
  const [institution, setInstitution] = useState('Alpha Academy Secondary School');
  const [createdBatch, setCreatedBatch] = useState<string | null>(null);

  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    const batch = SPDatabase.createEscrowBatch(institution);
    if (batch) setCreatedBatch(batch.batchRef);
  };

  return (
    <div className="space-y-6">
      <StudioHeader
        title="Escrow Ledger & Bank Settlement"
        subtitle="Net merchant payout aggregation and bank settlement batching"
        icon={Landmark}
        traceabilityId="JDP-STL-001"
      />

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <form onSubmit={handleCreateBatch} className="flex gap-3">
          <input
            type="text"
            value={institution}
            onChange={e => setInstitution(e.target.value)}
            className="px-3 py-2 text-xs border border-slate-200 rounded-xl flex-1 bg-white"
          />
          <button type="submit" className="px-5 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition cursor-pointer">
            Generate Bank Settlement Batch
          </button>
        </form>

        {createdBatch && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-bold">
            Settlement Batch {createdBatch} Generated & Dispatched to Bank Clearing!
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 uppercase text-slate-400 text-[10px] font-black border-b">
              <tr>
                <th className="py-2.5 px-3">Batch Reference</th>
                <th className="py-2.5 px-3">Institution & Bank</th>
                <th className="py-2.5 px-3">Total Batch Payout</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SPDatabase.escrowBatches.map(b => (
                <tr key={b.id} className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-mono font-bold text-slate-900">{b.batchRef}</td>
                  <td className="py-3 px-3 font-bold">{b.institutionName} ({b.bankName})</td>
                  <td className="py-3 px-3 font-mono font-black text-emerald-600">UGX {b.netPayoutUGX.toLocaleString()}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[10px] font-extrabold uppercase">{b.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   7. DISPUTE EXCEPTION CONSOLE (JDP-DJDP-001)
   ========================================================================= */
function SPDisputeConsoleView() {
  return (
    <div className="space-y-6">
      <StudioHeader
        title="Dispute & Exception Console"
        subtitle="Dual-authorization refund request and payment reconciliation dispute manager"
        icon={AlertTriangle}
        traceabilityId="JDP-DJDP-001"
      />

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center text-xs">
          <div>
            <span className="font-mono font-bold text-slate-900">DIJDP-88210</span>
            <p className="font-bold text-slate-800 mt-1">Reason: Duplicate payment deduction (UGX 1,450,000)</p>
            <p className="text-[10px] text-slate-500">Target TX: JDP-TX-88901</p>
          </div>
          <div className="space-x-2">
            <button className="px-3 py-1 bg-emerald-600 text-white rounded-lg font-bold text-xs hover:bg-emerald-500 cursor-pointer">
              Approve Refund
            </button>
            <button className="px-3 py-1 bg-rose-600 text-white rounded-lg font-bold text-xs hover:bg-rose-500 cursor-pointer">
              Reject Dispute
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   8. ERP IDENTITY BINDING (JDP-ERP-001)
   ========================================================================= */
function SPSchoolPayERPView() {
  const obligationsList = Object.values(SPDatabase.obligations);

  return (
    <div className="space-y-6">
      <StudioHeader
        title="ERP Identity Binding Roster"
        subtitle="SchoolPay payment shortcode binding to school LIN student records"
        icon={Building}
        traceabilityId="JDP-ERP-001"
      />

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 uppercase text-slate-400 text-[10px] font-black border-b">
            <tr>
              <th className="py-2.5 px-3">Payment Shortcode</th>
              <th className="py-2.5 px-3">Student Name</th>
              <th className="py-2.5 px-3">LIN Code</th>
              <th className="py-2.5 px-3">Institution</th>
              <th className="py-2.5 px-3">Amount Due</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {obligationsList.map(c => (
              <tr key={c.code} className="hover:bg-slate-50">
                <td className="py-3 px-3 font-mono font-bold text-amber-700">{c.code}</td>
                <td className="py-3 px-3 font-bold">{c.studentName}</td>
                <td className="py-3 px-3 font-mono">{c.studentLin}</td>
                <td className="py-3 px-3">{c.institutionName}</td>
                <td className="py-3 px-3 font-mono font-bold">UGX {c.totalDueUGX.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================================================================
   9. BANK RECONCILIATION BI (JDP-ERP-002)
   ========================================================================= */
function SPReconBIView() {
  return (
    <div className="space-y-6">
      <StudioHeader
        title="Bank Reconciliation BI Dashboard"
        subtitle="Collections vs bank statement reconciliation analytics and variance tracking"
        icon={RefreshCw}
        traceabilityId="JDP-ERP-002"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-black uppercase text-slate-400">Total Gateway Collections</span>
          <p className="text-xl font-black font-mono text-emerald-600">UGX 1,450,000</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-black uppercase text-slate-400">Bank Statement Credits</span>
          <p className="text-xl font-black font-mono text-blue-700">UGX 1,450,000</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-black uppercase text-slate-400">Reconciliation Variance</span>
          <p className="text-xl font-black font-mono text-slate-900">UGX 0.00 (100% Matched)</p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   10. GUARDIAN S-WALLET CONSOLE (JDP-WLT-001)
   ========================================================================= */
function SPSWalletView() {
  const [studentLin, setStudentLin] = useState('LIN-2026-001');
  const [topupAmount, setTopupAmount] = useState(50000);

  const walletsList = Object.values(SPDatabase.wallets);

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    SPDatabase.depositSWallet(studentLin, topupAmount);
  };

  return (
    <div className="space-y-6">
      <StudioHeader
        title="Guardian S-Wallet Console"
        subtitle="Student digital pocket money wallet, deposit execution, and daily canteen caps"
        icon={Wallet}
        traceabilityId="JDP-WLT-001"
      />

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <form onSubmit={handleDeposit} className="flex gap-3">
          <input
            type="number"
            value={topupAmount}
            onChange={e => setTopupAmount(Number(e.target.value))}
            className="px-3 py-2 text-xs border border-slate-200 rounded-xl font-mono"
            placeholder="Deposit amount (UGX)"
          />
          <button type="submit" className="px-5 py-2 bg-emerald-600 text-white font-extrabold text-xs rounded-xl hover:bg-emerald-500 cursor-pointer">
            Top Up S-Wallet Balance
          </button>
        </form>

        <div className="space-y-3">
          {walletsList.map(w => (
            <div key={w.studentLin} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center text-xs">
              <div>
                <p className="font-bold text-slate-900">{w.studentName} ({w.studentLin})</p>
                <p className="text-slate-500 text-[10px]">Daily Canteen Spend Limit: UGX {w.dailyCapUGX.toLocaleString()}</p>
              </div>
              <p className="font-black font-mono text-lg text-emerald-600">UGX {w.walletBalanceUGX.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   11. GUARDIAN MOBILE APP EXPERIENCE (JDP-MOB-001)
   ========================================================================= */
function SPGuardianMobileView() {
  return (
    <div className="max-w-md mx-auto space-y-6 my-4">
      <StudioHeader
        title="Guardian Mobile App"
        subtitle="Mobile fee payment, receipt QR scanner, and S-wallet manager"
        icon={Smartphone}
        traceabilityId="JDP-MOB-001"
      />

      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <span className="font-bold text-xs text-amber-400">SchoolPay Mobile</span>
          <span className="text-[10px] text-slate-400 font-mono">v4.2 Active</span>
        </div>

        <div className="p-4 bg-slate-800/80 rounded-xl space-y-1">
          <span className="text-[10px] font-black uppercase text-slate-400">Linked Student</span>
          <p className="font-bold text-sm">John Doe (Senior 1)</p>
          <p className="text-xs text-amber-400 font-mono">Payment Shortcode: 884192</p>
        </div>

        <div className="p-4 bg-slate-800/80 rounded-xl flex justify-between items-center">
          <div>
            <span className="text-[10px] font-black uppercase text-slate-400">Fee Balance</span>
            <p className="font-black text-xl font-mono text-emerald-400">UGX 1,600,000</p>
          </div>
          <button className="px-4 py-2 bg-amber-500 text-slate-950 font-black text-xs rounded-xl">
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   12. MERCHANT WEBHOOKS & API KEYS (JDP-ADMIN-001)
   ========================================================================= */
function SPAdminConsoleView() {
  const [scope, setScope] = useState('COLLECTIONS_READ_WRITE');

  const handleAddKey = (e: React.FormEvent) => {
    e.preventDefault();
    SPDatabase.generateAPIKey(scope);
  };

  return (
    <div className="space-y-6">
      <StudioHeader
        title="Developer API & Webhooks"
        subtitle="API credential key generator and merchant real-time event subscriptions"
        icon={ShieldCheck}
        traceabilityId="JDP-ADMIN-001"
      />

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <form onSubmit={handleAddKey} className="flex gap-3">
          <input
            type="text"
            required
            value={scope}
            onChange={e => setScope(e.target.value)}
            className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
            placeholder="API Key Scope..."
          />
          <button type="submit" className="px-5 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition cursor-pointer">
            Generate Merchant API Key
          </button>
        </form>

        <div className="space-y-2">
          <h4 className="text-xs font-black uppercase text-slate-800">Active API Keys</h4>
          {SPDatabase.apiKeys.map(k => (
            <div key={k.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center text-xs font-mono">
              <span>{k.key} ({k.scope})</span>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[10px] font-bold">{k.createdDate}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
