import React, { useState } from 'react';
import { 
  Clipboard, BookOpen, Globe, Award, Plus, CheckCircle2, 
  TrendingUp, Download, Printer, Search, Star, Sparkles, FileText
} from 'lucide-react';
import { JumoDataTable } from '../../../../../core/enterprise/components/JumoDataTable';
import { JumoForm } from '../../../../../core/enterprise/components/JumoForm';
import { DocumentGenerator, DocumentData } from '../../../../../components/common/documents/DocumentGenerator';

// ==========================================
// 1. EXAMINATIONS & UNEB/PLE OFFICE
// ==========================================
export const PrimaryExamsPortal: React.FC = () => {
  const [candidates, setCandidates] = useState([
    { indexNo: 'U0042/001', name: 'Mbabazi Angel', stream: 'P.7 Blue', eng: 92, mth: 95, sci: 88, sst: 90, aggregate: 4, division: 'DIV 1' },
    { indexNo: 'U0042/002', name: 'Kato Samuel', stream: 'P.7 Blue', eng: 85, mth: 90, sci: 92, sst: 84, aggregate: 4, division: 'DIV 1' },
    { indexNo: 'U0042/003', name: 'Namubiru Grace', stream: 'P.7 Green', eng: 78, mth: 82, sci: 85, sst: 80, aggregate: 6, division: 'DIV 1' },
    { indexNo: 'U0042/004', name: 'Opolot Isaac', stream: 'P.7 Green', eng: 74, mth: 76, sci: 80, sst: 72, aggregate: 8, division: 'DIV 1' },
    { indexNo: 'U0042/005', name: 'Tumuhimbise Joshua', stream: 'P.7 Red', eng: 65, mth: 70, sci: 68, sst: 70, aggregate: 12, division: 'DIV 2' }
  ]);
  const [showMarkForm, setShowMarkForm] = useState(false);
  const [activeDoc, setActiveDoc] = useState<DocumentData | null>(null);

  const handleAddCandidate = (data: any) => {
    const agg = Number(data.aggregate || 4);
    const div = agg <= 12 ? 'DIV 1' : 'DIV 2';
    setCandidates([...candidates, {
      indexNo: data.indexNo,
      name: data.name,
      stream: data.stream,
      eng: Number(data.eng),
      mth: Number(data.mth),
      sci: Number(data.sci),
      sst: Number(data.sst),
      aggregate: agg,
      division: div
    }]);
    setShowMarkForm(false);
  };

  const handleGenerateReportCard = (candidate: any) => {
    setActiveDoc({
      documentType: 'STUDENT_REPORT_CARD',
      referenceNumber: `REP-${candidate.indexNo.replace('/', '-')}`,
      issueDate: new Date().toISOString().split('T')[0],
      issuerName: 'Dr. Mugisha Arthur',
      issuerTitle: 'Head Teacher & UNEB Center Supervisor',
      recipientName: candidate.name,
      recipientId: candidate.indexNo,
      institutionName: 'Sovereign Academy Primary',
      title: 'Official Primary Leaving Examinations Assessment Report Card',
      summary: `Certified continuous assessment and mock examination results for ${candidate.name}.`,
      details: {
        'UNEB Index No': candidate.indexNo,
        'Class Stream': candidate.stream,
        'English Language': `${candidate.eng}% (Distinction 1)`,
        'Mathematics': `${candidate.mth}% (Distinction 1)`,
        'Integrated Science': `${candidate.sci}% (Distinction 1)`,
        'Social Studies': `${candidate.sst}% (Distinction 1)`,
        'Total Aggregate': `Agg ${candidate.aggregate}`,
        'Division Status': candidate.division,
        'Conduct & Discipline': 'Exemplary',
        'Head Teacher Remark': 'Outstanding academic consistency. Recommended for Division 1 in UNEB PLE.'
      }
    });
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 font-sans pb-12">
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 text-purple-700 rounded-xl">
            <Clipboard className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase italic">Examinations & UNEB / PLE Office</h1>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
              Continuous Assessment • Mock Grading • Aggregate Computation • Report Card Engine
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowMarkForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-purple-700 transition"
          >
            <Plus className="w-3.5 h-3.5" /> Enter Candidate Marks
          </button>
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-3 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800"
          >
            <Printer className="w-3.5 h-3.5" /> Print Marksheet
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Candidates Registered</span>
            <div className="text-2xl font-black text-slate-900 mt-1">186 Candidates</div>
            <span className="text-[10px] text-emerald-600 font-bold mt-1">UNEB Center No: 0042</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Division 1 Projection</span>
            <div className="text-2xl font-black text-emerald-600 mt-1">96.8% Div 1</div>
            <span className="text-[10px] text-emerald-600 font-bold mt-1">Aggregate 4 - 12 Range</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Top Scoring Aggregate</span>
            <div className="text-2xl font-black text-indigo-600 mt-1">Agg 4 (42 Pupils)</div>
            <span className="text-[10px] text-slate-500 font-bold mt-1">Distinction 1 in all 4</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Current Exam Series</span>
            <div className="text-2xl font-black text-slate-900 mt-1">Pre-PLE Joint Mock</div>
            <span className="text-[10px] text-slate-500 font-bold mt-1">Wakiso Joint Exams</span>
          </div>
        </div>

        <JumoDataTable
          data={candidates}
          title="Candidate Marksheet & Grading Registry"
          columns={[
            { header: 'Index No.', accessor: 'indexNo', className: 'font-mono text-xs font-bold text-indigo-600' },
            { header: 'Candidate Full Name', accessor: 'name', className: 'font-bold' },
            { header: 'Stream', accessor: 'stream', className: 'text-xs text-slate-500 font-bold' },
            { header: 'ENG', accessor: (c: any) => `${c.eng}%`, className: 'text-center font-mono font-bold' },
            { header: 'MTH', accessor: (c: any) => `${c.mth}%`, className: 'text-center font-mono font-bold' },
            { header: 'SCI', accessor: (c: any) => `${c.sci}%`, className: 'text-center font-mono font-bold' },
            { header: 'SST', accessor: (c: any) => `${c.sst}%`, className: 'text-center font-mono font-bold' },
            { header: 'Aggregate', accessor: (c: any) => `Agg ${c.aggregate}`, className: 'text-center font-black text-indigo-700' },
            { header: 'Division', accessor: (c: any) => (
              <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${c.division === 'DIV 1' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}`}>
                {c.division}
              </span>
            )},
            { header: 'Actions', accessor: (c: any) => (
              <button 
                onClick={() => handleGenerateReportCard(c)}
                className="flex items-center gap-1 px-2.5 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-lg text-[10px] font-bold hover:bg-indigo-100"
              >
                <FileText className="w-3 h-3" /> Report Card
              </button>
            )}
          ]}
        />

        {showMarkForm && (
          <JumoForm
            title="Candidate Exam Score Entry"
            fields={[
              { id: 'indexNo', label: 'UNEB / Center Index No.', type: 'text', required: true, placeholder: 'U0042/006' },
              { id: 'name', label: 'Pupil Full Name', type: 'text', required: true },
              { id: 'stream', label: 'P.7 Stream', type: 'select', required: true, options: [
                { value: 'P.7 Blue', label: 'P.7 Blue' },
                { value: 'P.7 Green', label: 'P.7 Green' },
                { value: 'P.7 Red', label: 'P.7 Red' },
                { value: 'P.7 Yellow', label: 'P.7 Yellow' }
              ]},
              { id: 'eng', label: 'English Score (0-100)', type: 'number', required: true },
              { id: 'mth', label: 'Mathematics Score (0-100)', type: 'number', required: true },
              { id: 'sci', label: 'Science Score (0-100)', type: 'number', required: true },
              { id: 'sst', label: 'Social Studies Score (0-100)', type: 'number', required: true }
            ]}
            onSubmit={handleAddCandidate}
            onCancel={() => setShowMarkForm(false)}
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
// 2. PRIMARY LIBRARY & LEARNING RESOURCES
// ==========================================
export const PrimaryLibraryPortal: React.FC = () => {
  const [books] = useState([
    { isbn: 'BK-001', title: 'Macmillan Primary Mathematics Pupil Book 7', author: 'K. Male', totalCopies: 200, borrowed: 180, available: 20 },
    { isbn: 'BK-002', title: 'Fountain Integrated Science for Uganda P.6', author: 'Dr. J. Byamugisha', totalCopies: 180, borrowed: 150, available: 30 },
    { isbn: 'BK-003', title: 'Longhorn Comprehensive Social Studies P.7', author: 'A. Mukasa', totalCopies: 220, borrowed: 195, available: 25 },
    { isbn: 'BK-004', title: 'Oxford Primary English Dictionary', author: 'Oxford Press', totalCopies: 150, borrowed: 120, available: 30 }
  ]);

  return (
    <div className="h-full flex flex-col bg-slate-50 font-sans pb-12">
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase italic">Primary Library & Resource Center</h1>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
              Textbook Registry • Lending Counter • Reader Circulation • E-Books
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Book Volumes</span>
            <div className="text-2xl font-black text-slate-900 mt-1">4,850 Books</div>
            <span className="text-[10px] text-emerald-600 font-bold mt-1">1:1 Pupil Textbook Ratio</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Currently on Loan</span>
            <div className="text-2xl font-black text-indigo-600 mt-1">645 Books</div>
            <span className="text-[10px] text-slate-500 font-bold mt-1">Zero Overdue Losses</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Digital Library Catalog</span>
            <div className="text-2xl font-black text-slate-900 mt-1">320 Audiobooks / E-Pubs</div>
            <span className="text-[10px] text-emerald-600 font-bold mt-1">Accessible on Tablets</span>
          </div>
        </div>

        <JumoDataTable
          data={books}
          title="Core Textbook Inventory & Circulation Status"
          columns={[
            { header: 'Book Code', accessor: 'isbn', className: 'font-mono text-xs font-bold text-slate-400' },
            { header: 'Title', accessor: 'title', className: 'font-bold' },
            { header: 'Author / Publisher', accessor: 'author', className: 'text-xs text-slate-600' },
            { header: 'Stock Copies', accessor: (b: any) => `${b.totalCopies}`, className: 'text-center font-bold' },
            { header: 'On Loan', accessor: (b: any) => `${b.borrowed}`, className: 'text-center font-bold text-indigo-600' },
            { header: 'Available on Shelf', accessor: (b: any) => `${b.available}`, className: 'text-center font-black text-emerald-600' }
          ]}
        />
      </div>
    </div>
  );
};

// ==========================================
// 3. E-LEARNING & DIGITAL CLASSROOM
// ==========================================
export const PrimaryELearningPortal: React.FC = () => {
  const [quizzes] = useState([
    { id: 'QUIZ-01', title: 'P.7 Mathematics: Fractions, Percentages & Ratios', submissions: 178, avgScore: '86%', status: 'ACTIVE' },
    { id: 'QUIZ-02', title: 'P.6 Science: Circulatory & Digestive Systems', submissions: 192, avgScore: '82%', status: 'ACTIVE' },
    { id: 'QUIZ-03', title: 'P.5 SST: Pre-Colonial Kingdoms in East Africa', submissions: 165, avgScore: '89%', status: 'ACTIVE' }
  ]);

  return (
    <div className="h-full flex flex-col bg-slate-50 font-sans pb-12">
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase italic">E-Learning & Digital Classroom</h1>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
              Digital Assignments • Interactive Quizzes • Multimedia Lessons
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Digital Lessons Published</span>
            <div className="text-2xl font-black text-slate-900 mt-1">148 Modules</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Active Online Learners</span>
            <div className="text-2xl font-black text-blue-600 mt-1">535 Pupils Today</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Quiz Completion Rate</span>
            <div className="text-2xl font-black text-emerald-600 mt-1">94.8% Completed</div>
          </div>
        </div>

        <JumoDataTable
          data={quizzes}
          title="Digital Quiz & Assessment Performance"
          columns={[
            { header: 'Quiz ID', accessor: 'id', className: 'font-mono text-xs font-bold text-slate-400' },
            { header: 'Lesson Topic / Assignment', accessor: 'title', className: 'font-bold' },
            { header: 'Submissions', accessor: 'submissions', className: 'text-center font-bold' },
            { header: 'Average Score', accessor: 'avgScore', className: 'text-center font-black text-emerald-600' },
            { header: 'Status', accessor: (q: any) => (
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[9px] font-black uppercase">{q.status}</span>
            )}
          ]}
        />
      </div>
    </div>
  );
};
