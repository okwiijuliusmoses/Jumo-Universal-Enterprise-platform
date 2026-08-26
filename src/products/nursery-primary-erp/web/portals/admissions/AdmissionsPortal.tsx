import React, { useState, useEffect } from 'react';
import { Users, FileText, CheckCircle, XCircle, Search, Plus, Filter, ArrowRight, Loader2, Clock } from 'lucide-react';
import { admissionsService, AdmissionApplication, AdmissionStatus, StudentLevel } from '../../../domain/AdmissionsService';

export const AdmissionsPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'applications' | 'new'>('dashboard');
  const [applications, setApplications] = useState<AdmissionApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<AdmissionApplication | null>(null);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const data = await admissionsService.getApplications();
      setApplications(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const pendingCount = applications.filter(a => a.status === 'PENDING_REVIEW').length;
  const approvedCount = applications.filter(a => a.status === 'APPROVED' || a.status === 'ENROLLED').length;
  const totalCount = applications.length;

  const handleStatusChange = async (id: string, status: AdmissionStatus) => {
    await admissionsService.updateApplicationStatus(id, status);
    fetchApplications();
    if (selectedApp?.id === id) {
      setSelectedApp({ ...selectedApp, status });
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-50">
      {/* Portal Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Shared Admissions Office</h2>
            <p className="text-xs text-slate-500">Nursery (ECD) & Primary (P.1-P.7) Consolidated Intake</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => { setActiveTab('dashboard'); setSelectedApp(null); }}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors \${activeTab === 'dashboard' ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => { setActiveTab('applications'); setSelectedApp(null); }}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors \${activeTab === 'applications' ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
          >
            All Applications
          </button>
          <button 
            onClick={() => { setActiveTab('new'); setSelectedApp(null); }}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors \${activeTab === 'new' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}
          >
            <Plus className="w-4 h-4 mr-2" /> New Application
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-6">
        {loading && activeTab !== 'new' ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin mb-4 text-blue-500" />
            <p>Loading admissions data...</p>
          </div>
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500">Total Applications</p>
                      <p className="text-2xl font-bold text-slate-900 mt-1">{totalCount}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                      <FileText className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-yellow-200 shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-yellow-700">Pending Review</p>
                      <p className="text-2xl font-bold text-yellow-900 mt-1">{pendingCount}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-500">
                      <Clock className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-emerald-200 shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-emerald-700">Approved / Enrolled</p>
                      <p className="text-2xl font-bold text-emerald-900 mt-1">{approvedCount}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                    <h3 className="font-semibold text-slate-800">Recent Applications</h3>
                    <button onClick={() => setActiveTab('applications')} className="text-sm text-blue-600 hover:underline">View all</button>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {applications.slice(0, 5).map(app => (
                      <div key={app.id} className="p-4 hover:bg-slate-50 flex items-center justify-between transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm \${app.level === 'NURSERY' ? 'bg-pink-100 text-pink-700' : 'bg-blue-100 text-blue-700'}`}>
                            {app.studentName.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-900">{app.studentName}</p>
                            <div className="flex items-center text-xs text-slate-500 mt-0.5 space-x-2">
                              <span>{app.applicationNumber}</span>
                              <span>&bull;</span>
                              <span className="font-medium">{app.level} ({app.targetClass})</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium \${
                            app.status === 'PENDING_REVIEW' ? 'bg-yellow-100 text-yellow-800' :
                            app.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' :
                            app.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                            'bg-slate-100 text-slate-800'
                          }`}>
                            {app.status.replace('_', ' ')}
                          </span>
                          <button onClick={() => { setSelectedApp(app); setActiveTab('applications'); }} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {applications.length === 0 && (
                      <div className="p-8 text-center text-slate-500 text-sm">No applications found.</div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'applications' && !selectedApp && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
                <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                  <div className="relative w-64">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" placeholder="Search applicants..." className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <button className="flex items-center px-3 py-2 border border-slate-200 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-100">
                    <Filter className="w-4 h-4 mr-2" /> Filter
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-3 font-medium">App Number</th>
                        <th className="px-6 py-3 font-medium">Student Name</th>
                        <th className="px-6 py-3 font-medium">Level & Class</th>
                        <th className="px-6 py-3 font-medium">Submission Date</th>
                        <th className="px-6 py-3 font-medium">Status</th>
                        <th className="px-6 py-3 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {applications.map(app => (
                        <tr key={app.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4 font-mono text-xs text-slate-500">{app.applicationNumber}</td>
                          <td className="px-6 py-4 font-medium text-slate-900">{app.studentName}</td>
                          <td className="px-6 py-4 text-slate-600">
                            <span className={`mr-2 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider \${app.level === 'NURSERY' ? 'bg-pink-100 text-pink-700' : 'bg-blue-100 text-blue-700'}`}>
                              {app.level}
                            </span>
                            {app.targetClass}
                          </td>
                          <td className="px-6 py-4 text-slate-500">{new Date(app.submissionDate).toLocaleDateString()}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium \${
                              app.status === 'PENDING_REVIEW' ? 'bg-yellow-100 text-yellow-800' :
                              app.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' :
                              app.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                              'bg-slate-100 text-slate-800'
                            }`}>
                              {app.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button onClick={() => setSelectedApp(app)} className="text-blue-600 hover:text-blue-800 font-medium text-xs">Review</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'applications' && selectedApp && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
                {/* Detail View */}
                <div className="flex-1 p-6 border-r border-slate-200">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="flex items-center space-x-3 mb-1">
                        <h2 className="text-2xl font-bold text-slate-900">{selectedApp.studentName}</h2>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold \${selectedApp.level === 'NURSERY' ? 'bg-pink-100 text-pink-700' : 'bg-blue-100 text-blue-700'}`}>
                          {selectedApp.level}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 font-mono">{selectedApp.applicationNumber} &bull; Applied on {new Date(selectedApp.submissionDate).toLocaleDateString()}</p>
                    </div>
                    <button onClick={() => setSelectedApp(null)} className="text-slate-400 hover:text-slate-600 p-2">
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div>
                      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Student Details</h4>
                      <dl className="space-y-2 text-sm">
                        <div className="grid grid-cols-3"><dt className="text-slate-500">Target Class:</dt><dd className="col-span-2 font-medium">{selectedApp.targetClass}</dd></div>
                        <div className="grid grid-cols-3"><dt className="text-slate-500">Gender:</dt><dd className="col-span-2">{selectedApp.gender}</dd></div>
                        <div className="grid grid-cols-3"><dt className="text-slate-500">Date of Birth:</dt><dd className="col-span-2">{selectedApp.dateOfBirth}</dd></div>
                      </dl>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Guardian Information</h4>
                      {selectedApp.guardians.map(g => (
                        <div key={g.id} className="text-sm bg-slate-50 p-3 rounded-md border border-slate-100">
                          <p className="font-medium text-slate-900">{g.name} <span className="text-slate-400 font-normal">({g.relation})</span></p>
                          <p className="text-slate-600 mt-1">{g.phone} &bull; {g.email}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedApp.notes && (
                    <div>
                      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Internal Notes</h4>
                      <div className="bg-yellow-50 p-3 rounded-md text-sm text-yellow-900 whitespace-pre-wrap font-mono text-xs border border-yellow-100">
                        {selectedApp.notes}
                      </div>
                    </div>
                  )}
                </div>

                {/* Workflow Actions */}
                <div className="w-full md:w-80 bg-slate-50 p-6 flex flex-col">
                  <h3 className="font-semibold text-slate-800 mb-4">Workflow Actions</h3>
                  
                  <div className="mb-6">
                    <p className="text-xs font-medium text-slate-500 mb-2">Current Status</p>
                    <span className={`inline-flex w-full justify-center items-center px-3 py-2 rounded-md text-sm font-bold border \${
                      selectedApp.status === 'PENDING_REVIEW' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                      selectedApp.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                      selectedApp.status === 'REJECTED' ? 'bg-red-100 text-red-800 border-red-200' :
                      'bg-slate-100 text-slate-800 border-slate-200'
                    }`}>
                      {selectedApp.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="space-y-3 flex-1">
                    {selectedApp.status === 'PENDING_REVIEW' && (
                      <>
                        <button onClick={() => handleStatusChange(selectedApp.id, 'APPROVED')} className="w-full py-2.5 bg-emerald-600 text-white rounded-md text-sm font-medium hover:bg-emerald-700 shadow-sm transition-colors">
                          Approve Admission
                        </button>
                        <button onClick={() => handleStatusChange(selectedApp.id, 'REJECTED')} className="w-full py-2.5 bg-white text-red-600 border border-red-200 rounded-md text-sm font-medium hover:bg-red-50 transition-colors">
                          Reject Application
                        </button>
                      </>
                    )}
                    {selectedApp.status === 'APPROVED' && (
                      <button onClick={() => handleStatusChange(selectedApp.id, 'ENROLLED')} className="w-full py-2.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 shadow-sm transition-colors">
                        Complete Enrollment (Issue ID)
                      </button>
                    )}
                  </div>
                  
                  <div className="mt-auto pt-4 text-xs text-slate-400 text-center border-t border-slate-200">
                    Last updated: {new Date(selectedApp.lastUpdated).toLocaleString()}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'new' && (
              <div className="max-w-2xl mx-auto bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-200 bg-slate-50">
                  <h2 className="text-lg font-bold text-slate-900">New Admission Application</h2>
                  <p className="text-sm text-slate-500 mt-1">Register a new prospective student into the ECD or Primary registry.</p>
                </div>
                <form className="p-6 space-y-6" onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const data = new FormData(form);
                  
                  await admissionsService.createApplication({
                    studentName: data.get('studentName') as string,
                    dateOfBirth: data.get('dob') as string,
                    gender: data.get('gender') as 'MALE' | 'FEMALE',
                    level: data.get('level') as StudentLevel,
                    targetClass: data.get('targetClass') as string,
                    status: 'PENDING_REVIEW',
                    guardians: [{
                      id: 'g-new',
                      name: data.get('gName') as string,
                      relation: data.get('gRelation') as string,
                      phone: data.get('gPhone') as string,
                      email: data.get('gEmail') as string,
                      isPrimary: true,
                      canPickup: true
                    }]
                  });
                  fetchApplications();
                  setActiveTab('applications');
                }}>
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-slate-800 border-b border-slate-100 pb-2">Student Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="block text-xs font-medium text-slate-700 mb-1">Full Name</label>
                        <input name="studentName" required type="text" className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Date of Birth</label>
                        <input name="dob" required type="date" className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Gender</label>
                        <select name="gender" required className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                          <option value="MALE">Male</option>
                          <option value="FEMALE">Female</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Academic Level</label>
                        <select name="level" required className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50">
                          <option value="NURSERY">Nursery / ECD</option>
                          <option value="PRIMARY">Primary (P.1 - P.7)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Target Class</label>
                        <input name="targetClass" required type="text" placeholder="e.g. Baby Class, P.1" className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    <h3 className="text-sm font-semibold text-slate-800 border-b border-slate-100 pb-2">Primary Guardian</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="block text-xs font-medium text-slate-700 mb-1">Guardian Name</label>
                        <input name="gName" required type="text" className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Relationship</label>
                        <input name="gRelation" required type="text" placeholder="Mother, Father, etc." className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Phone Number</label>
                        <input name="gPhone" required type="tel" className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-medium text-slate-700 mb-1">Email Address (Optional)</label>
                        <input name="gEmail" type="email" className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end space-x-3 border-t border-slate-100">
                    <button type="button" onClick={() => setActiveTab('applications')} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-md">Cancel</button>
                    <button type="submit" className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm">Submit Application</button>
                  </div>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
