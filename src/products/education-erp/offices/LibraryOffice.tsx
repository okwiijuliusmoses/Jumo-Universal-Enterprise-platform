import React, { useState } from 'react';
import { 
  Library, Book, Search, Filter, Plus, Printer, 
  CheckCircle2, AlertCircle, QrCode, Tag
} from 'lucide-react';

export const LibraryOffice: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const libraryBooks = [
    { isbn: '978-0199142750', title: 'Advanced Level Physics (Nelkon & Parker 8th Ed)', author: 'Michael Nelkon', subject: 'Physics', copiesTotal: 85, copiesAvailable: 14, loanPeriod: '14 Days' },
    { isbn: '978-0198392125', title: 'Calculus & Analytical Geometry (Thomas & Finney)', author: 'George B. Thomas', subject: 'Pure Mathematics', copiesTotal: 60, copiesAvailable: 22, loanPeriod: '14 Days' },
    { isbn: '978-0582529328', title: 'Understanding Biology for Advanced Level', author: 'Glenn Toole & Susan Toole', subject: 'Biology', copiesTotal: 75, copiesAvailable: 9, loanPeriod: '14 Days' },
    { isbn: '978-0435966881', title: 'Advanced Chemistry (Physical, Inorganic & Organic)', author: 'Philip Matthews', subject: 'Chemistry', copiesTotal: 90, copiesAvailable: 31, loanPeriod: '14 Days' },
    { isbn: '978-0582061064', title: 'Principles of Economics (Stanlake 6th Ed)', author: 'G. F. Stanlake', subject: 'Economics', copiesTotal: 50, copiesAvailable: 18, loanPeriod: '14 Days' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-violet-600 flex items-center justify-center text-white font-bold shadow-xs">
            <Library className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">ACADEMIC LIBRARY & RESOURCE CENTER</h1>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-violet-100 text-violet-800 border border-violet-200">
                12,400 Cataloged Volumes
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Textbook cataloging, barcode circulation loans, e-resources, and syllabus reference collections.
            </p>
          </div>
        </div>

        <button 
          type="button"
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold rounded-lg shadow-xs transition"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Issue Book Loan</span>
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search title, author, ISBN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xs bg-transparent focus:outline-none text-slate-800 placeholder-slate-400 w-64"
            />
          </div>
          <span className="text-xs text-slate-500 font-mono">Barcode Scanner Active</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[10px]">
              <tr>
                <th className="px-4 py-2.5">ISBN / Barcode</th>
                <th className="px-4 py-2.5">Book Title</th>
                <th className="px-4 py-2.5">Author</th>
                <th className="px-4 py-2.5">Subject</th>
                <th className="px-4 py-2.5 text-center">Total Stock</th>
                <th className="px-4 py-2.5 text-center">Available on Shelf</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {libraryBooks.map((b) => (
                <tr key={b.isbn} className="hover:bg-slate-50/80 transition">
                  <td className="px-4 py-3 font-mono font-bold text-violet-700">{b.isbn}</td>
                  <td className="px-4 py-3 font-bold text-slate-900">{b.title}</td>
                  <td className="px-4 py-3 text-slate-700">{b.author}</td>
                  <td className="px-4 py-3 text-slate-600">{b.subject}</td>
                  <td className="px-4 py-3 text-center font-mono font-bold text-slate-800">{b.copiesTotal}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded text-[10px]">
                      {b.copiesAvailable} Available
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
