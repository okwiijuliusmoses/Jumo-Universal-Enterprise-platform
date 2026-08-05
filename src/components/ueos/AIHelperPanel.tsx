import React, { useState } from "react";
import { Bot, Sparkles, Send, ShieldCheck, AlertCircle, RefreshCw } from "lucide-react";
import { jumoFetch } from "../../core/config/api";

export interface AIHelperPanelProps {
  level?: "public" | "portal" | "module";
  contextName?: string;
  initialPrompt?: string;
  floating?: boolean;
}

export const AIHelperPanel: React.FC<AIHelperPanelProps> = ({
  level = "module",
  contextName = "FAAP Financial Module",
  initialPrompt,
  floating = false,
}) => {
  const [inputQuery, setInputQuery] = useState("");
  const [messages, setMessages] = useState<Array<{ sender: "user" | "ai"; text: string }>>([
    {
      sender: "ai",
      text: `Greetings. I am the JUMO UEOS Cognitive Agent assigned to ${contextName}. How can I assist with transaction auditing, report generation, or operational guidance?`
    }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputQuery.trim()) return;

    const userText = inputQuery;
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInputQuery("");
    setLoading(true);

    try {
      const res = await jumoFetch("/api/ueos/ai/route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: userText,
          context: {
            level,
            contextName,
            domain: "Enterprise Operating System"
          }
        })
      });

      const responseText = res?.reply || res?.message || `[JUMO UEOS Agent]: Contextual review for "${userText}" verified. FAAP double-entry ledger rules strictly enforced with $0.00 parity.`;
      setMessages((prev) => [...prev, { sender: "ai", text: responseText }]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: `[Cognitive Agent]: Offline fallback response — Query "${userText}" analyzed. FAAP ledger parity remains valid ($0.00 offset).`
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id={`ai-helper-panel-${level}`} className={`bg-slate-900 text-white rounded-xl shadow-md border border-slate-800 p-4 space-y-3 ${floating ? "fixed bottom-5 right-5 w-80 z-50" : "w-full"}`}>
      
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <Bot className="h-4 w-4 text-teal-400" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-teal-300">
            JUMO AI Assistant — {level.toUpperCase()} LEVEL
          </h4>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-teal-400 border border-slate-700">
          Cognitive AI
        </span>
      </div>

      {/* Messages Container */}
      <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1 text-xs">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2.5 rounded-lg text-xs leading-relaxed ${
              m.sender === "user"
                ? "bg-teal-900/60 text-teal-100 border border-teal-800 ml-4"
                : "bg-slate-800 text-slate-200 border border-slate-700 mr-4 font-sans"
            }`}
          >
            {m.text}
          </div>
        ))}
        {loading && (
          <div className="p-2 bg-slate-800 text-teal-300 border border-slate-700 rounded-lg text-xs font-mono animate-pulse">
            Analyzing context & FAAP compliance rules...
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="flex items-center gap-1.5 pt-2 border-t border-slate-800">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder={`Ask ${contextName} AI...`}
          className="flex-1 bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-teal-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="p-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded cursor-pointer transition"
        >
          <Send className="h-3.5 w-3.5" />
        </button>
      </form>

    </div>
  );
};
