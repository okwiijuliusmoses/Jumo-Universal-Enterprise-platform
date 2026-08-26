import React, { useState } from 'react';
import { 
  Smartphone, Tablet, Monitor, Wifi, WifiOff, Bell, ShieldCheck, 
  CheckCircle2, Camera, MessageSquare, Sparkles, Check, Clock, RefreshCw, 
  FileText, ArrowRight, UserCheck, AlertCircle, Download
} from 'lucide-react';

export interface MobileWorkspaceEngineProps {
  onNavigate?: (route: string) => void;
  erpFamily?: string;
  institutionName?: string;
}

export const MobileWorkspaceEngine: React.FC<MobileWorkspaceEngineProps> = ({
  onNavigate,
  erpFamily = 'Education ERP',
  institutionName = 'JUMO Universal Campus'
}) => {
  const [deviceLayout, setDeviceLayout] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);
  const [syncedItems, setSyncedItems] = useState<number>(42);
  const [pendingSync, setPendingSync] = useState<number>(3);
  const [pushEnabled, setPushEnabled] = useState<boolean>(true);
  const [activeMobileTab, setActiveMobileTab] = useState<'dashboard' | 'approvals' | 'scan' | 'chat' | 'ai'>('dashboard');
  
  // Document Scanner simulator state
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  // Mobile Approvals state
  const [approvals, setApprovals] = useState([
    { id: 'app_1', title: 'Student Tuition Waiver Request', requester: 'John Doe', amount: '$1,200', status: 'PENDING' },
    { id: 'app_2', title: 'Department LPO Approval #9842', requester: 'Dr. Sarah Jenkins', amount: '$4,500', status: 'PENDING' },
    { id: 'app_3', title: 'PARISH Sacramental Audit', requester: 'Fr. Michael', amount: 'N/A', status: 'PENDING' },
  ]);

  // Chat simulator state
  const [chatMessages, setChatMessages] = useState([
    { sender: 'AI Officer', text: 'Welcome to JUMO Mobile Workspace. Offline sync is active.', time: '09:00 AM' },
    { sender: 'Finance Desk', text: 'Batch approval #9842 is ready for digital signature.', time: '09:12 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleApprove = (id: string) => {
    setApprovals(approvals.map(a => a.id === id ? { ...a, status: 'APPROVED' } : a));
    if (isOfflineMode) {
      setPendingSync(prev => prev + 1);
    } else {
      setSyncedItems(prev => prev + 1);
    }
  };

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult(`DOC-CRYPT-VERIFIED: Invoice #INV-2026-9041 verified on JUMO Trust Ledger.`);
    }, 1200);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage) return;
    setChatMessages([...chatMessages, { sender: 'You', text: newMessage, time: 'Now' }]);
    setNewMessage('');
  };

  const handleSyncNow = () => {
    setSyncedItems(prev => prev + pendingSync);
    setPendingSync(0);
  };

  return (
    <div className="space-y-6 text-slate-900 font-sans">
      {/* Mobile Workspace Controller Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-blue-50 text-[#0078D4] text-[10px] font-mono font-bold rounded border border-blue-200 uppercase">
              UNIVERSAL MOBILE PLATFORM CORE
            </span>
            <span className="text-xs text-slate-500 font-medium">Offline-First Engine</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 mt-1">{institutionName} Mobile App</h2>
          <p className="text-xs text-slate-500">Native mobile controls, offline sync, document scanning, mobile approvals & encrypted chat</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Device Switcher */}
          <div className="bg-slate-100 p-1 rounded-lg flex items-center gap-1 border border-slate-200">
            <button
              onClick={() => setDeviceLayout('mobile')}
              className={`p-1.5 rounded text-xs font-bold flex items-center gap-1 transition ${
                deviceLayout === 'mobile' ? 'bg-white text-[#0078D4] shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" /> Mobile
            </button>
            <button
              onClick={() => setDeviceLayout('tablet')}
              className={`p-1.5 rounded text-xs font-bold flex items-center gap-1 transition ${
                deviceLayout === 'tablet' ? 'bg-white text-[#0078D4] shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" /> Tablet
            </button>
            <button
              onClick={() => setDeviceLayout('desktop')}
              className={`p-1.5 rounded text-xs font-bold flex items-center gap-1 transition ${
                deviceLayout === 'desktop' ? 'bg-white text-[#0078D4] shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" /> Web
            </button>
          </div>

          {/* Offline/Online Mode Switcher */}
          <button
            onClick={() => setIsOfflineMode(!isOfflineMode)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition ${
              isOfflineMode
                ? 'bg-amber-50 text-amber-800 border-amber-300'
                : 'bg-emerald-50 text-emerald-800 border-emerald-300'
            }`}
          >
            {isOfflineMode ? <WifiOff className="w-3.5 h-3.5 text-amber-600" /> : <Wifi className="w-3.5 h-3.5 text-emerald-600" />}
            {isOfflineMode ? 'Offline Mode (Local Cache)' : 'Online Synced'}
          </button>
        </div>
      </div>

      {/* Sync Status Bar */}
      <div className="p-3 bg-slate-900 text-white rounded-xl flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-emerald-400 font-bold">
            <CheckCircle2 className="w-4 h-4" /> Synced Items: {syncedItems}
          </span>
          {pendingSync > 0 && (
            <span className="flex items-center gap-1 text-amber-400 font-bold">
              <Clock className="w-4 h-4" /> Pending Local Queue: {pendingSync}
            </span>
          )}
        </div>

        {pendingSync > 0 && (
          <button
            onClick={handleSyncNow}
            className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded font-sans text-[11px] font-bold flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" /> Sync Now to FAAP Ledger
          </button>
        )}
      </div>

      {/* Mobile Device View Simulation Frame */}
      <div className="flex justify-center">
        <div 
          className={`bg-slate-900 p-4 rounded-3xl shadow-2xl transition-all duration-300 ${
            deviceLayout === 'mobile' ? 'w-[380px]' : deviceLayout === 'tablet' ? 'w-[640px]' : 'w-full'
          }`}
        >
          {/* Simulated Screen Inner */}
          <div className="bg-slate-50 rounded-2xl overflow-hidden min-h-[520px] flex flex-col justify-between text-xs text-slate-900">
            {/* Mobile App Header Bar */}
            <div className="bg-[#0078D4] text-white p-3.5 flex items-center justify-between shadow-xs">
              <div>
                <span className="text-[10px] font-mono text-blue-200 font-bold block">{erpFamily.toUpperCase()} MOBILE</span>
                <span className="font-extrabold text-sm">{institutionName}</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setPushEnabled(!pushEnabled)}
                  className={`p-1.5 rounded-full transition ${pushEnabled ? 'bg-blue-500 text-white' : 'bg-blue-800 text-blue-300'}`}
                >
                  <Bell className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Mobile Content Area */}
            <div className="p-4 flex-1 overflow-y-auto space-y-4 mobile-view-transition">
              {activeMobileTab === 'dashboard' && (
                <div className="space-y-3 mobile-tab-transition">
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-800">Quick Metrics</span>
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-mono font-bold">ONLINE SYNC ACTIVE</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="p-2 bg-slate-50 rounded-lg">
                        <div className="text-base font-black text-slate-900">1,280</div>
                        <div className="text-[10px] text-slate-500">Active Records</div>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-lg">
                        <div className="text-base font-black text-blue-600">$14,250</div>
                        <div className="text-[10px] text-slate-500">FAAP Ledger Bal</div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Actions */}
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => setActiveMobileTab('approvals')}
                      className="p-3 bg-white border border-slate-200 hover:border-blue-300 rounded-xl font-bold text-slate-800 text-left space-y-1 shadow-xs transition"
                    >
                      <UserCheck className="w-5 h-5 text-blue-600" />
                      <div>Approvals Queue</div>
                      <div className="text-[10px] text-slate-400 font-normal">{approvals.filter(a => a.status === 'PENDING').length} Pending</div>
                    </button>

                    <button 
                      onClick={() => setActiveMobileTab('scan')}
                      className="p-3 bg-white border border-slate-200 hover:border-purple-300 rounded-xl font-bold text-slate-800 text-left space-y-1 shadow-xs transition"
                    >
                      <Camera className="w-5 h-5 text-purple-600" />
                      <div>Scan Document</div>
                      <div className="text-[10px] text-slate-400 font-normal">AI OCR Verification</div>
                    </button>
                  </div>
                </div>
              )}

              {activeMobileTab === 'approvals' && (
                <div className="space-y-3 mobile-tab-transition">
                  <h4 className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-blue-600" />
                    Pending Approvals ({approvals.filter(a => a.status === 'PENDING').length})
                  </h4>

                  <div className="space-y-2">
                    {approvals.map(app => (
                      <div key={app.id} className="p-3 bg-white border border-slate-200 rounded-xl space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-bold text-slate-900 text-xs">{app.title}</div>
                            <div className="text-[10px] text-slate-500">Requested by: {app.requester}</div>
                          </div>
                          <span className="font-mono text-xs font-bold text-blue-600">{app.amount}</span>
                        </div>

                        {app.status === 'PENDING' ? (
                          <button
                            onClick={() => handleApprove(app.id)}
                            className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] transition flex items-center justify-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" /> Approve & Sign Digitally
                          </button>
                        ) : (
                          <div className="text-[10px] font-bold text-emerald-700 bg-emerald-50 p-1.5 rounded text-center">
                            APPROVED & SYNCED TO LEDGER
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeMobileTab === 'scan' && (
                <div className="space-y-3 mobile-tab-transition">
                  <h4 className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-purple-600" />
                    Document Scanner & OCR Verification
                  </h4>

                  <div className="p-4 bg-white border-2 border-dashed border-purple-200 rounded-xl text-center space-y-3">
                    <Camera className="w-8 h-8 text-purple-500 mx-auto" />
                    <p className="text-[11px] text-slate-500">Scan receipt, student ID card, or official invoice for AI automated extraction.</p>

                    <button
                      onClick={handleSimulateScan}
                      disabled={isScanning}
                      className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold text-xs transition cursor-pointer"
                    >
                      {isScanning ? 'Scanning & Verifying...' : 'Simulate Camera Scan'}
                    </button>
                  </div>

                  {scanResult && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-[11px] font-mono">
                      {scanResult}
                    </div>
                  )}
                </div>
              )}

              {activeMobileTab === 'chat' && (
                <div className="space-y-3 flex flex-col justify-between h-[340px] mobile-tab-transition">
                  <div className="space-y-2 overflow-y-auto pr-1">
                    {chatMessages.map((msg, idx) => (
                      <div key={idx} className={`p-2.5 rounded-xl max-w-[85%] ${msg.sender === 'You' ? 'bg-blue-600 text-white ml-auto' : 'bg-white text-slate-800 border border-slate-200'}`}>
                        <div className="text-[9px] opacity-75 font-mono mb-0.5">{msg.sender} • {msg.time}</div>
                        <div className="text-xs font-medium">{msg.text}</div>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSendMessage} className="flex gap-1.5">
                    <input
                      type="text"
                      placeholder="Type secure message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 p-2 bg-white border border-slate-200 rounded-lg text-xs"
                    />
                    <button type="submit" className="px-3 bg-blue-600 text-white font-bold rounded-lg text-xs">Send</button>
                  </form>
                </div>
              )}
            </div>

            {/* Mobile Bottom Navigation Bar */}
            <div className="bg-white border-t border-slate-200 p-2 grid grid-cols-4 gap-1 text-center font-bold text-[10px]">
              <button 
                onClick={() => setActiveMobileTab('dashboard')} 
                className={`py-1.5 rounded transition ${activeMobileTab === 'dashboard' ? 'text-[#0078D4] bg-blue-50' : 'text-slate-500'}`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => setActiveMobileTab('approvals')} 
                className={`py-1.5 rounded transition ${activeMobileTab === 'approvals' ? 'text-[#0078D4] bg-blue-50' : 'text-slate-500'}`}
              >
                Approvals
              </button>
              <button 
                onClick={() => setActiveMobileTab('scan')} 
                className={`py-1.5 rounded transition ${activeMobileTab === 'scan' ? 'text-[#0078D4] bg-blue-50' : 'text-slate-500'}`}
              >
                Scan OCR
              </button>
              <button 
                onClick={() => setActiveMobileTab('chat')} 
                className={`py-1.5 rounded transition ${activeMobileTab === 'chat' ? 'text-[#0078D4] bg-blue-50' : 'text-slate-500'}`}
              >
                Secure Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileWorkspaceEngine;
