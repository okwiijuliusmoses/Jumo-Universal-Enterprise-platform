const fs = require('fs');
let content = fs.readFileSync('experience/control-center/index.js', 'utf8');

const faapRegex = /if \(view === 'faap'\) \{[\s\S]*?(?=\}\s*if \(view === 'aegis'\))/;

const newFaap = `if (view === 'faap') {
    html = \`
      <div class="space-y-6">
        <div class="flex items-center justify-between bg-emerald-900 rounded-xl p-6 shadow-md border border-emerald-800 text-white">
          <div>
            <h2 class="text-2xl font-bold">FAAP Treasury & Multi-Currency Ledger</h2>
            <p class="text-emerald-200 text-sm mt-1">Enterprise Financial Operating Platform</p>
          </div>
          <div class="flex items-center gap-4">
             <div class="text-right">
                <p class="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">Total Liquidity Position</p>
                <p class="text-3xl font-bold font-mono">$1.42B</p>
             </div>
             <button class="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 rounded-lg text-sm font-bold shadow transition flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg> Create Transaction
             </button>
          </div>
        </div>
        
        <!-- FAAP Sub-Modules Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
           \${['General Ledger', 'Budgeting', 'Accounts Payable', 'Accounts Receivable', 'Payroll', 'Treasury', 'Bank Reconciliation', 'Cash Management', 'Assets', 'Procurement', 'Tax', 'Revenue', 'Settlement', 'Wallets', 'Financial Reports'].map(mod => \`
              <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-center items-center text-center group">
                 <div class="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 group-hover:bg-emerald-100 transition">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                 </div>
                 <h3 class="text-xs font-bold text-slate-800 leading-tight">\${mod}</h3>
              </div>
           \`).join('')}
        </div>
        
        <!-- Real-Time Activity Ledger -->
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mt-8">
           <div class="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 class="font-bold text-slate-900 flex items-center gap-2">
                 <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> Global Settlement Queue
              </h3>
              <div class="flex gap-2">
                 <button class="px-3 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-slate-600">Export Ledger</button>
                 <button class="px-3 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-slate-600">Audit Trail</button>
              </div>
           </div>
           <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                 <thead>
                    <tr class="bg-white border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                       <th class="p-4">Transaction ID</th>
                       <th class="p-4">Module</th>
                       <th class="p-4">Counterparty / Description</th>
                       <th class="p-4 text-right">Amount</th>
                       <th class="p-4">Currency</th>
                       <th class="p-4">Status</th>
                    </tr>
                 </thead>
                 <tbody class="divide-y divide-slate-100 font-mono text-xs">
                    <tr class="hover:bg-slate-50 transition">
                       <td class="p-4 text-slate-900 font-bold">FAAP-TRX-82910</td>
                       <td class="p-4 text-slate-600">Accounts Payable</td>
                       <td class="p-4 text-slate-600">Supplier Vendor Settlement</td>
                       <td class="p-4 text-right text-rose-600 font-bold">-$45,000.00</td>
                       <td class="p-4 text-slate-500">USD</td>
                       <td class="p-4"><span class="px-2 py-1 bg-emerald-50 text-emerald-700 rounded border border-emerald-200 font-sans font-bold text-[10px]">CLEARED</span></td>
                    </tr>
                    <tr class="hover:bg-slate-50 transition">
                       <td class="p-4 text-slate-900 font-bold">FAAP-TRX-82911</td>
                       <td class="p-4 text-slate-600">Payroll</td>
                       <td class="p-4 text-slate-600">Monthly Institutional Payroll</td>
                       <td class="p-4 text-right text-rose-600 font-bold">-$1,250,000.00</td>
                       <td class="p-4 text-slate-500">USD</td>
                       <td class="p-4"><span class="px-2 py-1 bg-amber-50 text-amber-700 rounded border border-amber-200 font-sans font-bold text-[10px]">PENDING APPROVAL</span></td>
                    </tr>
                    <tr class="hover:bg-slate-50 transition">
                       <td class="p-4 text-slate-900 font-bold">FAAP-TRX-82912</td>
                       <td class="p-4 text-slate-600">Revenue</td>
                       <td class="p-4 text-slate-600">Tuition Collection Aggregation</td>
                       <td class="p-4 text-right text-emerald-600 font-bold">+$120,400.00</td>
                       <td class="p-4 text-slate-500">USD</td>
                       <td class="p-4"><span class="px-2 py-1 bg-emerald-50 text-emerald-700 rounded border border-emerald-200 font-sans font-bold text-[10px]">CLEARED</span></td>
                    </tr>
                 </tbody>
              </table>
           </div>
        </div>
      </div>
    \`;
  }`;

content = content.replace(faapRegex, newFaap);

fs.writeFileSync('experience/control-center/index.js', content, 'utf8');
console.log('Patched FAAP');
