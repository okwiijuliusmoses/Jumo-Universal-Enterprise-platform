import React, { useState } from 'react';
import { 
  Users, UserCheck, ShieldCheck, Award, Heart, DollarSign, 
  Calendar, Plus, Search, Filter, Printer, Download, Eye, 
  Edit3, Trash2, CheckCircle2, Shield, Church, User,
  FileText, Sparkles, Key, AlertCircle, RefreshCw
} from 'lucide-react';
import ChurchPeopleService, { 
  ChurchMemberRecord, 
  ChurchMemberClassification, 
  ChurchRbacRole, 
  TitheRecord, 
  ParishEventRecord, 
  ParishEventRegistration 
} from '../../../domain/ChurchPeopleService';
import { ChurchPersonnelBioDataModal } from './ChurchPersonnelBioDataModal';
import { ChurchMemberProfileCard } from './ChurchMemberProfileCard';
import { ChurchSacramentsRegistryModal } from './ChurchSacramentsRegistryModal';
import { ChurchTithesLedgerModal } from './ChurchTithesLedgerModal';
import { ChurchEventRegistrationModal } from './ChurchEventRegistrationModal';

export const ChurchPersonnelRosterPortal: React.FC = () => {
  const service = ChurchPeopleService.getInstance();
  
  // Navigation & Sub-portal view
  const [activeTab, setActiveTab] = useState<
    'MEMBERS' | 'CLERGY' | 'LAY_READERS' | 'STAFF' | 'RETIRED' | 'SACRAMENTS' | 'TITHES' | 'EVENTS'
  >('MEMBERS');

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedParishFilter, setSelectedParishFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'ON_LEAVE' | 'RETIRED'>('ALL');

  // RBAC Role Switcher
  const [currentSession, setCurrentSession] = useState(service.getCurrentSession());

  // Modal States
  const [showBioModal, setShowBioModal] = useState(false);
  const [editingMember, setEditingMember] = useState<ChurchMemberRecord | null>(null);
  const [defaultClassification, setDefaultClassification] = useState<ChurchMemberClassification>('MEMBER');
  
  const [viewingProfileMember, setViewingProfileMember] = useState<ChurchMemberRecord | null>(null);
  const [showSacramentCertModal, setShowSacramentCertModal] = useState(false);
  const [certMember, setCertMember] = useState<ChurchMemberRecord | null>(null);
  const [certType, setCertType] = useState<'BAPTISM' | 'CONFIRMATION' | 'MATRIMONY'>('BAPTISM');
  
  const [showTitheModal, setShowTitheModal] = useState(false);
  const [titheMember, setTitheMember] = useState<ChurchMemberRecord | null>(null);

  const [showEventModal, setShowEventModal] = useState(false);
  const [eventMember, setEventMember] = useState<ChurchMemberRecord | null>(null);

  // Data Refresh Trigger
  const [refreshTick, setRefreshTick] = useState(0);
  const triggerRefresh = () => setRefreshTick(t => t + 1);

  // RBAC Permission Checkers
  const canEditBioData = ['ROLE_VICAR', 'ROLE_PARISH_PRIEST', 'ROLE_DIOCESAN_BISHOP', 'ROLE_PARISH_SECRETARY', 'ROLE_PARISH_ADMIN'].includes(currentSession.role);
  const canRecordTithes = ['ROLE_VICAR', 'ROLE_PARISH_PRIEST', 'ROLE_TREASURER', 'ROLE_PARISH_SECRETARY', 'ROLE_PARISH_ADMIN'].includes(currentSession.role);
  const canIssueCertificates = ['ROLE_VICAR', 'ROLE_PARISH_PRIEST', 'ROLE_DIOCESAN_BISHOP', 'ROLE_PARISH_SECRETARY'].includes(currentSession.role);

  // Fetch Members by Active Tab
  const getFilteredMembers = () => {
    let classificationTarget: ChurchMemberClassification | undefined;
    if (activeTab === 'MEMBERS') classificationTarget = 'MEMBER';
    else if (activeTab === 'CLERGY') classificationTarget = 'CLERGY';
    else if (activeTab === 'LAY_READERS') classificationTarget = 'LAY_READER';
    else if (activeTab === 'STAFF') classificationTarget = 'STAFF';
    else if (activeTab === 'RETIRED') classificationTarget = undefined; // handles both RETIRED_CLERGY & RETIRED_STAFF

    let list = service.getMembers();

    if (activeTab === 'RETIRED') {
      list = list.filter(m => m.classification === 'RETIRED_CLERGY' || m.classification === 'RETIRED_STAFF');
    } else if (classificationTarget) {
      list = list.filter(m => m.classification === classificationTarget);
    }

    if (statusFilter !== 'ALL') {
      list = list.filter(m => m.status === statusFilter);
    }

    if (selectedParishFilter !== 'ALL') {
      list = list.filter(m => m.parishOfResidence === selectedParishFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(m => 
        `${m.firstName} ${m.middleName || ''} ${m.lastName} ${m.id} ${m.phone} ${m.ninOrNationalId} ${m.parishOfResidence}`.toLowerCase().includes(q)
      );
    }

    return list;
  };

  const filteredMembers = getFilteredMembers();
  const allMembers = service.getMembers();
  const allTithes = service.getTithes();
  const allEvents = service.getEvents();
  const allRegistrations = service.getRegistrations();

  // Counts
  const memberCount = allMembers.filter(m => m.classification === 'MEMBER').length;
  const clergyCount = allMembers.filter(m => m.classification === 'CLERGY').length;
  const layCount = allMembers.filter(m => m.classification === 'LAY_READER').length;
  const staffCount = allMembers.filter(m => m.classification === 'STAFF').length;
  const retiredCount = allMembers.filter(m => m.classification === 'RETIRED_CLERGY' || m.classification === 'RETIRED_STAFF').length;

  const handleOpenNewBioModal = (classification: ChurchMemberClassification) => {
    setEditingMember(null);
    setDefaultClassification(classification);
    setShowBioModal(true);
  };

  const handleEditMember = (m: ChurchMemberRecord) => {
    setEditingMember(m);
    setDefaultClassification(m.classification);
    setShowBioModal(true);
  };

  const handleDeleteMember = (id: string) => {
    if (window.confirm(`Are you sure you want to delete member record ${id}?`)) {
      service.deleteMember(id);
      triggerRefresh();
    }
  };

  const handleSwitchRole = (role: ChurchRbacRole) => {
    const updated = { ...currentSession, role };
    service.setCurrentSession(updated);
    setCurrentSession(updated);
  };

  return (
    <div className="h-full flex flex-col bg-slate-100 font-sans">
      
      {/* Top Banner & RBAC Gating Bar */}
      <div className="bg-slate-900 text-white px-6 py-4 border-b border-slate-800 shrink-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300">
            <Church className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white tracking-wide">
                Ecclesiastical Registry & Personnel Portals
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-purple-500/20 text-purple-300 border border-purple-400/30">
                JUMO CHURCH ERP SOVEREIGN
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Members, Clergy, Lay Readers, Staff, Retired Personnel, Sacraments, Tithes & Liturgy
            </p>
          </div>
        </div>

        {/* RBAC Role Switcher */}
        <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700">
          <Key className="w-3.5 h-3.5 text-purple-400 ml-1.5" />
          <span className="text-[10px] uppercase font-bold text-slate-400">Active Role:</span>
          <select
            value={currentSession.role}
            onChange={(e) => handleSwitchRole(e.target.value as any)}
            className="bg-slate-900 text-purple-200 text-xs font-bold px-2.5 py-1 rounded-lg border border-purple-500/40 focus:outline-none"
          >
            <option value="ROLE_VICAR">Vicar / Provost (Full Admin)</option>
            <option value="ROLE_PARISH_SECRETARY">Parish Secretary (Registrar)</option>
            <option value="ROLE_TREASURER">Parish Treasurer (Finance)</option>
            <option value="ROLE_CLERGY">Clergy / Curate</option>
            <option value="ROLE_LAY_READER">Licensed Lay Reader</option>
            <option value="ROLE_DIOCESAN_BISHOP">Diocesan Bishop</option>
            <option value="ROLE_MEMBER">Parishioner (View Only)</option>
          </select>
        </div>
      </div>

      {/* Sub-portal Navigation Tabs */}
      <div className="bg-white border-b border-slate-200 px-6 flex items-center justify-between overflow-x-auto shrink-0 shadow-sm">
        <div className="flex gap-1 text-xs font-bold py-2">
          <button
            onClick={() => setActiveTab('MEMBERS')}
            className={`px-3.5 py-2 rounded-lg transition flex items-center gap-2 ${
              activeTab === 'MEMBERS' 
                ? 'bg-purple-600 text-white shadow-sm' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4" /> Parishioners ({memberCount})
          </button>
          <button
            onClick={() => setActiveTab('CLERGY')}
            className={`px-3.5 py-2 rounded-lg transition flex items-center gap-2 ${
              activeTab === 'CLERGY' 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> Clergy ({clergyCount})
          </button>
          <button
            onClick={() => setActiveTab('LAY_READERS')}
            className={`px-3.5 py-2 rounded-lg transition flex items-center gap-2 ${
              activeTab === 'LAY_READERS' 
                ? 'bg-amber-600 text-white shadow-sm' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Award className="w-4 h-4" /> Lay Readers ({layCount})
          </button>
          <button
            onClick={() => setActiveTab('STAFF')}
            className={`px-3.5 py-2 rounded-lg transition flex items-center gap-2 ${
              activeTab === 'STAFF' 
                ? 'bg-teal-600 text-white shadow-sm' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <User className="w-4 h-4" /> Parish Staff ({staffCount})
          </button>
          <button
            onClick={() => setActiveTab('RETIRED')}
            className={`px-3.5 py-2 rounded-lg transition flex items-center gap-2 ${
              activeTab === 'RETIRED' 
                ? 'bg-orange-600 text-white shadow-sm' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Award className="w-4 h-4" /> Retired & Emeritus ({retiredCount})
          </button>
          <button
            onClick={() => setActiveTab('SACRAMENTS')}
            className={`px-3.5 py-2 rounded-lg transition flex items-center gap-2 ${
              activeTab === 'SACRAMENTS' 
                ? 'bg-rose-600 text-white shadow-sm' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Heart className="w-4 h-4" /> Sacraments Registry
          </button>
          <button
            onClick={() => setActiveTab('TITHES')}
            className={`px-3.5 py-2 rounded-lg transition flex items-center gap-2 ${
              activeTab === 'TITHES' 
                ? 'bg-emerald-600 text-white shadow-sm' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <DollarSign className="w-4 h-4" /> Tithes & FAAP Ledger ({allTithes.length})
          </button>
          <button
            onClick={() => setActiveTab('EVENTS')}
            className={`px-3.5 py-2 rounded-lg transition flex items-center gap-2 ${
              activeTab === 'EVENTS' 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Calendar className="w-4 h-4" /> Parish Events ({allEvents.length})
          </button>
        </div>

        {/* Global Add / Register Button */}
        {canEditBioData && (
          <div className="shrink-0 pl-2">
            <button
              onClick={() => {
                if (activeTab === 'CLERGY') handleOpenNewBioModal('CLERGY');
                else if (activeTab === 'LAY_READERS') handleOpenNewBioModal('LAY_READER');
                else if (activeTab === 'STAFF') handleOpenNewBioModal('STAFF');
                else if (activeTab === 'RETIRED') handleOpenNewBioModal('RETIRED_CLERGY');
                else handleOpenNewBioModal('MEMBER');
              }}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold transition shadow-sm flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Register New Bio-Data
            </button>
          </div>
        )}
      </div>

      {/* Main Workspace Area */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6">

        {/* Search & Filter Bar (For Personnel Tabs) */}
        {['MEMBERS', 'CLERGY', 'LAY_READERS', 'STAFF', 'RETIRED'].includes(activeTab) && (
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search by name, ID, phone, NIN, or parish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white font-medium focus:outline-none"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="ACTIVE">Active</option>
                  <option value="ON_LEAVE">On Leave</option>
                  <option value="RETIRED">Retired</option>
                </select>
              </div>

              <button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('ALL');
                  setSelectedParishFilter('ALL');
                }}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
                title="Reset Filters"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* PERSONNEL ROSTER TABLE */}
        {['MEMBERS', 'CLERGY', 'LAY_READERS', 'STAFF', 'RETIRED'].includes(activeTab) && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-600" />
                {activeTab === 'MEMBERS' && 'Parishioners & General Members Register'}
                {activeTab === 'CLERGY' && 'Ordained Clergy Holy Orders Register'}
                {activeTab === 'LAY_READERS' && 'Commissioned Lay Readers & Catechists Roster'}
                {activeTab === 'STAFF' && 'Parish & Diocesan Administrative Staff Roster'}
                {activeTab === 'RETIRED' && 'Retired Personnel & Emeritus Clergy Register'}
                <span className="text-purple-600 font-black">({filteredMembers.length})</span>
              </h3>

              <div className="text-xs text-slate-500 font-medium">
                Diocese of Kampala & Sovereign Province
              </div>
            </div>

            {filteredMembers.length === 0 ? (
              <div className="p-12 text-center text-slate-500 space-y-3">
                <Users className="w-12 h-12 text-slate-300 mx-auto" />
                <p className="text-xs font-medium">No personnel or member records match your query.</p>
                {canEditBioData && (
                  <button
                    onClick={() => handleOpenNewBioModal('MEMBER')}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg text-xs font-bold hover:bg-purple-700 transition"
                  >
                    Register New Member Bio-Data
                  </button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 text-slate-700 uppercase font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3.5">Parishioner Bio-Data</th>
                      <th className="p-3.5">Category & ID</th>
                      <th className="p-3.5">Contact & Residence</th>
                      <th className="p-3.5">Sacraments</th>
                      <th className="p-3.5">Role Specifics</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredMembers.map(m => (
                      <tr key={m.id} className="hover:bg-slate-50/80 transition">
                        
                        {/* Bio-Data & Passport Photo */}
                        <td className="p-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-200 border border-slate-300 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                              {m.photoUrl ? (
                                <img src={m.photoUrl} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <User className="w-5 h-5 text-slate-400" />
                              )}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 text-xs">
                                {m.title} {m.firstName} {m.middleName ? m.middleName + ' ' : ''}{m.lastName}
                              </div>
                              <div className="text-[10px] text-slate-500 flex items-center gap-1.5">
                                <span>{m.gender}</span> • <span>DOB: {m.dateOfBirth}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Category & ID */}
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider block w-max ${
                            m.classification === 'CLERGY' ? 'bg-indigo-100 text-indigo-800' :
                            m.classification === 'LAY_READER' ? 'bg-amber-100 text-amber-800' :
                            m.classification === 'STAFF' ? 'bg-teal-100 text-teal-800' :
                            m.classification.startsWith('RETIRED') ? 'bg-orange-100 text-orange-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {m.classification.replace('_', ' ')}
                          </span>
                          <span className="font-mono text-[10px] text-slate-500 font-bold mt-1 block">
                            {m.id}
                          </span>
                        </td>

                        {/* Contact & Residence */}
                        <td className="p-3.5">
                          <div className="text-slate-900 font-medium">{m.phone}</div>
                          <div className="text-[10px] text-slate-500 truncate max-w-xs">{m.parishOfResidence}</div>
                        </td>

                        {/* Sacraments Badges */}
                        <td className="p-3.5">
                          <div className="flex items-center gap-1">
                            {m.sacraments.baptized && (
                              <span 
                                title={`Baptized: ${m.sacraments.baptismDate || 'Yes'}`}
                                className="px-1.5 py-0.5 rounded text-[8px] font-black uppercase bg-blue-100 text-blue-800 cursor-help"
                              >
                                B
                              </span>
                            )}
                            {m.sacraments.confirmed && (
                              <span 
                                title={`Confirmed: ${m.sacraments.confirmationDate || 'Yes'}`}
                                className="px-1.5 py-0.5 rounded text-[8px] font-black uppercase bg-emerald-100 text-emerald-800 cursor-help"
                              >
                                C
                              </span>
                            )}
                            {m.sacraments.married && (
                              <span 
                                title={`Married: ${m.sacraments.marriageDate || 'Yes'}`}
                                className="px-1.5 py-0.5 rounded text-[8px] font-black uppercase bg-purple-100 text-purple-800 cursor-help"
                              >
                                M
                              </span>
                            )}
                            {m.sacraments.communicant && (
                              <span 
                                title="Lord's Table Communicant"
                                className="px-1.5 py-0.5 rounded text-[8px] font-black uppercase bg-amber-100 text-amber-800 cursor-help"
                              >
                                COM
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Role Specifics */}
                        <td className="p-3.5 text-[11px]">
                          {m.clergy && (
                            <div>
                              <span className="font-bold text-indigo-900">{m.clergy.clergyTitle}</span>
                              <span className="text-slate-500 block text-[10px] truncate max-w-xs">{m.clergy.currentAssignment}</span>
                            </div>
                          )}
                          {m.layReader && (
                            <div>
                              <span className="font-bold text-amber-900">{m.layReader.readerTitle}</span>
                              <span className="text-slate-500 block text-[10px] truncate max-w-xs">{m.layReader.assignedChapel}</span>
                            </div>
                          )}
                          {m.staff && (
                            <div>
                              <span className="font-bold text-teal-900">{m.staff.designation}</span>
                              <span className="text-slate-500 block text-[10px]">{m.staff.department}</span>
                            </div>
                          )}
                          {m.retired && (
                            <div>
                              <span className="font-bold text-orange-900">{m.retired.emeritusTitle || 'Emeritus'}</span>
                              <span className="text-slate-500 block text-[10px]">{m.retired.totalYearsOfService} Yrs Svc</span>
                            </div>
                          )}
                          {!m.clergy && !m.layReader && !m.staff && !m.retired && (
                            <span className="text-slate-500">Parishioner</span>
                          )}
                        </td>

                        {/* Status */}
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                            m.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' :
                            m.status === 'RETIRED' ? 'bg-orange-100 text-orange-800' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {m.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setViewingProfileMember(m)}
                              className="p-1.5 bg-slate-100 hover:bg-purple-100 text-slate-700 hover:text-purple-700 rounded-lg transition"
                              title="View Full Profile & ID Card"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            
                            {canEditBioData && (
                              <button
                                onClick={() => handleEditMember(m)}
                                className="p-1.5 bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-700 rounded-lg transition"
                                title="Edit Bio-Data"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                            )}

                            {canRecordTithes && (
                              <button
                                onClick={() => {
                                  setTitheMember(m);
                                  setShowTitheModal(true);
                                }}
                                className="p-1.5 bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-700 rounded-lg transition"
                                title="Log Tithe Contribution"
                              >
                                <DollarSign className="w-3.5 h-3.5" />
                              </button>
                            )}

                            {canEditBioData && (
                              <button
                                onClick={() => handleDeleteMember(m.id)}
                                className="p-1.5 bg-slate-100 hover:bg-rose-100 text-slate-700 hover:text-rose-700 rounded-lg transition"
                                title="Delete Record"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* SACRAMENTS REGISTRY VIEW */}
        {activeTab === 'SACRAMENTS' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Canonical Sacramental Register & Certificate Issuance
                </h3>
                <p className="text-xs text-slate-500">
                  Instant registry verification for Holy Baptism, Confirmation, and Holy Matrimony
                </p>
              </div>
              {canIssueCertificates && (
                <button
                  onClick={() => {
                    setCertMember(allMembers[0]);
                    setShowSacramentCertModal(true);
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg text-xs font-bold hover:bg-purple-700 transition shadow-sm flex items-center gap-2"
                >
                  <Award className="w-4 h-4" /> Issue Official Certificate
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Baptism Summary Card */}
              <div className="p-5 rounded-xl bg-blue-50/60 border border-blue-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-blue-900">Holy Baptism Register</span>
                  <Heart className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-2xl font-black text-blue-950">
                  {allMembers.filter(m => m.sacraments.baptized).length}
                </div>
                <p className="text-[11px] text-blue-800">
                  Total baptized parishioners registered in Diocesan census.
                </p>
              </div>

              {/* Confirmation Summary Card */}
              <div className="p-5 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-emerald-900">Holy Confirmation Register</span>
                  <Award className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-black text-emerald-950">
                  {allMembers.filter(m => m.sacraments.confirmed).length}
                </div>
                <p className="text-[11px] text-emerald-800">
                  Confirmed communicants in full communion with the Bishop.
                </p>
              </div>

              {/* Matrimony Summary Card */}
              <div className="p-5 rounded-xl bg-purple-50/60 border border-purple-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-purple-900">Holy Matrimony Register</span>
                  <Church className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-2xl font-black text-purple-950">
                  {allMembers.filter(m => m.sacraments.married).length}
                </div>
                <p className="text-[11px] text-purple-800">
                  Canonical marriage vows solemnized before the holy altar.
                </p>
              </div>
            </div>

            {/* Sacraments Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-700 uppercase font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Parishioner</th>
                    <th className="p-3">Baptism (Date / Minister)</th>
                    <th className="p-3">Confirmation (Date / Bishop)</th>
                    <th className="p-3">Matrimony (Date / Spouse)</th>
                    <th className="p-3 text-right">Certificate Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {allMembers.map(m => (
                    <tr key={m.id} className="hover:bg-slate-50 transition">
                      <td className="p-3">
                        <div className="font-bold text-slate-900">{m.title} {m.firstName} {m.lastName}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{m.id}</div>
                      </td>
                      <td className="p-3">
                        {m.sacraments.baptized ? (
                          <div>
                            <span className="font-bold text-blue-900">{m.sacraments.baptismDate || 'Recorded'}</span>
                            <span className="text-[10px] text-slate-500 block">{m.sacraments.baptismMinister || 'Parish Priest'}</span>
                          </div>
                        ) : <span className="text-slate-400">—</span>}
                      </td>
                      <td className="p-3">
                        {m.sacraments.confirmed ? (
                          <div>
                            <span className="font-bold text-emerald-900">{m.sacraments.confirmationDate || 'Recorded'}</span>
                            <span className="text-[10px] text-slate-500 block">{m.sacraments.confirmationBishop || 'Diocesan Bishop'}</span>
                          </div>
                        ) : <span className="text-slate-400">—</span>}
                      </td>
                      <td className="p-3">
                        {m.sacraments.married ? (
                          <div>
                            <span className="font-bold text-purple-900">{m.sacraments.marriageDate || 'Recorded'}</span>
                            <span className="text-[10px] text-slate-500 block">{m.sacraments.spouseName || 'Spouse'}</span>
                          </div>
                        ) : <span className="text-slate-400">—</span>}
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setCertMember(m);
                              setCertType('BAPTISM');
                              setShowSacramentCertModal(true);
                            }}
                            className="px-2 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded text-[10px] font-bold"
                          >
                            Baptism Cert
                          </button>
                          <button
                            onClick={() => {
                              setCertMember(m);
                              setCertType('CONFIRMATION');
                              setShowSacramentCertModal(true);
                            }}
                            className="px-2 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded text-[10px] font-bold"
                          >
                            Confirmation Cert
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TITHES & STEWARDSHIP VIEW */}
        {activeTab === 'TITHES' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  FAAP Double-Entry Tithe & Stewardship Ledger
                </h3>
                <p className="text-xs text-slate-500">
                  Master Financial & Accounting Platform integration with zero-drift settlement
                </p>
              </div>
              {canRecordTithes && (
                <button
                  onClick={() => {
                    setTitheMember(null);
                    setShowTitheModal(true);
                  }}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition shadow-sm flex items-center gap-2"
                >
                  <DollarSign className="w-4 h-4" /> Log Tithe Contribution
                </button>
              )}
            </div>

            {/* Tithes Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-700 uppercase font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Receipt / Date</th>
                    <th className="p-3">Parishioner</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Method</th>
                    <th className="p-3">FAAP Ledger Status</th>
                    <th className="p-3">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {allTithes.map(t => (
                    <tr key={t.id} className="hover:bg-slate-50 transition">
                      <td className="p-3 font-mono font-bold text-purple-700">
                        {t.receiptNumber}
                        <div className="text-[10px] text-slate-500 font-sans">{new Date(t.date).toLocaleDateString()}</div>
                      </td>
                      <td className="p-3">
                        <div className="font-bold text-slate-900">{t.memberName}</div>
                        <span className="text-[10px] text-slate-500">{t.memberClassification}</span>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded font-bold uppercase text-[10px] bg-purple-100 text-purple-800">
                          {t.category.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-3 font-black text-slate-900 text-sm">
                        {t.currency} {t.amount.toLocaleString()}
                      </td>
                      <td className="p-3 font-medium text-slate-700">
                        {t.paymentMethod}
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded font-black text-[9px] uppercase bg-emerald-100 text-emerald-800">
                          {t.status}
                        </span>
                      </td>
                      <td className="p-3 text-[11px] text-slate-500 max-w-xs truncate">
                        {t.notes || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PARISH EVENTS & LITURGICAL REGISTRATION */}
        {activeTab === 'EVENTS' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Parish Events, Synods & Liturgical Registrations
                </h3>
                <p className="text-xs text-slate-500">
                  Synod assemblies, retreat registrations, and confirmation delegates
                </p>
              </div>
              <button
                onClick={() => {
                  setEventMember(null);
                  setShowEventModal(true);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition shadow-sm flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" /> Register Delegate For Event
              </button>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allEvents.map(ev => (
                <div key={ev.id} className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-blue-100 text-blue-800">
                      {ev.category.replace('_', ' ')}
                    </span>
                    <span className="text-xs font-bold text-slate-600">{ev.startDate}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{ev.title}</h4>
                  <p className="text-xs text-slate-600 italic">"{ev.theme}"</p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-2 border-t border-slate-200">
                    <p>Venue: <strong className="text-slate-900">{ev.venue}</strong></p>
                    <p>Time: <strong className="text-slate-900">{ev.time}</strong></p>
                    <p>Audience: <strong className="text-slate-900">{ev.targetAudience.replace('_', ' ')}</strong></p>
                    <p>Registered: <strong className="text-blue-700 font-black">{ev.registeredCount} / {ev.capacity}</strong></p>
                  </div>
                </div>
              ))}
            </div>

            {/* Registrations List */}
            <div className="pt-4 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Current Registered Delegates ({allRegistrations.length})
              </h4>
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 text-slate-700 uppercase font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Ticket / Ref</th>
                      <th className="p-3">Event</th>
                      <th className="p-3">Delegate Name</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Registration Date</th>
                      <th className="p-3">Attendance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {allRegistrations.map(r => (
                      <tr key={r.id} className="hover:bg-slate-50 transition">
                        <td className="p-3 font-mono font-bold text-purple-700">{r.ticketRef}</td>
                        <td className="p-3 font-bold text-slate-900">{r.eventTitle}</td>
                        <td className="p-3">{r.memberName}</td>
                        <td className="p-3 uppercase text-[10px] font-bold text-slate-600">{r.memberClassification}</td>
                        <td className="p-3 text-slate-500">{r.registrationDate}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-emerald-100 text-emerald-800">
                            {r.attendanceStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* --- MODALS --- */}

      {/* 1. Bio-Data Registration & Edit Modal */}
      {showBioModal && (
        <ChurchPersonnelBioDataModal
          member={editingMember}
          defaultClassification={defaultClassification}
          onClose={() => setShowBioModal(false)}
          onSaved={(m) => {
            setShowBioModal(false);
            triggerRefresh();
            setViewingProfileMember(m);
          }}
        />
      )}

      {/* 2. Member Profile & Sovereign ID Card Modal */}
      {viewingProfileMember && (
        <ChurchMemberProfileCard
          member={viewingProfileMember}
          onClose={() => setViewingProfileMember(null)}
          onEdit={(m) => {
            setViewingProfileMember(null);
            handleEditMember(m);
          }}
          onRecordTithe={(m) => {
            setTitheMember(m);
            setShowTitheModal(true);
          }}
          onRegisterEvent={(m) => {
            setEventMember(m);
            setShowEventModal(true);
          }}
          onViewSacramentCertificate={(m, sacrament) => {
            setCertMember(m);
            setCertType(sacrament);
            setShowSacramentCertModal(true);
          }}
        />
      )}

      {/* 3. Sacraments Registry Certificate Modal */}
      {showSacramentCertModal && (
        <ChurchSacramentsRegistryModal
          member={certMember}
          initialSacrament={certType}
          onClose={() => setShowSacramentCertModal(false)}
        />
      )}

      {/* 4. Tithes & Stewardship FAAP Modal */}
      {showTitheModal && (
        <ChurchTithesLedgerModal
          member={titheMember}
          onClose={() => setShowTitheModal(false)}
          onTitheLogged={() => triggerRefresh()}
        />
      )}

      {/* 5. Parish Events Registration Modal */}
      {showEventModal && (
        <ChurchEventRegistrationModal
          member={eventMember}
          onClose={() => setShowEventModal(false)}
          onRegistered={() => triggerRefresh()}
        />
      )}

    </div>
  );
};
