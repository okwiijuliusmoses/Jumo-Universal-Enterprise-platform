import React, { useState, useMemo } from 'react';
import { 
  Users, Filter, Search, RotateCcw, ChevronRight, CheckCircle, X, 
  BarChart2, FileSpreadsheet, PieChart, Layers, HelpCircle, UserCheck, ShieldCheck, Heart, MapPin, Briefcase, GraduationCap
} from 'lucide-react';
import ChurchPeopleService, { ChurchMemberRecord } from '../../../domain/ChurchPeopleService';

export const ChurchCensusIntelligencePortal: React.FC = () => {
  const service = ChurchPeopleService.getInstance();
  const [members, setMembers] = useState<ChurchMemberRecord[]>(service.getMembers());
  
  // Dynamic Compound Query State
  const [filters, setFilters] = useState({
    gender: 'ALL',
    maritalStatus: 'ALL',
    status: 'ALL',
    educationLevel: 'ALL',
    employmentStatus: 'ALL',
    parish: 'ALL',
    congregation: 'ALL',
    district: 'ALL',
    ministry: 'ALL',
    baptized: 'ALL',
    confirmed: 'ALL',
    holyMatrimony: 'ALL',
    ageMin: 0,
    ageMax: 100,
    search: ''
  });

  const [selectedMember, setSelectedMember] = useState<ChurchMemberRecord | null>(null);

  // Helper: calculate exact age
  const calculateAge = (dob: string) => {
    if (!dob) return 0;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Dynamically extract unique values from dataset to populate drop-downs (Zero Hardcoding!)
  const uniqueDimensions = useMemo(() => {
    const parishes = new Set<string>();
    const congregations = new Set<string>();
    const districts = new Set<string>();
    const educationLevels = new Set<string>();
    const employmentStatuses = new Set<string>();
    const ministries = new Set<string>();
    const maritalStatuses = new Set<string>();

    members.forEach(m => {
      if (m.parish) parishes.add(m.parish);
      if (m.congregation) congregations.add(m.congregation);
      if (m.district) districts.add(m.district);
      if (m.educationLevel) educationLevels.add(m.educationLevel);
      if (m.employmentStatus) employmentStatuses.add(m.employmentStatus);
      if (m.ministry) ministries.add(m.ministry);
      if (m.maritalStatus) maritalStatuses.add(m.maritalStatus);
    });

    return {
      parishes: Array.from(parishes).filter(Boolean),
      congregations: Array.from(congregations).filter(Boolean),
      districts: Array.from(districts).filter(Boolean),
      educationLevels: Array.from(educationLevels).filter(Boolean),
      employmentStatuses: Array.from(employmentStatuses).filter(Boolean),
      ministries: Array.from(ministries).filter(Boolean),
      maritalStatuses: Array.from(maritalStatuses).filter(Boolean)
    };
  }, [members]);

  // Execute Dynamic Multidimensional Filter Engine
  const filteredMembers = useMemo(() => {
    return members.filter(m => {
      const age = calculateAge(m.dateOfBirth);

      // 1. Text Search across Name, MemberNumber, Phone, NIN, Location
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const matchesSearch = 
          `${m.firstName} ${m.lastName}`.toLowerCase().includes(q) ||
          (m.memberNumber && m.memberNumber.toLowerCase().includes(q)) ||
          (m.phone && m.phone.toLowerCase().includes(q)) ||
          (m.physicalAddress && m.physicalAddress.toLowerCase().includes(q)) ||
          (m.ninOrNationalId && m.ninOrNationalId.toLowerCase().includes(q));
        if (!matchesSearch) return false;
      }

      // 2. Strict Segment Filtering
      if (filters.gender !== 'ALL' && m.gender !== filters.gender) return false;
      if (filters.maritalStatus !== 'ALL' && m.maritalStatus !== filters.maritalStatus) return false;
      if (filters.status !== 'ALL' && m.status !== filters.status) return false;
      if (filters.educationLevel !== 'ALL' && m.educationLevel !== filters.educationLevel) return false;
      if (filters.employmentStatus !== 'ALL' && m.employmentStatus !== filters.employmentStatus) return false;
      if (filters.parish !== 'ALL' && m.parish !== filters.parish) return false;
      if (filters.congregation !== 'ALL' && m.congregation !== filters.congregation) return false;
      if (filters.district !== 'ALL' && m.district !== filters.district) return false;
      if (filters.ministry !== 'ALL' && m.ministry !== filters.ministry) return false;

      // 3. Sacramental Status Filter
      if (filters.baptized !== 'ALL') {
        const isBaptized = filters.baptized === 'YES';
        if (!!m.sacraments?.baptized !== isBaptized) return false;
      }
      if (filters.confirmed !== 'ALL') {
        const isConfirmed = filters.confirmed === 'YES';
        if (!!m.sacraments?.confirmed !== isConfirmed) return false;
      }
      if (filters.holyMatrimony !== 'ALL') {
        const hasMatrimony = filters.holyMatrimony === 'YES';
        if (!!m.sacraments?.married !== hasMatrimony) return false;
      }

      // 4. Age Range Filter
      if (age < filters.ageMin || age > filters.ageMax) return false;

      return true;
    });
  }, [members, filters]);

  // Deep Aggregation Analytics Engine
  const analytics = useMemo(() => {
    const total = filteredMembers.length;
    let maleCount = 0;
    let femaleCount = 0;
    let baptizedCount = 0;
    let confirmedCount = 0;
    let marriedCount = 0;

    const ageBands = {
      '0-12': 0,
      '13-17': 0,
      '18-25': 0,
      '26-35': 0,
      '36-45': 0,
      '46-60': 0,
      '60+': 0
    };

    const educationBreakdown: Record<string, number> = {};
    const professionalBreakdown: Record<string, number> = {};
    const congregationBreakdown: Record<string, number> = {};

    filteredMembers.forEach(m => {
      // Gender Distribution
      if (m.gender === 'Male') maleCount++;
      else if (m.gender === 'Female') femaleCount++;

      // Sacraments Rate
      if (m.sacraments?.baptized) baptizedCount++;
      if (m.sacraments?.confirmed) confirmedCount++;
      if (m.sacraments?.married) marriedCount++;

      // Age distribution
      const age = calculateAge(m.dateOfBirth);
      if (age <= 12) ageBands['0-12']++;
      else if (age <= 17) ageBands['13-17']++;
      else if (age <= 25) ageBands['18-25']++;
      else if (age <= 35) ageBands['26-35']++;
      else if (age <= 45) ageBands['36-45']++;
      else if (age <= 60) ageBands['46-60']++;
      else ageBands['60+']++;

      // Education Breakdown
      const edu = m.educationLevel || 'None Specified';
      educationBreakdown[edu] = (educationBreakdown[edu] || 0) + 1;

      // Professional Categories
      const prof = m.professionalCategory || m.profession || 'Other / General';
      professionalBreakdown[prof] = (professionalBreakdown[prof] || 0) + 1;

      // Congregations
      const cong = m.congregation || 'Main Chapel';
      congregationBreakdown[cong] = (congregationBreakdown[cong] || 0) + 1;
    });

    return {
      total,
      male: maleCount,
      female: femaleCount,
      baptized: baptizedCount,
      confirmed: confirmedCount,
      married: marriedCount,
      ageBands,
      educationBreakdown,
      professionalBreakdown,
      congregationBreakdown
    };
  }, [filteredMembers]);

  // Reset to default query states
  const handleResetFilters = () => {
    setFilters({
      gender: 'ALL',
      maritalStatus: 'ALL',
      status: 'ALL',
      educationLevel: 'ALL',
      employmentStatus: 'ALL',
      parish: 'ALL',
      congregation: 'ALL',
      district: 'ALL',
      ministry: 'ALL',
      baptized: 'ALL',
      confirmed: 'ALL',
      holyMatrimony: 'ALL',
      ageMin: 0,
      ageMax: 100,
      search: ''
    });
  };

  // Simulate Export of Compound Census Query Results
  const handleExportCSV = () => {
    const headerRow = 'MemberNumber,FullName,Gender,Age,MaritalStatus,EducationLevel,Occupation,Parish,Congregation,Baptized,Confirmed,HolyMatrimony,Status\n';
    const dataRows = filteredMembers.map(m => {
      const fullName = `"${m.firstName} ${m.lastName}"`;
      const age = calculateAge(m.dateOfBirth);
      return `${m.memberNumber || ''},${fullName},${m.gender},${age},${m.maritalStatus || ''},${m.educationLevel || ''},"${m.occupation || ''}","${m.parish || ''}","${m.congregation || ''}",${m.sacraments?.baptized ? 'Yes' : 'No'},${m.sacraments?.confirmed ? 'Yes' : 'No'},${m.sacraments?.married ? 'Yes' : 'No'},${m.status}\n`;
    }).join('');

    const blob = new Blob([headerRow + dataRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `JUMO_Church_Census_Query_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* 1. Dynamic Multidimensional Dashboard Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Query Matches</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{analytics.total}</div>
          <p className="text-[10px] text-slate-500 mt-1 font-medium">Out of {members.length} registered</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Gender Mix</div>
          <div className="text-base font-black text-slate-900 mt-1">
            M: {analytics.male} • F: {analytics.female}
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden flex">
            <div className="bg-blue-500" style={{ width: `${analytics.total ? (analytics.male / analytics.total) * 100 : 0}%` }} />
            <div className="bg-rose-400" style={{ width: `${analytics.total ? (analytics.female / analytics.total) * 100 : 0}%` }} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Baptized Rate</div>
          <div className="text-xl font-black text-slate-900 mt-1">
            {analytics.total ? Math.round((analytics.baptized / analytics.total) * 100) : 0}%
          </div>
          <p className="text-[10px] text-indigo-600 font-bold mt-1">{analytics.baptized} Parishioners</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Confirmation Rate</div>
          <div className="text-xl font-black text-slate-900 mt-1">
            {analytics.total ? Math.round((analytics.confirmed / analytics.total) * 100) : 0}%
          </div>
          <p className="text-[10px] text-emerald-600 font-bold mt-1">{analytics.confirmed} Communicants</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Holy Matrimony</div>
          <div className="text-xl font-black text-slate-900 mt-1">
            {analytics.total ? Math.round((analytics.married / analytics.total) * 100) : 0}%
          </div>
          <p className="text-[10px] text-amber-600 font-bold mt-1">{analytics.married} Couples</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Avg Age Band</div>
          <div className="text-xl font-black text-purple-700 mt-1">
            {useMemo(() => {
              if (filteredMembers.length === 0) return 'N/A';
              const sum = filteredMembers.reduce((acc, cur) => acc + calculateAge(cur.dateOfBirth), 0);
              return `${Math.round(sum / filteredMembers.length)} yrs`;
            }, [filteredMembers])}
          </div>
          <p className="text-[10px] text-slate-500 font-medium mt-1">Weighted mathematical mean</p>
        </div>
      </div>

      {/* 2. Compound Filter Controls */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <h3 className="text-sm font-black text-slate-900">Compound Census Filter Engine</h3>
          </div>
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-black text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Query</span>
          </button>
        </div>

        {/* Filters Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-bold text-slate-700">
          {/* Search Query */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Search Name / NIN / ID</label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                value={filters.search}
                onChange={e => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="w-full pl-8.5 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-900 focus:bg-white focus:ring-1 focus:ring-slate-900 font-medium"
              />
            </div>
          </div>

          {/* Gender */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sex Segment</label>
            <select
              value={filters.gender}
              onChange={e => setFilters(prev => ({ ...prev, gender: e.target.value }))}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-1 focus:ring-slate-900 text-slate-800"
            >
              <option value="ALL">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Marital Status */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Marital Status</label>
            <select
              value={filters.maritalStatus}
              onChange={e => setFilters(prev => ({ ...prev, maritalStatus: e.target.value }))}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-1 focus:ring-slate-900 text-slate-800"
            >
              <option value="ALL">All Statuses</option>
              {uniqueDimensions.maritalStatuses.map(ms => (
                <option key={ms} value={ms}>{ms}</option>
              ))}
            </select>
          </div>

          {/* Parish */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sovereign Parish</label>
            <select
              value={filters.parish}
              onChange={e => setFilters(prev => ({ ...prev, parish: e.target.value }))}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-1 focus:ring-slate-900 text-slate-800"
            >
              <option value="ALL">All Parishes</option>
              {uniqueDimensions.parishes.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Congregation */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Congregation</label>
            <select
              value={filters.congregation}
              onChange={e => setFilters(prev => ({ ...prev, congregation: e.target.value }))}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-1 focus:ring-slate-900 text-slate-800"
            >
              <option value="ALL">All Congregations</option>
              {uniqueDimensions.congregations.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Education Level */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Education Level</label>
            <select
              value={filters.educationLevel}
              onChange={e => setFilters(prev => ({ ...prev, educationLevel: e.target.value }))}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-1 focus:ring-slate-900 text-slate-800"
            >
              <option value="ALL">All Education Levels</option>
              {uniqueDimensions.educationLevels.map(edu => (
                <option key={edu} value={edu}>{edu}</option>
              ))}
            </select>
          </div>

          {/* Employment/Economic */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Employment Status</label>
            <select
              value={filters.employmentStatus}
              onChange={e => setFilters(prev => ({ ...prev, employmentStatus: e.target.value }))}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-1 focus:ring-slate-900 text-slate-800"
            >
              <option value="ALL">All Occupations</option>
              {uniqueDimensions.employmentStatuses.map(es => (
                <option key={es} value={es}>{es}</option>
              ))}
            </select>
          </div>

          {/* Ministries */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ministry / Fellowship</label>
            <select
              value={filters.ministry}
              onChange={e => setFilters(prev => ({ ...prev, ministry: e.target.value }))}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-1 focus:ring-slate-900 text-slate-800"
            >
              <option value="ALL">All Ministries</option>
              {uniqueDimensions.ministries.map(min => (
                <option key={min} value={min}>{min}</option>
              ))}
            </select>
          </div>

          {/* Baptism Sacrament */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Baptism</label>
            <select
              value={filters.baptized}
              onChange={e => setFilters(prev => ({ ...prev, baptized: e.target.value }))}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-1 focus:ring-slate-900 text-slate-800"
            >
              <option value="ALL">All</option>
              <option value="YES">Baptized</option>
              <option value="NO">Not Baptized</option>
            </select>
          </div>

          {/* Confirmation Sacrament */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Confirmation</label>
            <select
              value={filters.confirmed}
              onChange={e => setFilters(prev => ({ ...prev, confirmed: e.target.value }))}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-1 focus:ring-slate-900 text-slate-800"
            >
              <option value="ALL">All</option>
              <option value="YES">Confirmed</option>
              <option value="NO">Not Confirmed</option>
            </select>
          </div>

          {/* Age Bounds Range */}
          <div className="space-y-1.5 col-span-1 md:col-span-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Age Bounds Window ({filters.ageMin} - {filters.ageMax} yrs)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="100"
                value={filters.ageMin}
                onChange={e => setFilters(prev => ({ ...prev, ageMin: parseInt(e.target.value) }))}
                className="w-full accent-slate-900"
              />
              <input
                type="range"
                min="0"
                max="100"
                value={filters.ageMax}
                onChange={e => setFilters(prev => ({ ...prev, ageMax: parseInt(e.target.value) }))}
                className="w-full accent-slate-900"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Analytics Distribution Matrix (Tailwind Visualization Charts) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Age Band Histogram */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b pb-2">
            <BarChart2 className="w-4 h-4 text-indigo-500" /> Age Bands Histogram
          </h4>
          <div className="space-y-2.5 text-xs">
            {Object.entries(analytics.ageBands).map(([band, count]) => {
              const percentage = analytics.total ? Math.round(((count as number) / analytics.total) * 100) : 0;
              return (
                <div key={band} className="space-y-1">
                  <div className="flex justify-between font-bold text-slate-700 text-[11px]">
                    <span>{band} years</span>
                    <span>{count} ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-slate-50 h-2 rounded-full overflow-hidden border border-slate-100">
                    <div className="bg-indigo-600 h-full rounded-full transition-all" style={{ width: `${percentage}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Professional Classification breakdown */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b pb-2">
            <Briefcase className="w-4 h-4 text-emerald-500" /> Economic Professions
          </h4>
          <div className="space-y-3 text-xs max-h-[320px] overflow-y-auto custom-scrollbar">
            {Object.entries(analytics.professionalBreakdown).length === 0 ? (
              <p className="text-slate-400 font-bold text-center py-4">No professional data matching filters.</p>
            ) : (
              Object.entries(analytics.professionalBreakdown).map(([prof, count]) => {
                const percentage = analytics.total ? Math.round(((count as number) / analytics.total) * 100) : 0;
                return (
                  <div key={prof} className="space-y-1">
                    <div className="flex justify-between font-bold text-slate-700 text-[11px]">
                      <span className="truncate max-w-[180px]">{prof}</span>
                      <span>{count} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-slate-50 h-2 rounded-full overflow-hidden border border-slate-100">
                      <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Congregation distribution */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b pb-2">
            <MapPin className="w-4 h-4 text-amber-500" /> Congregational Distribution
          </h4>
          <div className="space-y-3 text-xs max-h-[320px] overflow-y-auto custom-scrollbar">
            {Object.entries(analytics.congregationBreakdown).length === 0 ? (
              <p className="text-slate-400 font-bold text-center py-4">No congregational data matching filters.</p>
            ) : (
              Object.entries(analytics.congregationBreakdown).map(([cong, count]) => {
                const percentage = analytics.total ? Math.round(((count as number) / analytics.total) * 100) : 0;
                return (
                  <div key={cong} className="space-y-1">
                    <div className="flex justify-between font-bold text-slate-700 text-[11px]">
                      <span className="truncate max-w-[180px]">{cong}</span>
                      <span>{count} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-slate-50 h-2 rounded-full overflow-hidden border border-slate-100">
                      <div className="bg-amber-500 h-full rounded-full transition-all" style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* 4. Sovereign Census Results Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-55">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-slate-500" />
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Demographic Intelligence Query Log</h4>
          </div>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold cursor-pointer shadow-xs transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Export Query to CSV</span>
          </button>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse table-auto">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <th className="py-3 px-4">Parishioner / ID</th>
                <th className="py-3 px-4">Gender & Age</th>
                <th className="py-3 px-4">Sovereign Station</th>
                <th className="py-3 px-4">Sacraments Completed</th>
                <th className="py-3 px-4">Education & Profession</th>
                <th className="py-3 px-4 text-center">Census Portfolio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 font-bold">
                    No census profiles match the compound demographic criteria.
                  </td>
                </tr>
              ) : (
                filteredMembers.map(m => (
                  <tr key={m.id} className="hover:bg-slate-50/50 transition-colors">
                    {/* Name */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{m.firstName} {m.lastName}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">{m.memberNumber || m.id}</div>
                      <span className="inline-block mt-1 px-1.5 py-0.5 text-[8px] font-black bg-slate-100 text-slate-600 rounded uppercase tracking-wider">
                        {m.classification}
                      </span>
                    </td>

                    {/* Gender & Age */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800">{m.gender}</div>
                      <div className="text-[10px] text-slate-500 font-bold mt-0.5">{calculateAge(m.dateOfBirth)} years old</div>
                    </td>

                    {/* Location & Congregation */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{m.congregation || 'Main Chapel'}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">{m.parish}</div>
                    </td>

                    {/* Sacraments */}
                    <td className="py-3 px-4 space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold">
                        <span className={`w-2 h-2 rounded-full ${m.sacraments?.baptized ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                        <span className={m.sacraments?.baptized ? 'text-slate-700' : 'text-slate-400'}>Baptized</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold">
                        <span className={`w-2 h-2 rounded-full ${m.sacraments?.confirmed ? 'bg-indigo-500' : 'bg-slate-300'}`} />
                        <span className={m.sacraments?.confirmed ? 'text-slate-700' : 'text-slate-400'}>Confirmed</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold">
                        <span className={`w-2 h-2 rounded-full ${m.sacraments?.married ? 'bg-amber-500' : 'bg-slate-300'}`} />
                        <span className={m.sacraments?.married ? 'text-slate-700' : 'text-slate-400'}>Matrimony</span>
                      </div>
                    </td>

                    {/* Education */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800">{m.educationLevel || 'None Specified'}</div>
                      <div className="text-[10px] text-slate-500 truncate max-w-[180px] font-bold mt-0.5">
                        {m.occupation || 'N/A'}
                      </div>
                    </td>

                    {/* Census detail click */}
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => setSelectedMember(m)}
                        className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 transition-all cursor-pointer"
                        title="View Full Profile details"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-out Parishioner Portfolio Drawer */}
      {selectedMember && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex justify-end z-50 animate-fade-in">
          <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col overflow-hidden animate-slide-in">
            {/* Header */}
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider">Demographic Portfolio</h3>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">{selectedMember.memberNumber || selectedMember.id}</p>
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-6 text-xs font-bold text-slate-700">
              {/* Profile Block */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 shrink-0 text-slate-400 text-xl font-bold">
                  {selectedMember.firstName[0]}{selectedMember.lastName[0]}
                </div>
                <div>
                  <h4 className="text-base font-black text-slate-900">
                    {selectedMember.title ? `${selectedMember.title} ` : ''}{selectedMember.firstName} {selectedMember.lastName}
                  </h4>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">{selectedMember.ninOrNationalId ? `NIN: ${selectedMember.ninOrNationalId}` : 'No National ID registered'}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 text-[9px] font-black bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-lg uppercase">
                    {selectedMember.classification}
                  </span>
                </div>
              </div>

              {/* Demographic Details Grid */}
              <div className="border-t border-slate-100 pt-4">
                <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Sovereign Biodata Portfolio</h5>
                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 border border-slate-200 rounded-xl">
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-black">Sex</span>
                    <div className="text-slate-900 mt-0.5">{selectedMember.gender}</div>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-black">Date Of Birth</span>
                    <div className="text-slate-900 mt-0.5">{selectedMember.dateOfBirth} ({calculateAge(selectedMember.dateOfBirth)} yrs)</div>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-black">Marital Status</span>
                    <div className="text-slate-900 mt-0.5">{selectedMember.maritalStatus}</div>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-black">Dependents Count</span>
                    <div className="text-slate-900 mt-0.5">{selectedMember.numberOfDependents || 0} dependents</div>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-black">Primary Phone</span>
                    <div className="text-slate-900 mt-0.5 font-mono">{selectedMember.phone || 'N/A'}</div>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-black">E-Mail Address</span>
                    <div className="text-slate-900 mt-0.5 font-mono break-all">{selectedMember.email || 'N/A'}</div>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[9px] text-slate-400 uppercase font-black">Physical Residential Address</span>
                    <div className="text-slate-900 mt-0.5">{selectedMember.physicalAddress}</div>
                  </div>
                </div>
              </div>

              {/* Professional portfolio */}
              <div className="border-t border-slate-100 pt-4">
                <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Economic & Career Metadata</h5>
                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 border border-slate-200 rounded-xl">
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-black">Education Level</span>
                    <div className="text-slate-900 mt-0.5">{selectedMember.educationLevel || 'None'}</div>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-black">Professional category</span>
                    <div className="text-slate-900 mt-0.5">{selectedMember.professionalCategory || 'N/A'}</div>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-black">Occupation</span>
                    <div className="text-slate-900 mt-0.5">{selectedMember.occupation || 'N/A'}</div>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-black">Employment Status</span>
                    <div className="text-slate-900 mt-0.5">{selectedMember.employmentStatus || 'N/A'}</div>
                  </div>
                </div>
              </div>

              {/* Ecclesiastical Context */}
              <div className="border-t border-slate-100 pt-4">
                <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Ecclesiastical Canonical Registry</h5>
                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 border border-slate-200 rounded-xl">
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-black">Diocese Jurisdiction</span>
                    <div className="text-slate-900 mt-0.5">{selectedMember.diocese}</div>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-black">Registered Parish</span>
                    <div className="text-slate-900 mt-0.5">{selectedMember.parish}</div>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-black">Assigned Congregation</span>
                    <div className="text-slate-900 mt-0.5">{selectedMember.congregation || 'Main Chapel'}</div>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-black">Ministry Involvements</span>
                    <div className="text-slate-900 mt-0.5">{selectedMember.ministry || 'General Fellowship'}</div>
                  </div>
                </div>
              </div>

              {/* Sacramental completion certificates */}
              <div className="border-t border-slate-100 pt-4">
                <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Sacramental Records Certifications</h5>
                <div className="space-y-3">
                  {selectedMember.sacraments?.baptized && (
                    <div className="flex items-start gap-2.5 p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-slate-900">Holy Baptism Complete</div>
                        <p className="text-[10px] text-slate-500 mt-0.5 font-medium">
                          Certificate: {selectedMember.sacraments.baptismCertificateNo || 'BC-GEN-928'} • Parish: {selectedMember.sacraments.baptismParish || 'Diocesan Registry'}
                        </p>
                      </div>
                    </div>
                  )}
                  {selectedMember.sacraments?.confirmed && (
                    <div className="flex items-start gap-2.5 p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl">
                      <CheckCircle className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-slate-900">Holy Confirmation Complete</div>
                        <p className="text-[10px] text-slate-500 mt-0.5 font-medium">
                          Certificate: {selectedMember.sacraments.confirmationCertificateNo || 'CC-GEN-104'} • Bishop: {selectedMember.sacraments.confirmationBishop || 'Rt. Rev. Bishop'}
                        </p>
                      </div>
                    </div>
                  )}
                  {selectedMember.sacraments?.married && (
                    <div className="flex items-start gap-2.5 p-3 bg-amber-50/70 border border-amber-200 rounded-xl">
                      <CheckCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-slate-900">Holy Matrimony Confirmed</div>
                        <p className="text-[10px] text-slate-500 mt-0.5 font-medium">
                          Certificate: {selectedMember.sacraments.marriageCertificateNo || 'MC-GEN-021'} • Spouse: {selectedMember.sacraments.spouseName || 'Registered Partner'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end gap-3 shrink-0">
              <button
                onClick={() => setSelectedMember(null)}
                className="px-4 py-2 text-xs bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl font-bold cursor-pointer"
              >
                Close Portfolio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
