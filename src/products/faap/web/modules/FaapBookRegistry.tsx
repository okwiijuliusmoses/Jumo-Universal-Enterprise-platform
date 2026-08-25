import React, { useState } from 'react';
import { 
  Book, BookOpen, Calculator, ShieldCheck, DollarSign, FileSpreadsheet, 
  CheckCircle2, AlertTriangle, ArrowRightLeft, PieChart, Plus, Search, 
  Lock, TrendingUp, Landmark, ShieldAlert, Award, FileText, Check,
  ChevronRight, List, Layers, Wallet, Receipt, CreditCard, Landmark as BankIcon,
  Tag, ShoppingCart, Globe, Briefcase, Activity, Zap
} from 'lucide-react';

interface FaapBook {
  id: string;
  name: string;
  spec: string;
  icon: React.ElementType;
  category: 'BUDGET' | 'CASH' | 'LEDGER' | 'REGISTERS' | 'ANALYSIS' | 'TREASURY';
}

export const FaapBookRegistry: React.FC = () => {
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const books: FaapBook[] = [
    { id: 'FAAP_BK_01', name: 'Budget Book', category: 'BUDGET', icon: Book, spec: 'Stores approved annual operational and capital budgets by vote head and cost center.' },
    { id: 'FAAP_BK_02', name: 'Budget Recorder', category: 'BUDGET', icon: Activity, spec: 'Captures real-time budget allocation adjustments, supplementary budgets, and virement approvals.' },
    { id: 'FAAP_BK_03', name: 'Vote Book', category: 'BUDGET', icon: ShieldCheck, spec: 'Tracks commitments, encumbrances, actual expenditures, and remaining unencumbered vote balances.' },
    { id: 'FAAP_BK_04', name: 'Cash Book', category: 'CASH', icon: Wallet, spec: 'Master record of all liquid cash inflows and outflows across all bank and physical cash accounts.' },
    { id: 'FAAP_BK_05', name: 'Single Cash Book', category: 'CASH', icon: FileText, spec: 'Dedicated single-column record for basic physical cash office transactions.' },
    { id: 'FAAP_BK_06', name: 'Double Cash Book', category: 'CASH', icon: Layers, spec: 'Two-column record tracking physical Cash and Bank account transactions separately.' },
    { id: 'FAAP_BK_07', name: 'Triple Cash Book', category: 'CASH', icon: Landmark, spec: 'Three-column record tracking Cash, Bank, and Settlement/Discount balances.' },
    { id: 'FAAP_BK_08', name: 'Petty Cash Book', category: 'CASH', icon: DollarSign, spec: 'Imprest system record tracking minor operational cash disbursements with petty cash voucher links.' },
    { id: 'FAAP_BK_09', name: 'Receipt Book', category: 'CASH', icon: Receipt, spec: 'Sequential official receipt register recording all revenue collections with payment rail references.' },
    { id: 'FAAP_BK_10', name: 'Payment Book', category: 'CASH', icon: CreditCard, spec: 'Sequential payment voucher register recording all authorized disbursements and cheque numbers.' },
    { id: 'FAAP_BK_11', name: 'Journal Book', category: 'LEDGER', icon: BookOpen, spec: 'Master general journal recording non-cash transactions, accruals, depreciation, and adjusting entries.' },
    { id: 'FAAP_BK_12', name: 'Ledger Book', category: 'LEDGER', icon: BookOpen, spec: 'Principal ledger containing all asset, liability, equity, revenue, and expense accounts.' },
    { id: 'FAAP_BK_13', name: 'General Ledger', category: 'LEDGER', icon: List, spec: 'Summary control accounts for all subsidiary ledgers balancing total debits against credits.' },
    { id: 'FAAP_BK_14', name: 'Subsidiary Ledgers', category: 'LEDGER', icon: Users, spec: 'Granular individual customer, vendor, student, or parishioner sub-account ledgers.' },
    { id: 'FAAP_BK_15', name: 'Auditor Book', category: 'REGISTERS', icon: ShieldCheck, spec: 'Chronological immutable log of all ledger modifications, posting overrides, and administrative reversals.' },
    { id: 'FAAP_BK_16', name: 'Audit Register', category: 'REGISTERS', icon: ShieldAlert, spec: 'Real-time audit exceptions register flagged by the AI Financial Auditor ($0.00 offset failures, unusual amounts).' },
    { id: 'FAAP_BK_17', name: 'Asset Register', category: 'REGISTERS', icon: Box, spec: 'Fixed asset inventory tracking acquisition cost, useful life, accumulated depreciation, and physical location.' },
    { id: 'FAAP_BK_18', name: 'Liability Register', category: 'REGISTERS', icon: AlertTriangle, spec: 'Outstanding debt obligations register, long-term loans, debentures, and accrued interest schedules.' },
    { id: 'FAAP_BK_19', name: 'Revenue Register', category: 'REGISTERS', icon: TrendingUp, spec: 'Revenue categorization book tracking tuition fees, tithes, grants, merchant fees, and government transfers.' },
    { id: 'FAAP_BK_20', name: 'Expenditure Register', category: 'REGISTERS', icon: ShoppingCart, spec: 'Expense categorization book tracking payroll, utilities, maintenance, supplies, and capital projects.' },
    { id: 'FAAP_BK_21', name: 'Bank Register', category: 'REGISTERS', icon: BankIcon, spec: 'Individual bank account registers with uncleared cheques, pending deposits, and bank fee breakdowns.' },
    { id: 'FAAP_BK_22', name: 'Tax Register', category: 'REGISTERS', icon: Tag, spec: 'VAT/GST and statutory withholding tax register detailing tax collected, tax paid, and net remittance due.' },
    { id: 'FAAP_BK_23', name: 'Procurement Register', category: 'REGISTERS', icon: Briefcase, spec: 'Financial register of issued purchase orders, vendor contracts, and commit balances.' },
    { id: 'FAAP_BK_24', name: 'Financial Analysis Book', category: 'ANALYSIS', icon: PieChart, spec: 'Financial ratio trends, liquidity ratios, working capital metrics, and margin analysis records.' },
    { id: 'FAAP_BK_25', name: 'Grant/Fund Book', category: 'ANALYSIS', icon: Globe, spec: 'Dedicated fund accounting register tracking restricted donor grants, expenditure restrictions, and fund balances.' },
    { id: 'FAAP_BK_26', name: 'Departmental Book', category: 'ANALYSIS', icon: LayoutGrid, spec: 'Cost center financial ledgers breaking down revenues and expenses by academic faculty, hospital ward, or parish.' },
    { id: 'FAAP_BK_27', name: 'Treasury Clearing Book', category: 'TREASURY', icon: Zap, spec: 'JUMO Master Treasury 1.5% clearing fee settlement ledger tracking platform revenues and automated splits.' },
  ];

  const filteredBooks = books.filter(b => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderBookContent = (id: string) => {
    const book = books.find(b => b.id === id);
    if (!book) return null;

    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <book.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-slate-400">{book.id}</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 uppercase">
                  {book.category}
                </span>
              </div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">{book.name}</h2>
            </div>
          </div>
          <button 
            onClick={() => setSelectedBookId(null)}
            className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Registry
          </button>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl">
          <p className="text-sm text-emerald-900 font-medium">
            <span className="font-bold">Operating Specification:</span> {book.spec}
          </p>
        </div>

        {/* Mock Ledger Content */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm tracking-tight uppercase">Live Ledger Stream: {book.name}</h3>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">Synchronized with JUMO Kernel</span>
            </div>
          </div>
          <div className="p-12 text-center space-y-4">
            <div className="inline-flex p-4 rounded-full bg-slate-50 text-slate-300">
              <book.icon className="w-12 h-12" />
            </div>
            <div className="max-w-xs mx-auto">
              <h4 className="font-bold text-slate-900 text-sm">Initializing High-Resolution Ledger View...</h4>
              <p className="text-xs text-slate-500 mt-1">Retrieving cryptographically verified financial records from the JUMO FAAP distributed vault.</p>
            </div>
            <div className="flex items-center justify-center gap-2 pt-4">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-200 animate-bounce" />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-bounce delay-75" />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce delay-150" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {selectedBookId ? (
        renderBookContent(selectedBookId)
      ) : (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">FAAP Master Registry of Books</h2>
              <p className="text-xs text-slate-500">The authoritative 27 financial record books required for Enterprise-class institutional accounting.</p>
            </div>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                placeholder="Search financial books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition w-full md:w-64"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBooks.map(book => (
              <button
                key={book.id}
                onClick={() => setSelectedBookId(book.id)}
                className="group p-5 bg-white border border-slate-200 rounded-2xl shadow-xs hover:border-emerald-500 hover:shadow-lg transition-all text-left flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-600 group-hover:bg-emerald-50 group-hover:text-emerald-600 flex items-center justify-center transition-colors">
                      <book.icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">{book.id}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-1">{book.name}</h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{book.spec}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{book.category}</span>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Required Lucide icons not in original import
import { Box, Users, ArrowLeft, LayoutGrid } from 'lucide-react';
