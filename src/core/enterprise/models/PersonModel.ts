export interface JumoPerson {
  id: string;
  identity: {
    fullName: string;
    previousNames?: string[];
    preferredName?: string;
    dateOfBirth: string;
    placeOfBirth?: string;
    nationality: string;
    gender: 'MALE' | 'FEMALE' | 'OTHER' | 'PREFER_NOT_TO_SAY';
    maritalStatus?: 'SINGLE' | 'MARRIED' | 'WIDOWED' | 'DIVORCED';
    identification: {
      type: 'NIN' | 'PASSPORT' | 'DRIVING_LICENSE' | 'OTHER';
      number: string;
      expiryDate?: string;
      documentUrl?: string;
    }[];
    photoUrl?: string;
    signatureUrl?: string;
  };
  contact: {
    primaryPhone: string;
    secondaryPhone?: string;
    email: string;
    physicalAddress: {
      street?: string;
      city: string;
      district: string;
      country: string;
      coordinates?: { lat: number; lng: number };
    };
    postalAddress?: string;
    emergencyContacts: {
      name: string;
      relationship: string;
      phone: string;
    }[];
  };
  academic?: {
    institutions: {
      name: string;
      program: string;
      qualification: string;
      startDate: string;
      endDate?: string;
      grades?: any;
      certificateUrl?: string;
    }[];
  };
  professional?: {
    currentEmployer?: string;
    jobTitle?: string;
    profession: string;
    history: {
      employer: string;
      role: string;
      startDate: string;
      endDate?: string;
    }[];
  };
  institutional?: {
    [productId: string]: {
      id: string; // Internal institutional ID
      role: string;
      department?: string;
      status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'ALUMNI';
      joiningDate: string;
      meta?: any;
    };
  };
  relationships: {
    personId: string;
    type: 'PARENT' | 'GUARDIAN' | 'SPOUSE' | 'CHILD' | 'NEXT_OF_KIN' | 'MENTOR';
    name: string;
  }[];
}
