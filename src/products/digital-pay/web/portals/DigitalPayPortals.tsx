import React, { useState } from 'react';
import { 
  Wallet as WalletIcon, QrCode, ArrowRightLeft, ShieldCheck, 
  TrendingUp, Landmark, Plus, Search, Filter, 
  Download, DollarSign, X, CheckCircle2,
  UserCheck, Building2, CreditCard
} from 'lucide-react';
import { PortalAuthenticationGate } from '../../../PortalAuthenticationGate';
import { DigitalPayService, Wallet as IWallet, PaymentTransaction, MerchantOnboarding } from '../../domain/DigitalPayService';
import { JumoDataTable } from '../../../../core/enterprise/components/JumoDataTable';
import { JumoForm } from '../../../../core/enterprise/components/JumoForm';
import { JumoWorkflowStatus } from '../../../../core/enterprise/components/JumoWorkflowStatus';

export const DigitalPayWalletPortal: React.FC = () => {
  const service = DigitalPayService.getInstance();
  const [wallets, setWallets] = useState<IWallet[]>(service.getWallets());
  const [transactions, setTransactions] = useState<PaymentTransaction[]>(service.getTransactions());
  const [activeTab, setActiveTab] = useState<'WALLETS' | 'TRANSACTIONS'>('WALLETS');
  const [showPayForm, setShowPayForm] = useState(false);
  const [showKycForm, setShowKycForm] = useState(false);

  const handlePay = (data: any) => {
    try {
      service.processPayment(data.fromId, data.toId, Number(data.amount));
      setTransactions([...service.getTransactions()]);
      setWallets([...service.getWallets()]);
      setShowPayForm(false);
    } catch (e: any) {
      alert(e.message);
    }
  };

  const handleKyc = (data: any) => {
    service.registerWallet(data.ownerName, data.type);
    setWallets([...service.getWallets()]);
    setShowKycForm(false);
  };

  const handleApproveKyc = (id: string) => {
    service.approveKYC(id);
    setWallets([...service.getWallets()]);
  };

  const handleClear = (id: string) => {
    service.clearSettlement(id);
    setTransactions([...service.getTransactions()]);
    setWallets([...service.getWallets()]);
  };

  return (
    <PortalAuthenticationGate
      portalId="digital-pay-wallet"
      portalName="Digital Pay Wallet & Settlement Console"
      domainContext="JUMO-FINTECH"
      requiredRoles={['ROLE_FINTECH_USER', 'ROLE_FINTECH_ADMIN']}
      onAuthenticated={() => {}}
    >
      <div className="space-y-6 animate-in fade-in duration-300 pb-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">Digital Pay Console</h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">
              Virtual Wallets • RTGS Settlement • KYC Compliance
            </p>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => setActiveTab('WALLETS')}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'WALLETS' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Wallets
            </button>
            <button 
              onClick={() => setActiveTab('TRANSACTIONS')}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'TRANSACTIONS' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Transactions
            </button>
          </div>
        </div>

        {activeTab === 'WALLETS' ? (
          <>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowKycForm(true)}
                className="flex items-center gap-2 px-6 py-2.5 bg-slate-100 text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition"
              >
                <Plus className="w-3.5 h-3.5" /> Open Wallet
              </button>
              <button 
                onClick={() => setShowPayForm(true)}
                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition shadow-sm"
              >
                <QrCode className="w-3.5 h-3.5" /> Transfer Funds
              </button>
            </div>
            <JumoDataTable
              data={wallets}
              title="Virtual Wallet Registry"
              columns={[
                { header: 'Wallet ID', accessor: 'id', className: 'font-mono text-xs font-bold text-slate-400' },
                { header: 'Owner', accessor: 'ownerName', className: 'font-bold' },
                { header: 'Type', accessor: (w) => (
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${w.type === 'MERCHANT' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}>
                    {w.type}
                  </span>
                )},
                { header: 'Balance', accessor: (w) => (
                  <span className="font-mono font-bold text-slate-900">{w.balance.toLocaleString()} UGX</span>
                ), className: 'text-right' },
                { header: 'KYC', accessor: (w) => <JumoWorkflowStatus status={w.kycStatus} /> }
              ]}
              actions={(w) => (
                w.kycStatus === 'PENDING' && (
                  <button 
                    onClick={() => handleApproveKyc(w.id)}
                    className="text-[10px] font-black text-indigo-600 uppercase tracking-widest"
                  >
                    Verify KYC
                  </button>
                )
              )}
            />
          </>
        ) : (
          <JumoDataTable
            data={transactions}
            title="Real-Time Payment Ledger"
            columns={[
              { header: 'TX ID', accessor: 'id', className: 'font-mono text-xs font-bold text-slate-400' },
              { header: 'From', accessor: 'fromWalletId', className: 'font-mono text-xs' },
              { header: 'To', accessor: 'toWalletId', className: 'font-mono text-xs' },
              { header: 'Net Settlement', accessor: (t) => (
                <span className="font-mono font-bold text-emerald-600">{t.netAmount.toLocaleString()} UGX</span>
              ), className: 'text-right' },
              { header: 'JUMO Fee', accessor: (t) => (
                <span className="font-mono text-xs text-rose-600">-{t.feeAmount.toLocaleString()}</span>
              ), className: 'text-right' },
              { header: 'Clearing', accessor: (t) => <JumoWorkflowStatus status={t.clearingStatus} /> }
            ]}
            actions={(t) => (
              t.clearingStatus === 'PENDING' && (
                <button 
                  onClick={() => handleClear(t.id)}
                  className="text-[10px] font-black text-emerald-600 uppercase tracking-widest"
                >
                  Clear Settlement
                </button>
              )
            )}
          />
        )}

        {showPayForm && (
          <JumoForm
            title="Transfer Funds (P2P / P2B)"
            fields={[
              { id: 'fromId', label: 'Source Wallet ID', type: 'select', required: true, options: wallets.filter(w => w.kycStatus === 'APPROVED').map(w => ({ value: w.id, label: `${w.ownerName} (${w.id})` })) },
              { id: 'toId', label: 'Destination Wallet ID', type: 'select', required: true, options: wallets.map(w => ({ value: w.id, label: `${w.ownerName} (${w.id})` })) },
              { id: 'amount', label: 'Transfer Amount (UGX)', type: 'number', required: true }
            ]}
            onSubmit={handlePay}
            onCancel={() => setShowPayForm(false)}
          />
        )}

        {showKycForm && (
          <JumoForm
            title="Open Virtual Wallet"
            fields={[
              { id: 'ownerName', label: 'Owner Full Name / Business', type: 'text', required: true },
              { id: 'type', label: 'Wallet Type', type: 'select', required: true, options: [
                { value: 'CONSUMER', label: 'Consumer' },
                { value: 'MERCHANT', label: 'Merchant' }
              ]}
            ]}
            onSubmit={handleKyc}
            onCancel={() => setShowKycForm(false)}
          />
        )}
      </div>
    </PortalAuthenticationGate>
  );
};
