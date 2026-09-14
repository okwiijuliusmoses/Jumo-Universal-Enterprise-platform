/**
 * JUMO UEOS
 * National Enterprise Command View
 */

export function renderNationalCommandView(){

 const health = window.ueosControlPlane.health();

 return `

<section class="space-y-6">

<div class="bg-white border border-slate-200 rounded-2xl p-6">
<h2 class="text-xl font-bold text-slate-900">
JUMO UEOS National Enterprise Command Center
</h2>

<p class="text-sm text-slate-500 mt-2">
AI-driven sovereign digital enterprise operations plane.
</p>

<div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">

<div class="p-4 rounded-xl border">
<div class="font-bold">Runtime Fabric</div>
<div class="text-emerald-600 text-sm">
${health.runtime.status}
</div>
</div>

<div class="p-4 rounded-xl border">
<div class="font-bold">AI Intelligence</div>
<div class="text-emerald-600 text-sm">
${health.ai.enabled ? "ACTIVE":"OFFLINE"}
</div>
</div>

<div class="p-4 rounded-xl border">
<div class="font-bold">Control Plane</div>
<div class="text-emerald-600 text-sm">
${health.status}
</div>
</div>

</div>

</div>


<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

${commandCard(
"ERP Ecosystem Factory",
health.factories.erpFactoryManager.status
)}

${commandCard(
"Domain Registry",
health.registries.domains.domains + " Domains"
)}

${commandCard(
"Tenant Registry",
health.registries.tenants.tenants + " Tenants"
)}

${commandCard(
"Portal Registry",
health.registries.portals.portals + " Portals"
)}

</div>


<div class="bg-slate-50 border rounded-2xl p-5">

<h3 class="font-bold mb-3">
AI Enterprise Capabilities
</h3>

<ul class="text-sm space-y-2">

${health.ai.capabilities.map(
c=>`<li>✓ ${c}</li>`
).join("")}

</ul>

</div>

</section>

`;

}


function commandCard(title,value){

return `

<div class="bg-white border border-slate-200 rounded-xl p-4">

<div class="text-xs text-slate-500">
${title}
</div>

<div class="font-bold text-lg mt-2">
${value}
</div>

</div>

`;

}
