/**
 * JUMO Nursery + Primary Consolidated ERP — Catering & Nutrition Service
 * Meal schedules, dietary/allergen restrictions, kitchen food rations inventory, food safety inspections, meal headcounts.
 */

export interface WeeklyMenuItem {
  id: string;
  dayOfWeek: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY';
  mealType: 'BREAKFAST' | 'MID_MORNING_ECD_SNACK' | 'LUNCH' | 'AFTERNOON_SNACK' | 'BOARDER_DINNER';
  title: string;
  description: string;
  targetAudience: 'ALL' | 'ECD_ONLY' | 'PRIMARY_ONLY' | 'BOARDERS';
  ingredients: string[];
  allergensPresent: string[];
  approximateCalories: number;
  nutritionalHighlights: string;
}

export interface StudentDietaryRestriction {
  id: string;
  studentId: string;
  studentName: string;
  classGrade: string;
  restrictionCategory: 'NUT_ALLERGY' | 'LACTOSE_INTOLERANT' | 'GLUTEN_FREE' | 'VEGETARIAN' | 'HALAL' | 'EGG_ALLERGY' | 'DIABETIC_LOW_SUGAR' | 'CUSTOM';
  severityLevel: 'MILD' | 'SEVERE_ANAPHYLACTIC';
  emergencySymptoms?: string;
  customDietNotes: string;
  substituteMealRequired: string;
  medicalNoteVerified: boolean;
  registeredDate: string;
}

export interface KitchenFoodRationItem {
  id: string;
  itemCode: string;
  itemName: string;
  category: 'GRAINS_CEREALS' | 'PULSES_BEANS' | 'VEGETABLES' | 'FRUITS' | 'DAIRY_EGGS' | 'MEAT_FISH' | 'OILS_FATS' | 'SEASONINGS';
  quantityInStock: number;
  unitOfMeasure: 'KG' | 'BAGS_50KG' | 'LITRES' | 'TRAYS' | 'TINS' | 'BUNCHES';
  minimumReorderThreshold: number;
  unitPriceUgx: number;
  supplierName: string;
  lastRestockedDate: string;
}

export interface FoodSafetyInspectionLog {
  id: string;
  logNumber: string;
  inspectionDate: string;
  mealSession: 'BREAKFAST' | 'LUNCH' | 'DINNER';
  hotHoldingTempC: number;
  coldHoldingTempC: number;
  waterQualityCertified: boolean;
  handwashingHygieneCompliance: boolean;
  cleanlinessScorePct: number;
  foodSampleRetained48Hrs: boolean;
  leadChefName: string;
  inspectedBy: string;
  status: 'PASSED' | 'WARNING_ISSUED' | 'ACTION_REQUIRED';
  inspectionRemarks?: string;
}

export interface DailyMealServingLog {
  id: string;
  date: string;
  mealType: string;
  expectedStudentHeadcount: number;
  actualMealsServed: number;
  specialDietMealsServed: number;
  leftoverDisposalKg: number;
  supervisorName: string;
  notes?: string;
}

class CateringService {
  private static instance: CateringService;

  private weeklyMenus: WeeklyMenuItem[] = [
    {
      id: 'MENU-01',
      dayOfWeek: 'MONDAY',
      mealType: 'MID_MORNING_ECD_SNACK',
      title: 'Nutritious Fortified Porridge with Sweet Banana',
      description: 'Millet and soy flour blend sweetened with natural honey and fresh Bogoya bananas.',
      targetAudience: 'ECD_ONLY',
      ingredients: ['Finger millet', 'Soy flour', 'Milk', 'Honey', 'Bananas'],
      allergensPresent: ['Milk/Dairy', 'Soy'],
      approximateCalories: 280,
      nutritionalHighlights: 'High Iron, Calcium & Vitamin B complex for early brain development.'
    },
    {
      id: 'MENU-02',
      dayOfWeek: 'MONDAY',
      mealType: 'LUNCH',
      title: 'Steamed Matooke, Brown Rice & Fresh Groundnut Stew with Steamed Dodo Greens',
      description: 'Traditional Ugandan wholesome balanced lunch with rich peanut paste sauce and iron-rich amaranth greens.',
      targetAudience: 'ALL',
      ingredients: ['Plantain (Matooke)', 'Rice', 'Red Groundnuts (Ebinyeebwa)', 'Amaranth greens', 'Tomatoes', 'Onions'],
      allergensPresent: ['Peanuts/Tree Nuts'],
      approximateCalories: 620,
      nutritionalHighlights: 'Plant protein, complex carbs and essential minerals.'
    },
    {
      id: 'MENU-03',
      dayOfWeek: 'TUESDAY',
      mealType: 'LUNCH',
      title: 'Yellow Posho (Maize Meal), Yellow Beans in Carrot Broth & Steamed Cabbage',
      description: 'Slow-cooked farm-fresh yellow beans in rich vegetable broth with fortified maize meal.',
      targetAudience: 'ALL',
      ingredients: ['Fortified Maize Flour', 'Yellow Beans', 'Carrots', 'Cabbage', 'Garlic'],
      allergensPresent: [],
      approximateCalories: 580,
      nutritionalHighlights: 'High dietary fiber, zinc and clean carbohydrates.'
    },
    {
      id: 'MENU-04',
      dayOfWeek: 'WEDNESDAY',
      mealType: 'LUNCH',
      title: 'Sweet Potatoes, Irish Potato Wedges & Tender Beef Stew with Sukuma Wiki',
      description: 'Lean grass-fed beef simmered in natural tomato gravy served with boiled tubers and collard greens.',
      targetAudience: 'ALL',
      ingredients: ['Sweet Potatoes', 'Irish Potatoes', 'Lean Beef', 'Collard greens', 'Green bell peppers'],
      allergensPresent: [],
      approximateCalories: 650,
      nutritionalHighlights: 'High biological value protein and Vitamin A.'
    },
    {
      id: 'MENU-05',
      dayOfWeek: 'FRIDAY',
      mealType: 'LUNCH',
      title: 'Pilau Rice with Green Peas Stew & Fresh Watermelon Slices',
      description: 'Festive aromatic pilau with fresh garden peas, shredded salad and chilled fruit.',
      targetAudience: 'ALL',
      ingredients: ['Super Rice', 'Pilau Masala Spices', 'Green Peas', 'Watermelon', 'Cucumber'],
      allergensPresent: [],
      approximateCalories: 610,
      nutritionalHighlights: 'Hydrating vitamins, Lycopene and antioxidant rich.'
    }
  ];

  private dietaryRestrictions: StudentDietaryRestriction[] = [
    {
      id: 'DR-001',
      studentId: 'STU-ECD-001',
      studentName: 'Alice Katusiime',
      classGrade: 'Middle Class',
      restrictionCategory: 'NUT_ALLERGY',
      severityLevel: 'SEVERE_ANAPHYLACTIC',
      emergencySymptoms: 'Facial swelling, hives, wheezing cough.',
      customDietNotes: 'Strict zero-peanut policy. Prepare separate bean or vegetable stew in sterile pot.',
      substituteMealRequired: 'Lentils / Yellow bean sauce on G-nut days',
      medicalNoteVerified: true,
      registeredDate: '2026-02-01'
    },
    {
      id: 'DR-002',
      studentId: 'STU-PRI-045',
      studentName: 'David Otim',
      classGrade: 'P.4 Blue',
      restrictionCategory: 'LACTOSE_INTOLERANT',
      severityLevel: 'MILD',
      emergencySymptoms: 'Bloating, abdominal cramps.',
      customDietNotes: 'Porridge to be made with water and soy/oat milk substitute only; no dairy butter.',
      substituteMealRequired: 'Non-dairy porridge & black tea',
      medicalNoteVerified: true,
      registeredDate: '2026-02-04'
    },
    {
      id: 'DR-003',
      studentId: 'STU-PRI-112',
      studentName: 'Brian Mukasa',
      classGrade: 'P.6 Red',
      restrictionCategory: 'HALAL',
      severityLevel: 'MILD',
      customDietNotes: 'Must receive Halal certified meats or vegetarian egg/bean alternative.',
      substituteMealRequired: 'Halal Beef / Boiled eggs',
      medicalNoteVerified: false,
      registeredDate: '2026-02-03'
    }
  ];

  private rationsInventory: KitchenFoodRationItem[] = [
    {
      id: 'RAT-001',
      itemCode: 'RAT-GRAIN-POSH',
      itemName: 'Fortified First-Grade Maize Flour (Posho)',
      category: 'GRAINS_CEREALS',
      quantityInStock: 18,
      unitOfMeasure: 'BAGS_50KG',
      minimumReorderThreshold: 5,
      unitPriceUgx: 135000,
      supplierName: 'Magere Grain Millers Cooperative',
      lastRestockedDate: '2026-08-15'
    },
    {
      id: 'RAT-002',
      itemCode: 'RAT-PULSE-BEAN',
      itemName: 'Yellow Nambale Sugar Beans (Sorted)',
      category: 'PULSES_BEANS',
      quantityInStock: 12,
      unitOfMeasure: 'BAGS_50KG',
      minimumReorderThreshold: 4,
      unitPriceUgx: 185000,
      supplierName: 'Kisenyi Produce Wholesale Ltd',
      lastRestockedDate: '2026-08-10'
    },
    {
      id: 'RAT-003',
      itemCode: 'RAT-NUT-GNUT',
      itemName: 'Red Groundnut Flour (Ebinyeebwa Paste)',
      category: 'PULSES_BEANS',
      quantityInStock: 85,
      unitOfMeasure: 'KG',
      minimumReorderThreshold: 25,
      unitPriceUgx: 8500,
      supplierName: 'Soroti Farmers Union',
      lastRestockedDate: '2026-08-18'
    },
    {
      id: 'RAT-004',
      itemCode: 'RAT-GRAIN-RICE',
      itemName: 'Kaiso / Super Long-grain Rice',
      category: 'GRAINS_CEREALS',
      quantityInStock: 10,
      unitOfMeasure: 'BAGS_50KG',
      minimumReorderThreshold: 3,
      unitPriceUgx: 210000,
      supplierName: 'Tilda Uganda / Kibimba Mills',
      lastRestockedDate: '2026-08-14'
    },
    {
      id: 'RAT-005',
      itemCode: 'RAT-DAIRY-MILK',
      itemName: 'Pasteurized Fresh Whole Milk (50L Cans)',
      category: 'DAIRY_EGGS',
      quantityInStock: 150,
      unitOfMeasure: 'LITRES',
      minimumReorderThreshold: 50,
      unitPriceUgx: 2400,
      supplierName: 'Jessee Dairy Farmers Mbarara',
      lastRestockedDate: '2026-08-22'
    },
    {
      id: 'RAT-006',
      itemCode: 'RAT-OIL-COOK',
      itemName: 'Refined Cooking Palm Oil (Mukwano 20L Jerrycan)',
      category: 'OILS_FATS',
      quantityInStock: 6,
      unitOfMeasure: 'TINS',
      minimumReorderThreshold: 2,
      unitPriceUgx: 145000,
      supplierName: 'Mukwano Industries',
      lastRestockedDate: '2026-08-11'
    }
  ];

  private inspections: FoodSafetyInspectionLog[] = [
    {
      id: 'FSI-001',
      logNumber: 'HYG-2026-0823-1',
      inspectionDate: '2026-08-23',
      mealSession: 'LUNCH',
      hotHoldingTempC: 74,
      coldHoldingTempC: 4,
      waterQualityCertified: true,
      handwashingHygieneCompliance: true,
      cleanlinessScorePct: 96,
      foodSampleRetained48Hrs: true,
      leadChefName: 'Chef Moses Kigozi',
      inspectedBy: 'Madam Joy Nabwire (Catering Lead)',
      status: 'PASSED',
      inspectionRemarks: 'All food warmers above 70°C; hairnets, aprons and gloves worn consistently by all kitchen staff.'
    },
    {
      id: 'FSI-002',
      logNumber: 'HYG-2026-0822-1',
      inspectionDate: '2026-08-22',
      mealSession: 'LUNCH',
      hotHoldingTempC: 72,
      coldHoldingTempC: 5,
      waterQualityCertified: true,
      handwashingHygieneCompliance: true,
      cleanlinessScorePct: 94,
      foodSampleRetained48Hrs: true,
      leadChefName: 'Chef Moses Kigozi',
      inspectedBy: 'Madam Joy Nabwire (Catering Lead)',
      status: 'PASSED'
    }
  ];

  private mealServingLogs: DailyMealServingLog[] = [
    {
      id: 'SRV-001',
      date: '2026-08-22',
      mealType: 'LUNCH',
      expectedStudentHeadcount: 480,
      actualMealsServed: 472,
      specialDietMealsServed: 14,
      leftoverDisposalKg: 3.5,
      supervisorName: 'Chef Moses Kigozi',
      notes: 'ECD dining hall served at 12:15 PM; Primary P.1-P.7 served in 2 staggered shifts at 1:00 PM & 1:30 PM.'
    }
  ];

  private constructor() {}

  public static getInstance(): CateringService {
    if (!CateringService.instance) {
      CateringService.instance = new CateringService();
    }
    return CateringService.instance;
  }

  // Menus
  public getWeeklyMenus(): WeeklyMenuItem[] {
    return [...this.weeklyMenus];
  }

  public saveMenuItem(data: Omit<WeeklyMenuItem, 'id'>): WeeklyMenuItem {
    const newItem: WeeklyMenuItem = {
      id: `MENU-${Date.now()}`,
      ...data
    };
    this.weeklyMenus.push(newItem);
    return newItem;
  }

  // Dietary
  public getDietaryRestrictions(): StudentDietaryRestriction[] {
    return [...this.dietaryRestrictions];
  }

  public registerDietaryRestriction(data: Omit<StudentDietaryRestriction, 'id' | 'registeredDate'>): StudentDietaryRestriction {
    const newRecord: StudentDietaryRestriction = {
      id: `DR-${Date.now()}`,
      registeredDate: new Date().toISOString().split('T')[0],
      ...data
    };
    this.dietaryRestrictions.unshift(newRecord);
    return newRecord;
  }

  // Inventory
  public getRationsInventory(): KitchenFoodRationItem[] {
    return [...this.rationsInventory];
  }

  public restockInventory(itemId: string, additionalQuantity: number): KitchenFoodRationItem {
    const item = this.rationsInventory.find(r => r.id === itemId);
    if (!item) throw new Error('Inventory item not found');
    item.quantityInStock += additionalQuantity;
    item.lastRestockedDate = new Date().toISOString().split('T')[0];
    return item;
  }

  public issueRation(itemId: string, issuedQuantity: number): KitchenFoodRationItem {
    const item = this.rationsInventory.find(r => r.id === itemId);
    if (!item) throw new Error('Inventory item not found');
    if (item.quantityInStock < issuedQuantity) throw new Error('Insufficient inventory in store');
    item.quantityInStock -= issuedQuantity;
    return item;
  }

  public addNewRationItem(data: Omit<KitchenFoodRationItem, 'id' | 'lastRestockedDate'>): KitchenFoodRationItem {
    const newItem: KitchenFoodRationItem = {
      id: `RAT-${Date.now()}`,
      lastRestockedDate: new Date().toISOString().split('T')[0],
      ...data
    };
    this.rationsInventory.push(newItem);
    return newItem;
  }

  // Safety Inspections
  public getInspections(): FoodSafetyInspectionLog[] {
    return [...this.inspections];
  }

  public recordInspection(data: Omit<FoodSafetyInspectionLog, 'id' | 'logNumber'>): FoodSafetyInspectionLog {
    const num = String(this.inspections.length + 1).padStart(3, '0');
    const newLog: FoodSafetyInspectionLog = {
      id: `FSI-${Date.now()}`,
      logNumber: `HYG-${new Date().toISOString().split('T')[0].replace(/-/g, '')}-${num}`,
      ...data
    };
    this.inspections.unshift(newLog);
    return newLog;
  }

  // Meal Serving
  public getMealServingLogs(): DailyMealServingLog[] {
    return [...this.mealServingLogs];
  }

  public recordMealServing(data: Omit<DailyMealServingLog, 'id'>): DailyMealServingLog {
    const newLog: DailyMealServingLog = {
      id: `SRV-${Date.now()}`,
      ...data
    };
    this.mealServingLogs.unshift(newLog);
    return newLog;
  }

  public getCateringStats() {
    const totalWeeklyPlannedMeals = this.weeklyMenus.length;
    const specialDietPupilsCount = this.dietaryRestrictions.length;
    const severeAllergiesCount = this.dietaryRestrictions.filter(d => d.severityLevel === 'SEVERE_ANAPHYLACTIC').length;
    const lowStockRationsCount = this.rationsInventory.filter(r => r.quantityInStock <= r.minimumReorderThreshold).length;
    const averageHygieneScore = this.inspections.length > 0 
      ? Math.round(this.inspections.reduce((acc, i) => acc + i.cleanlinessScorePct, 0) / this.inspections.length)
      : 100;

    return {
      totalWeeklyPlannedMeals,
      specialDietPupilsCount,
      severeAllergiesCount,
      lowStockRationsCount,
      averageHygieneScore
    };
  }
}

export const cateringService = CateringService.getInstance();
