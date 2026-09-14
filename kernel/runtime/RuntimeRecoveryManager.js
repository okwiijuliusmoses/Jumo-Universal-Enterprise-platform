export class RuntimeRecoveryManager {
  constructor() {
    this.degradedMode = false;
    this.failedServices = [];
  }

  catchError(error, serviceId) {
    console.error(`[UEOS Recovery] Captured error in service: ${serviceId}`, error);
    this.failedServices.push({ id: serviceId, error: error.message || error });
    this.degradedMode = true;
  }

  displayRecoveryScreen() {
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = `
        <div class="fixed inset-0 bg-slate-900 text-white flex flex-col items-center justify-center p-6 font-mono text-xs z-50">
          <div class="max-w-2xl w-full bg-slate-800 p-8 rounded-2xl border border-amber-500 shadow-2xl space-y-4">
            <h1 class="text-amber-500 font-bold text-base mb-1">JUMO UEOS RUNTIME DEGRADED</h1>
            <p class="text-slate-400">Some critical services failed to initialize. The platform is operating in degraded mode.</p>
            <div class="bg-slate-950 p-4 rounded text-amber-300 overflow-x-auto text-[11px] space-y-2">
              ${this.failedServices.map(s => `<div><span class="text-slate-500">Service:</span> ${s.id} <span class="text-slate-500">Error:</span> ${s.error}</div>`).join('')}
            </div>
            <div class="flex gap-4">
               <button onclick="window.location.reload()" class="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg transition-colors cursor-pointer">Retry Boot</button>
               <button onclick="window.continueDegraded()" class="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-colors cursor-pointer">Continue Degraded</button>
            </div>
          </div>
        </div>
      `;
    }
  }
}
export const runtimeRecoveryManager = new RuntimeRecoveryManager();

if (typeof window !== 'undefined') {
  window.continueDegraded = function() {
    if (window.state) {
      window.state.bootComplete = true;
      if (typeof window.render === 'function') {
        window.render();
      }
    }
  };
}
