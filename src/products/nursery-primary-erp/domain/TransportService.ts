/**
 * JUMO Nursery + Primary Consolidated ERP — Transport Service
 * Fleet management, route planning, student allocations, daily boarding manifests, maintenance & fuel records.
 */

export interface TransportVehicle {
  id: string;
  busCode: string;
  registrationNumber: string;
  model: string;
  seatingCapacity: number;
  driverName: string;
  driverPhone: string;
  conductorName: string;
  conductorPhone: string;
  insuranceExpiryDate: string;
  fitnessInspectionDate: string;
  status: 'ACTIVE_SERVICE' | 'STANDBY' | 'MAINTENANCE_GARAGE' | 'OUT_OF_SERVICE';
  notes?: string;
}

export interface RouteStop {
  stopName: string;
  stageOrder: number;
  morningPickupTime: string;
  eveningDropoffTime: string;
  landmarkDescription?: string;
}

export interface TransportRoute {
  id: string;
  routeCode: string;
  routeName: string;
  coverageZone: string;
  assignedBusId: string;
  assignedBusCode: string;
  stops: RouteStop[];
  totalAllocatedStudents: number;
  status: 'ACTIVE' | 'SUSPENDED';
}

export interface StudentTransportAllocation {
  id: string;
  studentId: string;
  studentName: string;
  classGrade: string;
  routeId: string;
  routeCode: string;
  designatedStop: string;
  serviceType: 'TWO_WAY' | 'MORNING_ONLY' | 'EVENING_ONLY';
  guardianName: string;
  guardianPhone: string;
  termlyFeeUgx: number;
  paymentStatus: 'PAID' | 'PARTIAL' | 'PENDING';
  status: 'ACTIVE' | 'SUSPENDED';
  allocatedDate: string;
}

export interface PupilBoardingEntry {
  studentId: string;
  studentName: string;
  classGrade: string;
  designatedStop: string;
  status: 'BOARDED' | 'ABSENT' | 'DROPPED_OFF' | 'PENDING';
  checkedTime?: string;
  checkedBy?: string;
}

export interface DailyTripManifest {
  id: string;
  manifestNumber: string;
  tripDate: string;
  routeId: string;
  routeCode: string;
  tripDirection: 'MORNING_PICKUP' | 'EVENING_DROPOFF';
  busCode: string;
  driverName: string;
  conductorName: string;
  departureTime?: string;
  completionTime?: string;
  pupilEntries: PupilBoardingEntry[];
  status: 'SCHEDULED' | 'IN_TRANSIT' | 'COMPLETED';
}

export interface VehicleMaintenanceLog {
  id: string;
  vehicleId: string;
  busCode: string;
  logDate: string;
  odometerReadingKm: number;
  logType: 'SCHEDULED_SERVICE' | 'REPAIR' | 'TYRE_REPLACEMENT' | 'FUEL_FILLUP' | 'INSPECTION';
  description: string;
  costUgx: number;
  serviceProviderWorkshop: string;
  fuelLitres?: number;
  approvedBy: string;
}

class TransportService {
  private static instance: TransportService;

  private vehicles: TransportVehicle[] = [
    {
      id: 'BUS-01',
      busCode: 'BUS-01 (Lion)',
      registrationNumber: 'UBF 452A',
      model: 'Isuzu NPR 36-Seater Bus',
      seatingCapacity: 36,
      driverName: 'Mr. Patrick Mukasa',
      driverPhone: '+256772908123',
      conductorName: 'Madam Sarah Nassozi',
      conductorPhone: '+256782349012',
      insuranceExpiryDate: '2027-01-15',
      fitnessInspectionDate: '2026-12-10',
      status: 'ACTIVE_SERVICE',
      notes: 'Equipped with child safety harness and GPS speed governor.'
    },
    {
      id: 'BUS-02',
      busCode: 'BUS-02 (Eagle)',
      registrationNumber: 'UBG 881D',
      model: 'Toyota Coaster 29-Seater',
      seatingCapacity: 29,
      driverName: 'Mr. Denis Byamukama',
      driverPhone: '+256752445566',
      conductorName: 'Madam Rose Namutebi',
      conductorPhone: '+256701998877',
      insuranceExpiryDate: '2027-03-20',
      fitnessInspectionDate: '2027-02-15',
      status: 'ACTIVE_SERVICE'
    },
    {
      id: 'BUS-03',
      busCode: 'BUS-03 (Cheetah)',
      registrationNumber: 'UBK 119C',
      model: 'Toyota HiAce Van (ECD Spec)',
      seatingCapacity: 16,
      driverName: 'Mr. Julius Katende',
      driverPhone: '+256774112233',
      conductorName: 'Auntie Harriet Nakato',
      conductorPhone: '+256783990011',
      insuranceExpiryDate: '2026-11-30',
      fitnessInspectionDate: '2026-10-15',
      status: 'STANDBY',
      notes: 'Dedicated nursery booster seats installed.'
    }
  ];

  private routes: TransportRoute[] = [
    {
      id: 'RT-01',
      routeCode: 'ROUTE-A (Kisasi / Kyanja)',
      routeName: 'Ntinda - Kisasi - Kyanja - Kulambiro',
      coverageZone: 'Zone 1 (North-East Kampala)',
      assignedBusId: 'BUS-01',
      assignedBusCode: 'BUS-01 (Lion)',
      stops: [
        { stopName: 'Ntinda Capital Shoppers Stage', stageOrder: 1, morningPickupTime: '06:30 AM', eveningDropoffTime: '04:45 PM', landmarkDescription: 'Opposite Shell Ntinda' },
        { stopName: 'Kisasi Total Station Stage', stageOrder: 2, morningPickupTime: '06:45 AM', eveningDropoffTime: '05:00 PM', landmarkDescription: 'Near Kisasi Roundabout' },
        { stopName: 'Kyanja Ring Road Junction', stageOrder: 3, morningPickupTime: '07:05 AM', eveningDropoffTime: '05:20 PM', landmarkDescription: 'Near Kensington Heights' },
        { stopName: 'Kulambiro Trading Centre', stageOrder: 4, morningPickupTime: '07:20 AM', eveningDropoffTime: '05:35 PM', landmarkDescription: 'Kulambiro Stage Junction' }
      ],
      totalAllocatedStudents: 28,
      status: 'ACTIVE'
    },
    {
      id: 'RT-02',
      routeCode: 'ROUTE-B (Naalya / Kiwatule)',
      routeName: 'Bukoto - Kiwatule - Naalya - Namugongo',
      coverageZone: 'Zone 2 (East Corridor)',
      assignedBusId: 'BUS-02',
      assignedBusCode: 'BUS-02 (Eagle)',
      stops: [
        { stopName: 'Bukoto Brown Flats Stage', stageOrder: 1, morningPickupTime: '06:35 AM', eveningDropoffTime: '04:40 PM', landmarkDescription: 'Main gate junction' },
        { stopName: 'Kiwatule Recreation Centre', stageOrder: 2, morningPickupTime: '06:50 AM', eveningDropoffTime: '05:00 PM', landmarkDescription: 'Entrance gate' },
        { stopName: 'Naalya Quality Supermarket', stageOrder: 3, morningPickupTime: '07:10 AM', eveningDropoffTime: '05:15 PM', landmarkDescription: 'Naalya roundabout stage' },
        { stopName: 'Namugongo Shrine Stage', stageOrder: 4, morningPickupTime: '07:25 AM', eveningDropoffTime: '05:30 PM', landmarkDescription: 'Catholic Basilica gate' }
      ],
      totalAllocatedStudents: 24,
      status: 'ACTIVE'
    }
  ];

  private allocations: StudentTransportAllocation[] = [
    {
      id: 'ALC-001',
      studentId: 'STU-ECD-001',
      studentName: 'Alice Katusiime',
      classGrade: 'Middle Class',
      routeId: 'RT-01',
      routeCode: 'ROUTE-A (Kisasi / Kyanja)',
      designatedStop: 'Kyanja Ring Road Junction',
      serviceType: 'TWO_WAY',
      guardianName: 'John Katusiime',
      guardianPhone: '+256772123456',
      termlyFeeUgx: 450000,
      paymentStatus: 'PAID',
      status: 'ACTIVE',
      allocatedDate: '2026-02-02'
    },
    {
      id: 'ALC-002',
      studentId: 'STU-PRI-045',
      studentName: 'David Otim',
      classGrade: 'P.4 Blue',
      routeId: 'RT-01',
      routeCode: 'ROUTE-A (Kisasi / Kyanja)',
      designatedStop: 'Kisasi Total Station Stage',
      serviceType: 'TWO_WAY',
      guardianName: 'Sarah Otim',
      guardianPhone: '+256752987654',
      termlyFeeUgx: 450000,
      paymentStatus: 'PAID',
      status: 'ACTIVE',
      allocatedDate: '2026-02-02'
    },
    {
      id: 'ALC-003',
      studentId: 'STU-PRI-112',
      studentName: 'Brian Mukasa',
      classGrade: 'P.6 Red',
      routeId: 'RT-02',
      routeCode: 'ROUTE-B (Naalya / Kiwatule)',
      designatedStop: 'Naalya Quality Supermarket',
      serviceType: 'MORNING_ONLY',
      guardianName: 'Timothy Mukasa',
      guardianPhone: '+256701554433',
      termlyFeeUgx: 300000,
      paymentStatus: 'PAID',
      status: 'ACTIVE',
      allocatedDate: '2026-02-03'
    }
  ];

  private manifests: DailyTripManifest[] = [
    {
      id: 'MAN-001',
      manifestNumber: 'TRIP-2026-0823-M1',
      tripDate: '2026-08-23',
      routeId: 'RT-01',
      routeCode: 'ROUTE-A (Kisasi / Kyanja)',
      tripDirection: 'MORNING_PICKUP',
      busCode: 'BUS-01 (Lion)',
      driverName: 'Mr. Patrick Mukasa',
      conductorName: 'Madam Sarah Nassozi',
      departureTime: '06:25 AM',
      completionTime: '07:45 AM',
      status: 'COMPLETED',
      pupilEntries: [
        {
          studentId: 'STU-ECD-001',
          studentName: 'Alice Katusiime',
          classGrade: 'Middle Class',
          designatedStop: 'Kyanja Ring Road Junction',
          status: 'DROPPED_OFF',
          checkedTime: '07:08 AM',
          checkedBy: 'Madam Sarah Nassozi'
        },
        {
          studentId: 'STU-PRI-045',
          studentName: 'David Otim',
          classGrade: 'P.4 Blue',
          designatedStop: 'Kisasi Total Station Stage',
          status: 'DROPPED_OFF',
          checkedTime: '06:48 AM',
          checkedBy: 'Madam Sarah Nassozi'
        }
      ]
    },
    {
      id: 'MAN-002',
      manifestNumber: 'TRIP-2026-0823-E1',
      tripDate: '2026-08-23',
      routeId: 'RT-01',
      routeCode: 'ROUTE-A (Kisasi / Kyanja)',
      tripDirection: 'EVENING_DROPOFF',
      busCode: 'BUS-01 (Lion)',
      driverName: 'Mr. Patrick Mukasa',
      conductorName: 'Madam Sarah Nassozi',
      status: 'SCHEDULED',
      pupilEntries: [
        {
          studentId: 'STU-ECD-001',
          studentName: 'Alice Katusiime',
          classGrade: 'Middle Class',
          designatedStop: 'Kyanja Ring Road Junction',
          status: 'PENDING'
        },
        {
          studentId: 'STU-PRI-045',
          studentName: 'David Otim',
          classGrade: 'P.4 Blue',
          designatedStop: 'Kisasi Total Station Stage',
          status: 'PENDING'
        }
      ]
    }
  ];

  private maintenanceLogs: VehicleMaintenanceLog[] = [
    {
      id: 'LOG-M1',
      vehicleId: 'BUS-01',
      busCode: 'BUS-01 (Lion)',
      logDate: '2026-08-20',
      odometerReadingKm: 48250,
      logType: 'FUEL_FILLUP',
      description: 'Standard diesel full-tank replenishment for morning & evening shuttle runs.',
      costUgx: 350000,
      fuelLitres: 75,
      serviceProviderWorkshop: 'TotalEnergies Ntinda Service Station',
      approvedBy: 'Transport Manager'
    },
    {
      id: 'LOG-M2',
      vehicleId: 'BUS-02',
      busCode: 'BUS-02 (Eagle)',
      logDate: '2026-08-12',
      odometerReadingKm: 34120,
      logType: 'SCHEDULED_SERVICE',
      description: '5,000 km oil change, brake pad inspection and air filter replacement.',
      costUgx: 620000,
      serviceProviderWorkshop: 'Victoria Motors Ltd Kampala',
      approvedBy: 'Bursar & Transport Manager'
    }
  ];

  private constructor() {}

  public static getInstance(): TransportService {
    if (!TransportService.instance) {
      TransportService.instance = new TransportService();
    }
    return TransportService.instance;
  }

  // Vehicles
  public getVehicles(): TransportVehicle[] {
    return [...this.vehicles];
  }

  public addVehicle(data: Omit<TransportVehicle, 'id'>): TransportVehicle {
    const newVehicle: TransportVehicle = {
      id: `BUS-${String(this.vehicles.length + 1).padStart(2, '0')}`,
      ...data
    };
    this.vehicles.push(newVehicle);
    return newVehicle;
  }

  public updateVehicleStatus(id: string, status: TransportVehicle['status']): TransportVehicle {
    const v = this.vehicles.find(item => item.id === id);
    if (!v) throw new Error('Vehicle not found');
    v.status = status;
    return v;
  }

  // Routes
  public getRoutes(): TransportRoute[] {
    return [...this.routes];
  }

  public addRoute(data: Omit<TransportRoute, 'id' | 'totalAllocatedStudents'>): TransportRoute {
    const newRoute: TransportRoute = {
      id: `RT-${String(this.routes.length + 1).padStart(2, '0')}`,
      totalAllocatedStudents: 0,
      ...data
    };
    this.routes.push(newRoute);
    return newRoute;
  }

  // Student Allocations
  public getAllocations(): StudentTransportAllocation[] {
    return [...this.allocations];
  }

  public allocateStudent(data: Omit<StudentTransportAllocation, 'id' | 'allocatedDate'>): StudentTransportAllocation {
    const newAllocation: StudentTransportAllocation = {
      id: `ALC-${Date.now()}`,
      allocatedDate: new Date().toISOString().split('T')[0],
      ...data
    };
    this.allocations.unshift(newAllocation);
    
    // Update route student count
    const route = this.routes.find(r => r.id === data.routeId);
    if (route) {
      route.totalAllocatedStudents += 1;
    }

    return newAllocation;
  }

  // Daily Manifests
  public getManifests(): DailyTripManifest[] {
    return [...this.manifests];
  }

  public createTripManifest(data: Omit<DailyTripManifest, 'id' | 'manifestNumber' | 'status'>): DailyTripManifest {
    const dateTag = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const dirTag = data.tripDirection === 'MORNING_PICKUP' ? 'M' : 'E';
    const newManifest: DailyTripManifest = {
      id: `MAN-${Date.now()}`,
      manifestNumber: `TRIP-${dateTag}-${dirTag}${this.manifests.length + 1}`,
      status: 'SCHEDULED',
      ...data
    };
    this.manifests.unshift(newManifest);
    return newManifest;
  }

  public updateBoardingStatus(manifestId: string, studentId: string, status: PupilBoardingEntry['status'], checkerName: string): DailyTripManifest {
    const man = this.manifests.find(m => m.id === manifestId);
    if (!man) throw new Error('Trip manifest not found');
    const entry = man.pupilEntries.find(p => p.studentId === studentId);
    if (entry) {
      entry.status = status;
      entry.checkedTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      entry.checkedBy = checkerName;
    }
    return man;
  }

  public updateTripStatus(manifestId: string, status: DailyTripManifest['status']): DailyTripManifest {
    const man = this.manifests.find(m => m.id === manifestId);
    if (!man) throw new Error('Trip manifest not found');
    man.status = status;
    if (status === 'IN_TRANSIT' && !man.departureTime) {
      man.departureTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    if (status === 'COMPLETED' && !man.completionTime) {
      man.completionTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return man;
  }

  // Maintenance
  public getMaintenanceLogs(): VehicleMaintenanceLog[] {
    return [...this.maintenanceLogs];
  }

  public recordMaintenance(data: Omit<VehicleMaintenanceLog, 'id'>): VehicleMaintenanceLog {
    const newLog: VehicleMaintenanceLog = {
      id: `LOG-M${Date.now()}`,
      ...data
    };
    this.maintenanceLogs.unshift(newLog);
    return newLog;
  }

  public getTransportStats() {
    const totalFleet = this.vehicles.length;
    const activeFleet = this.vehicles.filter(v => v.status === 'ACTIVE_SERVICE').length;
    const totalRoutes = this.routes.length;
    const totalPupilsOnTransport = this.allocations.filter(a => a.status === 'ACTIVE').length;
    const totalCapacity = this.vehicles.reduce((acc, v) => acc + v.seatingCapacity, 0);
    const capacityUtilizationPct = totalCapacity > 0 ? Math.round((totalPupilsOnTransport / totalCapacity) * 100) : 0;

    return {
      totalFleet,
      activeFleet,
      totalRoutes,
      totalPupilsOnTransport,
      totalCapacity,
      capacityUtilizationPct
    };
  }
}

export const transportService = TransportService.getInstance();
