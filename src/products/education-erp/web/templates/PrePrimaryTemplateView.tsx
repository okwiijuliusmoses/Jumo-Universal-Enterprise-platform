import React, { useState } from 'react';
import { 
  Baby, ShieldCheck, Smile, Clock, Utensils, Sparkles, 
  Users, DollarSign, Heart, Plus, Search, Filter, CheckCircle2,
  Calendar, AlertTriangle, Phone, Activity
} from 'lucide-react';

export const PrePrimaryTemplateView: React.FC<{ activeSubmodule: string }> = ({ activeSubmodule }) => {
  const [children, setChildren] = useState([
    { id: 'CHD-001', name: 'Liam Ethan Otim', class: 'Top Class (Giraffes)', age: '5 yrs 2 mos', guardian: 'Eng. Julius Moses (Father)', phone: '+256 772 100 234', allergy: 'Peanuts / Lactose', status: 'Present (07:42 AM)', pickupCode: 'PU-8829' },
    { id: 'CHD-002', name: 'Chloe Amara Nakato', class: 'Middle Class (Butterflies)', age: '4 yrs 1 mo', guardian: 'Dr. Sarah Nabirye (Mother)', phone: '+256 701 445 119', allergy: 'None', status: 'Present (07:55 AM)', pickupCode: 'PU-9104' },
    { id: 'CHD-003', name: 'Noah Gabriel Mugisha', class: 'Baby Class (Teddy Bears)', age: '2 yrs 10 mos', guardian: 'David & Mary Mugisha', phone: '+256 788 991 223', allergy: 'Asthma Inhaler on File', status: 'Present (08:10 AM)', pickupCode: 'PU-3341' },
    { id: 'CHD-004', name: 'Maya Zawadi', class: 'Daycare Infants (Little Stars)', age: '1 yr 4 mos', guardian: 'Amina K. (Mother)', phone: '+256 752 334 881', allergy: 'Lactose Intolerant', status: 'Present (08:05 AM)', pickupCode: 'PU-6712' }
  ]);

  const [milestones, setMilestones] = useState([
    { child: 'Liam Ethan Otim', category: 'Cognitive & Math', milestone: 'Counts sequentially 1-50 & identifies 2D geometric shapes', status: 'Mastered', date: '2026-08-18' },
    { child: 'Chloe Amara Nakato', category: 'Fine Motor Skills', milestone: 'Holds pencil with tripod grip and cuts along straight lines', status: 'In Progress', date: '2026-08-20' },
    { child: 'Noah Gabriel Mugisha', category: 'Language & Speech', milestone: 'Constructs 4-5 word sentences & recites morning rhymes', status: 'Mastered', date: '2026-08-19' },
    { child: 'Maya Zawadi', category: 'Gross Motor', milestone: 'Walking unassisted and climbs 3 soft foam steps safely', status: 'Mastered', date: '2026-08-21' }
  ]);

  const [meals, setMeals] = useState([
    { time: '09:30 AM', title: 'Morning Snack & Fresh Fruit', menu: 'Sliced Sweet Bananas & Warm Oat Porridge (Soy-milk available)', allergens: 'No tree nuts', check: '100% Served' },
    { time: '12:30 PM', title: 'Hot Nursery Lunch', menu: 'Steamed Pumpkin, Minced Chicken Stew, Mashed Potatoes & Greens', allergens: 'Lactose-free bowl prepared for 4 children', check: 'Inspected by Nurse' },
    { time: '03:30 PM', title: 'Afternoon Nap Recovery Snack', menu: 'Wholewheat Cracker Biscuits & Sliced Watermelon with Milk', allergens: 'Peanut-free facility guaranteed', check: 'Ready' }
  ]);

  return (
    <div className="space-y-6">
      {/* Template Header Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent p-5 rounded-2xl border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md">
            <Baby className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">Pre-Primary & Early Childhood Intelligence Hub</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">ECCE Certified</span>
            </div>
            <p className="text-xs text-slate-600">Child bio-records, authorized guardian verifications, meal logs & developmental milestone portfolios</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-xs transition">
            <Plus className="w-4 h-4" /> Enroll New Child
          </button>
        </div>
      </div>

      {/* Child Registry & Guardian Safety Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-bold text-slate-900">Child Directory & Guardian Pickup Authorizations</h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">4 Enrolled Sample Profiles</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Child ID & Name</th>
                <th className="py-3 px-4">Nursery Class & Age</th>
                <th className="py-3 px-4">Authorized Guardian</th>
                <th className="py-3 px-4">Medical / Allergies</th>
                <th className="py-3 px-4">Daily Status</th>
                <th className="py-3 px-4">Pickup Security Code</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {children.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{c.name}</div>
                    <div className="text-[10px] font-mono text-slate-400">{c.id}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 bg-amber-50 text-amber-800 font-medium rounded border border-amber-200 text-[11px]">{c.class}</span>
                    <div className="text-[10px] text-slate-500 mt-0.5">{c.age}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-slate-800">{c.guardian}</div>
                    <div className="text-[10px] text-slate-500">{c.phone}</div>
                  </td>
                  <td className="py-3 px-4">
                    {c.allergy.includes('None') ? (
                      <span className="text-slate-400 text-[11px] font-medium">None Reported</span>
                    ) : (
                      <span className="px-2 py-0.5 bg-rose-50 text-rose-700 border border-rose-200 rounded font-semibold text-[10px] inline-flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-rose-500" /> {c.allergy}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded border border-emerald-200 text-[10px] inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {c.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-1 bg-slate-900 text-amber-400 font-mono font-bold rounded text-[11px] tracking-wider">
                      {c.pickupCode}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grid of Milestones & Daily Nutrition Logs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Developmental Milestones */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Smile className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-bold text-slate-900">Child Developmental Milestone Tracking</h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Term 1 Assessment</span>
          </div>

          <div className="space-y-3">
            {milestones.map((m, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-800">{m.child}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${m.status === 'Mastered' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                    {m.status}
                  </span>
                </div>
                <div className="text-[11px] font-semibold text-amber-700">{m.category}</div>
                <p className="text-xs text-slate-600">{m.milestone}</p>
                <div className="text-[10px] text-slate-400 font-mono">Recorded: {m.date}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Nutrition & Meals Planner */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Utensils className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-bold text-slate-900">Today's Nutrition, Diet & Snack Schedule</h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">Dietician Approved</span>
          </div>

          <div className="space-y-3">
            {meals.map((meal, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-amber-500 text-white font-mono text-[10px] font-bold rounded">{meal.time}</span>
                    <span className="font-bold text-xs text-slate-800">{meal.title}</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{meal.check}</span>
                </div>
                <p className="text-xs text-slate-600 font-medium">{meal.menu}</p>
                <div className="text-[11px] text-rose-600 font-semibold">{meal.allergens}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
