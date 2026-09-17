/**
 * JUMO UEOS
 * Enterprise Directorate Registry
 */

export class DirectorateRegistry {
  constructor() {
    this.status = "ONLINE";
    this.directorates = [];
  }

  register(directorate) {
    const exists = this.directorates.find(d => d.id === directorate.id);
    if (exists) return exists;

    const record = {
      id: directorate.id || `dir-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      name: directorate.name,
      erpId: directorate.erpId || null,
      head: directorate.head || "Director-General",
      departments: directorate.departments || [],
      status: directorate.status || "ACTIVE",
      createdAt: new Date().toISOString()
    };
    this.directorates.push(record);
    return record;
  }

  get(id) {
    return this.directorates.find(d => d.id === id);
  }

  list() {
    return this.directorates;
  }

  getByERP(erpId) {
    return this.directorates.filter(d => d.erpId === erpId);
  }

  health() {
    return {
      registry: "JUMO Directorate Registry",
      status: this.status,
      directorates: this.directorates.length
    };
  }
}

export const directorateRegistry = new DirectorateRegistry();
