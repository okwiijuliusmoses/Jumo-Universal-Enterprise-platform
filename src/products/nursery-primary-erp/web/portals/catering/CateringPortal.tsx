import React, { useState, useEffect } from 'react';
import {
  Utensils,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Plus,
  Search,
  ClipboardCheck,
  Package,
  ChefHat,
  X
} from 'lucide-react';
import {
  cateringService,
  WeeklyMenuItem,
  StudentDietaryRestriction,
  KitchenFoodRationItem,
  FoodSafetyInspectionLog,
  DailyMealServingLog
} from '../../../domain/CateringService';

export const CateringPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'menu' | 'dietary' | 'inventory' | 'hygiene' | 'servings'>('dashboard');
  const [menus, setMenus] = useState<WeeklyMenuItem[]>([]);
  const [dietaryProfiles, setDietaryProfiles] = useState<StudentDietaryRestriction[]>([]);
  const [inventory, setInventory] = useState<KitchenFoodRationItem[]>([]);
  const [inspections, setInspections] = useState<FoodSafetyInspectionLog[]>([]);
  const [servings, setServings] = useState<DailyMealServingLog[]>([]);
  const [stats, setStats] = useState(cateringService.getCateringStats());
  const [searchTerm, setSearchTerm] = useState('');

  // Modals
  const [showDietaryModal, setShowDietaryModal] = useState(false);
  const [showInspectionModal, setShowInspectionModal] = useState(false);
  const [showInventoryModal, setShowInventoryModal] = useState(false);

  const refreshData = () => {
    setMenus(cateringService.getWeeklyMenus());
    setDietaryProfiles(cateringService.getDietaryRestrictions());
    setInventory(cateringService.getRationsInventory());
    setInspections(cateringService.getInspections());
    setServings(cateringService.getMealServingLogs());
    setStats(cateringService.getCateringStats());
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-hidden text-slate-800">
      {/* Top Banner / Office Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-amber-50 text-amber-700 rounded-lg border border-amber-100">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-slate-900">Catering, Dining & Nutrition Office</h2>
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-amber-100 text-amber-800 rounded">
                ECD & Primary Nutrition
              </span>
            </div>
            <p className="text-xs text-slate-500">Child Menu Planning, Dietary Restrictions, Kitchen Rations & Food Safety Compliance</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'dashboard' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('menu')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'menu' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Weekly Menu Plan ({menus.length})
          </button>
          <button
            onClick={() => setActiveTab('dietary')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'dietary' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Dietary Precautions ({dietaryProfiles.length})
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'inventory' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Kitchen Rations ({inventory.length})
          </button>
          <button
            onClick={() => setActiveTab('hygiene')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'hygiene' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Food Hygiene Audits
          </button>
          <button
            onClick={() => setActiveTab('servings')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'servings' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Daily Servings
          </button>

          <button
            onClick={() => setShowDietaryModal(true)}
            className="flex items-center px-3.5 py-1.5 text-xs font-semibold rounded-md bg-amber-600 text-white hover:bg-amber-700 shadow-sm ml-2"
          >
            <Plus className="w-3.5 h-3.5 mr-1" /> Add Dietary Profile
          </button>
        </div>
      </div>

      {/* Main Workspace Body */}
      <div className="flex-1 overflow-auto p-6">
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 max-w-7xl mx-auto">
            {/* Stat Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">Planned Weekly Menus</p>
                  <p className="text-2xl font-bold text-amber-700 mt-1">{stats.totalWeeklyPlannedMeals} Scheduled</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                  <Utensils className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-rose-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-rose-700">Special Dietary Needs</p>
                  <p className="text-2xl font-bold text-rose-800 mt-1">{stats.specialDietPupilsCount} Pupils</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
                  <AlertTriangle className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">Low Ration Items</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{stats.lowStockRationsCount} Alerts</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                  <Package className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-emerald-700">Kitchen Hygiene Score</p>
                  <p className="text-2xl font-bold text-emerald-800 mt-1">{stats.averageHygieneScore}%</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <ClipboardCheck className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Two Column Layout: Today's Menu Highlight & Critical Dietary Watchlist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Weekly Menu Snapshot */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-amber-600" />
                    <h3 className="text-sm font-bold text-slate-800">Weekly Nutrition & Dining Plan</h3>
                  </div>
                  <button onClick={() => setActiveTab('menu')} className="text-xs text-amber-600 hover:underline">
                    Full Timetable
                  </button>
                </div>
                <div className="space-y-3">
                  {menus.slice(0, 3).map(m => (
                    <div key={m.id} className="p-3 bg-amber-50/40 rounded-lg border border-amber-100 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-xs text-amber-900 bg-white px-2 py-0.5 rounded border border-amber-200">
                          {m.dayOfWeek} &bull; {m.mealType.replace(/_/g, ' ')}
                        </span>
                        <span className="text-[11px] text-slate-500">{m.approximateCalories} kcal</span>
                      </div>
                      <p className="text-xs font-bold text-slate-900 pt-1">
                        {m.title}
                      </p>
                      <p className="text-xs text-slate-600">
                        {m.description}
                      </p>
                      <p className="text-[11px] text-amber-800 italic">
                        {m.nutritionalHighlights}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Dietary Watchlist */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                  <div className="flex items-center space-x-2">
                    <ChefHat className="w-4 h-4 text-rose-600" />
                    <h3 className="text-sm font-bold text-slate-800">Special Dietary & Allergy Precautions</h3>
                  </div>
                  <button onClick={() => setActiveTab('dietary')} className="text-xs text-amber-600 hover:underline">
                    View Registry
                  </button>
                </div>
                <div className="space-y-3">
                  {dietaryProfiles.map(p => (
                    <div key={p.id} className="p-3 bg-rose-50/40 rounded-lg border border-rose-100 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="text-xs font-bold text-slate-900">{p.studentName}</h4>
                            <span className="text-[10px] bg-white border border-rose-200 text-rose-800 px-1.5 py-0.2 rounded font-semibold">
                              {p.classGrade}
                            </span>
                          </div>
                          <p className="text-xs text-rose-700 font-bold mt-1">
                            {p.restrictionCategory.replace(/_/g, ' ')} ({p.severityLevel})
                          </p>
                        </div>
                        <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                          {p.medicalNoteVerified ? 'Doctor Certified' : 'Pending'}
                        </span>
                      </div>

                      <div className="mt-2 pt-2 border-t border-rose-100 flex justify-between items-center text-[11px]">
                        <span className="text-slate-600 font-medium">Alternative: {p.substituteMealRequired}</span>
                        <span className="text-rose-800 font-mono text-[10px] bg-rose-100 px-1.5 py-0.2 rounded">
                          {p.customDietNotes}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* WEEKLY MENU PLAN TAB */}
        {activeTab === 'menu' && (
          <div className="space-y-4 max-w-7xl mx-auto">
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Termly Weekly Nutrition & Meal Master Plan</h3>
                <p className="text-xs text-slate-500">Curated recipes adhering to national child nutrition guidelines and balanced food pyramid</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {menus.map(m => (
                <div key={m.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-3">
                  <div className="pb-2 border-b border-slate-100 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-xs text-amber-900 bg-amber-50 px-2.5 py-1 rounded">
                        {m.dayOfWeek}
                      </span>
                      <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        {m.mealType.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-600">{m.approximateCalories} kcal</span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{m.title}</h4>
                    <p className="text-xs text-slate-600 mt-1">{m.description}</p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs space-y-1">
                    <p><span className="font-semibold text-slate-700">Ingredients:</span> {m.ingredients.join(', ')}</p>
                    {m.allergensPresent.length > 0 ? (
                      <p><span className="font-semibold text-rose-700">Allergens Present:</span> {m.allergensPresent.join(', ')}</p>
                    ) : (
                      <p><span className="font-semibold text-emerald-700">Allergen Free</span></p>
                    )}
                    <p className="text-amber-800 italic pt-1">{m.nutritionalHighlights}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DIETARY PRECAUTIONS TAB */}
        {activeTab === 'dietary' && (
          <div className="space-y-4 max-w-7xl mx-auto">
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="relative w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search student or allergy..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-md text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
              <button
                onClick={() => setShowDietaryModal(true)}
                className="flex items-center px-4 py-2 text-xs font-semibold rounded-md bg-amber-600 text-white hover:bg-amber-700 shadow-sm"
              >
                <Plus className="w-4 h-4 mr-1.5" /> Add Student Dietary Record
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {dietaryProfiles
                .filter(p => p.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || p.restrictionCategory.toLowerCase().includes(searchTerm.toLowerCase()))
                .map(p => (
                  <div key={p.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">{p.studentName}</h4>
                          <p className="text-xs text-slate-500">{p.classGrade} &bull; ID: {p.studentId}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.severityLevel === 'SEVERE_ANAPHYLACTIC' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {p.severityLevel}
                        </span>
                      </div>

                      <div className="mt-4 space-y-2 text-xs">
                        <div className="p-2.5 bg-rose-50/50 rounded border border-rose-100">
                          <span className="text-[10px] font-bold uppercase text-rose-700 block mb-1">Declared Restriction</span>
                          <span className="text-xs font-bold text-slate-900">
                            {p.restrictionCategory.replace(/_/g, ' ')}
                          </span>
                          {p.emergencySymptoms && (
                            <p className="text-[11px] text-rose-800 mt-1">Symptoms: {p.emergencySymptoms}</p>
                          )}
                        </div>

                        <div className="p-2.5 bg-amber-50/50 rounded border border-amber-100">
                          <span className="text-[10px] font-bold uppercase text-amber-800 block mb-0.5">Kitchen Substitute</span>
                          <p className="text-slate-800 font-semibold">{p.substituteMealRequired}</p>
                        </div>

                        <div className="p-2 bg-slate-50 rounded border border-slate-100">
                          <span className="text-[10px] font-semibold text-slate-400 block">Chef Instructions:</span>
                          <p className="text-[11px] text-slate-600">{p.customDietNotes}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* KITCHEN RATIONS INVENTORY TAB */}
        {activeTab === 'inventory' && (
          <div className="space-y-4 max-w-7xl mx-auto">
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Dry Goods & Fresh Produce Kitchen Store</h3>
                <p className="text-xs text-slate-500">Track dry cereals, dairy rations, cooking oils, and fresh farm deliveries</p>
              </div>
              <button
                onClick={() => setShowInventoryModal(true)}
                className="flex items-center px-4 py-2 text-xs font-semibold rounded-md bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm"
              >
                <Plus className="w-4 h-4 mr-1.5" /> Log Ration Stock In
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-3">Item Code</th>
                    <th className="px-5 py-3">Item Name</th>
                    <th className="px-5 py-3">Category</th>
                    <th className="px-5 py-3">Current Stock</th>
                    <th className="px-5 py-3">Reorder Point</th>
                    <th className="px-5 py-3">Unit Price</th>
                    <th className="px-5 py-3">Supplier</th>
                    <th className="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {inventory.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="px-5 py-3.5 font-mono text-slate-500">{item.itemCode}</td>
                      <td className="px-5 py-3.5 font-bold text-slate-900">{item.itemName}</td>
                      <td className="px-5 py-3.5">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-medium text-[10px]">
                          {item.category.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`px-2.5 py-0.5 rounded-full font-bold ${
                          item.quantityInStock <= item.minimumReorderThreshold
                            ? 'bg-rose-100 text-rose-800 border border-rose-200'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {item.quantityInStock} {item.unitOfMeasure}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-500">{item.minimumReorderThreshold} {item.unitOfMeasure}</td>
                      <td className="px-5 py-3.5 font-mono font-bold text-slate-900">UGX {item.unitPriceUgx.toLocaleString()}</td>
                      <td className="px-5 py-3.5 text-slate-700 font-medium">{item.supplierName}</td>
                      <td className="px-5 py-3.5 text-right">
                        <button
                          onClick={() => {
                            cateringService.issueRation(item.id, 2);
                            refreshData();
                          }}
                          className="text-amber-700 hover:text-amber-900 font-semibold mr-2"
                        >
                          Issue -2
                        </button>
                        <button
                          onClick={() => {
                            cateringService.restockInventory(item.id, 10);
                            refreshData();
                          }}
                          className="text-emerald-700 hover:text-emerald-900 font-semibold"
                        >
                          +10 Restock
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* FOOD SAFETY & HYGIENE TAB */}
        {activeTab === 'hygiene' && (
          <div className="space-y-4 max-w-7xl mx-auto">
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Kitchen & Dining Hygiene Compliance Audits</h3>
                <p className="text-xs text-slate-500">Official health safety inspections for water purification, utensil sterilization & cook staff health certificates</p>
              </div>
            </div>

            <div className="space-y-4">
              {inspections.map(insp => (
                <div key={insp.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between">
                  <div className="space-y-2 flex-1 pr-6">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-100">
                        {insp.logNumber}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">Lead Chef: {insp.leadChefName}</h4>
                      <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold">
                        Session: {insp.mealSession}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2 text-xs">
                      <div className="p-2 bg-slate-50 rounded border border-slate-100">
                        <span className="text-[10px] text-slate-500 block">Water Quality</span>
                        <span className="font-bold text-emerald-700">{insp.waterQualityCertified ? 'PASSED (Potable)' : 'FAILED'}</span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded border border-slate-100">
                        <span className="text-[10px] text-slate-500 block">Hot Holding Temp</span>
                        <span className="font-bold text-slate-900">{insp.hotHoldingTempC}°C</span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded border border-slate-100">
                        <span className="text-[10px] text-slate-500 block">Handwashing Hygiene</span>
                        <span className="font-bold text-emerald-700">{insp.handwashingHygieneCompliance ? 'Compliant' : 'Non-compliant'}</span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded border border-slate-100">
                        <span className="text-[10px] text-slate-500 block">Food Sample 48h</span>
                        <span className="font-bold text-emerald-700">{insp.foodSampleRetained48Hrs ? 'Retained' : 'Missing'}</span>
                      </div>
                    </div>

                    {insp.inspectionRemarks && (
                      <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-100 mt-2">
                        <span className="font-bold text-slate-700">Remarks:</span> {insp.inspectionRemarks}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 md:mt-0 flex flex-col justify-between items-end shrink-0">
                    <div className="text-right">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block">Cleanliness Score</span>
                      <span className="text-2xl font-bold text-emerald-700">{insp.cleanlinessScorePct}%</span>
                    </div>

                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded font-bold text-xs mt-3">
                      {insp.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SERVINGS TAB */}
        {activeTab === 'servings' && (
          <div className="space-y-4 max-w-7xl mx-auto">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Daily Dining Hall Meal Distribution Roster</h3>
                <p className="text-xs text-slate-500">Live portion records for ECD milk & porridge, Primary lunch, and special dietary substitutes</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-3">Date</th>
                    <th className="px-5 py-3">Meal Slot</th>
                    <th className="px-5 py-3">Expected Headcount</th>
                    <th className="px-5 py-3">Actual Portions Served</th>
                    <th className="px-5 py-3">Special Diets Prepared</th>
                    <th className="px-5 py-3">Leftovers Disposed</th>
                    <th className="px-5 py-3">Supervisor In Charge</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {servings.map(s => (
                    <tr key={s.id} className="hover:bg-slate-50">
                      <td className="px-5 py-3.5 text-slate-500">{s.date}</td>
                      <td className="px-5 py-3.5">
                        <span className="px-2 py-0.5 bg-amber-50 text-amber-800 rounded font-bold text-[10px]">
                          {s.mealType.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-600">{s.expectedStudentHeadcount} Students</td>
                      <td className="px-5 py-3.5 font-mono text-sm font-bold text-slate-900">{s.actualMealsServed} Portions</td>
                      <td className="px-5 py-3.5 font-mono text-rose-700 font-bold">{s.specialDietMealsServed} Special</td>
                      <td className="px-5 py-3.5 text-slate-500">{s.leftoverDisposalKg} KG</td>
                      <td className="px-5 py-3.5 text-slate-700 font-medium">{s.supervisorName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* DIETARY MODAL */}
      {showDietaryModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 bg-amber-50 border-b border-amber-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-amber-900">Add Student Dietary Restriction Profile</h3>
              <button onClick={() => setShowDietaryModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const fd = new FormData(form);

                cateringService.registerDietaryRestriction({
                  studentId: fd.get('studentId') as string,
                  studentName: fd.get('studentName') as string,
                  classGrade: fd.get('classGrade') as string,
                  restrictionCategory: fd.get('restrictionCategory') as any,
                  severityLevel: fd.get('severityLevel') as any,
                  emergencySymptoms: fd.get('symptoms') as string,
                  customDietNotes: fd.get('notes') as string,
                  substituteMealRequired: fd.get('substitute') as string,
                  medicalNoteVerified: true
                });

                refreshData();
                setShowDietaryModal(false);
              }}
              className="p-6 space-y-4 text-xs"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Student Name</label>
                  <input name="studentName" required type="text" placeholder="e.g. Alice Katusiime" className="w-full px-3 py-2 border border-slate-300 rounded text-xs outline-none focus:ring-1 focus:ring-amber-500" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Class / Section</label>
                  <input name="classGrade" required type="text" placeholder="e.g. Middle Class" className="w-full px-3 py-2 border border-slate-300 rounded text-xs outline-none focus:ring-1 focus:ring-amber-500" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Student ID</label>
                  <input name="studentId" required type="text" placeholder="STU-001" className="w-full px-3 py-2 border border-slate-300 rounded text-xs outline-none focus:ring-1 focus:ring-amber-500" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select name="restrictionCategory" className="w-full px-3 py-2 border border-slate-300 rounded text-xs bg-white">
                    <option value="NUT_ALLERGY">Nut Allergy</option>
                    <option value="LACTOSE_INTOLERANT">Lactose Intolerant</option>
                    <option value="GLUTEN_FREE">Gluten Free</option>
                    <option value="VEGETARIAN">Vegetarian</option>
                    <option value="HALAL">Halal</option>
                    <option value="DIABETIC_LOW_SUGAR">Diabetic Low-Sugar</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Severity</label>
                  <select name="severityLevel" className="w-full px-3 py-2 border border-slate-300 rounded text-xs bg-white">
                    <option value="MILD">Mild</option>
                    <option value="SEVERE_ANAPHYLACTIC">Severe Anaphylactic</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Emergency Symptoms</label>
                <input name="symptoms" placeholder="e.g. Facial swelling, hives..." className="w-full px-3 py-2 border border-slate-300 rounded text-xs outline-none focus:ring-1 focus:ring-amber-500" />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Approved Substitute Meal</label>
                <input name="substitute" required placeholder="e.g. Soya porridge / Steamed green grams" className="w-full px-3 py-2 border border-slate-300 rounded text-xs outline-none focus:ring-1 focus:ring-amber-500" />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Chef Handling Instructions</label>
                <textarea name="notes" rows={2} placeholder="Strictly clean cooking surfaces..." className="w-full px-3 py-2 border border-slate-300 rounded text-xs outline-none focus:ring-1 focus:ring-amber-500" />
              </div>

              <div className="pt-4 flex justify-end space-x-2 border-t border-slate-100">
                <button type="button" onClick={() => setShowDietaryModal(false)} className="px-4 py-2 border border-slate-300 text-slate-600 rounded text-xs font-semibold hover:bg-slate-50">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-amber-600 text-white rounded text-xs font-semibold hover:bg-amber-700 shadow-sm">
                  Save Dietary Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
