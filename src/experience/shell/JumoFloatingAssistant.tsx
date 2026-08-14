import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, MessageSquare, Send, X, Bot, User, Cpu, 
  Layers, AlertCircle, CheckCircle2, ChevronDown, RefreshCw, Zap
} from 'lucide-react';
import { StructuredAIResponseRenderer } from '../renderer/components/StructuredAIResponseRenderer';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  metadata?: any;
}

interface JumoFloatingAssistantProps {
  activeStudio: string;
  activeJobId?: string | null;
  activeJobStage?: string | null;
  variant?: 'floating' | 'embedded';
}

export const JumoFloatingAssistant: React.FC<JumoFloatingAssistantProps> = ({
  activeStudio,
  activeJobId: propActiveJobId,
  activeJobStage: propActiveJobStage,
  variant = 'floating'
}) => {
  const [isOpen, setIsOpen] = useState(variant === 'embedded');
  const [inputMessage, setInputMessage] = useState('');
  const [selectedMode, setSelectedMode] = useState<'conversation' | 'architecture' | 'planning' | 'analysis' | 'decision' | 'delegation'>('conversation');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Greetings, Operator. JUMO GPT is active. Let us compose, analyze, or verify your platform architecture.',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModeDropdown, setShowModeDropdown] = useState(false);
  const [polledJob, setPolledJob] = useState<{ id: string; stage: string } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Poll state to get real active jobs
  useEffect(() => {
    if (!isOpen) return;

    const fetchState = async () => {
      try {
        const res = await fetch('/api/v1/ueos/state');
        if (res.ok) {
          const stateData = await res.json();
          if (stateData && stateData.jobs && stateData.jobs.length > 0) {
            // Find first incomplete or last active job
            const active = stateData.jobs.find((j: any) => j.status !== 'COMPLETED' && j.status !== 'FAILED') || stateData.jobs[stateData.jobs.length - 1];
            if (active) {
              setPolledJob({ id: active.jobId, stage: active.currentStage || 'Initializing' });
            } else {
              setPolledJob(null);
            }
          } else {
            setPolledJob(null);
          }
        }
      } catch (err) {
        console.warn('Error fetching state for co-pilot context:', err);
      }
    };

    fetchState();
    const interval = setInterval(fetchState, 5000);
    return () => clearInterval(interval);
  }, [isOpen]);

  const activeJobId = propActiveJobId || polledJob?.id;
  const activeJobStage = propActiveJobStage || polledJob?.stage;

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userText = inputMessage.trim();
    setInputMessage('');

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: userText,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/v1/ueos/ai/reasoning', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-operator-name': 'Sovereign Operator Alpha'
        },
        body: JSON.stringify({
          message: userText,
          mode: selectedMode,
          context: {
            activeStudio: activeStudio,
            activeJobId: activeJobId,
            activeJobStage: activeJobStage,
            timestamp: new Date().toISOString()
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Kernel reasoning error (HTTP ${response.status})`);
      }

      const data = await response.json();
      
      if (data.ok && data.result) {
        const resObj = data.result;
        setMessages(prev => [...prev, {
          id: resObj.requestId || `msg-${Date.now()}`,
          role: 'assistant',
          content: resObj.content || resObj.response,
          timestamp: new Date(resObj.timestamp || Date.now()).toLocaleTimeString(),
        }]);
      } else {
        throw new Error(data.error || 'Unknown reasoning failure.');
      }
    } catch (err: any) {
      setMessages(prev => [...prev, {
        id: `msg-error-${Date.now()}`,
        role: 'system',
        content: `Reasoning Link Failure: ${err.message}. Please verify the JUMO AI provider configuration.`,
        timestamp: new Date().toLocaleTimeString()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearContext = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: 'JUMO Conversational context has been re-initialized to empty. Ready for strategic directives.',
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
  };

  const modes = [
    { id: 'conversation', label: 'Conversational', desc: 'General queries & guidance' },
    { id: 'architecture', label: 'Architecture', desc: 'Design systems and verify specifications' },
    { id: 'planning', label: 'Planning', desc: 'Generate step-by-step implementation plans' },
    { id: 'analysis', label: 'Analysis', desc: 'Audit system logs and analyze errors' },
    { id: 'decision', label: 'Decision', desc: 'Get strategic decisions based on metrics' },
    { id: 'delegation', label: 'Delegation', desc: 'Allocate specialized agents to jobs' }
  ] as const;

  return (
    <div className={variant === 'floating' ? "fixed bottom-6 right-6 z-50 font-sans" : "relative z-10 font-sans w-full h-full"} id="jumo-floating-assistant-container">
      {/* Expandable Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className={`${variant === 'floating' ? 'w-96 h-[540px] mb-4' : 'w-full h-full min-h-[500px]'} bg-white rounded-2xl border border-slate-200/80 shadow-2xl flex flex-col overflow-hidden`}
          >
            {/* Header */}
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Cpu className="w-4.5 h-4.5 text-white animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-100 flex items-center gap-1.5">
                    JUMO GPT
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-ping"></span>
                  </h3>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Sovereign Intelligence Interface</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={handleClearContext}
                  title="Clear Conversation"
                  className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Context Awareness Banner */}
            <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center justify-between text-[10px]">
              <div className="flex items-center gap-1.5 font-bold text-slate-600 uppercase tracking-wider">
                <Layers className="w-3 h-3 text-slate-500" />
                <span>Context: <span className="text-blue-600 font-extrabold">{activeStudio.replace('_', ' ')}</span></span>
              </div>
              {activeJobId && (
                <div className="flex items-center gap-1 font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100 uppercase text-[9px]">
                  <Zap className="w-2.5 h-2.5 text-amber-600 fill-current" />
                  <span>Job: {activeJobId.slice(-6)} ({activeJobStage})</span>
                </div>
              )}
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role !== 'user' && (
                    <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}
                  <div className="max-w-[80%] space-y-2">
                    <div className={`p-3 rounded-2xl text-[11px] leading-relaxed border ${
                      msg.role === 'user' 
                        ? 'bg-blue-600 text-white border-blue-700 rounded-tr-none font-medium'
                        : msg.role === 'system'
                        ? 'bg-rose-50 text-rose-700 border-rose-200/60 rounded-tl-none font-bold'
                        : 'bg-white text-slate-800 border-slate-200/60 rounded-tl-none shadow-sm'
                    }`}>
                      {msg.role === 'user' ? (
                        typeof msg.content === 'object' ? JSON.stringify(msg.content) : String(msg.content || '')
                      ) : (
                        <StructuredAIResponseRenderer response={msg.content} theme="light" />
                      )}
                    </div>
                    <span className="text-[8px] text-slate-400 font-medium block uppercase px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white flex-shrink-0 shadow-md shadow-blue-500/10">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0 animate-pulse">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white text-slate-500 p-3.5 rounded-2xl rounded-tl-none border border-slate-200/60 shadow-sm text-[11px] flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                    <span className="font-semibold text-slate-400 tracking-wider uppercase text-[9px]">JUMO reasoning in progress...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form & Mode Selection */}
            <div className="p-3 bg-white border-t border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                {/* Reasoning Mode Selector */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowModeDropdown(!showModeDropdown)}
                    className="flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-bold rounded-lg text-[9px] uppercase tracking-wider transition-colors"
                  >
                    <span>Mode: <span className="text-blue-600">{selectedMode}</span></span>
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  {showModeDropdown && (
                    <div className="absolute bottom-full left-0 mb-1 w-52 bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden z-50">
                      <div className="p-2 bg-slate-50 border-b border-slate-100 text-[8px] font-black text-slate-400 uppercase tracking-wider">
                        Select Reasoning Directive
                      </div>
                      <div className="max-h-48 overflow-y-auto">
                        {modes.map((m) => (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => {
                              setSelectedMode(m.id);
                              setShowModeDropdown(false);
                            }}
                            className={`w-full text-left px-3 py-2 text-[10px] hover:bg-slate-50 flex flex-col transition-colors ${selectedMode === m.id ? 'bg-blue-50/50' : ''}`}
                          >
                            <span className={`font-black uppercase ${selectedMode === m.id ? 'text-blue-600' : 'text-slate-800'}`}>{m.label}</span>
                            <span className="text-slate-400 text-[8px] font-medium leading-tight mt-0.5">{m.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Sovereign Cloud Node</span>
              </div>

              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={`Ask JUMO GPT in ${selectedMode} mode...`}
                  disabled={isLoading}
                  className="flex-1 px-3.5 py-2 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 rounded-xl text-xs bg-slate-50/50 placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputMessage.trim()}
                  className="px-3.5 py-2 bg-slate-950 text-white rounded-xl hover:bg-blue-600 disabled:opacity-40 disabled:hover:bg-slate-950 transition-colors flex items-center justify-center flex-shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Bubble */}
      {variant === 'floating' && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-slate-950 hover:bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/10 cursor-pointer focus:outline-none border-2 border-slate-800"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <div className="relative">
              <Sparkles className="w-6 h-6 text-white animate-pulse" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-slate-950"></span>
            </div>
          )}
        </motion.button>
      )}
    </div>
  );
};
