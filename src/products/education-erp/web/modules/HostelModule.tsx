import React, { useState } from 'react';
import { Home, Users, Key, AlertTriangle, Search, Filter, Plus, X } from 'lucide-react';
import { EducationErpService } from '../../domain/EducationErpService';

export const HostelModule: React.FC = () => {
  const service = EducationErpService.getInstance();
  const [students] = useState(service.getStudents());
  const [rooms, setRooms] = useState(service.getHostelRooms());

  // Form State
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState('std_01');
  const [selectedRoomId, setSelectedRoomId] = useState('');

  const handleAssign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoomId) return alert('Please select a resident room.');

    try {
      service.allocateStudentToRoom(selectedRoomId, selectedStudent);
      setRooms([...service.getHostelRooms()]);
      setShowAddModal(false);
      alert(`Hostel bed space allocated successfully for student!`);
    } catch (err: any) {
      alert(err.message || 'Error occurred allocating hostel room.');
    }
  };

  const handleClearAllocation = (roomId: string, studentId: string) => {
    try {
      service.evictStudentFromRoom(roomId, studentId);
      setRooms([...service.getHostelRooms()]);
      alert('Student checked out. Room bed space marked as cleared and vacant.');
    } catch (err: any) {
      alert(err.message || 'Error checking out student.');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Accommodation & Residence Welfare</h1>
          <p className="text-slate-500 text-sm">Stateful hostel bed spaces, campus room occupancy, and student checkouts.</p>
        </div>
        <button 
          onClick={() => {
            if (students.length > 0) setSelectedStudent(students[0].id);
            if (rooms.length > 0) setSelectedRoomId(rooms[0].id);
            setShowAddModal(true);
          }}
          className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-md"
        >
          <Plus className="w-4 h-4 text-emerald-400" />
          Assign Bed Space
        </button>
      </div>

      {/* Hostel Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rooms.map((room) => (
          <div key={room.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-emerald-50 text-[#064e3b] rounded-xl border border-emerald-100">
                  <Home className="w-5 h-5" />
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                  room.status === 'AVAILABLE' 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                }`}>
                  {room.status}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">{room.hostelName} - Room {room.roomNumber}</h3>
              <p className="text-xs text-slate-400 mt-1 font-medium">Capacity: {room.capacity} Bed Spaces • Occupied: {room.occupiedBeds}</p>

              {/* Progress bar */}
              <div className="mt-4 space-y-2">
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-slate-900" 
                    style={{ width: `${(room.occupiedBeds / room.capacity) * 100}%` }}
                  />
                </div>
              </div>

              {/* Occupants list */}
              <div className="mt-6 space-y-2.5">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1.5">Registered Room Occupants</h4>
                {room.occupants.map((occId) => {
                  const sObj = students.find(s => s.id === occId);
                  return (
                    <div key={occId} className="flex items-center justify-between text-sm bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="font-bold text-slate-900 text-xs">{sObj ? sObj.fullName : 'Sovereign Scholar'}</span>
                      <button 
                        onClick={() => handleClearAllocation(room.id, occId)}
                        className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-100 px-2 py-1 rounded-lg hover:bg-rose-100 transition-all"
                      >
                        Vacate Bed
                      </button>
                    </div>
                  );
                })}
                {room.occupants.length === 0 && (
                  <p className="text-xs text-slate-400 italic py-2">No student bed space assigned yet.</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Assign Room Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-base">Assign Room Allocation</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAssign} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Select Student Scholar</label>
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

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Select Available Hostel Room</label>
                <select 
                  value={selectedRoomId}
                  onChange={(e) => setSelectedRoomId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none"
                >
                  {rooms.filter(r => r.occupiedBeds < r.capacity).map(r => (
                    <option key={r.id} value={r.id}>
                      {r.hostelName} - Room {r.roomNumber} ({r.capacity - r.occupiedBeds} free spots)
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setShowAddModal(false)} className="bg-white border px-4 py-2 rounded-xl text-xs font-bold">Cancel</button>
                <button type="submit" className="bg-[#064e3b] text-white px-4 py-2 rounded-xl text-xs font-bold">Confirm Allocation</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
