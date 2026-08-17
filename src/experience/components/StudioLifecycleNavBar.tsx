// JUMO UEOS — Studio Dynamic Lifecycle Navigation Bar Component
// Renders studio-specific horizontal lifecycle bars dynamically derived from StudioLifecycleRegistry.

import React from 'react';
import { studioLifecycleRegistry, StudioLifecycleStage } from '../../core/hub/studios/StudioLifecycleRegistry';
import { CheckCircle2, Clock, AlertCircle, Shield, ChevronRight } from 'lucide-react';

interface StudioLifecycleNavBarProps {
  studioId: string;
  activeStageId?: string;
  onStageSelect?: (stageId: string) => void;
  className?: string;
}

export const StudioLifecycleNavBar: React.FC<StudioLifecycleNavBarProps> = ({
  studioId,
  activeStageId,
  onStageSelect,
  className = ''
}) => {
  const definition = studioLifecycleRegistry.getStudioLifecycle(studioId);

  if (!definition) {
    return null;
  }

  const currentStage = activeStageId || definition.activeStageId;

  return (
    <div className={`bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl ${className}`}>
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-black text-slate-200 tracking-wider uppercase">
            {definition.studioName} Lifecycle Flow
          </span>
        </div>
        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-slate-800 text-slate-400 rounded-md">
          {definition.category} DOMAIN
        </span>
      </div>

      {/* Horizontal Lifecycle Stepper */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {definition.stages.map((stage: StudioLifecycleStage, idx: number) => {
          const isActive = stage.id === currentStage;
          const isCompleted = stage.status === 'COMPLETED';
          const isInProgress = stage.status === 'IN_PROGRESS';

          return (
            <React.Fragment key={stage.id}>
              <button
                onClick={() => {
                  studioLifecycleRegistry.setActiveStage(studioId, stage.id);
                  onStageSelect?.(stage.id);
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-all shrink-0 border ${
                  isActive
                    ? 'bg-emerald-500/10 border-emerald-500/50 text-white shadow-lg shadow-emerald-950/50'
                    : isCompleted
                    ? 'bg-slate-800/80 border-slate-700/60 text-slate-300 hover:border-slate-600'
                    : isInProgress
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-200'
                    : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-400'
                }`}
              >
                {/* Status Indicator Icon */}
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : isInProgress ? (
                  <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse shrink-0" />
                ) : (
                  <span className="w-3.5 h-3.5 rounded-full border border-slate-600 flex items-center justify-center text-[8px] font-mono text-slate-500 shrink-0">
                    {stage.order}
                  </span>
                )}

                <div>
                  <div className="text-[11px] font-bold tracking-tight whitespace-nowrap">
                    {stage.name}
                  </div>
                  <div className="text-[9px] text-slate-400 hidden sm:block truncate max-w-[120px]">
                    {stage.description}
                  </div>
                </div>
              </button>

              {idx < definition.stages.length - 1 && (
                <ChevronRight className="w-3.5 h-3.5 text-slate-700 shrink-0" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
