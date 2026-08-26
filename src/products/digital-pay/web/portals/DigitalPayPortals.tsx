import React, { useState } from 'react';
import { 
  Wallet as WalletIcon, QrCode, ArrowRightLeft, ShieldCheck, 
  TrendingUp, Landmark, Plus, Search, Filter, 
  Download, DollarSign, X, CheckCircle2,
  UserCheck, Building2, CreditCard
} from 'lucide-react';
import { PortalAuthenticationGate } from '../../../PortalAuthenticationGate';
import { DigitalPayService, Wallet as IWallet, PaymentTransaction } from '../../domain/DigitalPayService';
import { DynamicWorkingTable, FieldDefinition, ColumnConfig, PermissionMetadata } from '../../../../core/enterprise/components/DynamicWorkingTable';
import { JumoForm } from '../../../../core/enterprise/components/JumoForm';

export const DigitalPayWalletPortal: React.FC = () => {
  const service = DigitalPayService.getInstance();
  const [wallets, setWallets] = useState<IWallet[]>(service.getWallets());
  const [transactions, setTransactions] = useState<PaymentTransaction[]>(service.getTransactions());
  const [activeTab, setActiveTab] = useState<'WALLETS' | 'TRANSACTIONS'>('WALLETS');
  const [showPayForm, setShowPayForm] = useState(false);

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

  const walletFields: FieldDefinition[] = [
    { key: 'id', label: 'Wallet ID', type: 'text', editable: false },
    { key: 'ownerName', label: 'Owner Name / Business', type: 'text', required: true, placeholder: 'Enter name...' },
    { 
      key: 'type', 
      label: 'Wallet Type', 
      type: 'select', 
      required: true,
      options: [
        { label: 'Consumer Wallet', value: 'CONSUMER' },
        { label: 'Merchant Wallet', value: 'MERCHANT' }
      ]
    },
    { key: 'balance', label: 'Balance', type: 'currency', editable: false, defaultValue: 0 },
    { 
      key: 'kycStatus', 
      label: 'KYC Status', 
      type: 'badge', 
      defaultValue: 'PENDING',
      options: [
        { label: 'Approved', value: 'APPROVED', colorClass: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
        { label: 'Pending Verification', value: 'PENDING', colorClass: 'bg-amber-50 text-amber-700 border-amber-100' },
        { label: 'Rejected', value: 'REJECTED', colorClass: 'bg-rose-50 text-rose-700 border-rose-100' }
      ]
    }
  ];

  const walletColumns: ColumnConfig<IWallet>[] = [
    { key: 'id', header: 'Wallet ID', sortable: true, className: 'font-mono text-xs font-bold text-slate-400' },
    { key: 'ownerName', header: 'Owner', sortable: true, className: 'font-bold text-slate-900' },
    { key: 'type', header: 'Type', sortable: true },
    { key: 'balance', header: 'Balance', sortable: true, align: 'right', className: 'font-mono font-bold text-slate-900' },
    { key: 'kycStatus', header: 'KYC Status', sortable: true }
  ];

  const walletPermissions: PermissionMetadata = {
    canCreate: true,
    canRead: true,
    canUpdate: true,
    canDelete: true,
    canExport: true,
    currentUserRole: 'FINTECH_ADMIN'
  };

  const handleCreateWallet = (values: any) => {
    service.registerWallet(values.ownerName, values.type);
    setWallets([...service.getWallets()]);
  };

  const handleUpdateWallet = (id: string | number, values: any) => {
    // Custom inline KYC status adjustment or owner renaming
    const target = wallets.find(w => w.id === id);
    if (target) {
      target.ownerName = values.ownerName;
      target.type = values.type;
      target.kycStatus = values.kycStatus;
      setWallets([...wallets]);
    }
  };

  const handleDeleteWallet = (id: string | number) => {
    const updated = wallets.filter(w => w.id !== id);
    setWallets(updated);
  };

  const handleWalletBulkAction = (ids: (string | number)[], action: string) => {
    if (action === 'VERIFY_KYC') {
      ids.forEach(id => service.approveKYC(String(id)));
      setWallets([...service.getWallets()]);
    }
  };

  const transactionFields: FieldDefinition[] = [
    { key: 'id', label: 'TX ID', type: 'text', editable: false },
    { key: 'fromWalletId', label: 'Source Wallet', type: 'text', editable: false },
    { key: 'toWalletId', label: 'Destination Wallet', type: 'text', editable: false },
    { key: 'netAmount', label: 'Net Settlement Amount', type: 'currency', editable: false },
    { key: 'feeAmount', label: 'JUMO Processing Fee', type: 'currency', editable: false },
    { 
      key: 'clearingStatus', 
      label: 'Clearing Status', 
      type: 'badge',
      options: [
        { label: 'Settled / Cleared', value: 'APPROVED', colorClass: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
        { label: 'Awaiting Settlement', value: 'PENDING', colorClass: 'bg-amber-50 text-amber-700 border-amber-100' }
      ]
    }
  ];

  const transactionColumns: ColumnConfig<PaymentTransaction>[] = [
    { key: 'id', header: 'TX ID', sortable: true, className: 'font-mono text-xs font-bold text-slate-400' },
    { key: 'fromWalletId', header: 'From Wallet', sortable: true, className: 'font-mono' },
    { key: 'toWalletId', header: 'To Wallet', sortable: true, className: 'font-mono' },
    { key: 'netAmount', header: 'Net Amount', sortable: true, align: 'right', className: 'font-mono font-bold text-emerald-600' },
    { key: 'feeAmount', header: 'JUMO Fee', sortable: true, align: 'right', className: 'font-mono text-rose-600' },
    { key: 'clearingStatus', header: 'Clearing Status', sortable: true }
  ];

  const transactionPermissions: PermissionMetadata = {
    canCreate: false,
    canRead: true,
    canUpdate: true,
    canDelete: false,
    canExport: true,
    currentUserRole: 'FINTECH_ADMIN'
  };

  const handleUpdateTransaction = (id: string | number, values: any) => {
    const tx = transactions.find(t => t.id === id);
    if (tx) {
      tx.clearingStatus = values.clearingStatus;
      setTransactions([...transactions]);
    }
  };

  const handleTxBulkAction = (ids: (string | number)[], action: string) => {
    if (action === 'CLEAR_SETTLEMENT') {
      ids.forEach(id => service.clearSettlement(String(id)));
      setTransactions([...service.getTransactions()]);
      setWallets([...service.getWallets()]);
    }
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
              className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${activeTab === 'WALLETS' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Wallets
            </button>
            <button 
              onClick={() => setActiveTab('TRANSACTIONS')}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${activeTab === 'TRANSACTIONS' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Transactions
            </button>
          </div>
        </div>

        {activeTab === 'WALLETS' ? (
          <>
            <div className="flex justify-end">
              <button 
                onClick={() => setShowPayForm(true)}
                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition shadow-sm cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5" /> Transfer Funds
              </button>
            </div>

            <DynamicWorkingTable<IWallet>
              title="Virtual Wallet Registry"
              subtitle="KYC compliance matching & virtual balance clearing matrix"
              data={wallets}
              fields={walletFields}
              columns={walletColumns}
              permissions={walletPermissions}
              onCreate={handleCreateWallet}
              onUpdate={handleUpdateWallet}
              onDelete={handleDeleteWallet}
              onBulkAction={handleWalletBulkAction}
              bulkActions={[
                { label: 'Approve Selected KYC', value: 'VERIFY_KYC', className: 'text-indigo-600 font-black' }
              ]}
              accentColor="indigo"
            />
          </>
        ) : (
          <DynamicWorkingTable<PaymentTransaction>
            title="Real-Time Payment Ledger"
            subtitle="Central bank RTGS matching & fee clearing router"
            data={transactions}
            fields={transactionFields}
            columns={transactionColumns}
            permissions={transactionPermissions}
            onUpdate={handleUpdateTransaction}
            onBulkAction={handleTxBulkAction}
            bulkActions={[
              { label: 'Clear Selected Settlements', value: 'CLEAR_SETTLEMENT', className: 'text-emerald-600 font-black' }
            ]}
            accentColor="emerald"
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
      </div>
    </PortalAuthenticationGate>
  );
};
