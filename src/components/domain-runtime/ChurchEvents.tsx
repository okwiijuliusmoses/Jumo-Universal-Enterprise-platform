import React, { useState } from 'react';
import { 
  Calendar, Plus, UserCheck, Users, CheckCircle, Clock, MapPin, 
  Sparkles, Award, ClipboardList, Heart, Trash2, Filter
} from 'lucide-react';

interface ChurchEvent {
  id: string;
  title: string;
  type: 'Sunday Service' | 'Wedding' | 'Revival Crusade' | 'Conference' | 'Cell Meeting';
  date: string;
  time: string;
  location: string;
  ushersCount: number;
  mediaCount: number;
}

interface Volunteer {
  id: string;
  name: string;
  role: 'Ushering' | 'Sound Tech' | 'Choir Member' | 'Security Driver' | 'Sunday School Teacher';
  assignedEventId: string;
  status: 'CONFIRMED' | 'PENDING';
}

export const ChurchEvents: React.FC = () => {
  const [events, setEvents] = useState<ChurchEvent[]>([
    { id: 'EVT-01', title: 'Main Diocesan Holy Communion Service', type: 'Sunday Service', date: '2026-08-02', time: '08:00 AM - 10:30 AM', location: 'St. Paul Cathedral Sanctuary', ushersCount: 8, mediaCount: 4 },
    { id: 'EVT-02', title: 'Matrimonial Union: Ssewankambo & Nabakooza', type: 'Wedding', date: '2026-08-15', time: '11:00 AM - 02:00 PM', location: 'St. Paul Cathedral Sanctuary', ushersCount: 12, mediaCount: 6 },
    { id: 'EVT-03', title: 'Annual Youth Revival Crusade 2026', type: 'Revival Crusade', date: '2026-08-20', time: '02:00 PM - 06:00 PM', location: 'Namirembe Cathedral Grounds', ushersCount: 24, mediaCount: 10 }
  ]);

  const [volunteers, setVolunteers] = useState<Volunteer[]>([
    { id: 'VOL-01', name: 'Agnes Nakato Walusimbi', role: 'Ushering', assignedEventId: 'EVT-01', status: 'CONFIRMED' },
    { id: 'VOL-02', name: 'Esther Kiconco', role: 'Choir Member', assignedEventId: 'EVT-01', status: 'CONFIRMED' },
    { id: 'VOL-03', name: 'Brother Samuel Ssewankambo', role: 'Sound Tech', assignedEventId: 'EVT-02', status: 'PENDING' },
    { id: 'VOL-04', name: 'Brother Julius Moses', role: 'Security Driver', assignedEventId: 'EVT-03', status: 'CONFIRMED' }
  ]);

  // Form States
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<ChurchEvent['type']>('Sunday Service');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newLoc, setNewLoc] = useState('');

  const [volName, setVolName] = useState('');
  const [volRole, setVolRole] = useState<Volunteer['role']>('Ushering');
  const [volEvent, setVolEvent] = useState('EVT-01');

  const [selectedEventId, setSelectedEventId] = useState('EVT-01');
  const [subTab, setSubTab] = useState<'events' | 'volunteers'>('events');

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDate) return;

    const added: ChurchEvent = {
      id: `EVT-0${events.length + 1}`,
      title: newTitle,
      type: newType,
      date: newDate,
      time: newTime || '10:00 AM',
      location: newLoc || 'Cathedral Grounds',
      ushersCount: 0,
      mediaCount: 0
    };

    setEvents([...events, added]);
    setSelectedEventId(added.id);
    setNewTitle('');
    setNewDate('');
    setNewTime('');
    setNewLoc('');
    alert(`Liturgical Event scheduled: "${added.title}"`);
  };

  const handleAssignVolunteer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!volName.trim()) return;

    const added: Volunteer = {
      id: `VOL-0${volunteers.length + 1}`,
      name: volName,
      role: volRole,
      assignedEventId: volEvent,
      status: 'PENDING'
    };

    setVolunteers([...volunteers, added]);
    setVolName('');
    alert(`Assigned volunteer ${added.name} to ${events.find(ev => ev.id === volEvent)?.title}`);
  };

  const handleConfirmVolunteer = (id: string) => {
    setVolunteers(volunteers.map(vol => {
      if (vol.id === id) {
        return { ...vol, status: 'CONFIRMED' };
      }
      return vol;
    }));
  };

  const selectedEvent = events.find(ev => ev.id === selectedEventId) || events[0];
  const selectedEventVolunteers = volunteers.filter(vol => vol.assignedEventId === selectedEventId);

  return (
    <div className="space-y-6">
      {/* Subtab selection */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setSubTab('events')}
          className={`py-2 px-4 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-all ${
            subTab === 'events' ? 'border-purple-600 text-purple-700' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Calendar className="w-4 h-4" />
          Event Scheduling Calendar
        </button>
        <button
          onClick={() => setSubTab('volunteers')}
          className={`py-2 px-4 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-all ${
            subTab === 'volunteers' ? 'border-purple-600 text-purple-700' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <ClipboardList className="w-4 h-4" />
          Liturgical Volunteers & Allocation
        </button>
      </div>

      {subTab === 'events' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Create form */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-1">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 border-b pb-2">
              <Plus className="w-4 h-4 text-purple-600" />
              Schedule Parish Event
            </h3>

            <form onSubmit={handleCreateEvent} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Liturgical Event Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Sunday Holy Communion Service"
                  className="w-full p-2 rounded border border-slate-300"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Event Type Classification</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as any)}
                  className="w-full p-2 rounded border border-slate-300 bg-white"
                >
                  <option value="Sunday Service">Sunday Service</option>
                  <option value="Wedding">Holy Matrimony Wedding</option>
                  <option value="Revival Crusade">Revival Crusade</option>
                  <option value="Conference">Provincial Conference</option>
                  <option value="Cell Meeting">Weekly Cell Home Fellowship</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Event Date</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full p-2 rounded border border-slate-300 bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Event Timing</label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    placeholder="e.g. 08:00 AM - 10:30 AM"
                    className="w-full p-2 rounded border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Sanctuary / Field Location</label>
                <input
                  type="text"
                  value={newLoc}
                  onChange={(e) => setNewLoc(e.target.value)}
                  placeholder="e.g. St. Paul Cathedral Sanctuary"
                  className="w-full p-2 rounded border border-slate-300"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded shadow transition-all"
              >
                Schedule Parish Event
              </button>
            </form>
          </div>

          {/* Events Ledger */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-2">
            <div className="border-b pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-purple-600" />
                Diocesan Liturgical Events Ledger
              </h3>
              <p className="text-xs text-slate-500">Live schedule of sacred services, weddings, revival campaigns, and conferences.</p>
            </div>

            <div className="space-y-3">
              {events.map(ev => {
                const isSelected = selectedEventId === ev.id;
                return (
                  <button
                    key={ev.id}
                    onClick={() => setSelectedEventId(ev.id)}
                    className={`w-full p-4 rounded-xl border text-left transition-all flex justify-between items-start ${
                      isSelected
                        ? 'border-purple-500 bg-purple-50/50 shadow-sm ring-1 ring-purple-500'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-xs space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-purple-700 bg-purple-100 px-1.5 py-0.2 rounded font-bold text-[9px]">{ev.id}</span>
                        <span className="text-[10px] text-slate-600 font-mono">{ev.date} • {ev.time}</span>
                      </div>
                      <strong className="text-sm font-bold text-slate-900 block">{ev.title}</strong>
                      <span className="text-slate-500 block text-[11px] mt-0.5">Location: {ev.location}</span>
                    </div>

                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-700">
                      {ev.type}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {subTab === 'volunteers' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Volunteer assigning */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-1">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 border-b pb-2">
              <UserCheck className="w-4 h-4 text-purple-600" />
              Assign Volunteer Staff
            </h3>

            <form onSubmit={handleAssignVolunteer} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Volunteer Lay-Member Name</label>
                <input
                  type="text"
                  value={volName}
                  onChange={(e) => setVolName(e.target.value)}
                  placeholder="e.g. Brother Samuel Ssewankambo"
                  className="w-full p-2 rounded border border-slate-300"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Liturgical Duty / Fellowship Role</label>
                <select
                  value={volRole}
                  onChange={(e) => setVolRole(e.target.value as any)}
                  className="w-full p-2 rounded border border-slate-300 bg-white"
                >
                  <option value="Ushering">Ushering Department</option>
                  <option value="Sound Tech">Sound Technical Team</option>
                  <option value="Choir Member">Worship & Choir Fellowship</option>
                  <option value="Security Driver">Security & Fleet Driver</option>
                  <option value="Sunday School Teacher">Sunday School Teacher</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Target Event Service</label>
                <select
                  value={volEvent}
                  onChange={(e) => setVolEvent(e.target.value)}
                  className="w-full p-2 rounded border border-slate-300 bg-white"
                >
                  {events.map(ev => (
                    <option key={ev.id} value={ev.id}>{ev.title}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded shadow transition-all animate-pulse"
              >
                Assign Liturgical duty
              </button>
            </form>
          </div>

          {/* Allocation Board */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-2">
            <div className="border-b pb-3">
              <h3 className="text-sm font-bold text-slate-900">Liturgical Service Volunteer Duty Board</h3>
              <p className="text-xs text-slate-500">Volunteers, drivers, media crew, and ushers allocated for service: <strong className="text-purple-700 font-bold">{selectedEvent.title}</strong></p>
            </div>

            <div className="space-y-3 text-xs">
              {selectedEventVolunteers.length === 0 ? (
                <div className="p-4 bg-slate-50 rounded border text-slate-500 italic text-center">
                  No volunteers allocated yet for this specific service. Assign ushers and media crew to begin.
                </div>
              ) : (
                selectedEventVolunteers.map(vol => (
                  <div key={vol.id} className="p-3.5 bg-slate-50 border rounded-xl flex justify-between items-center gap-4">
                    <div>
                      <strong className="text-slate-800 font-bold block">{vol.name}</strong>
                      <span className="px-1.5 py-0.2 rounded bg-purple-50 text-purple-700 text-[10px] font-bold mt-1 inline-block">
                        Duty: {vol.role}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {vol.status === 'PENDING' ? (
                        <button
                          onClick={() => handleConfirmVolunteer(vol.id)}
                          className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded text-[10px]"
                        >
                          Confirm Status
                        </button>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          {vol.status}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
