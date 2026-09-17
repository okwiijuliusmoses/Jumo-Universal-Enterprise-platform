import React, { useState, useEffect } from "react";
import { 
  CreditCard, Search, RefreshCw, School, 
  CheckCircle2, Clock, ChevronRight, Plus
} from "lucide-react";

interface SchoolRecord {
  id: string;
  name: string;
  code: string;
  district: string;
  studentCount: number;
  totalCollections: number;
  activeTerm: string;
}

interface StudentFeeRecord {
  id: string;
  name: string;
  school_id: string;
  school_name: string;
  pay_code: string;
  class_grade: string;
  term_fee: number;
  paid_amount: number;
  balance: number;
  status: "CLEARED" | "PARTIAL" | "UNPAID";
}

export function SchoolPayWorkspace() {
  const [schools, setSchools] = useState<SchoolRecord[]>([]);
  const [students, setStudents] = useState<StudentFeeRecord[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"overview" | "schools" | "students" | "transactions" | "reports">("overview");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSchoolId, setSelectedSchoolId] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  // Form States
  const [payModalOpen, setPayModalOpen] = useState<boolean>(false);
  const [schoolModalOpen, setSchoolModalOpen] = useState<boolean>(false);
  const [studentModalOpen, setStudentModalOpen] = useState<boolean>(false);
  
  const [selectedStudent, setSelectedStudent] = useState<StudentFeeRecord | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<number>(500000);
  const [payerPhone, setPayerPhone] = useState<string>("256772123456");
  const [paymentChannel, setPaymentChannel] = useState<"MOBILE_MONEY" | "BANK">("MOBILE_MONEY");
  
  const [newSchoolName, setNewSchoolName] = useState<string>("");
  const [newSchoolCode, setNewSchoolCode] = useState<string>("");
  const [newStudentName, setNewStudentName] = useState<string>("");
  const [newStudentFee, setNewStudentFee] = useState<number>(1500000);
  
  const [processing, setProcessing] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const refreshData = async () => {
    try {
      const [schRes, stuRes, txRes] = await Promise.all([
        fetch("/api/v1/schoolpay/schools"),
        fetch("/api/v1/schoolpay/students"),
        fetch("/api/v1/schoolpay/transactions")
      ]);
      
      if (schRes.ok) {
        const d = await schRes.json();
        setSchools(d.schools || []);
      }
      
      if (stuRes.ok) {
        const d = await stuRes.json();
        setStudents(d.students || []);
      }

      if (txRes.ok) {
        const d = await txRes.json();
        setTransactions(d.transactions || []);
      }
    } catch (err) {
      console.error("Failed to fetch SchoolPay data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleRegisterSchool = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/v1/schoolpay/schools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newSchoolName,
          code: newSchoolCode,
          district: "Kampala",
          studentCount: 0,
          activeTerm: "Term 1 - 2026"
        })
      });
      if (res.ok) {
        setToastMessage(`Institution ${newSchoolName} registered successfully!`);
        setSchoolModalOpen(false);
        refreshData();
      }
    } catch (err) {
      console.error(err);
    }
    setTimeout(() => setToastMessage(null), 5000);
  };

  const handleRegisterStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    const school = schools.find(s => s.id === selectedSchoolId) || schools[0];
    if (!school) return;
    
    try {
      const res = await fetch("/api/v1/schoolpay/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newStudentName,
          school_id: school.id,
          school_name: school.name,
          pay_code: `PAY-${school.code.split("-")[1]}-${Date.now().toString().slice(-4)}`,
          class_grade: "Senior 1",
          term_fee: Number(newStudentFee)
        })
      });
      if (res.ok) {
        setToastMessage(`Student ${newStudentName} registered with active PayCode!`);
        setStudentModalOpen(false);
        refreshData();
      }
    } catch (err) {
      console.error(err);
    }
    setTimeout(() => setToastMessage(null), 5000);
  };

  const handleProcessPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent || paymentAmount <= 0) return;

    setProcessing(true);
    try {
      const res = await fetch("/api/v1/schoolpay/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: selectedStudent.id,
          amount: Number(paymentAmount),
          channel: paymentChannel,
          payerReference: payerPhone
        })
      });

      if (res.ok) {
        const d = await res.json();
        setToastMessage(`Payment of UGX ${Number(paymentAmount).toLocaleString()} processed successfully!`);
        setPayModalOpen(false);
        refreshData();
      }
    } catch (err: any) {
      setToastMessage(`Payment failed: ${err.message}`);
    } finally {
      setProcessing(false);
    }
    setTimeout(() => setToastMessage(null), 6000);
  };

  const filteredStudents = students.filter(s => {
    const matchQuery = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       s.pay_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       s.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchSchool = selectedSchoolId === "ALL" || s.school_id === selectedSchoolId;
    const matchStatus = statusFilter === "ALL" || s.status === statusFilter;
    return matchQuery && matchSchool && matchStatus;
  });

  const totalCollected = students.reduce((acc, s) => acc + s.paid_amount, 0);
  const totalOutstanding = students.reduce((acc, s) => acc + s.balance, 0);
  const totalExpected = students.reduce((acc, s) => acc + s.term_fee, 0);

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2 text-sm font-medium">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-xs text-emerald-600 hover:text-emerald-900 font-bold">Dismiss</button>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-center text-blue-600 font-bold shrink-0">
              <School className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold text-slate-900">School Pay Institutional Payment Switch</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  DIGITAL PAY ORCHESTRATION
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                  REAL TIME
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Automated student PayCode generation, mobile money/bank tuition collection, termly fee clearance cards, and real-time reconciliation.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setSchoolModalOpen(true)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold border border-slate-200 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Register School
            </button>
            <button onClick={() => setStudentModalOpen(true)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Register Student
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div className="text-xs font-medium text-slate-500">Total Tuition Billed</div>
            <div className="text-lg font-bold text-slate-900 mt-1">UGX {totalExpected.toLocaleString()}</div>
            <div className="text-[11px] text-blue-600 font-medium mt-1">Term 1 Active Invoices</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div className="text-xs font-medium text-slate-500">Collected via Switch</div>
            <div className="text-lg font-bold text-emerald-600 mt-1">UGX {totalCollected.toLocaleString()}</div>
            <div className="text-[11px] text-emerald-600 font-medium mt-1">Mobile Money & Bank Slips</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div className="text-xs font-medium text-slate-500">Outstanding Balance</div>
            <div className="text-lg font-bold text-amber-600 mt-1">UGX {totalOutstanding.toLocaleString()}</div>
            <div className="text-[11px] text-amber-600 font-medium mt-1">Defaulters Follow-up</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div className="text-xs font-medium text-slate-500">Registered Institutions</div>
            <div className="text-lg font-bold text-slate-900 mt-1">{schools.length} Schools</div>
            <div className="text-[11px] text-slate-500 mt-1">{students.length} Active PayCodes</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-slate-200 text-xs font-bold text-slate-500 px-2">
        <button onClick={() => setActiveTab("overview")} className={`pb-3 border-b-2 transition-all ${activeTab === "overview" ? "border-blue-600 text-blue-700" : "border-transparent hover:text-slate-800"}`}>Overview</button>
        <button onClick={() => setActiveTab("schools")} className={`pb-3 border-b-2 transition-all ${activeTab === "schools" ? "border-blue-600 text-blue-700" : "border-transparent hover:text-slate-800"}`}>Institution Registry</button>
        <button onClick={() => setActiveTab("students")} className={`pb-3 border-b-2 transition-all ${activeTab === "students" ? "border-blue-600 text-blue-700" : "border-transparent hover:text-slate-800"}`}>Student Ledger</button>
        <button onClick={() => setActiveTab("transactions")} className={`pb-3 border-b-2 transition-all ${activeTab === "transactions" ? "border-blue-600 text-blue-700" : "border-transparent hover:text-slate-800"}`}>Transaction History</button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        {activeTab === "overview" && (
          <div className="p-8 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Live Collection Stream</h3>
              <button className="text-xs font-bold text-blue-700 hover:underline">Download Settlement Batch</button>
            </div>
            <div className="space-y-4">
              {transactions.length > 0 ? transactions.slice(0, 5).map(tx => (
                <div key={tx.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-lg border border-slate-100 flex items-center justify-center text-blue-600">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">UGX {tx.amount.toLocaleString()}</div>
                      <div className="text-xs text-slate-500 font-medium">{tx.pay_code} • {tx.channel}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-slate-900">{tx.payer_reference}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{new Date(tx.timestamp).toLocaleString()}</div>
                  </div>
                </div>
              )) : (
                <div className="py-12 text-center text-slate-400 text-sm italic">Waiting for incoming fee collections...</div>
              )}
            </div>
          </div>
        )}

        {activeTab === "students" && (
          <div>
            <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/30">
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input 
                    type="text"
                    placeholder="Search PayCode or Name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 w-64"
                  />
                </div>
                <select 
                  value={selectedSchoolId}
                  onChange={(e) => setSelectedSchoolId(e.target.value)}
                  className="py-1.5 px-3 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-blue-500"
                >
                  <option value="ALL">All Schools</option>
                  {schools.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 border-collapse">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100 uppercase tracking-widest text-[10px]">
                  <tr>
                    <th className="px-6 py-4">Student</th>
                    <th className="px-6 py-4">PayCode</th>
                    <th className="px-6 py-4">Institution</th>
                    <th className="px-6 py-4">Term Fee</th>
                    <th className="px-6 py-4">Paid</th>
                    <th className="px-6 py-4 text-right">Balance</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.map((stu) => (
                    <tr key={stu.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900">{stu.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">{stu.class_grade}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{stu.pay_code}</span>
                      </td>
                      <td className="px-6 py-4 font-medium">{stu.school_name}</td>
                      <td className="px-6 py-4 font-medium">UGX {stu.term_fee.toLocaleString()}</td>
                      <td className="px-6 py-4 font-bold text-emerald-600">UGX {stu.paid_amount.toLocaleString()}</td>
                      <td className="px-6 py-4 font-bold text-amber-600 text-right">UGX {stu.balance.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                          stu.status === "CLEARED" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}>{stu.status}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => { setSelectedStudent(stu); setPaymentAmount(stu.balance); setPayModalOpen(true); }} className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-[10px] font-bold shadow-sm hover:bg-blue-700">Post Payment</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "schools" && (
          <div className="p-0">
             <table className="w-full text-left text-xs text-slate-600 border-collapse">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100 uppercase tracking-widest text-[10px]">
                  <tr>
                    <th className="px-6 py-4">School Code</th>
                    <th className="px-6 py-4">School Name</th>
                    <th className="px-6 py-4">District</th>
                    <th className="px-6 py-4">Active Term</th>
                    <th className="px-6 py-4 text-right">Collections</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {schools.map(s => (
                    <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-slate-900">{s.code}</td>
                      <td className="px-6 py-4 font-bold text-slate-900">{s.name}</td>
                      <td className="px-6 py-4 font-medium">{s.district}</td>
                      <td className="px-6 py-4 text-slate-500 font-medium">{s.activeTerm}</td>
                      <td className="px-6 py-4 text-right font-bold text-emerald-600">UGX {s.totalCollections.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
        )}
      </div>

      {/* Modals */}
      {schoolModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Register Institution</h3>
              <button onClick={() => setSchoolModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleRegisterSchool} className="p-6 space-y-4">
               <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">School Name</label>
                <input required type="text" value={newSchoolName} onChange={e => setNewSchoolName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Short Code</label>
                <input required type="text" value={newSchoolCode} onChange={e => setNewSchoolCode(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-blue-500" placeholder="e.g. SCH-GAY-101" />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 mt-2">Register & Activate Switch</button>
            </form>
          </div>
        </div>
      )}

      {studentModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Register Student</h3>
              <button onClick={() => setStudentModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleRegisterStudent} className="p-6 space-y-4">
               <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Institution</label>
                <select value={selectedSchoolId} onChange={e => setSelectedSchoolId(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-blue-500">
                  {schools.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Student Full Name</label>
                <input required type="text" value={newStudentName} onChange={e => setNewStudentName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Term Fee Amount (UGX)</label>
                <input required type="number" value={newStudentFee} onChange={e => setNewStudentFee(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-blue-500" />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 mt-2">Generate PayCode & Register</button>
            </form>
          </div>
        </div>
      )}

      {/* Pay Modal */}
      {payModalOpen && selectedStudent && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden border border-slate-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-slate-900">Post Student Fee Payment</h3>
              <button onClick={() => setPayModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleProcessPayment} className="p-6 space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Student / PayCode</div>
                <div className="text-sm font-bold text-slate-900">{selectedStudent.name} ({selectedStudent.pay_code})</div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Payment Amount (UGX)</label>
                <input required type="number" value={paymentAmount} onChange={e => setPaymentAmount(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500 font-bold" max={selectedStudent.balance} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Channel</label>
                  <select value={paymentChannel} onChange={e => setPaymentChannel(e.target.value as any)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-xs outline-none">
                    <option value="MOBILE_MONEY">Mobile Money</option>
                    <option value="BANK">Bank Deposit</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Payer Reference</label>
                  <input required type="text" value={payerPhone} onChange={e => setPayerPhone(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-xs outline-none" />
                </div>
              </div>
              <button type="submit" disabled={processing} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-700/10 mt-2">
                {processing ? "Posting to Switch..." : "Confirm & Issue Receipt"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
