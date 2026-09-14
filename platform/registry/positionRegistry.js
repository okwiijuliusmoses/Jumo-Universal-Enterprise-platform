/**
 * JUMO UEOS
 * Enterprise Position Registry
 */

export class PositionRegistry {
  constructor() {
    this.status = "ONLINE";
    this.positions = [];
  }

  register(position) {
    const exists = this.positions.find(p => p.id === position.id);
    if (exists) return exists;

    const record = {
      id: position.id || `pos-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      title: position.title,
      departmentId: position.departmentId || null,
      directorateId: position.directorateId || null,
      erpId: position.erpId || null,
      grade: position.grade || "L4",
      reportsTo: position.reportsTo || null,
      status: position.status || "ACTIVE",
      createdAt: new Date().toISOString()
    };
    this.positions.push(record);
    return record;
  }

  get(id) {
    return this.positions.find(p => p.id === id);
  }

  list() {
    return this.positions;
  }

  getByDepartment(departmentId) {
    return this.positions.filter(p => p.departmentId === departmentId);
  }

  health() {
    return {
      registry: "JUMO Position Registry",
      status: this.status,
      positions: this.positions.length
    };
  }
}

export const positionRegistry = new PositionRegistry();
