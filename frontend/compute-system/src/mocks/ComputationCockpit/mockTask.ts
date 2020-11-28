import {TaskData} from "../../components/ComputationCockpit/taskData";

export const mockTask: TaskData = {
  id: 123,
  name: "Name",
  version: "v1.2",
  startTime: "April 2nd 2005, 9:37PM",
  endTime: "April 2nd 2005, 9:55PM",
  consumedCredits: 12,
  reservedCredits: 26,
  status: "RUNNING",
  priority: "HIGH",
  clusterAllocation: 0.22
};