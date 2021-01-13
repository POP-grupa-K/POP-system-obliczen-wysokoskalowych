export interface ActionNode {
  actionId: number;
  name: string;
  branches?: number;
}

const actions: ActionNode[] = [
  { actionId: 1, name: "Begin loop" },
  { actionId: 2, name: "End loop" },
  { actionId: 3, name: "Split path" },
  { actionId: 4, name: "Join path" },
];

export default actions;
