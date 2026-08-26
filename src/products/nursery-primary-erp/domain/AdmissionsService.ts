export type StudentLevel = 'NURSERY' | 'PRIMARY';
export type AdmissionStatus = 'PENDING_REVIEW' | 'INTERVIEW_SCHEDULED' | 'APPROVED' | 'REJECTED' | 'ENROLLED';

export interface Guardian {
  id: string;
  name: string;
  relation: string;
  phone: string;
  email: string;
  isPrimary: boolean;
  canPickup: boolean;
}

export interface AdmissionApplication {
  id: string;
  applicationNumber: string;
  studentName: string;
  dateOfBirth: string;
  gender: 'MALE' | 'FEMALE';
  level: StudentLevel;
  targetClass: string; // e.g., 'Baby Class', 'P.1'
  status: AdmissionStatus;
  guardians: Guardian[];
  submissionDate: string;
  lastUpdated: string;
  notes?: string;
  interviewScore?: number;
}

class AdmissionsService {
  private applications: AdmissionApplication[] = [
    {
      id: 'app-001',
      applicationNumber: 'ADM-2026-001',
      studentName: 'Alice Katusiime',
      dateOfBirth: '2021-04-12',
      gender: 'FEMALE',
      level: 'NURSERY',
      targetClass: 'Middle Class',
      status: 'APPROVED',
      guardians: [
        { id: 'g-001', name: 'John Katusiime', relation: 'Father', phone: '+256772123456', email: 'john@example.com', isPrimary: true, canPickup: true }
      ],
      submissionDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
      lastUpdated: new Date().toISOString(),
      interviewScore: 85
    },
    {
      id: 'app-002',
      applicationNumber: 'ADM-2026-002',
      studentName: 'David Otim',
      dateOfBirth: '2016-08-22',
      gender: 'MALE',
      level: 'PRIMARY',
      targetClass: 'P.4',
      status: 'PENDING_REVIEW',
      guardians: [
        { id: 'g-002', name: 'Sarah Otim', relation: 'Mother', phone: '+256752987654', email: 'sarah@example.com', isPrimary: true, canPickup: true }
      ],
      submissionDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
      lastUpdated: new Date().toISOString()
    }
  ];

  async getApplications(filters?: { level?: StudentLevel; status?: AdmissionStatus }): Promise<AdmissionApplication[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));
    let result = [...this.applications];
    if (filters?.level) {
      result = result.filter(a => a.level === filters.level);
    }
    if (filters?.status) {
      result = result.filter(a => a.status === filters.status);
    }
    // Sort by submission date descending
    return result.sort((a, b) => new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime());
  }

  async getApplicationById(id: string): Promise<AdmissionApplication | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.applications.find(a => a.id === id) || null;
  }

  async createApplication(data: Omit<AdmissionApplication, 'id' | 'applicationNumber' | 'submissionDate' | 'lastUpdated'>): Promise<AdmissionApplication> {
    await new Promise(resolve => setTimeout(resolve, 800));
    const newApp: AdmissionApplication = {
      ...data,
      id: `app-\${Math.random().toString(36).substring(2, 9)}`,
      applicationNumber: `ADM-\${new Date().getFullYear()}-\${String(this.applications.length + 1).padStart(3, '0')}`,
      submissionDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    };
    this.applications.push(newApp);
    return newApp;
  }

  async updateApplicationStatus(id: string, newStatus: AdmissionStatus, notes?: string): Promise<AdmissionApplication> {
    await new Promise(resolve => setTimeout(resolve, 600));
    const idx = this.applications.findIndex(a => a.id === id);
    if (idx === -1) throw new Error('Application not found');
    
    this.applications[idx] = {
      ...this.applications[idx],
      status: newStatus,
      notes: notes ? `\${this.applications[idx].notes || ''}\\n[\${new Date().toISOString()}] \${notes}` : this.applications[idx].notes,
      lastUpdated: new Date().toISOString()
    };
    return this.applications[idx];
  }
}

export const admissionsService = new AdmissionsService();
