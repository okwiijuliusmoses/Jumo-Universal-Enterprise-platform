import React from 'react';
import { FileText, CheckCircle, Database, Shield, Lock, Layers } from 'lucide-react';
import { FormSchemaDefinition } from '../../registry/FormSchemaRegistry';

interface FormMetadataPanelProps {
  formSchema: FormSchemaDefinition;
}

export const FormMetadataPanel: React.FC<FormMetadataPanelProps> = ({
  formSchema
}) => {
  return (
    <div className="space-y-6 text-slate-200">
      {/* Header */}
      <div className="flex items-start justify-between bg-slate-900/80 p-5 rounded-xl border border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-purple-400 border border-slate-700">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white tracking-tight">{formSchema.title}</h2>
              <span className="px-2 py-0.5 text-[10px] font-mono bg-purple-950 text-purple-400 border border-purple-800 rounded">
                {formSchema.id}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">{formSchema.description}</p>
          </div>
        </div>
      </div>

      {/* Fields List */}
      <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 space-y-3">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Layers className="w-4 h-4 text-purple-400" />
          <span>Form Fields & Input Controls ({formSchema.fields?.length || 0})</span>
        </h3>
        <div className="divide-y divide-slate-800/80 font-mono text-xs">
          {formSchema.fields?.map((field) => (
            <div key={field.name} className="py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-white font-medium">{field.label}</span>
                <code className="text-[10px] text-slate-500">{field.name}</code>
                {field.required && (
                  <span className="text-[9px] px-1.5 py-0.5 bg-rose-950 text-rose-400 border border-rose-800 rounded">
                    REQUIRED
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-[11px] px-2 py-0.5 bg-slate-950 rounded border border-slate-800 text-slate-300">
                  {field.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
