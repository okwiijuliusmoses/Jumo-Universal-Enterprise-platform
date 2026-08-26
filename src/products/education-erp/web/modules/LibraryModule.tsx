import React, { useState } from 'react';
import { BookOpen, Plus, Search, Calendar, User, CheckCircle2, Bookmark, BookmarkCheck, X } from 'lucide-react';
import { EducationErpService } from '../../domain/EducationErpService';

export const LibraryModule: React.FC = () => {
  const service = EducationErpService.getInstance();
  const [circs, setCircs] = useState(service.getLibraryCirculations());
  const [students] = useState(service.getStudents());

  // Form State
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState('std_01');
  const [bookId, setBookId] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookId.trim()) return alert('Book ID/Title is required.');
    if (!dueDate) return alert('Due date is required.');

    try {
      const student = students.find(s => s.id === selectedStudent);
      const borrowerName = student ? student.fullName : 'Guest Reader';

      service.checkoutBook({
        bookId: bookId.trim().toUpperCase(),
        bookTitle: bookId.trim(),
        borrowerId: selectedStudent,
        borrowerName,
        dueDate
      });

      setCircs(service.getLibraryCirculations());
      setShowAddModal(false);
      setBookId('');
      setDueDate('');
      alert('Book check-out circulation recorded successfully!');
    } catch (err: any) {
      alert(err.message || 'Error checking out book.');
    }
  };

  const handleReturn = (id: string) => {
    try {
      service.returnBook(id);
      setCircs(service.getLibraryCirculations());
      alert('Book successfully returned and registered to shelves catalog.');
    } catch (err: any) {
      alert(err.message || 'Error occurred.');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">University Library Catalog</h1>
          <p className="text-slate-500 text-sm">Monitor textbook circulation records, checkout research manuals, and track student clearance parameters.</p>
        </div>
        <button 
          onClick={() => {
            if (students.length > 0) setSelectedStudent(students[0].id);
            setShowAddModal(true);
          }}
          className="flex items-center gap-2 bg-[#064e3b] text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-lg hover:bg-emerald-800 transition-all"
        >
          <Plus className="w-4 h-4 text-emerald-300" />
          Checkout Book
        </button>
      </div>

      {/* Circulation Status Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Circulation Loans</p>
            <p className="text-2xl font-black text-slate-900">{circs.filter(c => c.status === 'BORROWED').length}</p>
          </div>
        </div>
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <BookmarkCheck className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Returned Journals</p>
            <p className="text-2xl font-black text-slate-900">{circs.filter(c => c.status === 'RETURNED').length}</p>
          </div>
        </div>
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-900 text-amber-400 rounded-xl flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Digital Index Health</p>
            <p className="text-2xl font-black text-emerald-600">100% ONLINE</p>
          </div>
        </div>
      </div>

      {/* Circulation Registry table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Circulation Inward Ledger</h3>
          <span className="text-xs font-semibold text-slate-400">{circs.length} journals matched</span>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
            <tr>
              <th className="px-6 py-4">Borrowing Student</th>
              <th className="px-6 py-4">Book Code / Volume</th>
              <th className="px-6 py-4">Due Date</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-center">Action Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {circs.map((circ) => {
              const student = students.find(s => s.id === circ.borrowerId);
              return (
                <tr key={circ.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">{student ? student.fullName : 'Guest Reader'}</td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-600 font-black">{circ.bookId}</td>
                  <td className="px-6 py-4 text-xs text-slate-500">{circ.dueDate}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                      circ.status === 'RETURNED'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200 animate-pulse'
                    }`}>
                      {circ.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {circ.status === 'BORROWED' ? (
                      <button 
                        onClick={() => handleReturn(circ.id)}
                        className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-all"
                      >
                        Commit Book Return
                      </button>
                    ) : (
                      <span className="text-xs text-slate-400 italic">Cleared shelve</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Checkout Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-base">Authorize Book Loan</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCheckout} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Borrower Student</label>
                <select 
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.fullName} ({s.regNumber})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Book Code / Volume Name</label>
                <input 
                  type="text"
                  placeholder="e.g. BK-ALGORITHMS-101"
                  value={bookId}
                  onChange={(e) => setBookId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Checkout Return Deadline</label>
                <input 
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-[#064e3b] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-emerald-900"
                >
                  Disburse Book
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
