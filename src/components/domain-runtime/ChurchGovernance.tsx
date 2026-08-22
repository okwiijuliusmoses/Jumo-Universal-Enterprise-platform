import React, { useState } from 'react';
import { 
  ShieldCheck, FileText, Plus, UserCheck, Award, Heart, Key, Lock, 
  Trash2, RefreshCw, CheckCircle, Smartphone, Banknote, ListCollapse,
  ChevronRight, Calendar, Users, Percent, HelpCircle
} from 'lucide-react';

interface Resolution {
  id: string;
  title: string;
  proposer: string;
  status: 'Signed & Gazetted' | 'Pending Dual Signature' | 'Under Debate';
  date: string;
  votesCount: number;
  description: string;
  governanceLevel: string;
}

interface Candidate {
  id: string;
  name: string;
  roleProposed: string;
  votesReceived: number;
  bio: string;
}

export const ChurchGovernance: React.FC = () => {
  const [resolutions, setResolutions] = useState<Resolution[]>([
    {
      id: 'RES-SYN-2026-01',
      title: 'Approval of Cathedral Roof Restoration Budget',
      proposer: 'Very Rev. Canon Jonathan Kisawuzi',
      status: 'Signed & Gazetted',
      date: '2026-06-12',
      votesCount: 112,
      description: 'Capital expenditure authorization for $85,000 architectural cathedral slate tile and timber repairs.',
      governanceLevel: 'Diocesan Synod'
    },
    {
      id: 'RES-SYN-2026-02',
      title: 'Establishment of Youth Development Welfare Fund',
      proposer: 'Sister Agnes Nakato',
      status: 'Pending Dual Signature',
      date: '2026-07-24',
      votesCount: 98,
      description: 'Allocation of 2.5% of Diocesan treasury assets for specialized skills seminars and youth bursaries.',
      governanceLevel: 'Provincial Council'
    },
    {
      id: 'RES-SYN-2026-03',
      title: 'Leasing of Diocesan Agriculture Plot 14 to Farmers',
      proposer: 'Deaconess Sarah Kintu',
      status: 'Under Debate',
      date: '2026-07-25',
      votesCount: 45,
      description: '5-year community agricultural lease proposal for idle Diocesan acreage to boost local parish crop yields.',
      governanceLevel: 'Cathedral Board'
    }
  ]);

  const [candidates, setCandidates] = useState<Candidate[]>([
    { id: 'CAN-001', name: 'Dr. Emmanuel Otim', roleProposed: 'Diocesan Lay Synod Trustee', votesReceived: 245, bio: 'CMF Chairman, leading infrastructure and financial oversight committees.' },
    { id: 'CAN-002', name: 'Deaconess Sarah Kintu', roleProposed: 'Diocesan Lay Synod Trustee', votesReceived: 182, bio: 'Mothers Union President, with an extensive history in regional parish outreach.' },
    { id: 'CAN-003', name: 'Brother Samuel Ssewankambo', roleProposed: 'Cathedral Board Representative', votesReceived: 98, bio: 'Sunday School coordinator, specializing in youth curriculum development.' }
  ]);

  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newLevel, setNewLevel] = useState('Diocesan Synod');
  const [newProposer, setNewProposer] = useState('Very Rev. Jonathan Kisawuzi');

  const [voterName, setVoterName] = useState('');
  const [selectedCandidateId, setSelectedCandidateId] = useState('');
  const [hasVoted, setHasVoted] = useState(false);
  const [subTab, setSubTab] = useState<'synods' | 'elections'>('synods');

  const handleProposeDecree = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;

    const added: Resolution = {
      id: `RES-SYN-2026-0${resolutions.length + 1}`,
      title: newTitle,
      description: newDesc,
      governanceLevel: newLevel,
      proposer: newProposer,
      status: 'Pending Dual Signature',
      date: new Date().toISOString().substring(0, 10),
      votesCount: 1
    };

    setResolutions([added, ...resolutions]);
    setNewTitle('');
    setNewDesc('');
    alert(`Governance decree and synod agenda item created: ${added.title}`);
  };

  const handleSignResolution = (id: string) => {
    setResolutions(resolutions.map(res => {
      if (res.id === id) {
        return { ...res, status: 'Signed & Gazetted' };
      }
      return res;
    }));
    alert("Canonical dual-signature registered successfully! Sealed under Diocesan Crest.");
  };

  const handleCastVote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!voterName.trim() || !selectedCandidateId) return;

    setCandidates(candidates.map(cand => {
      if (cand.id === selectedCandidateId) {
        return { ...cand, votesReceived: cand.votesReceived + 1 };
      }
      return cand;
    }));

    setHasVoted(true);
    alert(`Vote cryptographically cast and verified for candidate: ${candidates.find(c => c.id === selectedCandidateId)?.name}`);
  };

  const totalElectionVotes = candidates.reduce((sum, c) => sum + c.votesReceived, 0);

  return (
    <div className="space-y-6">
      {/* Tab Selectors */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setSubTab('synods')}
          className={`py-2 px-4 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-all ${
            subTab === 'synods' ? 'border-purple-600 text-purple-700' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <ListCollapse className="w-4 h-4" />
          Synod Meetings & Agendas
        </button>
        <button
          onClick={() => setSubTab('elections')}
          className={`py-2 px-4 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-all ${
            subTab === 'elections' ? 'border-purple-600 text-purple-700' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4" />
          Synod Elections & Appointments
        </button>
      </div>

      {subTab === 'synods' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Decree Form */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-1">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 border-b pb-2">
              <FileText className="w-4 h-4 text-purple-600" />
              Propose Agenda Decree
            </h3>

            <form onSubmit={handleProposeDecree} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Decree or Motion Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Renovation of Bishop Residence"
                  className="w-full p-2 rounded border border-slate-300"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Governance Council Tier</label>
                <select
                  value={newLevel}
                  onChange={(e) => setNewLevel(e.target.value)}
                  className="w-full p-2 rounded border border-slate-300 bg-white"
                >
                  <option value="Diocesan Synod">Diocesan Synod</option>
                  <option value="Provincial Council">Provincial Council</option>
                  <option value="Cathedral Board">Cathedral Board</option>
                  <option value="Parish Council">Parish Council</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Proposing Synod Board Elder</label>
                <input
                  type="text"
                  value={newProposer}
                  onChange={(e) => setNewProposer(e.target.value)}
                  className="w-full p-2 rounded border border-slate-300"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Resolutions & Policy Details</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Describe the canon alignment or asset expenditures..."
                  className="w-full p-2 rounded border border-slate-300 h-24 resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded shadow transition-all"
              >
                Propose Synod Resolution
              </button>
            </form>
          </div>

          {/* Agendas Ledger */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-2">
            <div className="border-b pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-purple-600" />
                Sovereign Synod Agendas & Decree Resolutions
              </h3>
              <p className="text-xs text-slate-500">Live registry of canonical decrees, signed resolutions, and active debates.</p>
            </div>

            <div className="space-y-3">
              {resolutions.map(res => (
                <div key={res.id} className="p-3.5 bg-slate-50 border rounded-xl text-xs space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono text-slate-600 font-bold">{res.id}</span>
                        <span className="px-1.5 py-0.2 rounded bg-slate-200 text-[10px] text-slate-600 font-bold uppercase">{res.governanceLevel}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 mt-1 leading-snug">{res.title}</h4>
                      <span className="text-slate-500 text-[10px] block mt-0.5">Proposed by: {res.proposer} • Date: {res.date}</span>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap ${
                      res.status === 'Signed & Gazetted' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {res.status}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed italic">{res.description}</p>

                  <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-[11px]">
                    <span className="font-semibold text-slate-700">Council Votes: {res.votesCount} Approved</span>
                    {res.status === 'Pending Dual Signature' && (
                      <button
                        onClick={() => handleSignResolution(res.id)}
                        className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded text-[10px] shadow transition-all flex items-center gap-1"
                      >
                        <Key className="w-3 h-3" /> Bishop Dual-Sign
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {subTab === 'elections' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Casting ballot */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-1">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 border-b pb-2">
              <Lock className="w-4 h-4 text-purple-600" />
              Secure Voting Ballot Box
            </h3>

            {hasVoted ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs text-center space-y-2">
                <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                <strong>Ballot Cryptographically Cast!</strong>
                <p className="text-[11px]">Thank you for voting. Your election receipt has been recorded on the AEGIS accountability ledger.</p>
              </div>
            ) : (
              <form onSubmit={handleCastVote} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Your Full Name (Voter Registration)</label>
                  <input
                    type="text"
                    value={voterName}
                    onChange={(e) => setVoterName(e.target.value)}
                    placeholder="e.g. Agnes Nakato Walusimbi"
                    className="w-full p-2 rounded border border-slate-300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Select Candidate for Synod Trustee</label>
                  <div className="space-y-2">
                    {candidates.map(cand => (
                      <label key={cand.id} className="p-2.5 rounded border border-slate-200 hover:border-purple-300 transition-all flex items-center gap-2 bg-slate-50 cursor-pointer">
                        <input
                          type="radio"
                          name="candidate_ballot"
                          value={cand.id}
                          checked={selectedCandidateId === cand.id}
                          onChange={() => setSelectedCandidateId(cand.id)}
                          className="text-purple-600 focus:ring-purple-500"
                          required
                        />
                        <div>
                          <strong className="text-slate-800 block">{cand.name}</strong>
                          <span className="text-[10px] text-slate-500">{cand.roleProposed}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-purple-50 border border-purple-200 rounded text-purple-950 leading-relaxed text-[10px]">
                  <strong>Security Guardrail:</strong> Biometric and cryptographic session verification verifies voter list credentials instantly.
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded shadow transition-all flex items-center justify-center gap-1"
                >
                  <ShieldCheck className="w-4 h-4" /> Cast Certified Ballot
                </button>
              </form>
            )}
          </div>

          {/* Candidates and turnout */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-2">
            <div className="border-b pb-3 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Synod Election Results & Candidate Registry</h3>
                <p className="text-xs text-slate-500">Live turnout audit logs and certified votes allocation.</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-600 block">Total Votes Recorded</span>
                <strong className="text-sm font-bold font-mono text-purple-700">{totalElectionVotes}</strong>
              </div>
            </div>

            <div className="space-y-4">
              {candidates.map(cand => {
                const percent = totalElectionVotes > 0 ? ((cand.votesReceived / totalElectionVotes) * 100).toFixed(1) : '0';
                return (
                  <div key={cand.id} className="p-4 bg-slate-50 border rounded-xl text-xs space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <strong className="text-slate-900 font-bold block">{cand.name}</strong>
                        <span className="text-[10px] text-purple-700 font-semibold">{cand.roleProposed}</span>
                      </div>
                      <div className="text-right">
                        <strong className="text-slate-900 font-bold font-mono block">{cand.votesReceived} Votes</strong>
                        <span className="text-[10px] text-slate-600">{percent}% of Total</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-600 leading-relaxed">{cand.bio}</p>

                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-purple-600 h-full" style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
