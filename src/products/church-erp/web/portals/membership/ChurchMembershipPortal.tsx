import React, { useState, useMemo } from 'react';
import { Users, Plus, ChevronLeft, Calendar, DollarSign, Filter, Search, Download, BarChart2, Briefcase, GraduationCap, MapPin, Layers } from 'lucide-react';
import ChurchPeopleService, { ChurchMemberRecord, TitheRecord } from '../../../domain/ChurchPeopleService';
import { JumoDataTable } from '../../../../../core/enterprise/components/JumoDataTable';
import { SchemaFormEngine } from '../../../../../core/enterprise/components/forms/SchemaFormEngine';
import { FormSchemaRegistry } from '../../../../../core/enterprise/registry/FormSchemaRegistry';
import { ChurchCensusIntelligencePortal } from './ChurchCensusIntelligencePortal';

export const ChurchMembershipPortal: React.FC = () => {
  const service = ChurchPeopleService.getInstance();
  const [members, setMembers] = useState<ChurchMemberRecord[]>(service.getMembers());
  const [showForm, setShowForm] = useState(false);
  const [selectedMember, setSelectedMember] = useState<ChurchMemberRecord | null>(null);
  
  // Advanced Query Engine State
  const [query, setQuery] = useState({
    gender: 'ALL',
    ageBand: 'ALL',
    education: 'ALL',
    employment: 'ALL',
    status: 'ACTIVE'
  });

  const handleRegister = (data: any) => {
    service.addMember({
      firstName: data.fullName?.split(' ')[0] || data.firstName || '',
      lastName: data.fullName?.split(' ').slice(1).join(' ') || data.lastName || '',
      dateOfBirth: data.dob || data.dateOfBirth,
      gender: data.sex || data.gender || 'Male',
      phone: data.telephone || data.phone || '',
      physicalAddress: data.residentialAddress || data.address || '',
      maritalStatus: data.maritalStatus || 'Single',
      status: data.membershipStatus || 'ACTIVE',
      classification: data.membershipCategory || 'MEMBER',
      sacraments: {
        baptized: data.isBaptized === true || data.isBaptized === 'true',
        confirmed: data.isConfirmed === true || data.isConfirmed === 'true',
        married: data.holyMatrimonyDate ? true : false
      },
      parish: data.parish || 'Main Parish',
      enrollmentDate: data.registrationDate || new Date().toISOString().split('T')[0],
      educationLevel: data.educationLevel,
      profession: data.profession,
      occupation: data.occupation,
      household: data.fatherName || data.spouseName
    } as any);
    setMembers(service.getMembers());
    setShowForm(false);
  };

  const calculateAge = (dob: string) => {
    if (!dob) return 0;
    const diff = Date.now() - new Date(dob).getTime();
    return Math.abs(new Date(diff).getUTCFullYear() - 1970);
  };

  const getAgeBand = (age: number) => {
    if (age <= 12) return '0-12';
    if (age <= 17) return '13-17';
    if (age <= 25) return '18-25';
    if (age <= 35) return '26-35';
    if (age <= 45) return '36-45';
    if (age <= 60) return '46-60';
    return '60+';
  };

  // Compound Query Execution
  const filteredMembers = useMemo(() => {
    return members.filter(m => {
      const age = calculateAge(m.dateOfBirth);
      const band = getAgeBand(age);
      
      if (query.gender !== 'ALL' && m.gender !== query.gender) return false;
      if (query.ageBand !== 'ALL' && band !== query.ageBand) return false;
      if (query.education !== 'ALL' && m.educationLevel !== query.education) return false;
      if (query.employment !== 'ALL' && m.employmentStatus !== query.employment) return false;
      if (query.status !== 'ALL' && m.status !== query.status) return false;
      
      return true;
    });
  }, [members, query]);

  // Analytics Engine
  const analytics = useMemo(() => {
    const total = filteredMembers.length;
    const males = filteredMembers.filter(m => m.gender === 'Male').length;
    const females = filteredMembers.filter(m => m.gender === 'Female').length;
    const youth = filteredMembers.filter(m => {
      const band = getAgeBand(calculateAge(m.dateOfBirth));
      return band === '18-25' || band === '26-35';
    }).length;
    const professionals = filteredMembers.filter(m => m.educationLevel === 'Degree' || m.educationLevel === 'Masters' || m.educationLevel === 'PhD' || m.educationLevel === 'BACHELORS' || m.educationLevel === 'MASTERS' || m.educationLevel === 'DOCTORATE').length;

    return { total, males, females, youth, professionals };
  }, [filteredMembers]);

  if (selectedMember) {
    // Keep existing profile view but we could expand it
    return (
      <div className="h-full flex flex-col bg-slate-50 font-sans overflow-y-auto">
        {/* Simplified for now, just a back button and details */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setSelectedMember(null)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-lg font-black text-slate-900">{selectedMember.firstName} {selectedMember.lastName}</h2>
              <p className="text-xs font-bold text-slate-500">{selectedMember.memberNumber} • {selectedMember.status}</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
             <h3 className="text-sm font-bold border-b pb-2">Full Demographic Profile</h3>
             <pre className="text-xs text-slate-600 font-mono">{JSON.stringify(selectedMember, null, 2)}</pre>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-slate-50 font-sans">
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">Demographic Intelligence & Census</h2>
            <p className="text-xs font-bold text-slate-500">Compound Query Engine & Parishioner Analytics</p>
          </div>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition shadow-sm"
        >
          <Plus className="w-4 h-4" /> Register Parishioner
        </button>
      </div>
      
      {showForm ? (
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
             <div className="flex justify-between items-center mb-6 pb-4 border-b">
                <h3 className="text-lg font-black">Universal Church Member Census</h3>
                <button onClick={() => setShowForm(false)} className="text-sm font-bold text-slate-500 hover:text-slate-900">Cancel</button>
             </div>
             <SchemaFormEngine
               schema={FormSchemaRegistry.FORM_CH_MEMBER_REG}
               initialData={{}}
               onSubmit={handleRegister}
               onCancel={() => setShowForm(false)}
             />
          </div>
        </div>
      ) : (
        <div className="flex-1 p-6 space-y-6 overflow-auto">
          <ChurchCensusIntelligencePortal />
        </div>
      )}
    </div>
  );
};
