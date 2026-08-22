// JUMO UEOS Production Module & Startup Diagnostic Tracer
export interface BootLogEntry {
  timestamp: string;
  milestone: string;
  module?: string;
  status: 'START' | 'COMPLETE' | 'PASS' | 'FAIL';
  details?: any;
  durationMs?: number;
}

declare global {
  interface Window {
    __JUMO_BOOT_LOGS__?: BootLogEntry[];
    __JUMO_TRACE_TIMERS__?: Record<string, number>;
    __JUMO_BOOT_MILESTONES__?: Record<string, string>;
  }
}

if (typeof window !== 'undefined') {
  if (!window.__JUMO_BOOT_LOGS__) {
    window.__JUMO_BOOT_LOGS__ = [];
    window.__JUMO_TRACE_TIMERS__ = {};
    window.__JUMO_BOOT_MILESTONES__ = {};

    const recordLog = (entry: BootLogEntry) => {
      window.__JUMO_BOOT_LOGS__!.push(entry);
      const prefix = `[JUMO_BOOT_${entry.status}]`;
      const timeStr = `+${performance.now().toFixed(2)}ms`;
      console.log(`%c${prefix} ${entry.milestone}${entry.module ? ` (${entry.module})` : ''} ${timeStr}`, 'color: #3b82f6; font-weight: bold;', entry.details || '');
    };

    // Global Error Listeners
    window.onerror = (message, source, lineno, colno, error) => {
      recordLog({
        timestamp: new Date().toISOString(),
        milestone: 'UNCAUGHT_WINDOW_ERROR',
        status: 'FAIL',
        details: { message, source, lineno, colno, stack: error?.stack }
      });
      console.error('[CRITICAL_UNCAUGHT_ERROR]', { message, source, lineno, colno, error });
    };

    window.onunhandledrejection = (event) => {
      recordLog({
        timestamp: new Date().toISOString(),
        milestone: 'UNHANDLED_PROMISE_REJECTION',
        status: 'FAIL',
        details: { reason: event.reason, stack: event.reason?.stack }
      });
      console.error('[CRITICAL_UNHANDLED_REJECTION]', event.reason);
    };

    recordLog({
      timestamp: new Date().toISOString(),
      milestone: 'BOOT_START',
      status: 'PASS',
      details: { url: window.location.href, userAgent: navigator.userAgent }
    });
  }
}

export function logMilestone(milestone: string, status: 'PASS' | 'FAIL' = 'PASS', details?: any) {
  if (typeof window !== 'undefined' && window.__JUMO_BOOT_LOGS__) {
    window.__JUMO_BOOT_MILESTONES__![milestone] = status;
    window.__JUMO_BOOT_LOGS__.push({
      timestamp: new Date().toISOString(),
      milestone,
      status,
      details
    });
    console.log(`%c[MILESTONE: ${milestone}] -> ${status}`, status === 'PASS' ? 'color: #10b981; font-weight: bold;' : 'color: #ef4444; font-weight: bold;', details || '');
  }
}

export function traceModuleEntry(moduleName: string) {
  if (typeof window !== 'undefined' && window.__JUMO_BOOT_LOGS__) {
    window.__JUMO_TRACE_TIMERS__![moduleName] = performance.now();
    window.__JUMO_BOOT_LOGS__.push({
      timestamp: new Date().toISOString(),
      milestone: 'MODULE_EVALUATION',
      module: moduleName,
      status: 'START'
    });
    console.log(`%c[MODULE_ENTRY] >>> ${moduleName}`, 'color: #8b5cf6;');
  }
}

export function traceModuleExit(moduleName: string) {
  if (typeof window !== 'undefined' && window.__JUMO_BOOT_LOGS__) {
    const start = window.__JUMO_TRACE_TIMERS__![moduleName] || performance.now();
    const duration = performance.now() - start;
    window.__JUMO_BOOT_LOGS__.push({
      timestamp: new Date().toISOString(),
      milestone: 'MODULE_EVALUATION',
      module: moduleName,
      status: 'COMPLETE',
      durationMs: duration
    });
    console.log(`%c[MODULE_EXIT] <<< ${moduleName} (${duration.toFixed(2)}ms)`, 'color: #06b6d4;');
  }
}
