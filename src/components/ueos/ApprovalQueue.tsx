import React from "react";
import { CheckSquare, ShieldCheck, AlertCircle, ArrowUpRight } from "lucide-react";

export interface ApprovalItem {
  id: string;
  title: string;
  requester: string;
  department: string;
  amount?: string;
  submittedAt: string;
  riskScore?: string;
}

export interface ApprovalQueueProps {
  items?: ApprovalItem[];
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

const DEFAULT_ITEMS: ApprovalItem[] = [
  { id: "AP-801", title: "FAAP Treasury Budget Reallocation", requester: "Dr. K. Ssebaana", department: "Finance & Accounts", amount: "$45,000.00", submittedAt: "12 mins ago", riskScore: "Low" },
  { id: "AP-802", title: "Procurement Vendor Contract - ICT Infrastructure", requester: "Eng. M. Mukasa", department: "ICT Directorate", amount: "$120,000.00", submittedAt: "35 mins ago", riskScore: "Low" },
  { id: "AP-803", title: "Faculty Senate Research Grant Disbursement", requester: "Prof. L. Nsubuga", department: "Academic Senate", amount: "$8,500.00", submittedAt: "1 hour ago", riskScore: "Medium" }
];

export const ApprovalQueue: React.FC<ApprovalQueueProps> = ({
  items = DEFAULT_ITEMS,
  onApprove,
  onReject,
}) => {
  return (
    <div id="approval-queue-panel" className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <CheckSquare className="h-4 w-4 text-amber-600" />
          <h3 className="font-extrabold text-sm text-slate-900">Pending Executive Approvals</h3>
        </div>
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
          {items.length} Pending
        </span>
      </div>

      {/* Queue Items */}
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-2 text-xs">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="font-bold text-slate-900 text-xs">{item.title}</div>
                <div className="text-[11px] text-slate-500">
                  Requester: <span className="font-semibold text-slate-700">{item.requester}</span> ({item.department})
                </div>
              </div>
              {item.amount && (
                <div className="text-right font-mono font-black text-slate-900 text-sm">
                  {item.amount}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-[10px] text-slate-500 font-mono">
              <div>
                <span>ID: {item.id}</span> • <span>Submitted: {item.submittedAt}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onApprove && onApprove(item.id)}
                  className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-teal-400 font-bold rounded text-[10px] cursor-pointer"
                >
                  Approve Entry
                </button>
                <button
                  onClick={() => onReject && onReject(item.id)}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded text-[10px] cursor-pointer"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
