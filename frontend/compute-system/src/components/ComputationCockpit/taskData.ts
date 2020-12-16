export interface TaskData {
  idTask: number;
  name: string;
  version: string;
  dateStart: string;
  dateEnd: string;
  consumedCredits: number;
  reservedCredits: number;
  status: string;
  priority: string;
  clusterAllocation: number;
  idApp: number;
}

export interface UserTasksByApp {
  appName: string;
  appId: number;
  tasks: TaskData[];
}
