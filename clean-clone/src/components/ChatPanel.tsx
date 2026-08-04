import { jumoFetch } from "../core/config/api";
import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Bot, Sparkles, User, Terminal, ChevronRight } from "lucide-react";
import { ChatMessage, SoftwareBlueprint } from "../types";

interface ChatPanelProps {
  blueprint: SoftwareBlueprint | null;
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  onUpdateMessages: (updated: ChatMessage[]) => void;
}

export default function ChatPanel({ blueprint, isOpen, onClose, messages, onUpdateMessages }: ChatPanelProps) {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, userMsg];
    onUpdateMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    try {
      const response = await jumoFetch("/api/blueprint/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blueprint,
          messages: updatedMessages,
          message: userMsg.content,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to communicate with architect.");
      }

      const modelMsg: ChatMessage = {
        role: "model",
        content: data.content || "I couldn't generate a response. Please try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      onUpdateMessages([...updatedMessages, modelMsg]);
    } catch (err: any) {
      console.error(err);
      const errMsg: ChatMessage = {
        role: "model",
        content: `⚠️ Error: ${err.message || "An unexpected network error occurred."}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      onUpdateMessages([...updatedMessages, errMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  // Safe simple formatting for custom code blocks and lists in model messages
  const renderMessageContent = (content: string) => {
    // Regex split by markdown code fences
    const segments = content.split(/(```[\s\S]*?```)/g);
    
    return segments.map((seg, idx) => {
      if (seg.startsWith("```")) {
        // Extract language and actual code content
        const lines = seg.split("\n");
        const lang = lines[0].replace("```", "").trim() || "code";
        const code = lines.slice(1, -1).join("\n");
        return (
          <div key={idx} className="my-3 bg-slate-950 border border-slate-800 rounded-lg overflow-hidden font-mono text-[11px] leading-relaxed shadow-inner">
            <div className="bg-slate-900 border-b border-slate-800 px-3.5 py-1.5 flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase">
              <span>{lang}</span>
              <Terminal className="h-3 w-3 text-emerald-400" />
            </div>
            <pre className="p-3 overflow-x-auto text-slate-300 whitespace-pre scrollbar-none">{code}</pre>
          </div>
        );
      }
      
      // Basic formatting for bold text and list lines
      return (
        <span key={idx} className="whitespace-pre-wrap leading-relaxed text-xs text-slate-300">
          {seg.split("\n").map((line, lIdx) => {
            // Check for list items
            if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
              return (
                <span key={lIdx} className="block pl-4 relative my-1 text-slate-300">
                  <span className="absolute left-0 text-emerald-400 font-bold">•</span>
                  {line.trim().substring(2)}
                </span>
              );
            }
            // Check for numbered lists
            const numMatch = line.trim().match(/^(\d+)\.\s(.*)/);
            if (numMatch) {
              return (
                <span key={lIdx} className="block pl-5 relative my-1 text-slate-300">
                  <span className="absolute left-0 text-emerald-400 font-bold font-mono text-[10px]">{numMatch[1]}.</span>
                  {numMatch[2]}
                </span>
              );
            }
            return (
              <span key={lIdx} className="block min-h-[1rem]">
                {line}
              </span>
            );
          })}
        </span>
      );
    });
  };

  if (!isOpen) return null;

  return (
    <div className="w-full md:w-[380px] lg:w-[420px] bg-slate-900/90 backdrop-blur-lg border-l border-slate-800 flex flex-col h-full fixed md:relative right-0 top-0 z-40 shadow-2xl">
      {/* Header controls */}
      <div className="p-4 border-b border-slate-800 bg-slate-950/30 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-emerald-950/40 border border-emerald-800/30 flex items-center justify-center">
            <Bot className="h-4.5 w-4.5 text-emerald-400" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white tracking-wide">Architect Copilot</h4>
            <span className="text-[10px] font-mono text-emerald-400/90 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
              {blueprint ? "Analyzing Blueprint" : "General Assistant"}
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-lg transition cursor-pointer"
        >
          <X className="h-4.5 w-4.5" />
        </button>
      </div>

      {/* Messages List Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Onboarding greeting */}
        <div className="bg-slate-950/20 border border-slate-850 p-4 rounded-xl flex gap-3">
          <Bot className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1.5">
            <h5 className="text-xs font-bold text-slate-200">System Architect Assigned</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              Hi! I'm your Senior Software Architect. Ask me anything about your generated project, draft SQL statements, design tables, or debug API structures.
            </p>
            {blueprint && (
              <div className="text-[10px] text-slate-500 font-mono mt-2 uppercase">
                Active Context: {blueprint.name}
              </div>
            )}
          </div>
        </div>

        {/* Chat History Thread */}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            {/* Avatar icon */}
            <div className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 border ${
              msg.role === "user"
                ? "bg-blue-950/40 border-blue-800/20 text-blue-400"
                : "bg-emerald-950/40 border-emerald-800/20 text-emerald-400"
            }`}>
              {msg.role === "user" ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
            </div>

            {/* Bubble contents */}
            <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 shadow-sm border ${
              msg.role === "user"
                ? "bg-blue-600/10 border-blue-500/20 rounded-tr-none text-slate-100"
                : "bg-slate-950/30 border-slate-850 rounded-tl-none text-slate-300"
            }`}>
              {msg.role === "user" ? (
                <span className="text-xs leading-relaxed whitespace-pre-wrap select-text">{msg.content}</span>
              ) : (
                <div className="select-text">{renderMessageContent(msg.content)}</div>
              )}
              <div className="text-[9px] text-slate-600 text-right mt-1.5 font-mono">
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {/* Dynamic typing loader */}
        {isTyping && (
          <div className="flex gap-3">
            <div className="h-7 w-7 rounded-full bg-emerald-950/40 border border-emerald-800/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Bot className="h-3.5 w-3.5" />
            </div>
            <div className="bg-slate-950/30 border border-slate-850 rounded-2xl rounded-tl-none px-4 py-3 text-slate-500 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-bounce"></span>
              <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Message Input Form */}
      <form onSubmit={handleSend} className="p-3 border-t border-slate-800 bg-slate-950/50 flex gap-2 shrink-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about table queries, routes, schemas..."
          className="flex-1 bg-slate-950 text-slate-100 border border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-emerald-500/50 placeholder-slate-600 transition"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-bold p-2.5 rounded-xl transition flex items-center justify-center cursor-pointer shrink-0"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
