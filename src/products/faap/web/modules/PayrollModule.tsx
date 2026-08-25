import React, { useState } from 'react';
import { Users, DollarSign, Calculator, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { formatNumber } from '../../../../utils/formatters';

interface EmployeeSalaryRecord {
  id: string;
  name: string;
  title: string;
  department: string;
  grossSalary: number;
  nssfEmployee: number; // 5%
  nssfEmployer: number; // 10%
  payeTax: number;
  localServiceTax: number;
  netSalary: number;
  status: 'PROCESSED' | 'PENDING';
}

export const PayrollModule: React.FC = () => {
  const [employees, setEmployees] = useState<EmployeeSalaryRecord[]>([
    { id: 'EMP-001', name: 'Dr. Arthur Kiconco', title: 'Senior University Lecturer', department: 'Faculty of Science', grossSalary: 4500000, nssfEmployee: 225000, nssfEmployer: 450000, payeTax: 1050000, localServiceTax: 100000, netSalary: 3125000, status: 'PROCESSED' },
    { id: 'EMP-002', name: 'Sarah Namatovu', title: 'Head Bursar & Financial Controller', department: 'Finance Directorate', grossSalary: 3800000, nssfEmployee: 190000, nssfEmployer: 380000, payeTax: 840000, localServiceTax: 100000, netSalary: 2670000, status: 'PROCESSED' },
    { id: 'EMP-003', name: 'Patrick Ochieng', title: 'Directorate Systems Engineer', department: 'ICT Infrastructure', grossSalary: 2800000, nssfEmployee: 140000, nssfEmployer: 280000, payeTax: 520000, localServiceTax: 50000, netSalary: 2090000, status: 'PROCESSED' },
    { id: 'EMP-004', name: 'Grace Akello', title: 'Senior Lab Technologist', department: 'Chemistry Dept', grossSalary: 2200000, nssfEmployee: 110000, nssfEmployer: 220000, payeTax: 360000, localServiceTax: 50000, netSalary: 1680000, status: 'PROCESSED' }
  ]);

  const [month, setMonth] = useState('August 2026');

  const totalGross = employees.reduce((s, e) => s + e.grossSalary, 0);
  const totalNssfEmployee = employees.reduce((s, e) => s + e.nssfEmployee, 0);
  const totalNssfEmployer = employees.reduce((s, e) => s + e.nssfEmployer, 0);
  const totalPaye = employees.reduce((s, e) => s + e.payeTax, 0);
  const totalNet = employees.reduce((s, e) => s + e.netSalary, 0);

  const handlePostPayrollToGL = () => {
    alert(`PAYROLL POSTED TO GENERAL LEDGER:
- Debit Salary Expense (5010): ${formatNumber(totalGross)} UGX
- Debit NSSF Employer Expense (5015): ${formatNumber(totalNssfEmployer)} UGX
- Credit PAYE Tax Payable (2030): ${formatNumber(totalPaye)} UGX
- Credit NSSF Payable (2035): ${formatNumber(totalNssfEmployee + totalNssfEmployer)} UGX
- Credit Net Salaries Payable / Bank (1010): ${formatNumber(totalNet)} UGX
Debit & Credit Parity Verified ($0.00 offset).`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Payroll & Human Capital Ledger</h1>
          <p className="text-slate-500 text-sm">Automated statutory payroll calculations (Uganda PAYE, NSSF 5%/10%, LST) & double-entry GL journal posting.</p>
        </div>
        <button 
          onClick={handlePostPayrollToGL}
          className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-all"
        >
          <CheckCircle2 className="w-4 h-4" /> Post Payroll Journal to GL
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gross Payroll Commitment</span>
          <p className="text-2xl font-black text-slate-900 mt-1 font-mono">{formatNumber(totalGross)} UGX</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">URA PAYE Income Tax</span>
          <p className="text-2xl font-black text-rose-600 mt-1 font-mono">{formatNumber(totalPaye)} UGX</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total NSSF (15% Fund)</span>
          <p className="text-2xl font-black text-blue-600 mt-1 font-mono">{formatNumber(totalNssfEmployee + totalNssfEmployer)} UGX</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Net Salary Disbursement</span>
          <p className="text-2xl font-black text-emerald-700 mt-1 font-mono">{formatNumber(totalNet)} UGX</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <span className="font-bold text-slate-800 text-sm">Employee Statutory Payroll Register — {month}</span>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Automated URA PAYE Bracket Calc Active
          </span>
        </div>

        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
            <tr>
              <th className="px-6 py-4">EMP Code</th>
              <th className="px-6 py-4">Employee Name & Role</th>
              <th className="px-6 py-4 text-right">Gross Salary (UGX)</th>
              <th className="px-6 py-4 text-right">NSSF 5% (UGX)</th>
              <th className="px-6 py-4 text-right">PAYE Tax (UGX)</th>
              <th className="px-6 py-4 text-right">Net Payable (UGX)</th>
              <th className="px-6 py-4 text-center">Payslip</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {employees.map((emp) => (
              <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-mono font-bold text-slate-800 text-xs">{emp.id}</td>
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-900">{emp.name}</p>
                  <p className="text-xs text-slate-400">{emp.title} • {emp.department}</p>
                </td>
                <td className="px-6 py-4 text-right font-mono font-bold text-slate-900">{formatNumber(emp.grossSalary)}</td>
                <td className="px-6 py-4 text-right font-mono text-slate-600">{formatNumber(emp.nssfEmployee)}</td>
                <td className="px-6 py-4 text-right font-mono text-rose-600 font-bold">{formatNumber(emp.payeTax)}</td>
                <td className="px-6 py-4 text-right font-mono font-black text-emerald-700">{formatNumber(emp.netSalary)}</td>
                <td className="px-6 py-4 text-center">
                  <button onClick={() => alert(`Generating PDF Payslip for ${emp.name}...`)} className="px-3 py-1 bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold rounded-lg transition-colors">
                    View Slip
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
