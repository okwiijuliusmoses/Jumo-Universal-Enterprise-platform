import React, { useState, useMemo, useEffect } from 'react';
import { 
  Building2, Users, BookOpen, Clipboard, DollarSign, Activity, Zap, 
  Search, Plus, CheckCircle, Clock, ShieldAlert, ArrowRight, Save,
  Trash2, Edit, AlertCircle, HelpCircle, FileText, CheckSquare, 
  Settings, ArrowRightLeft, FileSpreadsheet, Eye, RefreshCw
} from 'lucide-react';
import { JumoDataTable } from '../core/enterprise/components/JumoDataTable';
import { JumoForm } from '../core/enterprise/components/JumoForm';
import { formatNumber } from '../utils/formatters';
import { getModuleIdForOffice } from './OfficeModuleMapping';
import { getModuleById, GlobalCapabilityRegistry } from '../core/enterprise/registry/JumoGlobalRegistry';
import { provisionModuleWorkforce } from '../core/enterprise/registry/ModuleAgentWorkforceFactory';
import { AIHybridWorkspace } from '../core/enterprise/components/hybrid/AIHybridWorkspace';

interface UniversalOfficeWorkspaceProps {
  productId: string;
  activeOfficeId: string;
  officeName: string;
  departmentName: string;
  accentColorClass: string;
  bgAccentClass: string;
}

export const UniversalOfficeWorkspace: React.FC<UniversalOfficeWorkspaceProps> = ({
  productId,
  activeOfficeId,
  officeName,
  departmentName,
  accentColorClass,
  bgAccentClass
}) => {
  // Resolve dynamic module context
  const module = useMemo(() => {
    const moduleId = getModuleIdForOffice(activeOfficeId);
    return getModuleById(moduleId);
  }, [activeOfficeId]);

  if (!module) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-20 text-center">
        <div>
          <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-black text-slate-950 uppercase italic tracking-tight">Unmapped Office Context</h3>
          <p className="text-sm text-slate-500 font-bold mt-2">The AI Workforce Registry does not currently have an assigned module for: {officeName}</p>
          <button className="mt-6 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Request Agent Assignment</button>
        </div>
      </div>
    );
  }

  return <AIHybridWorkspace module={module} />;
};
