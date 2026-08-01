
export function getEnterpriseFooterHtml(){

return `
<footer class="bg-white border-t border-slate-200">

<div class="max-w-7xl mx-auto px-6 py-10">

<div class="grid grid-cols-1 md:grid-cols-4 gap-8">

<div>
<h3 class="font-bold text-slate-900">
JUMO DIGITAL HYBRID PLATFORM
</h3>

<p class="mt-3 text-sm text-slate-500 leading-relaxed">
A secure digital enterprise ecosystem powered by JUMO UEOS.
Enterprise applications, workflows, identity services, AI capabilities and digital transformation solutions.
</p>
</div>


<div>
<h4 class="font-semibold text-slate-800 mb-3">
Platform
</h4>

<p class="text-sm text-slate-500 leading-relaxed">
JUMO UEOS Architecture<br>
Enterprise Applications<br>
AI Services<br>
Digital Workflows
</p>
</div>


<div>
<h4 class="font-semibold text-slate-800 mb-3">
Services
</h4>

<p class="text-sm text-slate-500 leading-relaxed">
Identity Services<br>
Authentication<br>
Digital Documents<br>
Integrations
</p>
</div>


<div>
<h4 class="font-semibold text-slate-800 mb-3">
Information Hub
</h4>

<p class="text-sm text-slate-500 leading-relaxed">
Documentation<br>
Training Centre<br>
Security Centre<br>
Support Centre
</p>
</div>

</div>


<div class="mt-8 pt-6 border-t border-slate-100 text-center">

<p class="text-xs text-slate-500">
© ${new Date().getFullYear()} JUMO DIGITAL HYBRID PLATFORM
</p>

<p class="text-[11px] uppercase tracking-widest text-emerald-600 mt-2">
POWERED BY JUMO UEOS • UNIVERSAL ENTERPRISE OPERATING SYSTEM
</p>

</div>

</div>

</footer>
`;

}

