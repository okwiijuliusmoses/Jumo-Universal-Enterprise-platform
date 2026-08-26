import React, { useState } from 'react';
import { Building2, FileText, CheckCircle, Plus, Users, Landmark, Award } from 'lucide-react';
import { JumoDataTable } from '../../../../../core/enterprise/components/JumoDataTable';
import { JumoForm } from '../../../../../core/enterprise/components/JumoForm';
import { ChurchService } from '../../../domain/ChurchService';
import { DocumentGenerator, DocumentData } from '../../../../../components/common/documents/DocumentGenerator';

interface ParishRecord {
  id: string;
  name: string;
  archdeaconry: string;
  vicar: string;
  population: number;
  status: 'ACTIVE' | 'INACTIVE';
}

export const ChurchSecretariatPortal: React.FC = () => {
  const churchService = ChurchService.getInstance();
  const [parishes, setParishes] = useState<ParishRecord[]>([
    { id: 'PAR-01', name: 'St. Paul Cathedral', archdeaconry: 'Central', vicar: 'Rev. Canon John', population: 5400, status: 'ACTIVE' },
    { id: 'PAR-02', name: 'St. Luke Chapel', archdeaconry: 'Northern', vicar: 'Rev. David', population: 890, status: 'ACTIVE' },
    { id: 'PAR-03', name: 'Holy Trinity', archdeaconry: 'Central', vicar: 'Rev. Samuel', population: 3100, status: 'ACTIVE' }
  ]);
  const [sacraments, setSacraments] = useState(churchService.getSacramentalRecords());
  const [showForm, setShowForm] = useState(false);
  const [showSacramentForm, setShowSacramentForm] = useState(false);
  const [activeDoc, setActiveDoc] = useState<DocumentData | null>(null);

  const handleAddParish = (data: any) => {
    const newRecord: ParishRecord = {
      id: `PAR-${String(parishes.length + 1).padStart(2, '0')}`,
      name: data.name,
      archdeaconry: data.archdeaconry,
      vicar: data.vicar || 'Pending Assignment',
      population: Number(data.population) || 0,
      status: 'ACTIVE'
    };
    setParishes([...parishes, newRecord]);
    setShowForm(false);
  };

  const handleIssueSacrament = (data: any) => {
    const rec = churchService.issueSacramentalRecord(
      data.type,
      data.recipientName,
      data.officiatingClergy,
      data.parishName,
      data.godparentsOrWitnesses
    );
    setSacraments([...churchService.getSacramentalRecords()]);
    setShowSacramentForm(false);
  };

  const handleGenerateCertificate = (sac: any) => {
    setActiveDoc({
      documentType: sac.type === 'BAPTISM' ? 'BAPTISM_CERTIFICATE' : sac.type === 'CONFIRMATION' ? 'CONFIRMATION_CERTIFICATE' : 'MATRIMONY_CERTIFICATE',
      referenceNumber: sac.certificateNumber,
      issueDate: sac.dateOfSacrament,
      issuerName: sac.officiatingClergy,
      issuerTitle: 'Officiating Diocesan Clergy & Canon',
      recipientName: sac.recipientName,
      institutionName: sac.parishName,
      title: `Official Holy Sacrament Certificate of ${sac.type}`,
      summary: `Certified sacramental record entered into the official Diocesan Ecclesiastical Registry.`,
      details: {
        'Sacrament Type': sac.type,
        'Certificate Reg Number': sac.certificateNumber,
        'Recipient Name': sac.recipientName,
        'Officiating Clergy': sac.officiatingClergy,
        'Parish Location': sac.parishName,
        'Date of Sacrament': sac.dateOfSacrament,
        'Godparents / Witnesses': sac.godparentsOrWitnesses || 'Recorded in Diocesan Synod Minutes'
      }
    });
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 font-sans pb-12">
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-slate-100 text-slate-700 rounded-lg">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Diocesan Secretariat & Sacramental Registry</h2>
            <p className="text-xs text-slate-500">Parish Registry, Holy Sacraments (Baptism, Matrimony) & Synod Oversight</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowSacramentForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition shadow-sm"
          >
            <Award className="w-4 h-4" /> Issue Sacramental Record
          </button>
          <button 
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-900 transition shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add Parish
          </button>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Total Parishes</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{parishes.length + 42}</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Archdeaconries</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">7</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Active Clergy</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">84</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Holy Sacraments Issued</p>
            <p className="text-2xl font-bold text-indigo-600 mt-1">{sacraments.length}</p>
          </div>
        </div>

        <JumoDataTable<any>
          data={sacraments}
          title="Holy Sacramental Register (Baptism, Confirmation, Matrimony, Burial)"
          columns={[
            { header: 'Cert No.', accessor: 'certificateNumber', className: 'font-mono text-xs font-bold text-indigo-600' },
            { header: 'Sacrament', accessor: 'type', className: 'font-bold' },
            { header: 'Recipient / Couple', accessor: 'recipientName', className: 'font-bold' },
            { header: 'Officiating Clergy', accessor: 'officiatingClergy' },
            { header: 'Parish', accessor: 'parishName' },
            { header: 'Date', accessor: 'dateOfSacrament', className: 'text-xs text-slate-500' },
            { header: 'Actions', accessor: (sac) => (
              <button 
                onClick={() => handleGenerateCertificate(sac)}
                className="flex items-center gap-1 px-2.5 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-lg text-[10px] font-bold hover:bg-indigo-100"
              >
                <FileText className="w-3 h-3" /> Printable Certificate
              </button>
            )}
          ]}
        />

        <JumoDataTable<ParishRecord>
          data={parishes}
          title="Diocesan Parish Registry"
          columns={[
            { header: 'ID', accessor: 'id', className: 'font-mono text-xs font-bold text-slate-500' },
            { header: 'Parish Name', accessor: 'name', className: 'font-medium' },
            { header: 'Archdeaconry', accessor: 'archdeaconry' },
            { header: 'Vicar / Priest in Charge', accessor: 'vicar' },
            { header: 'Population', accessor: (p) => p.population.toLocaleString() },
            { 
              header: 'Status', 
              accessor: (p) => (
                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-wider ${p.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                  {p.status}
                </span>
              ) 
            }
          ]}
        />

        {showForm && (
          <JumoForm
            title="Register New Parish"
            fields={[
              { id: 'name', label: 'Parish Name', type: 'text', required: true },
              { id: 'archdeaconry', label: 'Archdeaconry', type: 'select', required: true, options: [
                { value: 'Central', label: 'Central Archdeaconry' },
                { value: 'Northern', label: 'Northern Archdeaconry' },
                { value: 'Eastern', label: 'Eastern Archdeaconry' },
                { value: 'Western', label: 'Western Archdeaconry' },
                { value: 'Southern', label: 'Southern Archdeaconry' }
              ] },
              { id: 'vicar', label: 'Assigned Vicar (Optional)', type: 'text' },
              { id: 'population', label: 'Initial Estimated Population', type: 'number' }
            ]}
            onSubmit={handleAddParish}
            onCancel={() => setShowForm(false)}
          />
        )}

        {showSacramentForm && (
          <JumoForm
            title="Issue Holy Sacramental Certificate"
            fields={[
              { id: 'type', label: 'Sacrament Type', type: 'select', required: true, options: [
                { value: 'BAPTISM', label: 'Holy Baptism' },
                { value: 'CONFIRMATION', label: 'Holy Confirmation' },
                { value: 'MATRIMONY', label: 'Holy Matrimony' },
                { value: 'BURIAL', label: 'Christian Burial Record' }
              ]},
              { id: 'recipientName', label: 'Recipient Full Name / Couple Names', type: 'text', required: true },
              { id: 'officiatingClergy', label: 'Officiating Clergy Full Name', type: 'text', required: true, placeholder: 'e.g. Rev. Canon Peter Opio' },
              { id: 'parishName', label: 'Parish Church Name', type: 'text', required: true, placeholder: 'e.g. St. Paul Cathedral Namirembe' },
              { id: 'godparentsOrWitnesses', label: 'Godparents / Witnesses Names', type: 'text', placeholder: 'e.g. Dr. Joseph Mukasa & Sarah Mukasa' }
            ]}
            onSubmit={handleIssueSacrament}
            onCancel={() => setShowSacramentForm(false)}
          />
        )}

        {activeDoc && (
          <DocumentGenerator
            data={activeDoc}
            onClose={() => setActiveDoc(null)}
          />
        )}
      </div>
    </div>
  );
};
