import React, { useState } from 'react';
import { DollarSign, Plus, FileText } from 'lucide-react';
import { JumoDataTable } from '../../../../../core/enterprise/components/JumoDataTable';
import { JumoForm } from '../../../../../core/enterprise/components/JumoForm';
import { AlumniService } from '../../../domain/AlumniService';
import { DocumentGenerator, DocumentData } from '../../../../../components/common/documents/DocumentGenerator';

export const AlumniDonationPortal: React.FC = () => {
  const alumniService = AlumniService.getInstance();
  const [donations, setDonations] = useState(alumniService.getDonations());
  const [showForm, setShowForm] = useState(false);
  const [activeDoc, setActiveDoc] = useState<DocumentData | null>(null);

  const handleRecordDonation = (data: any) => {
    alumniService.recordEndowmentDonation(
      data.donorName,
      data.fund,
      Number(data.amount),
      data.paymentMethod || 'BANK_TRANSFER'
    );
    setDonations([...alumniService.getDonations()]);
    setShowForm(false);
  };

  const handleGenerateDonorReceipt = (d: any) => {
    setActiveDoc({
      documentType: 'ALUMNI_DONOR_RECEIPT',
      referenceNumber: `RCPT-${d.receiptNumber}`,
      issueDate: d.date,
      issuerName: 'Alumni Advancement & Financial Directorate',
      issuerTitle: 'Chief Development Officer & FAAP Treasury Auditor',
      recipientName: d.donorName,
      institutionName: 'Institutional Alumni & Endowment Trust',
      title: 'Official Philanthropic Contribution & Donor Receipt',
      summary: `Certified financial contribution to the ${d.fundCategory}. Fully audited and posted to the FAAP general ledger.`,
      details: {
        'Receipt Number': d.receiptNumber,
        'Donor Name / Cohort': d.donorName,
        'Designated Fund': d.fundCategory,
        'Contribution Amount': `UGX ${d.amountUGX.toLocaleString()}`,
        'Payment Method': d.paymentMethod,
        'Tax Exemption Status': '100% Tax Deductible Institutional Donation',
        'FAAP Ledger Ref': `FAAP-LEDGER-${d.receiptNumber}`
      }
    });
  };

  const totalCleared = donations.reduce((acc, d) => acc + d.amountUGX, 0);

  return (
    <div className="h-full flex flex-col bg-slate-50 font-sans pb-12">
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Endowment & Annual Giving Directorate</h2>
            <p className="text-xs text-slate-500">Fundraising, Donor Receipts & FAAP Ledger Synchronization</p>
          </div>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition shadow-sm"
        >
          <Plus className="w-4 h-4" /> Record Pledge / Donation
        </button>
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-sm font-medium text-slate-500 mb-1">Total Endowment Value</p>
            <p className="text-2xl font-bold text-slate-900">UGX 5.4B</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-emerald-200 shadow-sm">
            <p className="text-sm font-medium text-emerald-700 mb-1">Annual Giving (YTD Cleared)</p>
            <p className="text-2xl font-bold text-emerald-900">UGX {totalCleared.toLocaleString()}</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-indigo-200 shadow-sm">
            <p className="text-sm font-medium text-indigo-700 mb-1">Total Contributions Count</p>
            <p className="text-2xl font-bold text-indigo-900">{donations.length} Contributions</p>
          </div>
        </div>

        <JumoDataTable<any>
          data={donations}
          title="Recent Philanthropic Contributions Ledger"
          columns={[
            { header: 'Receipt No.', accessor: 'receiptNumber', className: 'font-mono text-xs font-bold text-slate-500' },
            { header: 'Donor (Alumnus)', accessor: 'donorName', className: 'font-medium' },
            { header: 'Fund Category', accessor: 'fundCategory' },
            { header: 'Amount (UGX)', accessor: (d) => <span className="font-mono font-bold text-emerald-600">UGX {d.amountUGX.toLocaleString()}</span> },
            { header: 'Payment Method', accessor: 'paymentMethod', className: 'text-xs text-slate-500' },
            { header: 'Date', accessor: 'date' },
            { header: 'Actions', accessor: (d) => (
              <button 
                onClick={() => handleGenerateDonorReceipt(d)}
                className="flex items-center gap-1 px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg text-[10px] font-bold hover:bg-emerald-100"
              >
                <FileText className="w-3 h-3" /> Official Donor Receipt
              </button>
            )}
          ]}
        />

        {showForm && (
          <JumoForm
            title="Record New Pledge or Donation"
            fields={[
              { id: 'donorName', label: 'Donor Name / Class Cohort', type: 'text', required: true },
              { id: 'fund', label: 'Designated Fund Category', type: 'select', required: true, options: [
                { value: 'Library Infrastructure Fund', label: 'Library Infrastructure Fund' },
                { value: 'Need-Based Student Scholarship Bursary', label: 'Need-Based Student Scholarship Bursary' },
                { value: 'General Institutional Endowment', label: 'General Institutional Endowment' },
                { value: 'Sports Complex & Pavilion Fund', label: 'Sports Complex & Pavilion Fund' }
              ] },
              { id: 'amount', label: 'Amount (UGX)', type: 'number', required: true },
              { id: 'paymentMethod', label: 'Payment Method', type: 'select', required: true, options: [
                { value: 'BANK_TRANSFER', label: 'Bank Direct Transfer' },
                { value: 'MOBILE_MONEY', label: 'Mobile Money (M-Pesa / MTN / Airtel)' },
                { value: 'CHEQUE', label: 'Bank Certified Cheque' }
              ]}
            ]}
            onSubmit={handleRecordDonation}
            onCancel={() => setShowForm(false)}
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
