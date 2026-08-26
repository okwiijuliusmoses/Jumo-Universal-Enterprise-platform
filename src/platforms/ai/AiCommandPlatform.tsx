/**
 * JUMO UEOS — Authoritative AI Command Platform
 * Dedicated management workspace for Multi-Model AI Router, Agent Swarm Registry, 
 * RAG Databases, Vector Semantic Memory, and Model Governance.
 */

import React from 'react';
import { AiPlatformView } from '../../../experience/pages/AiPlatformView';

export interface AiCommandPlatformProps {
  onNavigate?: (route: string) => void;
  [key: string]: any;
}

export const AiCommandPlatform: React.FC<AiCommandPlatformProps> = (props) => {
  return <AiPlatformView {...props} />;
};

export default AiCommandPlatform;
