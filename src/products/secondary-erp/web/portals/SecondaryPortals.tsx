import React, { useState } from 'react';
import { 
  Building2, Users, BookOpen, DollarSign, Activity, Heart, ShieldCheck, 
  Layers, Clipboard, Globe, Zap, Plus, CheckCircle2, TrendingUp, Download, Printer, FileText
} from 'lucide-react';
import { JumoDataTable } from '../../../../core/enterprise/components/JumoDataTable';
import { JumoForm } from '../../../../core/enterprise/components/JumoForm';
import { SecondaryService } from '../../domain/SecondaryService';
import { DocumentGenerator, DocumentData } from '../../../../components/common/documents/DocumentGenerator';

export { SecondarySenatePortal } from './governance/SecondarySenatePortal';
export { SecondaryRegistrarPortal } from './admissions/SecondaryRegistrarPortal';
export { SecondaryHodPortal } from './academics/SecondaryHodPortal';
export { SecondaryBursarPortal } from './finance/SecondaryBursarPortal';

// ==========================================
// 1. SECONDARY EXAMINATIONS (UNEB UCE / UACE)
// ==========================================
export const SecondaryExamsPortal: React.FC = () => {
  const secondaryService = SecondaryService.getInstance();
  const [candidates, setCandidates] = useState(secondaryService.getCandidates());
  const [showRegForm, setShowRegForm] = useState(false);
  const [activeDoc, setActiveDoc] = useState<DocumentData | null>(null);

  const handleRegisterCandidate = (data: any) => {
    if (data.subjectCombination) {
      const validation = secondaryService.validateSubjectCombination(
        data.subjectCombination,
        Number(data.mathGrade || 2),
        Number(data.englishGrade || 2)
      );
      if (!validation.valid) {
        alert(validation.message);
        return;
      }
    }

    const newCand = secondaryService.registerUnebCandidate(data.candidateName, data.level, data.subjectCombination);
    setCandidates([...secondaryService.getCandidates()]);
    setShowRegForm(false);
  };

  const handleGenerateUnebE15Doc = (candidate: any) => {
    setActiveDoc({
      documentType: 'UNEB_FORM_E15',
      referenceNumber: `UNEB-E15-${candidate.unebIndexNumber.replace('/', '-')}`,
      issueDate: new Date().toISOString().split('T')[0],
      issuerName: 'Principal - Dr. James Wandera',
      issuerTitle: 'UNEB Center Supervisor & Academic Senate Chairman',
      recipientName: candidate.candidateName,
      recipientId: candidate.unebIndexNumber,
      institutionName: 'Uganda National Examinations Board (UNEB Center U0082)',
      title: 'Official UNEB Form E15 Candidate Registration Entry Transcript',
      summary: `Certified UNEB Examination Registration Form E15 entry for candidate ${candidate.candidateName}.`,
      details: {
        'UNEB Index Number': candidate.unebIndexNumber,
        'Examination Level': candidate.level,
        'Approved Subject Combination': candidate.subjectCombination || 'General UCE Core Curriculum',
        'Registration Status': candidate.registrationStatus,
        'UACE Points Tally': candidate.uacePointsTally ? `${candidate.uacePointsTally} / 20 Points` : 'Pending UCE Results',
        'Center Verification': 'Verified & Sealed by Center Head of Examinations'
      }
    });
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 font-sans pb-12">
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 text-purple-700 rounded-xl">
            <Clipboard className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase italic">Secondary UNEB Examination Center (UCE & UACE)</h1>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
              UNEB Index Numbers • Continuous Assessment (NCDC) • Form E15 • 20-Point Grading
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowRegForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-purple-700 transition"
          >
            <Plus className="w-3.5 h-3.5" /> Register UNEB Candidate
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-6 space-y-6">
        <JumoDataTable
          data={candidates}
          title="Candidate Examination Ledger & Point Tally"
          columns={[
            { header: 'Index No.', accessor: 'unebIndexNumber', className: 'font-mono text-xs font-bold text-indigo-600' },
            { header: 'Candidate Name', accessor: 'candidateName', className: 'font-bold' },
            { header: 'Level', accessor: 'level', className: 'text-xs text-slate-500 font-bold' },
            { header: 'Subject Combination', accessor: (c: any) => c.subjectCombination || 'UCE Standard', className: 'font-mono text-xs font-bold text-slate-700' },
            { header: 'Points / Score', accessor: (c: any) => c.uacePointsTally ? `${c.uacePointsTally} / 20 Points` : 'N/A', className: 'font-black text-indigo-700 text-center' },
            { header: 'Actions', accessor: (c: any) => (
              <button 
                onClick={() => handleGenerateUnebE15Doc(c)}
                className="flex items-center gap-1 px-2.5 py-1 bg-purple-50 border border-purple-200 text-purple-700 rounded-lg text-[10px] font-bold hover:bg-purple-100"
              >
                <FileText className="w-3 h-3" /> Form E15 Entry
              </button>
            )}
          ]}
        />

        {showRegForm && (
          <JumoForm
            title="Register Secondary UNEB Candidate"
            fields={[
              { id: 'candidateName', label: 'Candidate Full Name', type: 'text', required: true },
              { id: 'level', label: 'Examination Level', type: 'select', required: true, options: [
                { value: 'UACE', label: 'UACE (Senior Six)' },
                { value: 'UCE', label: 'UCE (Senior Four)' }
              ]},
              { id: 'subjectCombination', label: 'A-Level Subject Combination (if UACE)', type: 'select', options: [
                { value: 'PCM/M', label: 'PCM/M (Physics, Chemistry, Math)' },
                { value: 'PCB/Sub-M', label: 'PCB/Sub-M (Physics, Chemistry, Biology)' },
                { value: 'HEG/ICT', label: 'HEG/ICT (History, Economics, Geography)' }
              ]},
              { id: 'mathGrade', label: 'O-Level Math Grade (D1=1, D2=2, C3=3, etc.)', type: 'number', placeholder: '2' },
              { id: 'englishGrade', label: 'O-Level English Grade (D1=1, D2=2, C3=3, etc.)', type: 'number', placeholder: '2' }
            ]}
            onSubmit={handleRegisterCandidate}
            onCancel={() => setShowRegForm(false)}
          />
        )}

        {activeDoc && (
          <DocumentGenerator
            data={activeDoc}
            onClose={() => setActiveDoc(null)}
          />
        )}
      </div>
    </div>
  );
};

// ==========================================
// 2. SECONDARY SCIENCE LABORATORIES
// ==========================================
export const SecondaryLabsPortal: React.FC = () => {
  const secondaryService = SecondaryService.getInstance();
  const [reagents, setReagents] = useState(secondaryService.getLabReagents());

  const handleDeplete = (id: string) => {
    secondaryService.depleteLabReagent(id, 1);
    setReagents([...secondaryService.getLabReagents()]);
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 font-sans pb-12">
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase italic">Senior Science Laboratories & Apparatus</h1>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
              Physics, Chemistry, Biology & Agriculture Labs • Chemical Safety • Requisitions
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-6 space-y-6">
        <JumoDataTable
          data={reagents}
          title="Laboratory Inventory & Chemical Register"
          columns={[
            { header: 'Apparatus Code', accessor: 'id', className: 'font-mono text-xs font-bold text-slate-400' },
            { header: 'Chemical / Apparatus Name', accessor: 'chemicalName', className: 'font-bold' },
            { header: 'Laboratory', accessor: 'labName', className: 'text-xs text-indigo-600 font-bold' },
            { header: 'Quantity in Store', accessor: (e: any) => `${e.quantityInStock} ${e.unitOfMeasure}`, className: 'text-center font-bold' },
            { header: 'Last Used Date', accessor: 'lastUsedDate', className: 'text-xs text-slate-500' },
            { header: 'Actions', accessor: (e: any) => (
              <button 
                onClick={() => handleDeplete(e.id)}
                className="px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-700 rounded-lg text-[10px] font-bold hover:bg-amber-100"
              >
                Log Practical Use (-1 Unit)
              </button>
            )}
          ]}
        />
      </div>
    </div>
  );
};

// ==========================================
// 3. STUDENT AFFAIRS & WELFARE
// ==========================================
export const SecondaryWelfarePortal: React.FC = () => {
  const [affairs] = useState([
    { id: 'WEL-01', wing: 'Senior Boarding Section', officer: 'Dean of Students', count: '850 Boarders', status: 'ALL_PRESENT' },
    { id: 'WEL-02', wing: 'Senior Sickbay & Health Bay', officer: 'Nursing Sister', count: '3 In-Patients', status: 'STABLE' },
    { id: 'WEL-03', wing: 'Transport & Fleet Logistics', officer: 'Transport Officer', count: '6 Buses Active', status: 'OPERATIONAL' },
    { id: 'WEL-04', wing: 'Main Dining Hall & Catering', officer: 'Catering Head', count: '1,450 Meals/Day', status: 'ON_SCHEDULE' }
  ]);

  return (
    <div className="h-full flex flex-col bg-slate-50 font-sans pb-12">
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase italic">Secondary Student Affairs & Welfare Directorate</h1>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
              Dean of Students • Boarding Operations • Sickbay • Fleet & Dining
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-6 space-y-6">
        <JumoDataTable
          data={affairs}
          title="Student Welfare Operational Sections"
          columns={[
            { header: 'Section Ref', accessor: 'id', className: 'font-mono text-xs font-bold text-slate-400' },
            { header: 'Welfare Wing', accessor: 'wing', className: 'font-bold' },
            { header: 'Lead Officer', accessor: 'officer', className: 'text-xs text-slate-700 font-bold' },
            { header: 'Current Capacity / Census', accessor: 'count', className: 'text-center font-bold text-indigo-600' },
            { header: 'Status', accessor: (a: any) => (
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[9px] font-black uppercase">{a.status}</span>
            )}
          ]}
        />
      </div>
    </div>
  );
};
