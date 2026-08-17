import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProductManufacturingJob } from '../../core/factory/registry/HubRegistryTypes';
import { SovereignGovernanceRegistry } from '../../services/gov/SovereignGovernanceRegistry';

interface JobNavigationContextType {
  selectedJobId: string | null;
  selectedJob: ProductManufacturingJob | null;
  setSelectedJobId: (id: string | null) => void;
  jobs: ProductManufacturingJob[];
  refreshJobs: () => void;
}

const JobNavigationContext = createContext<JobNavigationContextType | undefined>(undefined);

export const JobNavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedJobId, setSelectedJobIdState] = useState<string | null>(() => {
    return localStorage.getItem('ueos_selected_job_id');
  });
  const [jobs, setJobs] = useState<ProductManufacturingJob[]>([]);

  const govRegistry = SovereignGovernanceRegistry.getInstance();

  const refreshJobs = () => {
    const allJobs = govRegistry.getAllJobs() as ProductManufacturingJob[];
    setJobs(allJobs);
  };

  useEffect(() => {
    refreshJobs();
    const interval = setInterval(refreshJobs, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (jobs.length > 0 && (!selectedJobId || !jobs.some(j => j.id === selectedJobId))) {
      // Default to first job if none selected
      setSelectedJobIdState(jobs[0].id);
      localStorage.setItem('ueos_selected_job_id', jobs[0].id);
    }
  }, [jobs, selectedJobId]);

  const setSelectedJobId = (id: string | null) => {
    setSelectedJobIdState(id);
    if (id) {
      localStorage.setItem('ueos_selected_job_id', id);
    } else {
      localStorage.removeItem('ueos_selected_job_id');
    }
  };

  const selectedJob = jobs.find(j => j.id === selectedJobId) || jobs[0] || null;

  return (
    <JobNavigationContext.Provider value={{ selectedJobId, selectedJob, setSelectedJobId, jobs, refreshJobs }}>
      {children}
    </JobNavigationContext.Provider>
  );
};

export const useJobNavigation = () => {
  const context = useContext(JobNavigationContext);
  if (!context) {
    throw new Error('useJobNavigation must be used within a JobNavigationProvider');
  }
  return context;
};
