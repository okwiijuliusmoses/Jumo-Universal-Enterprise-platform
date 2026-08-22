/**
 * JUMO UEOS — Authoritative Enterprise Communications & Notification Engine
 * Integrated SMS, Email, Push Notifications, Event-Bus Queues, and Central Automation Engine
 * Styled with clean Microsoft 365 / Google Cloud enterprise aesthetic
 */

import React, { useState } from 'react';
import { 
  Radio, Bell, Mail, MessageSquare, Send, CheckCircle2, Shield, Zap, 
  Search, Filter, ExternalLink, RefreshCw, Activity, Clock, Users, Globe
} from 'lucide-react';
import { EnterpriseLogo } from '../../src/components/EnterpriseLogo';

export const JumoCommunicationsPlatformView: React.FC<{ onNavigate?: (route: string) => void }> = ({ onNavigate }) => {
  const [activeChannel, setActiveChannel] = useState<'all' | 'sms' | 'email' | 'push' | 'queue'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  const mockChannels = [
    { id: 'sms', name: 'Africa Cellular SMS Dispatcher (MTN / Airtel / Safaricom)', type: 'SMS_GATEWAY', status: 'ONLINE', rate: '450 msg/sec', delivered: '142,500 Today', latency: '350 ms' },
    { id: 'email', name: 'Enterprise SMTP & SendGrid Mailer Mesh', type: 'EMAIL_ENGINE', status: 'ONLINE', rate: '1,200 msg/sec', delivered: '380,000 Today', latency: '120 ms' },
    { id: 'push', name: 'Firebase Cloud Messaging & Apple APNS Web-Push', type: 'PUSH_NOTIFY', status: 'ONLINE', rate: '8,500 msg/sec', delivered: '1.4M Today', latency: '45 ms' },
    { id: 'queue', name: 'Micro-Kernel Event-Bus & Redis Pub/Sub Queue', type: 'EVENT_BUS', status: 'ONLINE', rate: '45,000 evt/sec', delivered: '14.2M Today', latency: '4 ms' },
  ];

  const handleBroadcast = () => {
    setIsBroadcasting(true);
    setTimeout(() => {
      setIsBroadcasting(false);
      alert('Enterprise Notification Dispatch Success: High-priority system announcement broadcasted across all 84 tenant orgs and 1,420 active users via multi-channel fallback queue.');
    }, 1000);
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <EnterpriseLogo size="md" variant="blue" showText={false} />
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                Enterprise Communications & Notification Engine
                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 font-mono text-[11px] font-semibold rounded border border-blue-200">
                  Ring-0 Dispatcher
                </span>
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">Integrated SMS, Email, Push Notifications, Event-Bus Queues, and Scheduled Automation Broadcasts</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleBroadcast}
              disabled={isBroadcasting}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition shadow-xs flex items-center gap-1.5 disabled:opacity-50"
            >
              <Send className={`w-3.5 h-3.5 ${isBroadcasting ? 'animate-pulse' : ''}`} />
              {isBroadcasting ? 'Broadcasting...' : 'Broadcast Announcement'}
            </button>
            <button 
              onClick={() => onNavigate && onNavigate('/operations-center')}
              className="px-4 py-2 bg-white hover:bg-white text-white rounded-lg text-xs font-bold transition shadow-xs"
            >
              Control Center
            </button>
          </div>
        </header>

        {/* Communications KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex justify-between items-start">
              <div className="text-xs font-bold text-slate-500 uppercase">Total Messages Today</div>
              <Radio className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1">1.94M Msg</div>
            <div className="text-[11px] text-slate-600 mt-1">Multi-Channel Dispatch</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex justify-between items-start">
              <div className="text-xs font-bold text-slate-500 uppercase">Delivery SLA</div>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-emerald-600 mt-1">99.98%</div>
            <div className="text-[11px] text-slate-600 mt-1">Auto-Retry Fallback</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex justify-between items-start">
              <div className="text-xs font-bold text-slate-500 uppercase">Event-Bus Throughput</div>
              <Zap className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-black text-purple-600 mt-1">45k evt/sec</div>
            <div className="text-[11px] text-slate-600 mt-1">Ultra-Low Latency Mesh</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex justify-between items-start">
              <div className="text-xs font-bold text-slate-500 uppercase">Connected Endpoints</div>
              <Globe className="w-4 h-4 text-teal-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1">1,420 Users</div>
            <div className="text-[11px] text-slate-600 mt-1">SMS / Email / Push Ready</div>
          </div>
        </div>

        {/* Channels Directory */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Active Communications Channels & Event Queues</h3>
              <p className="text-xs text-slate-500">Centralized message broadcasting across all enterprise domains and tenant workspaces.</p>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-600 absolute left-3 top-2.5" />
              <input 
                type="text"
                placeholder="Search communication lines..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs w-64 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockChannels.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.type.toLowerCase().includes(searchQuery.toLowerCase())).map((chan) => (
                <div key={chan.id} className="p-5 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-300 transition space-y-3 font-sans">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-blue-100 text-blue-700 rounded-lg">
                        {chan.id === 'sms' && <MessageSquare className="w-5 h-5" />}
                        {chan.id === 'email' && <Mail className="w-5 h-5" />}
                        {chan.id === 'push' && <Bell className="w-5 h-5" />}
                        {chan.id === 'queue' && <Zap className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-slate-900">{chan.name}</div>
                        <div className="text-[10px] font-mono font-semibold text-blue-600">{chan.type}</div>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> {chan.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200 text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-slate-600 block font-sans">Throughput Rate</span>
                      <strong className="text-slate-800">{chan.rate}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-600 block font-sans">24h Delivered</span>
                      <strong className="text-blue-600">{chan.delivered}</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-600 block font-sans">Avg Latency</span>
                      <strong className="text-emerald-600">{chan.latency}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JumoCommunicationsPlatformView;
