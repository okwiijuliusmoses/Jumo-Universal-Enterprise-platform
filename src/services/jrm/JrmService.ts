/**
 * JUMO Relationship Manager (JRM) — Authoritative Platform Service
 */

import { JrmEntity, JrmInteraction } from './types';

export class JrmService {
  private static instance: JrmService;

  private entities: JrmEntity[] = [
    { 
      id: 'e1', 
      type: 'PERSON', 
      roles: ['STUDENT', 'PAYER'], 
      fullName: 'Learner 001', 
      email: 'learner001@jumo.edu', 
      createdAt: '2026-01-01' 
    }
  ];

  private interactions: JrmInteraction[] = [
    { 
      id: 'i1', 
      entityId: 'e1', 
      sourceProduct: 'EDUCATION', 
      interactionType: 'ADMISSION', 
      description: 'Admitted to Hub 01 - Programme 01', 
      timestamp: '2026-01-15T10:00:00Z' 
    }
  ];

  private constructor() {}

  public static getInstance(): JrmService {
    if (!JrmService.instance) {
      JrmService.instance = new JrmService();
    }
    return JrmService.instance;
  }

  getEntities() { return [...this.entities]; }
  
  getEntityProfile(entityId: string) {
    const entity = this.entities.find(e => e.id === entityId);
    if (!entity) return null;
    
    const entityInteractions = this.interactions.filter(i => i.entityId === entityId);
    return {
      ...entity,
      interactions: entityInteractions
    };
  }

  recordInteraction(interaction: Omit<JrmInteraction, 'id' | 'timestamp'>) {
    const newInteraction: JrmInteraction = {
      ...interaction,
      id: `jrm_int_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString()
    };
    this.interactions.push(newInteraction);
    return newInteraction;
  }
}
