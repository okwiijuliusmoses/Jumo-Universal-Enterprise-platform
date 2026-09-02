export class ShellActivationManager {
  constructor() {
    this.isActive = false;
  }
  
  activateShell(state) {
    console.log('[UEOS] Activating Shell');
    this.isActive = true;
    
    // Set appropriate state variables to bypass boot sequence
    state.bootComplete = true;
    if (!state.bootStatus) state.bootStatus = [];
    if (!state.bootStatus.includes("UEOS Shell Loaded")) {
       state.bootStatus.push("UEOS Shell Loaded");
    }
    
    // Call the global render function
    if (typeof window.render === 'function') {
      window.render();
    }
  }
}
export const shellActivationManager = new ShellActivationManager();
