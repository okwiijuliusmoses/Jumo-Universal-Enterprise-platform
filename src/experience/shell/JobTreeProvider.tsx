// JUMO UEOS — Authoritative Job Tree and Hierarchy Provider
// Exposes the complete navigable artifact hierarchy of the selected manufacturing job globally.
// Standard: JDPM-TREE-PROVIDER-2026

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProductManufacturingJob } from '../../core/factory/registry/HubRegistryTypes';
import { 
  ManufacturedProductExplorerEngine, 
  ManufacturedProductNode, 
  ManufacturedArtifactDetails, 
  QualityControlMetrics 
} from '../../core/factory/explorer/ManufacturedProductExplorerEngine';
import { useJobNavigation } from './JobNavigationContext';

export interface JobTreeContextType {
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;
  selectedNode: ManufacturedProductNode | null;
  jobTree: ManufacturedProductNode | null;
  artifactDetails: ManufacturedArtifactDetails | null;
  qualityMetrics: QualityControlMetrics | null;
  activeJob: ProductManufacturingJob | null;
}

const JobTreeContext = createContext<JobTreeContextType | undefined>(undefined);

export const JobTreeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { selectedJob } = useJobNavigation();
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [jobTree, setJobTree] = useState<ManufacturedProductNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<ManufacturedProductNode | null>(null);
  const [artifactDetails, setArtifactDetails] = useState<ManufacturedArtifactDetails | null>(null);
  const [qualityMetrics, setQualityMetrics] = useState<QualityControlMetrics | null>(null);

  useEffect(() => {
    if (selectedJob) {
      const engine = ManufacturedProductExplorerEngine.getInstance();
      const tree = engine.buildProductTree(selectedJob);
      setJobTree(tree);
      
      // Auto-select root node or maintain selection if same job
      if (!selectedNodeId || !engine.findNodeById(tree, selectedNodeId)) {
        setSelectedNodeId(tree.id);
        setSelectedNode(tree);
        setArtifactDetails(engine.getArtifactDetails(tree.id, selectedJob));
      } else {
        const activeNode = engine.findNodeById(tree, selectedNodeId);
        setSelectedNode(activeNode);
        if (activeNode) {
          setArtifactDetails(engine.getArtifactDetails(activeNode.id, selectedJob));
        }
      }
      setQualityMetrics(engine.getQualityMetrics(selectedJob));
    } else {
      setJobTree(null);
      setSelectedNodeId(null);
      setSelectedNode(null);
      setArtifactDetails(null);
      setQualityMetrics(null);
    }
  }, [selectedJob]);

  useEffect(() => {
    if (selectedJob && selectedNodeId && jobTree) {
      const engine = ManufacturedProductExplorerEngine.getInstance();
      const activeNode = engine.findNodeById(jobTree, selectedNodeId);
      setSelectedNode(activeNode);
      if (activeNode) {
        setArtifactDetails(engine.getArtifactDetails(activeNode.id, selectedJob));
      }
    }
  }, [selectedNodeId, selectedJob, jobTree]);

  return (
    <JobTreeContext.Provider 
      value={{ 
        selectedNodeId, 
        setSelectedNodeId, 
        selectedNode, 
        jobTree, 
        artifactDetails, 
        qualityMetrics,
        activeJob: selectedJob
      }}
    >
      {children}
    </JobTreeContext.Provider>
  );
};

export const useJobTree = () => {
  const context = useContext(JobTreeContext);
  if (!context) {
    throw new Error('useJobTree must be used within a JobTreeProvider');
  }
  return context;
};
