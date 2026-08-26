/**
 * JUMO Relationship Manager (JRM) — Sovereign Domain Types
 */

export interface JrmEntity {
  id: string;
  type: 'PERSON' | 'ORGANIZATION' | 'INSTITUTION';
  roles: ('STUDENT' | 'PAYER' | 'VENDOR' | 'EMPLOYEE' | 'CUSTOMER' | 'ADMIN')[];
  fullName: string;
  email?: string;
  phone?: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface JrmInteraction {
  id: string;
  entityId: string;
  sourceProduct: 'EDUCATION' | 'DIGITAL_PAY' | 'FAAP' | 'MANUFACTURING' | 'SYSTEM' | 'CHURCH_ERP';
  interactionType: 'TRANSACTION' | 'REGISTRATION' | 'COMMUNICATION' | 'ADMISSION' | 'AUDIT' | 'COUNSELLING';
  description: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface JrmSegment {
  id: string;
  name: string;
  criteria: string;
  entityIds: string[];
}
