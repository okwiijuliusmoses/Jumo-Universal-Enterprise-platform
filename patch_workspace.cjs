const fs = require('fs');
let content = fs.readFileSync('experience/workspace/index.js', 'utf8');

// Replace tab name
content = content.replace(/📊 Dashboard Metrics/g, '⚙️ Workspace Overview');

// Replace the dashboard content with something dynamic based on workflows and forms
const startToken = "                ${state.activeComponentId === 'dashboard' ? `";
const endToken = "                ` : ''}";
const startIndex = content.indexOf(startToken);
// Find the first instance of endToken after startIndex
let endIndex = content.indexOf(endToken, startIndex);
if (startIndex !== -1 && endIndex !== -1) {
    const replacement = `                \${state.activeComponentId === 'dashboard' ? \`
                  <div class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div class="p-6 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col">
                        <h4 class="font-bold text-slate-800 text-sm mb-2">My Pending Actions</h4>
                        <div class="flex-1 bg-white border border-slate-200 rounded-xl p-4 overflow-y-auto">
                            \${state.submittedForms.filter(f => f.status === 'Pending You' || f.status === 'PENDING').length > 0 ? 
                                state.submittedForms.filter(f => f.status === 'Pending You' || f.status === 'PENDING').map(f => \`
                                    <div class="mb-3 pb-3 border-b border-slate-100 last:border-0 last:mb-0 last:pb-0">
                                        <div class="text-[11px] font-bold text-slate-700">\${f.formName}</div>
                                        <div class="text-[10px] text-slate-500 mt-1">Applicant: \${f.applicant}</div>
                                    </div>
                                \`).join('') 
                            : '<div class="text-[11px] text-slate-500 flex items-center justify-center h-full">No pending actions requiring your attention.</div>'}
                        </div>
                      </div>
                      <div class="p-6 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col">
                        <h4 class="font-bold text-slate-800 text-sm mb-2">Recent System Events</h4>
                        <div class="flex-1 bg-white border border-slate-200 rounded-xl p-4 overflow-y-auto">
                            \${state.portalActionLogs.length > 0 ? 
                                state.portalActionLogs.slice(0, 5).map(log => \`
                                    <div class="mb-3 pb-3 border-b border-slate-100 last:border-0 last:mb-0 last:pb-0">
                                        <div class="text-[10px] text-slate-400 mb-0.5">\${log.time}</div>
                                        <div class="text-[11px] font-medium text-slate-700">\${log.action}</div>
                                    </div>
                                \`).join('')
                            : '<div class="text-[11px] text-slate-500 flex items-center justify-center h-full">No recent operational events recorded.</div>'}
                        </div>
                      </div>
                    </div>
                    <div class="p-6 bg-white text-slate-800 rounded-2xl border border-slate-200">
                      <h3 class="font-bold text-sm mb-3">Module Operations (\${selectedModule.components.length} Capabilities)</h3>
                      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 text-[10px] font-mono text-slate-600">
                        \${selectedModule.components.map(comp => \`
                          <div class="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2 font-semibold">
                            <span class="text-blue-500">&bull;</span>
                            <span class="truncate">\${comp}</span>
                          </div>
                        \`).join('')}
                      </div>
                    </div>
                  </div>
`;
    content = content.substring(0, startIndex) + replacement + content.substring(endIndex);
    fs.writeFileSync('experience/workspace/index.js', content);
    console.log('Fixed dashboard metrics');
} else {
    console.log('Could not find dashboard metrics block');
}
