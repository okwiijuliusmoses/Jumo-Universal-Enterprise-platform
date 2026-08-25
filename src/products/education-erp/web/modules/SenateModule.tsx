import React, { useState } from 'react';
import { 
  Award, ShieldCheck, FileText, CheckCircle2, AlertCircle, 
  Lock, Plus, CheckSquare, X, BookOpen, Layers, GraduationCap, Check, HelpCircle
} from 'lucide-react';
import { EducationErpService } from '../../domain/EducationErpService';

export const SenateModule: React.FC = () => {
  const service = EducationErpService.getInstance();
  const [activeTab, setActiveTab] = useState<'EXAMS' | 'LMS' | 'CLEARANCE'>('EXAMS');

  // Subscriptions
  const [results, setResults] = useState(service.getExamResults());
  const [students] = useState(service.getStudents());
  const [lessons, setLessons] = useState(service.getLessons());
  const [assignments, setAssignments] = useState(service.getAssignments());
  const [quizzes, setQuizzes] = useState(service.getQuizzes());

  // Mark Entry Modal State
  const [showAddResult, setShowAddResult] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState('std_01');
  const [courseCode, setCourseCode] = useState('CS101');
  const [caMark, setCaMark] = useState<number>(0);
  const [examMark, setExamMark] = useState<number>(0);
  const [semester, setSemester] = useState('SEM_1');

  // LMS Add Lesson State
  const [showAddLesson, setShowAddLesson] = useState(false);
  const [lessonCourseCode, setLessonCourseCode] = useState('CS101');
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonContent, setLessonContent] = useState('');

  // LMS Add Assignment State
  const [showAddAssignment, setShowAddAssignment] = useState(false);
  const [assignCourse, setAssignCourse] = useState('CS101');
  const [assignTitle, setAssignTitle] = useState('');
  const [assignDue, setAssignDue] = useState('2026-09-30');

  // LMS Grade Submissions State
  const [activeAssignmentId, setActiveAssignmentId] = useState<string | null>(null);
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [gradeStudentId, setGradeStudentId] = useState('');
  const [gradeValue, setGradeValue] = useState<number>(0);
  const [gradeFeedback, setGradeFeedback] = useState('');

  const handleSubmitResult = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseCode.trim()) return alert('Course code is required.');
    if (caMark < 0 || caMark > 40) return alert('Continuous Assessment must be between 0 and 40.');
    if (examMark < 0 || examMark > 60) return alert('Exam Mark must be between 0 and 60.');

    try {
      service.submitExamResult({
        studentId: selectedStudent,
        courseCode: courseCode.trim().toUpperCase(),
        continuousAssessmentMark: caMark,
        examMark,
        totalMark: caMark + examMark,
        grade: '', // Auto computed in service
        termOrSemester: semester
      });

      setResults(service.getExamResults());
      setShowAddResult(false);
      setCourseCode('CS101');
      setCaMark(0);
      setExamMark(0);
      alert('Academic mark entry posted successfully for moderator review.');
    } catch (err: any) {
      alert(err.message || 'Error saving exam entry.');
    }
  };

  const handleApproveAll = () => {
    const unapprovedIds = results.filter(r => !r.isSenateApproved).map(r => r.id);
    if (unapprovedIds.length === 0) {
      alert('All current mark entries are already Senate Approved.');
      return;
    }
    service.approveSenateResults(unapprovedIds);
    setResults(service.getExamResults());
    alert('Senate has officially approved and moderated all pending course results! Transcripts unlocked.');
  };

  const handleCreateLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonTitle.trim() || !lessonContent.trim()) return alert('Please fill in all fields.');
    service.addLesson(lessonCourseCode, lessonTitle, lessonContent);
    setLessons(service.getLessons());
    setShowAddLesson(false);
    setLessonTitle('');
    setLessonContent('');
  };

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignTitle.trim()) return alert('Assignment Title is required.');
    service.addAssignment(assignCourse, assignTitle, assignDue);
    setAssignments(service.getAssignments());
    setShowAddAssignment(false);
    setAssignTitle('');
  };

  const handleGradeSubmissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAssignmentId) return;
    service.gradeAssignment(activeAssignmentId, gradeStudentId, gradeValue, gradeFeedback);
    setAssignments(service.getAssignments());
    setShowGradeModal(false);
    alert('Assignment graded successfully. Progress logged to LMS analytics.');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-16">
      {/* Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Senate Examinations & LMS Board</h1>
          <p className="text-slate-500 text-sm">Official results moderation, digital lessons, gradebooks, and graduation audits.</p>
        </div>
        {activeTab === 'EXAMS' && (
          <div className="flex gap-2">
            <button 
              onClick={() => setShowAddResult(true)}
              className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md"
            >
              <Plus className="w-4 h-4 text-emerald-400" />
              Submit Course Mark
            </button>
            <button 
              onClick={handleApproveAll}
              className="flex items-center gap-2 bg-[#064e3b] text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-800 transition-all shadow-md"
            >
              <CheckSquare className="w-4 h-4 text-amber-400" />
              Approve Pending
            </button>
          </div>
        )}
        {activeTab === 'LMS' && (
          <div className="flex gap-2">
            <button 
              onClick={() => setShowAddLesson(true)}
              className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all shadow-sm"
            >
              <BookOpen className="w-4 h-4 text-slate-500" />
              Create Lesson
            </button>
            <button 
              onClick={() => setShowAddAssignment(true)}
              className="flex items-center gap-2 bg-[#064e3b] text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-800 transition-all shadow-md"
            >
              <Plus className="w-4 h-4" />
              New Assignment
            </button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-4">
        {[
          { id: 'EXAMS', label: 'Marks Moderation', icon: Award },
          { id: 'LMS', label: 'LMS (Canvas/Moodle)', icon: Layers },
          { id: 'CLEARANCE', label: 'Graduation Clearance', icon: GraduationCap },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 pb-3 pt-1 text-xs font-bold border-b-2 uppercase tracking-wider transition-all ${
              activeTab === tab.id 
                ? 'border-[#064e3b] text-[#064e3b]' 
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ACTIVE TAB VIEWS */}
      {activeTab === 'EXAMS' && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm">
              <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-4 border border-amber-100 shadow-inner">
                <AlertCircle className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Pending Senate Approval</h3>
              <p className="text-3xl font-black text-slate-900 mt-2">
                {results.filter(r => !r.isSenateApproved).length}
              </p>
              <p className="text-[10px] text-slate-500 mt-2">Awaiting board sign-off</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4 border border-emerald-100 shadow-inner">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Approved Registries</h3>
              <p className="text-3xl font-black text-slate-900 mt-2">
                {results.filter(r => r.isSenateApproved).length}
              </p>
              <p className="text-[10px] text-slate-500 mt-2">Class Marks Authenticated</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 border border-blue-100 shadow-inner">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Transcripts Active</h3>
              <p className="text-3xl font-black text-slate-900 mt-2">
                {students.length}
              </p>
              <p className="text-[10px] text-slate-500 mt-2">Assigned Student Profiles</p>
            </div>
          </div>

          {/* Active Mark Sheet */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Active Senate Mark-Sheet</h3>
              <span className="text-xs font-semibold text-slate-400">{results.length} course results recorded</span>
            </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Student Name</th>
                  <th className="px-6 py-4">Course Unit</th>
                  <th className="px-6 py-4 text-center">CA Mark (40%)</th>
                  <th className="px-6 py-4 text-center">Exam Mark (60%)</th>
                  <th className="px-6 py-4 text-center">Total (100%)</th>
                  <th className="px-6 py-4 text-center">Grade</th>
                  <th className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {results.map((res) => {
                  const student = students.find(s => s.id === res.studentId);
                  return (
                    <tr key={res.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900">{student ? student.fullName : 'Guest Student'}</td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-600 font-black">{res.courseCode}</td>
                      <td className="px-6 py-4 text-center font-mono text-slate-500 text-xs">{res.continuousAssessmentMark}</td>
                      <td className="px-6 py-4 text-center font-mono text-slate-500 text-xs">{res.examMark}</td>
                      <td className="px-6 py-4 text-center font-mono font-bold text-slate-950">{res.totalMark}</td>
                      <td className="px-6 py-4 text-center font-black text-emerald-800">{res.grade}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                          res.isSenateApproved 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                            : 'bg-amber-50 text-amber-700 border border-amber-200 animate-pulse'
                        }`}>
                          {res.isSenateApproved ? 'APPROVED' : 'PENDING'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'LMS' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lessons */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              Published Lessons
            </h3>
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {lessons.map(les => (
                <div key={les.id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="font-mono text-[10px] font-bold text-emerald-700 uppercase bg-emerald-100/50 px-1.5 py-0.5 rounded">{les.courseCode}</span>
                  <h4 className="font-bold text-slate-900 text-xs mt-2">{les.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-3">{les.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Assignments */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              Assignments Queue
            </h3>
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {assignments.map(ass => (
                <div key={ass.id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-[10px] font-bold text-blue-700 uppercase bg-blue-100/50 px-1.5 py-0.5 rounded">{ass.courseCode}</span>
                    <h4 className="font-bold text-slate-900 text-xs mt-2">{ass.title}</h4>
                    <p className="text-[10px] text-slate-400 font-medium mt-1">Due: {ass.dueDate}</p>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500">{ass.submissions.length} Submissions</span>
                    <button 
                      onClick={() => {
                        setActiveAssignmentId(ass.id);
                        if (ass.submissions.length > 0) {
                          setGradeStudentId(ass.submissions[0].studentId);
                        } else {
                          setGradeStudentId('std_01');
                        }
                        setShowGradeModal(true);
                      }}
                      className="bg-white border border-slate-200 text-xs text-slate-700 font-bold px-2.5 py-1 rounded-lg hover:bg-slate-50"
                    >
                      Grade Submission
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quizzes */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              Quizzes & Tests
            </h3>
            <div className="space-y-3">
              {quizzes.map(quiz => (
                <div key={quiz.id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="font-mono text-[10px] font-bold text-amber-700 uppercase bg-amber-100/50 px-1.5 py-0.5 rounded">{quiz.courseCode}</span>
                  <h4 className="font-bold text-slate-900 text-xs mt-2">{quiz.title}</h4>
                  <p className="text-[10px] text-slate-500 mt-1">{quiz.questionsCount} Questions • {quiz.submissions.length} completed</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'CLEARANCE' && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden p-6">
          <h3 className="font-bold text-slate-900 text-sm mb-4">Graduation Clearance & Transcript Unlocking</h3>
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Student Profile</th>
                <th className="px-6 py-4 text-center">Bursary Cleared</th>
                <th className="px-6 py-4 text-center">Library Cleared</th>
                <th className="px-6 py-4 text-center">Hostel Cleared</th>
                <th className="px-6 py-4 text-center">Senate Verified</th>
                <th className="px-6 py-4 text-center">Clearance Certificate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {students.map(s => {
                const resultsCount = results.filter(r => r.studentId === s.id).length;
                const unapprovedResults = results.filter(r => r.studentId === s.id && !r.isSenateApproved).length;
                const bursaryCleared = s.academicStatus !== 'PROBATION'; // Sample dynamic clearance rules
                const libraryCleared = true;
                const hostelCleared = true;
                const senateVerified = resultsCount > 0 && unapprovedResults === 0;

                return (
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">{s.fullName} ({s.regNumber})</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${bursaryCleared ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                        {bursaryCleared ? 'CLEARED' : 'DEBT HOLD'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold">CLEARED</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold">CLEARED</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${senateVerified ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                        {senateVerified ? 'VERIFIED' : 'PENDING MARKS'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {bursaryCleared && senateVerified ? (
                        <span className="bg-[#064e3b] text-white px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1 justify-center max-w-[130px] mx-auto">
                          <Check className="w-3 h-3 text-amber-400" />
                          Unlocked
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs italic">Locked</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Course Mark Submission Modal */}
      {showAddResult && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-base">Submit Course Result</h3>
              <button onClick={() => setShowAddResult(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitResult} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Select Student</label>
                <select 
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.fullName} ({s.regNumber})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Course Code</label>
                  <input 
                    type="text"
                    placeholder="e.g. CS102"
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Semester</label>
                  <select 
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none"
                  >
                    <option value="SEM_1">Semester 1</option>
                    <option value="SEM_2">Semester 2</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">CA Score (0 - 40)</label>
                  <input 
                    type="number"
                    value={caMark || ''}
                    onChange={(e) => setCaMark(Math.min(40, Math.max(0, Number(e.target.value) || 0)))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono text-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Exam Score (0 - 60)</label>
                  <input 
                    type="number"
                    value={examMark || ''}
                    onChange={(e) => setExamMark(Math.min(60, Math.max(0, Number(e.target.value) || 0)))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setShowAddResult(false)}
                  className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-[#064e3b] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-emerald-850"
                >
                  Post Mark Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add LMS Lesson Modal */}
      {showAddLesson && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-base">Create Digital LMS Lesson</h3>
              <button onClick={() => setShowAddLesson(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateLesson} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Course Code</label>
                  <input 
                    type="text"
                    value={lessonCourseCode}
                    onChange={(e) => setLessonCourseCode(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Lesson Title</label>
                  <input 
                    type="text"
                    placeholder="e.g. Session 2: Big-O Notations"
                    value={lessonTitle}
                    onChange={(e) => setLessonTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Content Body</label>
                <textarea 
                  placeholder="Insert lesson instructions, resources links, and study materials..."
                  value={lessonContent}
                  onChange={(e) => setLessonContent(e.target.value)}
                  rows={4}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setShowAddLesson(false)} className="bg-white border text-slate-600 px-4 py-2 rounded-xl text-xs font-bold">Cancel</button>
                <button type="submit" className="bg-[#064e3b] text-white px-4 py-2 rounded-xl text-xs font-bold">Publish Lesson</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add LMS Assignment Modal */}
      {showAddAssignment && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-base">New LMS Assignment</h3>
              <button onClick={() => setShowAddAssignment(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateAssignment} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Course Code</label>
                  <input 
                    type="text"
                    value={assignCourse}
                    onChange={(e) => setAssignCourse(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Due Date</label>
                  <input 
                    type="date"
                    value={assignDue}
                    onChange={(e) => setAssignDue(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Assignment Title</label>
                <input 
                  type="text"
                  placeholder="e.g. Implement a Binary Search Tree"
                  value={assignTitle}
                  onChange={(e) => setAssignTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setShowAddAssignment(false)} className="bg-white border text-slate-600 px-4 py-2 rounded-xl text-xs font-bold">Cancel</button>
                <button type="submit" className="bg-[#064e3b] text-white px-4 py-2 rounded-xl text-xs font-bold">Launch Assignment</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grade Submission Modal */}
      {showGradeModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-base">LMS grading portal</h3>
              <button onClick={() => setShowGradeModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleGradeSubmissionSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Grading Student</label>
                <select 
                  value={gradeStudentId}
                  onChange={(e) => setGradeStudentId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.fullName} ({s.regNumber})</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Score (0 - 100)</label>
                  <input 
                    type="number"
                    value={gradeValue || ''}
                    onChange={(e) => setGradeValue(Math.min(100, Math.max(0, Number(e.target.value) || 0)))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Review Verdict</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none">
                    <option value="PASS">Pass / Executed</option>
                    <option value="EXCELLENT">Exceptional Execution</option>
                    <option value="REDO">Redo / Review requested</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Feedback / Comments</label>
                <textarea 
                  placeholder="Insert constructive markup feedback..."
                  value={gradeFeedback}
                  onChange={(e) => setGradeFeedback(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setShowGradeModal(false)} className="bg-white border text-slate-600 px-4 py-2 rounded-xl text-xs font-bold">Cancel</button>
                <button type="submit" className="bg-[#064e3b] text-white px-4 py-2 rounded-xl text-xs font-bold">Post Grade</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
