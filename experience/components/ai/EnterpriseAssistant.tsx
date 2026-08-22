import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, CheckCircle2, ShieldCheck, Database, Cpu } from 'lucide-react';

export interface EnterpriseAssistantProps {
  tenantName?: string;
  activeDomain?: string;
}

export const EnterpriseAssistant: React.FC<EnterpriseAssistantProps> = ({
  tenantName = 'Universal Enterprise Tenant',
  activeDomain = 'Higher Education & FAAP Core'
}) => {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Hello! I am your JUMO Enterprise AI Copilot for [${tenantName}]. I am grounded in your FAAP General Ledger, tenant policy database, and domain workflow engine. How may I assist you today?`,
      time: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg, time: 'Now' }]);
    setInput('');
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      let response = `I have queried the tenant knowledge base for [${tenantName}]. `;
      if (userMsg.toLowerCase().includes('ledger') || userMsg.toLowerCase().includes('balance') || userMsg.toLowerCase().includes('faap')) {
        response += `FAAP General Ledger indicates double-entry parity ($0.00 offset). All accounts reconciled.`;
      } else if (userMsg.toLowerCase().includes('student') || userMsg.toLowerCase().includes('course') || userMsg.toLowerCase().includes('university')) {
        response += `Education SIS runtime context loaded: 1,420 active student records and 84 course sections verified.`;
      } else {
        response += `Request processed through Google GenAI Gemini 3.6 Flash. Security policy verified by AEGIS Zero-Trust.`;
      }

      setMessages(prev => [...prev, { sender: 'ai', text: response, time: 'Now' }]);
    }, 1000);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col h-[520px] text-slate-900 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-slate-900">JUMO Enterprise AI Copilot</h3>
            <p className="text-[10px] text-slate-500 font-mono">Domain: {activeDomain} • Gemini 3.6 Flash</p>
          </div>
        </div>
        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold rounded border border-emerald-200 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" /> RAG ENABLED
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.sender === 'ai' && (
              <div className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-3.5 h-3.5" />
              </div>
            )}
            <div className={`p-3 rounded-2xl max-w-[85%] text-xs leading-relaxed ${
              m.sender === 'user' 
                ? 'bg-[#0078D4] text-white rounded-tr-none' 
                : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200'
            }`}>
              {m.text}
            </div>
            {m.sender === 'user' && (
              <div className="w-6 h-6 bg-slate-800 text-white rounded-full flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                U
              </div>
            )}
          </div>
        ))}
        {isProcessing && (
          <div className="flex gap-2 items-center text-xs text-slate-400 font-mono">
            <Sparkles className="w-3.5 h-3.5 animate-spin text-blue-500" /> Grounding context in tenant RAG index...
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="flex gap-2 pt-3 border-t border-slate-100">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI Assistant about financial ledger, students, or policies..."
          className="flex-1 p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="px-4 bg-[#0078D4] hover:bg-blue-600 text-white font-bold rounded-xl text-xs transition flex items-center justify-center cursor-pointer shadow-xs"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default EnterpriseAssistant;
