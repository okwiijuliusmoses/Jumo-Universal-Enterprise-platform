import React, { useState, useEffect } from "react";
import { Sparkles, Code2, Layers, HelpCircle, ArrowRight, Lightbulb } from "lucide-react";
import { motion } from "motion/react";

interface ProjectWizardProps {
  onGenerate: (data: { description: string; techPreferences: string; complexity: string }) => void;
  isLoading: boolean;
}

const PRESETS = [
  {
    title: "GymSaaS Platform",
    description: "A subscription software for local gyms to manage memberships, log workouts, and schedule training classes with a trainer-student portal.",
    tech: "React, Node.js, PostgreSQL, Tailwind",
  },
  {
    title: "AI Recipe Hub",
    description: "A recipe sharing platform where users search by ingredients, scale serving sizes, generate meal prep calendars, and get AI-powered alternative ingredients.",
    tech: "React, FastAPI, PostgreSQL, Gemini API",
  },
  {
    title: "RentAll Marketplace",
    description: "A peer-to-peer neighborhood rental app for tools, camping gear, and electronics, with secure chat, rental calendars, and deposit tracking.",
    tech: "Next.js, Express, MongoDB, Socket.io",
  }
];

const LOADING_STEPS = [
  "Analyzing functional requirements...",
  "Selecting optimal technology stacks...",
  "Drafting relational database schemas...",
  "Assembling RESTful API contracts...",
  "Laying out system architecture nodes...",
  "Synthesizing Kanban development milestones...",
  "Polishing final architectural blueprints..."
];

export default function ProjectWizard({ onGenerate, isLoading }: ProjectWizardProps) {
  const [description, setDescription] = useState("");
  const [techPreferences, setTechPreferences] = useState("");
  const [complexity, setComplexity] = useState("Standard Full-Stack");
  const [loadingStepIdx, setLoadingStepIdx] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      setLoadingStepIdx(0);
      interval = setInterval(() => {
        setLoadingStepIdx((prev) => (prev + 1) % LOADING_STEPS.length);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;
    onGenerate({ description, techPreferences, complexity });
  };

  const applyPreset = (preset: typeof PRESETS[0]) => {
    setDescription(preset.description);
    setTechPreferences(preset.tech);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="relative mb-8">
          <div className="h-24 w-24 rounded-full border-4 border-slate-700 border-t-emerald-500 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="h-8 w-8 text-emerald-400 animate-pulse" />
          </div>
        </div>
        
        <motion.div
          key={loadingStepIdx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="max-w-md"
        >
          <h3 className="text-xl font-semibold text-slate-100 mb-2">Architecting Blueprint</h3>
          <p className="text-emerald-400 font-mono text-sm tracking-wide mb-4">
            {LOADING_STEPS[loadingStepIdx]}
          </p>
          <p className="text-slate-400 text-xs px-6 leading-relaxed">
            Gemini is reasoning through system design parameters to map database fields, route payloads, and generate structured Kanban tasks.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-emerald-950/40 border border-emerald-800/30 px-3 py-1.5 rounded-full mb-4">
          <Sparkles className="h-4 w-4 text-emerald-400" />
          <span className="text-xs font-medium text-emerald-300">AI-Powered Software Architecture</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-3 font-sans">
          Project Blueprint Architect
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
          Provide your product concept and watch Gemini design a comprehensive developer blueprint: database tables, full API contracts, interactive system flowcharts, and actionable Kanban milestones.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Input Form */}
        <div className="lg:col-span-2 bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                1. Product Idea / Requirements
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. A subscription platform for a language tutoring center where students can search tutors, book 30-min trial lessons, submit feedback, and view tutoring resources..."
                rows={5}
                required
                className="w-full bg-slate-950/70 text-slate-100 border border-slate-800 rounded-xl p-3.5 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 placeholder-slate-600 transition"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  2. Tech Stack Preferences (Optional)
                </label>
                <div className="relative">
                  <Code2 className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    value={techPreferences}
                    onChange={(e) => setTechPreferences(e.target.value)}
                    placeholder="e.g. Next.js, FastAPI, Prisma, PostgreSQL"
                    className="w-full bg-slate-950/70 text-slate-100 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 placeholder-slate-600 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  3. Design Scale & Complexity
                </label>
                <div className="relative">
                  <Layers className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                  <select
                    value={complexity}
                    onChange={(e) => setComplexity(e.target.value)}
                    className="w-full bg-slate-950/70 text-slate-100 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition appearance-none cursor-pointer"
                  >
                    <option value="Simple Prototype">Simple Prototype (Clean & Lean)</option>
                    <option value="Standard Full-Stack">Standard Full-Stack (Scalable)</option>
                    <option value="Enterprise Scaled">Enterprise Scaled (Microservices/Robust)</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={!description.trim()}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 text-slate-950 font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-950/20 transition flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Initialize System Architecture</span>
              <ArrowRight className="h-4 w-4 text-slate-950 group-hover:translate-x-1 transition" />
            </button>
          </form>
        </div>

        {/* Sidebar Presets & Tips */}
        <div className="space-y-5">
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center gap-2 text-slate-200 mb-4 font-medium text-sm">
              <Lightbulb className="h-4 w-4 text-yellow-400" />
              <span>Click to load a preset template</span>
            </div>
            
            <div className="space-y-3">
              {PRESETS.map((preset) => (
                <button
                  key={preset.title}
                  onClick={() => applyPreset(preset)}
                  className="w-full text-left bg-slate-950/40 border border-slate-800/60 hover:bg-slate-900/80 hover:border-slate-700 p-3.5 rounded-xl transition cursor-pointer group"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-semibold text-slate-200 group-hover:text-emerald-400 transition">
                      {preset.title}
                    </span>
                    <span className="text-[10px] bg-slate-800/80 text-slate-400 px-2 py-0.5 rounded-full font-mono">
                      Preset
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-1.5">
                    {preset.description}
                  </p>
                  <div className="text-[10px] text-slate-500 font-mono">
                    Tech: {preset.tech}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800/80 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center gap-2 text-slate-200 mb-2 font-medium text-sm">
              <HelpCircle className="h-4 w-4 text-emerald-400" />
              <span>What is a Software Blueprint?</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              An interactive blueprint helps you model your system prior to writing files. By mapping your data and endpoints, Gemini can scaffold robust boilerplate controller and component code with zero guesswork.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
