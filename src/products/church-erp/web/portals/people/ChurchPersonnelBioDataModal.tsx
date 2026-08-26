import React, { useState } from 'react';
import { 
  X, Camera, Upload, Shield, CheckCircle2, User, Church, 
  Award, Calendar, Phone, Mail, MapPin, FileText, Heart,
  Sparkles, AlertCircle
} from 'lucide-react';
import ChurchPeopleService, { 
  ChurchMemberRecord, 
  ChurchMemberClassification, 
  ClergyTitle, 
  LayReaderTitle, 
  StaffTitle 
} from '../../../domain/ChurchPeopleService';

interface BioDataModalProps {
  member?: ChurchMemberRecord | null;
  defaultClassification?: ChurchMemberClassification;
  onClose: () => void;
  onSaved: (member: ChurchMemberRecord) => void;
}

export const ChurchPersonnelBioDataModal: React.FC<BioDataModalProps> = ({
  member,
  defaultClassification = 'MEMBER',
  onClose,
  onSaved
}) => {
  const service = ChurchPeopleService.getInstance();
  const [activeTab, setActiveTab] = useState<'BIO' | 'CONTACT' | 'SACRAMENTS' | 'ROLE_SPECIFIC'>('BIO');

  // Classification
  const [classification, setClassification] = useState<ChurchMemberClassification>(
    member?.classification || defaultClassification
  );

  // Bio-Data
  const [title, setTitle] = useState(member?.title || (classification === 'CLERGY' ? 'The Rev.' : classification === 'LAY_READER' ? 'Mr.' : 'Mr.'));
  const [firstName, setFirstName] = useState(member?.firstName || '');
  const [middleName, setMiddleName] = useState(member?.middleName || '');
  const [lastName, setLastName] = useState(member?.lastName || '');
  const [gender, setGender] = useState<'Male' | 'Female'>(member?.gender || 'Male');
  const [dateOfBirth, setDateOfBirth] = useState(member?.dateOfBirth || '1990-01-01');
  const [ninOrNationalId, setNinOrNationalId] = useState(member?.ninOrNationalId || '');
  const [passportNumber, setPassportNumber] = useState(member?.passportNumber || '');
  const [maritalStatus, setMaritalStatus] = useState<'Single' | 'Married' | 'Widowed' | 'Divorced'>(member?.maritalStatus || 'Single');
  const [numberOfDependents, setNumberOfDependents] = useState(member?.numberOfDependents || 0);

  // Contact
  const [phone, setPhone] = useState(member?.phone || '');
  const [secondaryPhone, setSecondaryPhone] = useState(member?.secondaryPhone || '');
  const [email, setEmail] = useState(member?.email || '');
  const [physicalAddress, setPhysicalAddress] = useState(member?.physicalAddress || '');
  const [villageOrCell, setVillageOrCell] = useState(member?.villageOrCell || '');
  const [subCountyOrZone, setSubCountyOrZone] = useState(member?.subCountyOrZone || '');
  const [parishOfResidence, setParishOfResidence] = useState(member?.parishOfResidence || 'St. Paul Cathedral Parish');
  const [archdeaconry, setArchdeaconry] = useState(member?.archdeaconry || 'Central Archdeaconry');
  const [diocese, setDiocese] = useState(member?.diocese || 'Diocese of Kampala & Sovereign Province');
  const [nationality, setNationality] = useState(member?.nationality || 'Ugandan');

  // Passport Photo Upload
  const [photoUrl, setPhotoUrl] = useState(member?.photoUrl || '');
  const [photoError, setPhotoError] = useState('');

  // Sacraments
  const [baptized, setBaptized] = useState(member?.sacraments.baptized ?? true);
  const [baptismDate, setBaptismDate] = useState(member?.sacraments.baptismDate || '');
  const [baptismParish, setBaptismParish] = useState(member?.sacraments.baptismParish || '');
  const [baptismMinister, setBaptismMinister] = useState(member?.sacraments.baptismMinister || '');
  const [baptismCertificateNo, setBaptismCertificateNo] = useState(member?.sacraments.baptismCertificateNo || '');
  const [godparents, setGodparents] = useState(member?.sacraments.godparents || '');

  const [confirmed, setConfirmed] = useState(member?.sacraments.confirmed ?? true);
  const [confirmationDate, setConfirmationDate] = useState(member?.sacraments.confirmationDate || '');
  const [confirmationDiocese, setConfirmationDiocese] = useState(member?.sacraments.confirmationDiocese || '');
  const [confirmationBishop, setConfirmationBishop] = useState(member?.sacraments.confirmationBishop || '');
  const [confirmationCertificateNo, setConfirmationCertificateNo] = useState(member?.sacraments.confirmationCertificateNo || '');

  const [married, setMarried] = useState(member?.sacraments.married ?? false);
  const [marriageDate, setMarriageDate] = useState(member?.sacraments.marriageDate || '');
  const [marriageChurch, setMarriageChurch] = useState(member?.sacraments.marriageChurch || '');
  const [marriageOfficiatingMinister, setMarriageOfficiatingMinister] = useState(member?.sacraments.marriageOfficiatingMinister || '');
  const [marriageCertificateNo, setMarriageCertificateNo] = useState(member?.sacraments.marriageCertificateNo || '');
  const [spouseName, setSpouseName] = useState(member?.sacraments.spouseName || '');

  const [communicant, setCommunicant] = useState(member?.sacraments.communicant ?? true);
  const [communicantCardNo, setCommunicantCardNo] = useState(member?.sacraments.communicantCardNo || '');

  // Clergy Specifics
  const [clergyTitle, setClergyTitle] = useState<ClergyTitle>(member?.clergy?.clergyTitle || 'Rev.');
  const [diaconateDate, setDiaconateDate] = useState(member?.clergy?.diaconateDate || '');
  const [priesthoodDate, setPriesthoodDate] = useState(member?.clergy?.priesthoodDate || '');
  const [ordainingBishop, setOrdainingBishop] = useState(member?.clergy?.ordainingBishop || '');
  const [currentAssignment, setCurrentAssignment] = useState(member?.clergy?.currentAssignment || 'St. Paul Cathedral — Vicar');
  const [pensionSchemeId, setPensionSchemeId] = useState(member?.clergy?.pensionSchemeId || '');

  // Lay Reader Specifics
  const [readerTitle, setReaderTitle] = useState<LayReaderTitle>(member?.layReader?.readerTitle || 'Licensed Lay Reader');
  const [commissionDate, setCommissionDate] = useState(member?.layReader?.commissionDate || '');
  const [licenseNumber, setLicenseNumber] = useState(member?.layReader?.licenseNumber || 'LR-KLA-2026-001');
  const [licenseExpiryDate, setLicenseExpiryDate] = useState(member?.layReader?.licenseExpiryDate || '2027-12-31');
  const [assignedChapel, setAssignedChapel] = useState(member?.layReader?.assignedChapel || 'St. Stephen Sub-Parish Chapel');
  const [supervisingVicar, setSupervisingVicar] = useState(member?.layReader?.supervisingVicar || 'The Very Rev. Canon Dr. Emmanuel Mugisha');

  // Staff Specifics
  const [staffTitle, setStaffTitle] = useState<StaffTitle>(member?.staff?.staffTitle || 'Mr.');
  const [department, setDepartment] = useState<'Administration' | 'Accounts & Treasury' | 'Estates & Facilities' | 'Music & Choir' | 'Youth & Children' | 'Security'>(
    member?.staff?.department || 'Administration'
  );
  const [designation, setDesignation] = useState(member?.staff?.designation || 'Parish Administrator');
  const [employmentType, setEmploymentType] = useState<'Full-Time' | 'Part-Time' | 'Contract' | 'Volunteer'>(member?.staff?.employmentType || 'Full-Time');
  const [appointmentDate, setAppointmentDate] = useState(member?.staff?.appointmentDate || '2022-01-01');
  const [socialSecurityNo, setSocialSecurityNo] = useState(member?.staff?.socialSecurityNo || '');
  const [reportingSupervisor, setReportingSupervisor] = useState(member?.staff?.reportingSupervisor || 'Diocesan Secretary');

  // Retired Specifics
  const [retiredDate, setRetiredDate] = useState(member?.retired?.retiredDate || '2020-01-01');
  const [totalYearsOfService, setTotalYearsOfService] = useState(member?.retired?.totalYearsOfService || 30);
  const [emeritusTitle, setEmeritusTitle] = useState(member?.retired?.emeritusTitle || 'Canon Emeritus');
  const [gratuityStatus, setGratuityStatus] = useState<'PROCESSED' | 'PENDING' | 'DISBURSED'>(member?.retired?.gratuityStatus || 'DISBURSED');
  const [monthlyStipendEligible, setMonthlyStipendEligible] = useState(member?.retired?.monthlyStipendEligible ?? true);
  const [pensionBeneficiaryName, setPensionBeneficiaryName] = useState(member?.retired?.pensionBeneficiaryName || '');
  const [pensionBeneficiaryContact, setPensionBeneficiaryContact] = useState(member?.retired?.pensionBeneficiaryContact || '');

  // Form Validation
  const [formError, setFormError] = useState('');

  // Handle Photo File Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      setPhotoError('Image file size must be less than 3MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoUrl(reader.result as string);
      setPhotoError('');
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!firstName.trim() || !lastName.trim()) {
      setFormError('First Name and Last Name are strictly required.');
      setActiveTab('BIO');
      return;
    }
    if (!phone.trim()) {
      setFormError('Primary Contact Phone is required.');
      setActiveTab('CONTACT');
      return;
    }

    const memberPayload = {
      classification,
      title,
      firstName: firstName.trim(),
      middleName: middleName.trim(),
      lastName: lastName.trim(),
      gender,
      dateOfBirth,
      ninOrNationalId: ninOrNationalId.trim() || `NIN-${Math.floor(100000000 + Math.random() * 900000000)}`,
      passportNumber: passportNumber.trim(),
      maritalStatus,
      numberOfDependents,
      phone: phone.trim(),
      secondaryPhone: secondaryPhone.trim(),
      email: email.trim(),
      physicalAddress: physicalAddress.trim() || 'Parish Vicinity',
      villageOrCell: villageOrCell.trim() || 'Central Cell',
      subCountyOrZone: subCountyOrZone.trim(),
      parishOfResidence: parishOfResidence.trim(),
      archdeaconry: archdeaconry.trim(),
      diocese: diocese.trim(),
      nationality: nationality.trim(),
      photoUrl: photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
      sacraments: {
        baptized,
        baptismDate: baptized ? (baptismDate || '1990-01-01') : undefined,
        baptismParish: baptized ? (baptismParish || parishOfResidence) : undefined,
        baptismMinister: baptized ? baptismMinister : undefined,
        baptismCertificateNo: baptized ? (baptismCertificateNo || `BAP-${Math.floor(1000 + Math.random() * 9000)}`) : undefined,
        godparents,
        confirmed,
        confirmationDate: confirmed ? (confirmationDate || '2005-01-01') : undefined,
        confirmationDiocese: confirmed ? (confirmationDiocese || diocese) : undefined,
        confirmationBishop: confirmed ? confirmationBishop : undefined,
        confirmationCertificateNo: confirmed ? (confirmationCertificateNo || `CONF-${Math.floor(1000 + Math.random() * 9000)}`) : undefined,
        married,
        marriageDate: married ? marriageDate : undefined,
        marriageChurch: married ? marriageChurch : undefined,
        marriageOfficiatingMinister: married ? marriageOfficiatingMinister : undefined,
        marriageCertificateNo: married ? marriageCertificateNo : undefined,
        spouseName: married ? spouseName : undefined,
        communicant,
        communicantCardNo: communicant ? (communicantCardNo || `COM-${Math.floor(1000 + Math.random() * 9000)}`) : undefined
      },
      status: (classification === 'RETIRED_CLERGY' || classification === 'RETIRED_STAFF' ? 'RETIRED' : 'ACTIVE') as any,
      enrollmentDate: member?.enrollmentDate || new Date().toISOString().split('T')[0],
      clergy: classification === 'CLERGY' ? {
        clergyTitle,
        diaconateDate,
        priesthoodDate,
        ordainingBishop,
        licensingStatus: 'CURRENT_VALID' as const,
        currentAssignment,
        pensionSchemeId: pensionSchemeId || `PEN-${Math.floor(10000 + Math.random() * 90000)}`
      } : undefined,
      layReader: classification === 'LAY_READER' ? {
        readerTitle,
        commissionDate,
        licensingDiocese: diocese,
        licenseNumber,
        licenseExpiryDate,
        assignedChapel,
        supervisingVicar
      } : undefined,
      staff: classification === 'STAFF' ? {
        staffTitle,
        department,
        designation,
        employmentType,
        appointmentDate,
        socialSecurityNo,
        reportingSupervisor
      } : undefined,
      retired: (classification === 'RETIRED_CLERGY' || classification === 'RETIRED_STAFF') ? {
        retiredDate,
        totalYearsOfService: Number(totalYearsOfService),
        emeritusTitle,
        gratuityStatus,
        monthlyStipendEligible,
        pensionBeneficiaryName,
        pensionBeneficiaryContact
      } : undefined
    };

    let result: ChurchMemberRecord;
    if (member?.id) {
      result = service.updateMember(member.id, memberPayload)!;
    } else {
      result = service.addMember(memberPayload);
    }

    onSaved(result);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300">
              <Church className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">
                {member ? `Edit Ecclesiastical Bio-Data: ${member.id}` : 'Ecclesiastical Bio-Data & Personnel Registration'}
              </h2>
              <p className="text-xs text-slate-400">
                Authoritative parish register & sovereign biometric profile management
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

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-2 gap-2 text-xs font-semibold shrink-0">
          <button
            onClick={() => setActiveTab('BIO')}
            className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition ${
              activeTab === 'BIO' 
                ? 'border-purple-600 text-purple-700 bg-white rounded-t-lg' 
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4" /> 1. Personal & Passport Photo
          </button>
          <button
            onClick={() => setActiveTab('CONTACT')}
            className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition ${
              activeTab === 'CONTACT' 
                ? 'border-purple-600 text-purple-700 bg-white rounded-t-lg' 
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <MapPin className="w-4 h-4" /> 2. Residence & Parish
          </button>
          <button
            onClick={() => setActiveTab('SACRAMENTS')}
            className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition ${
              activeTab === 'SACRAMENTS' 
                ? 'border-purple-600 text-purple-700 bg-white rounded-t-lg' 
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Heart className="w-4 h-4" /> 3. Sacramental Register
          </button>
          <button
            onClick={() => setActiveTab('ROLE_SPECIFIC')}
            className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition ${
              activeTab === 'ROLE_SPECIFIC' 
                ? 'border-purple-600 text-purple-700 bg-white rounded-t-lg' 
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Shield className="w-4 h-4" /> 4. Ecclesiastical Role & Status
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {formError && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* TAB 1: PERSONAL & PASSPORT PHOTO */}
          {activeTab === 'BIO' && (
            <div className="space-y-6">
              {/* Classification Selector */}
              <div className="bg-purple-50/60 border border-purple-200 p-4 rounded-xl">
                <label className="block text-xs font-bold uppercase tracking-wider text-purple-900 mb-2">
                  Ecclesiastical Category Classification *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                  {[
                    { id: 'MEMBER', label: 'Parishioner' },
                    { id: 'CLERGY', label: 'Ordained Clergy' },
                    { id: 'LAY_READER', label: 'Lay Reader' },
                    { id: 'STAFF', label: 'Parish Staff' },
                    { id: 'RETIRED_CLERGY', label: 'Retired Clergy' },
                    { id: 'RETIRED_STAFF', label: 'Retired Staff' }
                  ].map(cat => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setClassification(cat.id as any)}
                      className={`p-2.5 rounded-lg text-xs font-bold transition text-center ${
                        classification === cat.id
                          ? 'bg-purple-600 text-white shadow-sm'
                          : 'bg-white text-slate-700 border border-purple-200 hover:bg-purple-100/50'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Passport Photo Upload & Live Preview */}
              <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="relative group shrink-0">
                  <div className="w-28 h-32 rounded-xl bg-slate-200 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center overflow-hidden shadow-inner relative">
                    {photoUrl ? (
                      <img src={photoUrl} alt="Passport Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-2 text-slate-400">
                        <Camera className="w-8 h-8 mx-auto mb-1 opacity-50" />
                        <span className="text-[10px] uppercase font-bold">No Photo</span>
                      </div>
                    )}
                  </div>
                  {photoUrl && (
                    <button
                      type="button"
                      onClick={() => setPhotoUrl('')}
                      className="absolute -top-2 -right-2 bg-rose-600 text-white rounded-full p-1 shadow-md hover:bg-rose-700"
                      title="Remove Photo"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center justify-center sm:justify-start gap-2">
                    <Upload className="w-4 h-4 text-purple-600" /> Passport Size Photograph
                  </h4>
                  <p className="text-xs text-slate-500">
                    Upload official color passport photograph (Max 3MB). Used for Diocesan ID Card and official church registers.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <label className="cursor-pointer px-4 py-2 bg-purple-600 text-white rounded-lg text-xs font-semibold hover:bg-purple-700 shadow-sm transition inline-flex items-center gap-2">
                      <Camera className="w-3.5 h-3.5" /> Select Image File
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handlePhotoUpload} 
                        className="hidden" 
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => setPhotoUrl('https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256')}
                      className="px-3 py-2 bg-slate-200 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-300 transition"
                    >
                      Use Sample Avatar
                    </button>
                  </div>
                  {photoError && <p className="text-xs text-rose-600 font-medium">{photoError}</p>}
                </div>
              </div>

              {/* Bio Fields Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Ecclesiastical Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Rev. Canon, Mr., Mrs."
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Middle Name</label>
                  <input
                    type="text"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                    placeholder="Middle Name"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Last / Surname *</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">National ID / NIN</label>
                  <input
                    type="text"
                    value={ninOrNationalId}
                    onChange={(e) => setNinOrNationalId(e.target.value)}
                    placeholder="e.g. CM88090510112A"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Passport Number (Optional)</label>
                  <input
                    type="text"
                    value={passportNumber}
                    onChange={(e) => setPassportNumber(e.target.value)}
                    placeholder="e.g. A08912301"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Marital Status</label>
                  <select
                    value={maritalStatus}
                    onChange={(e) => setMaritalStatus(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  >
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Widowed">Widowed</option>
                    <option value="Divorced">Divorced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Number of Dependents</label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={numberOfDependents}
                    onChange={(e) => setNumberOfDependents(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Nationality</label>
                  <input
                    type="text"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CONTACT & RESIDENCE */}
          {activeTab === 'CONTACT' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Phone Number *</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+256 770 000 000"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Secondary / WhatsApp Phone</label>
                  <input
                    type="text"
                    value={secondaryPhone}
                    onChange={(e) => setSecondaryPhone(e.target.value)}
                    placeholder="+256 700 000 000"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="personnel@church.org"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-600" /> Physical Residence & Ecclesiastical Jurisdiction
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Physical Residential Address</label>
                    <input
                      type="text"
                      value={physicalAddress}
                      onChange={(e) => setPhysicalAddress(e.target.value)}
                      placeholder="Plot No, Street / Estate Name"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Village / Cell / LC1</label>
                    <input
                      type="text"
                      value={villageOrCell}
                      onChange={(e) => setVillageOrCell(e.target.value)}
                      placeholder="e.g. Namirembe Cell 3"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Sub-County / Municipality</label>
                    <input
                      type="text"
                      value={subCountyOrZone}
                      onChange={(e) => setSubCountyOrZone(e.target.value)}
                      placeholder="e.g. Central Division"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Parish of Residence / Congregation</label>
                    <input
                      type="text"
                      value={parishOfResidence}
                      onChange={(e) => setParishOfResidence(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Archdeaconry</label>
                    <input
                      type="text"
                      value={archdeaconry}
                      onChange={(e) => setArchdeaconry(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Diocese</label>
                    <input
                      type="text"
                      value={diocese}
                      onChange={(e) => setDiocese(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SACRAMENTS */}
          {activeTab === 'SACRAMENTS' && (
            <div className="space-y-6">
              {/* Holy Baptism */}
              <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center text-xs font-bold">1</div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-950">Holy Baptism</h4>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={baptized} 
                      onChange={(e) => setBaptized(e.target.checked)} 
                      className="rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-xs font-semibold text-blue-900">Baptized</span>
                  </label>
                </div>
                {baptized && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Baptism Date</label>
                      <input 
                        type="date" 
                        value={baptismDate} 
                        onChange={(e) => setBaptismDate(e.target.value)} 
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Baptism Parish</label>
                      <input 
                        type="text" 
                        value={baptismParish} 
                        onChange={(e) => setBaptismParish(e.target.value)} 
                        placeholder="Parish Church"
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Officiating Minister</label>
                      <input 
                        type="text" 
                        value={baptismMinister} 
                        onChange={(e) => setBaptismMinister(e.target.value)} 
                        placeholder="Rev. Priest"
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Certificate Number</label>
                      <input 
                        type="text" 
                        value={baptismCertificateNo} 
                        onChange={(e) => setBaptismCertificateNo(e.target.value)} 
                        placeholder="BAP-2026-XXXX"
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Godparents / Sponsors</label>
                      <input 
                        type="text" 
                        value={godparents} 
                        onChange={(e) => setGodparents(e.target.value)} 
                        placeholder="Names of Godparents"
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Holy Confirmation */}
              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">2</div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-950">Holy Confirmation</h4>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={confirmed} 
                      onChange={(e) => setConfirmed(e.target.checked)} 
                      className="rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-xs font-semibold text-emerald-900">Confirmed</span>
                  </label>
                </div>
                {confirmed && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Confirmation Date</label>
                      <input 
                        type="date" 
                        value={confirmationDate} 
                        onChange={(e) => setConfirmationDate(e.target.value)} 
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Confirming Bishop</label>
                      <input 
                        type="text" 
                        value={confirmationBishop} 
                        onChange={(e) => setConfirmationBishop(e.target.value)} 
                        placeholder="Rt. Rev. Bishop"
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Certificate Number</label>
                      <input 
                        type="text" 
                        value={confirmationCertificateNo} 
                        onChange={(e) => setConfirmationCertificateNo(e.target.value)} 
                        placeholder="CONF-2026-XXXX"
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Holy Matrimony */}
              <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-purple-600 text-white flex items-center justify-center text-xs font-bold">3</div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-950">Holy Matrimony</h4>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={married} 
                      onChange={(e) => setMarried(e.target.checked)} 
                      className="rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-xs font-semibold text-purple-900">Married in Church</span>
                  </label>
                </div>
                {married && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Marriage Date</label>
                      <input 
                        type="date" 
                        value={marriageDate} 
                        onChange={(e) => setMarriageDate(e.target.value)} 
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Spouse Full Name</label>
                      <input 
                        type="text" 
                        value={spouseName} 
                        onChange={(e) => setSpouseName(e.target.value)} 
                        placeholder="Spouse Name"
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Marriage Certificate No.</label>
                      <input 
                        type="text" 
                        value={marriageCertificateNo} 
                        onChange={(e) => setMarriageCertificateNo(e.target.value)} 
                        placeholder="MAT-2026-XXXX"
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Communicant Status */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Holy Communicant & Card ID</h4>
                  <p className="text-[11px] text-slate-500">Communicant in good standing permitted for the Lord's Table.</p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={communicantCardNo}
                    onChange={(e) => setCommunicantCardNo(e.target.value)}
                    placeholder="Card No (e.g. COM-001)"
                    className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none"
                  />
                  <input
                    type="checkbox"
                    checked={communicant}
                    onChange={(e) => setCommunicant(e.target.checked)}
                    className="rounded text-purple-600 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ROLE SPECIFIC DETAILS */}
          {activeTab === 'ROLE_SPECIFIC' && (
            <div className="space-y-4">
              {/* CLERGY DETAILS */}
              {classification === 'CLERGY' && (
                <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-950 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-indigo-700" /> Ordained Clergy Details & Holy Orders
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Clergy Order Title</label>
                      <select
                        value={clergyTitle}
                        onChange={(e) => setClergyTitle(e.target.value as any)}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none"
                      >
                        <option value="Rev.">The Rev.</option>
                        <option value="Canon">The Rev. Canon</option>
                        <option value="Ven. Archdeacon">The Venerable Archdeacon</option>
                        <option value="Rev. Dr.">The Rev. Dr.</option>
                        <option value="Bishop">The Rt. Rev. Bishop</option>
                        <option value="Deacon">Deacon</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Diaconate Ordination Date</label>
                      <input 
                        type="date" 
                        value={diaconateDate} 
                        onChange={(e) => setDiaconateDate(e.target.value)} 
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Priesthood Ordination Date</label>
                      <input 
                        type="date" 
                        value={priesthoodDate} 
                        onChange={(e) => setPriesthoodDate(e.target.value)} 
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Current Pastoral Assignment & Station</label>
                      <input 
                        type="text" 
                        value={currentAssignment} 
                        onChange={(e) => setCurrentAssignment(e.target.value)} 
                        placeholder="e.g. St. Paul Cathedral — Vicar & Provost"
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Clergy Pension Scheme ID</label>
                      <input 
                        type="text" 
                        value={pensionSchemeId} 
                        onChange={(e) => setPensionSchemeId(e.target.value)} 
                        placeholder="PEN-CLG-UG-XXXX"
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* LAY READER DETAILS */}
              {classification === 'LAY_READER' && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-950 flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-700" /> Commissioned Lay Reader & Catechist Details
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Lay Ministry Title</label>
                      <select
                        value={readerTitle}
                        onChange={(e) => setReaderTitle(e.target.value as any)}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none"
                      >
                        <option value="Licensed Lay Reader">Licensed Lay Reader</option>
                        <option value="Senior Lay Reader">Senior Lay Reader</option>
                        <option value="Commissioned Catechist">Commissioned Catechist</option>
                        <option value="Lay Evangelist">Lay Evangelist</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Commissioning Date</label>
                      <input 
                        type="date" 
                        value={commissionDate} 
                        onChange={(e) => setCommissionDate(e.target.value)} 
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Diocesan License No.</label>
                      <input 
                        type="text" 
                        value={licenseNumber} 
                        onChange={(e) => setLicenseNumber(e.target.value)} 
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">License Expiry Date</label>
                      <input 
                        type="date" 
                        value={licenseExpiryDate} 
                        onChange={(e) => setLicenseExpiryDate(e.target.value)} 
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Assigned Chapel / Sub-Parish</label>
                      <input 
                        type="text" 
                        value={assignedChapel} 
                        onChange={(e) => setAssignedChapel(e.target.value)} 
                        placeholder="e.g. St. Stephen Sub-Parish Chapel, Kasubi"
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STAFF DETAILS */}
              {classification === 'STAFF' && (
                <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-teal-950 flex items-center gap-2">
                    <User className="w-4 h-4 text-teal-700" /> Parish & Diocesan Staff Employment
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Department</label>
                      <select
                        value={department}
                        onChange={(e) => setDepartment(e.target.value as any)}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none"
                      >
                        <option value="Administration">Administration</option>
                        <option value="Accounts & Treasury">Accounts & Treasury</option>
                        <option value="Estates & Facilities">Estates & Facilities</option>
                        <option value="Music & Choir">Music & Choir</option>
                        <option value="Youth & Children">Youth & Children</option>
                        <option value="Security">Security</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Job Designation</label>
                      <input 
                        type="text" 
                        value={designation} 
                        onChange={(e) => setDesignation(e.target.value)} 
                        placeholder="e.g. Parish Secretary"
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Employment Terms</label>
                      <select
                        value={employmentType}
                        onChange={(e) => setEmploymentType(e.target.value as any)}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none"
                      >
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Volunteer">Volunteer</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Appointment Date</label>
                      <input 
                        type="date" 
                        value={appointmentDate} 
                        onChange={(e) => setAppointmentDate(e.target.value)} 
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Social Security / NSSF No.</label>
                      <input 
                        type="text" 
                        value={socialSecurityNo} 
                        onChange={(e) => setSocialSecurityNo(e.target.value)} 
                        placeholder="NSSF-UG-XXXX"
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Reporting Supervisor</label>
                      <input 
                        type="text" 
                        value={reportingSupervisor} 
                        onChange={(e) => setReportingSupervisor(e.target.value)} 
                        placeholder="e.g. Parish Vicar"
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* RETIRED CLERGY & STAFF DETAILS */}
              {(classification === 'RETIRED_CLERGY' || classification === 'RETIRED_STAFF') && (
                <div className="p-4 rounded-xl bg-orange-50 border border-orange-200 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-orange-950 flex items-center gap-2">
                    <Award className="w-4 h-4 text-orange-700" /> Emeritus & Pension Gratuity Administration
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Retirement Date</label>
                      <input 
                        type="date" 
                        value={retiredDate} 
                        onChange={(e) => setRetiredDate(e.target.value)} 
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Total Years of Service</label>
                      <input 
                        type="number" 
                        min="1" 
                        max="65"
                        value={totalYearsOfService} 
                        onChange={(e) => setTotalYearsOfService(parseInt(e.target.value) || 0)} 
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Emeritus Honorific Title</label>
                      <input 
                        type="text" 
                        value={emeritusTitle} 
                        onChange={(e) => setEmeritusTitle(e.target.value)} 
                        placeholder="e.g. Bishop Emeritus"
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Gratuity Disbursement Status</label>
                      <select
                        value={gratuityStatus}
                        onChange={(e) => setGratuityStatus(e.target.value as any)}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none"
                      >
                        <option value="DISBURSED">DISBURSED</option>
                        <option value="PROCESSED">PROCESSED (Awaiting Release)</option>
                        <option value="PENDING">PENDING AUDIT</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Next of Kin / Beneficiary Name</label>
                      <input 
                        type="text" 
                        value={pensionBeneficiaryName} 
                        onChange={(e) => setPensionBeneficiaryName(e.target.value)} 
                        placeholder="Beneficiary Full Name"
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Beneficiary Phone</label>
                      <input 
                        type="text" 
                        value={pensionBeneficiaryContact} 
                        onChange={(e) => setPensionBeneficiaryContact(e.target.value)} 
                        placeholder="+256 700 000 000"
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* GENERAL PARISHIONER INFO */}
              {classification === 'MEMBER' && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                  <p className="font-semibold text-slate-900 mb-1">Parishioner Census Record</p>
                  <p>Standard church members are automatically linked with their sacramental milestones, weekly tithes, cell group fellowship, and parish electoral roll.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-slate-200 px-6 py-4 bg-slate-50 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition"
          >
            Cancel
          </button>
          <div className="flex items-center gap-3">
            {activeTab !== 'ROLE_SPECIFIC' ? (
              <button
                type="button"
                onClick={() => {
                  if (activeTab === 'BIO') setActiveTab('CONTACT');
                  else if (activeTab === 'CONTACT') setActiveTab('SACRAMENTS');
                  else if (activeTab === 'SACRAMENTS') setActiveTab('ROLE_SPECIFIC');
                }}
                className="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs font-semibold hover:bg-slate-900 transition shadow-sm"
              >
                Next Step →
              </button>
            ) : null}
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg text-xs font-bold hover:bg-purple-700 transition shadow-md flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" /> Save Bio-Data & Register
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
