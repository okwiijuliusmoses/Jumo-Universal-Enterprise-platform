import React, { useState, useEffect } from "react";
import { 
  CreditCard, Shield, List, RefreshCw, Plus, CheckCircle2, XCircle,
  Building2, DollarSign, FileText, Search, ArrowUpRight, TrendingUp,
  Layers, Users, Clock, Activity, ArrowDownRight, Settings, Repeat,
  AlertCircle, Copy, Printer, Share2, Filter, Check, RotateCcw, Link2, Download
} from "lucide-react";

export interface DigitalPayApp {
  id: string;
  name: string;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  permissions: string[];
  supported_currencies: string[];
  channels: string[];
}

export interface DigitalPayMerchant {
  id: string;
  name: string;
  type: "Institution" | "Merchant" | "Agent";
  status: "ACTIVE" | "PENDING";
  created_at: string;
}

export interface DigitalPayMandate {
  id: string;
  payer: string;
  merchant: string;
  amount: number;
  currency: string;
  frequency: string;
  status: "ACTIVE" | "PENDING" | "CANCELLED";
}

export interface SovereignPayCode {
  payCode: string;
  institutionName: string;
  domain: string;
  defaultCurrency: string;
  active: boolean;
  settlementAccountId: string;
  allowedRails: string[];
  splitConfig: { platformFeeRate: number; merchantNetRate: number };
}

export interface DigitalPayReceipt {
  transactionId: string;
  publicReference: string;
  payCode: string;
  institutionName: string;
  domain: string;
  rail: string;
  grossAmount: number;
  platformFee: number;
  merchantNetAmount: number;
  currency: string;
  status: "SETTLED" | "PENDING" | "REFUNDED";
  faapJournalRef: string;
  timestamp: string;
}

export interface SettlementBatch {
  batchId: string;
  date: string;
  totalTransactions: number;
  totalGrossVolume: number;
  totalPlatformFees: number;
  totalMerchantNetSettled: number;
  status: string;
  faapBatchRef: string;
}

export function DigitalPayWorkspace() {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [applications, setApplications] = useState<DigitalPayApp[]>([]);
  const [merchants, setMerchants] = useState<DigitalPayMerchant[]>([]);
  const [mandates, setMandates] = useState<DigitalPayMandate[]>([]);
  const [payCodes, setPayCodes] = useState<SovereignPayCode[]>([]);
  const [receipts, setReceipts] = useState<DigitalPayReceipt[]>([]);
  const [settlements, setSettlements] = useState<SettlementBatch[]>([]);
  
  const [loading, setLoading] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals & Drawers
  const [showGeneratePRNModal, setShowGeneratePRNModal] = useState<boolean>(false);
  const [showProcessPayModal, setShowProcessPayModal] = useState<boolean>(false);
  const [showAddMerchantModal, setShowAddMerchantModal] = useState<boolean>(false);
  const [showAddMandateModal, setShowAddMandateModal] = useState<boolean>(false);
  const [showRefundModal, setShowRefundModal] = useState<boolean>(false);
  const [selectedReceipt, setSelectedReceipt] = useState<DigitalPayReceipt | null>(null);
  const [selectedPRN, setSelectedPRN] = useState<SovereignPayCode | null>(null);

  // Form State
  const [prnForm, setPrnForm] = useState({
    payer: "Mbabazi John",
    institution: "Uganda Martyrs High School & University Campus",
    amount: 1200000,
    currency: "UGX",
    purpose: "Term 1 School Fees",
    channel: "MTN_MOMO"
  });

  const [payForm, setPayForm] = useState({
    payCode: "",
    rail: "MTN_MOMO",
    amount: 1200000,
    currency: "UGX",
    idempotencyKey: ""
  });

  const [merchantForm, setMerchantForm] = useState({
    name: "",
    type: "Institution"
  });

  const [mandateForm, setMandateForm] = useState({
    payer: "",
    merchant: "",
    amount: 500000,
    currency: "UGX",
    frequency: "Monthly"
  });

  const [refundTxId, setRefundTxId] = useState<string>("");

  // Simulator
  const [simAmount, setSimAmount] = useState<number>(1000000);
  const [simFeeRate, setSimFeeRate] = useState<number>(0.015);

  // Search/Filters
  const [prnSearch, setPrnSearch] = useState<string>("");
  const [txSearch, setTxSearch] = useState<string>("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [appRes, merchRes, mandRes, prnRes, txRes, setRes] = await Promise.all([
        fetch("/api/v1/digitalpay/applications"),
        fetch("/api/v1/digitalpay/merchants"),
        fetch("/api/v1/digitalpay/mandates"),
        fetch("/api/v1/digitalpay/prn"),
        fetch("/api/v1/digitalpay/transactions"),
        fetch("/api/v1/digitalpay/settlements")
      ]);

      if (appRes.ok) setApplications((await appRes.json()).applications || []);
      if (merchRes.ok) setMerchants((await merchRes.json()).merchants || []);
      if (mandRes.ok) setMandates((await mandRes.json()).mandates || []);
      if (prnRes.ok) {
        const data = await prnRes.json();
        setPayCodes(data.payCodes || []);
        if (data.payCodes && data.payCodes.length > 0) {
          setPayForm(prev => ({ ...prev, payCode: data.payCodes[0].payCode }));
        }
      }
      if (txRes.ok) setReceipts((await txRes.json()).receipts || []);
      if (setRes.ok) setSettlements((await setRes.json()).batches || []);
    } catch (err) {
      console.error("Failed to fetch DigitalPay data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleApp = async (id: string) => {
    try {
      const res = await fetch(`/api/v1/digitalpay/applications/${id}/toggle`, { method: "POST" });
      if (res.ok) {
        showToast("Application status updated successfully");
        fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleGeneratePRN = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/v1/digitalpay/prn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prnForm)
      });
      if (res.ok) {
        const data = await res.json();
        showToast(`Payment Code (PRN) generated: ${data.payCode.payCode}`);
        setShowGeneratePRNModal(false);
        fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleProcessPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const ik = payForm.idempotencyKey || `IK-${Date.now()}`;
      const res = await fetch("/api/v1/digitalpay/process-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payForm, idempotencyKey: ik })
      });
      if (res.ok) {
        const data = await res.json();
        showToast(`Payment processed! Receipt: ${data.receipt.publicReference}`);
        setShowProcessPayModal(false);
        fetchData();
      } else {
        const err = await res.json();
        alert(`Payment error: ${err.error}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddMerchant = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/v1/digitalpay/merchants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(merchantForm)
      });
      if (res.ok) {
        showToast("Merchant registered successfully!");
        setShowAddMerchantModal(false);
        setMerchantForm({ name: "", type: "Institution" });
        fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddMandate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/v1/digitalpay/mandates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mandateForm)
      });
      if (res.ok) {
        showToast("Auto payment mandate created!");
        setShowAddMandateModal(false);
        setMandateForm({ payer: "", merchant: "", amount: 500000, currency: "UGX", frequency: "Monthly" });
        fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleTriggerSettlement = async () => {
    try {
      const res = await fetch("/api/v1/digitalpay/settlements/trigger", { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        showToast(`Settlement Batch ${data.batch.batchId} created and balanced!`);
        fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleRefund = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/v1/digitalpay/refund", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ txId: refundTxId })
      });
      if (res.ok) {
        showToast(`Transaction ${refundTxId} marked as REFUNDED`);
        setShowRefundModal(false);
        setRefundTxId("");
        fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handlePostGLReconcile = async (txId: string) => {
    try {
      const res = await fetch("/api/v1/digitalpay/reconcile-and-post-gl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ txId, bankAccount: "1010", remarks: "DigitalPay Reconciled to Accounting GL" })
      });
      if (res.ok) {
        showToast("Successfully posted reconciliation GL entry to QuickBooks Accounting!");
        fetchData();
      } else {
        const err = await res.json();
        alert(`Reconciliation error: ${err.error}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Calculations
  const totalGrossCollections = receipts.reduce((sum, r) => sum + (r.status === "SETTLED" ? r.grossAmount : 0), 0);
  const totalPlatformFees = receipts.reduce((sum, r) => sum + (r.status === "SETTLED" ? r.platformFee : 0), 0);
  const totalNetSettled = receipts.reduce((sum, r) => sum + (r.status === "SETTLED" ? r.merchantNetAmount : 0), 0);
  const activePRNCount = payCodes.filter(p => p.active).length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-lg shadow-xl flex items-center space-x-2 border border-slate-700 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 border border-slate-200 rounded-2xl shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">DigitalPay Gateway Application</h2>
            <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-black border border-blue-200 rounded-full">STANDALONE APP</span>
          </div>
          <p className="text-slate-500 text-sm mt-1">Sovereign Multi-Rail Payment Gateway, PRN Engine & Clearing House</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={fetchData} 
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            title="Refresh Gateway Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button 
            onClick={() => setShowGeneratePRNModal(true)} 
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center space-x-2 shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Generate Payment Code (PRN)</span>
          </button>
          <button 
            onClick={() => setShowProcessPayModal(true)} 
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center space-x-2 shadow-sm transition-colors"
          >
            <CreditCard className="w-4 h-4" />
            <span>Process Payment</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="bg-white border border-slate-200 rounded-xl p-1.5 flex overflow-x-auto shadow-sm gap-1 scrollbar-none">
        {[
          { id: "overview", label: "Overview" },
          { id: "prn", label: `Payment Codes / PRN (${payCodes.length})` },
          { id: "transactions", label: `Transactions (${receipts.length})` },
          { id: "receipts", label: "Collections & Receipts" },
          { id: "merchants", label: `Merchants (${merchants.length})` },
          { id: "channels", label: "Payment Channels & Rates" },
          { id: "settlements", label: `Settlements (${settlements.length})` },
          { id: "reconciliation", label: "Reconciliation & GL Post" },
          { id: "refunds", label: "Refunds & Reversals" },
          { id: "mandates", label: `Mandates (${mandates.length})` },
          { id: "applications", label: `Applications (${applications.length})` },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg whitespace-nowrap transition-all ${
              activeTab === t.id 
                ? "bg-slate-900 text-white shadow-sm" 
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-medium text-slate-500">Gross Collections</span>
                <span className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><DollarSign className="w-4 h-4" /></span>
              </div>
              <p className="text-2xl font-black text-slate-900 mt-2">{totalGrossCollections.toLocaleString()} <span className="text-xs text-slate-400 font-normal">UGX</span></p>
              <span className="text-[10px] text-emerald-600 font-bold mt-1 inline-block">100% Verified Switch Volume</span>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-medium text-slate-500">Active Sovereign PayCodes</span>
                <span className="p-2 bg-blue-50 text-blue-600 rounded-lg"><CreditCard className="w-4 h-4" /></span>
              </div>
              <p className="text-2xl font-black text-slate-900 mt-2">{activePRNCount} / {payCodes.length}</p>
              <span className="text-[10px] text-blue-600 font-bold mt-1 inline-block">Active PRNs Ready for Payment</span>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-medium text-slate-500">Platform Clearing Fees</span>
                <span className="p-2 bg-amber-50 text-amber-600 rounded-lg"><TrendingUp className="w-4 h-4" /></span>
              </div>
              <p className="text-2xl font-black text-slate-900 mt-2">{totalPlatformFees.toLocaleString()} <span className="text-xs text-slate-400 font-normal">UGX</span></p>
              <span className="text-[10px] text-amber-600 font-bold mt-1 inline-block">1.5% Average Clearing Fee</span>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-medium text-slate-500">Net Merchant Settlement</span>
                <span className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><CheckCircle2 className="w-4 h-4" /></span>
              </div>
              <p className="text-2xl font-black text-slate-900 mt-2">{totalNetSettled.toLocaleString()} <span className="text-xs text-slate-400 font-normal">UGX</span></p>
              <span className="text-[10px] text-indigo-600 font-bold mt-1 inline-block">Ready for Bank Settlement</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900">Multi-Rail Payment Gateway Architecture</h3>
              <p className="text-xs text-slate-500">Active settlement connections across major mobile networks and clearing banks.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { name: "MTN Mobile MoMo", code: "MTN_MOMO", status: "ACTIVE", latency: "140ms", color: "amber" },
                  { name: "Airtel Money Switch", code: "AIRTEL_MONEY", status: "ACTIVE", latency: "180ms", color: "rose" },
                  { name: "Stanbic Bank EFT / RTGS", code: "BANK_EFT", status: "ACTIVE", latency: "310ms", color: "blue" },
                  { name: "Visa / Mastercard Gateway", code: "VISA_MASTERCARD", status: "ACTIVE", latency: "420ms", color: "indigo" },
                ].map((rail, idx) => (
                  <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{rail.name}</h4>
                      <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">{rail.code}</span>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">ONLINE</span>
                      <span className="text-[10px] text-slate-400 block mt-1">{rail.latency}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900">Recent Gateway Activity</h3>
              <div className="space-y-3">
                {receipts.slice(0, 4).map((r, i) => (
                  <div key={i} className="p-3 border border-slate-100 rounded-lg text-xs space-y-1">
                    <div className="flex justify-between items-center font-bold text-slate-900">
                      <span>{r.publicReference}</span>
                      <span className="text-emerald-600">+{r.grossAmount.toLocaleString()} UGX</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>{r.payCode} ({r.rail})</span>
                      <span>{r.status}</span>
                    </div>
                  </div>
                ))}
                {receipts.length === 0 && (
                  <p className="text-xs text-slate-400 italic">No payments processed yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PAYMENT CODES / PRN */}
      {activeTab === "prn" && (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm space-y-4 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Sovereign Payment Code / PRN Registry</h3>
              <p className="text-xs text-slate-500">PayCodes generate persistent obligations for students, taxpayers, customers, and clients.</p>
            </div>
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search PRN or Institution..." 
                  value={prnSearch}
                  onChange={e => setPrnSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <button 
                onClick={() => setShowGeneratePRNModal(true)} 
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg flex items-center space-x-1 whitespace-nowrap"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New PRN</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-100 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                <tr>
                  <th className="p-3">Payment Code (PRN)</th>
                  <th className="p-3">Institution / Merchant</th>
                  <th className="p-3">Domain</th>
                  <th className="p-3">Currency</th>
                  <th className="p-3">Allowed Rails</th>
                  <th className="p-3">Fee Split</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {payCodes
                  .filter(p => p.payCode.toLowerCase().includes(prnSearch.toLowerCase()) || p.institutionName.toLowerCase().includes(prnSearch.toLowerCase()))
                  .map((p, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80">
                      <td className="p-3 font-mono font-bold text-blue-700">{p.payCode}</td>
                      <td className="p-3 font-medium text-slate-900">{p.institutionName}</td>
                      <td className="p-3 text-slate-500">{p.domain}</td>
                      <td className="p-3 font-medium">{p.defaultCurrency}</td>
                      <td className="p-3">
                        <div className="flex flex-wrap gap-1">
                          {p.allowedRails.map((r, i) => (
                            <span key={i} className="px-1.5 py-0.5 bg-slate-100 text-slate-700 text-[9px] font-mono rounded">{r}</span>
                          ))}
                        </div>
                      </td>
                      <td className="p-3 text-slate-500 text-[10px]">
                        Platform: {(p.splitConfig.platformFeeRate * 100).toFixed(1)}% | Net: {(p.splitConfig.merchantNetRate * 100).toFixed(1)}%
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${p.active ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"}`}>
                          {p.active ? "ACTIVE" : "INACTIVE"}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button 
                          onClick={() => {
                            setSelectedPRN(p);
                            setPayForm(prev => ({ ...prev, payCode: p.payCode }));
                            setShowProcessPayModal(true);
                          }} 
                          className="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded font-bold text-[10px]"
                        >
                          Pay
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: TRANSACTIONS */}
      {activeTab === "transactions" && (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm space-y-4 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-slate-900">Payment Transaction Log</h3>
              <p className="text-xs text-slate-500">Live transaction stream processed by the DigitalPay Sovereign Switch.</p>
            </div>
            <button 
              onClick={() => setShowProcessPayModal(true)} 
              className="px-3.5 py-1.5 bg-emerald-600 text-white font-bold text-xs rounded-lg flex items-center space-x-1"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Simulate Payment</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-100 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                <tr>
                  <th className="p-3">Transaction Ref</th>
                  <th className="p-3">PRN Code</th>
                  <th className="p-3">Institution</th>
                  <th className="p-3">Rail</th>
                  <th className="p-3 text-right">Gross Amount</th>
                  <th className="p-3 text-right">Platform Fee</th>
                  <th className="p-3 text-right">Merchant Net</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {receipts.map((r, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-slate-900">{r.publicReference}</td>
                    <td className="p-3 font-mono text-blue-600">{r.payCode}</td>
                    <td className="p-3 text-slate-800">{r.institutionName}</td>
                    <td className="p-3 font-mono text-xs">{r.rail}</td>
                    <td className="p-3 text-right font-bold text-slate-900">{r.grossAmount.toLocaleString()} {r.currency}</td>
                    <td className="p-3 text-right text-amber-600 font-mono">{r.platformFee.toLocaleString()}</td>
                    <td className="p-3 text-right text-emerald-600 font-bold font-mono">{r.merchantNetAmount.toLocaleString()}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        r.status === "SETTLED" ? "bg-emerald-100 text-emerald-800" :
                        r.status === "REFUNDED" ? "bg-rose-100 text-rose-800" : "bg-amber-100 text-amber-800"
                      }`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-1">
                      <button 
                        onClick={() => setSelectedReceipt(r)} 
                        className="px-2 py-1 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded text-[10px] font-bold"
                      >
                        Receipt
                      </button>
                      <button 
                        onClick={() => handlePostGLReconcile(r.transactionId)} 
                        className="px-2 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded text-[10px] font-bold"
                      >
                        Post GL
                      </button>
                    </td>
                  </tr>
                ))}
                {receipts.length === 0 && (
                  <tr>
                    <td colSpan={9} className="p-6 text-center text-slate-400 italic">No transactions found. Click "Simulate Payment" to test.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: COLLECTIONS & RECEIPTS */}
      {activeTab === "receipts" && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900">Official Payment Switch Receipts</h3>
          <p className="text-xs text-slate-500">Official receipts issued for institutional payments, tuition, e-tax, and utility collections.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {receipts.map((r, i) => (
              <div key={i} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3 relative hover:border-slate-300 transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono block">RECEIPT REF</span>
                    <p className="font-mono font-black text-slate-900 text-sm">{r.publicReference}</p>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">VERIFIED</span>
                </div>

                <div className="text-xs space-y-1">
                  <div className="flex justify-between text-slate-600">
                    <span>PayCode:</span>
                    <span className="font-mono text-blue-600">{r.payCode}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Institution:</span>
                    <span className="font-medium text-slate-900">{r.institutionName}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Rail Channel:</span>
                    <span className="font-mono">{r.rail}</span>
                  </div>
                  <div className="flex justify-between text-slate-900 font-bold pt-2 border-t border-slate-200 text-sm">
                    <span>Amount Paid:</span>
                    <span className="text-emerald-600">{r.grossAmount.toLocaleString()} {r.currency}</span>
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedReceipt(r)} 
                  className="w-full py-1.5 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg text-slate-700 font-bold text-xs flex items-center justify-center space-x-1"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  <span>View Printable Receipt</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: MERCHANTS & INSTITUTIONS */}
      {activeTab === "merchants" && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-slate-900">Merchants & Institutions Registry</h3>
              <p className="text-xs text-slate-500">Registered schools, universities, medical centers, and government collection points.</p>
            </div>
            <button 
              onClick={() => setShowAddMerchantModal(true)} 
              className="px-3.5 py-1.5 bg-blue-600 text-white font-bold text-xs rounded-lg flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Register Merchant</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-100 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                <tr>
                  <th className="p-3">Merchant ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Registration Date</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {merchants.map((m, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-slate-900">{m.id}</td>
                    <td className="p-3 font-medium text-slate-900">{m.name}</td>
                    <td className="p-3 text-slate-600">{m.type}</td>
                    <td className="p-3 text-slate-400">{new Date(m.created_at).toLocaleDateString()}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: PAYMENT CHANNELS & RATES */}
      {activeTab === "channels" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">Supported Payment Rails & Fee Schedule</h3>
            <p className="text-xs text-slate-500">Configured clearing rules and commission rates across channels.</p>

            <div className="space-y-3">
              {[
                { rail: "MTN Mobile Money", fee: "1.50%", max: "15,000 UGX", settlement: "T+0 Realtime" },
                { rail: "Airtel Money", fee: "1.50%", max: "15,000 UGX", settlement: "T+0 Realtime" },
                { rail: "Bank EFT / RTGS", fee: "0.80%", max: "25,000 UGX", settlement: "T+1 Next Business Day" },
                { rail: "Visa / Mastercard", fee: "2.80%", max: "No Cap", settlement: "T+2 Business Days" },
              ].map((c, i) => (
                <div key={i} className="p-3 border border-slate-100 rounded-xl bg-slate-50/50 flex justify-between items-center text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900">{c.rail}</h4>
                    <span className="text-[10px] text-slate-500">Settlement: {c.settlement}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-blue-600 text-xs block">{c.fee}</span>
                    <span className="text-[10px] text-slate-400">Cap: {c.max}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">Net Settlement Calculator & Simulator</h3>
            <p className="text-xs text-slate-500">Calculate gross clearing fee split before processing transactions.</p>

            <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Gross Payment Amount (UGX)</label>
                <input 
                  type="number" 
                  value={simAmount} 
                  onChange={e => setSimAmount(Number(e.target.value))} 
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Platform Clearing Fee Rate (%)</label>
                <input 
                  type="number" 
                  step="0.001"
                  value={simFeeRate} 
                  onChange={e => setSimFeeRate(Number(e.target.value))} 
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg font-bold text-slate-900"
                />
              </div>

              <div className="pt-2 border-t border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-600">Calculated Platform Fee:</span>
                  <span className="font-bold text-amber-600 font-mono">{(simAmount * simFeeRate).toLocaleString()} UGX</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Calculated Merchant Net:</span>
                  <span className="font-bold text-emerald-600 font-mono font-black text-sm">{(simAmount * (1 - simFeeRate)).toLocaleString()} UGX</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: SETTLEMENTS */}
      {activeTab === "settlements" && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-slate-900">Settlement & Clearing Reconciliation Batches</h3>
              <p className="text-xs text-slate-500">Automated end-of-day settlement runs creating clearing batches.</p>
            </div>
            <button 
              onClick={handleTriggerSettlement} 
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg flex items-center space-x-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Trigger Settlement Run</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-100 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                <tr>
                  <th className="p-3">Batch ID</th>
                  <th className="p-3">Date</th>
                  <th className="p-3 text-center">Tx Count</th>
                  <th className="p-3 text-right">Gross Volume</th>
                  <th className="p-3 text-right">Platform Fees</th>
                  <th className="p-3 text-right">Merchant Net Settled</th>
                  <th className="p-3">FAAP Ref</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {settlements.map((b, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-slate-900">{b.batchId}</td>
                    <td className="p-3 text-slate-600">{b.date}</td>
                    <td className="p-3 text-center font-bold">{b.totalTransactions}</td>
                    <td className="p-3 text-right font-bold text-slate-900">{b.totalGrossVolume.toLocaleString()} UGX</td>
                    <td className="p-3 text-right text-amber-600 font-mono">{b.totalPlatformFees.toLocaleString()}</td>
                    <td className="p-3 text-right text-emerald-600 font-bold font-mono">{b.totalMerchantNetSettled.toLocaleString()}</td>
                    <td className="p-3 font-mono text-[10px] text-blue-600">{b.faapBatchRef}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {settlements.length === 0 && (
                  <tr>
                    <td colSpan={8} className="p-6 text-center text-slate-400 italic">No settlement runs generated yet. Click "Trigger Settlement Run" above.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 8: PAYMENT RECONCILIATION & GL POST */}
      {activeTab === "reconciliation" && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Payment Reconciliation & Controlled GL Integration</h3>
            <p className="text-xs text-slate-500">Reconcile DigitalPay transactions directly into the QuickBooks General Ledger & Cash Book.</p>
          </div>

          <div className="overflow-x-auto border border-slate-100 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                <tr>
                  <th className="p-3">Transaction ID</th>
                  <th className="p-3">PRN Code</th>
                  <th className="p-3">Institution</th>
                  <th className="p-3 text-right">Gross Amount</th>
                  <th className="p-3">Settlement Status</th>
                  <th className="p-3">Accounting GL Link</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {receipts.map((r, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-slate-900">{r.publicReference}</td>
                    <td className="p-3 font-mono text-blue-600">{r.payCode}</td>
                    <td className="p-3 text-slate-800">{r.institutionName}</td>
                    <td className="p-3 text-right font-bold text-slate-900">{r.grossAmount.toLocaleString()} {r.currency}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">SETTLED</span>
                    </td>
                    <td className="p-3 font-mono text-[10px] text-slate-500">{r.faapJournalRef}</td>
                    <td className="p-3 text-right">
                      <button 
                        onClick={() => handlePostGLReconcile(r.transactionId)} 
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-[10px] font-bold flex items-center space-x-1 ml-auto"
                      >
                        <Link2 className="w-3 h-3" />
                        <span>Post to Accounting GL</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 9: REFUNDS & REVERSALS */}
      {activeTab === "refunds" && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-slate-900">Refunds & Payment Reversals</h3>
              <p className="text-xs text-slate-500">Initiate traceable reversals with full audit logging.</p>
            </div>
            <button 
              onClick={() => setShowRefundModal(true)} 
              className="px-3.5 py-1.5 bg-rose-600 text-white font-bold text-xs rounded-lg flex items-center space-x-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Initiate Refund</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-100 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                <tr>
                  <th className="p-3">Tx Ref</th>
                  <th className="p-3">PayCode</th>
                  <th className="p-3">Institution</th>
                  <th className="p-3 text-right">Amount</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {receipts.filter(r => r.status === "REFUNDED").map((r, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-slate-900">{r.publicReference}</td>
                    <td className="p-3 font-mono text-blue-600">{r.payCode}</td>
                    <td className="p-3 text-slate-800">{r.institutionName}</td>
                    <td className="p-3 text-right font-bold text-rose-600">{r.grossAmount.toLocaleString()} {r.currency}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 bg-rose-100 text-rose-800 text-[10px] font-bold rounded">REFUNDED</span>
                    </td>
                  </tr>
                ))}
                {receipts.filter(r => r.status === "REFUNDED").length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-slate-400 italic">No refunded transactions.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 10: MANDATES */}
      {activeTab === "mandates" && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-slate-900">Auto Payments & Recurring Mandates</h3>
              <p className="text-xs text-slate-500">Recurring payment agreements for tuition, subscriptions, and utilities.</p>
            </div>
            <button 
              onClick={() => setShowAddMandateModal(true)} 
              className="px-3.5 py-1.5 bg-blue-600 text-white font-bold text-xs rounded-lg flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Mandate</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-100 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                <tr>
                  <th className="p-3">Mandate ID</th>
                  <th className="p-3">Payer</th>
                  <th className="p-3">Merchant / Institution</th>
                  <th className="p-3 text-right">Amount</th>
                  <th className="p-3">Frequency</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mandates.map((m, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-slate-900">{m.id}</td>
                    <td className="p-3 font-medium text-slate-900">{m.payer}</td>
                    <td className="p-3 text-slate-600">{m.merchant}</td>
                    <td className="p-3 text-right font-bold text-slate-900">{m.amount.toLocaleString()} {m.currency}</td>
                    <td className="p-3 font-medium text-slate-700">{m.frequency}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 11: APPLICATIONS */}
      {activeTab === "applications" && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900">Registered Third-Party Payment Applications</h3>
          <p className="text-xs text-slate-500">External applications connected to the DigitalPay gateway (e.g. SchoolPay, URA E-Tax).</p>

          <div className="overflow-x-auto border border-slate-100 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                <tr>
                  <th className="p-3">Application ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Permissions</th>
                  <th className="p-3">Supported Channels</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.map((app, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-slate-900">{app.id}</td>
                    <td className="p-3 font-medium text-slate-900">{app.name}</td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {app.permissions.map((p, i) => (
                          <span key={i} className="px-1.5 py-0.5 bg-blue-50 text-blue-700 text-[9px] font-mono rounded">{p}</span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3 text-slate-500 text-[10px]">{app.channels.join(", ")}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${app.status === "ACTIVE" ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button 
                        onClick={() => handleToggleApp(app.id)} 
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-bold text-[10px]"
                      >
                        {app.status === "ACTIVE" ? "Suspend" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL 1: GENERATE PRN */}
      {showGeneratePRNModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-base">Generate Sovereign Payment Code (PRN)</h3>
              <button onClick={() => setShowGeneratePRNModal(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>
            <form onSubmit={handleGeneratePRN} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Institution / Merchant</label>
                <select 
                  value={prnForm.institution} 
                  onChange={e => setPrnForm(p => ({ ...p, institution: e.target.value }))}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                >
                  {merchants.map((m, i) => <option key={i} value={m.name}>{m.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Payer Name / Reference</label>
                <input 
                  type="text" 
                  value={prnForm.payer} 
                  onChange={e => setPrnForm(p => ({ ...p, payer: e.target.value }))}
                  required 
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg" 
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Payment Purpose</label>
                <input 
                  type="text" 
                  value={prnForm.purpose} 
                  onChange={e => setPrnForm(p => ({ ...p, purpose: e.target.value }))}
                  required 
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg" 
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Amount (UGX)</label>
                  <input 
                    type="number" 
                    value={prnForm.amount} 
                    onChange={e => setPrnForm(p => ({ ...p, amount: Number(e.target.value) }))}
                    required 
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg" 
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Channel Preference</label>
                  <select 
                    value={prnForm.channel} 
                    onChange={e => setPrnForm(p => ({ ...p, channel: e.target.value }))}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <option value="MTN_MOMO">MTN Mobile Money</option>
                    <option value="AIRTEL_MONEY">Airtel Money</option>
                    <option value="BANK_EFT">Bank EFT</option>
                    <option value="VISA_MASTERCARD">Visa / Mastercard</option>
                  </select>
                </div>
              </div>
              <div className="pt-3 flex justify-end space-x-2 border-t border-slate-200">
                <button type="button" onClick={() => setShowGeneratePRNModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg font-bold text-slate-600">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg">Generate PRN</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: PROCESS PAYMENT */}
      {showProcessPayModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-base">Process Sovereign Payment</h3>
              <button onClick={() => setShowProcessPayModal(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>
            <form onSubmit={handleProcessPayment} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Payment Code (PRN)</label>
                <select 
                  value={payForm.payCode} 
                  onChange={e => setPayForm(p => ({ ...p, payCode: e.target.value }))}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold"
                >
                  {payCodes.map((c, i) => (
                    <option key={i} value={c.payCode}>{c.payCode} — {c.institutionName}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Payment Rail</label>
                  <select 
                    value={payForm.rail} 
                    onChange={e => setPayForm(p => ({ ...p, rail: e.target.value }))}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <option value="MTN_MOMO">MTN Mobile Money</option>
                    <option value="AIRTEL_MONEY">Airtel Money</option>
                    <option value="BANK_EFT">Bank EFT</option>
                    <option value="VISA_MASTERCARD">Visa / Mastercard</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Amount (UGX)</label>
                  <input 
                    type="number" 
                    value={payForm.amount} 
                    onChange={e => setPayForm(p => ({ ...p, amount: Number(e.target.value) }))}
                    required 
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-bold" 
                  />
                </div>
              </div>
              <div className="pt-3 flex justify-end space-x-2 border-t border-slate-200">
                <button type="button" onClick={() => setShowProcessPayModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg font-bold text-slate-600">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg">Authorize Payment</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: VIEW PRINTABLE RECEIPT */}
      {selectedReceipt && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <span className="text-xs font-black tracking-wider text-slate-400">JUMO DIGITALPAY SWITCH</span>
              <button onClick={() => setSelectedReceipt(null)} className="text-slate-400 hover:text-slate-600 font-bold text-sm">✕</button>
            </div>

            <div className="text-center space-y-1 py-2">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-black text-lg text-slate-900">Official Payment Receipt</h4>
              <p className="text-xs text-slate-500">{selectedReceipt.institutionName}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Receipt Ref:</span>
                <span className="font-mono font-bold text-slate-900">{selectedReceipt.publicReference}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Payment PRN:</span>
                <span className="font-mono text-blue-600 font-bold">{selectedReceipt.payCode}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Payment Rail:</span>
                <span className="font-mono">{selectedReceipt.rail}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Date & Time:</span>
                <span>{new Date(selectedReceipt.timestamp).toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900 text-sm">
                <span>Gross Paid:</span>
                <span className="text-emerald-600">{selectedReceipt.grossAmount.toLocaleString()} {selectedReceipt.currency}</span>
              </div>
            </div>

            <div className="flex space-x-2 pt-2">
              <button 
                onClick={() => {
                  window.print();
                }} 
                className="w-full py-2 bg-slate-900 text-white font-bold rounded-lg text-xs flex items-center justify-center space-x-1"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: ADD MERCHANT */}
      {showAddMerchantModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-200">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-base">Register Merchant / Institution</h3>
              <button onClick={() => setShowAddMerchantModal(false)} className="text-slate-400 font-bold">✕</button>
            </div>
            <form onSubmit={handleAddMerchant} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Merchant / Institution Name</label>
                <input 
                  type="text" 
                  value={merchantForm.name} 
                  onChange={e => setMerchantForm(m => ({ ...m, name: e.target.value }))}
                  required 
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg" 
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Type</label>
                <select 
                  value={merchantForm.type} 
                  onChange={e => setMerchantForm(m => ({ ...m, type: e.target.value as any }))}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                >
                  <option value="Institution">Institution (School / Hospital / Government)</option>
                  <option value="Merchant">Commercial Merchant</option>
                  <option value="Agent">Pay Agent Network</option>
                </select>
              </div>
              <div className="pt-3 flex justify-end space-x-2 border-t border-slate-200">
                <button type="button" onClick={() => setShowAddMerchantModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg font-bold">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg">Register</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 5: REFUND */}
      {showRefundModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-200">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-base">Initiate Payment Reversal / Refund</h3>
              <button onClick={() => setShowRefundModal(false)} className="text-slate-400 font-bold">✕</button>
            </div>
            <form onSubmit={handleRefund} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Transaction ID / Reference</label>
                <select 
                  value={refundTxId} 
                  onChange={e => setRefundTxId(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono"
                >
                  <option value="">Select Transaction to Refund</option>
                  {receipts.filter(r => r.status === "SETTLED").map((r, i) => (
                    <option key={i} value={r.transactionId}>{r.publicReference} — {r.grossAmount.toLocaleString()} UGX ({r.institutionName})</option>
                  ))}
                </select>
              </div>
              <div className="pt-3 flex justify-end space-x-2 border-t border-slate-200">
                <button type="button" onClick={() => setShowRefundModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg font-bold">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-rose-600 text-white font-bold rounded-lg">Process Reversal</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 6: ADD MANDATE */}
      {showAddMandateModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-200">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-base">Create Auto Payment Mandate</h3>
              <button onClick={() => setShowAddMandateModal(false)} className="text-slate-400 font-bold">✕</button>
            </div>
            <form onSubmit={handleAddMandate} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Payer Name</label>
                <input 
                  type="text" 
                  value={mandateForm.payer} 
                  onChange={e => setMandateForm(m => ({ ...m, payer: e.target.value }))}
                  required 
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg" 
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Merchant / Institution</label>
                <select 
                  value={mandateForm.merchant} 
                  onChange={e => setMandateForm(m => ({ ...m, merchant: e.target.value }))}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                >
                  <option value="">Select Merchant</option>
                  {merchants.map((m, i) => <option key={i} value={m.name}>{m.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Amount (UGX)</label>
                  <input 
                    type="number" 
                    value={mandateForm.amount} 
                    onChange={e => setMandateForm(m => ({ ...m, amount: Number(e.target.value) }))}
                    required 
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg" 
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Frequency</label>
                  <select 
                    value={mandateForm.frequency} 
                    onChange={e => setMandateForm(m => ({ ...m, frequency: e.target.value }))}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <option value="Per Term">Per Term</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                  </select>
                </div>
              </div>
              <div className="pt-3 flex justify-end space-x-2 border-t border-slate-200">
                <button type="button" onClick={() => setShowAddMandateModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg font-bold">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg">Register Mandate</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
