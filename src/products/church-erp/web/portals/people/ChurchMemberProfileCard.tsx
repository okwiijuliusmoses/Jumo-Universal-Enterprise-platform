import React, { useState } from 'react';
import { 
  X, Church, QrCode, Shield, Award, Heart, CheckCircle2, 
  Calendar, Phone, Mail, MapPin, DollarSign, Printer, Download,
  User, ExternalLink, Sparkles
} from 'lucide-react';
import ChurchPeopleService, { 
  ChurchMemberRecord, 
  TitheRecord, 
  ParishEventRegistration 
} from '../../../domain/ChurchPeopleService';

interface ProfileCardProps {
  member: ChurchMemberRecord;
  onClose: () => void;
  onEdit: (member: ChurchMemberRecord) => void;
  onRecordTithe: (member: ChurchMemberRecord) => void;
  onRegisterEvent: (member: ChurchMemberRecord) => void;
  onViewSacramentCertificate: (member: ChurchMemberRecord, sacrament: 'BAPTISM' | 'CONFIRMATION' | 'MATRIMONY') => void;
}

export const ChurchMemberProfileCard: React.FC<ProfileCardProps> = ({
  member,
  onClose,
  onEdit,
  onRecordTithe,
  onRegisterEvent,
  onViewSacramentCertificate
}) => {
  const service = ChurchPeopleService.getInstance();
  const tithes: TitheRecord[] = service.getTithes(member.id);
  const registrations: ParishEventRegistration[] = service.getRegistrations(undefined, member.id);
  const totalTitheGiven = tithes.reduce((acc, t) => acc + t.amount, 0);

  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'TITHES' | 'EVENTS' | 'ID_CARD'>('OVERVIEW');

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white px-6 py-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden shrink-0">
              {member.photoUrl ? (
                <img src={member.photoUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                <User className="w-6 h-6 text-purple-300" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-bold text-white tracking-wide">
                  {member.title} {member.firstName} {member.middleName ? member.middleName + ' ' : ''}{member.lastName}
                </h2>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                  member.classification === 'CLERGY' ? 'bg-indigo-500/30 text-indigo-200 border border-indigo-400/40' :
                  member.classification === 'LAY_READER' ? 'bg-amber-500/30 text-amber-200 border border-amber-400/40' :
                  member.classification === 'STAFF' ? 'bg-teal-500/30 text-teal-200 border border-teal-400/40' :
                  member.classification.startsWith('RETIRED') ? 'bg-orange-500/30 text-orange-200 border border-orange-400/40' :
                  'bg-purple-500/30 text-purple-200 border border-purple-400/40'
                }`}>
                  {member.classification.replace('_', ' ')}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 text-slate-300">
                  {member.id}
                </span>
              </div>
              <p className="text-xs text-purple-200/80 flex items-center gap-2 mt-0.5">
                <span>{member.parishOfResidence}</span> • <span>{member.diocese}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onEdit(member)}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold transition border border-white/10"
            >
              Edit Bio-Data
            </button>
            <button 
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-2 gap-2 text-xs font-semibold shrink-0">
          <button
            onClick={() => setActiveTab('OVERVIEW')}
            className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition ${
              activeTab === 'OVERVIEW' 
                ? 'border-purple-600 text-purple-700 bg-white rounded-t-lg' 
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4" /> Ecclesiastical Profile
          </button>
          <button
            onClick={() => setActiveTab('TITHES')}
            className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition ${
              activeTab === 'TITHES' 
                ? 'border-purple-600 text-purple-700 bg-white rounded-t-lg' 
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <DollarSign className="w-4 h-4" /> Tithes & Stewardship ({tithes.length})
          </button>
          <button
            onClick={() => setActiveTab('EVENTS')}
            className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition ${
              activeTab === 'EVENTS' 
                ? 'border-purple-600 text-purple-700 bg-white rounded-t-lg' 
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-4 h-4" /> Parish Events ({registrations.length})
          </button>
          <button
            onClick={() => setActiveTab('ID_CARD')}
            className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition ${
              activeTab === 'ID_CARD' 
                ? 'border-purple-600 text-purple-700 bg-white rounded-t-lg' 
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <QrCode className="w-4 h-4" /> Sovereign Ecclesiastical ID
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'OVERVIEW' && (
            <div className="space-y-6">
              
              {/* Quick Summary Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3.5 bg-purple-50/60 rounded-xl border border-purple-200">
                  <span className="text-[10px] font-bold uppercase text-purple-900">Total Tithe Giving</span>
                  <div className="text-base font-black text-purple-900 mt-1">
                    UGX {totalTitheGiven.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-purple-600 font-medium">{tithes.length} Verified FAAP Ledger Postings</span>
                </div>
                <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200">
                  <span className="text-[10px] font-bold uppercase text-emerald-900">Sacramental Standing</span>
                  <div className="text-base font-black text-emerald-900 mt-1">
                    {member.sacraments.communicant ? 'Communicant' : 'Parishioner'}
                  </div>
                  <span className="text-[10px] text-emerald-600 font-medium">Card: {member.sacraments.communicantCardNo || 'Verified'}</span>
                </div>
                <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-200">
                  <span className="text-[10px] font-bold uppercase text-blue-900">Parish Jurisdiction</span>
                  <div className="text-sm font-bold text-blue-900 mt-1 truncate">
                    {member.parishOfResidence}
                  </div>
                  <span className="text-[10px] text-blue-600 font-medium">{member.archdeaconry}</span>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold uppercase text-slate-700">Digital Registry Hash</span>
                  <div className="text-xs font-mono font-bold text-slate-800 mt-1 truncate">
                    {member.digitalCardHash}
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">Status: {member.status}</span>
                </div>
              </div>

              {/* Bio & Contact Details Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <User className="w-4 h-4 text-purple-600" /> Personal Identification
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Gender & DOB:</span>
                      <span className="font-semibold text-slate-900">{member.gender}, {member.dateOfBirth}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">National ID / NIN:</span>
                      <span className="font-mono font-semibold text-slate-900">{member.ninOrNationalId}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Marital Status:</span>
                      <span className="font-semibold text-slate-900">{member.maritalStatus} {member.sacraments.spouseName ? `(Spouse: ${member.sacraments.spouseName})` : ''}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Dependents:</span>
                      <span className="font-semibold text-slate-900">{member.numberOfDependents} registered family members</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Enrollment Date:</span>
                      <span className="font-semibold text-slate-900">{member.enrollmentDate}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-purple-600" /> Contact & Residence
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Primary Phone:</span>
                      <span className="font-semibold text-slate-900">{member.phone}</span>
                    </div>
                    {member.secondaryPhone && (
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-500">Secondary / WA:</span>
                        <span className="font-semibold text-slate-900">{member.secondaryPhone}</span>
                      </div>
                    )}
                    {member.email && (
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-500">Email:</span>
                        <span className="font-semibold text-slate-900">{member.email}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Physical Address:</span>
                      <span className="font-semibold text-slate-900">{member.physicalAddress}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Village / Cell:</span>
                      <span className="font-semibold text-slate-900">{member.villageOrCell} ({member.diocese})</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sacramental Milestones & Verified Certificates */}
              <div className="p-4 rounded-xl bg-purple-50/40 border border-purple-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-purple-950 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-purple-700" /> Canonical Sacramental Registry & Certificates
                  </h3>
                  <span className="text-[10px] text-purple-700 font-semibold bg-purple-100 px-2 py-0.5 rounded">
                    Verified Diocesan Seal
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Baptism */}
                  <div className={`p-3 rounded-lg border text-xs space-y-1.5 ${
                    member.sacraments.baptized ? 'bg-white border-blue-200' : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-blue-900 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Holy Baptism
                      </span>
                      {member.sacraments.baptized && (
                        <button
                          onClick={() => onViewSacramentCertificate(member, 'BAPTISM')}
                          className="text-[10px] font-bold text-blue-600 hover:text-blue-800 underline"
                        >
                          Certificate
                        </button>
                      )}
                    </div>
                    {member.sacraments.baptized ? (
                      <div className="text-[11px] text-slate-600 space-y-0.5">
                        <p>Date: <strong className="text-slate-900">{member.sacraments.baptismDate || 'Recorded'}</strong></p>
                        <p>Parish: {member.sacraments.baptismParish || member.parishOfResidence}</p>
                        <p>Cert: <span className="font-mono text-[10px]">{member.sacraments.baptismCertificateNo || 'BAP-CERT'}</span></p>
                      </div>
                    ) : (
                      <p className="text-[11px] text-slate-400">Not recorded</p>
                    )}
                  </div>

                  {/* Confirmation */}
                  <div className={`p-3 rounded-lg border text-xs space-y-1.5 ${
                    member.sacraments.confirmed ? 'bg-white border-emerald-200' : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Holy Confirmation
                      </span>
                      {member.sacraments.confirmed && (
                        <button
                          onClick={() => onViewSacramentCertificate(member, 'CONFIRMATION')}
                          className="text-[10px] font-bold text-emerald-600 hover:text-emerald-800 underline"
                        >
                          Certificate
                        </button>
                      )}
                    </div>
                    {member.sacraments.confirmed ? (
                      <div className="text-[11px] text-slate-600 space-y-0.5">
                        <p>Date: <strong className="text-slate-900">{member.sacraments.confirmationDate || 'Recorded'}</strong></p>
                        <p>Bishop: {member.sacraments.confirmationBishop || 'Diocesan Bishop'}</p>
                        <p>Cert: <span className="font-mono text-[10px]">{member.sacraments.confirmationCertificateNo || 'CONF-CERT'}</span></p>
                      </div>
                    ) : (
                      <p className="text-[11px] text-slate-400">Not confirmed</p>
                    )}
                  </div>

                  {/* Matrimony */}
                  <div className={`p-3 rounded-lg border text-xs space-y-1.5 ${
                    member.sacraments.married ? 'bg-white border-purple-200' : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-purple-900 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" /> Holy Matrimony
                      </span>
                      {member.sacraments.married && (
                        <button
                          onClick={() => onViewSacramentCertificate(member, 'MATRIMONY')}
                          className="text-[10px] font-bold text-purple-600 hover:text-purple-800 underline"
                        >
                          Certificate
                        </button>
                      )}
                    </div>
                    {member.sacraments.married ? (
                      <div className="text-[11px] text-slate-600 space-y-0.5">
                        <p>Date: <strong className="text-slate-900">{member.sacraments.marriageDate || 'Recorded'}</strong></p>
                        <p>Spouse: {member.sacraments.spouseName || 'Spouse'}</p>
                        <p>Cert: <span className="font-mono text-[10px]">{member.sacraments.marriageCertificateNo || 'MAT-CERT'}</span></p>
                      </div>
                    ) : (
                      <p className="text-[11px] text-slate-400">Single / Not solemnized</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Role Specific Details if Clergy / Lay Reader / Staff / Retired */}
              {member.clergy && (
                <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-200 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-950 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-indigo-700" /> Clergy Holy Orders & Postings
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-slate-500 block text-[11px]">Diaconate / Priesthood:</span>
                      <strong className="text-slate-900">{member.clergy.diaconateDate || '—'} / {member.clergy.priesthoodDate || '—'}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">Current Station:</span>
                      <strong className="text-slate-900">{member.clergy.currentAssignment}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">Pension ID:</span>
                      <span className="font-mono font-bold text-slate-900">{member.clergy.pensionSchemeId}</span>
                    </div>
                  </div>
                </div>
              )}

              {member.layReader && (
                <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-950 flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-700" /> Lay Ministry Commission & License
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-slate-500 block text-[11px]">Title & Commission:</span>
                      <strong className="text-slate-900">{member.layReader.readerTitle} ({member.layReader.commissionDate || 'Active'})</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">License No & Expiry:</span>
                      <strong className="text-slate-900">{member.layReader.licenseNumber} (Exp: {member.layReader.licenseExpiryDate})</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">Assigned Chapel:</span>
                      <strong className="text-slate-900">{member.layReader.assignedChapel}</strong>
                    </div>
                  </div>
                </div>
              )}

              {member.staff && (
                <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-200 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-teal-950 flex items-center gap-2">
                    <User className="w-4 h-4 text-teal-700" /> Parish Staff Appointment
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-slate-500 block text-[11px]">Department & Role:</span>
                      <strong className="text-slate-900">{member.staff.department} — {member.staff.designation}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">Terms & Appointed:</span>
                      <strong className="text-slate-900">{member.staff.employmentType} ({member.staff.appointmentDate})</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">Social Security (NSSF):</span>
                      <span className="font-mono font-bold text-slate-900">{member.staff.socialSecurityNo || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              )}

              {member.retired && (
                <div className="p-4 rounded-xl bg-orange-50/50 border border-orange-200 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-orange-950 flex items-center gap-2">
                    <Award className="w-4 h-4 text-orange-700" /> Emeritus & Pension Gratuity Standing
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-slate-500 block text-[11px]">Retired & Service:</span>
                      <strong className="text-slate-900">{member.retired.retiredDate} ({member.retired.totalYearsOfService} Years)</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">Honorific Title:</span>
                      <strong className="text-slate-900">{member.retired.emeritusTitle || 'Emeritus'}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">Gratuity Status:</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-100 text-emerald-800">{member.retired.gratuityStatus}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: TITHES & STEWARDSHIP */}
          {activeTab === 'TITHES' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Tithe & Stewardship Giving History
                  </h3>
                  <p className="text-xs text-slate-500">
                    Audited ledger records connected with FAAP master financial kernel
                  </p>
                </div>
                <button
                  onClick={() => onRecordTithe(member)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg text-xs font-bold hover:bg-purple-700 transition shadow-sm flex items-center gap-2"
                >
                  <DollarSign className="w-4 h-4" /> Record New Tithe / Offering
                </button>
              </div>

              {tithes.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-slate-500 text-xs">
                  No tithe or giving records found for this member yet.
                </div>
              ) : (
                <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 text-slate-700 font-bold uppercase border-b border-slate-200">
                      <tr>
                        <th className="p-3">Receipt / Date</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Amount</th>
                        <th className="p-3">Method</th>
                        <th className="p-3">FAAP Ledger Status</th>
                        <th className="p-3">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {tithes.map(t => (
                        <tr key={t.id} className="hover:bg-slate-50 transition">
                          <td className="p-3">
                            <div className="font-mono font-bold text-purple-700">{t.receiptNumber}</div>
                            <div className="text-[10px] text-slate-500">{new Date(t.date).toLocaleDateString()}</div>
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded font-bold uppercase text-[10px] bg-purple-100 text-purple-800">
                              {t.category.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="p-3 font-black text-slate-900">
                            {t.currency} {t.amount.toLocaleString()}
                          </td>
                          <td className="p-3">
                            <span className="font-medium text-slate-700">{t.paymentMethod}</span>
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
              )}
            </div>
          )}

          {/* TAB 3: PARISH EVENTS */}
          {activeTab === 'EVENTS' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Parish Events & Liturgy Registrations
                  </h3>
                  <p className="text-xs text-slate-500">
                    Synods, retreats, catechism confirmation, and conventions
                  </p>
                </div>
                <button
                  onClick={() => onRegisterEvent(member)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg text-xs font-bold hover:bg-purple-700 transition shadow-sm flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" /> Register For Parish Event
                </button>
              </div>

              {registrations.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-slate-500 text-xs">
                  No event registrations found for this parishioner.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {registrations.map(r => (
                    <div key={r.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] font-bold text-purple-700">{r.ticketRef}</span>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                          r.attendanceStatus === 'CHECKED_IN' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {r.attendanceStatus}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900">{r.eventTitle}</h4>
                      <p className="text-[11px] text-slate-500">Registered on: {r.registrationDate}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SOVEREIGN ECCLESIASTICAL ID CARD */}
          {activeTab === 'ID_CARD' && (
            <div className="flex flex-col items-center justify-center p-4 space-y-6">
              
              {/* Sovereign Ecclesiastical ID Card Visual */}
              <div className="w-full max-w-md bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-2xl border border-purple-500/30 relative overflow-hidden">
                
                {/* Watermark Logo */}
                <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
                  <Church className="w-56 h-56 text-purple-300" />
                </div>

                {/* Card Top Branding */}
                <div className="flex items-center justify-between border-b border-purple-500/30 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white">
                      <Church className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-black tracking-wider uppercase text-purple-200">
                        {member.diocese}
                      </h3>
                      <p className="text-[9px] font-mono text-purple-300/80">SOVEREIGN ECCLESIASTICAL CREDENTIAL</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-purple-500/30 text-purple-200 border border-purple-400/40">
                    {member.classification.replace('_', ' ')}
                  </span>
                </div>

                {/* Card Main Body */}
                <div className="flex items-center gap-4 py-4">
                  {/* Passport Photo */}
                  <div className="w-20 h-24 rounded-xl bg-white/10 border-2 border-purple-400/50 flex items-center justify-center overflow-hidden shrink-0 shadow-md">
                    {member.photoUrl ? (
                      <img src={member.photoUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-8 h-8 text-purple-300" />
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 space-y-1">
                    <h4 className="text-sm font-black text-white leading-tight">
                      {member.title} {member.firstName} {member.lastName}
                    </h4>
                    <p className="text-[11px] font-bold text-purple-200">{member.parishOfResidence}</p>
                    <div className="text-[10px] text-slate-300 space-y-0.5 pt-1">
                      <p>ID: <span className="font-mono font-bold text-white">{member.id}</span></p>
                      <p>NIN: <span className="font-mono">{member.ninOrNationalId}</span></p>
                      <p>Card Hash: <span className="font-mono text-[9px] text-purple-300">{member.digitalCardHash}</span></p>
                    </div>
                  </div>
                </div>

                {/* Card Footer with QR Code */}
                <div className="border-t border-purple-500/30 pt-3 flex items-center justify-between text-[9px] text-purple-300/80">
                  <div>
                    <p className="font-bold text-white">Issued: {member.enrollmentDate}</p>
                    <p>Status: VERIFIED VALID</p>
                  </div>
                  <div className="flex items-center gap-2 bg-white p-1.5 rounded-lg text-slate-900">
                    <QrCode className="w-7 h-7" />
                  </div>
                </div>

              </div>

              {/* Print Button */}
              <button
                onClick={() => window.print()}
                className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition shadow-md flex items-center gap-2"
              >
                <Printer className="w-4 h-4" /> Print Official Diocesan ID Card
              </button>

            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="border-t border-slate-200 px-6 py-3.5 bg-slate-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onRecordTithe(member)}
              className="px-3.5 py-1.5 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-lg text-xs font-bold transition border border-purple-200 flex items-center gap-1.5"
            >
              <DollarSign className="w-3.5 h-3.5" /> Log Tithe
            </button>
            <button
              onClick={() => onRegisterEvent(member)}
              className="px-3.5 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-bold transition border border-blue-200 flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" /> Event Pass
            </button>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-1.5 bg-slate-800 text-white rounded-lg text-xs font-semibold hover:bg-slate-900 transition shadow-sm"
          >
            Close Profile
          </button>
        </div>

      </div>
    </div>
  );
};
