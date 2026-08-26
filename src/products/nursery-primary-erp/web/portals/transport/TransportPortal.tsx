import React, { useState, useEffect } from 'react';
import {
  Bus,
  Navigation,
  Users,
  CheckCircle,
  Clock,
  Plus,
  Search,
  Wrench,
  Fuel,
  MapPin,
  Phone,
  Calendar,
  AlertCircle,
  X,
  Play,
  CheckSquare
} from 'lucide-react';
import {
  transportService,
  TransportVehicle,
  TransportRoute,
  StudentTransportAllocation,
  DailyTripManifest,
  VehicleMaintenanceLog
} from '../../../domain/TransportService';

export const TransportPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'fleet' | 'routes' | 'allocations' | 'manifests' | 'maintenance'>('dashboard');
  const [vehicles, setVehicles] = useState<TransportVehicle[]>([]);
  const [routes, setRoutes] = useState<TransportRoute[]>([]);
  const [allocations, setAllocations] = useState<StudentTransportAllocation[]>([]);
  const [manifests, setManifests] = useState<DailyTripManifest[]>([]);
  const [maintenanceLogs, setMaintenanceLogs] = useState<VehicleMaintenanceLog[]>([]);
  const [stats, setStats] = useState(transportService.getTransportStats());
  const [searchTerm, setSearchTerm] = useState('');

  // Modals
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [showRouteModal, setShowRouteModal] = useState(false);
  const [showAllocationModal, setShowAllocationModal] = useState(false);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [selectedManifest, setSelectedManifest] = useState<DailyTripManifest | null>(null);

  const refreshData = () => {
    setVehicles(transportService.getVehicles());
    setRoutes(transportService.getRoutes());
    setAllocations(transportService.getAllocations());
    setManifests(transportService.getManifests());
    setMaintenanceLogs(transportService.getMaintenanceLogs());
    setStats(transportService.getTransportStats());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleUpdatePupilStatus = (manifestId: string, studentId: string, status: 'BOARDED' | 'ABSENT' | 'DROPPED_OFF') => {
    transportService.updateBoardingStatus(manifestId, studentId, status, 'Conductor Verification');
    refreshData();
    if (selectedManifest && selectedManifest.id === manifestId) {
      setSelectedManifest({
        ...selectedManifest,
        pupilEntries: selectedManifest.pupilEntries.map(p => p.studentId === studentId ? { ...p, status } : p)
      });
    }
  };

  const handleTripStatus = (manifestId: string, status: 'IN_TRANSIT' | 'COMPLETED') => {
    transportService.updateTripStatus(manifestId, status);
    refreshData();
    if (selectedManifest && selectedManifest.id === manifestId) {
      setSelectedManifest({
        ...selectedManifest,
        status
      });
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-hidden text-slate-800">
      {/* Top Banner / Office Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-blue-50 text-blue-700 rounded-lg border border-blue-100">
            <Bus className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-slate-900">Transport & Fleet Management</h2>
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-blue-100 text-blue-800 rounded">
                Pupil Shuttle Operations
              </span>
            </div>
            <p className="text-xs text-slate-500">School Buses, Route Logistics, Daily Boarding Rosters & Fleet Maintenance</p>
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
            onClick={() => setActiveTab('manifests')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'manifests' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Daily Boarding Manifests
          </button>
          <button
            onClick={() => setActiveTab('routes')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'routes' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Routes & Stages ({routes.length})
          </button>
          <button
            onClick={() => setActiveTab('allocations')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'allocations' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Pupil Allocations ({allocations.length})
          </button>
          <button
            onClick={() => setActiveTab('fleet')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'fleet' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Buses & Vans ({vehicles.length})
          </button>
          <button
            onClick={() => setActiveTab('maintenance')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'maintenance' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Fuel & Garage
          </button>

          <button
            onClick={() => setShowAllocationModal(true)}
            className="flex items-center px-3.5 py-1.5 text-xs font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700 shadow-sm ml-2"
          >
            <Plus className="w-3.5 h-3.5 mr-1" /> Allocate Pupil
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
              <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">Active Bus Fleet</p>
                  <p className="text-2xl font-bold text-blue-700 mt-1">{stats.activeFleet} / {stats.totalFleet} Vehicles</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <Bus className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">Pupils on Transport</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{stats.totalPupilsOnTransport} Commuters</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <Users className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">Fleet Seating Capacity</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{stats.totalCapacity} Total Seats</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                  <CheckCircle className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-emerald-700">Capacity Utilization</p>
                  <p className="text-2xl font-bold text-emerald-800 mt-1">{stats.capacityUtilizationPct}%</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <Navigation className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Active Bus Fleet & Daily Trips Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Active Fleet */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                  <div className="flex items-center space-x-2">
                    <Bus className="w-4 h-4 text-blue-600" />
                    <h3 className="text-sm font-bold text-slate-800">Transport Fleet Status</h3>
                  </div>
                  <button onClick={() => setActiveTab('fleet')} className="text-xs text-blue-600 hover:underline">
                    Manage Fleet
                  </button>
                </div>
                <div className="space-y-3">
                  {vehicles.map(v => (
                    <div key={v.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="text-xs font-bold text-slate-900">{v.busCode}</p>
                          <span className="text-[10px] font-mono bg-white border border-slate-200 text-slate-700 px-1.5 py-0.2 rounded">
                            {v.registrationNumber}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5">
                          {v.model} &bull; <span className="font-semibold">{v.seatingCapacity} Seats</span>
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Driver: {v.driverName} ({v.driverPhone})
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          v.status === 'ACTIVE_SERVICE' ? 'bg-emerald-100 text-emerald-800' :
                          v.status === 'STANDBY' ? 'bg-blue-100 text-blue-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {v.status.replace(/_/g, ' ')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Today's Trip Manifests */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-indigo-600" />
                    <h3 className="text-sm font-bold text-slate-800">Today's Shuttle Dispatches</h3>
                  </div>
                  <button onClick={() => setActiveTab('manifests')} className="text-xs text-blue-600 hover:underline">
                    View Manifests
                  </button>
                </div>
                <div className="space-y-3">
                  {manifests.map(m => (
                    <div key={m.id} className="p-3 bg-indigo-50/40 rounded-lg border border-indigo-100 flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-mono font-bold bg-white text-indigo-700 border border-indigo-200 px-1.5 py-0.2 rounded">
                            {m.manifestNumber}
                          </span>
                          <p className="text-xs font-bold text-slate-900">{m.routeCode}</p>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5">
                          {m.busCode} &bull; Direction: <span className="font-semibold">{m.tripDirection.replace(/_/g, ' ')}</span>
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Departure: {m.departureTime || 'Scheduled'} &bull; Conductor: {m.conductorName}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          m.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' :
                          m.status === 'IN_TRANSIT' ? 'bg-blue-100 text-blue-800' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {m.status}
                        </span>
                        <button
                          onClick={() => { setSelectedManifest(m); setActiveTab('manifests'); }}
                          className="text-[11px] text-indigo-600 hover:underline block mt-1 font-semibold"
                        >
                          Check Boarding &rarr;
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DAILY MANIFESTS & BOARDING VERIFICATION TAB */}
        {activeTab === 'manifests' && (
          <div className="space-y-4 max-w-7xl mx-auto">
            {selectedManifest ? (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-bold text-slate-900">{selectedManifest.routeCode}</h3>
                      <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-indigo-100 text-indigo-800">
                        {selectedManifest.tripDirection.replace(/_/g, ' ')}
                      </span>
                      <span className="font-mono text-xs text-slate-500">{selectedManifest.manifestNumber}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Assigned Bus: <span className="font-bold text-slate-800">{selectedManifest.busCode}</span> &bull; Driver: {selectedManifest.driverName} &bull; Conductor: {selectedManifest.conductorName}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    {selectedManifest.status === 'SCHEDULED' && (
                      <button
                        onClick={() => handleTripStatus(selectedManifest.id, 'IN_TRANSIT')}
                        className="flex items-center px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold shadow-sm"
                      >
                        <Play className="w-3.5 h-3.5 mr-1" /> Start Trip (Depart)
                      </button>
                    )}
                    {selectedManifest.status === 'IN_TRANSIT' && (
                      <button
                        onClick={() => handleTripStatus(selectedManifest.id, 'COMPLETED')}
                        className="flex items-center px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold shadow-sm"
                      >
                        <CheckCircle className="w-3.5 h-3.5 mr-1" /> Mark Trip Completed
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedManifest(null)}
                      className="px-3 py-1.5 border border-slate-300 text-slate-600 rounded text-xs font-semibold"
                    >
                      Back to All Manifests
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs whitespace-nowrap">
                    <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold uppercase tracking-wider">
                      <tr>
                        <th className="px-5 py-3">Student Name</th>
                        <th className="px-5 py-3">Class</th>
                        <th className="px-5 py-3">Designated Stage / Stop</th>
                        <th className="px-5 py-3">Boarding Status</th>
                        <th className="px-5 py-3">Checked Time</th>
                        <th className="px-5 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {selectedManifest.pupilEntries.map(p => (
                        <tr key={p.studentId} className="hover:bg-slate-50">
                          <td className="px-5 py-3.5 font-bold text-slate-900">{p.studentName}</td>
                          <td className="px-5 py-3.5 text-slate-600">{p.classGrade}</td>
                          <td className="px-5 py-3.5 text-slate-700 flex items-center">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 mr-1" /> {p.designatedStop}
                          </td>
                          <td className="px-5 py-3.5">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              p.status === 'BOARDED' ? 'bg-blue-100 text-blue-800' :
                              p.status === 'DROPPED_OFF' ? 'bg-emerald-100 text-emerald-800' :
                              p.status === 'ABSENT' ? 'bg-rose-100 text-rose-800' :
                              'bg-slate-100 text-slate-700'
                            }`}>
                              {p.status}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 font-mono text-slate-500">{p.checkedTime || '—'}</td>
                          <td className="px-5 py-3.5 text-right space-x-2">
                            <button
                              onClick={() => handleUpdatePupilStatus(selectedManifest.id, p.studentId, 'BOARDED')}
                              className="px-2.5 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded text-xs font-semibold"
                            >
                              Boarded
                            </button>
                            <button
                              onClick={() => handleUpdatePupilStatus(selectedManifest.id, p.studentId, 'DROPPED_OFF')}
                              className="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded text-xs font-semibold"
                            >
                              Dropped Off
                            </button>
                            <button
                              onClick={() => handleUpdatePupilStatus(selectedManifest.id, p.studentId, 'ABSENT')}
                              className="px-2.5 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded text-xs font-semibold"
                            >
                              Absent
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {manifests.map(m => (
                  <div key={m.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-3">
                        <span className="font-mono text-xs font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">
                          {m.manifestNumber}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">{m.routeCode}</h4>
                        <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold">
                          {m.tripDirection.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        Bus: {m.busCode} &bull; Driver: {m.driverName} &bull; Conductor: {m.conductorName} &bull; Pupils: {m.pupilEntries.length} registered
                      </p>
                    </div>

                    <div className="flex items-center space-x-4 mt-3 md:mt-0">
                      <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                        m.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' :
                        m.status === 'IN_TRANSIT' ? 'bg-blue-100 text-blue-800' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {m.status}
                      </span>
                      <button
                        onClick={() => setSelectedManifest(m)}
                        className="px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded text-xs font-semibold"
                      >
                        Open Live Boarding Sheet
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ROUTES TAB */}
        {activeTab === 'routes' && (
          <div className="space-y-4 max-w-7xl mx-auto">
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="relative w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search transport routes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-md text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <button
                onClick={() => setShowRouteModal(true)}
                className="flex items-center px-4 py-2 text-xs font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
              >
                <Plus className="w-4 h-4 mr-1.5" /> Create New Route
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {routes.map(r => (
                <div key={r.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex justify-between items-start pb-3 border-b border-slate-100">
                    <div>
                      <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                        {r.coverageZone}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 mt-1">{r.routeCode}</h4>
                      <p className="text-xs text-slate-500">{r.routeName}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded block">
                        {r.assignedBusCode}
                      </span>
                      <span className="text-[11px] text-slate-500 block mt-1">{r.totalAllocatedStudents} Pupils</span>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Designated Pickup & Dropoff Stages</h5>
                    <div className="space-y-2">
                      {r.stops.map(s => (
                        <div key={s.stageOrder} className="p-2.5 bg-slate-50 rounded border border-slate-100 flex items-center justify-between text-xs">
                          <div className="flex items-center space-x-2">
                            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px]">
                              {s.stageOrder}
                            </span>
                            <div>
                              <p className="font-semibold text-slate-900">{s.stopName}</p>
                              {s.landmarkDescription && (
                                <p className="text-[10px] text-slate-400">{s.landmarkDescription}</p>
                              )}
                            </div>
                          </div>
                          <div className="text-right font-mono text-[11px] text-slate-600">
                            <span>Morn: {s.morningPickupTime}</span> &bull; <span>Eve: {s.eveningDropoffTime}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ALLOCATIONS TAB */}
        {activeTab === 'allocations' && (
          <div className="space-y-4 max-w-7xl mx-auto">
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="relative w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search allocated pupil or stop..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-md text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <button
                onClick={() => setShowAllocationModal(true)}
                className="flex items-center px-4 py-2 text-xs font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
              >
                <Plus className="w-4 h-4 mr-1.5" /> Allocate Pupil
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-3">Student Name</th>
                    <th className="px-5 py-3">Class</th>
                    <th className="px-5 py-3">Assigned Route</th>
                    <th className="px-5 py-3">Designated Stop</th>
                    <th className="px-5 py-3">Service Type</th>
                    <th className="px-5 py-3">Guardian Contact</th>
                    <th className="px-5 py-3">Termly Fare</th>
                    <th className="px-5 py-3">Payment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {allocations
                    .filter(a => a.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || a.designatedStop.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(a => (
                      <tr key={a.id} className="hover:bg-slate-50">
                        <td className="px-5 py-3.5 font-bold text-slate-900">{a.studentName}</td>
                        <td className="px-5 py-3.5 text-slate-600">{a.classGrade}</td>
                        <td className="px-5 py-3.5 font-medium text-indigo-700">{a.routeCode}</td>
                        <td className="px-5 py-3.5 text-slate-700">{a.designatedStop}</td>
                        <td className="px-5 py-3.5">
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-medium text-[10px]">
                            {a.serviceType.replace(/_/g, ' ')}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="font-semibold text-slate-800">{a.guardianName}</span>
                          <span className="text-slate-500 font-mono block text-[11px]">{a.guardianPhone}</span>
                        </td>
                        <td className="px-5 py-3.5 font-mono font-bold text-slate-900">UGX {a.termlyFeeUgx.toLocaleString()}</td>
                        <td className="px-5 py-3.5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            a.paymentStatus === 'PAID' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {a.paymentStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* FLEET TAB */}
        {activeTab === 'fleet' && (
          <div className="space-y-4 max-w-7xl mx-auto">
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div>
                <h3 className="text-sm font-bold text-slate-900">School Transport Fleet Registry</h3>
                <p className="text-xs text-slate-500">Inspection certificates, roadworthiness compliance, driver & conductor assignments</p>
              </div>
              <button
                onClick={() => setShowVehicleModal(true)}
                className="flex items-center px-4 py-2 text-xs font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
              >
                <Plus className="w-4 h-4 mr-1.5" /> Add Vehicle to Fleet
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {vehicles.map(v => (
                <div key={v.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-base font-bold text-slate-900">{v.busCode}</h4>
                        <span className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-bold">
                          {v.registrationNumber}
                        </span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        v.status === 'ACTIVE_SERVICE' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {v.status.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <div className="mt-4 space-y-2 text-xs">
                      <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
                        <p className="text-slate-500 text-[10px] uppercase font-semibold">Vehicle Specification</p>
                        <p className="font-bold text-slate-900 mt-0.5">{v.model}</p>
                        <p className="text-slate-600 font-semibold">{v.seatingCapacity} Passenger Seats</p>
                      </div>

                      <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
                        <p className="text-slate-500 text-[10px] uppercase font-semibold">Crew Onboard</p>
                        <p className="font-bold text-slate-900 mt-0.5">Driver: {v.driverName} ({v.driverPhone})</p>
                        <p className="text-slate-700">Conductor: {v.conductorName} ({v.conductorPhone})</p>
                      </div>

                      <div className="flex justify-between text-[11px] text-slate-500 pt-1">
                        <span>Fitness Insp: {v.fitnessInspectionDate}</span>
                        <span>Insured to: {v.insuranceExpiryDate}</span>
                      </div>

                      {v.notes && (
                        <p className="text-[11px] text-slate-600 italic bg-blue-50/50 p-2 rounded border border-blue-100">
                          {v.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FUEL & MAINTENANCE TAB */}
        {activeTab === 'maintenance' && (
          <div className="space-y-4 max-w-7xl mx-auto">
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Fleet Maintenance, Servicing & Fuel Logs</h3>
                <p className="text-xs text-slate-500">Track odometer readings, periodic servicing schedules and fuel receipts</p>
              </div>
              <button
                onClick={() => setShowMaintenanceModal(true)}
                className="flex items-center px-4 py-2 text-xs font-semibold rounded-md bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm"
              >
                <Plus className="w-4 h-4 mr-1.5" /> Log Fuel / Service
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-3">Date</th>
                    <th className="px-5 py-3">Vehicle</th>
                    <th className="px-5 py-3">Type</th>
                    <th className="px-5 py-3">Odometer</th>
                    <th className="px-5 py-3">Details / Workshop</th>
                    <th className="px-5 py-3">Litres</th>
                    <th className="px-5 py-3">Cost</th>
                    <th className="px-5 py-3">Approved By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {maintenanceLogs.map(m => (
                    <tr key={m.id} className="hover:bg-slate-50">
                      <td className="px-5 py-3.5 text-slate-500">{m.logDate}</td>
                      <td className="px-5 py-3.5 font-bold text-slate-900">{m.busCode}</td>
                      <td className="px-5 py-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          m.logType === 'FUEL_FILLUP' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {m.logType.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 font-mono text-slate-700">{m.odometerReadingKm.toLocaleString()} KM</td>
                      <td className="px-5 py-3.5 max-w-sm truncate text-slate-700">
                        <span className="font-semibold">{m.serviceProviderWorkshop}:</span> {m.description}
                      </td>
                      <td className="px-5 py-3.5 font-mono text-slate-600">{m.fuelLitres ? `${m.fuelLitres} L` : '—'}</td>
                      <td className="px-5 py-3.5 font-mono font-bold text-slate-900">UGX {m.costUgx.toLocaleString()}</td>
                      <td className="px-5 py-3.5 text-slate-500">{m.approvedBy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ALLOCATE PUPIL MODAL */}
      {showAllocationModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 bg-blue-50 border-b border-blue-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-blue-900">Allocate Pupil to Bus Route</h3>
              <button onClick={() => setShowAllocationModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const fd = new FormData(form);

                const routeId = fd.get('routeId') as string;
                const r = routes.find(item => item.id === routeId);

                transportService.allocateStudent({
                  studentId: 'STU-' + Math.floor(100 + Math.random() * 900),
                  studentName: fd.get('studentName') as string,
                  classGrade: fd.get('classGrade') as string,
                  routeId: routeId,
                  routeCode: r ? r.routeCode : 'Route',
                  designatedStop: fd.get('stop') as string,
                  serviceType: fd.get('serviceType') as any,
                  guardianName: fd.get('gName') as string,
                  guardianPhone: fd.get('gPhone') as string,
                  termlyFeeUgx: parseInt(fd.get('fee') as string) || 450000,
                  paymentStatus: 'PAID',
                  status: 'ACTIVE'
                });

                refreshData();
                setShowAllocationModal(false);
              }}
              className="p-6 space-y-4 text-xs"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Student Full Name</label>
                  <input name="studentName" required type="text" placeholder="e.g. Brian Mukasa" className="w-full px-3 py-2 border border-slate-300 rounded text-xs outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Class / Section</label>
                  <input name="classGrade" required type="text" placeholder="e.g. P.6 Red or Top Class" className="w-full px-3 py-2 border border-slate-300 rounded text-xs outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Select Route</label>
                  <select name="routeId" className="w-full px-3 py-2 border border-slate-300 rounded text-xs bg-white">
                    {routes.map(r => (
                      <option key={r.id} value={r.id}>{r.routeCode}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Service Direction</label>
                  <select name="serviceType" className="w-full px-3 py-2 border border-slate-300 rounded text-xs bg-white">
                    <option value="TWO_WAY">Two-Way (Morning & Evening)</option>
                    <option value="MORNING_ONLY">Morning Pickup Only</option>
                    <option value="EVENING_ONLY">Evening Dropoff Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Designated Pickup Stage / Stop</label>
                <input name="stop" required type="text" placeholder="e.g. Sovereign Mall Stage" className="w-full px-3 py-2 border border-slate-300 rounded text-xs outline-none focus:ring-1 focus:ring-blue-500" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Guardian Name</label>
                  <input name="gName" required type="text" placeholder="Timothy Mukasa" className="w-full px-3 py-2 border border-slate-300 rounded text-xs outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Emergency Phone</label>
                  <input name="gPhone" required type="tel" placeholder="+25670..." className="w-full px-3 py-2 border border-slate-300 rounded text-xs outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Termly Transport Fee (UGX)</label>
                <input name="fee" required type="number" defaultValue="450000" className="w-full px-3 py-2 border border-slate-300 rounded text-xs outline-none focus:ring-1 focus:ring-blue-500" />
              </div>

              <div className="pt-4 flex justify-end space-x-2 border-t border-slate-100">
                <button type="button" onClick={() => setShowAllocationModal(false)} className="px-4 py-2 border border-slate-300 text-slate-600 rounded text-xs font-semibold">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded text-xs font-semibold hover:bg-blue-700 shadow-sm">
                  Confirm Route Allocation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
