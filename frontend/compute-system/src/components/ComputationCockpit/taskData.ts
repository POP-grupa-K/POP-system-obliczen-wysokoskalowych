export interface TaskData {
  id: number;
  name: string;
  version: string;
  startTime: string;
  endTime: string;
  consumedCredits: number;
  reservedCredits: number;
  status: string;
  priority: string;
  clusterAllocation: number;
}
