import React from 'react';
import { 
  CheckCircle2, Clock, XCircle, AlertCircle, 
  FileEdit, FileX, ArrowLeftRight, Check,
  Banknote, AlertTriangle, ShieldCheck
} from 'lucide-react';

export type WorkflowStatus = 
  | 'PENDING' | 'APPROVED' | 'REJECTED' | 'IN_REVIEW' | 'DRAFT'
  | 'POSTED' | 'REVERSED' | 'VOIDED'
  | 'PAID' | 'UNPAID' | 'PARTIAL' | 'OVERDUE'
  | 'RECONCILED' | 'CLEARED' | 'FAILED' | 'SUCCESSFUL';

interface JumoWorkflowStatusProps {
  status: WorkflowStatus;
  label?: string;
  size?: 'sm' | 'md';
}

export const JumoWorkflowStatus: React.FC<JumoWorkflowStatusProps> = ({ 
  status, 
  label,
  size = 'sm'
}) => {
  const config = {
    // Basic Workflow
    PENDING: { icon: Clock, color: 'text-amber-600 bg-amber-50 border-amber-200', text: 'Pending' },
    APPROVED: { icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50 border-emerald-200', text: 'Approved' },
    REJECTED: { icon: XCircle, color: 'text-rose-600 bg-rose-50 border-rose-200', text: 'Rejected' },
    IN_REVIEW: { icon: AlertCircle, color: 'text-blue-600 bg-blue-50 border-blue-200', text: 'In Review' },
    DRAFT: { icon: FileEdit, color: 'text-slate-600 bg-slate-100 border-slate-300', text: 'Draft' },
    
    // Ledger & Transactions
    POSTED: { icon: ShieldCheck, color: 'text-emerald-700 bg-emerald-100 border-emerald-300', text: 'Posted' },
    REVERSED: { icon: ArrowLeftRight, color: 'text-purple-600 bg-purple-50 border-purple-200', text: 'Reversed' },
    VOIDED: { icon: FileX, color: 'text-slate-500 bg-slate-200 border-slate-300', text: 'Voided' },
    
    // Invoicing / Collections
    PAID: { icon: Banknote, color: 'text-emerald-600 bg-emerald-50 border-emerald-200', text: 'Paid' },
    UNPAID: { icon: Clock, color: 'text-amber-600 bg-amber-50 border-amber-200', text: 'Unpaid' },
    PARTIAL: { icon: Banknote, color: 'text-sky-600 bg-sky-50 border-sky-200', text: 'Partial' },
    OVERDUE: { icon: AlertTriangle, color: 'text-rose-600 bg-rose-50 border-rose-200', text: 'Overdue' },
    
    // Banking
    RECONCILED: { icon: Check, color: 'text-indigo-600 bg-indigo-50 border-indigo-200', text: 'Reconciled' },
    CLEARED: { icon: CheckCircle2, color: 'text-teal-600 bg-teal-50 border-teal-200', text: 'Cleared' },
    
    // Payments (Digital Pay)
    SUCCESSFUL: { icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50 border-emerald-200', text: 'Successful' },
    FAILED: { icon: XCircle, color: 'text-rose-600 bg-rose-50 border-rose-200', text: 'Failed' },
  };

  const { icon: Icon, color, text } = config[status] || config.PENDING;
  const displayText = label || text;

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border font-bold uppercase tracking-wide ${color} ${size === 'sm' ? 'text-[10px]' : 'text-xs'}`}>
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
      <span>{displayText}</span>
    </div>
  );
};
