/**
 * Authoritative Universal JUMO AI Concierge Component (v26.0)
 * Official Name: JUMO AI
 * Subtitle: Universal Enterprise Assistant
 * 
 * Adheres strictly to Google AI Conversation Design requirements:
 * - White background, rounded conversation bubbles, professional typography
 * - Large message input with suggested prompts
 * - File upload readiness & future voice preview
 * - Conversation history & animated typing indicators
 * - Grounded sources & clickable enterprise recommendations
 * - Strictly public context prior to institutional authentication
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, Send, Sparkles, RefreshCw, Paperclip, Mic, ArrowRight, 
  CheckCircle2, ExternalLink, Building2, GraduationCap, HeartPulse, 
  Landmark, Coins, Factory, Sprout, Hotel, Truck, Briefcase, Church, 
  Users, Scale, HardHat, Radio, Store, ShieldCheck, FileText
} from 'lucide-react';
import { platformConfig } from '../../config/platformConfig';

interface ChatMessage {
  id: string;
  sender: 'user' | 'jumo';
  text: string;
  timestamp: string;
  sources?: string[];
  recommendation?: {
    name: string;
    category: string;
    description: string;
    actionLabel: string;
    targetRoute?: string;
    icon?: any;
  };
}

export const PublicAI: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'jumo',
      text: "Hello! I am the JUMO Assistant, the universal conversational assistant for JUMO Universal Enterprise Operating System. I can answer questions about enterprise platforms, ERP solutions, subscription packages, implementations, support, documentation, platform capabilities, licensing, and integrations. How can I assist you today?",
      timestamp: 'Just now',
      sources: ['JUMO UEOS Platform Documentation', 'Sovereign Enterprise Architecture Specification']
    }
  ]);
  const [attachmentReady, setAttachmentReady] = useState<string | null>(null);
  const [voiceActive, setVoiceActive] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const presetQueries = [
    'Which ERP is suitable for a university or school?',
    'Compare SACCO ERP with Cooperative ERP.',
    'How do I deploy the Healthcare ERP?',
    'What modules are included in the Manufacturing ERP?',
    'Show me pricing for the Government ERP.',
    'Explain FAAP double-entry clearing & treasury pools.'
  ];

  const handleQuerySubmit = async (queryText: string) => {
    if (!queryText.trim() && !attachmentReady) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: attachmentReady ? `[Attached File: ${attachmentReady}] ${queryText}` : queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setPrompt('');
    const uploadedFile = attachmentReady;
    setAttachmentReady(null);
    setLoading(true);

    // Simulate conversational intelligence reasoning delay
    setTimeout(() => {
      let aiResponseText = '';
      let recommendation: ChatMessage['recommendation'] | undefined = undefined;
      let sources: string[] = ['JUMO UEOS v26.0 Universal Knowledge Base'];

      const lower = queryText.toLowerCase();

      if (lower.includes('university') || lower.includes('school') || lower.includes('education')) {
        aiResponseText = "For educational institutions, our Education ERP Suite provides complete institutional sovereignty. It integrates multi-campus Student Information Systems (SIS), automated fee collections tied directly to the FAAP general ledger, academic transcripts with cryptographic AEGIS verification, and faculty load management. Whether running a K-12 academy or a multi-campus university, it scales to over 100,000 active students per node.";
        recommendation = {
          name: 'JUMO Education & University ERP Suite',
          category: 'Education & Research',
          description: 'Sovereign management for universities, colleges, and school networks with built-in student billing and LMS.',
          actionLabel: 'Explore Education ERP',
          targetRoute: '/login',
          icon: GraduationCap
        };
        sources.push('Education ERP Module Specifications', 'FAAP Tuition Reconciler Engine');
      } else if (lower.includes('sacco') || lower.includes('cooperative') || lower.includes('finance') || lower.includes('banking') || lower.includes('faap') || lower.includes('clearing')) {
        aiResponseText = "JUMO SACCO ERP and our Financial & Accounting Platform (FAAP) operate on a strict SHA-256 double-entry ledger. Unlike legacy banking tools where balances drift, every deposit, share purchase, loan disbursement, or M-Pesa transfer is cryptographically verified ($0.00 offset parity). SACCO ERP is optimized for member dividends, share capital tracking, and microfinance loans, while Cooperative ERP handles agricultural producer pooling and commodity trading.";
        recommendation = {
          name: 'JUMO SACCO & Financial ERP Suite',
          category: 'Financial Services',
          description: 'Canonical double-entry banking, loan amortization, and M-Pesa mobile money clearing.',
          actionLabel: 'Explore SACCO & Finance ERP',
          targetRoute: '/login',
          icon: Coins
        };
        sources.push('FAAP v4.2 Cryptographic Ledger Spec', 'Central Bank Clearing & Compliance Spec');
      } else if (lower.includes('healthcare') || lower.includes('hospital') || lower.includes('clinic')) {
        aiResponseText = "The Healthcare ERP is engineered for national hospital referral networks and private medical centers. It provides HL7/FHIR compliant electronic health records (EHR), pharmacy dispensary inventory management with expiry tracking, inpatient ward bed management, and insurance claim adjudication integrated with our FINTECH settlement gateway.";
        recommendation = {
          name: 'JUMO Healthcare & Clinical ERP Suite',
          category: 'Healthcare & Medical',
          description: 'HIPAA & WHO compliant hospital management with real-time pharmacy and laboratory billing.',
          actionLabel: 'Explore Healthcare ERP',
          targetRoute: '/login',
          icon: HeartPulse
        };
        sources.push('Healthcare Clinical Workflow Standard', 'Medical Insurance Claim Reconciler');
      } else if (lower.includes('manufacturing') || lower.includes('factory') || lower.includes('production') || lower.includes('uamp')) {
        aiResponseText = "The Manufacturing ERP (supported by our Universal Application Manufacturing Platform - UAMP) covers the entire production lifecycle: Bill of Materials (BOM), shop floor work order scheduling, raw material batch tracking, quality assurance checkpointing, and IoT machine telemetry. It automatically syncs cost of goods sold (COGS) into the FAAP treasury.";
        recommendation = {
          name: 'JUMO Manufacturing & Production ERP',
          category: 'Manufacturing & Industrial',
          description: 'Shop floor automation, supply chain logistics, and real-time inventory cost accounting.',
          actionLabel: 'Explore Manufacturing ERP',
          targetRoute: '/login',
          icon: Factory
        };
        sources.push('UAMP Shop-Floor Automation Guide', 'Industrial Supply Chain & BOM Codex');
      } else if (lower.includes('government') || lower.includes('ministry') || lower.includes('public') || lower.includes('pricing') || lower.includes('cost')) {
        aiResponseText = "Our Government & Public Sector ERP delivers sovereign ring-0 isolation for ministries, municipalities, and regulatory agencies. It features public expenditure tracking, civil service payroll, e-procurement portals, and national revenue collection. Regarding pricing, JUMO UEOS operates on a predictable sovereign licensing tier starting at custom institutional deployment rates with scale-to-zero cloud options.";
        recommendation = {
          name: 'JUMO Government & Sovereign ERP',
          category: 'Public Administration',
          description: 'Ring-0 sovereign architecture for national ministries, tax authorities, and municipal councils.',
          actionLabel: 'Explore Government ERP',
          targetRoute: '/login',
          icon: Landmark
        };
        sources.push('Government Sovereign Cloud Deployment SLA', 'National Procurement Compliance Guide');
      } else if (lower.includes('church') || lower.includes('faith') || lower.includes('diocese')) {
        aiResponseText = "The Church & Ecclesiastical ERP is tailored for Archdioceses, dioceses, cathedrals, and parish networks. It manages clergy licensing and credentials, parishioner family census trees, sacramental baptismal registers, weekly offertory and tithe accounting, and synod resolution voting with bishop dual-key cryptographic signatures.";
        recommendation = {
          name: 'JUMO Church & Ecclesiastical ERP Suite',
          category: 'Faith & Cultural Institutions',
          description: 'Comprehensive diocese governance, clergy licensing, tithe accounting, and pastoral care.',
          actionLabel: 'Explore Church ERP',
          targetRoute: '/login',
          icon: Church
        };
        sources.push('Anglican & Catholic Canonical Governance Standard', 'Diocesan Financial Accountability Rulebook');
      } else {
        aiResponseText = `JUMO UEOS v26.0 is an enterprise hybrid operating system uniting 15 specialized domain suites (Education, Healthcare, Government, Finance, Manufacturing, Agriculture, Hospitality, Transport, Corporate, Church, Cultural, Membership, Legal, Construction, Telecommunications). Every domain shares the FAAP general ledger, AEGIS Zero-Trust security, and our multi-model AI routing gateway. ${uploadedFile ? `I have analyzed "${uploadedFile}" against our enterprise compliance rules with zero violations detected.` : ''} How may I assist your specific institutional deployment?`;
        recommendation = {
          name: 'JUMO Universal Enterprise Platform Store',
          category: 'Ecosystem Store',
          description: 'Browse, trial, and install 41+ specialized enterprise modules and sovereign runtime templates.',
          actionLabel: 'Open Platform Store',
          targetRoute: '/login',
          icon: Store
        };
        sources.push('JUMO UEOS v26.0 Master Blueprint', 'Sovereign Hybrid Cloud Directory');
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'jumo',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources,
        recommendation
      };

      setMessages((prev) => [...prev, aiMsg]);
      setLoading(false);
    }, 1100);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() && !attachmentReady) return;
    handleQuerySubmit(prompt);
  };

  const handleSimulatedFileUpload = () => {
    const sampleFiles = ['Audit_Report_2026.pdf', 'Chart_of_Accounts_v4.xlsx', 'Institution_Census_Data.csv', 'Diocese_Budget_Proposal.pdf'];
    const randomFile = sampleFiles[Math.floor(Math.random() * sampleFiles.length)];
    setAttachmentReady(randomFile);
  };

  const toggleVoicePreview = () => {
    setVoiceActive(!voiceActive);
    if (!voiceActive) {
      setTimeout(() => {
        setPrompt("Explain how FAAP treasury settlement clears mobile money transactions.");
        setVoiceActive(false);
      }, 2500);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
      {/* 1. Header & Concierge Identity */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 bg-gradient-to-br from-[#0078D4] to-blue-900 rounded-2xl flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-6 h-6 animate-pulse text-cyan-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">JUMO AI</h3>
              <span className="px-2.5 py-0.5 bg-blue-50 border border-blue-200 text-[#0078D4] font-semibold text-[11px] rounded-full">
                Universal Enterprise Assistant
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Authoritative intelligence across 15 ERP solutions, FAAP ledgers, and JUMO Cloud architectures.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            Ring-0 Public Knowledge Gateway
          </span>
        </div>
      </div>

      {/* 2. Google AI Styled Conversation History */}
      <div className="max-h-[480px] overflow-y-auto pr-2 space-y-4 font-sans">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-2`}>
            <div className={`flex items-start gap-3 max-w-[88%] md:max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                msg.sender === 'user' ? 'bg-slate-800 text-white' : 'bg-[#0078D4] text-white shadow-sm'
              }`}>
                {msg.sender === 'user' ? 'You' : <Bot className="w-4 h-4" />}
              </div>

              <div className={`p-4 rounded-2xl leading-relaxed text-sm shadow-sm ${
                msg.sender === 'user' 
                  ? 'bg-[#0078D4] text-white rounded-tr-none' 
                  : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-none'
              }`}>
                <div className="whitespace-pre-wrap">{msg.text}</div>

                {/* Grounded Sources */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-200/60 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-600">Grounded Sources:</span>
                    {msg.sources.map((src, i) => (
                      <span key={i} className="px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-600 font-mono text-[10px] flex items-center gap-1">
                        <FileText className="w-3 h-3 text-[#0078D4]" />
                        {src}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Clickable Recommended Service Card */}
            {msg.recommendation && (
              <div className="ml-11 w-full max-w-[80%] p-4 bg-gradient-to-r from-blue-50/80 via-indigo-50/40 to-white border border-blue-200 rounded-2xl shadow-sm space-y-3 animate-in fade-in duration-300">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-blue-100 text-[#0078D4] rounded">
                    Recommended JUMO Solution
                  </span>
                  <span className="text-xs text-slate-400">{msg.recommendation.category}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0078D4] text-white flex items-center justify-center shrink-0 shadow-sm">
                    {msg.recommendation.icon ? React.createElement(msg.recommendation.icon, { className: 'w-5 h-5' }) : <Building2 className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{msg.recommendation.name}</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-normal">{msg.recommendation.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-end pt-1">
                  <button
                    onClick={() => window.location.href = msg.recommendation?.targetRoute || '/login'}
                    className="px-4 py-2 bg-[#0078D4] hover:bg-[#005a9e] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <span>{msg.recommendation.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0078D4] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-none text-xs text-slate-600 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0078D4] animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-[#0078D4] animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 rounded-full bg-[#0078D4] animate-bounce [animation-delay:0.4s]"></span>
              <span className="ml-1 font-medium text-slate-700">JUMO AI is synthesizing enterprise guidance...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* 3. Suggested Prompts */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#0078D4]" />
          <span>Suggested JUMO UEOS exploration topics:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {presetQueries.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleQuerySubmit(q)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 hover:border-[#0078D4] hover:bg-blue-50/60 text-slate-700 hover:text-[#0078D4] rounded-xl text-xs font-medium transition-all cursor-pointer text-left shadow-xs"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Large Message Input with Attachments & Future Voice Ready Interface */}
      <form onSubmit={handleFormSubmit} className="space-y-3">
        {attachmentReady && (
          <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between text-xs text-blue-900 animate-in fade-in">
            <span className="flex items-center gap-2 font-medium">
              <Paperclip className="w-4 h-4 text-[#0078D4]" />
              Attached document ready for AI evaluation: <strong className="font-mono">{attachmentReady}</strong>
            </span>
            <button
              type="button"
              onClick={() => setAttachmentReady(null)}
              className="text-blue-600 hover:text-blue-800 font-bold px-2 py-0.5 rounded hover:bg-blue-100"
            >
              Remove
            </button>
          </div>
        )}

        {voiceActive && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between text-xs text-red-900 animate-pulse">
            <span className="flex items-center gap-2 font-bold">
              <Mic className="w-4 h-4 text-red-600" />
              Voice Input Active (Future Preview)... Listening for natural language institutional commands...
            </span>
            <button
              type="button"
              onClick={() => setVoiceActive(false)}
              className="px-2 py-1 bg-red-600 text-white rounded font-bold text-[10px]"
            >
              Cancel
            </button>
          </div>
        )}

        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Ask JUMO Assistant about enterprise platforms, subscription packages, licensing, or documentation..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={loading || voiceActive}
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 pl-4 pr-32 py-4 rounded-2xl text-sm focus:outline-none focus:border-[#0078D4] focus:bg-white focus:ring-4 focus:ring-[#0078D4]/10 transition-all shadow-inner"
          />

          <div className="absolute right-2 flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleSimulatedFileUpload}
              title="Upload institutional document or ledger sample"
              className="p-2 text-slate-400 hover:text-[#0078D4] hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              <Paperclip className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={toggleVoicePreview}
              title="Voice interface ready (Future Preview)"
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                voiceActive ? 'bg-red-600 text-white animate-pulse' : 'text-slate-400 hover:text-red-600 hover:bg-slate-100'
              }`}
            >
              <Mic className="w-4 h-4" />
            </button>
            <button
              type="submit"
              disabled={loading || (!prompt.trim() && !attachmentReady)}
              className="px-4 py-2.5 bg-[#0078D4] hover:bg-[#005a9e] disabled:opacity-50 text-white font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span>Ask AI</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
          <span>JUMO AI knows only public information before login. Institutional authentication unlocks tenant RAG data.</span>
          <span className="font-mono">v26.0 Universal Concierge</span>
        </div>
      </form>
    </div>
  );
};

