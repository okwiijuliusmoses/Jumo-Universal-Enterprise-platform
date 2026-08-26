import React, { useState } from 'react';
import { 
  X, Calendar, CheckCircle2, AlertCircle, Printer, 
  Sparkles, Church, User, QrCode, Ticket
} from 'lucide-react';
import ChurchPeopleService, { 
  ChurchMemberRecord, 
  ParishEventRecord, 
  ParishEventRegistration 
} from '../../../domain/ChurchPeopleService';

interface EventModalProps {
  member?: ChurchMemberRecord | null;
  onClose: () => void;
  onRegistered: (reg: ParishEventRegistration) => void;
}

export const ChurchEventRegistrationModal: React.FC<EventModalProps> = ({
  member: initialMember,
  onClose,
  onRegistered
}) => {
  const service = ChurchPeopleService.getInstance();
  const events = service.getEvents();
  const members = service.getMembers();

  const [selectedEventId, setSelectedEventId] = useState(events[0]?.id || '');
  const [selectedMemberId, setSelectedMemberId] = useState(initialMember?.id || members[0]?.id || '');
  const [specialNeeds, setSpecialNeeds] = useState('');

  const [issuedPass, setIssuedPass] = useState<ParishEventRegistration | null>(null);
  const [error, setError] = useState('');

  const selectedEvent = events.find(e => e.id === selectedEventId);
  const selectedMember = members.find(m => m.id === selectedMemberId);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEventId || !selectedMemberId) {
      setError('Please select both an event and a parishioner.');
      return;
    }

    const reg = service.registerMemberForEvent(selectedEventId, selectedMemberId, specialNeeds.trim() || undefined);
    if (!reg) {
      setError('Registration failed. Please check inputs.');
      return;
    }

    setIssuedPass(reg);
    onRegistered(reg);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-300">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">
                Parish Event & Liturgy Registration
              </h2>
              <p className="text-xs text-slate-400">
                Synods, retreats, sacramental confirmations & diocesan assemblies
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {!issuedPass ? (
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Event Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Select Parish / Diocesan Event *
                </label>
                <select
                  value={selectedEventId}
                  onChange={(e) => setSelectedEventId(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-semibold rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                >
                  {events.map(ev => (
                    <option key={ev.id} value={ev.id}>
                      {ev.title} ({ev.startDate}) — {ev.category}
                    </option>
                  ))}
                </select>
              </div>

              {selectedEvent && (
                <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-200 text-xs space-y-1 text-slate-700">
                  <p className="font-bold text-blue-950">{selectedEvent.title}</p>
                  <p className="text-[11px] text-blue-800 italic">Theme: "{selectedEvent.theme || 'General'}"</p>
                  <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                    <p>Date: <strong>{selectedEvent.startDate} ({selectedEvent.time})</strong></p>
                    <p>Venue: <strong>{selectedEvent.venue}</strong></p>
                    <p>Audience: <strong>{selectedEvent.targetAudience.replace('_', ' ')}</strong></p>
                    <p>Registrations: <strong>{selectedEvent.registeredCount} / {selectedEvent.capacity}</strong></p>
                  </div>
                </div>
              )}

              {/* Parishioner Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Parishioner / Delegate *
                </label>
                <select
                  value={selectedMemberId}
                  onChange={(e) => setSelectedMemberId(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                >
                  {members.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.title} {m.firstName} {m.lastName} ({m.classification}) — {m.id}
                    </option>
                  ))}
                </select>
              </div>

              {/* Special Dietary / Accessibility Needs */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Special Accommodation / Dietary Notes (Optional)
                </label>
                <input
                  type="text"
                  value={specialNeeds}
                  onChange={(e) => setSpecialNeeds(e.target.value)}
                  placeholder="e.g. Vegetarian, Wheelchair access, Synod delegate voting rights"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition shadow-md flex items-center justify-center gap-2"
                >
                  <Ticket className="w-4 h-4" /> Confirm Registration & Issue Delegate Pass
                </button>
              </div>
            </form>
          ) : (
            /* ISSUED PASS VIEW */
            <div className="space-y-4">
              <div className="p-6 bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 text-white rounded-2xl text-center space-y-4 shadow-xl border border-blue-400/30">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-black tracking-wide uppercase text-white">
                    Official Event Delegate Pass
                  </h3>
                  <p className="text-xs text-blue-200/80">{issuedPass.eventTitle}</p>
                </div>

                <div className="font-mono text-sm font-black text-amber-300 bg-black/40 py-1.5 px-4 rounded-xl inline-block border border-amber-400/30">
                  REF: {issuedPass.ticketRef}
                </div>

                <div className="text-xs text-slate-200 space-y-1 py-3 border-y border-white/10 text-left px-4 bg-white/5 rounded-xl">
                  <p className="flex justify-between">
                    <span className="text-slate-400">Delegate:</span>
                    <strong className="text-white">{issuedPass.memberName}</strong>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-slate-400">Role:</span>
                    <span className="font-bold text-purple-300 uppercase">{issuedPass.memberClassification}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-slate-400">Status:</span>
                    <span className="font-bold text-emerald-400">{issuedPass.attendanceStatus}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-slate-400">Date:</span>
                    <span className="font-mono">{issuedPass.registrationDate}</span>
                  </p>
                </div>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-white text-slate-900 rounded-lg text-xs font-bold hover:bg-slate-100 transition flex items-center gap-2"
                  >
                    <Printer className="w-3.5 h-3.5" /> Print Delegate Pass
                  </button>
                  <button
                    onClick={() => setIssuedPass(null)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition"
                  >
                    Register Another
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 px-6 py-3 bg-slate-50 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500">Parish Liturgical & Synod Registrar</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-300 transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
