import { TaskData } from "./taskData";

export function formatTaskCredits(task: TaskData): string {
  return "0/" + task.reservedCredits;
}
