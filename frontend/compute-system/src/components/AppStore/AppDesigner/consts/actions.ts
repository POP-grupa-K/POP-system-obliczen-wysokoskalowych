export interface ActionNode {
  actionId: number;
  name: string;
  visible: boolean;
  branches?: number;
}

const actions: ActionNode[] = [
  { actionId: 1, name: "Begin loop", visible: true },
  { actionId: 2, name: "End loop", visible: true },
  { actionId: 3, name: "Split path", visible: true },
  { actionId: 4, name: "Join path", visible: true },
  { actionId: 5, name: "End flow", visible: false },
];

export default actions;
