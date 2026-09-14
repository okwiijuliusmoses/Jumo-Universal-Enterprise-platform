import re

with open('src/core/ai/execution/AgentExecutionService.ts', 'r') as f:
    content = f.read()

# Remove the import line or just add the interface
interface_code = """
export interface AgentWorkLog {
  id: string;
  agentId: string;
  division: string;
  specialization: string;
  jobId: string;
  architectureId?: string;
  task: string;
  timestamp: string;
  status: 'STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'VERIFIED';
  toolsUsed: string[];
  providerUsed: string;
  result: string;
  verificationResult?: string;
  evidenceHash?: string;
  errors?: string;
  humanApprovalRequired: boolean;
}
"""

if "export interface AgentWorkLog" not in content:
    content = content.replace("export interface AgentTaskRequest", interface_code + "export interface AgentTaskRequest")

with open('src/core/ai/execution/AgentExecutionService.ts', 'w') as f:
    f.write(content)
