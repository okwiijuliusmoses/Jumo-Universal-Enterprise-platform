import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Users,
  CheckCircle,
  AlertTriangle,
  Search,
  Plus,
  Lock,
  QrCode,
  Award,
  ThumbsDown,
  X,
  Clock,
  Phone,
  FileCheck,
  Eye
} from 'lucide-react';
import {
  safeguardingService,
  AuthorizedPickupPerson,
  GatePickupLog,
  SafeguardingIncidentCase,
  ConductPointRecord
} from '../../../domain/SafeguardingService';

export const SafeguardingPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'pickups' | 'gate' | 'incidents' | 'conduct'>('dashboard');
  const [pickups, setPickups] = useState<AuthorizedPickupPerson[]>([]);
  const [gateLogs, setGateLogs] = useState<GatePickupLog[]>([]);
  const [incidentCases, setIncidentCases] = useState<SafeguardingIncidentCase[]>([]);
  const [conductLogs, setConductLogs] = useState<ConductPointRecord[]>([]);
  const [stats, setStats] = useState(safeguardingService.getSafeguardingStats());
  const [searchTerm, setSearchTerm] = useState('');

  // Modals
  const [showPickupModal, setShowPickupModal] = useState(false);
  const [showGateModal, setShowGateModal] = useState(false);
  const [showIncidentModal, setShowIncidentModal] = useState(false);
  const [showConductModal, setShowConductModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState<SafeguardingIncidentCase | null>(null);

  const refreshData = () => {
    setPickups(safeguardingService.getAuthorizedPickups());
    setGateLogs(safeguardingService.getGateLogs());
    setIncidentCases(safeguardingService.getIncidentCases());
    setConductLogs(safeguardingService.getConductLogs());
    setStats(safeguardingService.getSafeguardingStats());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleTogglePickupStatus = (id: string, currentStatus: 'ACTIVE' | 'REVOKED' | 'TEMPORARY') => {
    const nextStatus = currentStatus === 'ACTIVE' ? 'REVOKED' : 'ACTIVE';
    safeguardingService.updatePickupStatus(id, nextStatus);
    refreshData();
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-hidden text-slate-800">
      {/* Top Banner / Office Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-100">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-slate-900">Safeguarding & Student Welfare Office</h2>
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-indigo-100 text-indigo-800 rounded">
                Child Protection & Security
              </span>
            </div>
            <p className="text-xs text-slate-500">Authorized Pickups, Gate Verification, Incident Casefiles & Discipline Ledger</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'dashboard' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('pickups')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'pickups' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Pickup Pass Registry ({pickups.filter(p => p.status === 'ACTIVE').length})
          </button>
          <button
            onClick={() => setActiveTab('gate')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'gate' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Gate Verification Log
          </button>
          <button
            onClick={() => setActiveTab('incidents')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'incidents' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Incident Casefiles ({incidentCases.filter(c => c.status !== 'CLOSED').length} Open)
          </button>
          <button
            onClick={() => setActiveTab('conduct')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'conduct' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Merits & Demerits
          </button>

          <button
            onClick={() => setShowGateModal(true)}
            className="flex items-center px-3.5 py-1.5 text-xs font-semibold rounded-md bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm ml-2"
          >
            <Lock className="w-3.5 h-3.5 mr-1" /> Verify Gate Exit
          </button>
        </div>
      </div>

      {/* Main Workspace Body */}
      <div className="flex-1 overflow-auto p-6">
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 max-w-7xl mx-auto">
            {/* Stat Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">Active Authorized Pickups</p>
                  <p className="text-2xl font-bold text-indigo-700 mt-1">{stats.activePickups} Verified Persons</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">Gate Crossings Logged</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{stats.totalGateToday}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                  <Clock className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-amber-700">Open Welfare / Incidents</p>
                  <p className="text-2xl font-bold text-amber-900 mt-1">{stats.openCases} Under Action</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                  <ShieldAlert className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-emerald-700">Conduct Merits Ratio</p>
                  <p className="text-2xl font-bold text-emerald-800 mt-1">+{stats.totalMerits} / -{stats.totalDemerits}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <Award className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Quick Gate Clearance & Pickup Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recent Gate Releases */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <h3 className="text-sm font-bold text-slate-800">Latest Gate Dropoff & Pickup Releases</h3>
                  </div>
                  <button onClick={() => setActiveTab('gate')} className="text-xs text-indigo-600 hover:underline">
                    Full Gate Log
                  </button>
                </div>
                <div className="space-y-3">
                  {gateLogs.slice(0, 4).map(log => (
                    <div key={log.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="text-xs font-bold text-slate-900">{log.studentName}</p>
                          <span className="text-[10px] bg-white border border-slate-200 text-slate-700 px-1.5 py-0.2 rounded font-semibold">
                            {log.classGrade}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5">
                          Released to: <span className="font-semibold text-slate-800">{log.personName}</span> &bull; By: {log.verificationMethod.replace(/_/g, ' ')}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 block mb-0.5">
                          {log.direction.replace(/_/g, ' ')}
                        </span>
                        <span className="text-[10px] text-slate-400">{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Incident Casefiles */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                  <div className="flex items-center space-x-2">
                    <ShieldAlert className="w-4 h-4 text-amber-500" />
                    <h3 className="text-sm font-bold text-slate-800">Active Safeguarding & Discipline Casefiles</h3>
                  </div>
                  <button onClick={() => setActiveTab('incidents')} className="text-xs text-indigo-600 hover:underline">
                    View All Cases
                  </button>
                </div>
                <div className="space-y-3">
                  {incidentCases.filter(c => c.status !== 'CLOSED').map(c => (
                    <div key={c.id} className="p-3 bg-amber-50/50 rounded-lg border border-amber-100 flex flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-[10px] font-mono font-bold bg-white text-amber-800 border border-amber-200 px-1.5 py-0.2 rounded">
                              {c.caseNumber}
                            </span>
                            <p className="text-xs font-bold text-slate-900">{c.studentName} ({c.classGrade})</p>
                          </div>
                          <p className="text-xs text-slate-700 mt-1 font-medium">{c.summary}</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">Lead: {c.designatedSafeguardingLead}</p>
                        </div>
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                          c.severity === 'HIGH' || c.severity === 'CRITICAL' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {c.severity}
                        </span>
                      </div>
                      <div className="mt-2 pt-2 border-t border-amber-100/60 flex items-center justify-between text-[11px] text-slate-600">
                        <span>Action: {c.actionPlan}</span>
                        <span className="font-bold text-indigo-700">{c.status.replace(/_/g, ' ')}</span>
                      </div>
                    </div>
                  ))}

                  {incidentCases.filter(c => c.status !== 'CLOSED').length === 0 && (
                    <div className="p-6 text-center text-slate-400 text-xs">
                      All safeguarding cases resolved and closed.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PICKUP PASS REGISTRY TAB */}
        {activeTab === 'pickups' && (
          <div className="space-y-4 max-w-7xl mx-auto">
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="relative w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search student or authorized person..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-md text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <button
                onClick={() => setShowPickupModal(true)}
                className="flex items-center px-4 py-2 text-xs font-semibold rounded-md bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
              >
                <Plus className="w-4 h-4 mr-1.5" /> Register Authorized Pickup
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pickups
                .filter(p => p.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || p.personName.toLowerCase().includes(searchTerm.toLowerCase()))
                .map(p => (
                  <div key={p.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] font-mono bg-indigo-50 text-indigo-700 border border-indigo-100 px-1.5 py-0.5 rounded font-bold">
                            {p.securityPassNumber}
                          </span>
                          <h4 className="text-sm font-bold text-slate-900 mt-1">{p.personName}</h4>
                          <p className="text-xs text-indigo-700 font-semibold">{p.relationship}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {p.status}
                        </span>
                      </div>

                      <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Student:</span>
                          <span className="font-bold text-slate-900">{p.studentName} ({p.classGrade})</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">National ID:</span>
                          <span className="font-mono text-slate-700">{p.nationalIdNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Phone:</span>
                          <span className="font-mono text-slate-700">{p.phoneNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Security PIN:</span>
                          <span className="font-mono font-bold bg-white px-1.5 rounded border border-slate-200 text-slate-900">•••• {p.passCodePin.slice(-2)}</span>
                        </div>
                      </div>

                      {p.notes && (
                        <p className="text-[11px] text-slate-600 mt-2 italic">
                          "{p.notes}"
                        </p>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-[10px] text-slate-400">Reg: {p.registeredDate}</span>
                      <button
                        onClick={() => handleTogglePickupStatus(p.id, p.status)}
                        className={`font-semibold text-xs ${
                          p.status === 'ACTIVE' ? 'text-rose-600 hover:text-rose-800' : 'text-emerald-600 hover:text-emerald-800'
                        }`}
                      >
                        {p.status === 'ACTIVE' ? 'Revoke Authorization' : 'Re-activate Pass'}
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* GATE VERIFICATION LOG TAB */}
        {activeTab === 'gate' && (
          <div className="space-y-4 max-w-7xl mx-auto">
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Daily Gate Clearance & Exeat Log</h3>
                <p className="text-xs text-slate-500">Real-time gate security records for morning dropoffs, evening dismissals, and exeats</p>
              </div>
              <button
                onClick={() => setShowGateModal(true)}
                className="flex items-center px-4 py-2 text-xs font-semibold rounded-md bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
              >
                <Plus className="w-4 h-4 mr-1.5" /> Log Gate Exit / Entry
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-3">Log Ref</th>
                    <th className="px-5 py-3">Student Name</th>
                    <th className="px-5 py-3">Class</th>
                    <th className="px-5 py-3">Direction</th>
                    <th className="px-5 py-3">Person Responsible</th>
                    <th className="px-5 py-3">Verification Mode</th>
                    <th className="px-5 py-3">Gate Officer</th>
                    <th className="px-5 py-3">Time</th>
                    <th className="px-5 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {gateLogs.map(g => (
                    <tr key={g.id} className="hover:bg-slate-50">
                      <td className="px-5 py-3.5 font-mono text-slate-500">{g.logNumber}</td>
                      <td className="px-5 py-3.5 font-bold text-slate-900">{g.studentName}</td>
                      <td className="px-5 py-3.5 text-slate-600">{g.classGrade}</td>
                      <td className="px-5 py-3.5">
                        <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                          g.direction === 'MORNING_DROPOFF' ? 'bg-blue-100 text-blue-800' :
                          g.direction === 'EVENING_PICKUP' ? 'bg-emerald-100 text-emerald-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {g.direction.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 font-medium text-slate-800">{g.personName}</td>
                      <td className="px-5 py-3.5">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-mono text-[10px]">
                          {g.verificationMethod.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-600">{g.gateOfficer}</td>
                      <td className="px-5 py-3.5 text-slate-500">{new Date(g.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                      <td className="px-5 py-3.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {g.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* INCIDENT CASES TAB */}
        {activeTab === 'incidents' && (
          <div className="space-y-4 max-w-7xl mx-auto">
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="relative w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search incident casefiles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-md text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <button
                onClick={() => setShowIncidentModal(true)}
                className="flex items-center px-4 py-2 text-xs font-semibold rounded-md bg-amber-600 text-white hover:bg-amber-700 shadow-sm"
              >
                <Plus className="w-4 h-4 mr-1.5" /> Log Safeguarding Incident
              </button>
            </div>

            <div className="space-y-3">
              {incidentCases
                .filter(c => c.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || c.summary.toLowerCase().includes(searchTerm.toLowerCase()))
                .map(c => (
                  <div key={c.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between">
                    <div className="space-y-2 flex-1 pr-6">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                          {c.caseNumber}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">{c.studentName} ({c.classGrade})</h4>
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-100 text-slate-700 rounded">
                          {c.category.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <p className="text-xs text-slate-800 font-semibold">{c.summary}</p>
                      <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-100">
                        <span className="font-bold text-slate-700">Findings:</span> {c.investigationFindings}
                      </p>
                      <p className="text-xs text-emerald-800 bg-emerald-50/50 p-2.5 rounded border border-emerald-100">
                        <span className="font-bold text-emerald-900">Intervention Plan:</span> {c.actionPlan}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Reported by: {c.reportedBy} &bull; Lead: {c.designatedSafeguardingLead} &bull; Date: {c.incidentDate}
                      </p>
                    </div>

                    <div className="mt-4 md:mt-0 flex flex-col justify-between items-end shrink-0">
                      <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                        c.severity === 'CRITICAL' ? 'bg-rose-100 text-rose-800' :
                        c.severity === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        Severity: {c.severity}
                      </span>

                      <div className="space-y-1 text-right mt-3">
                        <span className="inline-block px-3 py-1 bg-slate-900 text-white rounded text-xs font-bold">
                          {c.status.replace(/_/g, ' ')}
                        </span>
                        {c.parentMeetingHeld && (
                          <p className="text-[11px] text-emerald-600 font-semibold flex items-center justify-end">
                            <CheckCircle className="w-3 h-3 mr-1" /> Parent Conference Held
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* MERITS & DEMERITS CONDUCT TAB */}
        {activeTab === 'conduct' && (
          <div className="space-y-4 max-w-7xl mx-auto">
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="relative w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search student conduct records..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-md text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <button
                onClick={() => setShowConductModal(true)}
                className="flex items-center px-4 py-2 text-xs font-semibold rounded-md bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
              >
                <Plus className="w-4 h-4 mr-1.5" /> Award Merit / Issue Demerit
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-3">Date</th>
                    <th className="px-5 py-3">Student</th>
                    <th className="px-5 py-3">Class</th>
                    <th className="px-5 py-3">Type</th>
                    <th className="px-5 py-3">Points</th>
                    <th className="px-5 py-3">Category</th>
                    <th className="px-5 py-3">Reason / Description</th>
                    <th className="px-5 py-3">Recorded By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {conductLogs
                    .filter(c => c.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || c.reason.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(c => (
                      <tr key={c.id} className="hover:bg-slate-50">
                        <td className="px-5 py-3.5 text-slate-500">{c.date}</td>
                        <td className="px-5 py-3.5 font-bold text-slate-900">{c.studentName}</td>
                        <td className="px-5 py-3.5 text-slate-600">{c.classGrade}</td>
                        <td className="px-5 py-3.5">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                            c.pointType === 'MERIT' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {c.pointType}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 font-bold text-sm">
                          {c.pointType === 'MERIT' ? `+${c.points}` : `-${c.points}`}
                        </td>
                        <td className="px-5 py-3.5 font-medium text-slate-700">{c.category.replace(/_/g, ' ')}</td>
                        <td className="px-5 py-3.5 max-w-sm truncate text-slate-600">{c.reason}</td>
                        <td className="px-5 py-3.5 text-slate-500">{c.awardedBy}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* REGISTER PICKUP MODAL */}
      {showPickupModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 bg-indigo-50 border-b border-indigo-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-indigo-900">Register Authorized Pickup Person</h3>
              <button onClick={() => setShowPickupModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const fd = new FormData(form);

                safeguardingService.registerPickupPerson({
                  studentId: fd.get('studentId') as string,
                  studentName: fd.get('studentName') as string,
                  classGrade: fd.get('classGrade') as string,
                  personName: fd.get('personName') as string,
                  relationship: fd.get('relationship') as string,
                  nationalIdNumber: fd.get('nationalId') as string,
                  phoneNumber: fd.get('phone') as string,
                  passCodePin: fd.get('pin') as string,
                  status: 'ACTIVE',
                  notes: fd.get('notes') as string
                });

                refreshData();
                setShowPickupModal(false);
              }}
              className="p-6 space-y-4 text-xs"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Student Name</label>
                  <input name="studentName" required type="text" placeholder="e.g. Alice Katusiime" className="w-full px-3 py-2 border border-slate-300 rounded text-xs outline-none focus:ring-1 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Class / Grade</label>
                  <input name="classGrade" required type="text" placeholder="e.g. Middle Class" className="w-full px-3 py-2 border border-slate-300 rounded text-xs outline-none focus:ring-1 focus:ring-indigo-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Authorized Person Name</label>
                  <input name="personName" required type="text" placeholder="Full name as on ID" className="w-full px-3 py-2 border border-slate-300 rounded text-xs outline-none focus:ring-1 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Relationship</label>
                  <input name="relationship" required type="text" placeholder="Father, Mother, Nanny, Uncle" className="w-full px-3 py-2 border border-slate-300 rounded text-xs outline-none focus:ring-1 focus:ring-indigo-500" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">National ID No.</label>
                  <input name="nationalId" required type="text" placeholder="CM840..." className="w-full px-3 py-2 border border-slate-300 rounded text-xs outline-none focus:ring-1 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input name="phone" required type="tel" placeholder="+25677..." className="w-full px-3 py-2 border border-slate-300 rounded text-xs outline-none focus:ring-1 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">4-Digit PIN</label>
                  <input name="pin" required maxLength={4} type="password" placeholder="4921" className="w-full px-3 py-2 border border-slate-300 rounded text-xs outline-none focus:ring-1 focus:ring-indigo-500 font-mono" />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Pickup Schedule / Authorization Notes</label>
                <textarea name="notes" rows={2} placeholder="e.g. Authorized for daily 4:00pm pickup." className="w-full px-3 py-2 border border-slate-300 rounded text-xs outline-none focus:ring-1 focus:ring-indigo-500" />
              </div>

              <div className="pt-4 flex justify-end space-x-2 border-t border-slate-100">
                <button type="button" onClick={() => setShowPickupModal(false)} className="px-4 py-2 border border-slate-300 text-slate-600 rounded text-xs font-semibold hover:bg-slate-50">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-indigo-600 text-white rounded text-xs font-semibold hover:bg-indigo-700 shadow-sm">
                  Register & Issue Pass
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* GATE VERIFY MODAL */}
      {showGateModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="text-sm font-bold">Log Gate Clearance / Verification</h3>
              <button onClick={() => setShowGateModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const fd = new FormData(form);

                safeguardingService.recordGateEntry({
                  studentId: 'STU-' + Math.floor(100 + Math.random() * 900),
                  studentName: fd.get('studentName') as string,
                  classGrade: fd.get('classGrade') as string,
                  direction: fd.get('direction') as any,
                  personName: fd.get('personName') as string,
                  verificationMethod: fd.get('method') as any,
                  gateOfficer: fd.get('officer') as string || 'Officer Ssewanyana (Main Gate)',
                  status: 'VERIFIED',
                  remarks: fd.get('remarks') as string
                });

                refreshData();
                setShowGateModal(false);
              }}
              className="p-6 space-y-4 text-xs"
            >
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Student Full Name</label>
                <input name="studentName" required type="text" placeholder="e.g. David Otim" className="w-full px-3 py-2 border border-slate-300 rounded text-xs outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Class / Grade</label>
                  <input name="classGrade" required type="text" placeholder="P.4 Blue" className="w-full px-3 py-2 border border-slate-300 rounded text-xs outline-none" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Direction</label>
                  <select name="direction" className="w-full px-3 py-2 border border-slate-300 rounded text-xs bg-white">
                    <option value="EVENING_PICKUP">Evening Pickup</option>
                    <option value="MORNING_DROPOFF">Morning Dropoff</option>
                    <option value="MIDDAY_EXEAT">Midday Exeat</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Person Picking / Dropping</label>
                <input name="personName" required type="text" placeholder="e.g. Sarah Otim (Mother)" className="w-full px-3 py-2 border border-slate-300 rounded text-xs outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Verification Mode</label>
                  <select name="method" className="w-full px-3 py-2 border border-slate-300 rounded text-xs bg-white">
                    <option value="SECURITY_PIN">Security PIN Pass</option>
                    <option value="QR_CODE">QR Badge Scan</option>
                    <option value="PHOTO_ID">Physical Photo ID</option>
                    <option value="PARENT_CALL_OVERRIDE">Parent Call Override</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Gate Officer</label>
                  <input name="officer" defaultValue="Officer Ssewanyana" className="w-full px-3 py-2 border border-slate-300 rounded text-xs outline-none" />
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-2 border-t border-slate-100">
                <button type="button" onClick={() => setShowGateModal(false)} className="px-4 py-2 border border-slate-300 text-slate-600 rounded text-xs font-semibold">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-slate-900 text-white rounded text-xs font-semibold hover:bg-slate-800">
                  Verify & Log Release
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
