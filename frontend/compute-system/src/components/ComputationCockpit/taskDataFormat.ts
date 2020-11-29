import { TaskData } from "./taskData";

export function formatTaskRuntime(task: TaskData): string {
  return task.startTime + " - " + task.endTime;
}

export function formatTaskCredits(task: TaskData): string {
  return task.consumedCredits + "/" + task.reservedCredits;
}

export function formatTaskClusterAllocation(task: TaskData): string {
  return task.clusterAllocation + "%";
}

