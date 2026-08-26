import React, { useState } from 'react';
import { 
  Users, Search, Filter, ShieldCheck, QrCode, Plus, 
  Download, Award, CheckCircle, Mail, Phone, MapPin, Building,
  Printer, Edit3, Briefcase
} from 'lucide-react';
import { AlumniErpService } from '../../domain/AlumniErpService';
import { AlumniMember } from '../../domain/types';
import { EditProfileModal, EditProfileData } from '../../../../components/common/EditProfileModal';
import { PrintIdentityCardModal } from '../../../../components/common/PrintIdentityCardModal';

export const AlumniRegistryModule: React.FC = () => {
  const service = AlumniErpService.getInstance();
  const [members, setMembers] = useState<AlumniMember[]>(service.getMembers());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState<string>('ALL');
  const [selectedGradYear, setSelectedGradYear] = useState<string>('ALL');
  const [selectedMember, setSelectedMember] = useState<AlumniMember | null>(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    institution: 'Sovereign University of Health Sciences',
    faculty: 'Faculty of Medicine',
    degree: 'Bachelor of Medicine & Surgery (MBChB)',
    graduationYear: 2024,
    currentEmployer: '',
    jobTitle: '',
    industry: 'Healthcare',
    locationCity: 'Kampala',
    locationCountry: 'Uganda',
    chapterId: 'CHP-KAMPALA',
    membershipTier: 'STANDARD' as const,
    verificationStatus: 'VERIFIED' as const,
    totalDonationsUSD: 0,
    isMentor: false,
    bio: ''
  });

  const faculties = [
    'ALL',
    'Faculty of Medicine',
    'Faculty of Law',
    'Faculty of Technology & Engineering',
    'Faculty of Business & Economics',
    'Faculty of Agriculture & Environmental Sciences'
  ];

  const filteredMembers = members.filter(m => {
    const matchesSearch = 
      m.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.alumniNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.currentEmployer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.degree.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFaculty = selectedFaculty === 'ALL' || m.faculty === selectedFaculty;
    const matchesGradYear = selectedGradYear === 'ALL' || m.graduationYear.toString() === selectedGradYear;

    return matchesSearch && matchesFaculty && matchesGradYear;
  });

  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault();
    const newMember = service.registerMember(formData);
    setMembers(service.getMembers());
    setShowAddModal(false);
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      institution: 'Sovereign University of Health Sciences',
      faculty: 'Faculty of Medicine',
      degree: 'Bachelor of Medicine & Surgery (MBChB)',
      graduationYear: 2024,
      currentEmployer: '',
      jobTitle: '',
      industry: 'Healthcare',
      locationCity: 'Kampala',
      locationCountry: 'Uganda',
      chapterId: 'CHP-KAMPALA',
      membershipTier: 'STANDARD',
      verificationStatus: 'VERIFIED',
      totalDonationsUSD: 0,
      isMentor: false,
      bio: ''
    });
  };

  const handleSaveProfile = (data: EditProfileData) => {
    if (selectedMember) {
      service.updateMemberProfile(selectedMember.id, {
        currentEmployer: data.employer,
        jobTitle: data.jobTitle,
        locationCity: data.locationCity
      });
      const updatedList = service.getMembers();
      setMembers([...updatedList]);
      const updatedItem = updatedList.find(m => m.id === selectedMember.id);
      if (updatedItem) {
        setSelectedMember(updatedItem);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-rose-600" />
            <span>Alumni Registry & Institutional Census</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Master database of verified graduates, lifetime donors, chapter leaders, and professional records.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-colors shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Register Graduate</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="md:col-span-2 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search by name, alumni number, degree, employer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>

        <div>
          <select 
            value={selectedFaculty}
            onChange={(e) => setSelectedFaculty(e.target.value)}
            className="w-full py-2 px-3 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-700 bg-white"
          >
            {faculties.map(f => (
              <option key={f} value={f}>{f === 'ALL' ? 'All Faculties' : f}</option>
            ))}
          </select>
        </div>

        <div>
          <select 
            value={selectedGradYear}
            onChange={(e) => setSelectedGradYear(e.target.value)}
            className="w-full py-2 px-3 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-700 bg-white"
          >
            <option value="ALL">All Graduation Years</option>
            <option value="2024">Class of 2024</option>
            <option value="2023">Class of 2023</option>
            <option value="2022">Class of 2022</option>
            <option value="2021">Class of 2021</option>
            <option value="2020">Class of 2020</option>
            <option value="2018">Class of 2018</option>
          </select>
        </div>
      </div>

      {/* Registry Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Alumni ID</th>
                <th className="py-3.5 px-4">Full Name</th>
                <th className="py-3.5 px-4">Degree & Class</th>
                <th className="py-3.5 px-4">Current Employer / Role</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Status / Tier</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredMembers.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">{m.alumniNumber}</td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{m.fullName}</div>
                    <div className="text-[10px] text-slate-400">{m.email}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-800">{m.degree}</div>
                    <div className="text-[10px] text-slate-400">Class of {m.graduationYear}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-slate-800 font-semibold">{m.jobTitle}</div>
                    <div className="text-[10px] text-slate-500">{m.currentEmployer}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {m.locationCity}, {m.locationCountry}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        m.membershipTier === 'PLATINUM' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                        m.membershipTier === 'GOLD' ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' :
                        m.membershipTier === 'SILVER' ? 'bg-slate-200 text-slate-800' :
                        'bg-blue-50 text-blue-700'
                      }`}>
                        {m.membershipTier}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button 
                      onClick={() => setSelectedMember(m)}
                      className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-bold transition-colors cursor-pointer"
                    >
                      View ID Card
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Member Details / Digital ID Card Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600">
                <Award className="w-4 h-4" />
                <span>Verified Alumni Credential</span>
              </div>
              <button 
                onClick={() => setSelectedMember(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Digital ID Card Preview */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl p-5 shadow-lg border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <div className="text-[10px] uppercase font-bold tracking-widest text-rose-400">JUMO Sovereign Alumni Card</div>
                <div className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded border border-rose-500/30 font-bold">
                  {selectedMember.membershipTier}
                </div>
              </div>

              <div className="space-y-1 mb-4">
                <h3 className="text-lg font-bold text-white">{selectedMember.fullName}</h3>
                <p className="text-xs text-slate-300">{selectedMember.degree}</p>
                <p className="text-[11px] text-slate-400">{selectedMember.institution} • Class of {selectedMember.graduationYear}</p>
              </div>

              <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between">
                <div>
                  <div className="text-[9px] uppercase tracking-wider text-slate-400">Alumni Registration No.</div>
                  <div className="text-xs font-mono font-bold text-rose-300">{selectedMember.alumniNumber}</div>
                </div>
                <div className="bg-white p-1 rounded">
                  <QrCode className="w-8 h-8 text-slate-900" />
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-slate-400 shrink-0" />
                <span><span className="font-semibold text-slate-700">Employer:</span> {selectedMember.currentEmployer}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
                <span><span className="font-semibold text-slate-700">Title:</span> {selectedMember.jobTitle}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span><span className="font-semibold text-slate-700">City:</span> {selectedMember.locationCity}, {selectedMember.locationCountry}</span>
              </div>
            </div>

            {/* Action Buttons: Edit Profile + Print Identity Card */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setIsEditProfileOpen(true)}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-rose-600" />
                <span>Edit Profile</span>
              </button>
              <button
                onClick={() => setIsPrintModalOpen(true)}
                className="px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-colors inline-flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print ID Card</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {selectedMember && (
        <EditProfileModal
          isOpen={isEditProfileOpen}
          onClose={() => setIsEditProfileOpen(false)}
          onSave={handleSaveProfile}
          initialData={{
            employer: selectedMember.currentEmployer,
            jobTitle: selectedMember.jobTitle,
            locationCity: selectedMember.locationCity
          }}
          userName={selectedMember.fullName}
          credentialTitle="Alumni Credential Record"
          accentColor="rose"
        />
      )}

      {/* Print Identity Card Modal */}
      {selectedMember && (
        <PrintIdentityCardModal
          isOpen={isPrintModalOpen}
          onClose={() => setIsPrintModalOpen(false)}
          cardData={{
            fullName: selectedMember.fullName,
            idCode: selectedMember.alumniNumber,
            role: selectedMember.degree,
            employer: selectedMember.currentEmployer,
            jobTitle: selectedMember.jobTitle,
            locationCity: selectedMember.locationCity,
            credentialTitle: "ALUMNI CREDENTIAL CARD",
            accentColor: "rose",
            issueDate: `June 15, ${selectedMember.graduationYear}`,
            expiryDate: "Dec 31, 2029"
          }}
        />
      )}

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Register New Graduate / Alumni</h3>
            <p className="text-xs text-slate-500 mb-4">Add a verified alumni record into the institutional census registry.</p>
            
            <form onSubmit={handleCreateMember} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  required 
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Dr. John Doe"
                  className="w-full p-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full p-2 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone</label>
                  <input 
                    type="tel" 
                    required 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+256 700 000000"
                    className="w-full p-2 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Degree / Qualification</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.degree}
                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                    placeholder="BSc. Computer Science"
                    className="w-full p-2 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Graduation Year</label>
                  <input 
                    type="number" 
                    required 
                    value={formData.graduationYear}
                    onChange={(e) => setFormData({ ...formData, graduationYear: parseInt(e.target.value) || 2024 })}
                    className="w-full p-2 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Current Employer</label>
                  <input 
                    type="text" 
                    value={formData.currentEmployer}
                    onChange={(e) => setFormData({ ...formData, currentEmployer: e.target.value })}
                    placeholder="Company or Organization"
                    className="w-full p-2 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Job Title</label>
                  <input 
                    type="text" 
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                    placeholder="Position"
                    className="w-full p-2 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 mt-4">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-slate-600 text-xs font-semibold hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-rose-600 text-white text-xs font-bold rounded-lg hover:bg-rose-500 transition-colors cursor-pointer"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
