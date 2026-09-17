import React, { useState, useEffect } from "react";
import {
  Building2, DollarSign, FileText, CheckCircle2, Plus, 
  ArrowRight, Landmark, Layers, AlertCircle, RefreshCw, 
  Search, ShieldCheck, TrendingUp, CreditCard, ChevronRight,
  BookOpen, UserCheck, Check, Clock, ArrowDownRight, ArrowUpRight
} from "lucide-react";

interface ChartOfAccountItem {
  account_number: string;
  account_name: string;
  root_type: "Asset" | "Liability" | "Equity" | "Income" | "Expense";
  account_type?: string;
  parent_account?: string;
  is_group: boolean;
  balance: number;
  currency: string;
}

interface ERPNextCustomer {
  id: string;
  customer_name: string;
  customer_type: "Company" | "Individual";
  customer_group: string;
  territory: string;
  currency: string;
  email: string;
  phone: string;
  total_invoiced: number;
  total_paid: number;
  outstanding_balance: number;
}

interface ERPNextSalesInvoice {
  id: string;
  name: string;
  customer: string;
  customer_id: string;
  posting_date: string;
  due_date: string;
  currency: string;
  items: { item_code: string; item_name: string; qty: number; rate: number; amount: number; income_account: string }[];
  net_total: number;
  tax_amount: number;
  grand_total: number;
  outstanding_amount: number;
  status: "Draft" | "Submitted" | "Paid" | "Partially Paid" | "Cancelled";
  remarks?: string;
}

interface ERPNextGLEntry {
  id: string;
  posting_date: string;
  account: string;
  account_name: string;
  party?: string;
  voucher_type: string;
  voucher_no: string;
  debit: number;
  credit: number;
  currency: string;
  remarks: string;
}

interface ERPNextBankItem {
  id: string;
  bank_account: string;
  transaction_date: string;
  value_date: string;
  description: string;
  reference_id: string;
  deposit: number;
  withdrawal: number;
  currency: string;
  reconciled: boolean;
  allocated_voucher_no?: string;
}

export function ERPNextWorkspace() {
  const [activeSubTab, setActiveSubTab] = useState<"invoices" | "gl" | "accounts" | "customers" | "banking">("invoices");
  const [accounts, setAccounts] = useState<ChartOfAccountItem[]>([]);
  const [customers, setCustomers] = useState<ERPNextCustomer[]>([]);
  const [invoices, setInvoices] = useState<ERPNextSalesInvoice[]>([]);
  const [glEntries, setGlEntries] = useState<ERPNextGLEntry[]>([]);
  const [bankTx, setBankTx] = useState<ERPNextBankItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Form states
  const [showCreateInvoice, setShowCreateInvoice] = useState<boolean>(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");
  const [itemDescription, setItemDescription] = useState<string>("");
  const [itemQty, setItemQty] = useState<number>(1);
  const [itemRate, setItemRate] = useState<number>(5000000);
  const [invoiceRemarks, setInvoiceRemarks] = useState<string>("");

  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [paymentInvoice, setPaymentInvoice] = useState<ERPNextSalesInvoice | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [paymentRef, setPaymentRef] = useState<string>("");

  const [showNewCustomerModal, setShowNewCustomerModal] = useState<boolean>(false);
  const [newCustName, setNewCustName] = useState<string>("");
  const [newCustGroup, setNewCustGroup] = useState<string>("Commercial Enterprise");
  const [newCustEmail, setNewCustEmail] = useState<string>("");
  const [newCustPhone, setNewCustPhone] = useState<string>("");

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const loadERPNextData = async () => {
    setRefreshing(true);
    try {
      // 1. Fetch Chart of Accounts
      const coaRes = await fetch("/api/v1/erpnext/chart-of-accounts");
      if (coaRes.ok) {
        const coaData = await coaRes.json();
        setAccounts(coaData.accounts || []);
      }

      // 2. Fetch Customers
      const custRes = await fetch("/api/v1/erpnext/customers");
      if (custRes.ok) {
        const custData = await custRes.json();
        setCustomers(custData.customers || []);
        if (custData.customers && custData.customers.length > 0) {
          setSelectedCustomerId(custData.customers[0].id);
        }
      }

      // 3. Fetch Invoices
      const invRes = await fetch("/api/v1/erpnext/invoices");
      if (invRes.ok) {
        const invData = await invRes.json();
        setInvoices(invData.invoices || []);
      }

      // 4. Fetch GL Entries
      const glRes = await fetch("/api/v1/erpnext/gl-entries");
      if (glRes.ok) {
        const glData = await glRes.json();
        setGlEntries(glData.entries || []);
      }

      // 5. Fetch Bank Transactions
      const bnkRes = await fetch("/api/v1/erpnext/bank-transactions");
      if (bnkRes.ok) {
        const bnkData = await bnkRes.json();
        setBankTx(bnkData.transactions || []);
      }
    } catch (err) {
      console.error("Failed to load ERPNext data from local adapter:", err);
      showToast("Failed to load data from ERPNext adapter", "error");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadERPNextData();
  }, []);

  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomerId || !itemDescription || itemRate <= 0) {
      showToast("Please fill in all invoice details", "error");
      return;
    }

    const selectedCust = customers.find(c => c.id === selectedCustomerId);

    try {
      const res = await fetch("/api/v1/erpnext/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: selectedCust?.customer_name || "Enterprise Client",
          customer_id: selectedCustomerId,
          items: [
            {
              item_code: "SRV-ENT-001",
              item_name: itemDescription,
              qty: Number(itemQty),
              rate: Number(itemRate),
              amount: Number(itemQty) * Number(itemRate),
              income_account: "4010"
            }
          ],
          remarks: invoiceRemarks || "Standard enterprise services agreement"
        })
      });

      const data = await res.json();
      if (data.success) {
        showToast(`Invoice ${data.invoice.id} created & double-entry GL vouchers posted!`);
        setShowCreateInvoice(false);
        setItemDescription("");
        setInvoiceRemarks("");
        loadERPNextData();
      } else {
        showToast(data.error || "Failed to create invoice", "error");
      }
    } catch (err: any) {
      showToast(err.message || "Error submitting invoice", "error");
    }
  };

  const handleCreatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentInvoice || paymentAmount <= 0) {
      showToast("Invalid payment details", "error");
      return;
    }

    try {
      const res = await fetch("/api/v1/erpnext/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoice_id: paymentInvoice.id,
          paid_amount: Number(paymentAmount),
          paid_to_account: "1010",
          reference_no: paymentRef || `BNK-${Date.now()}`
        })
      });

      const data = await res.json();
      if (data.success) {
        showToast(`Payment of UGX ${Number(paymentAmount).toLocaleString()} posted! Invoice updated.`);
        setShowPaymentModal(false);
        setPaymentInvoice(null);
        loadERPNextData();
      } else {
        showToast(data.error || "Failed to record payment", "error");
      }
    } catch (err: any) {
      showToast(err.message || "Payment submission failed", "error");
    }
  };

  const handleCreateCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustName.trim()) {
      showToast("Customer name is required", "error");
      return;
    }

    try {
      const res = await fetch("/api/v1/erpnext/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: newCustName.trim(),
          customer_type: "Company",
          customer_group: newCustGroup,
          currency: "UGX",
          email: newCustEmail.trim(),
          phone: newCustPhone.trim()
        })
      });

      const data = await res.json();
      if (data.success) {
        showToast(`Customer ${data.customer.customer_name} added to ERPNext!`);
        setShowNewCustomerModal(false);
        setNewCustName("");
        setNewCustEmail("");
        setNewCustPhone("");
        loadERPNextData();
      } else {
        showToast(data.error || "Failed to add customer", "error");
      }
    } catch (err: any) {
      showToast(err.message || "Error creating customer", "error");
    }
  };

  const handleReconcile = async (txId: string, voucherNo: string) => {
    try {
      const res = await fetch("/api/v1/erpnext/bank-reconcile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transaction_id: txId,
          voucher_no: voucherNo
        })
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Bank transaction ${txId} reconciled with ${voucherNo}!`);
        loadERPNextData();
      }
    } catch (err: any) {
      showToast("Failed to reconcile bank transaction", "error");
    }
  };

  // GL double entry calculation
  const totalDebits = glEntries.reduce((acc, g) => acc + g.debit, 0);
  const totalCredits = glEntries.reduce((acc, g) => acc + g.credit, 0);
  const isParityVerified = totalDebits === totalCredits;

  const totalInvoicedSum = invoices.reduce((acc, i) => acc + i.grand_total, 0);
  const totalOutstandingSum = invoices.reduce((acc, i) => acc + i.outstanding_amount, 0);
  const totalCollectedSum = totalInvoicedSum - totalOutstandingSum;

  return (
    <div id="erpnext-workspace" className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div 
          id="erpnext-toast-notification"
          className={`p-4 rounded-xl text-xs font-semibold flex items-center justify-between border shadow-xs ${
            notification.type === "success" 
              ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
              : "bg-rose-50 border-rose-200 text-rose-800"
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{notification.message}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-xs opacity-70 hover:opacity-100 font-bold">Dismiss</button>
        </div>
      )}

      {/* Header Banner (White Enterprise Styling) */}
      <div id="erpnext-header-banner" className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold shrink-0 text-lg">
              ERP
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">ERPNext Foundation Interface</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                  AVAILABLE — NOT PROVISIONED
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  GPL-3.0
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Authoritative upstream domain: ERPNext / Frappe (General Ledger, Invoicing, Balance Sheets).
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-2">
                <span>Source: <code className="text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded">foundations/erpnext</code></span>
                <span>•</span>
                <span>Runtime: <code className="text-amber-700 font-medium">Requires MariaDB, Redis, Bench Daemon</code></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              id="erpnext-refresh-btn"
              onClick={loadERPNextData}
              disabled={refreshing}
              className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
              <span>Sync with Disk</span>
            </button>
            <button
              id="erpnext-new-invoice-btn"
              onClick={() => setShowCreateInvoice(true)}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs flex items-center gap-2 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Sales Invoice</span>
            </button>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div className="text-xs text-slate-500 font-medium">Total Invoiced (AR)</div>
            <div className="text-lg font-bold text-slate-900 mt-1">
              UGX {totalInvoicedSum.toLocaleString()}
            </div>
            <div className="text-[11px] text-blue-600 mt-1 flex items-center gap-1 font-medium">
              <FileText className="w-3 h-3" />
              {invoices.length} Registered Invoices
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div className="text-xs text-slate-500 font-medium">Settled / Collected</div>
            <div className="text-lg font-bold text-emerald-600 mt-1">
              UGX {totalCollectedSum.toLocaleString()}
            </div>
            <div className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3 h-3" />
              Direct Bank Settlement
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div className="text-xs text-slate-500 font-medium">Outstanding Receivables</div>
            <div className="text-lg font-bold text-amber-600 mt-1">
              UGX {totalOutstandingSum.toLocaleString()}
            </div>
            <div className="text-[11px] text-amber-600 mt-1 flex items-center gap-1 font-medium">
              <Clock className="w-3 h-3" />
              Awaiting Inbound EFT
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div className="text-xs text-slate-500 font-medium">General Ledger Parity</div>
            <div className="text-lg font-bold text-slate-900 mt-1 flex items-center gap-2">
              <span className={isParityVerified ? "text-emerald-600" : "text-rose-600"}>
                {isParityVerified ? "100% BALANCED" : "PARITY MISMATCH"}
              </span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Debits: UGX {totalDebits.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div id="erpnext-subtabs" className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          id="tab-invoices"
          onClick={() => setActiveSubTab("invoices")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors ${
            activeSubTab === "invoices"
              ? "bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold"
              : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Sales Invoices ({invoices.length})</span>
        </button>

        <button
          id="tab-gl"
          onClick={() => setActiveSubTab("gl")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors ${
            activeSubTab === "gl"
              ? "bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold"
              : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>General Ledger ({glEntries.length} Entries)</span>
        </button>

        <button
          id="tab-accounts"
          onClick={() => setActiveSubTab("accounts")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors ${
            activeSubTab === "accounts"
              ? "bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold"
              : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Chart of Accounts ({accounts.length})</span>
        </button>

        <button
          id="tab-customers"
          onClick={() => setActiveSubTab("customers")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors ${
            activeSubTab === "customers"
              ? "bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold"
              : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>Customer Directory ({customers.length})</span>
        </button>

        <button
          id="tab-banking"
          onClick={() => setActiveSubTab("banking")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors ${
            activeSubTab === "banking"
              ? "bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold"
              : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
          }`}
        >
          <Landmark className="w-3.5 h-3.5" />
          <span>Bank Reconciliation ({bankTx.length})</span>
        </button>
      </div>

      {/* === VIEW 1: SALES INVOICES === */}
      {activeSubTab === "invoices" && (
        <div id="erpnext-invoices-view" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Enterprise Accounts Receivable Invoices</h2>
              <p className="text-xs text-slate-500">Issued invoices automatically post double-entry vouchers to General Ledger upon submission.</p>
            </div>
            <button
              id="btn-add-invoice-inline"
              onClick={() => setShowCreateInvoice(true)}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Invoice</span>
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">Invoice #</th>
                  <th className="py-3 px-4">Customer Party</th>
                  <th className="py-3 px-4">Posting Date</th>
                  <th className="py-3 px-4">Grand Total</th>
                  <th className="py-3 px-4">Outstanding</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900 flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-indigo-600" />
                      {inv.id}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-800">
                      {inv.customer}
                    </td>
                    <td className="py-3 px-4 text-slate-500 font-mono">
                      {inv.posting_date}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900 font-mono">
                      {inv.currency} {inv.grand_total.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 font-mono">
                      <span className={inv.outstanding_amount > 0 ? "text-amber-600 font-bold" : "text-emerald-600 font-bold"}>
                        {inv.currency} {inv.outstanding_amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        inv.status === "Paid"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : inv.status === "Submitted"
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-slate-100 text-slate-600 border-slate-200"
                      }`}>
                        {inv.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {inv.outstanding_amount > 0 ? (
                        <button
                          id={`pay-inv-${inv.id}`}
                          onClick={() => {
                            setPaymentInvoice(inv);
                            setPaymentAmount(inv.outstanding_amount);
                            setShowPaymentModal(true);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] flex items-center gap-1 ml-auto shadow-2xs"
                        >
                          <DollarSign className="w-3 h-3" />
                          <span>Record Payment</span>
                        </button>
                      ) : (
                        <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1 justify-end">
                          <Check className="w-3 h-3 text-emerald-600" /> Settled
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* === VIEW 2: GENERAL LEDGER === */}
      {activeSubTab === "gl" && (
        <div id="erpnext-gl-view" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">ERPNext Double-Entry General Ledger (GL)</h2>
              <p className="text-xs text-slate-500">Strict double-entry journal postings with real-time audit trail and balance verification.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-lg text-xs font-bold border flex items-center gap-1.5 ${
                isParityVerified 
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : "bg-rose-50 border-rose-200 text-rose-700"
              }`}>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                {isParityVerified ? "Debit/Credit Parity OK" : "Imbalanced"}
              </span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">Posting Date</th>
                  <th className="py-3 px-4">Account Code & Name</th>
                  <th className="py-3 px-4">Voucher Type & #</th>
                  <th className="py-3 px-4">Party Reference</th>
                  <th className="py-3 px-4 text-right">Debit (UGX)</th>
                  <th className="py-3 px-4 text-right">Credit (UGX)</th>
                  <th className="py-3 px-4">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {glEntries.map((g) => (
                  <tr key={g.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 text-slate-500">{g.posting_date}</td>
                    <td className="py-3 px-4 font-sans font-medium text-slate-900">{g.account_name}</td>
                    <td className="py-3 px-4 text-indigo-600 font-sans text-[11px]">
                      <span className="font-semibold">{g.voucher_type}:</span> {g.voucher_no}
                    </td>
                    <td className="py-3 px-4 font-sans text-slate-700">{g.party || "—"}</td>
                    <td className="py-3 px-4 text-right font-bold text-slate-900">
                      {g.debit > 0 ? g.debit.toLocaleString() : "—"}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-emerald-600">
                      {g.credit > 0 ? g.credit.toLocaleString() : "—"}
                    </td>
                    <td className="py-3 px-4 font-sans text-slate-500 text-[11px] truncate max-w-xs">{g.remarks}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-50 text-xs font-bold text-slate-900 border-t border-slate-200">
                <tr>
                  <td colSpan={4} className="py-3 px-4 text-right uppercase tracking-wider text-slate-500">Total Double-Entry Postings:</td>
                  <td className="py-3 px-4 text-right text-indigo-600 font-mono">UGX {totalDebits.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-emerald-600 font-mono">UGX {totalCredits.toLocaleString()}</td>
                  <td className="py-3 px-4"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* === VIEW 3: CHART OF ACCOUNTS === */}
      {activeSubTab === "accounts" && (
        <div id="erpnext-accounts-view" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Authoritative Chart of Accounts Tree</h2>
              <p className="text-xs text-slate-500">Frappe ERPNext hierarchical account ledger categorized across standard sovereign roots.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["Asset", "Liability", "Equity", "Income", "Expense"].map((root) => {
              const rootAccounts = accounts.filter(a => a.root_type === root);
              const groupAccount = rootAccounts.find(a => a.is_group);
              const leafAccounts = rootAccounts.filter(a => !a.is_group);

              return (
                <div key={root} className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${
                        root === "Asset" ? "bg-blue-500" :
                        root === "Liability" ? "bg-rose-500" :
                        root === "Equity" ? "bg-amber-500" :
                        root === "Income" ? "bg-emerald-500" : "bg-purple-500"
                      }`} />
                      <h3 className="font-bold text-slate-900 text-sm">{root.toUpperCase()} ACCOUNTS</h3>
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-700">
                      UGX {groupAccount?.balance.toLocaleString() || "0"}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2">
                    {leafAccounts.map((acc) => (
                      <div key={acc.account_number} className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex items-center justify-between">
                        <div>
                          <div className="text-xs font-medium text-slate-800">{acc.account_name}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">
                            Type: {acc.account_type || "General Ledger"}
                          </div>
                        </div>
                        <div className="text-xs font-mono font-bold text-slate-900">
                          UGX {acc.balance.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* === VIEW 4: CUSTOMERS === */}
      {activeSubTab === "customers" && (
        <div id="erpnext-customers-view" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">ERPNext Customer Master Records</h2>
              <p className="text-xs text-slate-500">Registered parties with live accounts receivable balances and ledger statements.</p>
            </div>
            <button
              id="btn-add-customer"
              onClick={() => setShowNewCustomerModal(true)}
              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Customer</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {customers.map((c) => (
              <div key={c.id} className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono text-indigo-600 font-bold">{c.id}</span>
                      <h3 className="font-bold text-slate-900 text-sm mt-0.5">{c.customer_name}</h3>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                      {c.customer_group}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2 text-xs text-slate-500">
                    <div className="flex justify-between">
                      <span>Total Invoiced:</span>
                      <span className="font-mono font-bold text-slate-900">UGX {c.total_invoiced.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Paid:</span>
                      <span className="font-mono font-bold text-emerald-600">UGX {c.total_paid.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-slate-100">
                      <span className="font-semibold text-slate-700">Outstanding:</span>
                      <span className={`font-mono font-bold ${c.outstanding_balance > 0 ? "text-amber-600" : "text-emerald-600"}`}>
                        UGX {c.outstanding_balance.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{c.email || c.phone}</span>
                  <button
                    onClick={() => {
                      setSelectedCustomerId(c.id);
                      setShowCreateInvoice(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-800 font-bold"
                  >
                    + New Invoice
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* === VIEW 5: BANK RECONCILIATION === */}
      {activeSubTab === "banking" && (
        <div id="erpnext-banking-view" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Bank Reconciliation & Statement Feeds</h2>
              <p className="text-xs text-slate-500">Matching inbound EFT bank feeds with ERPNext payment vouchers.</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">Statement Date</th>
                  <th className="py-3 px-4">Bank Account</th>
                  <th className="py-3 px-4">Description / Narration</th>
                  <th className="py-3 px-4">Reference</th>
                  <th className="py-3 px-4 text-right">Deposit</th>
                  <th className="py-3 px-4">Reconciliation Status</th>
                  <th className="py-3 px-4 text-right">Match Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bankTx.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono text-slate-500">{tx.transaction_date}</td>
                    <td className="py-3 px-4 font-medium text-slate-900">{tx.bank_account}</td>
                    <td className="py-3 px-4 text-slate-600">{tx.description}</td>
                    <td className="py-3 px-4 font-mono text-indigo-600">{tx.reference_id}</td>
                    <td className="py-3 px-4 text-right font-bold text-emerald-600 font-mono">
                      UGX {tx.deposit.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      {tx.reconciled ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1 w-max">
                          <Check className="w-3 h-3 text-emerald-600" /> Reconciled ({tx.allocated_voucher_no})
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 w-max">
                          Unmatched
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {!tx.reconciled && (
                        <button
                          onClick={() => handleReconcile(tx.id, "ACC-PAY-2026-0002")}
                          className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-[11px] shadow-2xs"
                        >
                          Auto-Match
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

      {/* === MODAL: CREATE SALES INVOICE === */}
      {showCreateInvoice && (
        <div id="modal-create-invoice" className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">New ERPNext Sales Invoice</h3>
              <button onClick={() => setShowCreateInvoice(false)} className="text-slate-400 hover:text-slate-600 text-sm font-bold">✕</button>
            </div>

            <form onSubmit={handleCreateInvoice} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Customer Party</label>
                <select
                  value={selectedCustomerId}
                  onChange={(e) => setSelectedCustomerId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                >
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.customer_name} ({c.id})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Line Item Description</label>
                <input
                  type="text"
                  value={itemDescription}
                  onChange={(e) => setItemDescription(e.target.value)}
                  placeholder="e.g. Enterprise Platform Subscription"
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={itemQty}
                    onChange={(e) => setItemQty(Number(e.target.value))}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Unit Rate (UGX)</label>
                  <input
                    type="number"
                    step="10000"
                    value={itemRate}
                    onChange={(e) => setItemRate(Number(e.target.value))}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Remarks</label>
                <input
                  type="text"
                  value={invoiceRemarks}
                  onChange={(e) => setInvoiceRemarks(e.target.value)}
                  placeholder="e.g. Q1 enterprise services node"
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs flex justify-between items-center">
                <span className="text-slate-500 font-medium">Grand Total to Post:</span>
                <span className="text-base font-bold text-emerald-600 font-mono">
                  UGX {(itemQty * itemRate).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateInvoice(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs"
                >
                  Submit & Post to GL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* === MODAL: RECORD PAYMENT === */}
      {showPaymentModal && paymentInvoice && (
        <div id="modal-record-payment" className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Record Payment Entry</h3>
              <button onClick={() => setShowPaymentModal(false)} className="text-slate-400 hover:text-slate-600 text-sm font-bold">✕</button>
            </div>

            <form onSubmit={handleCreatePayment} className="space-y-4">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-1 text-xs">
                <div className="text-slate-500">Invoice: <span className="text-slate-900 font-mono font-bold">{paymentInvoice.id}</span></div>
                <div className="text-slate-500">Customer: <span className="text-slate-900 font-medium">{paymentInvoice.customer}</span></div>
                <div className="text-slate-500">Outstanding: <span className="text-amber-600 font-bold font-mono">UGX {paymentInvoice.outstanding_amount.toLocaleString()}</span></div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Amount Paid (UGX)</label>
                <input
                  type="number"
                  max={paymentInvoice.outstanding_amount}
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(Number(e.target.value))}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Bank Reference #</label>
                <input
                  type="text"
                  value={paymentRef}
                  onChange={(e) => setPaymentRef(e.target.value)}
                  placeholder="e.g. STB-EFT-991204"
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs"
                >
                  Post Payment & Reconcile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* === MODAL: NEW CUSTOMER === */}
      {showNewCustomerModal && (
        <div id="modal-add-customer" className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Add New Customer</h3>
              <button onClick={() => setShowNewCustomerModal(false)} className="text-slate-400 hover:text-slate-600 text-sm font-bold">✕</button>
            </div>

            <form onSubmit={handleCreateCustomer} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Customer Name</label>
                <input
                  type="text"
                  value={newCustName}
                  onChange={(e) => setNewCustName(e.target.value)}
                  placeholder="e.g. Nile Basin Trading Group"
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Customer Group</label>
                <select
                  value={newCustGroup}
                  onChange={(e) => setNewCustGroup(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                >
                  <option value="Commercial Enterprise">Commercial Enterprise</option>
                  <option value="Agricultural Enterprises">Agricultural Enterprises</option>
                  <option value="Healthcare Institutions">Healthcare Institutions</option>
                  <option value="Government & Civic">Government & Civic</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={newCustEmail}
                  onChange={(e) => setNewCustEmail(e.target.value)}
                  placeholder="accounts@niletrading.ug"
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={newCustPhone}
                  onChange={(e) => setNewCustPhone(e.target.value)}
                  placeholder="+256 700 000 000"
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewCustomerModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs"
                >
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
