import React from 'react';
import { X, Save, AlertCircle, Plus, Trash2 } from 'lucide-react';

interface ColumnDef {
  id: string;
  header: string;
  type: 'text' | 'number' | 'select' | 'amount';
  options?: { value: string | number; label: string }[];
  placeholder?: string;
  width?: string;
  readOnly?: boolean;
}

interface JumoTransactionFormProps {
  title: string;
  headerFields: React.ReactNode;
  columns: ColumnDef[];
  lines: any[];
  onLineChange: (index: number, field: string, value: any) => void;
  onAddLine: () => void;
  onRemoveLine: (index: number) => void;
  footerContent?: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  submitLabel?: string;
  isSubmitting?: boolean;
  error?: string | null;
  width?: 'lg' | 'xl' | '2xl' | 'full';
}

export const JumoTransactionForm: React.FC<JumoTransactionFormProps> = ({
  title,
  headerFields,
  columns,
  lines,
  onLineChange,
  onAddLine,
  onRemoveLine,
  footerContent,
  onSubmit,
  onCancel,
  submitLabel = "Save and Close",
  isSubmitting = false,
  error = null,
  width = 'full'
}) => {
  const widthClass = {
    'lg': 'max-w-lg',
    'xl': 'max-w-xl',
    '2xl': 'max-w-4xl',
    'full': 'w-[95vw] max-w-6xl'
  }[width];

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className={`bg-white rounded-2xl shadow-2xl ${widthClass} my-auto overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[95vh]`}>
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 sticky top-0 z-20">
          <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">{title}</h3>
          <button 
            onClick={onCancel}
            className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors text-slate-400 hover:text-slate-600"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="px-6 py-3 bg-rose-50 border-b border-rose-100 flex items-center gap-3 shrink-0">
            <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
            <p className="text-xs font-bold text-rose-700">{error}</p>
          </div>
        )}

        <form onSubmit={onSubmit} className="flex-1 overflow-y-auto flex flex-col">
          {/* Top Section */}
          <div className="p-6 bg-white shrink-0 border-b border-slate-100">
            {headerFields}
          </div>

          {/* Lines Grid */}
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-200 sticky top-0 z-10">
                <tr>
                  <th className="px-3 py-3 w-10 text-center">#</th>
                  {columns.map(col => (
                    <th key={col.id} className={`px-3 py-3 ${col.width || ''}`}>{col.header}</th>
                  ))}
                  <th className="px-3 py-3 w-12 text-center"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {lines.map((line, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-3 py-2 text-center text-xs font-bold text-slate-400">{idx + 1}</td>
                    {columns.map(col => (
                      <td key={col.id} className="px-3 py-2">
                        {col.type === 'select' ? (
                          <select
                            value={line[col.id] || ''}
                            onChange={(e) => onLineChange(idx, col.id, e.target.value)}
                            disabled={col.readOnly}
                            className="w-full bg-transparent border-0 focus:ring-1 focus:ring-indigo-500 focus:bg-white rounded px-2 py-1.5 text-sm outline-none transition-all"
                          >
                            <option value="">Select...</option>
                            {col.options?.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={col.type === 'amount' ? 'number' : col.type}
                            value={line[col.id] === 0 && col.type === 'amount' ? '' : (line[col.id] || '')}
                            onChange={(e) => onLineChange(idx, col.id, col.type === 'amount' ? Number(e.target.value) : e.target.value)}
                            placeholder={col.placeholder}
                            disabled={col.readOnly}
                            min={col.type === 'amount' ? 0 : undefined}
                            step={col.type === 'amount' ? "0.01" : undefined}
                            className={`w-full bg-transparent border-0 focus:ring-1 focus:ring-indigo-500 focus:bg-white rounded px-2 py-1.5 text-sm outline-none transition-all ${col.type === 'amount' ? 'text-right font-mono font-medium' : ''}`}
                          />
                        )}
                      </td>
                    ))}
                    <td className="px-3 py-2 text-center">
                      <button 
                        type="button"
                        onClick={() => onRemoveLine(idx)}
                        disabled={lines.length <= 2}
                        className="p-1.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-0 focus:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="p-3 border-t border-slate-100">
              <button 
                type="button"
                onClick={onAddLine}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add lines
              </button>
            </div>
          </div>

          {/* Footer Section (Memo, Totals) */}
          <div className="p-6 bg-slate-50 border-t border-slate-200 shrink-0 flex flex-col md:flex-row gap-6 justify-between">
            {footerContent}
          </div>

          {/* Submit Action Bar */}
          <div className="px-6 py-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between sticky bottom-0 z-20">
            <button
              type="button"
              className="text-xs font-bold text-slate-500 hover:text-slate-700"
            >
              Clear
            </button>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="px-5 py-2 text-xs font-bold text-slate-600 uppercase tracking-wide hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold uppercase tracking-wide hover:bg-indigo-700 shadow-sm shadow-indigo-200 transition-all active:scale-95 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {isSubmitting ? 'Saving...' : submitLabel}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
