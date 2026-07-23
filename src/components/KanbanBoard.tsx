import React, { useState } from "react";
import { Plus, Check, Play, RotateCcw, Tag, X, ChevronRight, FileText } from "lucide-react";
import { KanbanTask } from "../types";

interface KanbanBoardProps {
  tasks: KanbanTask[];
  onUpdateTasks: (updatedTasks: KanbanTask[]) => void;
}

export default function KanbanBoard({ tasks, onUpdateTasks }: KanbanBoardProps) {
  const [selectedTask, setSelectedTask] = useState<KanbanTask | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newPhase, setNewPhase] = useState("Phase 1: Setup");

  const moveTask = (taskId: string, newStatus: "todo" | "doing" | "done") => {
    const updated = tasks.map((t) => {
      if (t.id === taskId) {
        return { ...t, status: newStatus };
      }
      return t;
    });
    onUpdateTasks(updated);
    if (selectedTask?.id === taskId) {
      setSelectedTask({ ...selectedTask, status: newStatus });
    }
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: KanbanTask = {
      id: `task_custom_${Date.now()}`,
      title: newTitle,
      description: newDesc,
      phase: newPhase,
      status: "todo",
    };

    onUpdateTasks([...tasks, newTask]);
    setNewTitle("");
    setNewDesc("");
    setShowAddModal(false);
  };

  const getPhaseBadgeColor = (phase: string) => {
    const p = phase.toLowerCase();
    if (p.includes("setup") || p.includes("1")) return "bg-amber-950/40 text-amber-400 border-amber-800/30";
    if (p.includes("database") || p.includes("db") || p.includes("2")) return "bg-purple-950/40 text-purple-400 border-purple-800/30";
    if (p.includes("api") || p.includes("backend") || p.includes("3")) return "bg-blue-950/40 text-blue-400 border-blue-800/30";
    return "bg-emerald-950/40 text-emerald-400 border-emerald-800/30";
  };

  const columns = [
    { id: "todo", title: "To Do", color: "border-t-slate-500 bg-slate-900/10" },
    { id: "doing", title: "In Progress", color: "border-t-blue-500 bg-blue-950/5" },
    { id: "done", title: "Done", color: "border-t-emerald-500 bg-emerald-950/5" },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Board Controls */}
      <div className="flex justify-between items-center bg-slate-950/15 border border-slate-800/60 p-4 rounded-xl">
        <div>
          <h3 className="text-sm font-semibold text-white">Sprint Kanban Planner</h3>
          <p className="text-xs text-slate-400">Track and manage your implementation tasks</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition cursor-pointer"
        >
          <Plus className="h-4 w-4 text-slate-950" />
          <span>Add Custom Task</span>
        </button>
      </div>

      {/* Board Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.id);
          return (
            <div
              key={col.id}
              className={`border border-slate-800 border-t-2 rounded-2xl p-4 flex flex-col min-h-[400px] max-h-[500px] overflow-y-auto ${col.color}`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4 border-b border-slate-800/60 pb-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">{col.title}</span>
                <span className="text-[10px] font-mono font-bold bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">
                  {colTasks.length}
                </span>
              </div>

              {/* Task Cards */}
              <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                {colTasks.length > 0 ? (
                  colTasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => setSelectedTask(task)}
                      className="bg-slate-950/40 border border-slate-800/80 hover:border-slate-700/80 p-3.5 rounded-xl transition cursor-pointer shadow-sm hover:shadow-md flex flex-col gap-2 group"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-xs font-semibold text-slate-200 group-hover:text-emerald-400 transition leading-tight">
                          {task.title}
                        </span>
                      </div>
                      
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {task.description}
                      </p>

                      <div className="flex justify-between items-center mt-1 pt-1.5 border-t border-slate-900/60">
                        <span className={`text-[9px] font-mono border px-1.5 py-0.5 rounded ${getPhaseBadgeColor(task.phase)}`}>
                          {task.phase.split(":")[1]?.trim() || task.phase}
                        </span>
                        
                        {/* Quick state movers */}
                        <div className="flex gap-1.5" onClick={(e) => e.stopPropagation()}>
                          {task.status === "todo" && (
                            <button
                              onClick={() => moveTask(task.id, "doing")}
                              title="Start Task"
                              className="p-1 hover:bg-slate-800 rounded text-slate-500 hover:text-blue-400 transition cursor-pointer"
                            >
                              <Play className="h-3 w-3 fill-current" />
                            </button>
                          )}
                          {task.status === "doing" && (
                            <button
                              onClick={() => moveTask(task.id, "done")}
                              title="Complete Task"
                              className="p-1 hover:bg-slate-800 rounded text-slate-500 hover:text-emerald-400 transition cursor-pointer"
                            >
                              <Check className="h-3 w-3" />
                            </button>
                          )}
                          {task.status === "done" && (
                            <button
                              onClick={() => moveTask(task.id, "doing")}
                              title="Move Back"
                              className="p-1 hover:bg-slate-800 rounded text-slate-500 hover:text-amber-400 transition cursor-pointer"
                            >
                              <RotateCcw className="h-3 w-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-slate-600 border border-dashed border-slate-800/80 rounded-xl">
                    <CheckCircleIcon className="h-5 w-5 mb-1 opacity-40" />
                    <span className="text-[10px] font-mono">Column Empty</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Task Details Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl shadow-2xl p-6 relative">
            <button
              onClick={() => setSelectedTask(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-200 transition cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-mono font-bold uppercase border px-2 py-0.5 rounded ${getPhaseBadgeColor(selectedTask.phase)}`}>
                  {selectedTask.phase}
                </span>
                <span className="text-[10px] font-mono uppercase bg-slate-800 px-2 py-0.5 rounded text-slate-400">
                  Status: {selectedTask.status}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-2">{selectedTask.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap bg-slate-950/40 p-4 rounded-xl border border-slate-800/50">
                  {selectedTask.description}
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                {selectedTask.status !== "todo" && (
                  <button
                    onClick={() => {
                      moveTask(selectedTask.id, "todo");
                    }}
                    className="border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-slate-300 font-semibold text-xs px-4 py-2.5 rounded-lg transition cursor-pointer"
                  >
                    Move to To-Do
                  </button>
                )}
                {selectedTask.status !== "doing" && (
                  <button
                    onClick={() => {
                      moveTask(selectedTask.id, "doing");
                    }}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition cursor-pointer"
                  >
                    Move to In Progress
                  </button>
                )}
                {selectedTask.status !== "done" && (
                  <button
                    onClick={() => {
                      moveTask(selectedTask.id, "done");
                    }}
                    className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-lg transition cursor-pointer"
                  >
                    Mark Complete
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Custom Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl shadow-2xl p-6 relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-200 transition cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-4">Add Custom task</h3>
            
            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Task Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Implement user login flow"
                  className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500/50 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Description
                </label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Detail the steps required..."
                  rows={3}
                  className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500/50 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Project Phase Mapping
                </label>
                <select
                  value={newPhase}
                  onChange={(e) => setNewPhase(e.target.value)}
                  className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500/50 cursor-pointer"
                >
                  <option value="Phase 1: Setup">Phase 1: Setup</option>
                  <option value="Phase 2: Database">Phase 2: Database</option>
                  <option value="Phase 3: APIs">Phase 3: APIs</option>
                  <option value="Phase 4: Frontend">Phase 4: Frontend</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-slate-300 font-semibold text-xs px-4 py-2.5 rounded-lg transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs px-4 py-2.5 rounded-lg transition cursor-pointer"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Simple Helper Icon component
function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
