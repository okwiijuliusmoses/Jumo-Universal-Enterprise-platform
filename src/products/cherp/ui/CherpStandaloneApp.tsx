import React, { useState } from 'react';
import { 
  Church, Users, DollarSign, Heart, Calendar, 
  Building2, BookOpen, Music, FileText, Globe, 
  CheckCircle2, Plus, Search, Filter, RefreshCw, 
  Landmark, Award, Send, ChevronRight, UserCheck, ShieldCheck, Eye, Sliders, Radio, Activity
} from 'lucide-react';
import { CHERP_MANIFEST } from '../manifest';
import { CHERP_MODULES } from '../modules';
import { faapClient } from '../../../platforms/contracts/faapContract';
import { EnterpriseWorkspaceLayout } from '../../../components/EnterpriseWorkspaceLayout';

export interface CherpStandaloneAppProps {
  onBackToLauncher?: () => void;
}

// CHERP Portals Definition derived from Diocesan Architecture
const CHERP_PORTALS = [
  {
    id: 'CH-PORTAL-BISHOP',
    code: 'BISHOP_COCKPIT',
    title: 'Bishop, Synod & Board of Trustees Cockpit',
    role: 'Diocesan Bishop & Synod Executive',
    office: 'Diocesan Secretariat & Chancellor Desk',
    directorate: 'Directorate of Diocesan Governance & Episcopal Care',
    moduleIds: ['CH-MOD-SACRAMENTS', 'CH-MOD-TITHE-OFFERTORY', 'CH-MOD-BUILDING-PLEDGES', 'CH-MOD-MISSIONS-CRUSADES']
  },
  {
    id: 'CH-PORTAL-CLERGY',
    code: 'CLERGY_WORKSPACE',
    title: 'Parish Clergy & Pastoral Care Workspace',
    role: 'Parish Vicar / Canon / Pastoral Officer',
    office: 'Parish Secretary & Sacraments Desk',
    directorate: 'Directorate of Pastoral Care, Sacraments & Parish Registry',
    moduleIds: ['CH-MOD-SACRAMENTS', 'CH-MOD-CELL-FELLOWSHIPS', 'CH-MOD-PASTORAL-CARE', 'CH-MOD-BENEVOLENCE-WELFARE', 'CH-MOD-SANCTUARY-EVENTS']
  },
  {
    id: 'CH-PORTAL-TREASURY',
    code: 'TREASURY_TERMINAL',
    title: 'Diocesan Treasury & Stewardship Terminal',
    role: 'Diocesan Treasurer / Chief Accountant',
    office: 'Treasury Cashier & Counting Room Desk',
    directorate: 'Directorate of Diocesan Treasury, Tithes & Stewardship',
    moduleIds: ['CH-MOD-TITHE-OFFERTORY', 'CH-MOD-BUILDING-PLEDGES', 'CH-MOD-BENEVOLENCE-WELFARE']
  },
  {
    id: 'CH-PORTAL-MEMBER',
    code: 'PARISHIONER_PORTAL',
    title: 'Parishioner E-Giving & Sanctuary Portal',
    role: 'Parishioner / Congregation Member',
    office: 'Sanctuary Protocol & Media Desk',
    directorate: 'Directorate of Media Broadcasting, Liturgy & Member Care',
    moduleIds: ['CH-MOD-TITHE-OFFERTORY', 'CH-MOD-LIVESTREAM-MEDIA', 'CH-MOD-SANCTUARY-EVENTS', 'CH-MOD-PASTORAL-CARE']
  }
];

export function CherpStandaloneApp({ onBackToLauncher }: CherpStandaloneAppProps) {
  const [activePortalId, setActivePortalId] = useState<string>('CH-PORTAL-CLERGY');
  const [activeModuleId, setActiveModuleId] = useState<string>('CH-MOD-SACRAMENTS');
  const [activeTab, setActiveTab] = useState<'RECORDS' | 'FORM' | 'ANALYTICS'>('RECORDS');
  const [searchQuery, setSearchQuery] = useState('');
  const [executionMessage, setExecutionMessage] = useState<string | null>(null);

  // Form states
  const [formState, setFormState] = useState<Record<string, string>>({});

  const currentPortal = CHERP_PORTALS.find(p => p.id === activePortalId) || CHERP_PORTALS[1];
  
  // Available modules for current portal
  const availableModules = CHERP_MODULES.filter(m => currentPortal.moduleIds.includes(m.id));
  const currentModule = CHERP_MODULES.find(m => m.id === activeModuleId) || availableModules[0] || CHERP_MODULES[0];

  // Live Data States for CHERP Modules
  const [parishioners, setParishioners] = useState([
    { id: 'PAR-1001', name: 'Dr. Samuel K. Mukasa', familyRole: 'Head of Household', sacrament: 'Baptized & Confirmed', phone: '+256 772 100200', zone: 'St. Paul Zone A', status: 'CONFIRMED', date: '2012-05-14' },
    { id: 'PAR-1002', name: 'Mrs. Grace N. Mukasa', familyRole: 'Spouse', sacrament: 'Holy Matrimony 2012', phone: '+256 772 100201', zone: 'St. Paul Zone A', status: 'MARRIED', date: '2012-05-14' },
    { id: 'PAR-1003', name: 'Rev. Canon Emmanuel Kato', familyRole: 'Clergy / Vicar', sacrament: 'Ordained Priest 2008', phone: '+256 701 554433', zone: 'Cathedral Staff', status: 'ORDAINED', date: '2008-11-20' },
    { id: 'PAR-1004', name: 'Florence N. Nabatanzi', familyRole: 'Youth Member', sacrament: 'Holy Baptism 2020', phone: '+256 782 998877', zone: 'Missions Team B', status: 'BAPTIZED', date: '2020-03-10' },
    { id: 'PAR-1005', name: 'Joshua Male Ssebunya', familyRole: 'Youth Member', sacrament: 'Confirmation Candidate', phone: '+256 752 443322', zone: 'St. Peter Zone C', status: 'CANDIDATE', date: '2026-01-15' }
  ]);

  const [titheRecords, setTitheRecords] = useState([
    { id: 'TITHE-901', member: 'Dr. Samuel K. Mukasa', amount: 350000, channel: 'Digital Pay MoMo', date: '2026-08-30', voteCode: 'VOTE-TITHE-01', status: 'POSTED_TO_FAAP' },
    { id: 'TITHE-902', member: 'Anonymous Sunday Offertory', amount: 1450000, channel: 'Dual Cash Count', date: '2026-08-30', voteCode: 'VOTE-OFFERTORY-02', status: 'POSTED_TO_FAAP' },
    { id: 'TITHE-903', member: 'Eng. Isaac Serwadda', amount: 500000, channel: 'Mobile Money Webhook', date: '2026-08-28', voteCode: 'VOTE-TITHE-01', status: 'VERIFIED' }
  ]);

  const [cellGroups] = useState([
    { id: 'CELL-01', name: 'St. Luke Home Cell - Mengo', leader: 'Elder Patrick Wasswa', membersCount: 18, meetingDay: 'Wednesdays 5:30 PM', zone: 'Mengo Archdeaconry', status: 'ACTIVE' },
    { id: 'CELL-02', name: 'St. John Fellowship - Rubaga', leader: 'Deaconess Sarah Namuli', membersCount: 24, meetingDay: 'Tuesdays 6:00 PM', zone: 'Rubaga Zone B', status: 'ACTIVE' },
    { id: 'CELL-03', name: 'Youth Discipleship Cell', leader: 'Brother Timothy Okello', membersCount: 31, meetingDay: 'Fridays 4:00 PM', zone: 'Cathedral Grounds', status: 'ACTIVE' }
  ]);

  const [buildingPledges, setBuildingPledges] = useState([
    { id: 'PLG-501', donorName: 'Prof. Christopher K. Lwanga', targetProject: 'New Cathedral Tower Roofing', pledgeAmount: 10000000, paidAmount: 6000000, status: 'PARTIAL', balance: 4000000 },
    { id: 'PLG-502', donorName: 'Mothers Union Choir', targetProject: 'Sound System & Acoustics', pledgeAmount: 5000000, paidAmount: 5000000, status: 'COMPLETED', balance: 0 }
  ]);

  const [missions, setMissions] = useState([
    { id: 'MIS-101', name: 'Gomba Rural Outreach Crusade', location: 'Gomba District', budget: 15000000, converts: 142, status: 'COMPLETED' },
    { id: 'MIS-102', name: 'Luwero Church Planting Mission', location: 'Luwero Town', budget: 25000000, converts: 89, status: 'IN_PROGRESS' }
  ]);

  const [pastoralSessions, setPastoralSessions] = useState([
    { id: 'PAS-201', parishioner: 'Okello & Namubiru', type: 'Pre-Marital Counseling', minister: 'Rev. Canon Kato', status: 'SESSION_3_COMPLETE', date: '2026-08-25' },
    { id: 'PAS-202', parishioner: 'Mrs. Florence Nabatanzi', type: 'Hospital Care Visit (Mulago)', minister: 'Pastoral Care Team', status: 'COMPLETED', date: '2026-08-28' }
  ]);

  const [benevolenceGrants, setBenevolenceGrants] = useState([
    { id: 'BEN-301', beneficiary: 'Mrs. Nabukenya & Family', category: 'Widows Emergency Support', amount: 450000, status: 'DISBURSED', approvedBy: 'Parish Benevolence Board' },
    { id: 'BEN-302', beneficiary: 'St. Mark Orphans Center', category: 'School Fees & Supplies Grant', amount: 850000, status: 'DISBURSED', approvedBy: 'Diocesan Welfare Fund' }
  ]);

  const [sanctuaryRosters] = useState([
    { id: 'SANC-401', event: 'Sunday 8:00 AM Holy Communion', celebrant: 'Rev. Canon Kato', preacher: 'Rt. Rev. Bishop Lwanga', reader: 'Elder Wasswa', status: 'CONFIRMED' },
    { id: 'SANC-402', event: 'Sunday 10:30 AM Luganda Service', celebrant: 'Rev. Peter Nsubuga', preacher: 'Dr. Samuel Mukasa', reader: 'Deaconess Namuli', status: 'CONFIRMED' }
  ]);

  const [livestreamVault, setLivestreamVault] = useState([
    { id: 'MEDIA-501', title: 'Sunday Morning Holy Synod Service', speaker: 'Bishop Lwanga', platform: 'RTMP 1080p Live Stream', views: 4200, status: 'ARCHIVED' },
    { id: 'MEDIA-502', title: 'Sermon Audio: Faith in Seasons of Trial', speaker: 'Rev. Canon Kato', platform: 'Sermon Podcast Vault', views: 1850, status: 'PUBLISHED' }
  ]);

  // Handle switching portals
  const handleSwitchPortal = (portalId: string) => {
    setActivePortalId(portalId);
    const targetPortal = CHERP_PORTALS.find(p => p.id === portalId);
    if (targetPortal && targetPortal.moduleIds.length > 0) {
      setActiveModuleId(targetPortal.moduleIds[0]);
    }
    setExecutionMessage(null);
  };

  // Execute operational actions
  const handleExecuteAction = (actionName: string) => {
    setExecutionMessage(null);
    
    if (activeModuleId === 'CH-MOD-SACRAMENTS') {
      const name = formState['fullName'] || 'New Parishioner';
      const sacrament = formState['sacrament'] || 'Holy Baptism 2026';
      const phone = formState['phone'] || '+256 700 000000';
      const zone = formState['zone'] || 'General Cathedral';

      const newMember = {
        id: `PAR-${Math.floor(1000 + Math.random() * 9000)}`,
        name,
        familyRole: formState['role'] || 'Member',
        sacrament,
        phone,
        zone,
        status: sacrament.toUpperCase().includes('BAPT') ? 'BAPTIZED' : 'CONFIRMED',
        date: new Date().toISOString().split('T')[0]
      };

      setParishioners([newMember, ...parishioners]);
      setExecutionMessage(`Successfully registered parishioner [${name}] into Diocesan Parish Sacramental Roll.`);
    } 
    else if (activeModuleId === 'CH-MOD-TITHE-OFFERTORY') {
      const giverName = formState['giverName'] || 'Parishioner Stewardship';
      const amt = Number(formState['amount']) || 250000;

      // Post to FAAP GL
      const journal = faapClient.recordJournal(
        'VOTE-CHURCH-TITHE',
        `Tithe collection by ${giverName}`,
        'MANUAL',
        [
          { accountId: 'ACC-1001-CASH', description: 'Debit Bank Tithe Account', debit: amt, credit: 0 },
          { accountId: 'ACC-2001-REV', description: 'Credit Tithe & Stewardship Revenue', debit: 0, credit: amt }
        ],
        true
      );

      const newTithe = {
        id: `TITHE-${Math.floor(100 + Math.random() * 900)}`,
        member: giverName,
        amount: amt,
        channel: 'FAAP Ledger System',
        date: new Date().toISOString().split('T')[0],
        voteCode: 'VOTE-TITHE-FAAP',
        status: 'POSTED_TO_FAAP'
      };

      setTitheRecords([newTithe, ...titheRecords]);
      setExecutionMessage(`Posted Tithe/Offertory of UGX ${amt.toLocaleString()} to FAAP GL Ledger (Ref: ${journal.id}).`);
    }
    else if (activeModuleId === 'CH-MOD-BUILDING-PLEDGES') {
      const donor = formState['donorName'] || 'Anonymous Benefactor';
      const amt = Number(formState['pledgeAmount']) || 1000000;
      const project = formState['targetProject'] || 'Cathedral Renovation';

      const newPledge = {
        id: `PLG-${Math.floor(500 + Math.random() * 400)}`,
        donorName: donor,
        targetProject: project,
        pledgeAmount: amt,
        paidAmount: 0,
        status: 'PARTIAL',
        balance: amt
      };

      setBuildingPledges([newPledge, ...buildingPledges]);
      setExecutionMessage(`Registered capital building pledge of UGX ${amt.toLocaleString()} for project [${project}].`);
    }
    else if (activeModuleId === 'CH-MOD-MISSIONS-CRUSADES') {
      const name = formState['missionName'] || 'New Evangelism Crusade';
      const loc = formState['location'] || 'Diocesan Rural Zone';
      const bg = Number(formState['budget']) || 12000000;

      const newMission = {
        id: `MIS-${Math.floor(100 + Math.random() * 900)}`,
        name,
        location: loc,
        budget: bg,
        converts: 0,
        status: 'SCHEDULED'
      };

      setMissions([newMission, ...missions]);
      setExecutionMessage(`Scheduled rural evangelism mission [${name}] in ${loc} with budget UGX ${bg.toLocaleString()}.`);
    }
    else if (activeModuleId === 'CH-MOD-PASTORAL-CARE') {
      const parishioner = formState['parishionerName'] || 'Parishioner Family';
      const type = formState['careType'] || 'Pastoral Counseling Session';

      const newSession = {
        id: `PAS-${Math.floor(200 + Math.random() * 800)}`,
        parishioner,
        type,
        minister: formState['minister'] || currentPortal.role,
        status: 'SCHEDULED',
        date: new Date().toISOString().split('T')[0]
      };

      setPastoralSessions([newSession, ...pastoralSessions]);
      setExecutionMessage(`Recorded pastoral care session for [${parishioner}] (${type}).`);
    }
    else if (activeModuleId === 'CH-MOD-BENEVOLENCE-WELFARE') {
      const beneficiary = formState['beneficiary'] || 'Community Beneficiary';
      const amt = Number(formState['amount']) || 300000;
      const cat = formState['category'] || 'Emergency Welfare Relief';

      const newGrant = {
        id: `BEN-${Math.floor(300 + Math.random() * 700)}`,
        beneficiary,
        category: cat,
        amount: amt,
        status: 'DISBURSED',
        approvedBy: currentPortal.role
      };

      setBenevolenceGrants([newGrant, ...benevolenceGrants]);
      setExecutionMessage(`Disbursed Benevolence Welfare Grant of UGX ${amt.toLocaleString()} to [${beneficiary}].`);
    }
    else if (activeModuleId === 'CH-MOD-LIVESTREAM-MEDIA') {
      const title = formState['sermonTitle'] || 'Sunday Liturgy Audio Broadcast';
      const speaker = formState['speaker'] || 'Diocesan Preacher';

      const newMedia = {
        id: `MEDIA-${Math.floor(500 + Math.random() * 500)}`,
        title,
        speaker,
        platform: 'RTMP 1080p Stream & Audio Vault',
        views: 0,
        status: 'PUBLISHED'
      };

      setLivestreamVault([newMedia, ...livestreamVault]);
      setExecutionMessage(`Published media broadcast entry [${title}] by ${speaker}.`);
    }
    else {
      setExecutionMessage(`Action completed for ${currentModule.name}. Record updated in Diocesan Registry.`);
    }

    setFormState({});
    setActiveTab('RECORDS');
  };

  const moduleSidebarOptions = availableModules.map(m => ({
    id: m.id,
    code: m.code,
    name: m.name,
    description: m.description,
    icon: Church
  }));

  return (
    <EnterpriseWorkspaceLayout
      productCode={CHERP_MANIFEST.code}
      productName={CHERP_MANIFEST.name}
      benchmarkBadge="NAMIREMBE DIOCESE SYNOD BENCHMARK"
      productIcon={Church}
      badgeThemeClass="bg-amber-50 text-amber-900 border-amber-300"
      portals={CHERP_PORTALS}
      activePortalId={activePortalId}
      onPortalChange={handleSwitchPortal}
      modules={moduleSidebarOptions}
      activeModuleId={activeModuleId}
      onModuleChange={(modId) => {
        setActiveModuleId(modId);
        setExecutionMessage(null);
        setActiveTab('RECORDS');
      }}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      executionMessage={executionMessage}
      onDismissExecutionMessage={() => setExecutionMessage(null)}
      onBackToLauncher={onBackToLauncher}
    >
      <div className="space-y-6">
        {/* TAB 1: OPERATIONAL RECORDS TABLE */}
        {activeTab === 'RECORDS' && (
          <div className="space-y-4">
            {activeModuleId === 'CH-MOD-SACRAMENTS' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-800">Diocesan Parishioner & Sacramental Register</h3>
                  <button
                    onClick={() => setActiveTab('FORM')}
                    className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Register Parishioner
                  </button>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs font-sans">
                    <thead className="bg-slate-50 border-b border-slate-200 font-mono text-[11px] text-slate-500">
                      <tr>
                        <th className="p-3">ID</th>
                        <th className="p-3">Parishioner Name</th>
                        <th className="p-3">Role</th>
                        <th className="p-3">Sacramental Status</th>
                        <th className="p-3">Parish Zone</th>
                        <th className="p-3">Phone</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                      {parishioners
                        .filter(p => searchQuery === '' || p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map(p => (
                          <tr key={p.id} className="hover:bg-slate-50/80">
                            <td className="p-3 font-mono font-bold text-slate-500">{p.id}</td>
                            <td className="p-3 font-bold text-slate-900">{p.name}</td>
                            <td className="p-3">{p.familyRole}</td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold">
                                {p.sacrament}
                              </span>
                            </td>
                            <td className="p-3">{p.zone}</td>
                            <td className="p-3 font-mono text-slate-600">{p.phone}</td>
                            <td className="p-3 text-right">
                              <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded text-[11px] font-bold">
                                Registered
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeModuleId === 'CH-MOD-TITHE-OFFERTORY' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-800">Diocesan Tithes, Offertory & FAAP GL Journal Stream</h3>
                  <button
                    onClick={() => setActiveTab('FORM')}
                    className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Post Tithe Collection
                  </button>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 font-mono text-[11px] text-slate-500">
                      <tr>
                        <th className="p-3">Receipt Ref</th>
                        <th className="p-3">Giver / Collection Description</th>
                        <th className="p-3">Amount (UGX)</th>
                        <th className="p-3">Payment Channel</th>
                        <th className="p-3">FAAP GL Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                      {titheRecords.map(t => (
                        <tr key={t.id} className="hover:bg-slate-50/80">
                          <td className="p-3 font-mono font-bold text-slate-500">{t.id}</td>
                          <td className="p-3 font-bold text-slate-900">{t.member}</td>
                          <td className="p-3 font-mono font-bold text-emerald-700">UGX {t.amount.toLocaleString()}</td>
                          <td className="p-3">{t.channel}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold">
                              {t.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeModuleId === 'CH-MOD-CELL-FELLOWSHIPS' && (
              <div className="space-y-3">
                <h3 className="font-bold text-sm text-slate-800">Parish Home Cell Fellowships & Zones</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cellGroups.map(cell => (
                    <div key={cell.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-mono font-bold text-slate-400">{cell.id}</span>
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-[10px] font-bold">
                          {cell.status}
                        </span>
                      </div>
                      <div className="font-bold text-slate-900 text-sm">{cell.name}</div>
                      <div className="text-xs text-slate-600">Leader: {cell.leader}</div>
                      <div className="text-xs text-slate-500 flex justify-between pt-2 border-t border-slate-200">
                        <span>{cell.meetingDay}</span>
                        <span>{cell.membersCount} Members</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeModuleId === 'CH-MOD-BUILDING-PLEDGES' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-800">Cathedral Capital & Building Pledges</h3>
                  <button
                    onClick={() => setActiveTab('FORM')}
                    className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Register Building Pledge
                  </button>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 font-mono text-[11px] text-slate-500">
                      <tr>
                        <th className="p-3">Card Ref</th>
                        <th className="p-3">Benefactor Name</th>
                        <th className="p-3">Target Campaign</th>
                        <th className="p-3">Pledge (UGX)</th>
                        <th className="p-3">Balance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                      {buildingPledges.map(p => (
                        <tr key={p.id} className="hover:bg-slate-50/80">
                          <td className="p-3 font-mono font-bold text-slate-500">{p.id}</td>
                          <td className="p-3 font-bold text-slate-900">{p.donorName}</td>
                          <td className="p-3">{p.targetProject}</td>
                          <td className="p-3 font-mono font-bold text-slate-900">UGX {p.pledgeAmount.toLocaleString()}</td>
                          <td className="p-3 font-mono font-bold text-amber-700">UGX {p.balance.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeModuleId === 'CH-MOD-MISSIONS-CRUSADES' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-800">Rural Evangelism Crusades & Church Planting Missions</h3>
                  <button
                    onClick={() => setActiveTab('FORM')}
                    className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Schedule Mission
                  </button>
                </div>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 font-mono text-[11px] text-slate-500">
                      <tr>
                        <th className="p-3">Mission ID</th>
                        <th className="p-3">Crusade / Mission Name</th>
                        <th className="p-3">Target Location</th>
                        <th className="p-3">Budget (UGX)</th>
                        <th className="p-3">Converts Logged</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                      {missions.map(m => (
                        <tr key={m.id} className="hover:bg-slate-50/80">
                          <td className="p-3 font-mono font-bold text-slate-500">{m.id}</td>
                          <td className="p-3 font-bold text-slate-900">{m.name}</td>
                          <td className="p-3">{m.location}</td>
                          <td className="p-3 font-mono font-bold text-amber-900">UGX {m.budget.toLocaleString()}</td>
                          <td className="p-3 font-mono font-bold text-emerald-800">{m.converts}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-mono font-bold">
                              {m.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeModuleId === 'CH-MOD-PASTORAL-CARE' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-800">Pastoral Counseling Sessions & Hospital Care Logs</h3>
                  <button
                    onClick={() => setActiveTab('FORM')}
                    className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Log Counseling Session
                  </button>
                </div>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 font-mono text-[11px] text-slate-500">
                      <tr>
                        <th className="p-3">Care Ref</th>
                        <th className="p-3">Parishioner / Family</th>
                        <th className="p-3">Care Type</th>
                        <th className="p-3">Assigned Minister</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                      {pastoralSessions.map(s => (
                        <tr key={s.id} className="hover:bg-slate-50/80">
                          <td className="p-3 font-mono font-bold text-slate-500">{s.id}</td>
                          <td className="p-3 font-bold text-slate-900">{s.parishioner}</td>
                          <td className="p-3">{s.type}</td>
                          <td className="p-3">{s.minister}</td>
                          <td className="p-3 font-mono text-slate-600">{s.date}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold">
                              {s.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeModuleId === 'CH-MOD-BENEVOLENCE-WELFARE' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-800">Benevolence Welfare Fund & Compassion Disbursements</h3>
                  <button
                    onClick={() => setActiveTab('FORM')}
                    className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Issue Benevolence Grant
                  </button>
                </div>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 font-mono text-[11px] text-slate-500">
                      <tr>
                        <th className="p-3">Grant Ref</th>
                        <th className="p-3">Beneficiary</th>
                        <th className="p-3">Welfare Category</th>
                        <th className="p-3">Disbursed Amount (UGX)</th>
                        <th className="p-3">Approving Officer</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                      {benevolenceGrants.map(b => (
                        <tr key={b.id} className="hover:bg-slate-50/80">
                          <td className="p-3 font-mono font-bold text-slate-500">{b.id}</td>
                          <td className="p-3 font-bold text-slate-900">{b.beneficiary}</td>
                          <td className="p-3">{b.category}</td>
                          <td className="p-3 font-mono font-bold text-emerald-800">UGX {b.amount.toLocaleString()}</td>
                          <td className="p-3">{b.approvedBy}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold">
                              {b.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeModuleId === 'CH-MOD-SANCTUARY-EVENTS' && (
              <div className="space-y-3">
                <h3 className="font-bold text-sm text-slate-800">Sanctuary Liturgical Roster & Event Duty Assignments</h3>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 font-mono text-[11px] text-slate-500">
                      <tr>
                        <th className="p-3">Roster Ref</th>
                        <th className="p-3">Sanctuary Liturgy Event</th>
                        <th className="p-3">Celebrant</th>
                        <th className="p-3">Preacher</th>
                        <th className="p-3">Lesson Reader</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                      {sanctuaryRosters.map(sr => (
                        <tr key={sr.id} className="hover:bg-slate-50/80">
                          <td className="p-3 font-mono font-bold text-slate-500">{sr.id}</td>
                          <td className="p-3 font-bold text-slate-900">{sr.event}</td>
                          <td className="p-3">{sr.celebrant}</td>
                          <td className="p-3 font-bold text-slate-900">{sr.preacher}</td>
                          <td className="p-3">{sr.reader}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold">
                              {sr.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeModuleId === 'CH-MOD-LIVESTREAM-MEDIA' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-800">Sunday Service Livestream Broadcasts & Sermon Audio Vault</h3>
                  <button
                    onClick={() => setActiveTab('FORM')}
                    className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Publish Broadcast / Sermon
                  </button>
                </div>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 font-mono text-[11px] text-slate-500">
                      <tr>
                        <th className="p-3">Media Ref</th>
                        <th className="p-3">Broadcast / Sermon Title</th>
                        <th className="p-3">Preacher / Speaker</th>
                        <th className="p-3">Stream Rail</th>
                        <th className="p-3">Audience Reach</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                      {livestreamVault.map(m => (
                        <tr key={m.id} className="hover:bg-slate-50/80">
                          <td className="p-3 font-mono font-bold text-slate-500">{m.id}</td>
                          <td className="p-3 font-bold text-slate-900">{m.title}</td>
                          <td className="p-3">{m.speaker}</td>
                          <td className="p-3 font-mono text-slate-600">{m.platform}</td>
                          <td className="p-3 font-mono font-bold text-amber-900">{m.views.toLocaleString()} Viewers</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold">
                              {m.status}
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
        )}

        {/* TAB 2: DATA ENTRY & FORMS */}
        {activeTab === 'FORM' && (
          <div className="space-y-4 max-w-2xl">
            <h3 className="font-bold text-sm text-slate-800">Church Enterprise Action Form</h3>

            {activeModuleId === 'CH-MOD-SACRAMENTS' && (
              <div className="space-y-4 p-5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="font-bold text-xs text-slate-800">Parishioner Registration & Sacramental Roll Entry</div>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Full Parishioner Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Dr. Samuel K. Mukasa"
                      value={formState['fullName'] || ''}
                      onChange={e => setFormState({ ...formState, fullName: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Sacramental Status</label>
                      <input
                        type="text"
                        placeholder="e.g. Holy Baptism / Confirmation"
                        value={formState['sacrament'] || ''}
                        onChange={e => setFormState({ ...formState, sacrament: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Parish Zone / Cell</label>
                      <input
                        type="text"
                        placeholder="e.g. St. Paul Zone A"
                        value={formState['zone'] || ''}
                        onChange={e => setFormState({ ...formState, zone: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleExecuteAction('Register Parishioner')}
                  className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Save Parishioner Record
                </button>
              </div>
            )}

            {activeModuleId === 'CH-MOD-TITHE-OFFERTORY' && (
              <div className="space-y-4 p-5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="font-bold text-xs text-slate-800">Post Tithe / Offertory Collection</div>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Giver / Collection Narration</label>
                    <input
                      type="text"
                      placeholder="e.g. Sunday Morning Offertory / Member Tithe"
                      value={formState['giverName'] || ''}
                      onChange={e => setFormState({ ...formState, giverName: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Amount (UGX)</label>
                    <input
                      type="number"
                      placeholder="e.g. 500000"
                      value={formState['amount'] || ''}
                      onChange={e => setFormState({ ...formState, amount: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                </div>
                <button
                  onClick={() => handleExecuteAction('Post Tithe')}
                  className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <DollarSign className="w-4 h-4" /> Post Collection to FAAP GL
                </button>
              </div>
            )}

            {activeModuleId === 'CH-MOD-BUILDING-PLEDGES' && (
              <div className="space-y-4 p-5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="font-bold text-xs text-slate-800">Register Cathedral Building Pledge</div>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Benefactor Donor Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Eng. Isaac Serwadda"
                      value={formState['donorName'] || ''}
                      onChange={e => setFormState({ ...formState, donorName: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Pledge Amount (UGX)</label>
                    <input
                      type="number"
                      placeholder="e.g. 5000000"
                      value={formState['pledgeAmount'] || ''}
                      onChange={e => setFormState({ ...formState, pledgeAmount: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                </div>
                <button
                  onClick={() => handleExecuteAction('Register Capital Building Pledge')}
                  className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Register Cathedral Building Pledge Card
                </button>
              </div>
            )}

            {activeModuleId === 'CH-MOD-MISSIONS-CRUSADES' && (
              <div className="space-y-4 p-5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="font-bold text-xs text-slate-800">Schedule Rural Evangelism Mission</div>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Crusade / Mission Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Gomba Rural Outreach Crusade"
                      value={formState['missionName'] || ''}
                      onChange={e => setFormState({ ...formState, missionName: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Target Location</label>
                      <input
                        type="text"
                        placeholder="e.g. Gomba District"
                        value={formState['location'] || ''}
                        onChange={e => setFormState({ ...formState, location: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Mission Budget (UGX)</label>
                      <input
                        type="number"
                        placeholder="e.g. 15000000"
                        value={formState['budget'] || ''}
                        onChange={e => setFormState({ ...formState, budget: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleExecuteAction('Schedule Mission')}
                  className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Authorize Evangelism Mission
                </button>
              </div>
            )}

            {activeModuleId === 'CH-MOD-BENEVOLENCE-WELFARE' && (
              <div className="space-y-4 p-5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="font-bold text-xs text-slate-800">Issue Benevolence Compassion Grant</div>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Beneficiary Family / Person</label>
                    <input
                      type="text"
                      placeholder="e.g. Mrs. Nabukenya & Family"
                      value={formState['beneficiary'] || ''}
                      onChange={e => setFormState({ ...formState, beneficiary: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Grant Amount (UGX)</label>
                      <input
                        type="number"
                        placeholder="e.g. 450000"
                        value={formState['amount'] || ''}
                        onChange={e => setFormState({ ...formState, amount: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Welfare Category</label>
                      <input
                        type="text"
                        placeholder="e.g. Emergency Widows Support"
                        value={formState['category'] || ''}
                        onChange={e => setFormState({ ...formState, category: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleExecuteAction('Issue Benevolence Grant')}
                  className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4" /> Disburse Compassion Grant
                </button>
              </div>
            )}

            {activeModuleId === 'CH-MOD-LIVESTREAM-MEDIA' && (
              <div className="space-y-4 p-5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="font-bold text-xs text-slate-800">Publish Service Broadcast / Sermon Podcast</div>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Broadcast / Sermon Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Sunday Morning Holy Synod Service"
                      value={formState['sermonTitle'] || ''}
                      onChange={e => setFormState({ ...formState, sermonTitle: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Preacher / Speaker</label>
                    <input
                      type="text"
                      placeholder="e.g. Rt. Rev. Bishop Lwanga"
                      value={formState['speaker'] || ''}
                      onChange={e => setFormState({ ...formState, speaker: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                </div>
                <button
                  onClick={() => handleExecuteAction('Publish Broadcast')}
                  className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Radio className="w-4 h-4" /> Publish to Media Stream Vault
                </button>
              </div>
            )}

            {activeModuleId !== 'CH-MOD-SACRAMENTS' && 
             activeModuleId !== 'CH-MOD-TITHE-OFFERTORY' && 
             activeModuleId !== 'CH-MOD-BUILDING-PLEDGES' && 
             activeModuleId !== 'CH-MOD-MISSIONS-CRUSADES' && 
             activeModuleId !== 'CH-MOD-BENEVOLENCE-WELFARE' && 
             activeModuleId !== 'CH-MOD-LIVESTREAM-MEDIA' && (
              <div className="space-y-3 p-5 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-xs text-slate-600">
                  Form binding for <strong>{currentModule.name}</strong> is active.
                </p>
                <button
                  onClick={() => handleExecuteAction(`Submit ${currentModule.name} Form`)}
                  className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Execute Operational Action
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ANALYTICS */}
        {activeTab === 'ANALYTICS' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                <div className="text-[10px] font-mono font-bold text-amber-800 uppercase">Active Parishioners</div>
                <div className="text-2xl font-black text-amber-900 mt-1">{parishioners.length}</div>
                <div className="text-[11px] text-amber-700 mt-1">Parish Roll Active</div>
              </div>
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="text-[10px] font-mono font-bold text-emerald-800 uppercase">Total Tithes Collected</div>
                <div className="text-xl font-black text-emerald-900 mt-1">
                  UGX {titheRecords.reduce((acc, t) => acc + t.amount, 0).toLocaleString()}
                </div>
                <div className="text-[11px] text-emerald-700 mt-1">Posted to FAAP Ledger</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                <div className="text-[10px] font-mono font-bold text-purple-800 uppercase">Capital Pledges</div>
                <div className="text-xl font-black text-purple-900 mt-1">
                  UGX {buildingPledges.reduce((acc, p) => acc + p.pledgeAmount, 0).toLocaleString()}
                </div>
                <div className="text-[11px] text-purple-700 mt-1">Building Campaign</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </EnterpriseWorkspaceLayout>
  );
}
