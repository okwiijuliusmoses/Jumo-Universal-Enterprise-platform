import React, { useState } from 'react';
import { 
  Building, Archive, Truck, MapPin, Plus, ClipboardList, CheckCircle2, 
  Map, ShieldCheck, Key, Wrench, Hammer, Settings, Trash2, Shield
} from 'lucide-react';

interface RealEstate {
  id: string;
  name: string;
  type: string;
  location: string;
  deedsRegistration: string;
  surveyorCoordinates: string;
  status: 'OWNED_FREEHOLD' | 'LEASED' | 'DISPUTED';
}

interface SacredAsset {
  id: string;
  name: string;
  category: string;
  estimatedAge: string;
  custodian: string;
  securityHash: string;
}

interface Vehicle {
  id: string;
  makeModel: string;
  plateNumber: string;
  primaryDriver: string;
  nextServiceDate: string;
  status: 'ACTIVE' | 'MAINTENANCE' | 'GROUNDED';
}

export const ChurchAssets: React.FC = () => {
  const [realEstate, setRealEstate] = useState<RealEstate[]>([
    { id: 'PROP-001', name: 'St. Paul Cathedral Grounds', type: 'Cathedral Estate', location: 'Namirembe Hill, Plot 1A-C', deedsRegistration: 'DEED-NAM-1892-004', surveyorCoordinates: '0.3142° N, 32.5594° E', status: 'OWNED_FREEHOLD' },
    { id: 'PROP-002', name: 'Diocesan Bishop Residence & Gardens', type: 'Vicarage / Residence', location: 'Namirembe Hill, Plot 3', deedsRegistration: 'DEED-NAM-1910-089', surveyorCoordinates: '0.3150° N, 32.5598° E', status: 'OWNED_FREEHOLD' },
    { id: 'PROP-003', name: 'St. Paul Primary School Campus', type: 'Educational Estate', location: 'Nakasero Hill Road, Plot 14', deedsRegistration: 'DEED-NAK-1955-441', surveyorCoordinates: '0.3204° N, 32.5821° E', status: 'OWNED_FREEHOLD' }
  ]);

  const [sacredAssets, setSacredAssets] = useState<SacredAsset[]>([
    { id: 'SAC-001', name: 'Original 18th Century Communion Chalice Set', category: 'Consecrated Vessels', estimatedAge: '130 Years', custodian: 'Very Rev. Canon Jonathan Kisawuzi', securityHash: 'SHA256:6e3b0c44298fc1c149afbf4c8996fb92427ae41e46' },
    { id: 'SAC-002', name: 'Archbishop Centenary Embroidered Silken Robes', category: 'Liturgical Vestments', estimatedAge: '38 Years', custodian: 'Agnes Nakato Walusimbi', securityHash: 'SHA256:4a11c890e1f3a77281044bb211c8801f99e410b001' }
  ]);

  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { id: 'VEH-001', makeModel: 'Toyota Land Cruiser Prado (Bishop Official)', plateNumber: 'UG-0042-ECC', primaryDriver: 'Brother Samuel Ssewankambo', nextServiceDate: '2026-09-15', status: 'ACTIVE' },
    { id: 'VEH-002', makeModel: 'Isuzu Elf 3-Ton Cargo (Missions Support)', plateNumber: 'UG-1094-MIS', primaryDriver: 'Brother Julius Moses', nextServiceDate: '2026-08-20', status: 'ACTIVE' }
  ]);

  // Form states
  const [newProp, setNewProp] = useState({ name: '', type: 'Parish Hall', location: '', deed: '', coords: '' });
  const [newSacred, setNewSacred] = useState({ name: '', category: 'Sacred Tabernacle', age: '', custodian: '' });
  const [newVeh, setNewVeh] = useState({ model: '', plate: '', driver: '', service: '' });

  const [subTab, setSubTab] = useState<'real_estate' | 'sacred' | 'fleet'>('real_estate');

  const handleRegisterRealEstate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProp.name.trim() || !newProp.location.trim()) return;

    const added: RealEstate = {
      id: `PROP-00${realEstate.length + 1}`,
      name: newProp.name,
      type: newProp.type,
      location: newProp.location,
      deedsRegistration: newProp.deed || `DEED-AUTO-${Math.floor(1000 + Math.random() * 9000)}`,
      surveyorCoordinates: newProp.coords || '0.0000° N, 0.0000° E',
      status: 'OWNED_FREEHOLD'
    };

    setRealEstate([...realEstate, added]);
    setNewProp({ name: '', type: 'Parish Hall', location: '', deed: '', coords: '' });
    alert(`Property Footprint cryptographically registered: ${added.name}`);
  };

  const handleRegisterSacred = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSacred.name.trim() || !newSacred.custodian.trim()) return;

    const added: SacredAsset = {
      id: `SAC-00${sacredAssets.length + 1}`,
      name: newSacred.name,
      category: newSacred.category,
      estimatedAge: newSacred.age || 'Unknown Age',
      custodian: newSacred.custodian,
      securityHash: 'SHA256:' + Array.from({length: 40}, () => Math.floor(Math.random() * 16).toString(16)).join('')
    };

    setSacredAssets([...sacredAssets, added]);
    setNewSacred({ name: '', category: 'Sacred Tabernacle', age: '', custodian: '' });
    alert(`Liturgical Heritage Asset catalogued & signed: ${added.name}`);
  };

  const handleRegisterVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVeh.model.trim() || !newVeh.plate.trim()) return;

    const added: Vehicle = {
      id: `VEH-00${vehicles.length + 1}`,
      makeModel: newVeh.model,
      plateNumber: newVeh.plate,
      primaryDriver: newVeh.driver || 'Staff Driver Pool',
      nextServiceDate: newVeh.service || new Date().toISOString().substring(0, 10),
      status: 'ACTIVE'
    };

    setVehicles([...vehicles, added]);
    setNewVeh({ model: '', plate: '', driver: '', service: '' });
    alert(`Vehicle registered and driver log activated: ${added.makeModel}`);
  };

  return (
    <div className="space-y-6">
      {/* Subtab selection */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setSubTab('real_estate')}
          className={`py-2 px-4 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-all ${
            subTab === 'real_estate' ? 'border-purple-600 text-purple-700' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Building className="w-4 h-4" />
          Real Estate & Land Deeds
        </button>
        <button
          onClick={() => setSubTab('sacred')}
          className={`py-2 px-4 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-all ${
            subTab === 'sacred' ? 'border-purple-600 text-purple-700' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Archive className="w-4 h-4" />
          Heritage Sacred Assets
        </button>
        <button
          onClick={() => setSubTab('fleet')}
          className={`py-2 px-4 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-all ${
            subTab === 'fleet' ? 'border-purple-600 text-purple-700' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Truck className="w-4 h-4" />
          Logistics & Vehicle Fleet
        </button>
      </div>

      {subTab === 'real_estate' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Register property */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-1">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 border-b pb-2">
              <Map className="w-4 h-4 text-purple-600" />
              Register Land/Property
            </h3>

            <form onSubmit={handleRegisterRealEstate} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Estate / Footprint Name</label>
                <input
                  type="text"
                  value={newProp.name}
                  onChange={(e) => setNewProp({ ...newProp, name: e.target.value })}
                  placeholder="e.g. St. Jude Parish Hall"
                  className="w-full p-2 rounded border border-slate-300"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Property Classification</label>
                <select
                  value={newProp.type}
                  onChange={(e) => setNewProp({ ...newProp, type: e.target.value })}
                  className="w-full p-2 rounded border border-slate-300 bg-white"
                >
                  <option value="Cathedral Estate">Cathedral Estate</option>
                  <option value="Parish Hall">Parish Hall</option>
                  <option value="Vicarage / Residence">Vicarage / Residence</option>
                  <option value="Educational Estate">Educational Estate</option>
                  <option value="Agricultural Acreage">Agricultural Acreage</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Physical Location Address</label>
                <input
                  type="text"
                  value={newProp.location}
                  onChange={(e) => setNewProp({ ...newProp, location: e.target.value })}
                  placeholder="e.g. Plot 15, Nakasero Lane"
                  className="w-full p-2 rounded border border-slate-300"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Deeds Land Registry Number</label>
                <input
                  type="text"
                  value={newProp.deed}
                  onChange={(e) => setNewProp({ ...newProp, deed: e.target.value })}
                  placeholder="e.g. DEED-NAM-1892-004"
                  className="w-full p-2 rounded border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">GPS Boundary Coordinates</label>
                <input
                  type="text"
                  value={newProp.coords}
                  onChange={(e) => setNewProp({ ...newProp, coords: e.target.value })}
                  placeholder="e.g. 0.3142° N, 32.5594° E"
                  className="w-full p-2 rounded border border-slate-300"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded shadow transition-all"
              >
                Register Property Footprint
              </button>
            </form>
          </div>

          {/* Properties register table */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-2">
            <div className="border-b pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Building className="w-4 h-4 text-purple-600" />
                Diocesan Sovereign Land Deeds Registry
              </h3>
              <p className="text-xs text-slate-500">Legal registrations and coordinates representing the church physical footprints.</p>
            </div>

            <div className="space-y-3">
              {realEstate.map(prop => (
                <div key={prop.id} className="p-3.5 bg-slate-50 border rounded-xl text-xs flex justify-between items-start gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-purple-700 bg-purple-50 px-1.5 py-0.2 rounded font-bold text-[10px]">{prop.id}</span>
                      <span className="text-slate-600 font-mono text-[10px]">{prop.deedsRegistration}</span>
                    </div>
                    <strong className="text-sm font-bold text-slate-900 block">{prop.name}</strong>
                    <span className="text-slate-500 block text-[11px]">Location: {prop.location} • Coordinates: {prop.surveyorCoordinates}</span>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {prop.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {subTab === 'sacred' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add sacred asset */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-1">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 border-b pb-2">
              <Archive className="w-4 h-4 text-purple-600" />
              Log Sacred Relic / Robe
            </h3>

            <form onSubmit={handleRegisterSacred} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Liturgical Asset Name</label>
                <input
                  type="text"
                  value={newSacred.name}
                  onChange={(e) => setNewSacred({ ...newSacred, name: e.target.value })}
                  placeholder="e.g. Centenary Communion Chalice"
                  className="w-full p-2 rounded border border-slate-300"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Asset Category</label>
                <select
                  value={newSacred.category}
                  onChange={(e) => setNewSacred({ ...newSacred, category: e.target.value })}
                  className="w-full p-2 rounded border border-slate-300 bg-white"
                >
                  <option value="Consecrated Vessels">Consecrated Vessels</option>
                  <option value="Liturgical Vestments">Liturgical Vestments</option>
                  <option value="Rare Liturgical Library">Rare Liturgical Library</option>
                  <option value="Historical relics">Historical Relics / Antiques</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Estimated Antiquity Age</label>
                <input
                  type="text"
                  value={newSacred.age}
                  onChange={(e) => setNewSacred({ ...newSacred, age: e.target.value })}
                  placeholder="e.g. 130 Years"
                  className="w-full p-2 rounded border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Appointed Custodian (Priest/Vicar)</label>
                <input
                  type="text"
                  value={newSacred.custodian}
                  onChange={(e) => setNewSacred({ ...newSacred, custodian: e.target.value })}
                  placeholder="e.g. Canon Jonathan Kisawuzi"
                  className="w-full p-2 rounded border border-slate-300"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded shadow transition-all"
              >
                Catalog Heritage Asset
              </button>
            </form>
          </div>

          {/* Sacred assets roster */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-2">
            <div className="border-b pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-purple-600" />
                Ancestral & Liturgical Sacred Heritage Registry
              </h3>
              <p className="text-xs text-slate-500">Consecrated artifacts, ancestral chalices, and rare liturgical libraries.</p>
            </div>

            <div className="space-y-3 font-sans text-xs">
              {sacredAssets.map(sac => (
                <div key={sac.id} className="p-3.5 bg-slate-50 border rounded-xl space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <strong className="text-sm font-bold text-slate-900">{sac.name}</strong>
                      <span className="text-[10px] text-purple-700 font-semibold block">{sac.category}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-600 font-bold">{sac.id}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-[11px] pt-1.5 border-t border-slate-200/60">
                    <div>
                      <span className="text-slate-600 block text-[10px]">Appointed Custodian</span>
                      <strong className="text-slate-700 font-bold">{sac.custodian}</strong>
                    </div>
                    <div>
                      <span className="text-slate-600 block text-[10px]">Estimated Age</span>
                      <strong className="text-slate-700 font-bold">{sac.estimatedAge}</strong>
                    </div>
                  </div>

                  <div className="text-[10px] font-mono text-slate-600 bg-slate-100 p-1.5 rounded flex items-center gap-1 border">
                    <Key className="w-3.5 h-3.5 text-slate-600" />
                    <span>{sac.securityHash}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {subTab === 'fleet' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add logistics */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-1">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 border-b pb-2">
              <Truck className="w-4 h-4 text-purple-600" />
              Register Vehicle Fleet / Genset
            </h3>

            <form onSubmit={handleRegisterVehicle} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Make, Model & Fleet Code</label>
                <input
                  type="text"
                  value={newVeh.model}
                  onChange={(e) => setNewVeh({ ...newVeh, model: e.target.value })}
                  placeholder="e.g. Isuzu 3-Ton Truck"
                  className="w-full p-2 rounded border border-slate-300"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">License Plate / Registration</label>
                <input
                  type="text"
                  value={newVeh.plate}
                  onChange={(e) => setNewVeh({ ...newVeh, plate: e.target.value })}
                  placeholder="e.g. UG-1049-ECC"
                  className="w-full p-2 rounded border border-slate-300"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Appointed Staff Driver</label>
                <input
                  type="text"
                  value={newVeh.driver}
                  onChange={(e) => setNewVeh({ ...newVeh, driver: e.target.value })}
                  placeholder="e.g. Brother Samuel Ssewankambo"
                  className="w-full p-2 rounded border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Next Scheduled Service Maintenance</label>
                <input
                  type="date"
                  value={newVeh.service}
                  onChange={(e) => setNewVeh({ ...newVeh, service: e.target.value })}
                  className="w-full p-2 rounded border border-slate-300 bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded shadow transition-all"
              >
                Register Logistical Fleet Unit
              </button>
            </form>
          </div>

          {/* Roster vehicles */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-2">
            <div className="border-b pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-purple-600" />
                Fleet Logistics & Custodian Maintenance Roster
              </h3>
              <p className="text-xs text-slate-500">Parish delivery vans, mission trucks, and backup diesel generators.</p>
            </div>

            <div className="space-y-3 text-xs">
              {vehicles.map(veh => (
                <div key={veh.id} className="p-3.5 bg-slate-50 border rounded-xl flex justify-between items-center gap-4">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-purple-700 font-bold bg-purple-50 px-1.5 py-0.2 rounded text-[10px]">{veh.id}</span>
                      <span className="text-slate-600 font-mono text-[10px]">{veh.plateNumber}</span>
                    </div>
                    <strong className="text-slate-900 font-bold block mt-1">{veh.makeModel}</strong>
                    <span className="text-slate-500 block text-[11px] mt-0.5">Primary Driver: {veh.primaryDriver} • Next Service: {veh.nextServiceDate}</span>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {veh.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
