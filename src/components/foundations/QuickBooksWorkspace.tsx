import React, { useState, useEffect } from "react";
import { CashBookModule } from "./finance/CashBookModule";
import { AssetManagementModule } from "./finance/AssetManagementModule";
import { BudgetVoteModule } from "./finance/BudgetVoteModule";
import { FinancialReportsModule } from "./finance/FinancialReportsModule";
import { 
  Building2, DollarSign, FileText, CheckCircle2, Plus, 
  Search, RefreshCw, ArrowUpRight, TrendingUp, CreditCard, 
  Landmark, Layers, Users, Activity, Check, Filter, Calendar
} from "lucide-react";

interface QBAccount {
  code: string;
  name: string;
  type: string;
  balance: number;
  currency: string;
}

interface QBInvoice {
  id: string;
  customerName: string;
  invoiceDate: string;
  dueDate: string;
  amount: number;
  balanceDue: number;
  status: "Paid" | "Open" | "Overdue";
}

export function QuickBooksWorkspace() {
  const [accounts, setAccounts] = useState<QBAccount[]>([]);
  const [invoices, setInvoices] = useState<QBInvoice[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [bills, setBills] = useState<any[]>([]);
  const [glEntries, setGlEntries] = useState<any[]>([]);
  const [bankTxs, setBankTxs] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>("overview");
  
  // Modals
  const [showNewInvoiceModal, setShowNewInvoiceModal] = useState<boolean>(false);
  const [showNewCustomerModal, setShowNewCustomerModal] = useState<boolean>(false);
  const [showNewSupplierModal, setShowNewSupplierModal] = useState<boolean>(false);
  const [showNewAccountModal, setShowNewAccountModal] = useState<boolean>(false);
  const [showNewBillModal, setShowNewBillModal] = useState<boolean>(false);
  const [showPayBillModal, setShowPayBillModal] = useState<boolean>(false);
  const [showNewJournalModal, setShowNewJournalModal] = useState<boolean>(false);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  
  // Form States
  const [selectedInvoice, setSelectedInvoice] = useState<QBInvoice | null>(null);
  const [selectedBill, setSelectedBill] = useState<any | null>(null);
  const [newCustName, setNewCustName] = useState<string>("");
  const [newCustEmail, setNewCustEmail] = useState<string>("");
  const [newCustPhone, setNewCustPhone] = useState<string>("");

  const [newSuppName, setNewSuppName] = useState<string>("");
  const [newSuppEmail, setNewSuppEmail] = useState<string>("");
  const [newSuppGroup, setNewSuppGroup] = useState<string>("Local Supplier");

  const [accCode, setAccCode] = useState<string>("");
  const [accName, setAccName] = useState<string>("");
  const [accType, setAccType] = useState<string>("Expense");

  const [newAmount, setNewAmount] = useState<number>(15000000);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [billPayAmount, setBillPayAmount] = useState<number>(0);

  const [billForm, setBillForm] = useState({
    supplier_id: "",
    supplier_name: "",
    grand_total: 5000000,
    due_date: new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
    remarks: "Quarterly Facilities Maintenance"
  });

  const [journalForm, setJournalForm] = useState({
    remarks: "Adjusting Provision & Depreciation Expense",
    debit_account: "5000",
    debit_account_name: "5000 - Payroll & Faculty Allowances",
    debit_amount: 10000000,
    credit_account: "1010",
    credit_account_name: "1010 - Bank Account (Stanbic Operations)",
    credit_amount: 10000000,
    reference_no: ""
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [cashBook, setCashBook] = useState<any[]>([]);
  const [budgets, setBudgets] = useState<any[]>([]);
  const [votes, setVotes] = useState<any[]>([]);
  const [assets, setAssets] = useState<any[]>([]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const refreshData = async () => {
    setLoading(true);
    try {
      const [coaRes, invRes, custRes, supRes, billRes, glRes, bankRes, cbRes, bgtRes, votRes, astRes] = await Promise.all([
        fetch("/api/v1/erpnext/chart-of-accounts"),
        fetch("/api/v1/erpnext/invoices"),
        fetch("/api/v1/erpnext/customers"),
        fetch("/api/v1/erpnext/suppliers"),
        fetch("/api/v1/erpnext/bills"),
        fetch("/api/v1/erpnext/gl-entries"),
        fetch("/api/v1/erpnext/bank-transactions"),
        fetch("/api/v1/erpnext/cash-book"),
        fetch("/api/v1/erpnext/budgets"),
        fetch("/api/v1/erpnext/votes"),
        fetch("/api/v1/erpnext/assets")
      ]);
      
      if (coaRes.ok) {
        const coaData = await coaRes.json();
        setAccounts(coaData.accounts?.map((a: any) => ({
          code: a.account_number,
          name: a.account_name,
          type: a.account_type || a.root_type || "Expense",
          balance: a.balance,
          currency: a.currency || "UGX"
        })) || []);
      }

      if (invRes.ok) {
        const invData = await invRes.json();
        setInvoices(invData.invoices?.map((i: any) => ({
          id: i.id,
          customerName: i.customer,
          invoiceDate: i.posting_date,
          dueDate: i.due_date,
          amount: i.grand_total,
          balanceDue: i.outstanding_amount,
          status: i.status === "Paid" ? "Paid" : "Open"
        })) || []);
      }

      if (custRes.ok) setCustomers((await custRes.json()).customers || []);
      if (supRes.ok) setSuppliers((await supRes.json()).suppliers || []);
      if (billRes.ok) setBills((await billRes.json()).bills || []);
      if (glRes.ok) setGlEntries((await glRes.json()).gl_entries || []);
      if (bankRes.ok) setBankTxs((await bankRes.json()).transactions || []);
      if (cbRes.ok) setCashBook((await cbRes.json()).cash_book || []);
      if (bgtRes.ok) setBudgets((await bgtRes.json()).budgets || []);
      if (votRes.ok) setVotes((await votRes.json()).votes || []);
      if (astRes.ok) setAssets((await astRes.json()).assets || []);
    } catch (err) {
      console.error("Failed to fetch Accounting data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleCreateCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/v1/erpnext/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: newCustName,
          customer_type: "Company",
          email: newCustEmail,
          phone: newCustPhone,
          currency: "UGX"
        })
      });
      if (res.ok) {
        showToast(`Customer ${newCustName} registered!`);
        setShowNewCustomerModal(false);
        setNewCustName("");
        setNewCustEmail("");
        setNewCustPhone("");
        refreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateSupplier = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/v1/erpnext/suppliers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          supplier_name: newSuppName,
          email: newSuppEmail,
          supplier_group: newSuppGroup
        })
      });
      if (res.ok) {
        showToast(`Supplier ${newSuppName} registered!`);
        setShowNewSupplierModal(false);
        setNewSuppName("");
        setNewSuppEmail("");
        refreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/v1/erpnext/chart-of-accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          account_number: accCode,
          account_name: accName,
          root_type: accType.includes("Income") ? "Income" : accType.includes("Asset") || accType.includes("Bank") ? "Asset" : "Expense",
          account_type: accType,
          is_group: false,
          balance: 0,
          currency: "UGX"
        })
      });
      if (res.ok) {
        showToast(`Account ${accCode} — ${accName} added to Chart of Accounts!`);
        setShowNewAccountModal(false);
        setAccCode("");
        setAccName("");
        refreshData();
      } else {
        const err = await res.json();
        alert(err.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    const customer = customers.find(c => c.customer_name === newCustName) || customers[0] || { id: "CUST-001" };
    try {
      const res = await fetch("/api/v1/erpnext/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_id: customer.id,
          items: [{ item_code: "SRV-GENERIC", item_name: "Standard Institutional Service", qty: 1, rate: newAmount }]
        })
      });
      if (res.ok) {
        showToast("Sales invoice created and posted to General Ledger!");
        setShowNewInvoiceModal(false);
        refreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateBill = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const supp = suppliers.find(s => s.id === billForm.supplier_id) || suppliers[0];
      const res = await fetch("/api/v1/erpnext/bills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          supplier_id: supp?.id || "SUP-001",
          supplier: supp?.supplier_name || billForm.supplier_name,
          grand_total: billForm.grand_total,
          due_date: billForm.due_date,
          remarks: billForm.remarks
        })
      });
      if (res.ok) {
        showToast("Bill created and logged into Payables!");
        setShowNewBillModal(false);
        refreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePayBill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBill) return;
    try {
      const res = await fetch(`/api/v1/erpnext/bills/${selectedBill.id}/pay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: billPayAmount })
      });
      if (res.ok) {
        showToast(`Bill payment of UGX ${billPayAmount.toLocaleString()} posted!`);
        setShowPayBillModal(false);
        refreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateJournal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (journalForm.debit_amount !== journalForm.credit_amount) {
      alert("Error: Total Debits must equal Total Credits for double-entry journal.");
      return;
    }
    try {
      const res = await fetch("/api/v1/erpnext/journals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(journalForm)
      });
      if (res.ok) {
        showToast("General Journal Entry balanced and posted!");
        setShowNewJournalModal(false);
        refreshData();
      } else {
        const err = await res.json();
        alert(err.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRecordPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoice) return;
    try {
      const res = await fetch("/api/v1/erpnext/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoice_id: selectedInvoice.id,
          paid_amount: paymentAmount
        })
      });
      if (res.ok) {
        showToast("Payment recorded and reconciled against Ledger!");
        setShowPaymentModal(false);
        refreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const totalIncome = accounts.filter(a => a.type.toLowerCase().includes("income")).reduce((acc, a) => acc + a.balance, 0);
  const totalExpenses = accounts.filter(a => a.type.toLowerCase().includes("expense")).reduce((acc, a) => acc + a.balance, 0);
  const netOperatingProfit = totalIncome - totalExpenses;
  const cashInBank = accounts.filter(a => a.type.toLowerCase().includes("bank")).reduce((acc, a) => acc + a.balance, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-lg shadow-xl flex items-center space-x-2 border border-slate-700 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-center text-emerald-700 font-bold shrink-0 text-lg">
              QB
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold text-slate-900">QuickBooks Enterprise Accounting Application</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  OPERATIONAL
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Chart of Accounts hierarchy, accounts receivable/payable, general ledger, cash book, and vote book.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={refreshData}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              title="Refresh Accounting Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={() => setShowNewInvoiceModal(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create Invoice</span>
            </button>
            <button
              onClick={() => setShowNewJournalModal(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>Journal Entry</span>
            </button>
          </div>
        </div>

        {/* Financial KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100">
          <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-100">
            <div className="text-xs font-medium text-slate-500">Operating Cash in Bank</div>
            <div className="text-lg font-bold text-slate-900 mt-1">UGX {cashInBank.toLocaleString()}</div>
            <div className="text-[11px] text-emerald-600 font-medium mt-1">Stanbic Operating Master</div>
          </div>
          <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-100">
            <div className="text-xs font-medium text-slate-500">Gross Operating Income</div>
            <div className="text-lg font-bold text-emerald-600 mt-1">UGX {totalIncome.toLocaleString()}</div>
            <div className="text-[11px] text-emerald-600 font-medium mt-1">Institutional Invoicing & Fees</div>
          </div>
          <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-100">
            <div className="text-xs font-medium text-slate-500">Operating Expenses</div>
            <div className="text-lg font-bold text-slate-900 mt-1">UGX {totalExpenses.toLocaleString()}</div>
            <div className="text-[11px] text-slate-500 mt-1">Payroll, Operations & Maintenance</div>
          </div>
          <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-100">
            <div className="text-xs font-medium text-slate-500">Net Operating Profit</div>
            <div className="text-lg font-bold text-blue-600 mt-1">UGX {netOperatingProfit.toLocaleString()}</div>
            <div className="text-[11px] text-blue-600 font-medium mt-1">Trial Balance Reconciled</div>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="bg-white border border-slate-200 rounded-xl p-1.5 flex overflow-x-auto shadow-sm gap-1 scrollbar-none">
        {[
          { id: "overview", label: "Overview" },
          { id: "coa", label: `Chart of Accounts (${accounts.length})` },
          { id: "customers", label: `Customers & AR (${customers.length})` },
          { id: "suppliers", label: `Suppliers & AP (${suppliers.length})` },
          { id: "invoices", label: `Sales Invoices (${invoices.length})` },
          { id: "bills", label: `Bills to Pay (${bills.length})` },
          { id: "banking", label: "Banking & Rec" },
          { id: "ledger", label: `General Ledger (${glEntries.length})` },
          { id: "cash_book", label: "Cash Book" },
          { id: "budget", label: "Expenditure & Votes" },
          { id: "assets", label: "Asset Mgmt" },
          { id: "reports", label: "Financial Reports" },
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

      {/* Main View Area */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Net Operating Profit</span>
                <span className="text-3xl font-bold text-slate-900 tabular-nums">UGX {netOperatingProfit.toLocaleString()}</span>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
                  <ArrowUpRight className="w-4 h-4" />
                  <span>Verified Financial Balance</span>
                </div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Cash on Hand</span>
                <span className="text-3xl font-bold text-emerald-700 tabular-nums">UGX {cashInBank.toLocaleString()}</span>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500 font-bold">
                  <Activity className="w-4 h-4" />
                  <span>Stanbic Operations Master</span>
                </div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Accounts Receivable</span>
                <span className="text-3xl font-bold text-amber-600 tabular-nums">
                  UGX {invoices.filter(i => i.status === "Open").reduce((acc, i) => acc + i.balanceDue, 0).toLocaleString()}
                </span>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-600 font-bold underline cursor-pointer" onClick={() => setActiveTab("invoices")}>
                  <span>View open sales invoices</span>
                </div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Accounts Payable</span>
                <span className="text-3xl font-bold text-rose-600 tabular-nums">
                  UGX {bills.filter(b => b.status === "Submitted" || b.status === "Open").reduce((acc, b) => acc + (b.outstanding_amount || b.grand_total || 0), 0).toLocaleString()}
                </span>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-rose-600 font-bold underline cursor-pointer" onClick={() => setActiveTab("bills")}>
                  <span>View outstanding bills</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
              <div className="border border-slate-200 rounded-2xl p-6 bg-white space-y-4">
                <h3 className="font-bold text-slate-900 text-sm">Recent Sales Invoices</h3>
                <div className="space-y-2">
                  {invoices.slice(0, 4).map((inv, idx) => (
                    <div key={idx} className="p-3 border border-slate-100 rounded-xl flex justify-between items-center text-xs">
                      <div>
                        <span className="font-mono font-bold text-blue-600">{inv.id}</span>
                        <p className="font-medium text-slate-900">{inv.customerName}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-slate-900">{inv.amount.toLocaleString()} UGX</span>
                        <span className={`block text-[10px] font-bold ${inv.status === "Paid" ? "text-emerald-600" : "text-amber-600"}`}>{inv.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-slate-200 rounded-2xl p-6 bg-white space-y-4">
                <h3 className="font-bold text-slate-900 text-sm">Recent General Ledger Postings</h3>
                <div className="space-y-2">
                  {glEntries.slice(-4).reverse().map((gl, idx) => (
                    <div key={idx} className="p-3 border border-slate-100 rounded-xl flex justify-between items-center text-xs">
                      <div>
                        <span className="font-mono font-bold text-slate-900">{gl.id}</span>
                        <p className="text-slate-600">{gl.account_name}</p>
                      </div>
                      <div className="text-right font-mono font-bold">
                        {gl.debit > 0 ? <span className="text-emerald-600">Dr {gl.debit.toLocaleString()}</span> : <span className="text-blue-600">Cr {gl.credit.toLocaleString()}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CHART OF ACCOUNTS */}
        {activeTab === "coa" && (
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-slate-900">Chart of Accounts</h3>
                <p className="text-xs text-slate-500">Standard general ledger account structure with live balances.</p>
              </div>
              <button onClick={() => setShowNewAccountModal(true)} className="px-3.5 py-1.5 bg-emerald-600 text-white font-bold text-xs rounded-lg flex items-center space-x-1">
                <Plus className="w-3.5 h-3.5" />
                <span>Add GL Account</span>
              </button>
            </div>

            <div className="overflow-x-auto border border-slate-100 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                  <tr>
                    <th className="p-3">Account Code</th>
                    <th className="p-3">Account Name</th>
                    <th className="p-3">Type</th>
                    <th className="p-3 text-right">Balance</th>
                    <th className="p-3">Currency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {accounts.map((acc, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-slate-900">{acc.code}</td>
                      <td className="p-3 font-medium text-slate-900">{acc.name}</td>
                      <td className="p-3 text-slate-600">{acc.type}</td>
                      <td className="p-3 text-right font-bold text-slate-900">{acc.balance.toLocaleString()}</td>
                      <td className="p-3 font-mono text-slate-500">{acc.currency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CUSTOMERS & RECEIVABLES */}
        {activeTab === "customers" && (
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-slate-900">Customers & Accounts Receivable (AR)</h3>
                <p className="text-xs text-slate-500">Client, student, and corporate debtors registry.</p>
              </div>
              <button onClick={() => setShowNewCustomerModal(true)} className="px-3.5 py-1.5 bg-emerald-600 text-white font-bold text-xs rounded-lg flex items-center space-x-1">
                <Plus className="w-3.5 h-3.5" />
                <span>Register Customer</span>
              </button>
            </div>

            <div className="overflow-x-auto border border-slate-100 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                  <tr>
                    <th className="p-3">Customer ID</th>
                    <th className="p-3">Customer Name</th>
                    <th className="p-3">Email / Contact</th>
                    <th className="p-3 text-right">Total Invoiced</th>
                    <th className="p-3 text-right">Total Paid</th>
                    <th className="p-3 text-right">Outstanding Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {customers.map((c, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-slate-900">{c.id}</td>
                      <td className="p-3 font-medium text-slate-900">{c.customer_name}</td>
                      <td className="p-3 text-slate-600">{c.email || c.phone || "—"}</td>
                      <td className="p-3 text-right font-bold">{c.total_invoiced ? c.total_invoiced.toLocaleString() : 0} UGX</td>
                      <td className="p-3 text-right text-emerald-600 font-bold">{c.total_paid ? c.total_paid.toLocaleString() : 0} UGX</td>
                      <td className="p-3 text-right text-rose-600 font-bold">{c.outstanding_balance ? c.outstanding_balance.toLocaleString() : 0} UGX</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SUPPLIERS & PAYABLES */}
        {activeTab === "suppliers" && (
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-slate-900">Suppliers & Accounts Payable (AP)</h3>
                <p className="text-xs text-slate-500">Vendor, supplier, and service provider payables directory.</p>
              </div>
              <button onClick={() => setShowNewSupplierModal(true)} className="px-3.5 py-1.5 bg-blue-600 text-white font-bold text-xs rounded-lg flex items-center space-x-1">
                <Plus className="w-3.5 h-3.5" />
                <span>Register Supplier</span>
              </button>
            </div>

            <div className="overflow-x-auto border border-slate-100 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                  <tr>
                    <th className="p-3">Supplier ID</th>
                    <th className="p-3">Supplier Name</th>
                    <th className="p-3">Group</th>
                    <th className="p-3 text-right">Total Billed</th>
                    <th className="p-3 text-right">Total Paid</th>
                    <th className="p-3 text-right">Outstanding Payable</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {suppliers.map((s, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-slate-900">{s.id}</td>
                      <td className="p-3 font-medium text-slate-900">{s.supplier_name}</td>
                      <td className="p-3 text-slate-600">{s.supplier_group}</td>
                      <td className="p-3 text-right font-bold">{s.total_billed ? s.total_billed.toLocaleString() : 0} UGX</td>
                      <td className="p-3 text-right text-emerald-600 font-bold">{s.total_paid ? s.total_paid.toLocaleString() : 0} UGX</td>
                      <td className="p-3 text-right text-amber-600 font-bold">{s.outstanding_balance ? s.outstanding_balance.toLocaleString() : 0} UGX</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SALES INVOICES */}
        {activeTab === "invoices" && (
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-slate-900">Sales Invoices & Receivables Ledger</h3>
                <p className="text-xs text-slate-500">Track sales invoices and process incoming payment settlements.</p>
              </div>
              <button onClick={() => setShowNewInvoiceModal(true)} className="px-3.5 py-1.5 bg-emerald-600 text-white font-bold text-xs rounded-lg flex items-center space-x-1">
                <Plus className="w-3.5 h-3.5" />
                <span>New Sales Invoice</span>
              </button>
            </div>

            <div className="overflow-x-auto border border-slate-100 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                  <tr>
                    <th className="p-3">Invoice ID</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Invoice Date</th>
                    <th className="p-3">Due Date</th>
                    <th className="p-3 text-right">Grand Total</th>
                    <th className="p-3 text-right">Balance Due</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {invoices.map((inv, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-slate-900">{inv.id}</td>
                      <td className="p-3 font-medium text-slate-900">{inv.customerName}</td>
                      <td className="p-3 text-slate-500">{inv.invoiceDate}</td>
                      <td className="p-3 text-slate-500">{inv.dueDate}</td>
                      <td className="p-3 text-right font-bold text-slate-900">{inv.amount.toLocaleString()} UGX</td>
                      <td className="p-3 text-right font-bold text-amber-600">{inv.balanceDue.toLocaleString()} UGX</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${inv.status === "Paid" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                          {inv.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        {inv.status !== "Paid" && (
                          <button onClick={() => { setSelectedInvoice(inv); setPaymentAmount(inv.balanceDue); setShowPaymentModal(true); }} className="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded border border-emerald-200 font-bold text-[10px]">
                            Pay Invoice
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* BILLS TO PAY */}
        {activeTab === "bills" && (
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-slate-900">Bills to Pay & Purchase Invoices</h3>
                <p className="text-xs text-slate-500">Manage supplier bills, approve payments, and record settlements.</p>
              </div>
              <button onClick={() => setShowNewBillModal(true)} className="px-3.5 py-1.5 bg-blue-600 text-white font-bold text-xs rounded-lg flex items-center space-x-1">
                <Plus className="w-3.5 h-3.5" />
                <span>Create Bill to Pay</span>
              </button>
            </div>

            <div className="overflow-x-auto border border-slate-100 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                  <tr>
                    <th className="p-3">Bill ID</th>
                    <th className="p-3">Supplier</th>
                    <th className="p-3">Posting Date</th>
                    <th className="p-3 text-right">Grand Total</th>
                    <th className="p-3 text-right">Outstanding</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bills.map((b, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-slate-900">{b.id}</td>
                      <td className="p-3 font-medium text-slate-900">{b.supplier}</td>
                      <td className="p-3 text-slate-500">{new Date(b.created_at || Date.now()).toLocaleDateString()}</td>
                      <td className="p-3 text-right font-bold text-slate-900">{(b.grand_total || 0).toLocaleString()} UGX</td>
                      <td className="p-3 text-right font-bold text-rose-600">{(b.outstanding_amount || 0).toLocaleString()} UGX</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${b.status === "Paid" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        {b.status !== "Paid" && (
                          <button onClick={() => { setSelectedBill(b); setBillPayAmount(b.outstanding_amount || b.grand_total); setShowPayBillModal(true); }} className="px-2.5 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded border border-blue-200 font-bold text-[10px]">
                            Pay Bill
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* BANKING & RECONCILIATION */}
        {activeTab === "banking" && (
          <div className="p-6 space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Banking & 3-Way Reconciliation</h3>
              <p className="text-xs text-slate-500">Reconcile bank statement feeds against general ledger cash vouchers.</p>
            </div>

            <div className="overflow-x-auto border border-slate-100 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                  <tr>
                    <th className="p-3">Bank Account</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Description</th>
                    <th className="p-3 text-right">Withdrawal</th>
                    <th className="p-3 text-right">Deposit</th>
                    <th className="p-3">Allocated Voucher</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bankTxs.map((bt, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-3 font-medium text-slate-900">{bt.bank_account}</td>
                      <td className="p-3 text-slate-500">{bt.transaction_date}</td>
                      <td className="p-3 text-slate-700">{bt.description}</td>
                      <td className="p-3 text-right font-mono text-rose-600">{bt.withdrawal ? bt.withdrawal.toLocaleString() : "—"}</td>
                      <td className="p-3 text-right font-mono text-emerald-600 font-bold">{bt.deposit ? bt.deposit.toLocaleString() : "—"}</td>
                      <td className="p-3 font-mono text-[10px] text-blue-600">{bt.allocated_voucher_no || "—"}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${bt.reconciled ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                          {bt.reconciled ? "RECONCILED" : "PENDING"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* GENERAL LEDGER */}
        {activeTab === "ledger" && (
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-slate-900">General Ledger & Double-Entry Journal Entries</h3>
                <p className="text-xs text-slate-500">Authoritative audit log of all debit and credit postings across modules.</p>
              </div>
              <button onClick={() => setShowNewJournalModal(true)} className="px-3.5 py-1.5 bg-blue-600 text-white font-bold text-xs rounded-lg flex items-center space-x-1">
                <Plus className="w-3.5 h-3.5" />
                <span>New Journal Entry</span>
              </button>
            </div>

            <div className="overflow-x-auto border border-slate-100 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                  <tr>
                    <th className="p-3">GL ID</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Account Name</th>
                    <th className="p-3">Voucher Type</th>
                    <th className="p-3">Voucher No</th>
                    <th className="p-3 text-right">Debit</th>
                    <th className="p-3 text-right">Credit</th>
                    <th className="p-3">Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {glEntries.map((gl, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-slate-900">{gl.id}</td>
                      <td className="p-3 text-slate-500">{gl.posting_date}</td>
                      <td className="p-3 font-medium text-slate-900">{gl.account_name}</td>
                      <td className="p-3 text-slate-600">{gl.voucher_type}</td>
                      <td className="p-3 font-mono text-blue-600">{gl.voucher_no}</td>
                      <td className="p-3 text-right font-mono font-bold text-emerald-600">{gl.debit > 0 ? gl.debit.toLocaleString() : "—"}</td>
                      <td className="p-3 text-right font-mono font-bold text-slate-900">{gl.credit > 0 ? gl.credit.toLocaleString() : "—"}</td>
                      <td className="p-3 text-slate-500 text-[10px]">{gl.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SUB-MODULES */}
        {activeTab === "cash_book" && <div className="p-6"><CashBookModule data={cashBook} refreshData={refreshData} /></div>}
        {activeTab === "budget" && <div className="p-6"><BudgetVoteModule budgets={budgets} votes={votes} refreshData={refreshData} /></div>}
        {activeTab === "assets" && <div className="p-6"><AssetManagementModule data={assets} refreshData={refreshData} /></div>}
        {activeTab === "reports" && <div className="p-6"><FinancialReportsModule accounts={accounts} invoices={invoices} bills={bills} cashBook={cashBook} /></div>}
      </div>

      {/* MODALS */}
      {/* 1. NEW CUSTOMER */}
      {showNewCustomerModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4 border border-slate-200">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Register New Customer</h3>
              <button onClick={() => setShowNewCustomerModal(false)} className="text-slate-400 font-bold">✕</button>
            </div>
            <form onSubmit={handleCreateCustomer} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Customer Name</label>
                <input required type="text" value={newCustName} onChange={e => setNewCustName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2" placeholder="e.g. Uganda Martyrs High School" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                <input type="email" value={newCustEmail} onChange={e => setNewCustEmail(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2" placeholder="accounts@school.ac.ug" />
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowNewCustomerModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg font-bold">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg">Register Customer</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. NEW SUPPLIER */}
      {showNewSupplierModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4 border border-slate-200">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Register New Supplier</h3>
              <button onClick={() => setShowNewSupplierModal(false)} className="text-slate-400 font-bold">✕</button>
            </div>
            <form onSubmit={handleCreateSupplier} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Supplier Name</label>
                <input required type="text" value={newSuppName} onChange={e => setNewSuppName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2" placeholder="e.g. TotalEnergies Uganda Ltd" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Email</label>
                <input type="email" value={newSuppEmail} onChange={e => setNewSuppEmail(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2" placeholder="billing@vendor.co.ug" />
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowNewSupplierModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg font-bold">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg">Register Supplier</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. NEW INVOICE */}
      {showNewInvoiceModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4 border border-slate-200">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Create Sales Invoice</h3>
              <button onClick={() => setShowNewInvoiceModal(false)} className="text-slate-400 font-bold">✕</button>
            </div>
            <form onSubmit={handleCreateInvoice} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Customer</label>
                <select value={newCustName} onChange={e => setNewCustName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2">
                  <option value="">Select a customer...</option>
                  {customers.map(c => <option key={c.id} value={c.customer_name}>{c.customer_name}</option>)}
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Invoice Amount (UGX)</label>
                <input required type="number" value={newAmount} onChange={e => setNewAmount(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-bold" />
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowNewInvoiceModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg font-bold">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg">Post Sales Invoice</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. NEW BILL */}
      {showNewBillModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4 border border-slate-200">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Create Bill to Pay</h3>
              <button onClick={() => setShowNewBillModal(false)} className="text-slate-400 font-bold">✕</button>
            </div>
            <form onSubmit={handleCreateBill} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Supplier</label>
                <select 
                  value={billForm.supplier_id} 
                  onChange={e => setBillForm(b => ({ ...b, supplier_id: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2"
                >
                  <option value="">Select Supplier</option>
                  {suppliers.map(s => <option key={s.id} value={s.id}>{s.supplier_name}</option>)}
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Grand Total (UGX)</label>
                <input 
                  type="number" 
                  value={billForm.grand_total} 
                  onChange={e => setBillForm(b => ({ ...b, grand_total: Number(e.target.value) }))}
                  required 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-bold" 
                />
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowNewBillModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg font-bold">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg">Post Bill</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. CREATE JOURNAL */}
      {showNewJournalModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 space-y-4 border border-slate-200">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Create General Journal Entry</h3>
              <button onClick={() => setShowNewJournalModal(false)} className="text-slate-400 font-bold">✕</button>
            </div>
            <form onSubmit={handleCreateJournal} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Journal Description / Remarks</label>
                <input 
                  type="text" 
                  value={journalForm.remarks} 
                  onChange={e => setJournalForm(j => ({ ...j, remarks: e.target.value }))}
                  required 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2" 
                />
              </div>

              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Debit Account (Dr)</label>
                  <select 
                    value={journalForm.debit_account} 
                    onChange={e => {
                      const acc = accounts.find(a => a.code === e.target.value);
                      setJournalForm(j => ({ ...j, debit_account: e.target.value, debit_account_name: acc ? `${acc.code} - ${acc.name}` : e.target.value }));
                    }}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2"
                  >
                    {accounts.map(a => <option key={a.code} value={a.code}>{a.code} - {a.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Debit Amount (UGX)</label>
                  <input 
                    type="number" 
                    value={journalForm.debit_amount} 
                    onChange={e => setJournalForm(j => ({ ...j, debit_amount: Number(e.target.value), credit_amount: Number(e.target.value) }))}
                    required 
                    className="w-full bg-white border border-slate-200 rounded-lg p-2 font-bold" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Credit Account (Cr)</label>
                  <select 
                    value={journalForm.credit_account} 
                    onChange={e => {
                      const acc = accounts.find(a => a.code === e.target.value);
                      setJournalForm(j => ({ ...j, credit_account: e.target.value, credit_account_name: acc ? `${acc.code} - ${acc.name}` : e.target.value }));
                    }}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2"
                  >
                    {accounts.map(a => <option key={a.code} value={a.code}>{a.code} - {a.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Credit Amount (UGX)</label>
                  <input 
                    type="number" 
                    value={journalForm.credit_amount} 
                    onChange={e => setJournalForm(j => ({ ...j, credit_amount: Number(e.target.value) }))}
                    required 
                    className="w-full bg-white border border-slate-200 rounded-lg p-2 font-bold" 
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowNewJournalModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg font-bold">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg">Balance & Post Journal</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. PAY INVOICE */}
      {showPaymentModal && selectedInvoice && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4 border border-slate-200">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Record Payment Received</h3>
              <button onClick={() => setShowPaymentModal(false)} className="text-slate-400 font-bold">✕</button>
            </div>
            <form onSubmit={handleRecordPayment} className="space-y-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Balance Due</div>
                <div className="text-lg font-bold text-slate-900">{selectedInvoice.balanceDue.toLocaleString()} UGX</div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Amount Paid (UGX)</label>
                <input required type="number" value={paymentAmount} onChange={e => setPaymentAmount(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-bold" max={selectedInvoice.balanceDue} />
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowPaymentModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg font-bold">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg">Post Payment</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. PAY BILL */}
      {showPayBillModal && selectedBill && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4 border border-slate-200">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Pay Supplier Bill</h3>
              <button onClick={() => setShowPayBillModal(false)} className="text-slate-400 font-bold">✕</button>
            </div>
            <form onSubmit={handlePayBill} className="space-y-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Outstanding Bill Payable</div>
                <div className="text-lg font-bold text-slate-900">{(selectedBill.outstanding_amount || selectedBill.grand_total).toLocaleString()} UGX</div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Payment Settlement Amount (UGX)</label>
                <input required type="number" value={billPayAmount} onChange={e => setBillPayAmount(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-bold" />
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowPayBillModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg font-bold">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg">Post Bill Settlement</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 8. CREATE GL ACCOUNT */}
      {showNewAccountModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4 border border-slate-200">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Add GL Account to Chart of Accounts</h3>
              <button onClick={() => setShowNewAccountModal(false)} className="text-slate-400 font-bold">✕</button>
            </div>
            <form onSubmit={handleCreateAccount} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Account Code (Number)</label>
                <input required type="text" value={accCode} onChange={e => setAccCode(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-mono" placeholder="e.g. 5200" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Account Name</label>
                <input required type="text" value={accName} onChange={e => setAccName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2" placeholder="e.g. Utilities & Power Expense" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Account Type</label>
                <select value={accType} onChange={e => setAccType(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2">
                  <option value="Expense">Expense</option>
                  <option value="Income">Income</option>
                  <option value="Bank">Bank Account</option>
                  <option value="Accounts Receivable">Accounts Receivable</option>
                  <option value="Accounts Payable">Accounts Payable</option>
                  <option value="Equity">Equity</option>
                </select>
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowNewAccountModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg font-bold">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg">Add Account</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
