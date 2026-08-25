import React, { useState } from 'react';
import { 
  BookOpen, Plus, GraduationCap, Award, CheckCircle, Calendar, Users, 
  MapPin, Clock, ShieldCheck, Heart, UserPlus, FileText
} from 'lucide-react';

interface Student {
  id: string;
  name: string;
  program: string;
  status: 'In Progress' | 'Graduated' | 'On Leave';
  enrolledDate: string;
  progressPercent: number;
}

interface ClassRoom {
  id: string;
  title: string;
  teacher: string;
  schedule: string;
  studentsCount: number;
}

export const ChurchEducation: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([
    { id: 'STU-001', name: 'Jonathan Otim Junior', program: 'Youth Catechism Class', status: 'In Progress', enrolledDate: '2026-02-10', progressPercent: 85 },
    { id: 'STU-002', name: 'Esther Kiconco', program: 'Lay Preachers Theological Diploma', status: 'Graduated', enrolledDate: '2025-01-15', progressPercent: 100 },
    { id: 'STU-003', name: 'Brother Samuel Ssewankambo', program: 'Diocesan Ordinand Seminary Program', status: 'In Progress', enrolledDate: '2024-09-01', progressPercent: 65 }
  ]);

  const [classes, setClasses] = useState<ClassRoom[]>([
    { id: 'CLS-01', title: 'Sunday School Beginners (Ages 3-6)', teacher: 'Agnes Nakato Walusimbi', schedule: 'Sundays 09:00 AM - 10:30 AM', studentsCount: 18 },
    { id: 'CLS-02', title: 'Confirmation Class 2026', teacher: 'Very Rev. Canon Jonathan Kisawuzi', schedule: 'Saturdays 03:00 PM - 05:00 PM', studentsCount: 12 },
    { id: 'CLS-03', title: 'Bible Study Cell Leader Training', teacher: 'Dr. Emmanuel Otim', schedule: 'Thursdays 07:00 PM - 08:30 PM', studentsCount: 8 }
  ]);

  // Form States
  const [newStuName, setNewStuName] = useState('');
  const [newProgram, setNewProgram] = useState('Youth Catechism Class');
  const [newClsTitle, setNewClsTitle] = useState('');
  const [newTeacher, setNewTeacher] = useState('');
  const [newSchedule, setNewSchedule] = useState('');

  const [subTab, setSubTab] = useState<'seminary' | 'sunday_school' | 'catechism'>('seminary');

  const handleEnrollStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStuName.trim()) return;

    const added: Student = {
      id: `STU-00${students.length + 1}`,
      name: newStuName,
      program: newProgram,
      status: 'In Progress',
      enrolledDate: new Date().toISOString().substring(0, 10),
      progressPercent: 0
    };

    setStudents([...students, added]);
    setNewStuName('');
    alert(`Enrolled student ${added.name} into ${added.program}`);
  };

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClsTitle.trim() || !newTeacher.trim()) return;

    const added: ClassRoom = {
      id: `CLS-0${classes.length + 1}`,
      title: newClsTitle,
      teacher: newTeacher,
      schedule: newSchedule || 'Sundays 10:00 AM',
      studentsCount: 0
    };

    setClasses([...classes, added]);
    setNewClsTitle('');
    setNewTeacher('');
    setNewSchedule('');
    alert(`Created educational cohort: "${added.title}"`);
  };

  return (
    <div className="space-y-6">
      {/* Subtab Selectors */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setSubTab('seminary')}
          className={`py-2 px-4 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-all ${
            subTab === 'seminary' ? 'border-purple-600 text-purple-700' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          Seminary & Theology Programs
        </button>
        <button
          onClick={() => setSubTab('sunday_school')}
          className={`py-2 px-4 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-all ${
            subTab === 'sunday_school' ? 'border-purple-600 text-purple-700' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Sunday School & Cohorts
        </button>
        <button
          onClick={() => setSubTab('catechism')}
          className={`py-2 px-4 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-all ${
            subTab === 'catechism' ? 'border-purple-600 text-purple-700' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Award className="w-4 h-4" />
          Catechism Certifications
        </button>
      </div>

      {subTab === 'seminary' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Enroll form */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-1">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 border-b pb-2">
              <UserPlus className="w-4 h-4 text-purple-600" />
              Enroll Seminary Candidate
            </h3>

            <form onSubmit={handleEnrollStudent} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Student / Scholar Full Name</label>
                <input
                  type="text"
                  value={newStuName}
                  onChange={(e) => setNewStuName(e.target.value)}
                  placeholder="e.g. Jonathan Otim Junior"
                  className="w-full p-2 rounded border border-slate-300"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Theological Program</label>
                <select
                  value={newProgram}
                  onChange={(e) => setNewProgram(e.target.value)}
                  className="w-full p-2 rounded border border-slate-300 bg-white"
                >
                  <option value="Youth Catechism Class">Confirmation & Catechism</option>
                  <option value="Lay Preachers Theological Diploma">Lay Preachers Theological Diploma</option>
                  <option value="Diocesan Ordinand Seminary Program">Diocesan Ordinand Seminary Program</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded shadow transition-all"
              >
                Enroll Scholar Unit
              </button>
            </form>
          </div>

          {/* Scholars Registry */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-2">
            <div className="border-b pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-purple-600" />
                Diocesan Seminary & Lay Preachers Registry
              </h3>
              <p className="text-xs text-slate-500">Theological development and confirmation tracks.</p>
            </div>

            <div className="space-y-3 text-xs">
              {students.map(stu => (
                <div key={stu.id} className="p-3.5 bg-slate-50 border rounded-xl flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-purple-700 font-bold bg-purple-50 px-1.5 py-0.2 rounded text-[10px]">{stu.id}</span>
                      <span className="text-slate-600 font-mono text-[10px]">{stu.enrolledDate}</span>
                    </div>
                    <strong className="text-slate-900 font-bold block mt-1">{stu.name}</strong>
                    <span className="text-slate-500 block text-[11px] mt-0.5">Program: {stu.program}</span>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-600 block font-semibold">Progress</span>
                      <strong className="text-slate-800 block font-mono font-bold">{stu.progressPercent}%</strong>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      stu.status === 'Graduated' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {stu.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {subTab === 'sunday_school' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Create class form */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-1">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 border-b pb-2">
              <Plus className="w-4 h-4 text-purple-600" />
              Establish Education Cohort
            </h3>

            <form onSubmit={handleCreateClass} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Class / Cohort Title</label>
                <input
                  type="text"
                  value={newClsTitle}
                  onChange={(e) => setNewClsTitle(e.target.value)}
                  placeholder="e.g. Sunday School Beginners (Ages 3-6)"
                  className="w-full p-2 rounded border border-slate-300"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Assigned Teacher / Instructor</label>
                <input
                  type="text"
                  value={newTeacher}
                  onChange={(e) => setNewTeacher(e.target.value)}
                  placeholder="e.g. Agnes Nakato Walusimbi"
                  className="w-full p-2 rounded border border-slate-300"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Weekly Schedule Timing</label>
                <input
                  type="text"
                  value={newSchedule}
                  onChange={(e) => setNewSchedule(e.target.value)}
                  placeholder="e.g. Sundays 09:00 AM"
                  className="w-full p-2 rounded border border-slate-300"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded shadow transition-all"
              >
                Create Educational Class
              </button>
            </form>
          </div>

          {/* Classes roster */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-2">
            <div className="border-b pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-purple-600" />
                Active Classrooms & Weekly Cohorts
              </h3>
              <p className="text-xs text-slate-500">Curriculums and cohorts managed by cathedral educators.</p>
            </div>

            <div className="space-y-3 text-xs">
              {classes.map(cls => (
                <div key={cls.id} className="p-3.5 bg-slate-50 border rounded-xl flex justify-between items-center gap-4">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-purple-700 font-bold bg-purple-50 px-1.5 py-0.2 rounded text-[10px]">{cls.id}</span>
                      <span className="text-slate-600 font-mono text-[10px]">{cls.schedule}</span>
                    </div>
                    <strong className="text-slate-900 font-bold block mt-1">{cls.title}</strong>
                    <span className="text-slate-500 block text-[11px] mt-0.5">Instructor: {cls.teacher}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-600 block font-semibold">Registered Units</span>
                    <strong className="text-purple-700 font-mono text-sm block font-bold">{cls.studentsCount} Students</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {subTab === 'catechism' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 text-xs">
          <div className="border-b pb-3 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Award className="w-4.5 h-4.5 text-purple-600" />
                Catechumen Sacrament Certifications Hub
              </h3>
              <p className="text-xs text-slate-500">Canonical baptismal and confirmation certificates watermarked with secure verification seals.</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-2.5 px-3">Graduate Scholar</th>
                  <th className="py-2.5 px-3">Completed Curriculum</th>
                  <th className="py-2.5 px-3">Authorized Seal ID</th>
                  <th className="py-2.5 px-3 text-center font-sans">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-xs">
                {students.filter(s => s.status === 'Graduated').map(stu => (
                  <tr key={stu.id} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-sans font-bold text-slate-900">{stu.name}</td>
                    <td className="py-3 px-3 font-sans font-semibold text-purple-700">{stu.program}</td>
                    <td className="py-3 px-3 text-slate-500">JUMO-SEAL-UCU-{Math.floor(1000 + Math.random()*9000)}</td>
                    <td className="py-3 px-3 text-center font-sans">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        VERIFIED_CERTIFIED
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
