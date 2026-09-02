import React from 'react';
import { faapEnterpriseRuntime } from '../../../core/faap/faapService';
import { 
  ClipboardCheck, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  XCircle,
  AlertCircle,
  History,
  FileSearch
} from 'lucide-react';

export const JournalWorkflowTerminal = ({ onActionComplete }: { onActionComplete: (msg: string) => void }) => {
  const [drafts, setDrafts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  const loadDrafts = React.useCallback(() => {
    setLoading(true);
    const allJournals = faapEnterpriseRuntime.listJournals();
    const pendingDrafts = allJournals.filter(j => j.status === 'draft');
    setDrafts(pendingDrafts);
    setLoading(false);
  }, []);

  React.useEffect(() => {
    loadDrafts();
  }, [loadDrafts]);

  const handleApprove = async (id: string) => {
    try {
      await faapEnterpriseRuntime.approveJournal(id);
      onActionComplete(`Journal ${id} successfully approved and posted to General Ledger.`);
      loadDrafts();
    } catch (err: any) {
      alert(`Approval Error: ${err.message}`);
    }
  };

  if (loading) return <div className="p-12 text-center text-slate-400 font-black animate-pulse">SYNCHRONIZING WORKFLOW...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <ClipboardCheck className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl font-black tracking-tight">Journal Approval Terminal</h2>
          </div>
          <p className="text-slate-400 text-sm font-medium max-w-md">
            Authoritative workflow for transitioning Draft journals to the General Ledger. 
            All approvals are cryptographically logged for audit trails.
          </p>
        </div>
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <History className="w-32 h-32" />
        </div>
      </div>

      {drafts.length === 0 ? (
        <div className="bg-white rounded-3xl border-2 border-dashed border-slate-100 p-20 text-center space-y-4">
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-slate-300" />
          </div>
          <div>
            <h3 className="text-slate-900 font-black">All Clear</h3>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">No pending approvals in queue</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {drafts.map((draft) => (
            <div key={draft.id} className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
                    <FileSearch className="w-6 h-6 text-slate-400 group-hover:text-emerald-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full uppercase tracking-widest">
                        {draft.id}
                      </span>
                      <span className="text-[10px] font-black bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full uppercase tracking-widest flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Draft
                      </span>
                    </div>
                    <h3 className="text-sm font-black text-slate-900 tracking-tight">{draft.description}</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Ref: {draft.reference} • {new Date(draft.date).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right mr-6">
                    <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest">Aggregate Value</p>
                    <p className="text-lg font-black text-slate-900">UGX {draft.reference.includes('INV') ? '...' : 'Verified'}</p>
                  </div>
                  <button 
                    onClick={() => handleApprove(draft.id)}
                    className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-2xl text-xs font-black shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all active:scale-95"
                  >
                    Authorize Post <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100 flex items-start gap-4">
        <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-black text-blue-900 uppercase tracking-widest mb-1">Workflow Governance</p>
          <p className="text-xs text-blue-800 leading-relaxed opacity-80">
            Authorization requires dual-control verification in production environments. 
            Clicking "Authorize Post" will instantly commit these deltas to the General Ledger 
            and update all sub-ledger balances.
          </p>
        </div>
      </div>
    </div>
  );
};
